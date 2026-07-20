import type { Metadata } from "next";
import WarlockPortal from "./WarlockPortal";

export const metadata: Metadata = {
  title: "Warlock Portal | NULLWORKS",
  description:
    "A hidden experimental portal for NULLWORKS interface design, interactive storytelling, ANVIL, motion systems, and beautiful impossible-looking UI.",
};

export default function WarlockPage() {
  return <WarlockPortal />;
}
