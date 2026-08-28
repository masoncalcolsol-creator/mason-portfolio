# NULLWORKS Oscilloscope Landing Pattern

Status: LOCKED / EARMARKED / REUSABLE / CANONICAL SIGNAL BACKGROUND REGISTRY

This file is the source-of-truth registry for NULLWORKS signal backgrounds. Future implementations must inspect and reuse the canonical source files listed here rather than synthesizing a visual approximation from memory.

## HARD RULE: DO NOT IMPROVISE A SIGNAL BACKGROUND

If Mason asks for a "signal background," "oscilloscope," "Monster signal," "green scope," "wallet oscilloscope," "alive signal background," or references one of the canonical URLs below, do not recreate the effect with ad-hoc CSS, an inline SVG waveform, or a newly invented animation.

Fetch/import the canonical implementation from this repository and adapt only the surrounding shell, opacity, accent treatment, and foreground content as required.

The purpose of this rule is visual continuity. A signal background is an interface asset, not a vague style prompt.

## CANONICAL REGISTRY

### A. Ambient green oscilloscope / Monster signal

Canonical component:

- `src/app/receipt-wallet/OscilloscopeBackground.tsx`

Canonical live examples:

- `/receipt-wallet`
- `/monster-music`

Canonical aliases and phrases:

- "signal background"
- "oscilloscope background"
- "green oscilloscope"
- "Monster green"
- "Monster signal"
- "ANVIL Monster signal"
- "wallet oscilloscope"
- "alive signal background"
- "use the Monster page style"
- "make it feel operational like Monster"

Default action for those phrases: import `OscilloscopeBackground` from `src/app/receipt-wallet/OscilloscopeBackground.tsx`.

The Monster page does not contain a separate invented waveform engine. `src/app/monster-music/layout.tsx` directly imports and renders the Receipt Wallet `OscilloscopeBackground`, then adds Monster-specific translucent green foreground/radial treatment around it.

Canonical behavior preserved by that component:

- fixed full-screen canvas
- maximum effective device-pixel ratio of 1.5
- target 30 FPS
- `prefers-reduced-motion` support
- 28 px minor measurement grid with stronger major divisions
- green center reference line
- one primary living analog/heartbeat-like waveform
- one quieter secondary trace
- luminous traveling sweep and sweep line
- restrained glow
- CRT scanlines
- dark viewport vignette
- `screen` blending
- pointer-events disabled

Do not duplicate this algorithm into individual pages unless there is a documented technical reason. Import the component so future improvements propagate consistently.

### B. Live microphone oscilloscope / cyan live signal

Canonical component:

- `src/app/living-signals/LiveMicOscilloscope.tsx`

Canonical route:

- `/living-signals/live-mic-oscilloscope`

Canonical config:

- `src/app/living-signals/liveMicSignal.ts`

Canonical aliases and phrases:

- "live mic oscilloscope"
- "microphone oscilloscope"
- "cyan live signal"
- "phone becomes the sensor"
- explicit reference to `/living-signals/live-mic-oscilloscope`

This is functionally different from the ambient green component. It uses browser microphone permission, Web Audio `AnalyserNode`, live time-domain samples, RMS level, sensitivity controls, and a simulated fallback only while the microphone is inactive. Audio remains local to the browser and is not recorded, transcribed, stored, or uploaded by the component.

Do not substitute the ambient green oscillator when Mason explicitly references the live microphone version, and do not claim the ambient oscillator is audio-reactive.

### C. Living Signals framework / reusable signal library

Canonical library route:

- `/living-signals`

Canonical source files:

- `src/app/living-signals/page.tsx`
- `src/app/living-signals/LivingSignalCanvas.tsx`
- `src/app/living-signals/signals.ts`
- `src/app/living-signals/liveMicSignal.ts`
- `src/app/living-signals/bleedingSignal.ts`
- `src/app/living-signals/vineSignal.ts`

Canonical aliases and phrases:

- "Living Signals"
- "signal library"
- "signal framework"
- "one of the signal backgrounds"
- explicit reference to `/living-signals`

The framework contains multiple semantically distinct modes. Do not collapse them into one generic waveform. Choose the existing mode whose meaning matches the page.

Examples already registered in `signals.ts` include sonar, industrial fault scanning, receipt packets, conveyor telemetry, memory ghosts, operator orbit, audio particles, and matrix waterfall.

### D. Wisdom Mining / subtle signal references

Current route:

- `/wisdom-mining`

Current source:

- `src/app/wisdom-mining/page.tsx`

