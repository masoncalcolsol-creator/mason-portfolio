import type { Metadata } from "next";
import LexiconDock from "./LexiconDock";

export const metadata: Metadata = {
  title: "Live Learning Forest",
  description: "A free, source-grounded public learning grove with canonical claims, visible sources, branch paths, immutable receipts, a Seed Nursery, and a built-in dictionary and thesaurus.",
  openGraph: {
    title: "Live Learning Forest",
    description: "Plant a question. Grow a trustworthy path.",
    type: "website",
    url: "/forest",
  },
};

export default function ForestLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <a
        href="/forest/nursery"
        style={{
          position: "fixed",
          left: "16px",
          bottom: "18px",
          zIndex: 90,
          display: "inline-flex",
          alignItems: "center",
          gap: "9px",
          padding: "13px 16px",
          borderRadius: "999px",
          background: "#e0bb55",
          color: "#15352c",
          border: "1px solid rgba(21,53,44,.22)",
          boxShadow: "0 14px 40px rgba(0,0,0,.24)",
          textDecoration: "none",
          fontWeight: 900,
          letterSpacing: ".02em",
        }}
      >
        <span aria-hidden="true">＋</span>
        Plan a seed
      </a>
      <LexiconDock />
    </>
  );
}
