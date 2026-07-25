import type { Metadata } from "next";

import VoicePortal from "./voice-portal";

export const metadata: Metadata = {
  title: "NULLWORKS Pressure Cooker Voice Workroom",
  description: "Secure browser voice access to the governed NULLWORKS Pressure Cooker Workroom.",
  robots: { index: false, follow: false, nocache: true },
};

export default function PressureCookerVoicePage() {
  return <VoicePortal />;
}
