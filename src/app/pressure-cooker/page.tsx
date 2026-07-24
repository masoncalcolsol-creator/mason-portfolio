import type { Metadata } from "next";
import PressureCookerExperience from "./PressureCookerClient";

const canonical = "https://mason-portfolio-main.vercel.app/pressure-cooker";

export const metadata: Metadata = {
  title: "Pressure Cooker | NULLWORKS",
  description:
    "A living operational-architecture pressure test from NULLWORKS. Every challenge becomes a receipt. Every accepted correction becomes a version. Nothing silently disappears.",
  alternates: { canonical },
  openGraph: {
    title: "NULLWORKS Pressure Cooker",
    description:
      "Attack the framework before reality does. Continuously challenged, automatically organized, human-governed.",
    type: "website",
    url: canonical,
    siteName: "NULLWORKS",
  },
  twitter: {
    card: "summary_large_image",
    title: "NULLWORKS Pressure Cooker",
    description:
      "Every challenge becomes a receipt. Every accepted correction becomes a version. Nothing silently disappears.",
  },
};

export default function PressureCookerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "NULLWORKS Pressure Cooker",
    provider: {
      "@type": "Organization",
      name: "NULLWORKS",
      founder: { "@type": "Person", name: "Mason Perry" },
    },
    url: canonical,
    areaServed: "Global",
    serviceType: "Operational architecture pressure testing",
    description:
      "A governed system for reconstructing intended and executed operations, applying bounded external challenge, preserving evidence and authority receipts, prototyping repairs, and measuring outcomes without claiming certification.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PressureCookerExperience />
    </>
  );
}
