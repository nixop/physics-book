# POLE / FIELD — Interactive Physics

POLE (FIELD in the English interface) is a bilingual, browser-based physics reference and a pair of synchronized Obsidian knowledge bases. It combines concise theory cards, mathematical reference material, interactive SVG models, search, and personal reading tools in one navigable learning resource.

[![Deploy to GitHub Pages](https://github.com/artem-x-meta/physics-book/actions/workflows/pages.yml/badge.svg)](https://github.com/artem-x-meta/physics-book/actions/workflows/pages.yml)

[Open the book](https://artem-x-meta.github.io/physics-book/) · [View the repository](https://github.com/artem-x-meta/physics-book)

## Project status

The project currently includes:

- 17 physics sections and 108 topic cards in Russian and English;
- locale-aware routes under `#/ru/...` and `#/en/...`;
- seven working SVG models covering data, motion, waves, fields, spacetime, quantum interference, and orbital motion;
- editorial briefs for the remaining planned interactive experiments;
- 39 formulas with physical interpretations and applicability notes;
- 18 physical constants checked against CODATA 2022 / NIST;
- full-text search across titles, summaries, and experiment briefs;
- bookmarks, reading progress, and light/dark themes stored locally in the browser;
- responsive layouts and keyboard navigation;
- separate Russian and English Obsidian vaults, each with concise cards, chapter maps, tags, formulas, constants, and wiki links;
- downloadable ZIP archives for both Obsidian vaults.

## Getting started

Requirements: a current Node.js release and npm.

```bash
git clone https://github.com/artem-x-meta/physics-book.git
cd physics-book
npm install
npm run dev
```

The development server prints the local URL when it starts. Content generation runs automatically before development and production builds.

## Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install project dependencies. |
| `npm run dev` | Regenerate managed content and start the Vite development server. |
| `npm test` | Regenerate content and run the Vitest test suite. |
| `npm run build` | Regenerate content, type-check the project, and create a production build. |
| `npm run check` | Run tests, the production build, and browser-based visual regression checks. |
| `npm run vault` | Force-regenerate all managed notes in both Obsidian vaults and rebuild their ZIP archives. |

For a local preview of the production build, run `npm run preview` after `npm run build`.

## Architecture

```text
physics-book/
├── content/                                      # reviewed formulas and constants
│   └── en/                                       # English content translations
├── scripts/
│   ├── build-content.mjs                         # parser and content/vault generator
│   ├── run-visual.mjs                            # browser-check launcher
│   └── visual-check.mjs                          # browser regression scenarios
├── src/
│   ├── components/                               # shared interface and physics models
│   ├── data/                                     # generated application datasets
│   ├── i18n/                                     # locale state and interface strings
│   ├── pages/                                    # route-level views
│   ├── App.tsx                                   # application shell and routing
│   └── routing.ts                                # locale-aware hash routes
├── tests/                                        # content, routing, and vault tests
├── vault/                                        # Russian Obsidian vault
├── vault-en/                                     # English Obsidian vault
└── public/
    ├── pole-physics-vault.zip                    # Russian vault download
    └── pole-physics-vault-en.zip                 # English vault download
```

The web application is built with React, TypeScript, Vite, KaTeX, and Lucide icons. Hash-based routing keeps the bilingual book compatible with static hosting on GitHub Pages.

## Content generation and file safety

`scripts/build-content.mjs` combines the normalized book data with reviewed reference data and synchronizes the generated TypeScript datasets, managed Obsidian notes, and downloadable ZIP archives. Treat the following outputs as generated files:

- `src/data/*.generated.ts`;
- managed notes inside `vault/` and `vault-en/`;
- `public/pole-physics-vault.zip`;
- `public/pole-physics-vault-en.zip`.

Manual edits to generated cards may be overwritten the next time content is synchronized. Additional personal files placed in `vault/` are preserved and excluded from the public ZIP archive. Use `npm run vault` only when you intentionally want to force a complete regeneration of all managed vault notes.

## Obsidian vaults

The web book and the two vaults share the same topic structure. Vault notes are deliberately shorter and contain no interactive elements, making them suitable for offline review, linking, and personal annotations.

- `vault/` contains the Russian knowledge base.
- `vault-en/` contains the English knowledge base.
- Both packaged vaults can be downloaded from the book's home page and navigation menu.
