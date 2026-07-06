import type { Metadata } from "next";
import CanvasClient from "./CanvasClient";
import "./conversation-canvas.css";

export const metadata: Metadata = {
  title: "OI Conversation Canvas — Live Founder Interview Beta",
  description:
    "A live conversation-to-artifact prototype that turns founder interviews into timestamped timelines, copyable speaker blocks, quotes, themes, and structured pages.",
  openGraph: {
    title: "OI Conversation Canvas — Live Founder Interview Beta",
    description:
      "Watch a conversation become a timestamped, source-linked product artifact while the humans are still talking.",
    type: "website",
  },
};

export default function ConversationCanvasPage() {
  return <CanvasClient />;
}
