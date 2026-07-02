import type { Metadata } from "next";
import { ArrowRight, Factory, Network, ShieldCheck, Sparkles } from "lucide-react";
import { OI_SERIES } from "./_components/FieldNoteShell";
import styles from "./_components/FieldNotesLuxury.module.css";

export const metadata: Metadata = {
  title: "NULLWORKS OI Field Notes | Mason Perry",
  description:
    "A five-part field-note series on human-centered AI, multi-agent orchestration, Operational Intelligence Systems Architecture, and workflow compression.",
};

const summaries = [
  "Why AI should increase the capacity of willing experts instead of hiding, bypassing, or replacing their judgment.",
  "What changes when one assistant becomes a digital workforce and coordination becomes the limiting factor.",
  "The human-readable operating layer connecting agents, tools, evidence, memory, authority, workrooms, and telemetry.",
  "Why organizations need a new systems role that operates across software, AI, workflow, governance, and human authority.",
  "How to move from fragmented AI use to Toyota-style production—and how to measure the value created.",
];

const progression = [
  { icon: ShieldCheck, number: "01", title: "Protect the expert", body: "Human authority first." },
  { icon: Network, number: "02", title: "Organize the workforce", body: "Ownership, handoffs, continuity, and boundaries." },
  { icon: Factory, number: "03", title: "Build the production system", body: "Horse cart to Toyota—without replacing the people who know the work." },
];

export default function FieldNotesIndex() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <a href="/" className={styles.brandLink}>
            <div className={styles.monogram}>NW</div>
            <div>
              <div className={styles.brandEyebrow}>NULLWORKS</div>
              <div className={styles.brandTitle}>Operational Intelligence Field Notes</div>
            </div>
          </a>
          <a href="mailto:masoncalcolsol@gmail.com?subject=OI%20Field%20Notes" className={styles.contact}>Contact Mason</a>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroMonogram} aria-hidden="true">NW</div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.pill}><Sparkles size={14} /> Private briefing series</div>
              <h1 className={styles.heroTitle}>From AI Assistant to Operational Intelligence</h1>
              <p className={styles.heroDeck}>
                A five-part continuity story about protecting the expert, organizing a digital workforce, building the operating layer around AI, defining the OISA role, and measuring workflow compression.
              </p>
              <div className={styles.heroActions}>
                <a href={OI_SERIES[0].href} className={styles.primaryAction}>Begin Field Note 01 <ArrowRight size={17} /></a>
                <span className={styles.heroNote}>Five notes · one operating thesis</span>
              </div>
            </div>

            <aside className={styles.heroSide}>
              <div className={styles.sideLabel}>The progression</div>
              <div className={styles.progressList}>
                {progression.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.number} className={styles.progressItem}>
                      <div className={styles.progressIcon}><Icon size={17} /></div>
                      <div>
                        <div className={styles.progressNumber}>Step {item.number}</div>
                        <h2 className={styles.progressTitle}>{item.title}</h2>
                        <p className={styles.progressBody}>{item.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.collection}>
          <div className={styles.collectionHeader}>
            <div>
              <div className={styles.sectionLabel}>The collection</div>
              <h2 className={styles.collectionTitle}>Five field notes. One operating system.</h2>
            </div>
            <div className={styles.collectionMeta}>NULLWORKS · July 2026</div>
          </div>

          <div className={styles.noteList}>
            {OI_SERIES.map((item, index) => (
              <a key={item.number} href={item.href} className={styles.noteCard}>
                <div className={styles.noteNumber}>{String(item.number).padStart(2, "0")}</div>
                <div>
                  <h3 className={styles.noteTitle}>{item.title}</h3>
                  <p className={styles.noteSummary}>{summaries[index]}</p>
                </div>
                <div className={styles.noteArrow}><ArrowRight size={18} /></div>
              </a>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div><strong>Mason Perry</strong> — Founder, NULLWORKS · Operational Intelligence Systems Architect</div>
          <div className={styles.footerTag}>Compress the mess. Amplify the expert.</div>
        </footer>
      </div>
    </main>
  );
}
