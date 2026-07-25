import type { Metadata } from "next";
import { ArrowRight, Factory, Network, ShieldCheck, Sparkles } from "lucide-react";
import { OI_SERIES } from "./_components/FieldNoteShell";
import styles from "./_components/FieldNotesLuxury.module.css";

export const metadata: Metadata = {
  title: "NULLWORKS Field Notes | Mason Perry",
  description:
    "NULLWORKS field notes on human-centered AI, Operational Systems Architecture, developmental lineage, workflow compression, and accountable operational change.",
};

const summaries = [
  "Why AI should increase the capacity of willing experts instead of hiding, bypassing, or replacing their judgment.",
  "What changes when one assistant becomes a digital workforce and coordination becomes the limiting factor.",
  "The human-readable operating layer connecting the AI Operator, specialist agents, tools, evidence, memory, authority, workrooms, and telemetry.",
  "Why organizations need a new systems role that operates across software, AI, workflow, governance, and human authority.",
  "How to move from fragmented AI use to Toyota-style production—and how to measure the value created.",
  "Why one overloaded generalist is not an operating system, and how specialist agents become a human-controlled digital production system.",
];

const currentNotes = [
  {
    number: "OSA-01",
    title: "The Laboratory Leak",
    summary:
      "How emerging work becomes keyword soup and marketing slop before the category becomes clear—and why the public record of revision matters.",
    href: "/field-notes/laboratory-leak",
  },
  {
    number: "OSA-02",
    title: "The Talent Hollow",
    summary:
      "When AI automates the work that used to form judgment, organizations can gain efficiency while quietly consuming their future leadership bench.",
    href: "/field-notes/talent-hollow",
  },
  {
    number: "KIKI-001",
    title: "The First Nugget: Mining Wisdom in Public",
    summary:
      "A live public exchange surfaced hero-ops, separated instrumentation from calibration, and became the first preserved KIKIGAKI wisdom-mining field receipt.",
    href: "/field-notes/kikigaki-first-nugget",
  },
  {
    number: "KIKI-002",
    title: "The Quiet Achievement",
    summary:
      "Carl Mikael Björn's reflection on invisible technology becomes an operating principle: dependable systems should release attention without hiding evidence, authority, or failure.",
    href: "/field-notes/kikigaki-quiet-achievement",
  },
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
              <div className={styles.pill}><Sparkles size={14} /> Public operating doctrine</div>
              <h1 className={styles.heroTitle}>From AI Assistant to Operational Intelligence</h1>
              <p className={styles.heroDeck}>A connected field-note library about protecting the expert, organizing a digital workforce, preserving decision and developmental lineage, building the operating layer around AI, and turning runtime truth into accountable change.</p>
              <div className={styles.heroActions}>
                <a href={OI_SERIES[0].href} className={styles.primaryAction}>Begin Field Note 01 <ArrowRight size={17} /></a>
                <span className={styles.heroNote}>Core series + live OSA extensions</span>
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
              <div className={styles.sectionLabel}>The core collection</div>
              <h2 className={styles.collectionTitle}>Six field notes. One operating system.</h2>
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

        <section className={styles.collection}>
          <div className={styles.collectionHeader}>
            <div>
              <div className={styles.sectionLabel}>Operational Systems Architecture</div>
              <h2 className={styles.collectionTitle}>Live field notes from the edge of the category.</h2>
            </div>
            <div className={styles.collectionMeta}>Evidence · authority · capability</div>
          </div>

          <div className={styles.noteList}>
            {currentNotes.map((item) => (
              <a key={item.number} href={item.href} className={styles.noteCard}>
                <div className={styles.noteNumber}>{item.number}</div>
                <div>
                  <h3 className={styles.noteTitle}>{item.title}</h3>
                  <p className={styles.noteSummary}>{item.summary}</p>
                </div>
                <div className={styles.noteArrow}><ArrowRight size={18} /></div>
              </a>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div><strong>Mason Perry</strong> — Founder, NULLWORKS · Operational Systems Architect</div>
          <div className={styles.footerTag}>Compress the mess. Amplify the expert.</div>
        </footer>
      </div>
    </main>
  );
}
