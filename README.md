# AURA Registry — Breshev Validation Chain

[![License: MIT](https://img.shields.io/badge/Schemas-MIT-blue.svg)](LICENSE-MIT)
[![License: CC BY 4.0](https://img.shields.io/badge/Cases-CC%20BY%204.0-lightgrey.svg)](LICENSE-CC-BY-4.0)

[![DOI](https://zenodo.org/badge/1242614387.svg)](https://doi.org/10.5281/zenodo.20686707)

**An open registry of validated reference cases for aerostatic gas-bearing rotor systems, built on the Breshev Validation Chain (BVC) methodology.**

Maintained by Breshev Engineering. Co-authored by V. Breshev (methodology) and O. Breshev (platform). Part of the AURA Engineering Platform (currently AURA v0.3.0-alpha).

**Status:** v0.1.0 public registry release. Two public engineering-evidence anchors are available in `cases/public/`. Claims are benchmark-scope and not arbitrary-geometry production validation.

---

## What this is

This repository contains:

- **JSON Schemas** that define how engineering cases and validated anchor entries are structured under the BVC methodology.
- **Public anchor cases** — validated reference cases with full traceable provenance from industrial baseline through analytical method, calibrated CFD, and (where available) experimental verification.
- **Documentation** of the BVC methodology itself.

The AURA software platform is maintained separately. It generates engineering cases conforming to these schemas and produces decision packages that reference registry entries.

This repository is the **public, citable, auditable** counterpart to AURA. Every published anchor case is reproducible, every residual traceable, every applicability boundary explicit.

---

## Why this exists

In CAE engineering, the question that determines whether a simulation result can support a design decision is rarely *"is the math correct?"* but rather *"how confident can we be in the model's applicability to this specific case?"*

Most CAE tools provide a result. Few provide trust. Even fewer provide a traceable chain of evidence from physical reality through analytical model, numerical simulation, and experimental verification, with explicit residuals at each step and a defined applicability region.

The Breshev Validation Chain methodology addresses this gap. It treats each validated case as a multi-step chain of evidence with measurable residuals and explicit limitations. The AURA Registry is the open implementation of this methodology for aerostatic gas-bearing rotor systems.

The methodology rests on three decades of research and engineering work by the Breshev family, including: an industrial baseline (Monokristall machine bearing with full measured data); an improved analytical perturbation method validated against that baseline; calibrated CFD analyses cross-checked against the perturbation method; and an experimental aerostatic spindle built and measured to verify the full chain.

This work is now being formalized as an open registry, schema set, and validation methodology.

---

## Core schemas

### `schemas/aura-case/v1.1/schema.json`

The **AURA Engineering Case** schema. Defines the canonical contract for a single engineering case — geometry, operating conditions, static and dynamic results, evidence linkages, trust verdict, and provenance.

Key design properties:

- `dampingEvidenceLevel` (D0–D4) is a required field on every dynamic result, forcing explicit acknowledgment of damping data source.
- `evidenceLevel` (L0–L5) is a required field on evidence, classifying the overall evidence strength.
- `caseVisibility` is required (private / internal / public_anchor), preventing inadvertent IP leakage.
- `trust` is a deterministic verdict object including human-readable `reasons[]` with severity levels.
- `provenance` includes `auraVersion`, `methodologyVersion`, `inputsHash` (SHA-256), and optional `reviewer` attribution.
- `additionalProperties: false` throughout — strict mode prevents silent data drift.

Used by every AURA module that creates or consumes engineering cases.

### `schemas/aura-vcr/v1.0/schema.json`

The **AURA Validation Chain Registry Entry** schema. Defines the canonical contract for a validated reference anchor in the registry.

Key design properties:

- `chainSteps[]` — sequential validation steps with required `residualToPrevious` (null for baseline). Each step declares `source`, `dataAvailable`, `acceptanceCriteria`, and `expertReview`.
- `chainStatus` distinguishes `complete`, `complete_with_notes`, `partial`, `broken`, and `in_progress`.
- `applicabilityRegion` declares numeric bounds within which the anchor is valid; `extrapolationAllowed: false` by default.
- `evidenceLevel` (L0–L5) classifies overall anchor evidence strength.
- Conditional validation: entries with `registryVisibility: public_anchor` are required to have CC-BY-4.0 license with attribution, `validated_anchor` or `benchmark_anchor` lifecycle, and full `references` and `provenance`. This is enforced at schema validation time.

Used by AURA's domain shift detector, trust function, and similarity matcher.

---

## BVC evidence ladders

The methodology uses two parallel ladders.

### Overall evidence level (L0–L5)

Classifies the overall strength of evidence backing a case or anchor.

| Level | Description |
|---|---|
| L0 | Analytical method only, no external check |
| L1 | Analytical + literature correlation |
| L2 | Analytical + CFD comparison (uncalibrated) |
| L3 | Calibrated CFD aligned with analytical method |
| L4 | Experimental data supports the chain |
| L5 | Benchmark anchor: full chain, all residuals within thresholds, expert-reviewed and publicly published |

### Damping evidence level (D0–D4)

Specific to dynamic analysis. Damping coefficients are often the weakest point in rotor-bearing simulation; this ladder forces explicit acknowledgment.

| Level | Source | Permits |
|---|---|---|
| D0 | Constant / proxy fallback | Screening only |
| D1 | Literature-based criterion | Review required |
| D2 | Perturbation-method computed | Conditional decision package with limitations |
| D3 | CFD-calibrated against known anchor | Strong decision package evidence |
| D4 | Experimentally measured or identified | Engineering-grade evidence |

The AURA Decision Freeze function consults both ladders and downgrades freeze permission accordingly. A case with proxy damping (D0) cannot produce engineering-grade freeze regardless of how strong other evidence is.

---

## Repository structure

```
aura-registry/
├── schemas/
│   ├── aura-case/
│   │   └── v1.1/
│   │       └── schema.json
│   └── aura-vcr/
│       └── v1.0/
│           └── schema.json
├── cases/
│   ├── public/                    # CC-BY-4.0 — anchor cases publishable globally
│   │   ├── VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001/
│   │   │   ├── registry_entry.json
│   │   │   ├── references.md
│   │   │   └── attached/
│   │   ├── VCR_AURA_JOURNAL_AEROSTATIC_L4_DUAL_BENCHMARK_001/
│   │   │   └── registry_entry.json
│   │   └── ...
│   └── internal/                  # not publicly tracked
├── docs/
│   ├── methodology/
│   │   ├── BVC-overview.md
│   │   ├── evidence-ladders.md
│   │   ├── applicability-regions.md
│   │   └── acceptance-criteria.md
│   └── how-to/
│       ├── creating-anchor-entry.md
│       └── validating-against-registry.md
├── tools/                          # MIT — schema validators, helpers
├── examples/
├── VERSIONING.md                   # schema versioning and migration policy
├── LICENSE-MIT                     # for schemas/ and tools/
├── LICENSE-CC-BY-4.0               # for cases/public/ and docs/
└── README.md
```

---

## Licensing

This repository uses **two licenses**, applied per directory:

- **MIT** for `schemas/`, `tools/`, and `examples/` — covers all code, validation tooling, and JSON Schema definitions. Permissive reuse.
- **CC-BY-4.0** for `cases/public/` and `docs/` — covers anchor case data, technical methodology documentation, and any structured scientific content. Reuse permitted with attribution.

The attribution requirement for CC-BY-4.0 content is:

> *O. Breshev, V. Breshev, AURA Engineering Platform / Breshev Validation Chain Registry*

Cases in `cases/internal/` (if present) are proprietary and not published.

---

## Citing this work

If you use the BVC methodology, schemas, or any anchor case from this registry in academic publications, please cite:

> Breshev, V., & Breshev, O. (2026). *Breshev Validation Chain Methodology for Aerostatic Gas-Bearing Rotor Design*. AURA Engineering Platform / Breshev Engineering. https://github.com/lfnavigator/aura-registry

For version-specific citation, cite the repository release tag or archived DOI when available.

When citing a specific anchor case, include its `entryId`. For example:

> ...validated against AURA Registry anchor `VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001` (Breshev & Breshev, 2026).

A formal whitepaper describing the methodology and initial anchor cases will be published as an arXiv preprint in summer 2026.

For the archived public registry release, cite:

Breshev, O. (2026). *AURA Validation Chain Registry: Public Engineering-Evidence Anchors for Aerostatic Gas-Bearing Rotor Systems* (v0.1.0). Zenodo. https://doi.org/10.5281/zenodo.20686708

The concept DOI for the latest registry release is: https://doi.org/10.5281/zenodo.20686707


---

## Validation tooling

Schemas conform to **JSON Schema Draft 2020-12**.

To validate an entry against the schema (Python example):

```python
import json
import jsonschema

with open('schemas/aura-vcr/v1.0/schema.json') as f:
    vcr_schema = json.load(f)

with open('cases/public/VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001/registry_entry.json') as f:
    entry = json.load(f)

jsonschema.validate(entry, vcr_schema)
print("Entry valid.")
```

JavaScript / Node:

```javascript
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ strict: true });
addFormats(ajv);

const validate = ajv.compile(vcrSchema);
if (!validate(entry)) {
  console.error(validate.errors);
}
```

A reference validator and helper scripts will be added to `tools/` over the next several weeks.

---

## Contributing

This is a curated registry, not an open-edit wiki. Cases enter the public registry only via a lifecycle promotion process:

```
saved → reviewed → validated_anchor → benchmark_anchor
                                  ↘ rejected
```

Each transition is manual, requires reviewer attribution (`role`, `verdict`, `dateIso`), and is recorded in the entry's `lifecycleHistory`. The methodology authority for this registry is V. Breshev. Quality review of public artifacts is performed before promotion to `validated_anchor`.

External contributions are welcome via two paths:

1. **Schema feedback** — open an issue in this repository describing proposed schema improvements, edge cases the current schema does not cover, or clarifications needed. Schema-level changes require careful review and versioned migration. See `VERSIONING.md` for migration policy.

2. **Anchor case proposals** — academic groups and engineering teams with validated cases of their own (with measured data, calibrated CFD, or experimental verification) are invited to propose cases for inclusion. Open an issue describing the case; if accepted for review, you will be invited to submit a draft `registry_entry.json` conforming to `aura-vcr/v1.0`.

We do not accept anchor cases without traceable provenance, residual data, or expert review.

---

## Roadmap

**Q3 2026:**
- Add additional public anchors only after evidence review, scope definition, and residual-level validation are complete.
- Whitepaper preprint on arXiv
- Tooling: reference validator, similarity matcher example

**Q4 2026:**
- First peer-reviewed publication submitted (Tribology International or Journal of Tribology)
- decision package format specification
- Additional anchor cases from systematic CFD archive curation

**Q1 2027:**
- AURA Technical Webinar Series (monthly) covering BVC methodology and registry use
- Second peer-reviewed publication
- Schema v1.2 with feedback incorporated

**2027+:**
- Open invitations for adjacent niche extensions (foil bearings, hydrostatic bearings, magnetic bearings)
- Cross-domain pilot for horizontal trust layer generalization

---

## Contact

For technical questions, anchor case proposals, or collaboration inquiries:

- **GitHub Issues** (preferred for technical/schema topics): https://github.com/lfnavigator/aura-registry/issues
- **Email**: aura@breshevengineering.com
- **Website**: https://breshevengineering.com
- **LinkedIn**: https://www.linkedin.com/in/alekseybreshev/

For scoped engineering review or pilot inquiries based on the AURA / BVC methodology, see https://breshevengineering.com.

---

## Acknowledgments

The Breshev Validation Chain methodology rests on decades of work in aerostatic bearing design and rotor dynamics. The foundation case derives from extensive measurements on the Monokristall machine industrial bearing. The improved perturbation method was developed and refined through coordinated analytical and experimental work. The experimental aerostatic spindle that closes the validation chain was designed, built, and measured by the Breshev team.

Special acknowledgment to **Pavel Nosko**, academic supervisor of the doctoral work in which AURA and BVC are being formally documented and published.

---

## Canonical reference block

For inclusion in publications, slide decks, schema documentation, and external citations:

```
Organization:           Breshev-Engineering
Repository:             aura-registry
Platform:               AURA Engineering Platform
Software version:       AURA v0.3.0-alpha
Methodology:            Breshev Validation Chain (BVC)
Registry:               AURA / BVC Validation Chain Registry
Schema license:         MIT
Public case license:    CC-BY-4.0
Founder:                O. Breshev (operational lead)
Methodology co-author:  V. Breshev (expert reviewer)
```

---

*This README is the public-facing introduction to the AURA Registry. Schema files in `schemas/` are authoritative for data structure. Methodology documents in `docs/methodology/` are authoritative for theoretical and procedural details. Where this README and the schemas conflict, the schemas govern.*
