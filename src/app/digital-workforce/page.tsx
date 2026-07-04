import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Map, Network, ShieldCheck, UsersRound } from "lucide-react";
import DirectoryClient from "./DirectoryClient";
import { workforceCounts } from "./registry";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "NULLWORKS Digital Workforce Directory",
  description:
    "An unlisted operating directory for the NULLWORKS founder, digital executives, and provisional specialists.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DigitalWorkforcePage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <div className={styles.mark}>NW</div>
            <div>
              <div className={styles.brandEyebrow}>NULLWORKS // Employee System</div>
              <div className={styles.brandName}>Digital Workforce Directory</div>
            </div>
          </div>
          <div className={styles.unlisted}>Unlisted operating surface</div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.kicker}><Network size={16} /> One company. One brain. Many bounded specialists.</div>
            <h1>The NULLWORKS digital workforce.</h1>
            <p>
              A LinkedIn-style operating directory for the founder, digital executives, and specialists inside the OI SUITe. Every profile defines a lane, mission, skills, escalation path, authority boundary, and registry state.
            </p>
            <blockquote>
              The worker can be digital. Ownership, evidence, boundaries, and final human authority must remain visible.
            </blockquote>
            <div className={styles.heroActions}>
              <Link href="/digital-workforce/company-map" className={styles.primaryAction}>
                <Map size={17} /> Open master company map
              </Link>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.panelGlow} />
            <div className={styles.metric}><strong>{workforceCounts.founder}</strong><span>Founder / final authority</span></div>
            <div className={styles.metric}><strong>{workforceCounts.digitalExecutives}</strong><span>Digital executives</span></div>
            <div className={styles.metric}><strong>{workforceCounts.provisionals}</strong><span>Provisional specialists</span></div>
            <div className={styles.metric}><strong>{workforceCounts.total}</strong><span>Unique employee profiles</span></div>
            <div className={styles.operatorCore}>
              <UsersRound size={31} />
              <strong>OI SUITe workforce</strong>
              <span>Persistent roles • scoped lanes • visible escalation</span>
            </div>
          </div>
        </section>

        <section className={styles.truthBoundary}>
          <ShieldCheck size={24} />
          <div>
            <strong>Registry truth boundary</strong>
            <p>
              Mason Perry remains founder and final human authority. The nine digital executive seats include the established boardroom roles and RenderSmith as the recovered visual executive created through direct operating telemetry. Some specialist identities were recovered from operating history; remaining provisional profiles are public-safe directory scaffolds pending the complete receipt and identity audit. Provisional never means independent authority.
            </p>
          </div>
        </section>

        <section className={styles.directorySection}>
          <div className={styles.sectionHeading}>
            <div className={styles.eyebrow}><Building2 size={15} /> Employee directory</div>
            <h2>Find the specialist responsible for the work.</h2>
            <p>Search by name, role, skill, or department. Each employee opens a unique operating profile.</p>
          </div>
          <DirectoryClient />
        </section>

        <footer className={styles.footer}>
          <span>NULLWORKS // Digital Workforce Directory</span>
          <strong>Human authority remains final.</strong>
        </footer>
      </div>
    </main>
  );
}
