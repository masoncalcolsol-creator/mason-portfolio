import type { Metadata } from "next";
import { Suspense } from "react";

import HuddleClient from "./HuddleClient";

export const metadata: Metadata = {
  title: "NULLWORKS Huddle",
  description: "Private browser voice room for two humans and a NULLWORKS realtime voice agent.",
};

export default function HuddlePage() {
  return (
    <Suspense fallback={<main style={{ minHeight: "100vh", background: "#050709" }} />}>
      <HuddleClient />
    </Suspense>
  );
}
