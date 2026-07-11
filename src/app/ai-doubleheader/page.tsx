import type { Metadata } from "next";
import ForgeShell from "./ForgeShell";

export const metadata: Metadata = {
  title: "The AI Doubleheader | NULLWORKS",
  description: "Create a cinematic human card and AI relationship card from an evidence-bound, human-reviewed identity experiment.",
  openGraph: {
    title: "The AI Doubleheader",
    description: "One human. One AI. Two cinematic identity receipts.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function AiDoubleheaderPage() {
  return <ForgeShell />;
}
