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
anchors in `cases/public/`.

---

## Current state — June 2026

!!! success "Registry status snapshot"
    The registry currently contains two public engineering-evidence anchors
    in `cases/public/`. These records expose residual-level validation
    evidence, lifecycle state, provenance, and applicability boundaries.

| Anchor | Scope | Current public status |
|---|---|---|
| `VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001` | Conical aerostatic bearing method-chain validation | Public engineering-evidence anchor |
| `VCR_AURA_JOURNAL_AEROSTATIC_L4_DUAL_BENCHMARK_001` | Aerostatic journal bearing dynamic coefficient holdout validation | Public engineering-evidence anchor |

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
`cases/public/`.

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

