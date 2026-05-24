# Registry Overview

The AURA Validation Chain Registry is organized by validation layer and
acceptance level. For the conceptual framework see the
[methodology overview](../methodology/index.md).

## Layers

- [Solver-sanity layer](solver-sanity.md) — analytical anchors against
  closed-form mathematical references.
- [Engineering-evidence layer](engineering-evidence.md) — multi-step
  chains terminating in measured physical data.

## Public engineering-evidence anchor

The first public scoped Breshev gas-bearing method-chain anchor is now in
the registry:

- [`VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001`](engineering-evidence.md)
- GitHub path:
  [`cases/public/VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001`](https://github.com/lfnavigator/aura-registry/tree/main/cases/public/VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001)

This entry links industrial spindle evidence, experimentally validated
FEM results, and the Breshev perturbation-method route used in AURA. It is
public scoped engineering evidence, not a universal validation claim.

## By acceptance level

- Level A · analytical sanity
- Level B · public external benchmark
- [Level C diagnostic records](diagnostic.md)
- [Level D forensic records](forensic.md)

## Lifecycle

Each registry entry passes through declared
[lifecycle states](lifecycle.md) from initial draft through promotion
candidate to validated public anchor (or to diagnostic / forensic
preservation).

!!! note "Registry index under development"
    Per-anchor detail pages and machine-readable aggregate indexes are
    being prepared alongside the schema v1.1 rollout. The first public
    gas-bearing method-chain anchor is already available in the
    [registry repository](https://github.com/lfnavigator/aura-registry/tree/main/cases/public/VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001).
