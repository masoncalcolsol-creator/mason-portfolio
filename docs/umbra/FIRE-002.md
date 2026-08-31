# UMBRA FIRE-002 // Threshold Relay

Status: CANONICAL PILOT SPEC v0.1
Lineage: Eye of Kilrogg + HALO
Dependency: FIRE-001 Interior Recon Scout
Peer: FIRE-003 Mobile Roost

## Objective

Put a governed radio and evidence bridge at the structure threshold so interior eyes can talk to exterior command without asking firefighters to carry the whole network on their backs.

The threshold unit is the seam between the dirty interior mesh and the outside world.

## Physical placement

Preferred mounting:

- door-mounted clamp / strap on the entry plane
- portable stand just inside or just outside the threshold
- vehicle-adjacent pedestal when the door plane is unsafe

The unit must be placeable by one gloved person in seconds. It is not a permanent building install.

## Functions

1. **Mesh root.** Interior scouts and team nodes attach here first.
2. **Exterior backhaul.** Command, Penumbra, and Hive receive authenticated telemetry through this hop.
3. **Time base.** Interior clocks sync to the threshold clock for later reconstruction.
4. **Entry light.** A simple red / yellow / green indicator visible at the door.
5. **Receipt edge.** Every light change and every link loss is an event.

## Entry light contract

The light is a **recommendation display**, not an automatic lock.

- GREEN — interior observations currently support bounded entry under standing orders
- YELLOW — mixed, stale, or incomplete picture; human command must interpret
- RED — observed conditions argue against entry, or required sensors / mesh are down
- DARK / FAULT — the threshold itself has failed; treat as no recommendation

The light may only change when policy evaluates:

- scout health and last good map age
- team-node presence
- thermal / atmosphere class vs allowed envelope
- mesh continuity
- mission authority still valid
- human override / hold from command

A firefighter looking at green still needs a human officer's order. The light does not replace size-up.

## Node model

Every authorized participant is an eye:

- FIRE-001 scout (airborne or cocoons)
- firefighter SCBA / thermal / heat / IR pack
- command tablet / Remote Eye console
- FIRE-003 roosts
- the threshold itself

Each node publishes:

- node_id
- role
- position estimate + uncertainty
- sensor class
- health
- last source frame or sparse map delta
- authority / consent state

UMBRA stitches nodes into one mission mesh. No node may silently become command.

## Required states

- DARK
- PLACED
- PAIRING
- LIVE
- DEGRADED
- HOLD
- WITHDRAW
- ABORT

## Safety invariants

- Loss of threshold backhaul freezes the entry light at last valid state plus a FAULT mark, then ages into YELLOW then RED as data goes stale.
- Interior nodes may continue a local mesh for firefighter self-rescue even if exterior command is briefly dark.
- The threshold never commands a scout to stay inside after ABORT.
- Human incident authority can kill the mission and force the light dark.

## Combined demonstration

Door clamp on a burn-building entry. One scout inside. Two instrumented helmets. Command tablet outside. Light changes only when receipts say why.
