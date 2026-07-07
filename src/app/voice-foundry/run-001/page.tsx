import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Voice Foundry RUN-001 | NULLWORKS AI Worker Telemetry Console",
  description:
    "A receipt-backed NULLWORKS prototype for inspecting authority, source currency, tool actions, failures, corrections, and handoff in an AI workroom.",
};

export default function VoiceFoundryRun001Page() {
  redirect("/voice-foundry/run-001/console.html");
}
