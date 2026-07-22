import type { LivingSignalConfig } from "./signals";

export const bleedingSignal: LivingSignalConfig = {
  slug: "bleeding-matrix",
  mode: "matrix",
  name: "Bleeding Matrix",
  eyebrow: "LIVING SIGNAL 09 // ANDROID LIQUID VESSEL TEST V3",
  headline: "The Matrix rains into the phone.",
  outlinedHeadline: "Reach a top corner. Pour it out.",
  summary:
    "Crimson Matrix streams fall into a slower-rising mobile vessel. Physical tilt reshapes the liquid without deleting volume; blood leaves the phone only when the free surface actually reaches and overflows the top-left or top-right corner, like liquid leaving a real glass.",
  accent: "#ff3048",
  accentRgb: "255,48,72",
  secondary: "#7d1c2b",
  signalLanguage: "Digital blood as a responsive mobile vessel: falling code becomes liquid, impacts disturb the surface, gravity moves the mass, the top corners act as physical pour lips, and volume changes only through genuine overflow.",
  communicates: [
    "Matrix streams stop at the liquid boundary, create small impact ripples, and visually become part of the accumulating vessel.",
    "The liquid retains its volume while tilting; angle alone can never trigger drainage.",
    "The top-left and top-right screen corners are the only container openings, so the surface must physically reach one before anything can pour out.",
    "Holding a partial tilt leaves the blood in place, while steeper tilt creates corner overflow and drains only until the surface falls back below that lip.",
  ],
  bestFor: [
    "Android motion and orientation experiments",
    "Dark-music launches and interactive album environments",
    "Cinematic mobile landing pages with physical-feeling interaction",
    "Prototype testing before native-app packaging",
  ],
  rules: [
    "Tap Enable Tilt + Lock before the physical test; the page requests fullscreen portrait orientation when Android Chrome permits it.",
    "Tilt changes the liquid shape but does not change volume unless the raised edge reaches a top corner.",
    "Once a corner overflows, the vessel drains only until the surface falls back below that corner at the current angle.",
    "The blood is stylized interface atmosphere with no wounds, bodies, live telemetry, or implied real event.",
  ],
  demoNote: "Android V3: there is no pour threshold. The phone behaves like an open glass—tilt freely, and liquid leaves only through an overflowing top corner.",
};
