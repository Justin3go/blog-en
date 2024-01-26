# Handwriting a Search Page with Nuxt 3
## Introduction

Previously, I created a [small search engine](https://justin3go.com/%E5%8D%9A%E5%AE%A2/2023/08/29%E4%BD%A0%E6%9D%A5%E4%BD%A0%E4%B9%9F%E5%8F%AF%E4%BB%A5%E5%81%9A%E4%B8%80%E4%B8%AA%E7%BD%91%E7%9B%98%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E) which has been launched, but it's still a bit rough around the edges. So, I spent some time polishing the front-end part of this search engine using `Nuxt` technology, and `Vuetify` for the UI component library. You can also check out my previous [comparison](https://justin3go.com/%E5%8D%9A%E5%AE%A2/2023/08/31%E5%8E%9F%E6%9D%A5Vue%E8%BF%98%E6%9C%89%E8%BF%99%E4%B9%88%E5%A4%9A%E5%A5%BD%E7%94%A8%E7%9A%84UI%E5%BA%93) on the choice of UI component libraries.

This article will not discuss the rest of the search engine, it's more of a front-end technical article...

**Important**: [Open source address](https://github.com/Justin3go/SearchSearchGo), I have also slightly organized and open-sourced the code for the application part, which is relatively simple overall, as there is only one page, it can be considered a true "single page application" 🤣🤣🤣

## Demonstration

![](https://oss.justin3go.com/blogs/recording.gif)
## Why Rewrite

The reasons for this rewrite are as follows:

1. The previously written code was too messy, basically writing only one file for one page, which was a bit difficult to maintain;
2. The previous backend was written separately using nest, in fact, it was just calling APIs, and it felt a bit heavy to start a separate backend service;
3. The last and most important point: **Use SSR to optimize SEO**

Specifically:

1. For example, after the user enters a search, the corresponding url path will also change, such as [https://ssgo.app/?page=1&query=AI](https://ssgo.app/?page=1&query=AI),
2. If the user shares this url to other platforms and is crawled by a search engine, the data obtained by the search engine will no longer be an empty search box, but a results page containing relevant resources,
3. In this way, the next time a user searches for the corresponding resource in another search engine, they may directly jump to the search results page of this application, which can greatly increase the exposure of this application.

In this way, users can not only find this website by searching for "Aliyun Disk Search Engine", but also may find this website by searching for keywords of other resources.
## Page Layout

Firstly, it must support mobile devices, because according to the backend access data, there are more mobile users, so the overall layout is mainly vertical screen, as for wide-screen PCs, a `max-width` effect is added.

Secondly, for the sake of overall simplicity, the search box and search results are still on the same page, rather than Google/Baidu-style search box homepage and results page are two different pages, I feel that the homepage is not necessary (purely for search functions)

The page should have a logo, menu in addition to the search box and list items, and the final layout is as shown in the figure below:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020240126140916.png)

The left and right sides are demonstrations of the mobile effect, and the middle is a demonstration of the PC effect.

## Nitro Server Part

Here, only two APIs need to be implemented:

1. Search interface, such as `/api/search`
2. Search suggestion interface, such as `/api/search/suggest`

Speaking of this, I have to praise the developer experience of nuxt, creating a new API is so convenient:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020240126141529.png)

It's much better to use than creating a service/controller in nest-cli, after all, I basically have to `help` in nest-cli.

Back here, my server directory structure is as follows:

```
├─api
│  └─search            # Search interface related
│          index.ts    # Search
│          suggest.ts  # Search suggestions
│
└─elasticsearch
        index.ts       # es client
```

In the `elasticsearch` directory, I created an ES client and used it in `search`:

```ts
// elasticsearch/index.ts

import { Client } from '@elastic/elasticsearch';

export const client = new Client({
  node: process.env.ES_URL,
  auth: {
    username: process.env.ES_AUTH_USERNAME || '',
    password: process.env.ES_AUTH_PASSWORD || ''
  }
});
```

Then use it, the part of use basically did not do any special logic, just call the api provided by ES client, and then assemble some parameters OK:

```ts
// api/search/index
import { client } from "~/server/elasticsearch";

interface ISearchQuery {
  pageNo: number;
  pageSize: number;
  query: string;
}

export default defineEventHandler(async (event) => {
  const { pageNo = 1, pageSize = 10, query }: ISearchQuery = getQuery(event);

  const esRes = await client.search({
    index: process.env.ES_INDEX,
    body: {
      from: (pageNo - 1) * pageSize, // Start from
      size: pageSize, // Number of queries
      query: {
        match: {
          title: query, // Content found in search query
        },
      },
      highlight: {
        pre_tags: ["<span class='highlight'>"],
        post_tags: ['</span>'],
        fields: {
          title: {},
        },
        fragment_size: 40,
      },
    },
  });

  const finalRes = {
    took: esRes.body.took,
    total: esRes.body.hits.total.value,
    data: esRes.body.hits?.hits.map((item: any) => ({
      title: item._source.title,
      pan_url: item._source.pan_url,
      extract_code: item._source.extract_code,
      highlight: item.highlight?.title?.[0] || '',
    })),
  };

  return finalRes;
});
```

```ts
// api/search/suggest
import { client } from "~/server/elasticsearch";

interface ISuggestQuery {
  input: string;
}

export default defineEventHandler(async (event) => {
  const { input }: ISuggestQuery = getQuery(event);

  const esRes = await client.search({
    index: process.env.ES_INDEX,
    body: {
      suggest: {
        suggest: {
          prefix: input,
          completion: {
            field: "suggest"
          }
        }
      }
    },
  });

  const finalRes = esRes.body.suggest.suggest[0]?.options.map((item: any) => item._source.suggest)

  return finalRes;
});

```

It's worth noting that the ES version of the client needs to correspond to the ES version of the server. For example, if I'm using ES7 on the server, I should also use ES7 here. If you're using ES8, you need to install the corresponding version of ES8, and there will be some changes in the return parameters: in ES8, the `esRes` mentioned above does not have a body property, you should use the following property directly.

## Page interface part

First, to avoid all the code being written in one file as before, I've encapsulated a few components here to make the `page/index` component look relatively simple:

```
/components
    BaseEmpty.vue
    DataList.vue
    LoadingIndicator.vue
    MainMenu.vue
    PleaseInput.vue
    RunSvg.vue
    SearchBar.vue
```

I won't elaborate on what they mean. You can basically guess what they are from the file names...

Then here is the main page part:

```vue
<template>
	<div
		class="d-flex justify-center bg-grey-lighten-5 overflow-hidden overflow-y-hidden"
	>
		<v-sheet
			class="px-md-16 px-2 pt-4"
			:elevation="2"
			height="100vh"
			:width="1024"
			border
			rounded
		>
			<v-data-iterator :items="curItems" :page="curPage" :items-per-page="10">
				<template #header>
					<div class="pb-4 d-flex justify-space-between">
						<span
							class="text-h4 font-italic font-weight-thin d-flex align-center"
						>
							<RunSvg style="height: 40px; width: 40px"></RunSvg>
							<span>Search Search Go...</span>
						</span>
						<MainMenu></MainMenu>
					</div>
					<SearchBar
						:input="curInput"
						@search="search"
						@clear="clear"
					></SearchBar>
				</template>
				<template #default="{ items }">
					<v-fade-transition>
						<DataList
							v-if="!pending"
							:items="items"
							:total="curTotal"
							:page="curPage"
							@page-change="pageChange"
						></DataList>
						<LoadingIndicator v-else></LoadingIndicator>
					</v-fade-transition>
				</template>
				<template #no-data>
					<template v-if="!curInput || !pending">
						<v-slide-x-reverse-transition>
							<BaseEmpty v-if="isInput"></BaseEmpty>
						</v-slide-x-reverse-transition>
						<v-slide-x-transition>
							<PleaseInput v-if="!isInput"></PleaseInput>
						</v-slide-x-transition>
					</template>
				</template>
			</v-data-iterator>
		</v-sheet>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { query = "", page = 1 } = route.query;
const router = useRouter();
const defaultData = { data: [], total: 0 };

const descriptionPrefix = query ? `正在搜索“ ${query} ”... ，这是` : "";
useSeoMeta({
	ogTitle: "SearchSearchGo--新一代阿里云盘搜索引擎",
	ogDescription: `${descriptionPrefix}一款极简体验、优雅、现代化、资源丰富、免费、无需登录的新一代阿里云盘搜索引擎，来体验找寻资源的快乐吧~`,
	ogImage: "https://ssgo.app/logobg.png",
	twitterCard: "summary",
});

interface IResultItem {
	title: string;
	pan_url: string;
	extract_code: string;
	highlight: string;
}

interface IResult {
	data: IResultItem[];
	total: number;
}

const curPage = ref(+(page || 1));

const curInput = ref((query || "") as string);
const isInput = computed(() => !!curInput.value);

let { data, pending }: { data: Ref<IResult>; pending: Ref<boolean> } =
	await useFetch("/api/search", {
		query: { query: curInput, pageNo: curPage, pageSize: 10 },
		immediate: !!query,
	});
data.value = data.value || defaultData;

const curItems = computed(() => data.value.data);
const curTotal = computed(() => data.value.total);

function search(input: string) {
	curPage.value = 1;
	curInput.value = input;
	router.replace({ query: { ...route.query, query: input, page: 1 } });
}

function pageChange(page: number) {
	curPage.value = page;
	router.replace({ query: { ...route.query, page: page } });
}

function clear() {
	curInput.value = "";
	data.value = defaultData;
	// 这里就不替换参数了，保留上一次的感觉好一些
}
</script>
```

Most of the code calls the relevant subcomponents, passes parameters, listens for events, etc., so I won't go into detail here. The key parts are these two sections of code:

```ts
useSeoMeta({
	ogTitle: "SearchSearchGo--新一代阿里云盘搜索引擎",
	ogDescription: `${descriptionPrefix}一款极简体验、优雅、现代化、资源丰富、免费、无需登录的新一代阿里云盘搜索引擎，来体验找寻资源的快乐吧~`,
	ogImage: "https://ssgo.app/logobg.png",
	twitterCard: "summary",
});
```

The text displayed here for SEO is dynamic. For example, if the current user is searching for `AI`, then the URL path parameter will also add `AI`, and the page description shared will include `AI`. The display effect on Twitter is as follows:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020240126143423.png)

Another part of the code is this section:

```ts
let { data, pending }: { data: Ref<IResult>; pending: Ref<boolean> } =
	await useFetch("/api/search", {
		query: { query: curInput, pageNo: curPage, pageSize: 10 },
		immediate: !!query,
	});
```

Here, `immediate: !!query` means that if the current path contains a search term, it will request data and render the result page. Otherwise, it will not execute this request immediately, but wait for some reactive variables like `curInput` and `curPage` to change before executing the request.

I won't explain the subcomponents in detail here, you can [view the source code](https://github.com/Justin3go/SearchSearchGo) for specifics. Overall, it's not too complicated.

## Other

In addition, I've also added Google Analytics and Baidu Analytics. The code is very simple, located in the `plugins/` directory. If you need to use this project, remember to change the corresponding id to your own id.

## Conclusion

This is also my first time using Nuxt to develop an application. Overall, the development experience after installing the Nuxt plugin is very good, and following the directory specifications to write code can also eliminate a lot of import and export code.

> About the author--[justin3go.com](https://justin3go.com/)
