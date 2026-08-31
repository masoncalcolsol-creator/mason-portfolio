# NULLWORKS // UMBRA

## Governed Intelligence Infrastructure

UMBRA is the NULLWORKS operational/control plane between requesters and heterogeneous software or physical infrastructure.

Canonical position:

> NULLWORKS does not sell intelligence. NULLWORKS sells the architecture through which intelligence is permitted to interact with systems.

UMBRA is not an AI model, traffic controller, drone autopilot, robot controller, or municipal command system. It is the governed orchestration layer that determines whether a requester may ask an underlying system to expose a bounded capability, under which policy, for how long, with what telemetry, and with what receipt.

PENUMBRA is the human-facing visualization and supervisory interface.

## Core turnstile

REQUEST -> IDENTITY -> AUTHORITY -> INTENT -> POLICY -> PLAN -> SAFE EXECUTION -> TELEMETRY -> VERIFICATION -> RECEIPT

Required cross-cutting controls:

- minimum necessary context
- bounded capability exposure
- deterministic safety constraints
- human override
- revocation
- fail-safe behavior
- provenance
- independent verification where available
- immutable/event-oriented receipts

## Design invariant

AI may propose, predict, optimize, explain, or detect anomalies. AI does not bypass the policy and safety layers.

Safety-critical infrastructure retains local controller authority. UMBRA requests capabilities through adapters rather than replacing device-native safety logic.

## Federation

UMBRA Network is the future federation layer through which independent organizations and architectures can communicate without sharing databases, AI models, vendors, or implementation stacks.

A federated request must answer:

1. Who are you?
2. What are you asking to happen?
3. What authority do you have?
4. What constraints apply?
5. What capability may safely be exposed?
6. What happened?
7. How can the result be verified?

## Initial proof program

### UMBRA EMS-001

Single-vehicle Dynamic Priority Corridor.

Objective: determine whether existing traffic infrastructure can safely cooperate around one authorized ambulance to reduce transportation-network resistance while minimizing disruption to surrounding traffic.

### UMBRA UAS-001

Autonomous Emergency Observation.

Objective: use an authorized UAS as an independent observation layer for the same mission, initially under qualified remote-pilot supervision and later under progressively more autonomous, regulator-approved operations.

Combined demonstration thesis:

> ONE AMBULANCE / ONE CORRIDOR / ONE DRONE / ONE RECEIPT

### UMBRA FIRE-001 / 002 / 003

Field Eye interior fire recon.

Objective: use an authorized interior scout, a threshold relay with a recommendation light, and optional mobile roosts as an independent observation mesh before and during structure entry, under incident command, with HALO wireframe to the SCBA and receipts for every light change.

Combined demonstration thesis:

> ONE STRUCTURE / ONE THRESHOLD / ONE SCOUT / ONE MESH / ONE RECEIPT

Related: Field Eye, HALO, Remote Eye V3. Outdoor corridor observation remains UAS-001.

## Build sequence

0. Shadow simulation: no infrastructure control.
1. Live shadow mode: ingest real/replayed vehicle position and generate WOULD_REQUEST events only.
2. Closed-course/controller integration.
3. One approved intersection.
4. Small approved corridor.
5. Single live ambulance dynamic priority corridor.
6. Federated UAS observation and broader municipal capabilities.
7. FIRE closed-course scout + threshold + HUD tablet (see FIRE-001).

## Existing NULLWORKS integration

UMBRA events and receipts should use the repository's existing `hive/events` and `hive/receipts` structures as the provenance backbone rather than creating a parallel audit archive.
