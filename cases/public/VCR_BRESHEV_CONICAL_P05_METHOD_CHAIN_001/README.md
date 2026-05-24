# VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001

Public scoped Breshev gas-bearing validation-chain release candidate.

## Decision

This entry is **not** a simple PM/FEM row and not a claim that every point is directly measured. It is a BVC chain:

1. Industrial / experimental baseline and Breshev dissertation/patent archive.
2. FEM validated against experiment for P05 load capacity (`worst |δ| = 3.938%`).
3. Breshev/AURA perturbation method checked against the validated-FEM route for P05 axial stiffness (`worst |δ| = 7.143%`).
4. Supporting PM-vs-FEM load-capacity comparison at P04 (`worst |δ| = 7.692%`).

## Public claim allowed

AURA/Breshev perturbation-method workflow is supported by an experiment-calibrated FEM chain for the documented conical aerostatic bearing family.

## Public claim not allowed

- full L5 BVC chain;
- universal gas-bearing validation;
- cylindrical journal bearing validation;
- rotor-dynamic engineering-freeze validation;
- claim that PM/FEM rows are themselves direct experimental rows.

## Why this corrects v024

The previous v024 package over-compressed the chain as if the 58–74 µm row alone were the full public anchor. This v026 package makes the actual validation logic explicit: real-machine/experiment pedigree → FEM validation → PM/AURA method correlation.

## Entry hash

`9c000af267bf46434d18d4cdef1c461771d21400ba54a144ef2421f4027b54e4`
