import type { Metadata } from "next";
import AnvilStudioWithTracks from "./AnvilStudioWithTracks";

export const metadata: Metadata = {
  title: "ANVIL Universal Music Studio | NULLWORKS",
  description:
    "A Jason-led and Mason-produced mobile music workroom for building any original band, song, genre, or hybrid into a five-block Suno production packet.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "ANVIL Universal Music Studio",
    description: "Any band. Any style. Five clean Suno blocks.",
    type: "website",
  },
};

export default function JasonAnvilPage() {
  return <AnvilStudioWithTracks />;
}
