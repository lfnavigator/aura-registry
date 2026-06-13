# Methodology

The **Breshev Validation Chain (BVC)** is a methodological framework for
evidence-gated validation of rotor-dynamic engineering software. It
consists of three interlocking components:

1. A **two-layer registry** separating mathematical-implementation evidence
   from physical-behavior evidence.
2. A **four-level acceptance policy** governing promotion within and across
   layers.
3. A **two-gate model** combining structural and content completeness
   verification.

The methodology paper is in preparation for external review and submission.
This documentation summarizes the framework; the paper provides the formal
treatment.

---

## Why this framework exists

Modern rotor-dynamic computational engineering is mature in arithmetic but
uneven in validation discipline. A typical published study reports
results computed by a specific code with agreement against one or two
famous benchmarks asserted in a sentence. The reader is asked to
extrapolate from "this code reproduced a historical rotor-dynamic benchmark within 2%" to
"this code can be trusted on my own engineering case."

The extrapolation is precarious. Reproducing a single benchmark — when it
succeeds — validates a narrow set of solver capabilities on one geometry
under specific operating conditions. It does not validate cross-coupled
stability classification, forced-response phase angle, engineering
decision-gate logic, or chain integrity from bearing analysis through
design freeze. These are separate capabilities, each subject to its own
bugs, ambiguities, and silent assumptions.

For aerostatic gas bearings specifically — the regime where damping is
dominated by gas-film compressibility, stiffness is set by orifice
restriction coupled with Reynolds-equation pressure fields — this
validation deficit translates into operational engineering costs:
expensive instrumented test campaigns, conservative design margins, and
extended qualification timelines.

BVC addresses this by replacing **asserted validation** with **auditable
validation**. Not faster, not flashier. Auditable.

---

## Component 1 — Two-layer registry

The registry separates **what the solver computes correctly** from
**what the platform predicts about physical reality**.

### Solver-sanity layer

The lower layer contains analytical anchors that exercise specific solver
capabilities against closed-form mathematical references. Required residual:
machine precision, or below the prescribed numerical tolerance for
mesh-based or iteration-based cases.

Anchors in this layer answer questions of the form: *given that the
mathematical formulation is X, does the implementation compute X
correctly?* The answer is binary and reproducible. A solver-sanity anchor
either passes its acceptance criteria or it does not.

Examples in the active regression track include analytical critical-speed
references, Euler-Bernoulli shaft modal assembly, gyroscopic Campbell
forward/backward split, imported bearing matrix linear algebra,
synchronous forced response amplitude and phase, cross-coupled stability
classification, and end-to-end workflow chain integrity.

### Engineering-evidence layer

The upper layer contains multi-step chains terminating in measured
physical data: industrial baseline measurements, perturbation-method
analytical predictions, calibrated CFD, experimental rig data, with
explicit residuals at each step.

Anchors in this layer answer questions of the form: *given that the solver
computes X correctly, does X agree with measured physical behavior in
applicable operating regimes?* The answer here is more nuanced. An
engineering-evidence anchor declares its applicability region (e.g.,
eccentricity range, supply pressure range, geometry class) and reports
residuals at each chain step. The anchor is trusted only within the
declared region; outside that region, the trust verdict downgrades.

Public-anchor promotion in the engineering-evidence layer additionally
requires **independent external triangulation** from sources outside the
implementer's group — closing the self-validation vulnerability
structurally rather than asking for politely.

See the [two-layer registry detailed page](two-layer-registry.md) for the
schema-level treatment.

---

## Component 2 — Four-level acceptance policy

Each registry entry declares its acceptance level. Promotion rules are
encoded in JSON Schema with conditional validation; they are not editorial
assertions.

| Level | Name | Acceptance threshold | Typical evidence type |
|---|---|---|---|
| **A** | Analytical sanity | ≤ 1% residual (typically machine precision) | Closed-form mathematical reference |
| **B** | Public external benchmark | ≤ 2% with full provenance | Peer-reviewed published reference, independent group |
| **C** | External diagnostic | ≤ 5–6% | Commercial CAE comparison, external dataset without full parity |
| **D** | Forensic / blocked | n/a | Documented failure preserved openly |

### Level A — Analytical sanity

Closed-form references against which a solver's implementation can be
checked at machine precision. Examples: Jeffcott rotor critical speed,
Euler-Bernoulli modal assembly with closed-form eigenvalues, gyroscopic
Campbell split with analytical forward/backward frequencies.

A failing Level A anchor blocks all dependent claims. There is no
acceptable engineering case for a solver that cannot reproduce its own
mathematical foundations.

