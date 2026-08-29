# NULLWORKS // BLIND RED-TEAM TRANSFER PROTOCOL V1

## Purpose
Create a repeatable two-phase review in which a capable external reviewer receives a frozen artifact with minimal context, attacks it independently, and only afterward learns that the unassisted handoff was also being evaluated as a continuity-transfer event.

This protocol is reusable. Reviewer identity is configuration, not architecture.

## Phase One — Cold Red Team

### Inputs
- Reviewer name
- Frozen artifact name/version
- Artifact hash or immutable receipt when available
- Exact delivery timestamp
- Exact invitation text
- Response channel

### Reviewer instructions
1. Read the supplied artifact before browsing NULLWORKS or supporting material.
2. Assume the central claims may be wrong.
3. Attack thesis, assumptions, terminology, novelty claims, operationality, falsifiability, authority, failure modes, and boundary cases.
4. Mark confusion rather than asking the author for clarification during the first pass.
5. Follow novel implications that appear to emerge from the framework.
6. Return the first-pass response before discussing the artifact with the author.

### Controls
- No architecture tour before the response.
- No vocabulary primer beyond the artifact itself.
- No explanation of the hidden transfer hypothesis during phase one.
- No author coaching during first pass.
- Preserve the response unchanged before discussion.
- Separate observation from later interpretation.

## Pre-registered evaluation dimensions
Write the scoring rubric before opening the reviewer response.

Evaluate:
- Core-thesis reconstruction
- Correct identification of governing concepts
- Ability to distinguish intent/invariant/function/process/implementation where applicable
- Attacks on actual premises rather than strawmen
- Identification of contradictions or missing assumptions
- Identification of existing concepts that may have been renamed
- Operational/falsifiability critique
- Novel implications derived without prompting
- Context the reviewer had to invent
- Context whose absence prevented reasoning

Do not score whether the reviewer was impressed.

## Phase Boundary
Freeze the phase-one response with timestamp and receipt before revealing the secondary purpose.

## Phase Two — Reveal
Tell the reviewer that the cold handoff itself was also being examined. Ask:
- Did the artifact transfer enough conceptual state for independent reasoning?
- What did you reconstruct correctly without external context?
- Where did you have to invent context?
- Where did transfer fail?
- Did you derive anything the artifact did not explicitly teach?
- What would make the successor artifact transfer more faithfully?

Then permit access to supporting NULLWORKS architecture, evidence, provenance, systems, research lineage, and discussion with the author.

## Interpretation
A successful first pass is not defined as agreement. Strong disagreement directed at the framework's actual premises may demonstrate more successful conceptual transfer than superficial agreement.

Confusion is not automatically reviewer failure. It may identify a discontinuity in the artifact.

One reviewer is a field observation, not universal proof. Repeated reviewers allow comparison across transfer events.

## Rebuild pattern
The shared implementation lives in:
- `src/app/_components/BlindRedTeamReview.tsx`
- `src/app/_components/BlindRedTeamReveal.tsx`

A reviewer route should contain only configuration and metadata. Example:

```tsx
<BlindRedTeamReview
  reviewerName="REVIEWER NAME"
  firstName="FIRST NAME"
  artifactName="ARTIFACT"
  artifactVersion="VERSION"
  responseEmail="EMAIL"
  responseSubject="SUBJECT"
/>
```

The corresponding reveal route uses `BlindRedTeamReveal`.

To create another reviewer, copy the thin route, change the configuration values, and leave the shared protocol untouched.

## Current pilot
Reviewer: Jay Obernolte
Artifact: Continuity Calculus 3.0 — Longitudinal Continuity and Valid Succession
Artifact state located in NULLWORKS records: Version 3.0 working draft, dated 27 August 2026.

Jay Obernolte is an external reviewer. This protocol does not imply endorsement, employment, partnership, advisory status, government affiliation with NULLWORKS, or participation by his office.
