import type { Metadata } from "next";
import ChadCommerceShell, { ChadSiteConfig } from "../_components/ChadCommerceShell";

export const metadata: Metadata = {
  title: "Patriot Peptides | Chad Meketarian Beta",
  description:
    "A brother-built beta landing page and consultation framework for Patriot Peptides.",
};

const config: ChadSiteConfig = {
  slug: "peptides",
  brand: "Patriot Peptides",
  eyebrow: "pro-country // firefighter-built // consultation first",
  headline: "Performance support with a clean customer path and a human follow-up gate.",
  deck:
    "A premium beta landing page for Patriot Peptides: patriotic visual language, clear classification cards, phone-first contact, customer account capture, inquiry tracking, and a payment-ready frame that can be connected after compliance review.",
  signature:
    "Built for a firefighter, father, hockey player, and old-school brother who wants to serve people without making the process confusing.",
  phone: "+19499817072",
  phoneDisplay: "949-981-7072",
  theme: "patriot",
  modeLabel: "consultation mode",
  safetyNote:
    "Peptide content here is configured as an inquiry and education framework only. Medical, prescription, dosing, sourcing, labeling, and checkout language must be reviewed before public sale.",
  primaryCta: "View peptide categories",
  secondaryCta: "Create customer inquiry",
  sections: {
    proof: [
      "Phone-first customer intake",
      "Classification cards from the existing graphic",
      "Compliance-gated language instead of unsupported medical claims",
    ],
    process: [
      "Customer selects interest category",
      "Inquiry summary is saved or sent",
      "Chad follows up before any fulfillment step",
    ],
    culture: [
      "Patriotic, respectful, premium",
      "Fire-service discipline without cringe",
      "Performance-minded but human-authority first",
    ],
  },
  products: [
    {
      id: "gh-releasing",
      name: "GH Releasing Classification",
      badge: "category",
      priceLabel: "consult",
      detail:
        "Interest card for customers asking about GH-releasing peptide categories, with human review before any recommendation.",
      note: "Requires verified business rules, disclaimers, and qualified medical/legal review before live sales.",
      status: "inquiry",
    },
    {
      id: "performance",
      name: "Performance + Endurance",
      badge: "category",
      priceLabel: "consult",
      detail:
        "A performance-minded inquiry lane for gym, shift-work, and hockey recovery conversations without making treatment claims.",
      note: "The beta captures intent; Chad or a qualified professional controls the next step.",
      status: "inquiry",
    },
    {
      id: "recovery",
      name: "Recovery + Tissue Support",
      badge: "category",
      priceLabel: "consult",
      detail:
        "For people who want to ask about recovery, inflammation support, tissue repair, and bone or joint support categories.",
      note: "Language intentionally avoids diagnosis, treatment, or dosing promises.",
      status: "inquiry",
    },
    {
      id: "sleep-energy",
      name: "Sleep + Energy Support",
      badge: "category",
      priceLabel: "consult",
      detail:
        "A clean intake path for customers looking for sleep support, energy, and day-to-day resilience conversations.",
      status: "inquiry",
    },
    {
      id: "metabolic",
      name: "Metabolic + Body Composition",
      badge: "category",
      priceLabel: "consult",
      detail:
        "A body-composition inquiry card covering metabolic support and fat-loss interest while keeping final advice human-reviewed.",
      note: "No result guarantee. No medical advice. No unsupported claim.",
      status: "inquiry",
    },
    {
      id: "skin-hair",
      name: "Skin + Hair Health",
      badge: "category",
      priceLabel: "consult",
      detail:
        "A customer-friendly card for skin, hair, and anti-aging support interests with follow-up before any order action.",
      status: "inquiry",
    },
  ],
};

export default function PatriotPeptidesPage() {
  return <ChadCommerceShell config={config} />;
}
