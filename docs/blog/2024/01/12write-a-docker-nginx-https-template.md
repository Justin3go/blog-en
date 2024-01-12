# Write a docker+nginx https template

Cover：

![](https://oss.justin3go.com/blogs/%E6%88%91%E5%86%99%E4%BA%86%E4%B8%80%E4%B8%AAnginx%E9%83%A8%E7%BD%B2https%E7%9A%84%E6%95%99%E7%A8%8B%E5%8D%9A%E5%AE%A2%EF%BC%8C%E8%AF%B7%E4%B8%BA%E6%88%91%E7%94%9F%E6%88%90%E4%B8%80%E4%B8%AA%E5%8D%9A%E5%AE%A2%E5%B0%81%E9%9D%A2%E5%9B%BE_0.png)
## Background

Sometimes I want to deploy a small website for friends in China, but there are no free and easy-to-use deployment platforms like those abroad, so I have to build it myself. Every time I build it myself, I can't avoid the step of nginx reverse proxy to implement https, so I simply wrote a template and shell script to facilitate my quick deployment every time.
## Introduction

[Template address](https://github.com/Justin3go/nginx-https-template), a `https` template based on `nginx + docker`, which can quickly deploy `https` websites🚀🚀🚀

> You only need to have a docker environment, [# How to install and use Docker on Ubuntu 20.04](https://zhuanlan.zhihu.com/p/143156163)

Basic process：

![](https://oss.justin3go.com/blogs/nginx_https.png)

## Use this template

1. Enter your `repos` directory, which can be any directory (but you may need to make slight modifications later), here take `/root/repos/` as an example, if there is no `repos` directory, you can create one. Then `clone` this project

```shell
cd /root/repos/
```

```shell
git clone https://github.com/Justin3go/nginx-https-template.git
cd nginx-https-template

```

2. Replace the certificate under `cert/` with your certificate, the format is `your-domain.key` and `your-domain.pem`, for example, my domain name is `justin3go.com`, then my certificate is `justin3go.com.key` and `justin3go.com.pem`

3. Run the script `./scripts/replace-domain.sh --domain=your-domain`

```shell
sudo chmod -R +x ./scripts # Set script permissions
./scripts/replace-domain.sh --domain=your-domain # Run the script to replace the domain name
```

> Note: The default `https` forwards `80` port, if your website is not `80` port, you need to modify the `proxy_pass` in `/conf.d/default.conf` to your port

4. If you used a custom directory in the first step, modify the root directory in `docker-compose.yml` to your directory, the default is `/root/repos/`

5. Start the container

```shell
./scripts/run.sh
```

## Next

- You can use the `docker ps` command to see if the container is running normally
- And use `tail -n 1000 logs/access.log` and `tail -n 1000 logs/error.log` to view the `nginx` operation log
