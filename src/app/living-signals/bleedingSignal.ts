import type { LivingSignalConfig } from "./signals";

export const bleedingSignal: LivingSignalConfig = {
  slug: "bleeding-matrix",
  mode: "matrix",
  name: "Bleeding Matrix",
  eyebrow: "LIVING SIGNAL 09 // ANDROID LIQUID VESSEL TEST",
  headline: "The Matrix fills the phone.",
  outlinedHeadline: "Turn it sideways and pour it out.",
  summary:
    "An Android-first liquid Matrix fills the viewport from the bottom, carries suspended crimson glyphs, sloshes with phone tilt, pours away when the device turns sideways, and begins filling again after it empties.",
  accent: "#ff3048",
  accentRgb: "255,48,72",
  secondary: "#7d1c2b",
  signalLanguage: "Digital blood as a responsive mobile vessel: rising volume, damped slosh, suspended code, physical tilt, controlled drainage, and automatic refill.",
  communicates: [
    "The phone viewport behaves like a container instead of a flat animation surface.",
    "Matrix glyphs remain suspended inside the liquid so the data and the fluid read as one system.",
    "Device orientation changes the liquid surface and landscape rotation becomes a deliberate pour gesture.",
    "Touch controls preserve testability when motion access is blocked or unavailable.",
  ],
  bestFor: [
    "Android motion and orientation experiments",
    "Dark-music launches and interactive album environments",
    "Cinematic mobile landing pages with physical-feeling interaction",
    "Prototype testing before native-app packaging",
  ],
  rules: [
    "Tap Enable Tilt before rotating the phone; browser motion access is never assumed.",
    "Turning the phone to landscape drains the vessel while returning to portrait allows it to refill.",
    "The Hold to Pour control and manual tilt slider provide a non-sensor fallback.",
    "The blood is stylized interface atmosphere with no wounds, bodies, live telemetry, or implied real event.",
  ],
  demoNote: "Android test: enable tilt, let the vessel fill, rotate sideways to pour, then return upright and watch it refill.",
};
