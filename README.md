# 去玩实验室

一个围绕旅行、游玩资讯和新鲜玩法的静态站点，适合直接部署为公开网站。

## 核心模块

- `近期上新`：聚合近几个月新开放、扩建、焕新或更新体验的旅行与游玩项目
- `随机发现`：从经典且口碑好的目的地库里随机抽取一组灵感
- `玩法策展`：把常规旅行与更适合年轻用户的玩法组合在一起

## 技术方案

- 纯静态站点：`HTML + CSS + JavaScript`
- 数据文件：`assets/data/travel-data.js`
- 自动更新脚本：`scripts/update-travel-data.ps1`
- 周更工作流：`.github/workflows/weekly-refresh.yml`
- Pages 部署工作流：`.github/workflows/deploy-pages.yml`

## 更新机制

`update-travel-data.ps1` 会：

1. 从公开新闻 RSS 检索近几个月的新项目动态并刷新 `recentLaunches`
2. 从经典库里随机挑选新的 `classicPicks`
3. 从玩法库里随机挑选新的 `playModes`

默认计划时间：每周一 `02:15 UTC`

## 部署方式

仓库内已经包含 GitHub Pages 发布工作流。如果仓库允许 Pages 部署，推送到 `main` 后会自动发布。

也可以把当前目录直接部署到 Netlify 或 Cloudflare Pages。
