# ParetoGS project website

[简体中文](README.zh-CN.md)

High-quality continuous-budget 3D Gaussian Splatting with sparse adapted anchors.

This repository contains the bilingual project website and its ready-to-serve assets. The page introduces the method, shows the results, and links to the [paper](assets/paper.pdf). It is a static HTML/CSS/JavaScript site: no frontend build, Python packages, CUDA, or training environment is needed.

## Preview

Run a static server from this directory. For example, if Python is available:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/` for English or `http://127.0.0.1:8000/zh.html` for Chinese. The language switch works without JavaScript; the interactive figures and videos use the shared script.

## Publish

Serve this directory with GitHub Pages or another static host, keeping the file layout intact. The site works at a domain root or under a project subpath. For video seeking, use a host that supports HTTP byte-range requests.

The resource row contains **Paper**, **arXiv**, **GitHub**, and **Cite**. Paper opens the bundled manuscript; the other three buttons are disabled and marked **Coming soon** until their destinations are ready. The public website, arXiv, and code URLs have not been assigned here.

## Edit the content

- `index.html` and `zh.html`: English and Chinese content, authors, citation, and search metadata. Keep both languages in sync.
- `style.css` and `app.js`: shared layout and interactions.
- `assets/`: the paper, figures, fonts, and media. The files are already exported; the original research workspace is not required to serve them.
- `asset-sources.json`: provenance of the exported research assets; source paths are historical references, not deployment dependencies.

Author names and corresponding-author markers follow the bundled manuscript. When replacing the paper, update both HTML pages, their metadata, and the PDF provenance entry together. Content-version query strings use the first 12 hexadecimal characters of the referenced file's SHA-256; refresh them when changing a versioned asset.

The local Chinese fonts are subsets. New Chinese wording may require additional glyphs from Noto Serif CJK SC; keep the font notice in `assets/fonts/`. Latin text uses STIXGeneral Regular and Droid Serif Bold.

## Search and discovery

The main content is present in the HTML source. Both languages include descriptive titles, descriptions, author/citation metadata, language alternatives, social-preview metadata, and `ScholarlyArticle` JSON-LD with topic keywords. `robots.txt` allows crawling.

After choosing the public URL:

- Add the real absolute URLs for `canonical`, language alternatives, `og:url`, and `citation_pdf_url`; add a sitemap using those same URLs.
- Apply crawler rules at the **host root**. A project-subpath `robots.txt` does not control the host; make sure hosting/CDN rules allow Googlebot, Bingbot, and OAI-SearchBot.
- Link the website, paper, and code repository to each other once their public destinations are ready, then request indexing through the search engines' webmaster tools.

These settings help crawlers identify the work; indexing is decided by each service. Google Scholar has additional requirements, including its documented 5 MB file-size limit; the bundled full-quality PDF is larger, so this site does not claim verified Scholar inclusion. See [Google's AI search guidance](https://developers.google.com/search/docs/appearance/ai-features), [Scholar's inclusion guidelines](https://scholar.google.com/intl/en/scholar/inclusion.html), and [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots).
