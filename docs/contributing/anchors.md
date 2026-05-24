# Submitting an Anchor

This guide is for engineers, researchers, and community contributors who
want to add a validation anchor to the AURA Validation Chain Registry.

Contributing an anchor is a substantive technical commitment. We try to
make the process well-defined so that the work goes into the anchor
content itself rather than into figuring out what we expect.

---

## Before you start

Contributing an anchor means submitting a JSON entry that satisfies the
[schema v1.1](../schema/v1-1.md) structural rules and, for engineering-evidence
layer public-anchor candidates, the [two-gate quality requirements](../methodology/two-gate-model.md).

Three questions to answer before opening a pull request:

**1. Which layer is the anchor in?**

- **Solver-sanity layer** if the anchor exercises a specific solver
  capability against a closed-form mathematical reference (e.g., critical
  speed of a Jeffcott rotor, eigenvalues of a known matrix).
- **Engineering-evidence layer** if the anchor terminates in measured
  physical data and involves a multi-step chain from baseline measurement
  through analytical prediction to comparison.

**2. What acceptance level are you claiming?**

- **Level A** — Analytical sanity. The reference is a closed-form
  mathematical solution. Required residual ≤ 1% (typically machine
  precision or below).
- **Level B** — Public external benchmark. The reference is a
  peer-reviewed published result from a group independent of the
  implementer. Required residual ≤ 2%. **Engineering-evidence layer
  Level B additionally requires independent external triangulation per
  the schema.**
- **Level C** — External diagnostic. The reference is an external dataset
  or commercial CAE comparison where source-equivalence is not fully
  established. Residual typically 2–6%. **Level C records are accepted as
  diagnostic information but are not promoted to public-anchor status.**
- **Level D** — Forensic / blocked. The validation attempt did not
  reproduce the reference within reasonable thresholds and the failure is
  preserved openly as a public good.

**3. What is the applicability region?**

Every anchor must declare the operating envelope over which it is valid
(eccentricity range, supply pressure range, geometry class, etc.).
Outside this region, the anchor does not certify trust. Be specific. A
vague applicability region is a partially failed anchor.

---

## Anchor JSON structure (schema v1.1)

Here is a minimal solver-sanity Level A anchor as a starting template.
The full schema is at [schema v1.1 reference](../schema/v1-1.md).

```json
{
  "schemaVersion": "1.1",
  "entryId": "VCR_YOUR_ANCHOR_NAME_001",
  "entryHash": "computed_from_canonical_serialization",
  "validationLayer": "solver_sanity",
  "evidenceLevel": "L1",
  "acceptanceLevel": "A",
  "lifecycle": "validated_anchor",
  "title": "Concise descriptive title of the anchor",
  "description": "Two-to-four sentence description of what the anchor exercises and against what reference.",
  "referenceClass": "analytical_closed_form",
  "referenceSource": {
    "type": "analytical",
    "citation": "Reference for the analytical solution (textbook, paper, derivation)",
    "url": "Link to reference if available",
    "derivationNotes": "Brief note on derivation provenance"
  },
  "implementationUnderTest": {
    "solver": "AURA solver name and version",
    "configuration": "Specific configuration exercised",
    "applicabilityRegion": {
      "parameter1": [min, max],
      "parameter2": [min, max]
    }
  },
  "acceptanceCriteria": {
    "thresholdType": "relative_residual",
    "thresholdValue": 0.01,
    "metric": "max_abs_relative_residual_across_quantities",
    "quantitiesChecked": ["quantity_1", "quantity_2"]
  },
  "results": {
    "passed": true,
    "worstResidualObserved": 1.2e-14,
    "perQuantityResiduals": {
      "quantity_1": 1.2e-14,
      "quantity_2": 3.4e-15
    },
    "executionContext": {
      "runDate": "2026-MM-DDTHH:MM:SSZ",
      "platformVersion": "AURA v0.3.0-alpha",
      "softwareEnvironment": "Python 3.12 / NumPy 2.0 / etc"
    }
  },
  "license": {
    "code": "MIT",
    "data": "CC-BY-4.0"
  },
  "submitter": {
    "name": "Your name",
    "affiliation": "Your institution or organization",
    "email": "Optional contact",
    "githubHandle": "@yourhandle"
  },
  "reviewStatus": {
    "selfReview": true,
    "externalReview": false,
    "externalReviewerNotes": ""
  }
}
```

Engineering-evidence layer anchors require additional fields including
`externalTriangulation` (an array of triangulation records). See the
[engineering-evidence section](../registry/engineering-evidence.md) for
the additional structure.

---

## Computing the entry hash

The `entryHash` field is a SHA-256 hash over the canonical serialization
of the entry. We provide a Python helper:

