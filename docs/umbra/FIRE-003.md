# UMBRA FIRE-003 // Mobile Roost

Status: CANONICAL PILOT SPEC v0.1
Lineage: Eye of Kilrogg
Dependency: FIRE-001 Interior Recon Scout
Peer: FIRE-002 Threshold Relay

## Objective

Give the scout a portable nest that a person or drone can place — including onto a roof, a vehicle, or through an already-open second-story window — so recon can start from a new plane without dragging a generator to the door.

The roost is a dock, charger, local mesh hop, and recovery point. It is not a munition.

## Deployment modes

- hand-placed at threshold or interior room
- carried and set by another UAS onto a roof or balcony
- tossed onto a stable exterior surface
- passed through an **already open** window or door into a second-story room

This spec does not include glass-breaking, explosive, or kinetic-breach payloads. If a window is closed, the roost waits for lawful opening or another approved entry plane.

## Functions

1. Launch and recover one FIRE-001 scout.
2. Hold reserve power and a local store of map deltas.
3. Act as a mesh hop when the threshold radio cannot see the scout.
4. Allow the scout, when authorized and mechanically able, to **pick the roost back up** and carry it toward a safer plane or out of the structure.
5. Leave a receipt for place / launch / dock / relocate / abandon.

## Relocate-and-egress

If conditions worsen:

1. Scout returns to roost if reachable.
2. If pick-up is authorized and mass/thermal limits allow, scout lifts the roost toward the last-known-good egress.
3. If pick-up is unsafe, scout cocoons at the roost or nearest floor and both units keep transmitting.
4. Human teams are not required to recover hardware as a condition of withdrawal.

Abandoning a roost is an acceptable operational outcome. Losing a firefighter to save a dock is not.

## Required states

- PACKED
- THROWN / PLACED
- SETTLED
- READY
- LAUNCHING
- WAITING
- DOCKING
- RELOCATE
- ABANDON
- RECOVERED

## Safety invariants

- A roost that has not SETTLED (unstable roof, hanging on a sill, tumbling) cannot launch.
- Thermal or atmosphere limits that abort the scout also freeze launch from that roost.
- Relocate-and-carry is a bounded capability request, not an always-on trick.
- Same governance as FIRE-001: UMBRA software is not flight or entry authorization.

## Combined demonstration

Roost placed on a second-story training-window ledge. Scout launches, maps one room and the stair, docks, then carries the roost back to the threshold. One receipt covers place, flight, dock, and egress.
