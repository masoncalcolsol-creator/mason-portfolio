import type { Metadata } from "next";
import WorkroomClient from "./WorkroomClient";

export const metadata: Metadata = {
  title: "PENUMBRA Workroom | NULLWORKS",
  description: "A NULLWORKS-hosted multi-worker room governed by UMBRA.",
};

export default function PenumbraWorkroomPage() {
  return <WorkroomClient />;
}
