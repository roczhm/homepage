# 上线指南

这个站点是纯静态站（Astro 生成），部署到 **Cloudflare Pages** 即可，不需要服务器，也不需要备案。

## 一、买域名

推荐在 [Cloudflare](https://www.cloudflare.com/products/registrar/) 注册（按成本价卖，续费不涨价，DNS 自动托管在同一家）。
备选：Porkbun、Namecheap（首年常有折扣）。

买好后无需手动配置 DNS——Cloudflare 注册的域名自动接入 Cloudflare DNS。

域名已在其他注册商（如 Spaceship、Namecheap）买的，两种做法：

1. **推荐**：在 Cloudflare 后台 Add a domain（免费套餐），拿到两个 NS 地址，回注册商把
   Nameservers 改成这两个。之后 Cloudflare Pages 绑域名一键生效，还自带 CDN 与 HTTPS。
2. 或者 DNS 留在原注册商：Pages 部署完成后，在项目 **Custom domains** 页面拿到要添加的
   CNAME 记录，去注册商的 DNS 管理里加一条即可（Apex 域名需注册商支持 ALIAS/ANAME，
   或者用 `www` 作为主域）。

## 二、推到 GitHub

```bash
cd personal-site
git init
git add .
git commit -m "init personal site"
# 在 GitHub 上建一个空仓库，然后：
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git branch -M main
git push -u origin main
```

## 三、部署到 Cloudflare Pages

1. 打开 [dash.cloudflare.com](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 选择刚推上去的仓库
3. 构建设置填：
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - 环境变量（可选，若 GitHub 安装依赖慢）：`NPM_FLAGS` = `--registry=https://registry.npmmirror.com`
4. 点 **Save and Deploy**，等一两分钟就上线了

之后每次 `git push`，Cloudflare 都会自动重新构建发布。

## 四、绑定自定义域名

Pages 项目 → **Custom domains** → **Set up a custom domain**，输入你买好的域名，按提示确认即可。
Cloudflare 会自动签发 HTTPS 证书。

## 五、改成本地内容

| 要改什么 | 改哪里 |
| --- | --- |
| 站点名、简介、起始年份 | `src/consts.ts` |
| 域名（RSS 链接用） | `astro.config.mjs` 里的 `site` |
| 写新文章 | 新建 `src/content/posts/xxx.md` |
| 书签内容 | `src/pages/links.astro` 顶部的 `groups` |
| 关于页文案 / 站点日志 | `src/pages/about.astro` |
| 颜色、字体 | `src/styles/global.css` 顶部的 CSS 变量 |

## 本地预览

```bash
npm run dev      # 开发服务器，改文件即时刷新
npm run build    # 构建到 dist/
npm run preview  # 预览构建结果
```
