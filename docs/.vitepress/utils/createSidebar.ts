export enum MY_TAB {
	BLOG = "/blog/",
	NOTE = "/notes/",
}

export interface IItems {
	text: string;
	link?: string;
	collapsed?: boolean;
	items?: IItems[];
}

export interface ISideBar {
	[MY_TAB.BLOG]: IItems[];
	[MY_TAB.NOTE]: IItems[];
}

export function createSidebar() {
	const res: ISideBar = {
		"/blog/": [
			{
				text: "2024",
				collapsed: false,
				items: [
					{
						text: "January",
						items: [
							{ text: "03It's Getting Cold, and Your Laptop Needs to Keep Warm Too", link: "/blog/2024/01/03it's-getting-cold,-and-your-laptop-needs-to-keep-warm-too" },
						],
					},
				],
			},
			{
				text: "2023",
				collapsed: false,
				items: [
					{
						text: "December",
						items: [
							{ text: "11Explanation of Common Indicators and Methods for Stock Funds", link: "/blog/2023/12/11explanation-of-common-indicators-and-methods-for-stock-funds" },
						],
					},
					{ 
						text: "November",
						items: [
							{ text: "29Advantages of Cursor Pagination over Traditional Pagination and Its Detailed Implementation", link: "/blog/2023/11/29advantages-of-cursor-pagination-over-traditional-pagination-and-its-detailed-implementation" },
							{ text: "14Some Explorations on Using GraphQL in Uniapp", link: "/blog/2023/11/14some-explorations-on-using-graphql-in-uniapp" },
							{ text: "08Look at the openai conference", link: "/blog/2023/11/08look-at-the-openai-conference" },
							{ text: "01Getting a Domain Email to Play With (like `just@justin3go.com`)", link: "/blog/2023/11/01getting-a-domain-email-to-play-with-like-just@justin3go.com" },
						],
					},
					{
						text: "September",
						items: [
							{ text: "29自托管项目工具plane管理自己的TodoList", link: "/blog/2023/09/29自托管项目工具plane管理自己的TodoList" },
							{ text: "29vitepress中引入Tdesign并全局增加大图预览", link: "/blog/2023/09/29vitepress中引入Tdesign并全局增加大图预览" },
							{ text: "28vitepress中增加twitter卡片", link: "/blog/2023/09/28vitepress中增加twitter卡片" },
						],
					},
					{
						text: "August",
						items: [
							{ text: "31原来Vue还有这么多好用的UI库", link: "/blog/2023/08/31原来Vue还有这么多好用的UI库" },
							{ text: "29你来你也可以做一个网盘搜索引擎", link: "/blog/2023/08/29你来你也可以做一个网盘搜索引擎" },
							{ text: "22Web架构JAMStack“以动制静”", link: "/blog/2023/08/22Web架构JAMStack“以动制静”" },
							{ text: "18给vitepress增加短链接生成功能", link: "/blog/2023/08/18给vitepress增加短链接生成功能" },
							{ text: "17浅谈搜索引擎原理", link: "/blog/2023/08/17浅谈搜索引擎原理" },
						],
					},
					{
						text: "July",
						items: [
							{
								text: "26(译)面向JavaScript开发人员的Docker简介（Node.js 和 PostgreSQL）",
								link: "/blog/2023/07/26(译)面向JavaScript开发人员的Docker简介（Node.js 和 PostgreSQL）",
							},
							{
								text: "02前端双token策略(uniapp-vue3-ts版)",
								link: "/blog/2023/07/02前端双token策略(uniapp-vue3-ts版)",
							},
						],
					},
					{
						text: "June",
						items: [
							{ text: "18vitepress博客里增加一个RSS订阅", link: "/blog/2023/06/18vitepress博客里增加一个RSS订阅" },
							{
								text: "06简单优化下个人博客首页(迁移vitepress-beta版)",
								link: "/blog/2023/06/06简单优化下个人博客首页(迁移vitepress-beta版)",
							},
						],
					},
					{
						text: "May",
						items: [
							{ text: "11该给系统加哪一个权限控制模型呢", link: "/blog/2023/05/11该给系统加哪一个权限控制模型呢" },
							{ text: "09PIXIJS快速一览", link: "/blog/2023/05/09PIXIJS快速一览" },
							{ text: "07两个多月捣鼓了一个健康类小程序", link: "/blog/2023/05/07两个多月捣鼓了一个健康类小程序" },
							{ text: "01Nest的test中的best是Jest框架", link: "/blog/2023/05/01Nest的test中的best是Jest框架" },
						],
					},
					{
						text: "April",
						items: [
							{
								text: "26试下微调GPT-3做一个心理问答机器人",
								link: "/blog/2023/04/26试下微调GPT-3做一个心理问答机器人",
							},
							{
								text: "23Nest如何实现带身份验证的GraphQL订阅Subscription",
								link: "/blog/2023/04/23Nest如何实现带身份验证的GraphQL订阅Subscription",
							},
							{ text: "20Vue3+TS(uniapp)手撸一个聊天页面", link: "/blog/2023/04/20Vue3+TS(uniapp)手撸一个聊天页面" },
							{
								text: "17我终于会用Docker了(nest+prisma+psotgresql+nginx+https)",
								link: "/blog/2023/04/17我终于会用Docker了(nest+prisma+psotgresql+nginx+https)",
							},
							{
								text: "05实现微信小程序(uniapp)上传头像至阿里云oss",
								link: "/blog/2023/04/05实现微信小程序(uniapp)上传头像至阿里云oss",
							},
						],
					},
					{
						text: "March",
						items: [
							{ text: "31极简地给个人博客添加订阅功能", link: "/blog/2023/03/31极简地给个人博客添加订阅功能" },
							{ text: "29前端自给自足UI设计稿", link: "/blog/2023/03/29前端自给自足UI设计稿" },
							{
								text: "22聊聊前后端分离(历史、职责划分、未来发展)",
								link: "/blog/2023/03/22聊聊前后端分离(历史、职责划分、未来发展)",
							},
							{ text: "06三个经典的TypeScript易混淆点", link: "/blog/2023/03/06三个经典的TypeScript易混淆点" },
						],
					},
					{
						text: "February",
						items: [
							{
								text: "23你可能忽略的10种JavaScript快乐写法",
								link: "/blog/2023/02/23你可能忽略的10种JavaScript快乐写法",
							},
							{ text: "19放弃Cookie-Session，拥抱JWT？", link: "/blog/2023/02/19放弃Cookie-Session，拥抱JWT？" },
							{ text: "17聊聊源策略限制AJAX请求", link: "/blog/2023/02/17聊聊源策略限制AJAX请求" },
							{ text: "04Vue3相关原理梳理", link: "/blog/2023/02/04Vue3相关原理梳理" },
						],
					},
					{
						text: "January",
						items: [
							{
								text: "28了解API相关范式(RPC、REST、GraphQL)",
								link: "/blog/2023/01/28了解API相关范式(RPC、REST、GraphQL)",
							},
							{ text: "25浅谈NestJS设计思想", link: "/blog/2023/01/25浅谈NestJS设计思想" },
							{ text: "08JavaScript专题-继承", link: "/blog/2023/01/08JavaScript专题-继承" },
							{ text: "02JavaScript专题-原型链", link: "/blog/2023/01/02JavaScript专题-原型链" },
						],
					},
				],
			},
			{
				text: "2022",
				collapsed: false,
				items: [
					{ text: "获取Object的第一个元素", link: "/blog/2022/16获取Object的第一个元素" },
					{
						text: "JavaScript基础-replace方法的第二个参数",
						link: "/blog/2022/15JavaScript基础-replace方法的第二个参数",
					},
					{ text: "超详细的前端程序员git指北", link: "/blog/2022/14超详细的前端程序员git指北" },
					{ text: "CDN实践配置+原理篇", link: "/blog/2022/13CDN实践配置+原理篇" },
					{ text: "Node进程及集群相关", link: "/blog/2022/12Node进程及集群相关" },
					{ text: "Node内存控制", link: "/blog/2022/11Node内存控制" },
					{ text: "Node异步实现与事件驱动", link: "/blog/2022/10Node异步实现与事件驱动" },
					{ text: "Node模块规范及模块加载机制", link: "/blog/2022/09Node模块规范及模块加载机制" },
					{ text: "前端构建的学习(偏向vite)", link: "/blog/2022/08前端构建的学习(偏向vite)" },
					{
						text: "IntersectionObserver实现横竖滚动自适应懒加载",
						link: "/blog/2022/07IntersectionObserver实现横竖滚动自适应懒加载",
					},
					{ text: "玩转vitepress", link: "/blog/2022/06玩转vitepress" },
					{
						text: "前端程序员搭建自己的CodeIDE（code-server教程）",
						link: "/blog/2022/05前端程序员搭建自己的CodeIDE（code-server教程）",
					},
					{ text: "git常用操作", link: "/blog/2022/04git常用操作" },
					{ text: "这道题原来可以用到JS这么多知识点！", link: "/blog/2022/03这道题原来可以用到JS这么多知识点！" },
					{ text: "TypeScript入门", link: "/blog/2022/02TypeScript入门" },
					{
						text: "都2022年了，还是得学圣杯布局与双飞翼布局",
						link: "/blog/2022/01都2022年了，还是得学圣杯布局与双飞翼布局",
					},
				],
			},
			{
				text: "2021",
				collapsed: false,
				items: [
					{ text: "散列表实现查找", link: "/blog/2021/04散列表实现查找" },
					{ text: "操作系统内存分配模拟程序", link: "/blog/2021/03操作系统内存分配模拟程序" },
					{ text: "TFIDF计算的学习", link: "/blog/2021/02TFIDF计算的学习" },
					{ text: "scrapy爬虫详解", link: "/blog/2021/01scrapy爬虫详解" },
				],
			},
			{
				text: "2020",
				collapsed: false,
				items: [
					{
						text: "使用anaconda中的Prompt配置虚拟环境的常用命令",
						link: "/blog/2020/02使用anaconda中的Prompt配置虚拟环境的常用命令",
					},
					{ text: "Java迷宫", link: "/blog/2020/01Java迷宫" },
				],
			},
		].map((item, i) => (!i ? item : { ...item, collapsed: true })),
		"/notes/": [
			{
				text: "threejs入门",
				collapsed: false,
				items: [
					{ text: "01起步", link: "/notes/threejs入门/01起步" },
					{ text: "02一个基本的threejs应用", link: "/notes/threejs入门/02一个基本的threejs应用" },
					{ text: "03基于物理的渲染和照明", link: "/notes/threejs入门/03基于物理的渲染和照明" },
					{ text: "04变换、坐标系和场景图", link: "/notes/threejs入门/04变换、坐标系和场景图" },
					{ text: "05动画循环", link: "/notes/threejs入门/05动画循环" },
					{ text: "06纹理映射", link: "/notes/threejs入门/06纹理映射" },
					{ text: "07插件", link: "/notes/threejs入门/07插件" },
					{ text: "08环境光", link: "/notes/threejs入门/08环境光" },
					{ text: "09组织你的场景", link: "/notes/threejs入门/09组织你的场景" },
					{ text: "10内置几何体", link: "/notes/threejs入门/10内置几何体" },
					{ text: "11以gLTF格式加载3D模型", link: "/notes/threejs入门/11以gLTF格式加载3D模型" },
					{ text: "12threejs动画系统", link: "/notes/threejs入门/12threejs动画系统" },
				],
			},
			{
				text: "Rust基础学习",
				collapsed: false,
				items: [
					{ text: "01认识Cargo", link: "/notes/Rust基础学习/01认识Cargo" },
					{ text: "02变量绑定与解构", link: "/notes/Rust基础学习/02变量绑定与解构" },
					{ text: "03基本类型", link: "/notes/Rust基础学习/03基本类型" },
					{ text: "04所有权与借用", link: "/notes/Rust基础学习/04所有权与借用" },
					{ text: "05复合类型", link: "/notes/Rust基础学习/05复合类型" },
					{ text: "06流程控制", link: "/notes/Rust基础学习/06流程控制" },
					{ text: "07模式匹配", link: "/notes/Rust基础学习/07模式匹配" },
					{ text: "08方法Method", link: "/notes/Rust基础学习/08方法Method" },
					{ text: "09泛型", link: "/notes/Rust基础学习/09泛型" },
					{ text: "10特征", link: "/notes/Rust基础学习/10特征" },
					{ text: "11特征对象", link: "/notes/Rust基础学习/11特征对象" },
					{ text: "12深入特征", link: "/notes/Rust基础学习/12深入特征" },
					{ text: "13动态数组Vector", link: "/notes/Rust基础学习/13动态数组Vector" },
					{ text: "14KV存储HashMap", link: "/notes/Rust基础学习/14KV存储HashMap" },
					{ text: "15认识生命周期", link: "/notes/Rust基础学习/15认识生命周期" },
					{ text: "16返回值和错误处理", link: "/notes/Rust基础学习/16返回值和错误处理" },
					{ text: "17包和模块", link: "/notes/Rust基础学习/17包和模块" },
					{ text: "18注释和文档", link: "/notes/Rust基础学习/18注释和文档" },
					{ text: "19格式化输出", link: "/notes/Rust基础学习/19格式化输出" },
					{ text: "20实战-文件搜索工具", link: "/notes/Rust基础学习/20实战-文件搜索工具" },
				],
			},
			{
				text: "微前端设计与实现笔记",
				collapsed: false,
				items: [
					{ text: "01前端概览", link: "/notes/微前端设计与实现/01前端概览" },
					{ text: "02微前端原则", link: "/notes/微前端设计与实现/02微前端原则" },
					{ text: "03微前端的架构和挑战", link: "/notes/微前端设计与实现/03微前端的架构和挑战" },
					{ text: "04探索微前端架构", link: "/notes/微前端设计与实现/04探索微前端架构" },
					{ text: "05其他", link: "/notes/微前端设计与实现/05其他" },
				],
			},
			{
				text: "ChatGPT提示学习笔记",
				collapsed: false,
				items: [
					{ text: "1_2引言—指示", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记1_2" },
					{ text: "3迭代", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记3" },
					{ text: "4摘要", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记4" },
					{ text: "5推理", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记5" },
					{ text: "6转换", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记6" },
					{ text: "7扩展", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记7" },
					{ text: "8聊天机器人", link: "/notes/ChatGPT提示学习/ChatGPT提示学习笔记8" },
				],
			},
			{
				text: "算法与数据结构",
				collapsed: false,
				items: [
					{ text: "基础概念", link: "/notes/算法与数据结构/01基础概念" },
					{ text: "线性表", link: "/notes/算法与数据结构/02线性表" },
					{ text: "栈和队列", link: "/notes/算法与数据结构/03栈和队列" },
					{ text: "数组", link: "/notes/算法与数据结构/04数组" },
					{ text: "树", link: "/notes/算法与数据结构/05树" },
					{ text: "图", link: "/notes/算法与数据结构/06图" },
					{ text: "查找", link: "/notes/算法与数据结构/07查找" },
					{ text: "排序", link: "/notes/算法与数据结构/08排序" },
					{ text: "算法概述", link: "/notes/算法与数据结构/10算法概述" },
					{ text: "递归与分治", link: "/notes/算法与数据结构/11递归与分治" },
					{ text: "动态规划", link: "/notes/算法与数据结构/12动态规划" },
					{ text: "贪心算法", link: "/notes/算法与数据结构/13贪心算法" },
					{ text: "回溯与分支极限", link: "/notes/算法与数据结构/14回溯与分支界限" },
					{ text: "经典算法实现", link: "/notes/算法与数据结构/15经典算法实现" },
					{ text: "剑指Offer", link: "/notes/算法与数据结构/16剑指Offer" },
				],
			},
			{
				text: "计算机基础知识",
				collapsed: false,
				items: [{ text: "操作系统基础", link: "/notes/计算机基础知识/01操作系统基础" }],
			},
			{
				text: "数据库一期",
				collapsed: false,
				items: [
					{ text: "数据库系统概述", link: "/notes/数据库01/01数据库系统概述" },
					{ text: "关系数据库", link: "/notes/数据库01/02关系数据库" },
					{ text: "SQL(重点)", link: "/notes/数据库01/03SQL(重点)" },
					{ text: "数据库管理与维护(重点)", link: "/notes/数据库01/05数据库管理与维护(重点)" },
					{ text: "关系数据理论(重点)", link: "/notes/数据库01/06关系数据理论(重点)" },
					{ text: "数据库设计", link: "/notes/数据库01/07数据库设计" },
				],
			},
			{
				text: "JavaScript[待更新]",
				collapsed: false,
				items: [{ text: "JS常见手写面试题", link: "/notes/JavaScript/01JS常见手写面试题" }],
			},
			{
				text: "CSS相关[待更新]",
				collapsed: false,
				items: [],
			},
			{
				text: "Vue相关",
				collapsed: false,
				items: [
					{ text: "Vue3是如何运行的", link: "/notes/Vue相关/01Vue3是如何运行的" },
					{ text: "Vue3编译器", link: "/notes/Vue相关/02Vue3编译器" },
					{ text: "虚拟DOM", link: "/notes/Vue相关/03虚拟DOM" },
					{ text: "Vue3-Reactivity", link: "/notes/Vue相关/04Vue3-Reactivity" },
					{ text: "Mini-Vue", link: "/notes/Vue相关/05Mini-Vue" },
					{ text: "Vue3其他", link: "/notes/Vue相关/06Vue3其他" },
				],
			},
			{
				text: "NestJS",
				collapsed: false,
				items: [
					{ text: "controller", link: "/notes/NestJS/01controller" },
					{ text: "service", link: "/notes/NestJS/02service" },
					{ text: "module", link: "/notes/NestJS/03module" },
					{ text: "DTO", link: "/notes/NestJS/04DTO" },
					{ text: "postgreSQL", link: "/notes/NestJS/05postgreSQL" },
					{ text: "原理细节", link: "/notes/NestJS/06原理细节" },
					{ text: "应用配置", link: "/notes/NestJS/07应用配置" },
					{ text: "更多模块", link: "/notes/NestJS/08更多模块" },
					{ text: "openAPI", link: "/notes/NestJS/09openAPI" },
					{ text: "测试", link: "/notes/NestJS/10测试" },
				],
			},
			{
				text: "前端八股文",
				collapsed: false,
				items: [
					{ text: "HTML", link: "/notes/前端八股文/01HTML" },
					{ text: "CSS", link: "/notes/前端八股文/02CSS" },
					{ text: "JavaScript", link: "/notes/前端八股文/03JavaScript" },
					{ text: "Vue", link: "/notes/前端八股文/04Vue" },
					{ text: "计算机网络", link: "/notes/前端八股文/05计算机网络" },
					{ text: "浏览器原理", link: "/notes/前端八股文/06浏览器原理" },
					{ text: "性能优化", link: "/notes/前端八股文/07性能优化" },
				],
			},
			{
				text: "后端储备",
				collapsed: false,
				items: [
					{ text: "Django进阶学习笔记", link: "/notes/后端储备/01Django进阶学习笔记" },
					{ text: "DRF学习笔记", link: "/notes/后端储备/02DRF学习笔记" },
					{ text: "Redis学习笔记", link: "/notes/后端储备/03Redis学习笔记" },
				],
			},
			{
				text: "Web3.0",
				collapsed: false,
				items: [
					{ text: "Solidity8新特性", link: "/notes/Web3.0/00Solidity8新特性" },
					{ text: "Solidity8基本语法", link: "/notes/Web3.0/01Solidity8基本语法" },
					{ text: "Solidity8高级", link: "/notes/Web3.0/02Solidity8高级" },
					{ text: "Solidity8进阶", link: "/notes/Web3.0/03Solidity8进阶" },
				],
			},
			{
				text: "AI相关[待更新]",
				collapsed: false,
				items: [],
			},
		],
	};
	return res;
}
