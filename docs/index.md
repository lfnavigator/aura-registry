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

The methodology paper is **in preparation for external review and
submission**. The registry is active and already contains its first public
scoped Breshev gas-bearing method-chain anchor.

---

## Current state — May 2026

!!! success "Registry status snapshot"
    The registry now contains a first public scoped engineering-evidence
    anchor for the Breshev conical aerostatic bearing method chain:
    `VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001`.

| Layer | Current state | Public status |
|---|---|---|
| Solver-sanity | 10 analytical rotor-dynamic anchors in the active regression track | Level A foundation |
| Engineering-evidence | 1 public scoped Breshev gas-bearing method-chain anchor | Public scoped anchor |
| Diagnostic (Level C) | OS-V:1010 external diagnostic comparison | Diagnostic only, not public benchmark |
| Forensic (Level D) | Nelson-McVaugh reconstruction record | Forensic/internal, not active evidence |

What this means in practice:

- The solver-sanity layer exercises specific solver capabilities against
  closed-form mathematical references. These anchors form the mathematical
  verification foundation under AURA's dynamic workflow.
- The engineering-evidence layer now includes a first public scoped
  gas-bearing anchor: a Breshev conical aerostatic bearing method-chain case
  linking industrial spindle evidence, experimentally validated FEM results,
  and the Breshev perturbation method used in AURA.
- Diagnostic and forensic records are deliberately preserved when they are
  useful for methodology development, but they are not promoted into
  engineering-grade evidence unless their provenance supports that promotion.

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
