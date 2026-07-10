import type { Metadata } from "next";
import DugoutExperience from "../DugoutExperience";

export const metadata: Metadata = {
  title: "Mason Perry — AI Doubleheader Dugout",
  description: "Mason Perry, NULLMASTER, enters the AI Doubleheader character screen with the NULLWORKS Hive.",
  openGraph: {
    title: "Mason Perry — AI Doubleheader Dugout",
    description: "One human authority. A governed company of AI specialist roles. Enter the character screen and make your own.",
    type: "website",
  },
};

export default function MasonDugoutPage() {
  return <DugoutExperience masonPreset />;
}
