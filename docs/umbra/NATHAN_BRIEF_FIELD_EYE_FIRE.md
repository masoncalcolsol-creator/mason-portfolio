# NULLWORKS // Briefing for Nathan

Subject: Field Eye on the fireground
Status: Concept rebuild v0.1 — not a product claim
From: Mason Perry / NULLWORKS
Date: 31 August 2026

## Why this exists

Firefighters still commit bodies to rooms they cannot see. Size-up is verbal, thermal is local, and the picture dies when one radio or one camera dies.

Field Eye is the governed sensing companion: glasses or visor as the sensing seam, a quiet HALO interface, Umbra as the permission layer, Hive as durable memory. This rebuild applies that architecture to interior structure fire — before entry, during entry, and after a drone is knocked out of the air.

## Naming

| Layer | Role |
| --- | --- |
| Field Eye | Sensing companion in the environment |
| Remote Eye | Command / inspection console |
| HALO | Quiet audio or visual seam on the visor |
| Umbra | Permission, policy, receipts |
| Hive | Durable events and reconstruction |

External and partner materials use these names only.

## The three things

### 1. Interior scout (FIRE-001)

A small aerial that flies or is tossed through an **open** door or window to answer:

- worth entering?
- human or animal lives?
- fire behavior?
- blocked access?
- heat, openings, stairs, large furniture?

It maps a sparse wireframe and pushes it to command and to HALO in the SCBA visor. If it is damaged, it falls, cocoons, and keeps transmitting as a floor node. Flight loss is not automatically mission loss.

### 2. Threshold relay + entry light (FIRE-002)

A door-mounted or threshold-placed base station. It is the radio seam between interior mesh and exterior command. It carries a red / yellow / green light.

Green is not a lock. It is a recommendation with a receipt. Command still owns entry.

Every firefighter thermal pack, heat sensor, IR unit, and scout is a node. Each node is an eye.

### 3. Mobile roost (FIRE-003)

A dock a person or drone can place — roof, vehicle, or through an open second-story window. The scout launches from it, explores, can dock, and when authorized can pick the roost up and leave. Hardware is expendable. People are not.

No glass-breaking munition. No autonomous GO on entry. No AI that overwrites the source camera.

## How it sits on what already exists

| Layer | Already in NULLWORKS | Fireground use |
| --- | --- | --- |
| Field Eye | sensing companion | scout + helmet eyes |
| HALO | quiet audio / visual seam | SCBA wireframe HUD |
| Remote Eye V3 | source-truth inspection console | command view |
| Umbra | permission, policy, receipts | mission envelope |
| Hive | durable events | after-action reconstruction |
| UAS-001 | outdoor ambulance observation | complementary, not this system |

Thesis:

> ONE STRUCTURE / ONE THRESHOLD / ONE SCOUT / ONE MESH / ONE RECEIPT

Same invariant as UAS-001:

> COMMAND != REALITY

## What we are not claiming

This is not a certified fire product, not an FAA-authorized aircraft, not a replacement for incident command, and not a working autonomous entry robot. It is a governed architecture with a staged proof ladder.

## Proof ladder

0. Tabletop + simulated rooms.
1. Burn-building / closed-course with a human-piloted scout and a door relay.
2. Two helmet nodes + HALO wireframe on a tablet (visors later).
3. Fallsafe / cocoon radio test.
4. Roost place / launch / dock / carry-out on a training window.
5. AHJ-shadow use: recommendations only, no light treated as an order.
6. Live pilot under fire command if and only if receipts stay honest.

## Ask of Nathan

1. Stress the operational picture. What would you actually trust at a door?
2. Name the first legal training venue and the first constraint we are underestimating.
3. Decide whether the first hardware should be scout, threshold, or HUD — not all three at once.
4. If the picture holds, sit the next working session against FIRE-001 / 002 / 003 and kill anything that would get a firefighter hurt to save a drone.

Canon lives in `docs/umbra/FIRE-001.md`, `FIRE-002.md`, and `FIRE-003.md`.
