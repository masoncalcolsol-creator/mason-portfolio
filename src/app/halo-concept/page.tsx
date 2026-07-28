import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halo × NULLWORKS — Unofficial OI Interface Concept",
  description:
    "An unofficial partnership concept exploring Brilliant Labs Halo as the visible human-machine seam for a governed, phone-hosted Operational Intelligence system.",
};

export default function HaloConceptPage() {
  return (
    <iframe
      title="Halo × NULLWORKS unofficial interface concept"
      src="/halo-nullworks-concept/index.html"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: 0,
        background: "#050608",
      }}
    />
  );
}
