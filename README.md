# Research Space

一个无构建步骤的静态个人博客，结构参考轻量个人空间：简介、文章、随笔、简历和联系方式。直接打开 `index.html` 就能预览，也可以部署到 GitHub Pages、Netlify、Vercel 或任意静态文件服务器。

## 文件

- `index.html`：页面结构
- `styles.css`：暗色视觉、响应式布局、卡片与弹窗样式
- `script.js`：文章数据、随笔数据、搜索、筛选、阅读弹窗和简历弹窗
- `assets/hero-research-desk.png`：首页封面图

## 修改内容

编辑 `script.js` 里的 `posts` 数组即可修改文章。每篇文章包含：

- `title`
- `date`
- `category`
- `tags`
- `summary`
- `body`

编辑 `essays` 数组即可修改随笔卡片。

联系方式、简历概览和首页简介在 `index.html` 里修改。

## 本地预览

可以直接双击打开 `index.html`，或在本目录运行：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。