### Level B — Public external benchmark

Peer-reviewed published references with full provenance, where the
implementer reproduces published values within ≤ 2% across the documented
parameter range.

Public anchors at this level must additionally carry **independent external
triangulation** in the engineering-evidence layer, meaning at least one
peer-reviewed reference from outside the implementer's research group must
provide consistent supporting evidence.

### Level C — External diagnostic

Cross-checks against external datasets, commercial CAE results, or
proprietary measurements where exact source-equivalence is not established
or where residuals fall in the 2–6% range. These records are accepted as
**diagnostic information** — useful for engineering screening — but are
**not promoted to public-anchor status**.

Example: the a commercial-CAE solver a commercial-CAE diagnostic deck 1D beam-matrix deck comparison falls
here. The a low-single-digit residual on six whirl modes is engineering-meaningful but
not source-equivalent (different solver architectures), so the record is
preserved at Level C without claiming Level B promotion.

### Level D — Forensic / blocked

Documented failures, openly preserved. When a validation attempt does not
reproduce a reference within any reasonable acceptance threshold, and the
reasons cannot be fully diagnosed, the attempt is preserved as a forensic
record with all diagnostic variants documented.

The canonical example is the a historical rotor-dynamic benchmark (1976) reconstruction
attempt: ten diagnostic variants were attempted, none reproduced the
published values without parameter overfit. All ten variants are
preserved openly. The information the engineering community otherwise
loses — *why* a famous benchmark resists reproduction — is retained as a
public good.

See the [acceptance policy detailed page](acceptance-policy.md) for the
full normative treatment.

---

## Component 3 — Two-gate model

Schema-level validation alone is necessary but not sufficient. A registry
entry can satisfy structural completeness (all required fields present,
types correct, conditional rules satisfied) while still lacking content
completeness (e.g., all triangulation records present but with verdicts
that read `inconclusive` for every one).

BVC therefore enforces two separate gates:

### Structural gate (schema v1.1)

Validates that every registry entry meets the structural requirements:
- Required fields present
- Types and value ranges correct
- Conditional validation rules satisfied (e.g., engineering-evidence
  layer public anchors must carry external triangulation block; that
  block must contain ≥ 2 triangulation records of which ≥ 1 marked
  `provides_independent_evidence`)
- Deterministic SHA-256 hash present and matches canonical serialization

### Quality gate (runtime validator)

Validates that the registry entry's substantive content meets BVC
acceptance criteria:
- For engineering-evidence layer public-anchor candidates: at least one
  triangulation record with `provides_independent_evidence: true` AND
  `author_group_independent_of_implementer: true` AND verdict NOT in
  {`inconclusive`}.
- This prevents a registry entry from masquerading as completed-evidence
  by carrying many `inconclusive`-verdict records.

Both gates must pass for engineering-evidence layer public-anchor
promotion. Neither is sufficient alone.

See the [two-gate model detailed page](two-gate-model.md) for the
operational treatment with code examples.

---

## How this relates to adjacent computational fields

BVC's structural design is informed by validation discipline in
neighboring computational communities:

- **CFD verification and validation** as formalized in
  [ASME V&V 20-2009](https://www.asme.org/codes-standards/find-codes-standards/v-v-20-standard-verification-validation-computational-fluid-dynamics-heat-transfer)
  (Standard for Verification and Validation in Computational Fluid Dynamics
  and Heat Transfer) and the more general
  [ASME V&V 10-2019](https://www.asme.org/codes-standards/find-codes-standards/v-v-10-guide-verification-validation-computational-solid-mechanics).
- **Open turbulence model verification** at the
  [NASA Langley Turbulence Modeling Resource](https://turbmodels.larc.nasa.gov/),
  which has provided the CFD community with reusable validation
  infrastructure for two decades.
- **Reproducible data science** principles as articulated by the
  [FAIR Data Principles](https://www.go-fair.org/fair-principles/) work
  (Wilkinson et al., 2016) and operationalized across multiple research
  communities.

BVC adapts the spirit of these adjacent disciplines to a community —
rotor-dynamic computational engineering — that has not yet built equivalent
shared infrastructure.

---

## Next reading

- [Two-layer registry](two-layer-registry.md) — schema-level treatment
- [Acceptance policy](acceptance-policy.md) — normative rules per level
- [Two-gate model](two-gate-model.md) — structural and content gates
- [Triangulation](triangulation.md) — independent external evidence
  requirements
- [Schema v1.1 reference](../schema/v1-1.md) — implementation-level
  reference
