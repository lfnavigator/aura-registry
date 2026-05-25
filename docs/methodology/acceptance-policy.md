# The Four-Level Acceptance Policy

The Breshev Validation Chain methodology distinguishes four acceptance
levels for validation evidence. Each level has a defined acceptance
threshold, a defined evidence type, and explicit promotion rules
encoded in the [schema v1.1](../schema/v1-1.md) conditional validation.

The four levels are not a quality ranking. They are an **evidence
type ranking** — different kinds of validation evidence support
different kinds of engineering claims, and the level structure makes
the difference auditable rather than implicit.

---

## At a glance

| Level | Name | Threshold | Evidence type | Engineering use |
|---|---|---|---|---|
| **A** | Analytical sanity | ≤ 1% (typically machine precision) | Closed-form mathematical reference | Solver verification |
| **B** | Public external benchmark | ≤ 2% with full provenance | Peer-reviewed published reference, independent group | Engineering freeze; formal verification |
| **C** | External diagnostic | ≤ 5–6% | Commercial CAE, external datasets, derived references | Design screening; comparative analysis |
| **D** | Forensic / blocked | n/a | Documented failure preserved openly | Community evidence; future investigation |

A given registry entry sits at exactly one acceptance level. The level
is declared in the entry's `acceptanceLevel` field and enforced
structurally by the schema.

---

## Level A — Analytical sanity

**Threshold.** Worst-case relative residual ≤ 1%. In practice, most
Level A anchors achieve machine precision (residuals at the order of
10⁻¹² or below for the floating-point arithmetic) because they
exercise closed-form mathematical relationships where any non-zero
residual indicates an implementation bug.

**Evidence type.** Closed-form mathematical reference. The reference
is derived analytically from the underlying mathematics of the
solver's problem class. Examples: Jeffcott rotor critical speed
from undamped second-order ODE eigenvalue analysis; Euler-Bernoulli
beam modes from analytically known eigenvalues; gyroscopic Campbell
forward/backward whirl split from rotational dynamics theory; imported
bearing K/C matrix damped modes from direct linear algebra.

**What Level A certifies.** That the solver correctly implements the
mathematical formulation it claims to implement. Level A does **not**
certify that the solver produces physically meaningful results in
engineering practice — it certifies that the solver computes what
its math says it computes.

**Engineering use.** Level A evidence is the foundation under which
all other evidence rests. A solver that fails Level A on a given
capability cannot reliably support engineering decisions in any
broader sense. Level A is the baseline gate.

**Failure mode.** A Level A anchor either passes (residual at machine
precision, indicating correct implementation) or fails (residual at
some non-trivial magnitude, indicating an implementation bug). There
is no middle ground at Level A. When a Level A anchor fails, the
underlying bug must be identified and fixed before the anchor is
promoted.

A Level A failure during the development of the AURA platform
specifically led to the discovery and fix of a backend bug in the
gyroscopic Campbell split implementation — illustrating that Level A
serves not only as a verification check but as an active diagnostic
mechanism.

---

## Level B — Public external benchmark

**Threshold.** Worst-case relative residual ≤ 2% across the parameter
range covered by the reference, with full provenance.

**Evidence type.** Peer-reviewed published reference from a research
group independent of the implementer. The reference must be:
- Published in a peer-reviewed venue with editorial process
- Authored by a group with no shared affiliation, co-authorship, or
  funding relationship with the implementer
- Specific enough that the implementer's reproduction can be checked
  against published numerical values, charts, or detailed
  experimental protocols
- Accessible to third parties (no proprietary or restricted-access
  references)

**Additional requirement for engineering-evidence layer Level B.**
When the anchor is in the engineering-evidence layer (multi-step chains
terminating in measured physical data), Level B promotion additionally
requires the `externalTriangulation` block to contain at least one
triangulation record with `provides_independent_evidence: true` and
non-`inconclusive` verdict. This is the [two-gate model](two-gate-model.md)
at work: structural completeness via schema + content completeness via
runtime quality gate, neither sufficient alone.

