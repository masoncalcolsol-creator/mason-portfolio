import type { LivingSignalConfig } from "./signals";

export const bleedingSignal: LivingSignalConfig = {
  slug: "bleeding-matrix",
  mode: "matrix",
  name: "Bleeding Matrix",
  eyebrow: "LIVING SIGNAL 09 // ANDROID LIQUID VESSEL TEST V4",
  headline: "The Matrix rains into the phone.",
  outlinedHeadline: "The liquid stays level while the vessel moves.",
  summary:
    "Crimson Matrix streams feed a slower-rising mobile vessel whose free surface is now calculated from the phone's measured gravity vector. The top edge is the only opening, partial tilt retains the physically stable volume, and a full side pour can empty the vessel completely.",
  accent: "#ff3048",
  accentRgb: "255,48,72",
  secondary: "#7d1c2b",
  signalLanguage: "Digital blood as a gravity-bound mobile vessel: falling code becomes liquid, the free surface remains world-level, the container rotates around it, and only the open top edge releases volume.",
  communicates: [
    "The liquid is a clipped gravity half-plane rather than a manually tilted triangle, so its surface cannot over-rotate past physical level.",
    "The complete top edge is treated as the open mouth of the container, and the downhill corner controls overflow.",
    "As the phone approaches a full side pour, the stable remaining volume approaches zero instead of stopping at a permanent triangle.",
    "Matrix streams still terminate at the surface and become part of the accumulating liquid field.",
  ],
  bestFor: [
    "Android motion and gravity-vector experiments",
    "Dark-music launches and interactive album environments",
    "Cinematic mobile landing pages with physical-feeling interaction",
    "Prototype testing before native-app packaging",
  ],
  rules: [
    "Tap Enable Tilt + Lock while holding the phone upright so the gravity vector calibrates correctly.",
    "Ordinary tilt only repositions the liquid; volume changes only when the world-level surface intersects the open top edge.",
    "A full side pour can drain the vessel completely because no stable liquid region remains below the opening.",
    "The blood is stylized interface atmosphere with no wounds, bodies, live telemetry, or implied real event.",
  ],
  demoNote: "Android V4: accelerometer gravity replaces the slope approximation, the surface stays world-level, and the open top edge can drain the vessel all the way out.",
};
