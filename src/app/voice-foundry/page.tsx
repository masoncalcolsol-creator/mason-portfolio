import type { Metadata } from "next";
import VoiceFoundryClient from "./VoiceFoundryClient";
import VoiceFoundryTranscriptionRepair from "./VoiceFoundryTranscriptionRepair";
import "./voice-foundry.css";

export const metadata: Metadata = {
  title: "Voice Foundry — Preserve Stories, Knowledge, and Context",
  description:
    "A private voice-first memory and work-context binder that records audio, creates editable transcripts, preserves stories, and exports or shares both.",
  openGraph: {
    title: "NULLWORKS Voice Foundry",
    description:
      "Keep the original voice. Keep the searchable words. Pass both forward.",
    type: "website",
  },
};

export default function VoiceFoundryPage() {
  return (
    <>
      <VoiceFoundryClient />
      <VoiceFoundryTranscriptionRepair />
    </>
  );
}
