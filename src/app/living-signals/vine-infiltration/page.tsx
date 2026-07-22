import type { Metadata } from "next";
import VineInfiltration from "../VineInfiltration";
import { vineSignal } from "../vineSignal";

export const metadata: Metadata = {
  title: `${vineSignal.name} | NULLWORKS Living Signals`,
  description: vineSignal.summary,
};

export default function VineInfiltrationPage() {
  return <VineInfiltration />;
}