Important truth boundary: the current `main` version of Wisdom Mining does not import or render an oscilloscope canvas. It is a dark navy/black page with orange/gold accents. Therefore a future request such as "use the Wisdom Mining oscilloscope" must not be treated as proof that a specific oscilloscope implementation currently lives in that route.

Related canonical Living Signals modes that explicitly list wisdom-mining work as a best-fit use case are:

- `sonar-fish`
- `memory-ghosts`

If Mason asks for a "subtle oscilloscope like Wisdom Mining" rather than one of those named modes, use the canonical green `OscilloscopeBackground` but make the foreground shell darker/more opaque and the signal visually quieter. Do not invent a new waveform algorithm merely to reduce intensity.

If an older Wisdom Mining implementation is later recovered and deliberately canonized, add it to this registry with its exact source path before using its name as a reusable alias.

## CORE VISUAL STACK FOR AMBIENT OSCILLOSCOPE PAGES

1. Near-black page background.
2. High-contrast foreground cards and copy.
3. One electric accent family, normally acid green.
4. Fixed full-screen canonical oscilloscope canvas behind the page.
5. Faint measurement grid.
6. One primary living waveform.
7. One quieter secondary trace.
8. A luminous sweep traveling across the viewport.
9. Fine CRT scanlines.
10. Soft vignette around the viewport edges.
11. Partial transparency in foreground panels so the signal is visible without reducing legibility.

## MONSTER TRANSPLANT REFERENCE

Source:

- `src/app/monster-music/layout.tsx`

Monster wraps the canonical Receipt Wallet oscillator with a dark green shell and restrained acid-green radial gradients. This is the preferred reference when Mason says the signal should be "the best green version" or "like Monster."

The waveform itself remains the canonical Receipt Wallet implementation.

## PRINT AND QR RULE

Signal backgrounds are screen atmosphere, never label ink unless explicitly requested.

For QR, PMARS, STALLWORKS, Brother label, or other print-focused pages:

- render the canonical signal on screen when appropriate
- hide the canvas/background wrapper in `@media print`
- force the printable surface to white
- preserve high-contrast black QR geometry and adequate quiet zone
- never waste thermal-label area rendering dark backgrounds, grids, scanlines, or decorative traces

## LAYOUT ARCHITECTURE

Preferred premium landing sequence:

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

## FOREGROUND TREATMENT

- Use large display typography through weight, scale, and tight tracking.
- Use outlined or ghosted secondary headline text sparingly.
- Cards use faint borders, controlled corner radii, dark translucent fills, and minimal blur.
- Keep body copy human-sized and easily readable.
- Use the accent for actions, labels, proof states, and small navigation signals.
- Avoid turning every card into a glowing object.

## MOTION HIERARCHY

The signal is the primary ambient motion.

Do not combine it with large moving word ghosts on the same route unless there is a deliberate reason and mobile testing proves the effects do not compete.

Preferred rule:

- Oscilloscope pages: waveform, sweep, scanlines, vignette.
- Ghost-word pages: oversized translucent words and scroll drift.
- Use both only when one is nearly imperceptible.

## MOBILE REQUIREMENTS

- The signal must remain visible on mobile without obscuring copy.
- Keep cards substantially opaque enough for easy reading outdoors.
- Navigation remains tappable and compact.
- Avoid fixed controls that consume meaningful horizontal space.
- The waveform reads as atmosphere unless the page explicitly exposes a functional sensor signal.
- Test with a hard refresh and slow manual scroll on an actual phone.

## TRUTH BOUNDARY

The ambient green oscilloscope is a visual interaction layer. It must not be described as live monitoring, actual sensor data, real athlete telemetry, real music playback analysis, or production observability unless the route is genuinely connected to such data.

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

The exception is the canonical live-microphone route, whose microphone-driven waveform is genuinely local live input after explicit permission.

## PERSISTENCE / HIVE RULE

This repository is the durable memory for these visual systems. The exact source files and this registry outrank recollection from conversation context.

When implementing a future request:

1. Retrieve this registry from `main`.
2. Resolve the user's phrase or URL to the canonical entry above.
3. Fetch/import the referenced component or framework source.
4. Reuse it directly.
5. Adapt only the page shell, color treatment, opacity, copy, and foreground hierarchy unless the user explicitly requests a new signal system.
6. If no registry entry matches, inspect `/living-signals` before inventing a new visual.
7. If a genuinely new signal is approved, add its exact source path, live route, aliases, behavior, and truth boundary to this registry in the same commit.

This is the standing anti-drift rule: no bargain-bin oscilloscope cosplay when the real instrument is already in the building.
