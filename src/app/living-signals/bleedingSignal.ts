import type { LivingSignalConfig } from "./signals";

export const bleedingSignal: LivingSignalConfig = {
  slug: "bleeding-matrix",
  mode: "matrix",
  name: "Bleeding Matrix",
  eyebrow: "LIVING SIGNAL 09 // ANDROID LIQUID VESSEL TEST V2",
  headline: "The Matrix rains into the phone.",
  outlinedHeadline: "Lock portrait. Tilt it. Pour it out.",
  summary:
    "Crimson Matrix streams now fall into the liquid surface and visibly feed a slower-rising mobile vessel. The fluid keeps its volume while it sloshes, locks the Android test in portrait when supported, and drains sideways when the phone is physically tilted past the pour threshold.",
  accent: "#ff3048",
  accentRgb: "255,48,72",
  secondary: "#7d1c2b",
  signalLanguage: "Digital blood as a responsive mobile vessel: falling code becomes liquid, impacts disturb the surface, gravity moves the mass, portrait remains fixed, and physical tilt controls drainage.",
  communicates: [
    "Matrix streams stop at the liquid boundary, create small impact ripples, and visually become part of the accumulating vessel.",
    "A volume-preserving surface model keeps the blood mass on the physically correct side instead of making the empty region behave like a second liquid.",
    "Enable Tilt + Lock requests fullscreen portrait mode, then device angle drives slosh and sideways drainage without requiring a landscape layout.",
    "The touch slider remains a slosh-only fallback; pouring belongs to the physical tilt gesture.",
  ],
  bestFor: [
    "Android motion and orientation experiments",
    "Dark-music launches and interactive album environments",
    "Cinematic mobile landing pages with physical-feeling interaction",
    "Prototype testing before native-app packaging",
  ],
  rules: [
    "Tap Enable Tilt + Lock before the physical test; the page requests fullscreen portrait orientation when Android Chrome permits it.",
    "Tilt past roughly 56 degrees and hold briefly to pour from that side; returning upright stops drainage and allows the slower refill to continue.",
    "The manual slider only sloshes the liquid and cannot force a pour.",
    "The blood is stylized interface atmosphere with no wounds, bodies, live telemetry, or implied real event.",
  ],
  demoNote: "Android V2: Matrix rain feeds the surface, fill speed is slower, gravity direction is corrected, Hold to Pour is removed, and tilt mode attempts to lock the viewport in portrait.",
};
