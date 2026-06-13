#!/usr/bin/env node
/**
 * AURA registry v0.1.0 public-release cleanup.
 *
 * Run from repository root:
 *   node cleanup_registry_release_v0_1_0.mjs
 *   mkdocs build
 *
 * Purpose:
 * - Align docs with two public engineering-evidence anchors.
 * - Remove stale "first public anchor / 1 public anchor" status claims.
 * - Remove named OS-V / Nelson diagnostic examples from public-release docs.
 * - Keep Level C / Level D as methodology categories, but not as current release assets.
 */

const fs = require("fs");

function write(file, content) {
  fs.writeFileSync(file, content.trimStart() + "\n", "utf8");
  console.log("wrote", file);
}

function replaceIn(file, fn) {
  if (!fs.existsSync(file)) return;
  const before = fs.readFileSync(file, "utf8");
  const after = fn(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    console.log("updated", file);
  }
}

const home = `# AURA Validation Chain Registry

**The open evidence-gated validation registry for aerostatic gas-bearing rotor-dynamic engineering software.**

Maintained by **Breshev Engineering**. Schema and documentation under
[CC-BY-4.0](contributing/licensing.md). Validation infrastructure code under
[MIT license](contributing/licensing.md). Repository:
[github.com/lfnavigator/aura-registry](https://github.com/lfnavigator/aura-registry).

---

## What this is

A schema-enforced public record of validation evidence for rotor-dynamic
engineering software, with a focus on aerostatic gas-bearing systems
(precision spindles, microturbomachinery, cryogenic engineering, and
high-reliability rotating machinery).

The registry implements the **Breshev Validation Chain (BVC)** methodology:

- A **two-layer registry** separating solver-sanity evidence (analytical
  anchors at machine precision) from engineering-evidence chains (multi-step
  evidence terminating in measured or experimentally grounded physical data).
- A **four-level acceptance policy** (analytical sanity, public external
  benchmark, external diagnostic, forensic/blocked) that prevents evidence
  from being promoted beyond what its provenance supports.
- A **two-gate model** combining structural completeness (schema gate) and
  content completeness (runtime quality gate).
- Deterministic SHA-256 hashes over canonical serialization for promoted
  registry entries, enabling third-party re-validation without access to
  private systems.

The methodology paper is **in preparation for external review and submission**.
The registry is active and currently contains two public engineering-evidence
anchors in \`cases/public/\`.

---

## Current state — June 2026

!!! success "Registry status snapshot"
    The registry currently contains two public engineering-evidence anchors
    in \`cases/public/\`. These records expose residual-level validation
    evidence, lifecycle state, provenance, and applicability boundaries.

| Anchor | Scope | Current public status |
|---|---|---|
| \`VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001\` | Conical aerostatic bearing method-chain validation | Public engineering-evidence anchor |
| \`VCR_AURA_JOURNAL_AEROSTATIC_L4_DUAL_BENCHMARK_001\` | Aerostatic journal bearing dynamic coefficient holdout validation | Public engineering-evidence anchor |

Reported evidence:

- The conical case reports method-chain residuals of **3.938% / 7.143% / 7.692%**.
- The journal case reports **4/4 holdout rows closed** across the Kozánek 2009
  and Fleming/NASA TN D-8270 benchmark families, with **maximum absolute
  residual 10.282%**, **mean absolute residual 3.767%**, and **leakage audit PASS**.
- The solver-sanity layer contains **10 Level A solver-sanity checks** used as
  the mathematical implementation foundation under the AURA dynamic workflow.

These records are **benchmark-scope engineering-evidence anchors**. They are
not arbitrary-geometry production validation claims and do not replace final
high-fidelity CAE or experimental qualification.

Diagnostic and forensic records may be retained internally or documented
separately when useful for methodology development. They are not part of the
v0.1.0 public engineering-evidence release unless explicitly listed in
\`cases/public/\`.

For the full registry status, see [Registry overview](registry/index.md).

---

## Getting started

| If you are... | Start here |
|---|---|
| New to BVC and want the conceptual frame | [Methodology overview](methodology/index.md) |
| An engineer evaluating AURA for pilot use | [Engineering-evidence layer](registry/engineering-evidence.md) and [Lifecycle states](registry/lifecycle.md) |
| A contributor wanting to add an anchor | [Anchor submission guide](contributing/anchors.md) |
| Implementing the schema in your own tooling | [Schema v1.1 reference](schema/v1-1.md) |
| Citing AURA in academic work | [Citation guide](about/citation.md) |

---

## Key design principles

**Evidence over assertion.** Every claim in the registry must be backed by
a declared source, a comparison target, residuals, and an explicit lifecycle
state.

**No silent promotion.** Diagnostic comparisons and forensic records are
valuable, but they do not become public benchmark anchors unless the
acceptance policy requirements are met.

**Useful limitations.** A limitation is not a defect if it is explicit.
The registry records what each anchor proves, what it does not prove, and
where future work is required.

**Engineering decisions, not just solver outputs.** The long-term purpose of
the registry is to support trust verdicts that are appropriate to the
consequences of engineering decisions.
`;

