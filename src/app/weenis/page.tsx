import type { Metadata } from "next";
import WeenisConsole from "./WeenisConsole";

export const metadata: Metadata = {
  title: "WEENIS V0.1 | NULLWORKS",
  description:
    "Wearable Elite Empowering NULLWORKS Information System — mobile operator console for evidence, degraded operation, and human-authority receipts.",
  manifest: "/weenis-manifest.webmanifest",
};

export default function WeenisPage() {
  return <WeenisConsole />;
}
