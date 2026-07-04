import type { Metadata } from "next";
import { Building2, Network, ShieldCheck, UsersRound } from "lucide-react";
import DirectoryClient from "./DirectoryClient";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "NULLWORKS Digital Workforce Directory",
  description:
    "An unlisted operating directory for the NULLWORKS executive team and provisional digital specialists.",
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
              A LinkedIn-style operating directory for the executives and specialists inside the OI SUITe. Every profile defines a lane, mission, skills, escalation path, authority boundary, and registry state.
            </p>
            <blockquote>
              The worker can be digital. Ownership, evidence, boundaries, and final human authority must remain visible.
            </blockquote>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.panelGlow} />
            <div className={styles.metric}><strong>9</strong><span>Locked executives</span></div>
            <div className={styles.metric}><strong>65</strong><span>Provisional specialists</span></div>
            <div className={styles.metric}><strong>74</strong><span>Unique profile routes</span></div>
            <div className={styles.metric}><strong>1</strong><span>Final human authority</span></div>
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
              The nine executive identities are locked company roles. Some specialist identities were recovered from operating history; the remaining provisional profiles are public-safe directory scaffolds created to make the current 65-specialist working inventory navigable while the complete receipt and identity audit continues. Provisional does not mean autonomous authority.
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
