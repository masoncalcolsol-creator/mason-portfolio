import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Learning Forest",
  description: "A free, source-grounded public learning grove that turns curiosity into canonical claims, visible sources, branch paths, and immutable receipts.",
  openGraph: {
    title: "Live Learning Forest",
    description: "Plant a question. Grow a trustworthy path.",
    type: "website",
    url: "/forest",
  },
};

export default function ForestLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
