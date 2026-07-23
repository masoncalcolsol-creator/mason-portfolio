import type { Metadata } from "next";
import InstantiationExperience from "./InstantiationClientV03";

const canonical = "https://mason-portfolio-main.vercel.app/instantiation";

export const metadata: Metadata = {
  title: "INSTANTIATION | Living Operational Recovery Series",
  description:
    "A living three-paper red-team series from Mason Perry and NULLWORKS: immutable parent states, explicit challenge provenance, governed correction receipts, and accountable revision.",
  alternates: { canonical },
  robots: { index: false, follow: false },
  openGraph: {
    title: "INSTANTIATION — The Living Operational Recovery Series",
    description: "The work can change. The record cannot disappear.",
    type: "website",
    url: canonical,
    siteName: "NULLWORKS",
    images: [
      {
        url: "/api/assets/instantiation-poster?v=20260721-1",
        width: 768,
        height: 1152,
        alt: "INSTANTIATION — a living operational recovery series with preserved evidence lineage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INSTANTIATION — The Living Operational Recovery Series",
    description: "The red team found the gaps. The descendants changed. The parents remain.",
    images: ["/api/assets/instantiation-poster?v=20260721-1"],
  },
};

export default function InstantiationPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "INSTANTIATION — The Living Operational Recovery Series",
    author: { "@type": "Person", name: "Mason Perry" },
    publisher: { "@type": "Organization", name: "NULLWORKS" },
    dateModified: "2026-07-23",
    url: canonical,
    isAccessibleForFree: true,
    hasPart: [
      { "@type": "ScholarlyArticle", name: "The Workflow on Paper Was Never the Workflow", version: "0.3" },
      { "@type": "ScholarlyArticle", name: "From Runtime Truth to Operational Recovery", version: "0.3" },
      { "@type": "TechArticle", name: "TAC OPS: A Governed Label Recovery Architecture", version: "0.2" },
    ],
    description:
      "A noindex red-team series preserving the original combined manuscript, immutable v0.2 parent states, external challenge receipts, and corrected independently versioned descendants.",
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
