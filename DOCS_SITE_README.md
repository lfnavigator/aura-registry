# AURA Documentation Site

Static documentation site skeleton for the AURA Validation Chain Registry.
Built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## Quick start

```bash
# Install
pip install mkdocs-material

# Serve locally with live reload at http://127.0.0.1:8000
mkdocs serve

# Build static site to site/
mkdocs build

# Deploy to GitHub Pages (if configured)
mkdocs gh-deploy
```

## Structure

```
aura_docs/
├── mkdocs.yml                 # site config, nav, theme, brand colors
└── docs/
    ├── index.md               # home
    ├── methodology/
    ├── registry/
    ├── schema/
    ├── contributing/
    ├── about/
    └── stylesheets/
```

## Substantive vs stub

Core substantive pages in v0.1.0:

- **Home** (`index.md`) — claim-evidence-disciplined positioning and current registry state
- **Methodology overview** (`methodology/index.md`) — BVC framework treatment
- **Engineering-evidence layer** (`registry/engineering-evidence.md`) — current public engineering-evidence anchors
- **Anchor submission guide** (`contributing/anchors.md`) — practical contributor walkthrough

The remaining pages may still contain section-under-development notices. Fill
these in as the registry implementation is consolidated.

## Brand

- Primary color: `#081C2F` (deep navy, sampled from logo)
- Accent color: `#D17849` (copper)
- Typography: Manrope (body) · Fraunces (headings) · JetBrains Mono (code)

These match the AURA landing page so visitors moving between
`breshevengineering.com` and the docs site see consistent identity.

## Hosting

- **GitHub Pages**: `mkdocs gh-deploy` pushes the built `site/` to the
  `gh-pages` branch. Configure repo settings → Pages → source: `gh-pages`.
  Site appears at `https://lfnavigator.github.io/aura-registry/`.
- **Custom domain**: add `docs.breshevengineering.com` CNAME to point at
  the GitHub Pages URL once domain is in place.
- **Netlify / Vercel**: alternative if more build control needed.

## Claim-evidence discipline

This documentation site applies the same governance the registry itself
enforces. **No overclaim.** Where content describes future work, the language is
conditional ("planned", "in preparation"). Where content describes current
state, the language matches what is actually committed to the registry.

The engineering-evidence layer currently contains two public engineering-
evidence anchors in `cases/public/`. The home page and registry overview
reflect that status without upgrading it to universal or arbitrary-geometry
production validation.

## Version

Site source v0.1.0 release alignment, June 2026. Schema v1.1 alignment. Two
public engineering-evidence anchors included.

