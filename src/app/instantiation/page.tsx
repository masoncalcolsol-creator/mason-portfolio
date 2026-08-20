import type { Metadata } from "next";
import InstantiationExperience from "./InstantiationClientCurrent";
import mobileStyles from "./instantiation-mobile.module.css";

const canonical = "https://mason-portfolio-main.vercel.app/instantiation";

export const metadata: Metadata = {
  title: "INSTANTIATION | Operational Recovery Series",
  description:
    "The governed NULLWORKS three-paper Operational Recovery Series: preserved lineage, explicit evidence boundaries, accountable correction receipts, and independently versioned manuscripts.",
  alternates: { canonical },
  robots: { index: false, follow: false },
  openGraph: {
    title: "INSTANTIATION — Operational Recovery Series",
    description: "Paper 1 v0.7. Paper 2 v0.4. Paper 3 v0.4. The work changed; the record remained.",
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
    title: "INSTANTIATION — Operational Recovery Series",
    description: "Paper 1 v0.7. Paper 2 v0.4. Paper 3 v0.4. Preserved parents and accountable revision lineage.",
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
    dateModified: "2026-08-20",
    url: canonical,
    isAccessibleForFree: true,
    hasPart: [
      { "@type": "ScholarlyArticle", name: "The Workflow on Paper Was Never the Workflow", version: "0.7" },
      { "@type": "ScholarlyArticle", name: "From Runtime Truth to Operational Recovery", version: "0.4" },
      { "@type": "TechArticle", name: "TAC OPS: A Governed Label Recovery Architecture", version: "0.4" },
    ],
    description:
      "A canonical ledger preserving immutable parent states, independently versioned descendants, external challenge receipts, evidence boundaries, and accountable revision lineage for the NULLWORKS Operational Recovery Series.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className={mobileStyles.mobileFrame}>
        <InstantiationExperience />
      </div>
    </>
  );
}
