# NULLWORKS Oscilloscope Landing Pattern

Status: LOCKED / EARMARKED / REUSABLE

Canonical live examples:
- `/receipt-wallet`
- `/monster-music`

## Purpose

Use this pattern when a landing page should feel operational, alive, monitored, technical, and premium without relying on heavy image generation or visually noisy motion.

The effect should create one restrained reaction:

> "Whoa, this page is alive."

It must never interfere with reading, navigation, mobile performance, or the authority of the foreground content.

## Core visual stack

1. Near-black page background.
2. High-contrast foreground cards and copy.
3. One electric accent family, normally acid green.
4. Fixed full-screen oscilloscope canvas behind the page.
5. Faint measurement grid.
6. One primary living waveform.
7. One quieter secondary trace.
8. A luminous horizontal sweep traveling across the viewport.
9. Fine CRT scanlines.
10. Soft vignette around the viewport edges.
11. Partial transparency in foreground panels so the signal can be detected without reducing legibility.

## Canonical oscilloscope behavior

Reuse the existing Receipt Wallet oscilloscope implementation rather than rebuilding it.

Reference component:

- `src/app/receipt-wallet/OscilloscopeBackground.tsx`

Current Monster transplant:

- Monster-specific reusable background component under `src/app/monster-music/`

Performance rules:

- Maximum effective canvas device-pixel ratio: 1.5.
- Target animation rate: 30 FPS.
- Respect `prefers-reduced-motion`.
- Canvas remains fixed and pointer-events are disabled.
- Use restrained opacity and `screen` blending.
- Do not place interactive controls inside the animation layer.

## Layout architecture

Preferred landing sequence:

1. Sticky or compact navigation.
2. Large declarative hero statement.
3. One clear subhead explaining the operating idea.
4. Primary action and secondary proof/library action.
5. Compact operational-status or truth-boundary card.
6. Strong manifesto section.
7. Process or operating-system explanation.
8. Capability/use-case cards.
9. Scale or deployment model.
10. Governance, rights, authority, or trust controls.
11. Proof/context section.
12. Final CTA and explicit truth boundary.

The hero should communicate the commercial or operational thesis before asking the visitor to understand implementation detail.

## Foreground treatment

- Use large condensed-feeling display typography through weight, scale, and tight tracking.
- Use outlined or ghosted secondary headline text sparingly.
- Cards should use faint borders, controlled corner radii, dark translucent fills, and minimal blur.
- Keep body copy readable and human-sized.
- Use acid green for actions, labels, proof states, and small navigation signals.
- Avoid turning every card into a glowing object.

## Motion hierarchy

The oscilloscope is the primary ambient motion.

Do not combine it with large moving word ghosts on the same route unless there is a deliberate reason and mobile testing proves the effects do not compete.

Preferred rule:

- Oscilloscope pages: waveform, sweep, scanlines, vignette.
- Ghost-word pages: oversized translucent words and scroll drift.
- Use both only when one is nearly imperceptible.

## Mobile requirements

- The signal must remain visible on mobile without obscuring copy.
- Keep cards substantially opaque enough for easy reading outdoors.
- Navigation must remain tappable and compact.
- Avoid fixed elements that consume meaningful horizontal space.
- The waveform should read as atmosphere, not a chart the user must interpret.
- Test with a hard refresh and a slow manual scroll on an actual phone.

## Best-fit use cases

- Product-system pitches.
- Technical operating-model pages.
- AI governance or observability concepts.
- Music, signal, telemetry, and media-system pages.
- Industrial and forward-deployed case studies.
- Evidence, receipt, and credential systems.
- Premium campaign pages where a live signal supports the concept.

## Poor-fit use cases

- Warm family or memorial pages.
- Quiet literary pages.
- Pages already dominated by video or complex parallax.
- Dense document-reading experiences.
- Situations where the motion could imply live telemetry that does not actually exist.

## Truth boundary

The oscilloscope is a visual interaction layer. It must not be described as live monitoring, actual sensor data, real athlete telemetry, real music playback analysis, or production observability unless the page is genuinely connected to such data.

Acceptable language:

- "Living signal layer"
- "Oscilloscope-inspired background"
- "Animated signal system"
- "The page feels operational and alive"

Do not claim:

- "Live athlete signal"
- "Real-time campaign telemetry"
- "Production monitoring"
- "Audio-reactive waveform"

unless those functions have actually been implemented and verified.

## Reuse command

When Mason asks for this style again, interpret phrases such as the following as references to this locked pattern:

- "Use the Monster page style"
- "Use the wallet oscilloscope"
- "Give it the alive signal background"
- "Use the NULLWORKS oscilloscope landing layout"
- "Make it feel operational like Monster"

Default action: reuse the existing oscillator component and layout hierarchy, then adapt color, copy, and card content to the new subject rather than redesigning the interaction system from scratch.
