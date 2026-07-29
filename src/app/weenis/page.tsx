import type { Metadata } from "next";
import WeenisIntegrated from "./WeenisIntegrated";

export const metadata: Metadata = {
  title: "WEENIS V0.2 | NULLWORKS",
  description:
    "Wearable Elite Empowering NULLWORKS Information System with the integrated Remote Eye inspection viewfinder, governed local receipts, and GRAY WEENIS continuity.",
  manifest: "/weenis-manifest.webmanifest",
};

export default function WeenisPage() {
  return <WeenisIntegrated />;
}