const registryIndex = `# Registry Overview

The AURA Validation Chain Registry is organized by validation layer and
acceptance level. For the conceptual framework, see the
[methodology overview](../methodology/index.md).

## Current public engineering-evidence anchors

The v0.1.0 public registry release contains two public engineering-evidence
anchors in \`cases/public/\`:

| Anchor | Scope | Public status |
|---|---|---|
| \`VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001\` | Conical aerostatic bearing method-chain validation | Public engineering-evidence anchor |
| \`VCR_AURA_JOURNAL_AEROSTATIC_L4_DUAL_BENCHMARK_001\` | Aerostatic journal bearing dynamic coefficient holdout validation | Public engineering-evidence anchor |

## Reported evidence

- **Conical case:** method-chain residuals **3.938% / 7.143% / 7.692%**.
- **Journal case:** **4/4 holdout rows closed** across Kozánek 2009 and
  Fleming/NASA TN D-8270 benchmark families; maximum absolute residual
  **10.282%**; mean absolute residual **3.767%**; leakage audit **PASS**.
- **Solver-sanity layer:** 10 Level A solver-sanity checks used as
  mathematical implementation checks under the AURA dynamic workflow.

## Scope statement

These records are benchmark-scope engineering-evidence anchors. They are not
arbitrary-geometry production validation claims and do not replace final
high-fidelity CAE or experimental qualification.

Diagnostic and forensic records may be retained internally or documented
separately when useful for methodology development. They are not part of the
v0.1.0 public engineering-evidence release unless explicitly listed in
\`cases/public/\`.

## Lifecycle

Each registry entry passes through declared lifecycle states from initial draft
through promotion candidate to validated public anchor or to diagnostic /
forensic preservation.

Detailed per-anchor pages and a machine-readable registry index are being
prepared. For current anchor JSON entries, see the registry repository.
`;

const engineeringEvidence = `# Engineering-Evidence Layer

The engineering-evidence layer contains validation chains that connect a
calculation method to physical, experimental, or benchmark-grounded engineering
data. Unlike solver-sanity anchors, these records are not only about whether
the math is implemented correctly. They document why a result can support a
particular engineering claim inside a defined applicability region.

## Current public engineering-evidence anchors

The v0.1.0 registry release contains two public engineering-evidence anchors:

| Anchor | Scope |
|---|---|
| \`VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001\` | Conical aerostatic bearing method-chain validation |
| \`VCR_AURA_JOURNAL_AEROSTATIC_L4_DUAL_BENCHMARK_001\` | Aerostatic journal bearing dynamic coefficient holdout validation |

## Anchor 1 — Conical aerostatic bearing method-chain case

Entry: \`VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001\`

Scope: conical aerostatic bearing P05 method-chain validation.

Reported residuals:

| Chain part | Quantity | Worst residual | Role |
|---|---:|---:|---|
| FEM vs experiment, P05 | Load capacity | 3.938% | Experimental grounding of the FEM route |
| PM/AURA vs validated FEM route, P05 | Axial stiffness | 7.143% | Method-chain support |
| PM vs FEM, P04 | Load capacity | 7.692% | Supporting comparison |

## Anchor 2 — Aerostatic journal bearing dual benchmark-family holdout

Entry: \`VCR_AURA_JOURNAL_AEROSTATIC_L4_DUAL_BENCHMARK_001\`

Scope: aerostatic journal bearing dynamic coefficient holdout validation
against two independent benchmark families.

Reported evidence:

| Family | Holdout closure | Max absolute residual | Mean absolute residual |
|---|---:|---:|---:|
| Kozánek 2009 within-family holdout | 2/2 | 10.282% | 5.304% |
| Fleming/NASA TN D-8270 second-source holdout | 2/2 | 3.680% | 1.718% |
| Combined | 4/4 | 10.282% | 3.767% |

Leakage audit: **PASS**.

## What these anchors support

These anchors support scoped statements about the documented benchmark
families and method-chain cases. They make the residual evidence, lifecycle
state, provenance, and applicability boundaries inspectable.

## What these anchors do not support

They do not support the following claims:

- Universal validation of all gas-bearing configurations.
- Engineering-freeze-grade validation for arbitrary rotor-bearing systems.
- Replacement of final high-fidelity CAE or experimental qualification.
- Validation of every AURA module in every operating regime.

## Why this matters

The value of the engineering-evidence layer is not that it proves everything.
Its value is that it records exactly what is supported, with quantitative
residuals and explicit limitations, so validation claims become inspectable
rather than asserted.
`;

