# Engineering-Evidence Layer

The engineering-evidence layer contains validation chains that connect a
calculation method to physical or experimentally grounded engineering data.
Unlike solver-sanity anchors, these records are not only about whether the
math is implemented correctly. They document why a result can support a
particular engineering claim inside a defined applicability region.

!!! success "First public scoped gas-bearing anchor"
    The registry now contains the first public scoped Breshev gas-bearing
    method-chain anchor:
    [`VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001`](https://github.com/lfnavigator/aura-registry/tree/main/cases/public/VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001).

## First public Breshev gas-bearing method-chain anchor

**Entry:** `VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001`

**Scope:** conical aerostatic bearing, P05 method-chain validation.

**What it links:**

1. Industrial / experimental spindle evidence from the Breshev research line.
2. FEM / МКЭ results validated against experimental load-capacity data.
3. The Breshev perturbation method / МВ used as the calculation basis in AURA.
4. Supporting PM-vs-FEM comparisons for the documented conical bearing family.

## Reported residuals

| Chain part | Quantity | Worst residual | Role |
|---|---:|---:|---|
| FEM vs experiment, P05 | Load capacity | 3.938% | Experimental grounding of the FEM route |
| PM/AURA vs validated FEM route, P05 | Axial stiffness | 7.143% | Method-chain support |
| PM vs FEM, P04 | Load capacity | 7.692% | Supporting comparison |

These residuals make the entry suitable as a **public scoped
engineering-evidence anchor**. They do not upgrade the full AURA platform to
universal gas-bearing validation.

## What this anchor supports

This anchor supports the statement:

> The Breshev perturbation-method workflow used in AURA is supported by an
> experimentally grounded FEM route for the documented conical aerostatic
> bearing family.

## What this anchor does not support

It does **not** support the following claims:

- Full universal validation of all gas-bearing configurations.
- Full L5 Breshev Validation Chain completion.
- Validation of cylindrical journal bearings.
- Engineering-freeze-grade validation for arbitrary rotor-bearing systems.
- Direct validation of every AURA module.

## Why this matters

This anchor is the first public record connecting the BVC methodology to the
specialized domain where AURA has its strongest intellectual foundation:
aerostatic gas-bearing rotor systems. It is intentionally scoped. Its value is
not that it proves everything; its value is that it proves one documented chain
without overclaiming.

## Next engineering-evidence targets

Planned next records include:

- Conical bearing radial-load / clearance comparison.
- Perturbation K/C anchor for dynamic coefficients.
- CFD-vs-perturbation comparison.
- Experimental spindle correlation.
- Gas-bearing-to-rotor-dynamic chain validation.
