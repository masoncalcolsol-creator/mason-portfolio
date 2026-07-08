import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Eye,
  FileText,
  Gauge,
  Layers3,
  MessageSquareText,
  Radar,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import styles from "./airlift.module.css";

const observations = [
  {
    title: "Hidden signal",
    body: "Transferable systems capability often appears in the way someone diagnoses, routes, improves, and explains work, not only in a job title.",
    icon: Eye,
  },
  {
    title: "Resume compression",
    body: "Traditional application artifacts flatten operating pattern into keywords, chronology, and role labels before the real capability is visible.",
    icon: FileText,
  },
  {
    title: "Pre-interview proof",
    body: "The useful artifact is a compact proof layer: receipts, decisions, constraints, handoffs, failure handling, and measurable improvement.",
    icon: Radar,
  },
];

const airliftSteps = [
  ["Capture", "Start with one real operating story, public exchange, or project receipt."],
  ["Map", "Separate job title from actual operating pattern: what was observed, decided, routed, repaired, measured, and handed off."],
  ["Translate", "Convert the pattern into employer-readable capability without overstating title, authority, or credential depth."],
  ["Verify", "Preserve source boundaries and keep human accountability visible before outreach, interview, or hiring conversation."],
];

const proofQuestions = [
  "What did the person notice that others missed?",
  "What constraint made the problem difficult?",
  "What did they change in the operating system, not just the task?",
  "What evidence shows that the pattern is real?",
  "What would a hiring team need to see before an interview to believe it?",
];

export const metadata = {
  title: "Airlift Profile for G Shankar | NULLWORKS",
  description:
    "A public-response Airlift profile from Mason Perry and NULLWORKS, based on a LinkedIn exchange about transferable systems capability and hiring signal.",
};

