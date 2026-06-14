# Ziruiqin Blog

秦子睿的 GitHub Pages 个人博客。这个仓库使用 GitHub Pages 原生支持的 Jekyll，文章以 Markdown 文件放在 `_posts/` 目录中。

## 常用文件

- `index.html`：首页、简介、随笔、简历和联系方式
- `_posts/`：博客文章，每篇一个 Markdown 文件
- `_layouts/default.html`：全站通用页面骨架
- `_layouts/post.html`：文章详情页模板
- `styles.css`：全站样式
- `assets/`：图片和静态素材
- `_config.yml`：站点标题、作者、链接和 Jekyll 配置

## 新增一篇博客

在 `_posts/` 下创建文件，文件名格式必须是：

```text
YYYY-MM-DD-title.md
```

示例：

```text
_posts/2026-06-14-my-first-blog.md
```

文件内容示例：

```markdown
---
title: "我的第一篇博客"
date: 2026-06-14
category: Research
tags: [AI, robustness, paper-reading]
summary: "这是一句会显示在首页卡片里的摘要。"
---

这里写正文。

## 小标题

- 要点 1
- 要点 2
```

## 发布更新

```bash
cd /Users/ziruiqin/ziruiqin-blog
git add .
git commit -m "Update blog"
GIT_SSH_COMMAND='ssh -i ~/.ssh/ziruiqin1999_github_pages_ed25519 -o IdentitiesOnly=yes' git push
```

推送后等待几十秒到几分钟，GitHub Pages 会自动更新：

```text
https://ziruiqin1999.github.io/
```
