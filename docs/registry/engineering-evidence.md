# Engineering-Evidence Layer

The engineering-evidence layer contains validation chains that connect a
calculation route to measured physical behavior. Unlike solver-sanity
anchors, these records are not merely checking that a mathematical
operation was implemented correctly. They ask whether a calculation
workflow is credible for a documented engineering case.

## First public scoped anchor

The registry now contains the first public Breshev gas-bearing
method-chain anchor:

[`VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001`](https://github.com/lfnavigator/aura-registry/tree/main/cases/public/VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001)

This anchor is a conical aerostatic bearing method-chain record. It links:

1. industrial spindle / experimental evidence from the Breshev research
   program;
2. FEM / МКЭ results validated against experiment;
3. Breshev perturbation-method / МВ results checked against the validated
   FEM route;
4. the AURA calculation basis derived from that perturbation-method route.

## Reported residuals

The public folder includes CSV data, source records, source hashes, a
governance note, and a registry entry.

| Chain component | Role | Reported worst residual |
|---|---|---:|
| FEM vs experiment, P05 load capacity | experimental support for the FEM route | 3.938% |
| Perturbation method / AURA route vs validated FEM, P05 axial stiffness | main method-chain comparison | 7.143% |
| Perturbation method vs FEM, P04 load capacity | supporting method-chain comparison | 7.692% |

## What this validates

This anchor supports the claim that, for the documented conical aerostatic
bearing family, the Breshev perturbation-method route used by AURA is
supported by an experimentally grounded FEM chain.

It is appropriate to call this:

- a public scoped engineering-evidence anchor;
- a Breshev conical gas-bearing method-chain record;
- a first public BVC engineering-evidence milestone.

## What this does not validate

This anchor must not be used to claim:

- universal validation of all gas-bearing configurations;
- full L5 BVC completion;
- validation of cylindrical journal bearings;
- validation of all AURA gas-bearing modules;
- engineering-freeze approval for arbitrary rotor-dynamic designs.

Those claims require additional anchors and, for full L5 status, a more
complete chain through calibrated CFD, experiment, and rotor-dynamic
implication.

## Forward work

The next engineering-evidence work should add:

1. a second public conical aerostatic bearing anchor from the current
   extraction package;
2. a damping / K-C perturbation anchor;
3. a calibrated CFD comparison anchor;
4. an experimental spindle / rotor-dynamic implication chain.

For the conceptual framework, see the
[methodology overview](../methodology/index.md). For schema and tooling,
see the [schema overview](../schema/index.md).
