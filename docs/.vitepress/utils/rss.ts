import path from "path";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import { createContentLoader, type SiteConfig } from "vitepress";

const hostname = "https://en.justin3go.com";

export async function createRssFile(config: SiteConfig) {
	const feed = new Feed({
		title: "Justin3go's Blog-🖊",
		description: "A T-shaped front-end programmer who insists on deep cultivation in the field of technology, likes Vuejs, Nestjs, also knows a bit of Python, NLP, web3, and backend.",
		id: hostname,
		link: hostname,
		language: "en",
		image: "https://oss.justin3go.com/justin3goAvatar.png",
		favicon: `https://oss.justin3go.com/justin3goAvatar.ico`,
		copyright: "Copyright© 2021-present 渝ICP备2021006879号",
	});

	const posts = await createContentLoader("blog/**/*.md", {
		excerpt: true,
		render: true,
	}).load();

	posts.sort((a, b) => Number(+getDate(b.url) - +getDate(a.url)));

	for (const { url, excerpt, html } of posts) {
		// 排除index.md与2022|2021|2020发布的文章
		if (url.search(/index|202[0-2]/) >= 0) {
			continue;
		}
		// 仅保留最近3篇文章
		if (feed.items.length >= 3) {
			break;
		}
		const lastStr = url.split("/").pop();
		const title = lastStr?.substring(2, lastStr.length - 5) || "";
		feed.addItem({
			title,
			id: `${hostname}${url}`,
			link: `${hostname}${url}`,
			description: excerpt,
			content: html,
			author: [
				{
					name: "Justin3go",
					email: "just@justin3go.com",
					link: "https://en.justin3go.com",
				},
			],
			date: getDate(url),
		});
	}

	writeFileSync(path.join(config.outDir, "feed.xml"), feed.rss2(), "utf-8");
}

export function getDate(url: string) {
	const date = new Date(url.substring(4, 14));
	if (!isNaN(date.getTime())) return date;
	else return new Date('2023-01-01'); // url中提取不出日期的默认值
}
