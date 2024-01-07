# Some Explorations on Using GraphQL in Uniapp

## Preface

I previously developed a mini-program, [Link](https://justin3go.com/%E5%8D%9A%E5%AE%A2/2023/05/07%E4%B8%A4%E4%B8%AA%E5%A4%9A%E6%9C%88%E6%8D%A3%E9%BC%93%E4%BA%86%E4%B8%80%E4%B8%AA%E5%81%A5%E5%BA%B7%E7%B1%BB%E5%B0%8F%E7%A8%8B%E5%BA%8F.html). I'm currently refactoring this mini-program, so the online version is temporarily unavailable, please stay tuned!

In it, I used GraphQL technology. The support for GraphQL by server-side applications like nest.js and the related materials are very rich, so I won't go into detail here; however, the materials on the domestic tech stack Uniapp for GraphQL are relatively scarce.

So here I'd like to briefly talk about how I use GraphQL in this Uniapp client. Of course, please note the word "exploration" in the title, this is not a best practice. If you have a better way, you are welcome to discuss~

Aside: If you know nothing about GraphQL, you can read this article I wrote before about what GraphQL is and its benefits--[Understanding API-related Paradigms (RPC, REST, GraphQL)](https://justin3go.com/%E5%8D%9A%E5%AE%A2/2023/01/28%E4%BA%86%E8%A7%A3API%E7%9B%B8%E5%85%B3%E8%8C%83%E5%BC%8F(RPC%E3%80%81REST%E3%80%81GraphQL).html)

> This article is based on vue3/vite version

## Using Villus

If your project is Vue+GraphQL, you might want to try this [small and beautiful library `Villus`](https://villus.logaretm.com/guide/overview/)

This library integrates very well with Vue's reactivity, and if you're familiar with Vue, it's quite elegant to use. For example, this example on the official website uses a query:

```html
<template>
  <div>
    <div v-if="data">
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>
<script setup>
import { useQuery } from 'villus';
const { data } = useQuery({
  query: '{ posts { title } }',
});
</script>
```

It's worth noting that the `data` variable has been encapsulated as reactive, so you can use it conveniently in the template.

## Change the network request method of villus to uni.request

Since Uniapp and other mini-programs use their own network request methods, such as the encapsulated `uni.request`, we need to replace the fetch plugin in it with `uni.request`, the process is roughly as follows:

![](https://oss.justin3go.com/blogs/villus-fetch.png)

Specifically, we create a setup.ts in a certain folder (like I did in src/graphql), here I referenced the related logic of [this article](https://rea.ink/blogs/frontend/uni-app-graphql.html):

```ts
import { createClient, fetch } from "villus";

type Methods =
  | "OPTIONS"
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT";

// Here we rewrite fetch, the request uses the uni.request provided by UniAPP
const fetchPlugin = fetch({
  fetch(url, options) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: url.toString(),
        method: options?.method as Methods,
        data: options?.body as any,
        header: options?.headers,

        success(res) {
          resolve({
            ok: true,
            status: res.statusCode,
            headers: res.header,
            text: async () => JSON.stringify(res.data),
            json: async () => res.data,
          } as Response);
        },
        fail(e) {
          reject(e);
        },
      });
    });
  },
});

export const apolloClient = createClient({
  url: `${import.meta.env.VITE_SERVER_IP}/graphql`,
  use: [fetchPlugin],
});
```

At this point, the special logic of using villus in uniapp compared to web use has been processed.

## A Little Encapsulation

Normally when we use axios requests, we basically take out the api string and put it in a folder like `src/apis/`. Here we also take out the graphql string that needs to be used and put it in the folder we created before, `src/graphql`. Of course, you can customize it according to your own habits.

For each module, I created a separate file `graphql-XXX.ts`, such as the user module is `graphql-user.ts`, all placed in `src/graphql/`.

The content of the file is the query string about graphql, such as:

```ts
// graphql-user.ts

import gql from "graphql-tag";

export const refreshToken = gql`
  mutation refreshToken($token: JWT!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`;

// More...
```

Then, in order to facilitate the import of other files, I created a new `index.ts` file in `src/graphql/`:

```ts
import * as home from "./graphql-home";
import * as questionnaire from "./graphql-questionnaire";
import * as analyze from "./graphql-analyze";
import * as user from "./graphql-user";
// ...

/* how to use
import GQL from "@/graphql"
const curGQL = GQL.home.listAsOwner
**/
export default {
  home,
  questionnaire,
  analyze,
  user,
};
```

Here you can also choose to directly `export * from "./graphql-home";` like this, but because the query strings of different modules may have naming conflicts, I chose to export in the above way, so there is a namespace, the use of others is the part of the above comments:

```ts
import GQL from "@/graphql"
const curGQL = GQL.home.listAsOwner
```

## Example

Alright, after writing so much, let's start using the encapsulated part in actual requirements. For example, a component that queries and displays the number is written like this:

```html
    class="analytics-count-container uni-white-bg uni-shadow-sm uni-radius-lg"
  >
    <uni-row>
      <uni-col :span="14">
        <image
          class="img"
          style="width: 100%"
          mode="widthFix"
          :src="countLeft"
        ></image>
      </uni-col>
      <uni-col :span="10">
        <view class="label uni-mt-8 uni-primary-dark">
          <view class="top">Filled in</view>
          <view class="bottom uni-mt-4">{{ count }}</view>
        </view>
      </uni-col>
    </uni-row>
  </view>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { countLeft } from "../const/img-url";
import { useQuery } from "villus";
import GQL from "@/graphql";

const { data, execute: _execute } = useQuery({ query: GQL.home.countAsFriend });

const count = computed(() => data.value?.me.countAsFriend ?? "--");
</script>
```

The key code is:

```ts
const { data, execute: _execute } = useQuery({ query: GQL.home.countAsFriend });
const count = computed(() => data.value?.me.countAsFriend ?? "--");
```

> `_execute` is my custom eslint rule: variables defined with an underscore at the beginning but not used will not be reported as errors, because the parent component may call this method, so I deconstructed this variable

## Finally

Alright, job done, as the title says, these are some explorations of mine on using graphql in uniapp. There is relatively little information about graphql in China, and even less when combined with uniapp, I hope this can be helpful to you, and I also hope everyone can share their wisdom.