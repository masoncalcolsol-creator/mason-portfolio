import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Network, ShieldCheck } from "lucide-react";
import CompanyMapClient from "./CompanyMapClient";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "NULLWORKS Master Company Map",
  description:
    "A zoomable, clickable operating map of the NULLWORKS founder, digital executives, and provisional specialist workforce.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CompanyMapPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/digital-workforce" className={styles.backLink}>
            <ArrowLeft size={17} /> Employee directory
          </Link>
          <div className={styles.brand}>
            <div className={styles.mark}>NW</div>
            <div>
              <div className={styles.brandEyebrow}>NULLWORKS // Public OI Architecture</div>
              <div className={styles.brandName}>Master Company Map</div>
            </div>
          </div>
          <div className={styles.unlisted}>Unlisted map</div>
        </header>

        <section className={styles.hero}>
          <div>
            <div className={styles.kicker}><Network size={16} /> One company. One brain. Seventy-five employee profiles.</div>
            <h1>The complete NULLWORKS digital workforce.</h1>
            <p>
              A zoomable operating map showing the founder, nine digital executives, sixty-five provisional specialists, their reporting lanes, and the profile route for every employee.
            </p>
          </div>
          <div className={styles.truthBoundary}>
            <ShieldCheck size={23} />
            <p>
              The map visualizes operating relationships. It does not grant authority. Mason Perry remains the final human authority; provisional identities remain provisional until their receipt and identity states are fully audited.
            </p>
          </div>
        </section>

        <CompanyMapClient />

        <footer className={styles.footer}>
          <span>NULLWORKS // Master Company Map</span>
          <strong>Human authority remains final.</strong>
        </footer>
      </div>
    </main>
  );
}
