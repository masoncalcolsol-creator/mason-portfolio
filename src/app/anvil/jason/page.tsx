import type { Metadata } from "next";
import JasonAnvilClient from "./JasonAnvilClient";

export const metadata: Metadata = {
  title: "Jason Rains ANVIL Sound Forge | NULLWORKS",
  description:
    "A Jason-led, Mason-produced mobile music workroom for original band creation, Suno prompt forging, and HARESCRAMBLE reference listening.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Jason Rains ANVIL Sound Forge",
    description: "Jason steers. Mason produces. ANVIL forges the packet.",
    type: "website",
  },
};

export default function JasonAnvilPage() {
  return <JasonAnvilClient />;
}
