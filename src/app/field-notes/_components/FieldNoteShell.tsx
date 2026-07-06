import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Mail } from "lucide-react";
import styles from "./FieldNotesLuxury.module.css";

export type SeriesLink = { number: number; title: string; href: string };

export const OI_SERIES: SeriesLink[] = [
  { number: 1, title: "Let the Expert Expert", href: "/field-notes/let-the-expert-expert" },
  { number: 2, title: "When Your AI Assistant Becomes a Company", href: "/field-notes/when-ai-becomes-a-company" },
  { number: 3, title: "OI SUITe: The Operating System Around the AI Operator", href: "/field-notes/oi-suite" },
  { number: 4, title: "The AI Engineer Builds the Worker. The OI Architect Builds the Company.", href: "/field-notes/the-oi-architect" },
  { number: 5, title: "Horse Cart to Toyota: What Workflow Compression Is Worth", href: "/field-notes/horse-cart-to-toyota" },
  { number: 6, title: "Da Vinci or Toyota? The Fork in the Road for AI Agents", href: "/field-notes/da-vinci-vs-toyota" },
];

export function FieldNoteShell({
  number,
  eyebrow,
  title,
  deck,
  children,
  source,
  standalone = false,
  standaloneLabel = "Standalone field case",
}: {
  number: number;
  eyebrow: string;
  title: string;
  deck: string;
  children: ReactNode;
  source?: { label: string; href: string };
  standalone?: boolean;
  standaloneLabel?: string;
}) {
  const currentIndex = OI_SERIES.findIndex((item) => item.number === number);
  const previous = !standalone && currentIndex > 0 ? OI_SERIES[currentIndex - 1] : null;
  const next = !standalone && currentIndex >= 0 && currentIndex < OI_SERIES.length - 1 ? OI_SERIES[currentIndex + 1] : null;
  const totalNotes = OI_SERIES.length;

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <a href="/field-notes" className={styles.brandLink}>
            <div className={styles.monogram}>NW</div>
            <div>
              <div className={styles.brandEyebrow}>NULLWORKS // OI FIELD NOTES</div>
              <div className={styles.brandTitle}>Operational Intelligence</div>
            </div>
          </a>
          <a href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Operational%20Intelligence" className={styles.contact}>
            <Mail size={14} /> Contact Mason
          </a>
        </header>

        <section className={styles.articleHero}>
          <div className={styles.heroMonogram} aria-hidden="true">NW</div>
          <div className={styles.articleHeroContent}>
            <div className={styles.articleTopline}>
              {standalone ? (
                <div className={styles.seriesPill}>{standaloneLabel}</div>
              ) : (
                <>
                  <div className={styles.seriesPill}>Field Note {String(number).padStart(2, "0")} of {String(totalNotes).padStart(2, "0")}</div>
                  <div className={styles.progressDots} aria-label={`Field note ${number} of ${totalNotes}`}>
                    {OI_SERIES.map((item) => {
                      const dotClass = item.number === number
                        ? `${styles.progressDot} ${styles.progressDotCurrent}`
                        : item.number < number
                          ? `${styles.progressDot} ${styles.progressDotDone}`
                          : styles.progressDot;
                      return <span key={item.number} className={dotClass} />;
                    })}
                  </div>
                </>
              )}
            </div>

            <p className={styles.articleEyebrow}>{eyebrow}</p>
            <h1 className={styles.articleTitle}>{title}</h1>
            <p className={styles.articleDeck}>{deck}</p>

            <div className={styles.byline}>
              <strong>Mason Perry</strong>
              <span>Founder, NULLWORKS</span>
              <span>Human-Centered Operational Intelligence Systems Architect</span>
              <span>July 2026</span>
            </div>

            {source ? (
              <a href={source.href} target="_blank" rel="noreferrer" className={styles.sourceLink}>
                {source.label} <ExternalLink size={14} />
              </a>
            ) : null}
          </div>
        </section>

        <article className={styles.articlePaper}>{children}</article>

        <section className={styles.articleNav}>
          {standalone ? (
            <>
              <a href="/field-notes" className={styles.navCard}>
                <div className={styles.navLabel}><ArrowLeft size={13} /> Field notes</div>
                <div className={styles.navTitle}>Return to the published Operational Intelligence series.</div>
              </a>
              <a href="mailto:masoncalcolsol@gmail.com?subject=ORI%20TAC%20OPS%20OISA%20Case%20Study" className={`${styles.navCard} ${styles.navCardNext}`}>
                <div className={styles.navLabel}>Challenge the case <ArrowRight size={13} /></div>
                <div className={styles.navTitle}>Ask for evidence, identify a failure mode, or propose a pilot measurement.</div>
              </a>
            </>
          ) : (
            <>
              {previous ? (
                <a href={previous.href} className={styles.navCard}>
                  <div className={styles.navLabel}><ArrowLeft size={13} /> Previous</div>
                  <div className={styles.navTitle}>{previous.title}</div>
                </a>
              ) : <div />}

              {next ? (
                <a href={next.href} className={`${styles.navCard} ${styles.navCardNext}`}>
                  <div className={styles.navLabel}>Next field note <ArrowRight size={13} /></div>
                  <div className={styles.navTitle}>{next.title}</div>
                </a>
              ) : (
                <a href="mailto:masoncalcolsol@gmail.com?subject=OI%20Pilot%20Conversation" className={`${styles.navCard} ${styles.navCardNext}`}>
                  <div className={styles.navLabel}>Start a pilot <ArrowRight size={13} /></div>
                  <div className={styles.navTitle}>Map the workflow. Measure the waste. Install the operating layer.</div>
                </a>
              )}
            </>
          )}
        </section>

        <footer className={styles.footer}>
          <div><strong>NULLWORKS</strong> — Compress the mess. Amplify the expert.</div>
          <div className={styles.footerTag}>Human authority remains final</div>
        </footer>
      </div>
    </main>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className={styles.lead} style={{ color: "#1f1b15", opacity: 1 }}>{children}</p>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className={styles.paragraph} style={{ color: "#3b3328", opacity: 1 }}>{children}</p>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className={styles.heading2}>{children}</h2>;
}

export function Quote({ children }: { children: ReactNode }) {
  return <blockquote className={styles.quote}><div className={styles.quoteInner}>{children}</div></blockquote>;
}

export function TruthBox({ title = "Truth boundary", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className={styles.truthBox}>
      <div className={styles.truthTitle}>{title}</div>
      <div className={styles.truthBody} style={{ color: "#40372b", opacity: 1 }}>{children}</div>
    </aside>
  );
}

export function BulletGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className={styles.bulletGrid}>
      {items.map((item) => (
        <section key={item.title} className={styles.bulletCard}>
          <div className={styles.bulletTitle}>{item.title}</div>
          <p className={styles.bulletBody} style={{ color: "#473d30", opacity: 1 }}>{item.body}</p>
        </section>
      ))}
    </div>
  );
}
