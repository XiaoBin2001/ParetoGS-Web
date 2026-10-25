# ParetoGS 项目网页

[English](README.md)

通过稀疏适配锚点，实现高质量、连续预算的 3D Gaussian Splatting。

本仓库保存中英文项目页和可直接发布的素材，用于介绍方法、展示结果和提供[论文](assets/paper.pdf)。网页使用原生 HTML/CSS/JavaScript，不需要前端构建、Python 包、CUDA 或训练环境。

## 本地预览

在当前目录启动静态服务器。例如，已经安装 Python 时可以运行：

```bash
python -m http.server 8000 --bind 127.0.0.1
```

打开 `http://127.0.0.1:8000/` 查看英文，打开 `http://127.0.0.1:8000/zh.html` 查看中文。语言切换无需 JavaScript；交互图件和视频由共用脚本控制。

## 发布

将当前目录交给 GitHub Pages 或其他静态托管服务，保留文件结构即可。支持域名根目录和项目子路径。视频拖动需要托管服务支持 HTTP Range 请求。

资源区提供 **Paper、arXiv、GitHub、Cite** 四个按钮。Paper 打开随库论文，其余三个显示“待更新”并禁用，等公开入口确定后再启用。这里尚未填写正式网页、arXiv 和代码仓库网址。

## 维护内容

- `index.html`、`zh.html`：中英文正文、作者、引用和搜索元数据，两页同步修改。
- `style.css`、`app.js`：共用样式与交互。
- `assets/`：论文、图件、字体和媒体，已经导出好；部署无需原科研工作区。
- `asset-sources.json`：科研素材来源记录，其中的历史路径不参与网页运行。

作者顺序和通讯作者标记以随库论文为准。替换论文时，同步两份 HTML、元数据和 PDF 来源记录。带版本号的资源使用文件 SHA-256 的前 12 位；修改这些资源后同步更新引用。

中文字体是本地子集，新增中文文案时可能需要从 Noto Serif CJK SC 补充字形，并保留 `assets/fonts/` 中的字体声明。拉丁正文使用 STIXGeneral Regular，粗体使用 Droid Serif Bold。

## 搜索与发现

正文直接包含在 HTML 源码中。两种语言都提供完整标题、简介、作者与引用元数据、语言关联、分享预览元数据，以及带主题关键词的 `ScholarlyArticle` JSON-LD。`robots.txt` 允许抓取。

公开网址确定后，再补齐：

- `canonical`、语言关联、`og:url` 和 `citation_pdf_url` 的真实绝对网址，以及使用同一组网址的站点地图。
- **域名根目录**的爬虫规则：项目子目录内的 `robots.txt` 不能控制整个域名；托管/CDN 也应允许 Googlebot、Bingbot 和 OAI-SearchBot 访问。
- 网页、论文和代码库的相互链接，并通过搜索引擎站长工具申请收录。

这些设置有助于识别工作，是否收录由各服务决定。Google Scholar 另有条件，包括文档所列的 5 MB 文件上限；当前完整质量 PDF 大于该限制，因此这里不宣称已通过 Scholar 收录验证。参考 [Google AI 搜索说明](https://developers.google.com/search/docs/appearance/ai-features)、[Scholar 收录条件](https://scholar.google.com/intl/en/scholar/inclusion.html)和 [OpenAI 爬虫说明](https://developers.openai.com/api/docs/bots)。