export default function GShankarAirliftPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand}>
            <div className={styles.brandMark}>NW</div>
            <div>
              <div className={styles.brandEyebrow}>NULLWORKS Airlift</div>
              <div className={styles.brandName}>Mason Perry</div>
            </div>
          </a>

          <nav className={styles.headerLinks} aria-label="Airlift navigation">
            <a href="/" className={styles.headerLink}>NULLWORKS</a>
            <a href="mailto:masoncalcolsol@gmail.com?subject=G%20Shankar%20Airlift%20Profile" className={styles.headerPrimary}>
              Contact Mason <ArrowRight size={15} />
            </a>
          </nav>
        </header>

        <section className={styles.liveReceipt}>
          <div className={styles.receiptBadge}>
            <Workflow size={16} /> FYI / Live build receipt
          </div>
          <div className={styles.receiptCopy}>
            <h2>This page was built live from Mason&apos;s LinkedIn exchange with you.</h2>
            <p>
              Mason does not claim to be a conventional software developer. He is a lifelong systems operator using an Operational Intelligence SUITe: a governed work system that turns natural-language direction into sourced pages, repository commits, deployment checks, receipts, and human verification.
            </p>
            <p>
              This specific Airlift page was not instrumented end-to-end, so it does not claim a seconds number. The honest receipt is: live instruction, two source commits, Vercel success, and Mason&apos;s mobile-browser verification. The underlying Hive fast-boot layer separately has a verified 11-second working-floor receipt.
            </p>
          </div>
          <div className={styles.receiptLinks}>
            <a href="https://github.com/masoncalcolsol-creator/mason-portfolio/commit/763923ea69172946012e8c04d2a65fa24747d616" target="_blank" rel="noreferrer" className={styles.receiptLink}>
              Page source commit <ExternalLink size={14} />
            </a>
            <a href="https://github.com/masoncalcolsol-creator/mason-portfolio/commit/0c42b74e4ffa81601db50547c2178e97aa17d24b" target="_blank" rel="noreferrer" className={styles.receiptLink}>
              Style + deploy commit <ExternalLink size={14} />
            </a>
            <a href="https://github.com/masoncalcolsol-creator/nullworks-corporate-wifi-hive/blob/main/HIVE_BOOT.yaml" target="_blank" rel="noreferrer" className={styles.receiptLink}>
              11-second Hive receipt <ExternalLink size={14} />
            </a>
          </div>
        </section>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <Workflow size={15} /> Public response artifact
            </div>

            <h1 className={styles.heroTitle}>G Shankar named the missing hiring signal.</h1>

            <p className={styles.heroLead}>
              The signal is often hiding in the operating pattern, not the job title. This Airlift profile turns that idea into a working frame for making transferable systems capability visible before the resume filter erases it.
            </p>

            <div className={styles.heroActions}>
              <a href="#airlift" className={styles.primaryButton}>
                View the Airlift frame <ArrowRight size={17} />
              </a>
              <a href="#boundary" className={styles.secondaryButton}>
                See source boundary <ShieldCheck size={17} />
              </a>
            </div>
          </div>

          <aside className={styles.signalPanel} aria-label="Airlift signal panel">
            <div className={styles.signalTopline}>LinkedIn exchange receipt</div>
            <blockquote className={styles.quote}>
              “the hiring signal is often hiding in the operating pattern, not the job title.”
            </blockquote>
            <p>
              That sentence is the bridge: if the real capability is in the operating pattern, the next artifact cannot be only a resume. It needs to show how the person works.
            </p>
            <div className={styles.signalMetricGrid}>
              <Metric value="01" label="public idea" />
              <Metric value="04" label="Airlift steps" />
              <Metric value="05" label="proof questions" />
            </div>
          </aside>
        </section>

        <section className={styles.thesis}>
          <div>
            <div className={styles.darkEyebrow}>What this page is</div>
            <h2>A compact prototype for surfacing systems talent before it is filtered out.</h2>
          </div>
          <p>
            This page is not a biography, endorsement claim, recruiting pitch, or scraped profile. It is a public response to a useful hiring insight: transferable systems thinking often becomes obvious only after someone starts solving problems. NULLWORKS is testing how to surface that capability earlier, with evidence and human accountability intact.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>The signal map</div>
            <h2>What hiring artifacts usually miss.</h2>
          </div>

          <div className={styles.cardGrid}>
            {observations.map((item) => {
              const Icon = item.icon;
              return (
                <article className={styles.card} key={item.title}>
                  <div className={styles.cardIcon}><Icon size={22} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="airlift" className={styles.airlift}>
          <div className={styles.airliftIntro}>
            <div className={styles.darkEyebrow}>Airlift profile method</div>
            <h2>Move the proof above the filter.</h2>
            <p>
              An Airlift profile is a lightweight evidence layer designed to help the right human see the right operating pattern before an automated or overloaded filter compresses it into the wrong category.
            </p>
          </div>

          <div className={styles.stepList}>
            {airliftSteps.map(([title, body], index) => (
              <article className={styles.stepCard} key={title}>
                <div className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.twoColumn}>
          <article className={styles.lightCard}>
            <div className={styles.cardIcon}><Layers3 size={23} /></div>
            <h2>For founders and hiring teams</h2>
            <p>
              Look for operating pattern evidence: how candidates identify constraints, preserve context, handle uncertainty, create handoffs, recover from failure, and improve the system around the task.
            </p>
          </article>

          <article className={styles.warmCard}>
            <div className={styles.cardIcon}><Gauge size={23} /></div>
            <h2>For candidates with hidden systems skill</h2>
            <p>
              Stop relying only on titles to carry the signal. Package one real receipt into a short proof map: situation, constraint, action, operating pattern, result, and boundary.
            </p>
          </article>
        </section>

        <section className={styles.proofSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>Before the interview</div>
            <h2>Five questions that reveal transferable systems capability.</h2>
          </div>

          <div className={styles.questionList}>
            {proofQuestions.map((question) => (
              <div className={styles.question} key={question}>
                <CheckCircle2 size={18} />
                <span>{question}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="boundary" className={styles.boundary}>
          <div className={styles.boundaryIcon}><ShieldCheck size={26} /></div>
          <div>
            <div className={styles.darkEyebrow}>Source and authority boundary</div>
            <h2>Respectful by design.</h2>
            <p>
              This page is based on a visible public LinkedIn exchange and does not claim that G Shankar requested, approved, endorsed, funded, or partnered with NULLWORKS. It does not use private information. It is a prototype response to an idea worth testing: hiring signal should be evidenced, not merely polished.
            </p>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaIcon}><MessageSquareText size={26} /></div>
          <h2>G, you named the problem. This is the first working frame.</h2>
          <p>
            If the signal lives in the operating pattern, the next step is building lightweight, evidence-backed artifacts that help the right people see that pattern before the filter does.
          </p>
          <div className={styles.ctaActions}>
            <a href="mailto:masoncalcolsol@gmail.com?subject=Airlift%20Profile%20Discussion" className={styles.primaryButton}>
              Discuss the Airlift profile <ArrowRight size={17} />
            </a>
            <a href="/field-notes" className={styles.secondaryButton}>
              Read OI Field Notes <ExternalLink size={16} />
            </a>
          </div>
        </section>

        <footer className={styles.footer}>
          <strong>Mason Perry / NULLWORKS</strong>
          <span>Operational Intelligence Systems Architecture. Human authority remains final.</span>
        </footer>
      </div>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.metric}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
