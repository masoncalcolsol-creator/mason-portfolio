import type { Metadata } from "next";
import JasonAnvil1000Client from "./JasonAnvil1000Client";

export const metadata: Metadata = {
  title: "Jason Rains 1000-Character ANVIL Sound Forge | NULLWORKS",
  description:
    "A Jason-led, Mason-produced mobile music workroom that converts private artist shorthand into name-free Suno production traits and hard-caps the style prompt at 1,000 characters.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Jason Rains 1000-Character ANVIL Sound Forge",
    description: "Names in. Traits out. Style capped at 1,000 characters.",
    type: "website",
  },
};

export default function JasonAnvilPage() {
  return <JasonAnvil1000Client />;
}
