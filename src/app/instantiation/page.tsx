import type { Metadata } from "next";
import InstantiationExperience from "./InstantiationClientFinal";
import mobileStyles from "./instantiation-mobile.module.css";

const canonical = "https://mason-portfolio-main.vercel.app/instantiation";

export const metadata: Metadata = {
  title: "INSTANTIATION | Final Red-Team Operational Recovery Series",
  description:
    "The governed final red-team state of NULLWORKS' three-paper Operational Recovery Series: preserved lineage, explicit evidence boundaries, accountable correction receipts, and a frozen material-review gate.",
  alternates: { canonical },
  robots: { index: false, follow: false },
  openGraph: {
    title: "INSTANTIATION — Final Red-Team Operational Recovery Series",
    description: "Paper 1 v0.6. Paper 2 v0.4. Paper 3 v0.4. The work changed; the record remained.",
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
    title: "INSTANTIATION — Final Red-Team Operational Recovery Series",
    description: "The final material-review set is prepared. The parents remain. The receipts explain every change.",
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
    dateModified: "2026-07-27",
    url: canonical,
    isAccessibleForFree: true,
    hasPart: [
      { "@type": "ScholarlyArticle", name: "The Workflow on Paper Was Never the Workflow", version: "0.6" },
      { "@type": "ScholarlyArticle", name: "From Runtime Truth to Operational Recovery", version: "0.4" },
      { "@type": "TechArticle", name: "TAC OPS: A Governed Label Recovery Architecture", version: "0.4" },
    ],
    description:
      "A noindex canonical review ledger preserving immutable parent states, independently versioned descendants, external challenge receipts, evidence boundaries, and the final material-review gate for the NULLWORKS Operational Recovery Series.",
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
