import type { Metadata } from "next";

import StewartRoomClient from "./StewartRoomClient";

export const metadata: Metadata = {
  title: "Stewart Field Scope | NULLWORKS Huddle",
  description: "Private multi-person NULLWORKS voice room for Jeff Stewart, Nathan Stewart, Mason Perry, and the NULLWORKS realtime agent.",
  robots: { index: false, follow: false },
};

export default function StewartRoomPage() {
  return <StewartRoomClient />;
}
