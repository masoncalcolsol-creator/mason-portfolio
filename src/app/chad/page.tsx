import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Flame,
  HeartHandshake,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Chad Meketarian Commerce Beta | NULLWORKS",
  description:
    "Two brother-built beta landing pages for Patriot Peptides and Foreman Soap Co.",
};

const sites = [
  {
    href: "/chad/peptides",
    eyebrow: "Patriot Peptides",
    title: "Premium consultation-first peptide landing page.",
    body:
      "Patriotic brand frame, classification cards, customer inquiry capture, order-tracking shell, and compliance-gated checkout readiness.",
    icon: ShieldCheck,
  },
  {
    href: "/chad/soap",
    eyebrow: "Foreman Soap Co.",
    title: "Firehouse vegan soap storefront.",
    body:
      "Respectful old-school fire culture, hockey-bag humor, product cards, local customer accounts, draft orders, and text/email handoff.",
    icon: Flame,
  },
] as const;

export default function ChadProjectHub() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <span>NW</span>
            <strong>NULLWORKS</strong>
          </a>
          <a className={styles.phone} href="tel:+19499817072">
            <PhoneCall size={15} />
            949-981-7072
          </a>
        </header>

        <section className={styles.hero}>
          <div className={styles.eyebrow}>
            <Sparkles size={15} />
            forward-deployed brother build
          </div>
          <h1>Two beta storefronts for Chad. Same operating frame. Different customer lanes.</h1>
          <p>
            Built from Mason’s field brief and Chad’s existing Patriot Peptides graphic:
            one consultation-first peptide page and one respectful firehouse vegan soap storefront,
            both with account capture, selectable product cards, order/inquiry summaries, and tracking shells.
          </p>
          <div className={styles.actions}>
            <a href="/chad/peptides">Open Patriot Peptides <ArrowRight size={16} /></a>
            <a href="/chad/soap">Open Foreman Soap Co. <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className={styles.grid}>
          {sites.map((site) => {
            const Icon = site.icon;
            return (
              <a key={site.href} href={site.href} className={styles.card}>
                <Icon size={28} />
                <span>{site.eyebrow}</span>
                <h2>{site.title}</h2>
                <p>{site.body}</p>
                <strong>Preview page <ArrowRight size={15} /></strong>
              </a>
            );
          })}
        </section>

        <section className={styles.notes}>
          <div>
            <HeartHandshake size={22} />
            <h2>Public-safe brotherhood language</h2>
            <p>
              The pages preserve the fire-service/family/hockey energy without publishing private work pain,
              unsupported health promises, or fake completion claims.
            </p>
          </div>
          <div>
            <BadgeCheck size={22} />
            <h2>Ready for Chad’s real data</h2>
            <p>
              Drop in soap photos, ingredients, prices, payment links, peptide business rules,
              QR codes, shipping policy, and fulfillment process as Chad confirms each piece.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
