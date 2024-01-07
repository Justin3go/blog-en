# Getting a Domain Email to Play With (like `just@justin3go.com`)

## Preface

I've always felt that the previous email formats `<XXXEnglishName>@qq.com` or `XXX@gmail.com`, these two commonly used email suffixes, are "not high-end". Moreover, if I were to make an application that needs to send and receive emails, using these domain names would be too ugly. So, I searched for how to get a domain email and found it's really quite simple. After all, I do have a domain name of my own, I just need to bind it to an email service.

Currently, I plan to use this email for receiving relatively private and important information. For instance, I might hang this email in my personal blog, or use it to receive information in some formal occasions. As for website registration, I'll still use the previous two emails because I don't want this domain email to contain too many ads.

- `@qq.com` for domestic use
- `@gmail.com` for overseas use
- `@justin3go.com` for formal occasions

> Sigh, it's really just for show

## Domain Analysis

I registered on Alibaba Cloud a long time ago, but you can also register on other platforms. For example, Tencent Cloud, Godaddy, Cloudflare, etc. As long as you spend money, it's correct. No matter what website, spending money is very quick. The entrance is very conspicuous, so I won't go into this step.

Here's an example with Alibaba Cloud:

Go to the domain's [Domain Analysis Console](https://dns.console.aliyun.com/), click on the novice guide, click on email analysis, and choose the corporate email you want to use. Here I chose Tencent Corporate Mail:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101153102.png)

Then it will automatically parse the following records for you:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101153214.png)

If you're using another domain console, just parse the last two records.

## Creating Corporate Mail

Go to [Tencent Corporate Mail's official website](https://work.weixin.qq.com/mail/), register your enterprise, then bind your domain address in the section below. I've already done this:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101153810.png)

Alright, you're done. Wait about 2 hours, and you'll receive an official email telling you that your domain audit was successful. Now you can use your own domain email.

Oh, right, where do you check your emails?

## Binding Email Client

First of all, Tencent Corporate Mail has an official web version. Also, if you're a paying user, you can follow the Corporate Mail's public account. You'll receive a WeChat notification when an email arrives. Free users don't have this feature, you can only check your emails in Enterprise WeChat, the web version, or third-party clients.

So here I'll bind a third-party client. I usually use the open-source [Thunderbird](https://www.thunderbird.net/zh-CN/).

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101154351.png)

First, go to [Tencent Corporate Mail's web version](https://work.weixin.qq.com/mail/), log in and choose your member account.

Then follow the steps below to generate a secure password for binding with third-party clients:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101154717.png)

Next, go to your email client. Here, we're still using Thunderbird as an example:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101154827.png)

Click Add Account -> Existing Email -> Fill in the following form:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101154948.png)

The password is the one you just copied, and the name can be anything.

If you need other information, fill it in according to the following:

```
Incoming Server:

imap.exmail.qq.com (using SSL, port 993)

Outgoing Server:

smtp.exmail.qq.com (using SSL, port 465)
```

Send an email to test it out, and you're good to go:

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101155235.png)

## In Conclusion

Mission accomplished~

I haven't produced anything for the entire month of October, I'm so guilty.

![](https://oss.justin3go.com/blogs/Pasted%20image%2020231101162722.png)