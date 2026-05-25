# Registry Overview

The AURA Validation Chain Registry is organized by validation layer and
acceptance level. For the conceptual framework see the
[methodology overview](../methodology/index.md).

## Layers

- [Solver-sanity layer](solver-sanity.md) — analytical anchors against
  closed-form mathematical references.
- [Engineering-evidence layer](engineering-evidence.md) — multi-step
  chains terminating in measured or experimentally grounded physical data.

## Current public engineering-evidence anchor

The first public scoped Breshev gas-bearing method-chain anchor is now
available:

[`VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001`](https://github.com/lfnavigator/aura-registry/tree/main/cases/public/VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001)

It links industrial spindle evidence, experimentally validated FEM results,
and the Breshev perturbation method used in AURA. It is public and scoped;
it is not a universal validation claim.

## By acceptance level

- Level A · analytical sanity.
- Level B · public external benchmark.
- [Level C diagnostic records](diagnostic.md).
- [Level D forensic records](forensic.md).

## Lifecycle

Each registry entry passes through declared
[lifecycle states](lifecycle.md) from initial draft through promotion
candidate to validated public anchor or to diagnostic / forensic
preservation.

!!! note "Detailed registry pages under development"
    Per-anchor detail pages and machine-readable index are being prepared.
    For current anchor JSON entries see the
    [registry repository](https://github.com/lfnavigator/aura-registry).
