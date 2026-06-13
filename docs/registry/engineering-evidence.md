# Engineering-Evidence Layer

The engineering-evidence layer contains validation chains that connect a
calculation method to physical, experimental, or benchmark-grounded engineering
data. Unlike solver-sanity anchors, these records are not only about whether
the math is implemented correctly. They document why a result can support a
particular engineering claim inside a defined applicability region.

## Current public engineering-evidence anchors

The v0.1.0 registry release contains two public engineering-evidence anchors:

| Anchor | Scope |
|---|---|
| `VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001` | Conical aerostatic bearing method-chain validation |
| `VCR_AURA_JOURNAL_AEROSTATIC_L4_DUAL_BENCHMARK_001` | Aerostatic journal bearing dynamic coefficient holdout validation |

## Anchor 1 — Conical aerostatic bearing method-chain case

Entry: `VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001`

Scope: conical aerostatic bearing P05 method-chain validation.

Reported residuals:

| Chain part | Quantity | Worst residual | Role |
|---|---:|---:|---|
| FEM vs experiment, P05 | Load capacity | 3.938% | Experimental grounding of the FEM route |
| PM/AURA vs validated FEM route, P05 | Axial stiffness | 7.143% | Method-chain support |
| PM vs FEM, P04 | Load capacity | 7.692% | Supporting comparison |

## Anchor 2 — Aerostatic journal bearing dual benchmark-family holdout

Entry: `VCR_AURA_JOURNAL_AEROSTATIC_L4_DUAL_BENCHMARK_001`

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

