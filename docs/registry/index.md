# Registry Overview

The AURA Validation Chain Registry is organized by validation layer and
acceptance level. For the conceptual framework, see the
[methodology overview](../methodology/index.md).

## Current public engineering-evidence anchors

The v0.1.0 public registry release contains two public engineering-evidence
anchors in `cases/public/`:

| Anchor | Scope | Public status |
|---|---|---|
| `VCR_BRESHEV_CONICAL_P05_METHOD_CHAIN_001` | Conical aerostatic bearing method-chain validation | Public engineering-evidence anchor |
| `VCR_AURA_JOURNAL_AEROSTATIC_L4_DUAL_BENCHMARK_001` | Aerostatic journal bearing dynamic coefficient holdout validation | Public engineering-evidence anchor |

## Reported evidence

- **Conical case:** method-chain residuals **3.938% / 7.143% / 7.692%**.
- **Journal case:** **4/4 holdout rows closed** across Kozánek 2009 and
  Fleming/NASA TN D-8270 benchmark families; maximum absolute residual
  **10.282%**; mean absolute residual **3.767%**; leakage audit **PASS**.
- **Solver-sanity layer:** 10 Level A solver-sanity checks used as
  mathematical implementation checks under the AURA dynamic workflow.

## Scope statement

These records are benchmark-scope engineering-evidence anchors. They are not
arbitrary-geometry production validation claims and do not replace final
high-fidelity CAE or experimental qualification.

Diagnostic and forensic records may be retained internally or documented
separately when useful for methodology development. They are not part of the
v0.1.0 public engineering-evidence release unless explicitly listed in
`cases/public/`.

## Lifecycle

Each registry entry passes through declared lifecycle states from initial draft
through promotion candidate to validated public anchor or to diagnostic /
forensic preservation.

Detailed per-anchor pages and a machine-readable registry index are being
prepared. For current anchor JSON entries, see the registry repository.

