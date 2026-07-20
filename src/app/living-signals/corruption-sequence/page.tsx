import type { Metadata } from "next";
import CorruptionSequence from "../CorruptionSequence";

export const metadata: Metadata = {
  title: "NULLWORKS — Corruption Sequence",
  description:
    "A cinematic Living Signal sequence that moves from blackout to green code rain to red corruption before falling glyphs form NULLWORKS and bleed into the surrounding screen.",
};

export default function CorruptionSequencePage() {
  return <CorruptionSequence />;
}
