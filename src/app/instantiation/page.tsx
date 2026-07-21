import type { Metadata } from "next";
import InstantiationExperience from "./InstantiationExperience";

const canonical = "https://mason-portfolio-main.vercel.app/instantiation";

export const metadata: Metadata = {
  title: "INSTANTIATION | The Paper Within the Paper",
  description:
    "A living white-paper system from Mason Perry and NULLWORKS: preserved versions, public red-team challenges, decision receipts, evidence lineage, and accountable revision.",
  alternates: { canonical },
  robots: { index: false, follow: false },
  openGraph: {
    title: "INSTANTIATION — The Paper Within the Paper",
    description: "The document is alive. The record is immutable.",
    type: "article",
    url: canonical,
    siteName: "NULLWORKS",
    images: [
      {
        url: "/api/assets/instantiation-poster?v=20260721-1",
        width: 768,
        height: 1152,
        alt: "INSTANTIATION cinematic poster showing a recursive living document and its evidence lineage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INSTANTIATION — The Paper Within the Paper",
    description: "The document is alive. The record is immutable.",
    images: ["/api/assets/instantiation-poster?v=20260721-1"],
  },
};

export default function InstantiationPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: "The Workflow on Paper Was Never the Workflow",
    alternativeHeadline: "From Runtime Truth to Operational Recovery",
    author: { "@type": "Person", name: "Mason Perry" },
    publisher: { "@type": "Organization", name: "NULLWORKS" },
    dateModified: "2026-07-21",
    version: "0.8",
    url: canonical,
    isAccessibleForFree: true,
    description: "A TAC OPS field case and living public red-team ledger.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <InstantiationExperience />
    </>
  );
}
