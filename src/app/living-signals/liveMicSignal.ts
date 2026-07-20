export const liveMicSignal = {
  slug: "live-mic-oscilloscope",
  mode: "mic",
  name: "Live Mic Oscilloscope",
  eyebrow: "LIVING SIGNAL 10 // THE PHONE BECOMES THE SENSOR",
  headline: "The waveform is not simulated.",
  outlinedHeadline: "It is whatever the phone hears.",
  summary:
    "A permission-gated oscilloscope driven locally by the visitor’s phone microphone. Voice, music, claps, machines, and ambient sound become the live trace while the page preserves explicit start, stop, privacy, fallback, and performance boundaries.",
  accent: "#66f7ff",
  accentRgb: "102,247,255",
  secondary: "#39777d",
  signalLanguage:
    "Live sound, human input, environmental response, local sensing, explicit consent, and a visual system that reacts to the visitor instead of replaying a canned animation.",
  communicates: [
    "The visitor must explicitly activate the microphone before the page can use it.",
    "The waveform is generated from local time-domain samples rather than uploaded or prerecorded audio.",
    "Start, stop, sensitivity, denied-permission, and unsupported-device states remain visible.",
    "A simulated trace remains available when the microphone is inactive so the page never collapses into a blank field.",
  ],
  bestFor: [
    "Music, audio-production, and artist-system pages",
    "Interactive event, exhibit, and experiential-brand concepts",
    "Voice-first products and sound-reactive demonstrations",
    "Industrial, automotive, marine, or environmental sound interfaces",
  ],
  rules: [
    "Microphone access begins only after a deliberate user tap and browser permission.",
    "Audio samples remain inside the browser and are not recorded, transcribed, stored, or uploaded.",
    "Stopping the microphone closes the media tracks and releases the audio context.",
    "Mobile rendering stays capped and hidden tabs suspend unnecessary audio work.",
  ],
  demoNote:
    "Tap Activate Microphone, allow permission, then speak, clap, play music, or make noise near the phone. Use the sensitivity control to tune the trace.",
} as const;
