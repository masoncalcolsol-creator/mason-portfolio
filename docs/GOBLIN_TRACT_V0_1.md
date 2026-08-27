# NULLWORKS // GOBLIN TRACT v0.1

**Living Multimodal Artifact & Provenance System**

Status: FOUNDED / STAMPED / EARMARKED / LOCKED
Founded: 2026-08-27

## Purpose

GOBLIN TRACT preserves history at the moment it is created, then allows relationships and interpretations to accumulate without rewriting the original evidence.

It is the forward-growing complement to retrospective Knowledge discovery.

**WE PLANT -> TIME PASSES -> KNOWLEDGE DISCOVERS -> GOBLIN TRACT GROWS NEW ROOTS**

## Organism

INGEST -> PRESERVE -> RELATE -> REINTERPRET -> CURATE -> PUBLISH

1. **Mouth / Ingest** - accept screenshots, images, audio, video, documents, URLs, chat excerpts, commits, renders, and future media.
2. **Stomach / Normalize** - hash, timestamp, identify media, preserve the untouched master, and generate derivatives separately.
3. **Gut / Relate** - connect artifacts and entities with explicit typed relationships.
4. **Goblin Brain / Interpret** - add dated observations and proposed relationships without changing historical records.
5. **Intestine / Curate** - assemble trails, eras, experiments, characters, collections, failures, and publications.
6. **Output / Publish** - expose the same graph through web experiences, books, QR/NFC entry points, exhibits, documentaries, research packets, and future interfaces.

## Canonical object classes

### Artifact
An immutable historical object or event record. An artifact can reference one or many media objects.

### Media Object
A preserved binary or external source associated with an artifact. Originals and derivatives are distinct objects.

### Entity
A persistent person, character, project, system, organization, work, experiment, machine, place, or concept.

### Relationship
A typed directional edge between artifacts and/or entities. Examples: `DERIVED_FROM`, `COVER_OF`, `PERFORMED_BY`, `SPAWNED`, `REFERENCES`, `SAME_EXPERIMENT`, `LATER_BECAME`, `INTERSECTS_WITH`, `RECORDED_DURING`, `VISUAL_COUNTERPART`, `AUDIO_COUNTERPART`.

### Observation
A dated interpretation made by a human or machine. Observations are assertions, not immutable historical truth, and must preserve authorship/model provenance.

### Collection
A curated grouping or navigable trail. Membership does not alter the underlying artifact.

### Source Receipt
Records where an object came from, when it entered the tract, content hashes when available, source URI, ingestion actor/process, and transformations.

## Non-negotiable invariants

1. Originals are append-only. Never silently replace a source artifact.
2. Derived files never masquerade as originals.
3. AI enriches provenance; it cannot erase provenance.
4. Interpretations are versioned observations, not retroactive edits to history.
5. Relationships may accumulate indefinitely.
6. External URLs are references, not preservation. Important external media should eventually have a preserved master when rights and access permit.
7. Large binaries belong in object storage; Git stores schema, code, manifests, receipts, and lightweight canonical records.
8. Every artifact receives a stable public-safe identifier independent of filenames and vendor IDs.
9. Uncertainty is representable. A proposed relationship may remain proposed rather than being promoted to canonical.
10. Publication is a view over the archive, never the archive itself.

## Stable IDs

Human-readable IDs use UTC date plus sequence:

`ART-YYYYMMDD-NNNN`

Database rows additionally use UUID primary keys so IDs never depend on sequence allocation alone.

## Exploration modes

### Chronological
Answers: **What happened?**

### PHRONONAUT
Answers: **Where does this rabbit hole go?**

PHRONONAUT mode traverses relationships rather than forcing a linear narrative.

## First lineage

The founding material is the 2026-08-27 NULLWORKS screenshot/audio discussion surrounding `UEBER DER REUSS`, `BIG SQUIRTSKEEZE`, `SUCCESSOR`, `PACKED IN A BOX`, `HARRY PLOPPINS`, and the MIREILLE HARRY PLOPPINS remixes.

The key archival question is not merely *what is this file?* but *why does this exist, what produced it, what did it produce later, and what else did it unexpectedly collide with?*

Future PHRONONAUTs should be able to begin with HARRY PLOPPINS and traverse its origin, original performer, MIREILLE cover lineage, 9 VOLT context, NAN VIOLENCE relationships, and later descendants without requiring the original creators to have predicted every connection at ingestion time.

## Ingestion UX target

The human-facing command should eventually be as small as:

> Goblin this.

The system should do the clerical work: receipt creation, hashing, media preservation, metadata extraction, entity matching, and relationship proposals. Human review should focus on ambiguity and meaning rather than filling forms.

## Architecture target

- **Postgres / Supabase:** canonical graph metadata and provenance.
- **Supabase Storage or compatible object store:** binary masters and derivatives.
- **GitHub:** schemas, migrations, code, documentation, receipts suitable for Git, and auditable implementation history.
- **Next.js / Vercel:** exploration and publication interfaces.
- **Knowledge layer:** retrospective discovery of latent relationships that can be proposed back into GOBLIN TRACT as new edges/observations.

The organism grows forward. The evidence stays put.
