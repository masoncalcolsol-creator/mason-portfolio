import type { Metadata } from "next";
import LexiconDock from "./LexiconDock";

export const metadata: Metadata = {
  title: "Live Learning Forest",
  description: "A free, source-grounded public learning grove with canonical claims, visible sources, branch paths, immutable receipts, and a built-in dictionary and thesaurus.",
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
      <LexiconDock />
    </>
  );
}
