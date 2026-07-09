import type { Metadata } from "next";
import ChadCommerceShell, { ChadSiteConfig } from "../_components/ChadCommerceShell";

export const metadata: Metadata = {
  title: "Foreman Soap Co. | Chad Meketarian Beta",
  description:
    "A firehouse-themed vegan soap beta storefront and order framework for Chad Meketarian.",
};

const config: ChadSiteConfig = {
  slug: "soap",
  brand: "Foreman Soap Co.",
  eyebrow: "vegan soap // firehouse grit // hockey-bag redemption",
  headline: "Old-school firehouse soap for men who work hard and still need to clean up right.",
  deck:
    "A respectful, fireman-themed soap landing page for Chad’s homemade vegan bars: product cards, customer account capture, order draft tracking, shipping handoff, and payment-link readiness in the same frame as the peptide page.",
  signature:
    "Not a gag brand. Not fake tough-guy nonsense. Just clean bars for smoke, sweat, hockey gear, station sinks, garage hands, and tired men trying to go home decent.",
  phone: "+19499817072",
  phoneDisplay: "949-981-7072",
  theme: "firehouse",
  modeLabel: "soap order mode",
  safetyNote:
    "Soap product names, ingredients, pricing, photos, inventory, taxes, shipping rules, and payment links still need Chad’s confirmation before production launch.",
  primaryCta: "Shop soap lineup",
  secondaryCta: "Create customer account",
  sections: {
    proof: [
      "Homemade vegan soap position",
      "Firehouse culture without disrespecting the job",
      "Product photos can drop into the existing card frame",
    ],
    process: [
      "Customer picks bars",
      "Draft order saves locally",
      "Text/email handoff sends a clean order summary",
    ],
    culture: [
      "Old ways, clean hands, no cringe",
      "Hockey-room humor where it belongs",
      "Father, fireman, craftsman energy",
    ],
  },
  products: [
    {
      id: "wash-your-ash",
      name: "Wash Your Ash",
      badge: "signature",
      priceLabel: "price tbd",
      detail:
        "The flagship bar: firehouse wordplay, charcoal/smoke-room attitude, and a clean finish after long shifts or garage work.",
      note: "Suggested profile: activated charcoal look, cedar/smoke direction, vegan formula confirmation pending.",
      status: "order",
    },
    {
      id: "hockey-bag-redemption",
      name: "Hockey Bag Redemption",
      badge: "hockey",
      priceLabel: "price tbd",
      detail:
        "For the bag that could legally be classified as a biological incident. Built for post-game showers and fire-vs-cop league spice.",
      note: "Keep it funny, not gross on the label. The page can carry the joke.",
      status: "order",
    },
    {
      id: "station-sink",
      name: "Station Sink",
      badge: "daily",
      priceLabel: "price tbd",
      detail:
        "A simple daily bar for hands, forearms, and end-of-day cleanup when work followed you home.",
      status: "order",
    },
    {
      id: "turnout-room",
      name: "Turnout Room",
      badge: "grit",
      priceLabel: "price tbd",
      detail:
        "A darker, heavier bar concept for smoke, sweat, dust, and equipment-room funk after the hard days.",
      status: "order",
    },
    {
      id: "old-house-tradition",
      name: "Old House Tradition",
      badge: "classic",
      priceLabel: "price tbd",
      detail:
        "A respectful heritage bar: not loud, not cute, just a clean nod to the old house, old stories, and the men who taught the job.",
      status: "order",
    },
    {
      id: "chiefs-day-off",
      name: "Chief’s Day Off",
      badge: "limited",
      priceLabel: "coming soon",
      detail:
        "Limited-run joke label placeholder. Keep the public copy professional; let the label wink without burning bridges.",
      status: "coming-soon",
    },
  ],
};

export default function ForemanSoapPage() {
  return <ChadCommerceShell config={config} />;
}
