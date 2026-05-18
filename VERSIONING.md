# AURA Registry — Schema Versioning and Migration Policy

This document specifies how the AURA Registry schemas and registry entries are versioned, how breaking changes are managed, and how downstream consumers should handle schema evolution.

**Applies to:** all schemas in `schemas/` of this repository.
**Status:** v1 policy, effective from initial public release.
**Maintainer:** Breshev Engineering (A.V. Breshev, with V.E. Breshev methodology review).

---

## 1. Versioning model

Each AURA schema uses a **MAJOR.MINOR** version scheme, expressed in the schema's `$id` and in the directory path.

```
schemas/aura-case/v1.1/schema.json
schemas/aura-vcr/v1.0/schema.json
```

There are intentionally **no PATCH versions** at the schema URL level. Cosmetic clarifications to descriptions, examples, and formatting that do not affect validation behavior are committed without version bump.

### 1.1 MAJOR version (e.g. v1.x → v2.x)

A MAJOR version increase signifies a **breaking change**: existing instance documents that previously validated may no longer validate against the new schema.

Examples of breaking changes:

- Removing a field
- Renaming a field
- Changing a field's type (e.g. number → string)
- Changing an `enum` to remove values
- Making an optional field required
- Adding a new required field without a migration default
- Changing structural shape (object → array, nested → flat)

Breaking changes require:

- Migration tooling published before the new major version is declared canonical
- Deprecation notice on the previous major version in the README and schema description
- Minimum 6-month overlap period during which both major versions are maintained
- Migration guide in `docs/how-to/versioning-and-migration.md`

### 1.2 MINOR version (e.g. v1.0 → v1.1)

A MINOR version increase signifies a **backward-compatible additive change**: existing instance documents that validated under the previous minor version continue to validate under the new minor version.

Examples of minor changes:

- Adding a new optional field
- Adding a new value to an `enum`
- Adding new pattern restrictions on previously unrestricted fields **only if** existing valid values remain valid
- Tightening descriptions and adding documentation
- Adding `default` values to fields that did not have them
- Adding `examples`

A minor version bump does **not** require migration tooling. Consumer code written for v1.0 must continue to work against v1.1 instances. New fields are simply ignored if not consumed.

### 1.3 Patch-level changes (no version bump)

The following are committed without any version change:

- Typos in description fields
- Whitespace and formatting changes
- Clarifications that do not affect behavior or interpretation
- Adding `examples` blocks
- README and documentation updates

---

## 2. Schema URLs and $id stability

Schema `$id` URLs are **stable per version**. Once a schema is published with a given `$id`, that URL points to that exact schema content forever. Bug fixes are made by publishing a new minor or patch level under a new URL.

```
$id: https://breshev-engineering.github.io/aura-registry/schemas/aura-vcr/v1.0/schema.json
```

This URL must always return the v1.0 schema bytes. If v1.1 is published, it lives at `/aura-vcr/v1.1/schema.json` and `/aura-vcr/v1.0/schema.json` continues to return v1.0.

The `latest` directory or rolling pointer is **deliberately not provided** for schemas. Consumers must pin to specific versions to ensure reproducibility.

---

## 3. Registry entry compatibility

Registry entries reference the schema they were validated against via their `schemaVersion` field:

```json
"schemaVersion": "AURA_VCR_V1.0"
```

Entries are not automatically re-validated against newer schema versions when a new minor or major version is released. Entries remain valid under the schema they declare.

If a schema migration is necessary (typically only on major version bumps), the migration tooling produces a new entry file with updated `schemaVersion` and updated content, leaving the original entry file unchanged in the repository history. The promotion ladder (`lifecycle`) is preserved.

---

## 4. Deprecation policy

When a schema field is to be removed in a future major version, it is **deprecated** rather than immediately removed.

Deprecation is signaled by:

1. Adding `"deprecated": true` to the field's schema definition (JSON Schema 2020-12 supports this keyword).
2. Adding a note in the field's `description`: *"Deprecated in v1.X. Will be removed in v2.0. Use {alternative} instead."*
3. Adding an entry in this `VERSIONING.md` under section 6 (Deprecation log).

Deprecated fields continue to validate until the next major version. Consumers are advised to migrate during the deprecation period.

---

## 5. Methodology versioning

The Breshev Validation Chain (BVC) methodology has its own version identifier, independent of schema versions:

```
methodologyVersion: "BVC_v1"
```

A methodology version increase signifies a change in **what evidence is required at each level** or in **how validation chains are constructed**. This is conceptually distinct from schema evolution: schema versions track data structure; methodology versions track epistemic standards.

The methodology version is currently `BVC_v1`. The first formalization is being prepared as a peer-reviewed publication in 2026–2027. A methodology version bump (to `BVC_v2`) would only occur after deliberate review and publication, not as part of routine schema maintenance.

---

## 6. Deprecation log

*No deprecations yet. This section will be populated as schemas evolve.*

| Field | Schema | Deprecated in | Removal target | Replacement |
|---|---|---|---|---|
| — | — | — | — | — |

---

## 7. Release process

Each schema version bump follows this process:

1. **Draft proposal** in a GitHub issue, describing the change and rationale.
2. **Review** by V.E. Breshev (methodology) and A.V. Breshev (platform). External feedback welcomed via the issue.
3. **Implementation** in a feature branch, with updated schema, validation tests, and migration tooling (if breaking).
4. **Pull request** with the changeset, including:
   - Updated schema files at new version path
   - Updated examples
   - Migration notes
   - Changelog entry
5. **Merge** after approval. Tag the repository with `vcase-1.1`, `vvcr-1.1`, or analogous.
6. **Release notes** published on the repository releases page.
7. **README updated** to reflect current canonical version pointer.

For MAJOR version bumps, an arXiv preprint or peer-reviewed paper accompanies the release describing the rationale.

---

## 8. Backwards-incompatible field changes — handling

When a future MAJOR version must change a field's type or remove it entirely, the migration tooling will:

1. Read v1 entry.
2. Apply transformation rule (documented in `docs/how-to/versioning-and-migration.md`).
3. Produce v2 entry with new `schemaVersion`.
4. Validate v2 entry against v2 schema.
5. Preserve original v1 entry in repository history (never delete).
6. Update any references to the entry in dependent files.

If a field's value cannot be transformed automatically (e.g. requires human judgement), migration halts on that entry and a manual review is required. The entry remains at v1 until human resolution.

---

## 9. External consumer guidance

If you build tooling that consumes AURA Registry data:

1. **Pin to a specific schema version.** Always reference `aura-vcr/v1.0` (or whichever version your tooling supports), never assume a rolling latest.
2. **Validate before processing.** Use JSON Schema validation (Draft 2020-12) on every entry before any business logic.
3. **Read `schemaVersion` from each entry** and choose the appropriate validator. Do not assume all entries are the same version.
4. **Follow deprecation notices** when present. The deprecation period is your migration window.
5. **Subscribe to release notes** via GitHub watch to be notified of new schema versions.

For schema-related questions, please open an issue at:

    https://github.com/Breshev-Engineering/aura-registry/issues

---

## 10. Policy review

This versioning policy is itself versioned. The current policy is **v1**. A revised policy will be released only when significant practical experience justifies a change, with at least 6 months between policy revisions.

Last reviewed: May 2026.

— Breshev Engineering
