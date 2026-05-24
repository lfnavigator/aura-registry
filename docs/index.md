# AURA Validation Chain Registry

**The open evidence-gated validation registry for aerostatic gas-bearing rotor-dynamic engineering software.**

Maintained by **Breshev Engineering**. Schema and documentation under
[CC-BY-4.0](contributing/licensing.md). Validation infrastructure code under
[MIT license](contributing/licensing.md). Repository:
[github.com/lfnavigator/aura-registry](https://github.com/lfnavigator/aura-registry).

---

## What this is

A schema-enforced public record of validation evidence for rotor-dynamic
engineering software, with a focus on aerostatic gas-bearing systems
(precision spindles, microturbomachinery, cryogenic engineering, civilian
high-reliability rotating machinery).

The registry implements the **Breshev Validation Chain (BVC)** methodology:

- A **two-layer registry** separating solver-sanity evidence (analytical
  anchors at machine precision) from engineering-evidence chains (multi-step
  evidence terminating in measured physical data).
- A **four-level acceptance policy** (analytical sanity ≤ 1% · public
  benchmark ≤ 2% · external diagnostic ≤ 5–6% · forensic/blocked) enforced
  at JSON Schema validation time, not by editorial review.
- A **two-gate model** combining structural completeness (schema gate) and
  content completeness (runtime quality gate).
- Deterministic SHA-256 hashes over canonical serialization for every
  registry entry, enabling third-party re-validation without access to
  private systems.

The methodology paper is **in preparation for external review and
submission**. The registry itself is in active development; promoted public
anchors will be added as validation evidence is consolidated and reviewed.

---

## Current state — May 2026

!!! note "Registry status snapshot"
    The numbers below reflect the **active regression track** (anchors that
    exist, pass schema validation, and run on every solver revision).
    Public-anchor promotion happens after additional review and
    triangulation requirements are met per the acceptance policy.

| Layer | Current public / active state | Promotion status |
|---|---|---|
| Solver-sanity | 10 anchors in the active Level A regression track | Public-entry consolidation in progress |
| Engineering-evidence | 1 public scoped Breshev gas-bearing method-chain anchor: `VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001` | Validated with documented limitations |
| Diagnostic (Level C) | 1 record (`OS-V:1010`) | Diagnostic, not promoted |
| Forensic (Level D) | 1 record (`Nelson-McVaugh 1976`) | Blocked, openly preserved |

What this means in practice:

- The solver-sanity layer exercises specific solver capabilities against
  closed-form mathematical references. All ten anchors in the active
  regression pass at machine precision. One uncovered and led to fixing a
  real backend bug during validation work.
- The engineering-evidence layer now contains the first public scoped
  Breshev gas-bearing method-chain anchor. It links industrial spindle
  evidence, experimentally validated FEM results, and the Breshev
  perturbation-method route used in AURA. It is not a universal validation
  claim for all gas-bearing configurations.
- The diagnostic and forensic records are deliberately preserved openly.
  A validation methodology that hides its scope limits or its failed
  reconstructions does not deserve trust.

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

**Evidence over assertion.** Every claim in the registry is backed by either
an analytical reference (mathematical), a published benchmark (peer-reviewed
external), or a documented engineering-evidence chain (measured physical
data with explicit residuals). Marketing-grade validation claims —
"validated against industry benchmarks", "production-grade accuracy" — have
no place in the registry.

**Scope explicit.** Each anchor declares its applicability region. A solver
validated for a specific eccentricity range, supply pressure range, and
geometry class is not validated outside that range. The trust verdict for a
specific engineering case is a deterministic function of which anchors
cover its operating envelope.

**Honest failure mode.** When a validation attempt fails, the failure is
recorded as a forensic entry (Level D), not hidden. The Nelson-McVaugh
(1976) reconstruction is the canonical example: ten diagnostic variants
attempted, none reproduced the published values without parameter overfit,
all preserved openly.

**Promotion discipline.** Public entries must declare their evidence scope,
source provenance, applicability region, limitations, and hashable
artifacts. Full external-benchmark promotion requires independent parity
and source-equivalence checks; scoped engineering-evidence anchors may be
published with narrower claims when their chain, limitations, and residuals
are explicit.

---

## Quick technical facts

- **Schema:** JSON Schema Draft 2020-12 with conditional validation rules.
  Current version: [v1.1](schema/v1-1.md).
- **Hashing:** SHA-256 over canonical JSON serialization for promoted public entries and hashable source artifacts.
- **Licensing:** Schema and documentation under
  [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
  Validation infrastructure code under
  [MIT License](https://opensource.org/licenses/MIT).
- **Repository:** [github.com/lfnavigator/aura-registry](https://github.com/lfnavigator/aura-registry).
- **Issues and discussions:** GitHub Issues, with a code of conduct
  applicable to all contributors.

---

## Acknowledgments

Methodology developed by **Breshev Engineering** based on three decades of
original aerostatic bearing research. Open registry implementation by
A.V. Breshev with technical contributions from V.E. Breshev. Academic
review support acknowledged separately on the
[team page](about/team.md) when public-attribution approvals are in place.

---

*This documentation site is itself versioned alongside the registry schema.
Current site version reflects schema v1.1 and the active regression state
as of May 2026.*
