# ChicoDotNet User Page

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
