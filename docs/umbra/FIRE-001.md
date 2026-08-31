# UMBRA FIRE-001 // Interior Recon Scout

Status: CANONICAL PILOT SPEC v0.1
Lineage: Field Eye + HALO + Remote Eye V3
Dependency: FIRE-002 Threshold Relay, FIRE-003 Mobile Roost
Companion outdoor layer: UAS-001 (does not replace this spec)

## Objective

Give incident command and entry teams an independent interior observation layer **before** human entry, so the decision to commit people is compared against observed physical reality.

The scout answers only these questions:

- Is this interior worth entering now?
- Are there human or animal life signatures?
- What is the fire doing (growth, layering, ventilation, collapse cues)?
- What access is blocked?
- What conditions will the first team meet (heat, smoke, openings, stairs, large furniture)?

The aircraft is another governed Field Eye. It is not a privileged controller and it does not authorize entry.

## Initial architecture

```
INCIDENT COMMAND
    -> UMBRA MISSION
        -> THRESHOLD RELAY (FIRE-002)
            -> SCOUT ADAPTER
                -> AUTHORIZED INTERIOR SCOUT
        -> TEAM NODES (SCBA / thermal / heat / IR)
        -> HALO HUD
```

A person or another drone may also place or throw a FIRE-003 roost. The scout may launch from the threshold, from a roost, or from a hand toss through an already-open window or door. This spec does not authorize forced breach, glass-breaking munitions, or any weaponized payload.

## Observation envelope

Policy defines a bounded interior volume based on:

- mission identity and fireground authority
- structure address / occupancy class
- approved entry plane (door, window, balcony)
- keep-out zones (collapse, energized equipment, hazardous atmospheres beyond sensor class)
- altitude / room-volume constraints
- thermal and particulate limits
- aircraft health and reserve
- mesh / relay health
- privacy and evidence-retention rules
- AHJ / fire-command operating authorization

The scout maps only what it can verify: walls, openings, stairs, large furniture, heat concentrations, and movement. It does not invent rooms it has not observed.

## Required states

- STANDBY
- ASSIGNED
- PREFLIGHT
- AUTHORIZED
- LAUNCH / TOSS
- TRANSIT
- ENTER
- RECON
- MARK
- RELAY
- HOLD
- EGRESS
- FALLSAFE
- COCOON
- RETURN
- LAND / DOCK
- ABORT

## Progressive autonomy ladder

1. Human remote pilot flies; UMBRA records WOULD_FLY guidance and Field Eye overlays.
2. UMBRA generates bounded room-to-room waypoints; qualified operator remains responsible and can intervene.
3. Controlled automated launch / short-room recon / recovery on a burn building or closed course.
4. AHJ-approved operational use under incident command.
5. Distributed scouts and roosts assigned dynamically to sectors.

## Independent verification thesis

`COMMAND != REALITY`

Examples:

- radio report: first floor clear
- scout observation: heat signature and blocked stair
- team node: thermal overlay disagrees with verbal size-up
- UMBRA verification: discrepancy event
- receipt: commanded state, reported state, observed state, uncertainty, and resolution retained

The scout is a truth sensor, not promotional video.

## Mapping and HUD contract

The interior map is a **sparse wireframe**, not a photoreal game world.

Permitted HUD objects:

- walls and openings
- stairs and level changes
- doors and known egress
- large furniture / major obstacles
- heat / life-sign markers with confidence
- teammate and scout node positions
- last-known-good path to threshold

Forbidden HUD behavior:

- filling unknown space as if it were surveyed
- hiding uncertainty
- converting a machine guess into an automatic GO / NO-GO
- overwriting source thermal or camera frames with interpretation

HALO on the SCBA visor shows the minimum useful geometry. Command gets the richer Penumbra / Remote Eye console. Source frames remain distinguishable from overlays.

## Fallsafe / cocoon

If the airframe is struck, overheated, loses lift, or can no longer hold station:

1. Attempt controlled descent to the nearest floor or landing.
2. Enter COCOON: protect antenna, battery, and sensor window; stop rotors.
3. Continue transmitting as a grounded node for as long as power and link allow.
4. If a safer egress path is still reachable under remaining reserve, attempt EGRESS rather than dying in place.
5. Never require a firefighter to retrieve a dying scout as a condition of team withdrawal.

A grounded scout is still an eye. Loss of flight is not loss of mission until the radio dies.

## Safety and governance

Actual operations must comply with incident command, AHJ policy, FAA / sUAS rules where applicable, building-entry authority, privacy requirements, and fireground air-management doctrine.

UMBRA software capability does not itself constitute flight authorization or permission to enter a structure.

Loss of mission authority, required telemetry, required mesh, thermal envelope, or other policy-defined safety prerequisites must produce the approved degraded / abort behavior.

AI may propose room order, mark anomalies, or compress a size-up. AI does not decide entry.

## Combined demonstration

ONE STRUCTURE / ONE THRESHOLD / ONE SCOUT / ONE MESH / ONE RECEIPT

The scout timeline must synchronize with threshold relay state, team-node telemetry, HALO HUD frames, command radio, and the entry-light decision so the entire experiment can be reconstructed.
