import type { Metadata } from "next";
import DugoutExperience from "./DugoutExperience";

export const metadata: Metadata = {
  title: "AI Doubleheader Dugout | NULLWORKS",
  description: "Create an MMO-inspired human-AI character screen, choose a suit signal, and share your AI Doubleheader profile.",
};

export default function DugoutPage() {
  return <DugoutExperience />;
}
