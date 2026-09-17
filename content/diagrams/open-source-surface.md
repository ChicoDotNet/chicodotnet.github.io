---
kind: diagram
title: "ChicoDotNet content architecture"
slug: chicodotnet-content-architecture
summary: "Markdown + Mermaid como fuente versionable, con salida estática y pipeline .NET para índices, feeds y SEO."
published: 2026-09-16
tags: [architecture, mermaid, github-pages]
featured: true
---
```mermaid
flowchart LR
  Content[Markdown / Mermaid / SVG / PNG] --> React[React + TSX]
  Content --> DotNet[.NET ContentPipeline]
  DotNet --> Index[content-index.json]
  DotNet --> Feeds[RSS / Atom]
  DotNet --> SEO[sitemap / llms.txt]
  React --> Pages[GitHub Pages]
  Index --> React
```