**What Level B certifies.** That the implementation reproduces published
external reference results to within the engineering-acceptable
threshold, with independent verification that the reproduction is not
self-validation. Level B is the strongest evidence type the BVC
methodology supports.

**Engineering use.** Level B evidence supports engineering decisions
requiring formal verification: design freeze for production systems,
qualification submissions for regulated industries, formal verification
documentation for defense or aerospace applications, validation
documentation for downstream customers requiring auditable evidence.

**The independence requirement.** Level B's independent-group
requirement is not modesty for its own sake. It is the structural
response to the self-validation vulnerability that affects nearly all
proprietary CAE validation: a research group asserting that its
software matches its own group's measurements provides no independent
epistemic warrant for third-party engineering use. Level B closes this
loophole by requiring evidence from outside the implementer's circle.

**Realistic frequency.** Level B promotions are rare and expensive.
Most validation evidence sits at Levels A or C. Level B should be
treated as an aspirational milestone that anchors achieve when the
work justifies it, not as a default category.

---

## Level C — External diagnostic

**Threshold.** Worst-case relative residual typically in the range of
2–6%, in a category where source-equivalence is not established.

**Evidence type.** Cross-checks against external datasets, commercial
CAE solver outputs, or proprietary measurements where exact
source-equivalence is not established or where the residuals fall in
the 2–6% range. Examples: comparison against another commercial code's
verification deck (where the reference is the other solver's own
output, not a peer-reviewed analytical solution); comparison against
industrial measurements without complete instrumentation provenance;
comparison against derived references (chart digitization, table
extraction from textbooks) where accuracy propagation from the
original source is not preserved.

**What Level C certifies.** That the implementation produces results
consistent with an external reference at engineering-meaningful
accuracy, while explicitly acknowledging that the reference is not
itself a Level B-grade analytical/peer-reviewed source.

**Engineering use.** Level C evidence supports engineering decisions
where the consequence of small error is bounded: design screening,
comparative trade studies, sensitivity analyses, early-stage concept
evaluation. Level C is not a substitute for Level B in formal
verification contexts.

**Critical distinction.** A Level C record is **deliberately not
promoted** to Level B. The methodology's discipline is that the
evidence level matches what the comparison actually certifies. A
comparison against another commercial code at 2.21% residual is
engineering-screening-useful but is **not** independent verification
in the BVC sense. Treating it as Level B would conflate the two
categories in exactly the way most CAE validation literature conflates
them.

**Example.** The AURA registry preserves the Altair OptiStruct OS-V:1010
1D beam-matrix verification deck comparison at Level C with 2.21%
residual on six whirl modes. The comparison is engineering-meaningful
— it tells us AURA's rotor-dynamic core produces results in the right
ballpark for this problem class. But three structural properties
(commercial-CAE reference, element-formulation parity not verified, no
independent triangulation) prevent Level B promotion. The Level C
designation is honest.

---

## Level D — Forensic / blocked

**Threshold.** Not applicable. Level D is the category for documented
failures preserved openly.

**Evidence type.** Validation attempts that did not reproduce a
reference within any reasonable acceptance threshold, where the
reasons for failure cannot be fully diagnosed without further
investigation that may or may not produce eventual resolution. The
Level D entry preserves all diagnostic variants attempted, the
specific interpretation choices distinguishing them, the residuals
observed in each variant, and the aggregate finding.

**What Level D certifies.** That a reference exists, that the
implementer attempted reproduction in good faith, that the
reproduction did not succeed within acceptable thresholds, and that
the documented failure data is available for community inspection and
potential future resolution.

**Engineering use.** Level D entries do not directly support
engineering decisions — by definition, they represent cases where the
methodology cannot certify a positive claim. Their value is
**community evidence**: information about why a benchmark resists
reproduction is information the engineering community needs but
otherwise loses, because conventional validation literature does not
publish failed reconstructions.