const roadmap = `# Roadmap

This page tracks public planned development for the AURA Validation Chain
Registry and supporting infrastructure. All items are conditional on funding,
time, and the priorities surfaced during ongoing work.

## Completed

- Public registry scaffold.
- MkDocs documentation site.
- Two public engineering-evidence anchors in \`cases/public/\`:
  - \`VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001\`
  - \`VCR_AURA_JOURNAL_AEROSTATIC_L4_DUAL_BENCHMARK_001\`

## Schema and registry

- Schema v1.2 — refinements based on engineering-evidence layer experience.
- Per-anchor detail pages in this documentation site.
- Machine-readable registry index.
- Additional gas-bearing engineering-evidence anchors.

## Methodology

- Methodology paper — in preparation for external review and submission.
- Follow-up paper on source-equivalent solver implementation — planned.

## Platform (separate from registry)

- AURA Engineering Platform v0.4 — source-equivalent 2D Reynolds solver for
  conical aerostatic bearings, helium / hydrogen working-fluid support, and
  additional engineering-evidence anchors.
- AURA platform pilot module for proprietary anchor management under NDA.

## Roadmap is not a commitment

Items above represent current direction. Specific timelines depend on funding
and execution capacity. The registry reports progress as items are completed,
not before.
`;

const docsReadme = `# AURA Documentation Site

Static documentation site skeleton for the AURA Validation Chain Registry.
Built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## Quick start

\`\`\`bash
# Install
pip install mkdocs-material

# Serve locally with live reload at http://127.0.0.1:8000
mkdocs serve

# Build static site to site/
mkdocs build

# Deploy to GitHub Pages (if configured)
mkdocs gh-deploy
\`\`\`

## Structure

\`\`\`
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
\`\`\`

## Substantive vs stub

Core substantive pages in v0.1.0:

- **Home** (\`index.md\`) — claim-evidence-disciplined positioning and current registry state
- **Methodology overview** (\`methodology/index.md\`) — BVC framework treatment
- **Engineering-evidence layer** (\`registry/engineering-evidence.md\`) — current public engineering-evidence anchors
- **Anchor submission guide** (\`contributing/anchors.md\`) — practical contributor walkthrough

The remaining pages may still contain section-under-development notices. Fill
these in as the registry implementation is consolidated.

## Brand

- Primary color: \`#081C2F\` (deep navy, sampled from logo)
- Accent color: \`#D17849\` (copper)
- Typography: Manrope (body) · Fraunces (headings) · JetBrains Mono (code)

These match the AURA landing page so visitors moving between
\`breshevengineering.com\` and the docs site see consistent identity.

## Hosting

- **GitHub Pages**: \`mkdocs gh-deploy\` pushes the built \`site/\` to the
  \`gh-pages\` branch. Configure repo settings → Pages → source: \`gh-pages\`.
  Site appears at \`https://lfnavigator.github.io/aura-registry/\`.
- **Custom domain**: add \`docs.breshevengineering.com\` CNAME to point at
  the GitHub Pages URL once domain is in place.
- **Netlify / Vercel**: alternative if more build control needed.

## Claim-evidence discipline

This documentation site applies the same governance the registry itself
enforces. **No overclaim.** Where content describes future work, the language is
conditional ("planned", "in preparation"). Where content describes current
state, the language matches what is actually committed to the registry.

The engineering-evidence layer currently contains two public engineering-
evidence anchors in \`cases/public/\`. The home page and registry overview
reflect that status without upgrading it to universal or arbitrary-geometry
production validation.

## Version

Site source v0.1.0 release alignment, June 2026. Schema v1.1 alignment. Two
public engineering-evidence anchors included.
`;

write("docs/index.md", home);
write("docs/registry/index.md", registryIndex);
write("docs/registry/engineering-evidence.md", engineeringEvidence);
write("docs/about/roadmap.md", roadmap);
write("DOCS_SITE_README.md", docsReadme);

// Remove named diagnostic/forensic examples from methodology pages while
// keeping Level C / Level D as generic evidence categories.
for (const file of ["docs/methodology/index.md", "docs/methodology/acceptance-policy.md"]) {
  replaceIn(file, (s) => {
    return s
      .replaceAll("OS-V:1010", "a commercial-CAE diagnostic deck")
      .replaceAll("OptiStruct", "a commercial-CAE solver")
      .replaceAll("2.21%", "a low-single-digit")
      .replaceAll("Nelson-McVaugh", "a historical rotor-dynamic benchmark")
      .replaceAll("Nelson–McVaugh", "a historical rotor-dynamic benchmark")
      .replace(/Example: the commercial-CAE solver[\s\S]*?without claiming Level B promotion\./g,
        "Example: a commercial-CAE diagnostic deck may be retained at Level C when it is useful for engineering screening but lacks the source equivalence or independent triangulation required for Level B promotion.")
      .replace(/The canonical example is the historical rotor-dynamic benchmark[\s\S]*?remains open for future investigation\./g,
        "A Level D record may preserve a documented benchmark reconstruction that did not close under the stated assumptions. The community gains diagnostic information; the implementation avoids hiding negative evidence; the unresolved question remains open for future investigation.");
  });
}

console.log("cleanup complete. Next: run `mkdocs build`, then run the grep checks.");
