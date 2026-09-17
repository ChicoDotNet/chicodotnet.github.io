# Roadmap

## Content surfaces

- Markdown is the canonical editable format for articles and technical notes.
- Mermaid fenced blocks are rendered directly in the React surface.
- PNG and SVG remain first-class media for diagrams that are better authored graphically.
- Visio (`.vsdx`) is intentionally **not** a runtime dependency. A future contribution may define a source-artifact convention where `.vsdx` files are stored or linked as editable sources and exported to SVG/PNG for the public site.

## Content ingestion

The first release uses versioned repository content and placeholders. Future adapters may ingest or reconcile external sources such as RSS/Atom, YouTube or LinkedIn without changing the UI content contract.

## Open-source contactor

The contact form will be extracted as a reusable mini-project rather than hidden inside this site. Target experience: clone/install, configure secrets, deploy, and point any static site at it.

Planned provider adapters:

- Azure Functions;
- AWS Lambda;
- Google Cloud Functions / Cloud Run compatible handler;
- provider-neutral HTTP contract where practical.

The successful form response should link back to the project so visitors can reuse the same contactor on their own static sites.
