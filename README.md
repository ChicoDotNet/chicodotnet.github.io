# ChicoDotNet User Page

![ChicoDotNet bridge cover](assets/brand/hero/chicodotnet-readme-cover.png)

Public engineering home for **ChicoDotNet**, deployed at `https://chicodotnet.github.io/`.

## Stack

- React + strict TypeScript/TSX;
- Fluent UI 2 (`@fluentui/react-components`) for controls and interaction;
- Bootstrap for mobile-first responsive layout and spacing;
- Markdown + Mermaid for repository-native content;
- .NET 10 content pipeline for generated indices, RSS/Atom, sitemap, `llms.txt`, static long-tail pages and runtime build evidence;
- GitHub Pages for static hosting.

## Language policy

Spanish is canonical. The interface also supports the same locale set as FerrumWeave:

`es`, `en`, `de`, `fr`, `it`, `pt-BR`, `ru`, `zh-Hans`, `ja`.

Editorial content may temporarily fall back to Spanish while translations are produced.

## Brand asset convention

Each project owns its visual identity. Repository-level documentation assets live under:

`assets/brand/hero/`

Each project should provide two complementary PNG surfaces:

```text
assets/brand/hero/
├── <project>-readme-cover.png   # branded cover with project identity / lettering
└── <project>-hero-cover.png     # artwork-only surface for web heroes and cards
```

Current examples:

- ChicoDotNet: `chicodotnet-readme-cover.png` + `chicodotnet-hero-cover.png`;
- FerrumWeave: `ferrumweave-readme-cover.png`; its hero-only cover will follow the same convention;
- SIFRAS: `sifras-readme-cover.png` + `sifras-hero-cover.png` already live in `ChicoDotNet/Sifras` on `dev`.

The ChicoDotNet User Page should consume project-owned covers rather than fork them into this repository. `src/projectCatalog.ts` is the single UI contract for repository URLs, branches, cover paths and asset visibility. SIFRAS currently remains private, so the public page intentionally uses its CSS fallback until that asset becomes anonymously reachable; no private GitHub URL is leaked into the public runtime.

## Versioning

`version.json` is intentionally tracked and contains only the voluntarily managed `major.minor` line, for example `0.1`.

A deployed artifact expands that base to:

`major.minor.yymmdd.build`

where the date is derived in **UTC** and the build number is generated automatically by the deployment workflow. The expanded evidence is published as `/version.json` and shown in the footer for fast debugging.

## Branch/release philosophy

- `dev` preserves integration history.
- work is validated on `dev`.
- `main` represents released product history.
- releases are promoted from `dev` to `main` as a deliberate squash commit.
- Git tags/releases may coexist later, but they are not the source of truth for the voluntary `major.minor` line.

## Content

Repository content lives under `content/` and is directly reviewable in pull requests. Articles, diagrams and videos are content records rather than hard-coded JSX, so external ingestion can be added later without coupling the UI to LinkedIn, YouTube or another provider.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for Visio compatibility, feed ingestion and the reusable multi-cloud contactor.