**The Nelson-McVaugh case.** The AURA registry's Nelson-McVaugh (1976)
benchmark reconstruction is preserved at Level D after ten diagnostic
variants attempted across multiple interpretations of the published
configuration. No variant reproduced the published values across all
quantities without parameter tuning beyond what the original paper
specifies. The forensic record documents all ten variants, their
interpretation choices, and their observed residuals. The community
gains diagnostic information; AURA gains the credibility associated
with not hiding failures; the underlying question (why does the
benchmark resist reproduction?) remains open for future investigation
by anyone in the community.

The blog post on this case (["Why we preserved a failed benchmark as
a public record"](../blog/posts/2026-05-24-nelson-mcvaugh-forensic.md))
discusses the methodological choice in detail.

**Why Level D exists as a first-class category.** Without Level D,
validation work faces a binary outcome: clean validation or no entry.
This binary creates incentive for parameter tuning until a clean
validation appears, even when the tuning amounts to overfitting.
Level D removes this incentive structure by providing a respectable
home for honest failure. The researcher does not need to choose
between misleading the community and writing off the work.

---

## Promotion rules

Acceptance level promotion is governed by [schema v1.1](../schema/v1-1.md)
conditional validation:

- **Level A** anchors require explicit acceptance criteria
  (`acceptanceCriteria.thresholdType`, `acceptanceCriteria.thresholdValue`)
  and a `results.passed: true` outcome with `results.worstResidualObserved`
  at or below the threshold.

- **Level B** anchors additionally require complete reference provenance
  (peer-reviewed citation with DOI), `referenceSource.author_group_independent_of_implementer: true`,
  and (for engineering-evidence layer) the `externalTriangulation`
  block satisfying the [two-gate quality requirements](two-gate-model.md).

- **Level C** anchors require explicit acknowledgment of the limitation
  preventing Level B promotion (in `acceptanceCriteria.notes` and
  `reviewStatus.externalReviewerNotes`).

- **Level D** anchors require `lifecycle: forensic_blocked` and a
  populated `diagnosticVariants` array documenting the attempted
  variants and their observed residuals.

Promotion across levels is not automatic. Lifecycle progression from
`public_anchor_candidate` to `validated_anchor` requires explicit
review by a registry maintainer plus, for engineering-evidence layer
Level B, external attestation of the triangulation independence.

---

## What this policy is not

**Not a quality hierarchy.** Level A is not "worse" than Level B; it
exercises a different kind of evidence. A Level A anchor at machine
precision is stronger evidence for its specific claim than a Level B
anchor with 2% residual is for its specific claim — the level
distinction is about evidence *type*, not evidence *strength*.

**Not a marketing tier.** Levels are not "bronze / silver / gold /
platinum" stickers to apply for promotional appeal. Each level has
specific evidence-type requirements; sticker-shopping among the
levels is foreclosed structurally by the schema's conditional rules.

**Not exhaustive.** Some validation evidence does not fit any of the
four levels (e.g., scope-bounded triangulations like the Srinivasan &
Prabhu comparison at `qualitative_agreement` verdict). These cases are
handled within the triangulation framework rather than as standalone
acceptance-level promotions. See [triangulation](triangulation.md).

**Not static.** The acceptance policy is itself versioned alongside the
schema. The current v1.1 policy may be refined in subsequent versions
based on accumulated experience. Refinements update the schema's
conditional validation rules; past anchors remain valid under the
policy version they were promoted under.

---

## Further reading

- [Two-gate model](two-gate-model.md) — structural and content gates working together
- [Two-layer registry](two-layer-registry.md) — solver-sanity vs. engineering-evidence layers
- [Triangulation](triangulation.md) — independent external evidence for engineering-evidence layer
- [Schema v1.1 reference](../schema/v1-1.md) — implementation-level reference
- [Blog post on the Nelson-McVaugh Level D case](../blog/posts/2026-05-24-nelson-mcvaugh-forensic.md)
- [Blog post on the OptiStruct Level C case](../blog/posts/2026-05-31-optistruct-osv1010-level-c.md)
