import type { Metadata } from "next";

import GrayMatterClient from "./GrayMatterClient";
import "./gray-matter.css";

export const metadata: Metadata = {
  title: "Gray Matter Storage Unit — NULLWORKS",
  description: "Mason's private transcript-only voice journal, action queue, search, and daily triage cockpit.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function GrayMatterPage() {
  return <GrayMatterClient />;
}