```python
import hashlib
import json

def compute_entry_hash(entry: dict) -> str:
    """Compute SHA-256 hash over canonical JSON serialization."""
    canonical = json.dumps(
        {k: v for k, v in entry.items() if k != "entryHash"},
        sort_keys=True,
        ensure_ascii=False,
        separators=(",", ":")
    )
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()

# Usage:
entry["entryHash"] = compute_entry_hash(entry)
```

The hash is computed over all fields except `entryHash` itself. The
canonical serialization sorts keys alphabetically and uses compact
separators. This makes the hash deterministic across platforms.

---

## Submission checklist

Before opening a pull request, verify:

- [ ] Anchor JSON validates against schema v1.1 (`python validate_entry.py your_anchor.json`)
- [ ] Entry hash computed and present in `entryHash` field
- [ ] Applicability region is specific and defensible
- [ ] Acceptance criteria are quantitative, not vague
- [ ] Results section reports actual residuals, not aspirational targets
- [ ] Reference source is properly cited with traceable provenance
- [ ] License declared (typically MIT/CC-BY-4.0 for public contributions)
- [ ] Submitter affiliation honest (do not list institutions where you
  do not have permission to represent)
- [ ] For engineering-evidence layer: triangulation records satisfy
  both schema gate and quality gate (see
  [two-gate model](../methodology/two-gate-model.md))

---

## Where to submit

Open a pull request against
[github.com/lfnavigator/aura-registry](https://github.com/lfnavigator/aura-registry)
adding your anchor JSON to:

- `cases/public/` for production-ready public anchors
- `cases/internal/` for anchors not ready for public promotion (these
  still pass schema validation and run in CI but are flagged as
  internal-only)
- `cases/diagnostic/` for Level C diagnostic records
- `cases/forensic/` for Level D forensic records

Include in the pull request description:
1. A 2–3 sentence summary of the anchor and its purpose
2. The acceptance level being claimed
3. The reference being validated against
4. Any limitations or scope acknowledgments

---

## Review process

Submitted anchors go through:

1. **Automated schema validation** — runs on every PR push, blocks merge
   on failure.
2. **Hash verification** — confirms the declared `entryHash` matches
   canonical serialization.
3. **Reviewer assignment** — a registry maintainer reviews the
   substantive content, applicability region, and acceptance criteria
   defensibility.
4. **Triangulation verification (engineering-evidence only)** — the
   maintainer checks that the triangulation records meet both schema gate
   and quality gate requirements.
5. **Merge** — once reviewer approves, the anchor enters the registry.

For Level B engineering-evidence layer public anchors, the process
additionally requires:

6. **External attestation** — one or more reviewers from outside the
   submitter's institution confirm that the triangulation records are
   substantive and that the independence claim is defensible.

Review timelines are typically 2–4 weeks for solver-sanity anchors and
4–8 weeks for engineering-evidence anchors with full triangulation.

---

## What we do not accept

The registry exists to make validation discipline auditable. The
following submissions will be declined or returned for revision:

- **Vague acceptance criteria.** "Good agreement" is not an acceptance
  criterion. Quantitative threshold with defined metric required.
- **Hidden applicability region.** "Generally applicable" is a red flag.
  Specific operating envelope required.
- **Self-validation triangulation.** Independent triangulation must come
  from outside the implementer's research group. Citing your own group's
  prior work does not satisfy independence.
- **Future-tense results.** "We expect to achieve" or "we anticipate
  agreement within" do not belong in the `results` field. Actual measured
  residuals or do not submit the anchor yet.
- **Marketing-grade language.** "Industry-leading", "comprehensive
  validation", "production-grade accuracy" — none of these have schema
  representation. Quantitative facts only.

We mean this constructively. If a submission needs revision before it
meets registry standards, we work with you to get it there. The standards
are deliberately high because the registry's credibility depends on
holding the standards.

---

## Recognition for contributors

Contributors are credited:

- In the registry entry's `submitter` field (durable record).
- In the registry-level CONTRIBUTORS file.
- In academic publications referencing the registry, where contributor
  attribution is standard.

For Level B engineering-evidence layer public anchors with substantial
contributions, contributors may be invited as co-authors on follow-up
methodology or case-study publications, subject to standard authorship
norms.

---

## Questions and discussion

- **GitHub Issues** at the registry repository for technical questions
  about schema, validation, or specific anchor submissions.
- **GitHub Discussions** for methodology questions, conceptual
  discussions, or community coordination.
- **Email** to `aura@breshevengineering.com` for matters that require
  private communication (commercial partnerships, sensitive material,
  research collaboration framing).

We respond to substantive engineering questions within a few business
days. Marketing or generic vendor outreach receives lower priority.

---

*Last updated: May 2026. Schema v1.1. Update when schema version
advances or process changes.*
