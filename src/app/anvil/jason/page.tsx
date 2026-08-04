import type { Metadata } from "next";
import JasonAnvilPromptSafeClient from "./JasonAnvilPromptSafeClient";

export const metadata: Metadata = {
  title: "Jason Rains Prompt-Safe ANVIL Sound Forge | NULLWORKS",
  description:
    "A Jason-led, Mason-produced mobile music workroom that converts private artist shorthand into name-free production traits before exporting Suno prompts.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Jason Rains Prompt-Safe ANVIL Sound Forge",
    description: "Names in. Traits out. Jason steers; Mason produces.",
    type: "website",
  },
};

export default function JasonAnvilPage() {
  return <JasonAnvilPromptSafeClient />;
}
