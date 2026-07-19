"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Cpu,
  ExternalLink,
  Factory,
  Gauge,
  HardHat,
  Link2,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  Wrench,
  Workflow,
} from "lucide-react";
import styles from "./receipt-wallet.module.css";

type EvidenceLevel = "external" | "evidence" | "positioning";

type ReceiptBadge = {
  title: string;
  kicker: string;
  level: EvidenceLevel;
  icon: typeof BadgeCheck;
  status: string;
  evidence: string;
  boundary: string;
  serial: string;
};

const badges: ReceiptBadge[] = [
  {
    title: "Forklift Certified",
    kicker: "Powered industrial equipment",
    level: "external",
    icon: Truck,
    status: "Employer trained and evaluated",
    evidence: "Current operator qualification reported through USPS industrial maintenance work. Public source record is not attached to this wallet yet.",
    boundary: "This claim applies only to equipment and conditions covered by the employer's training and evaluation.",
    serial: "EXT-001",
  },
  {
    title: "Industrial Automation Maintenance",
    kicker: "Physical systems",
    level: "evidence",
    icon: Factory,
    status: "Evidence-backed capability",
    evidence: "Hands-on maintenance, recovery, diagnosis, and modification work across material-handling and industrial support systems.",
    boundary: "This is a capability record, not a professional engineering license.",
    serial: "REC-002",
  },
  {
    title: "Operational Intelligence Systems Architect",
    kicker: "Category-building role",
    level: "positioning",
    icon: Workflow,
    status: "Public role identity",
    evidence: "NULLWORKS role framing for designing the operating structure around human experts, AI workers, evidence, authority, continuity, review, and telemetry.",
    boundary: "A professional positioning statement supported by public work receipts; not an external certification.",
    serial: "POS-003",
  },
  {
    title: "AI-Assisted Mobile Prototyping",
    kicker: "Voice to deployment",
    level: "evidence",
    icon: Smartphone,
    status: "Evidence-backed capability",
    evidence: "Functional systems have been framed, assembled, debugged, and deployed from a phone through directed AI workflows.",
    boundary: "Does not imply traditional software-engineering training or sole authorship of generated code.",
    serial: "REC-004",
  },
  {
    title: "Doesn't Write Production Code",
    kicker: "And still ships",
    level: "positioning",
    icon: Cpu,
    status: "Self-declared positioning",
    evidence: "Mason directs system design, workflow logic, testing, iteration, and deployment while AI tools generate and revise much of the implementation code.",
    boundary: "A deliberately blunt description of the build method—not a claim that code is unnecessary or production hardening is automatic.",
    serial: "POS-005",
  },
  {
    title: "Forward-Deployed Workflow Builder",
    kicker: "Learn the work first",
    level: "evidence",
    icon: HardHat,
    status: "Evidence-backed capability",
    evidence: "Direct discovery with operators and domain experts, workflow mapping, rapid prototyping, live validation, failure capture, and handoff framing.",
    boundary: "Validated prototypes still require appropriate production, security, compliance, and scaling specialists.",
    serial: "REC-006",
  },
  {
    title: "Human-AI Workflow Orchestration",
    kicker: "Organization > more AI",
    level: "evidence",
    icon: BrainCircuit,
    status: "Evidence-backed capability",
    evidence: "Design of human-readable roles, review gates, authority boundaries, source evidence, intervention paths, continuity, and execution receipts.",
    boundary: "The system keeps human authority final and does not claim autonomous organizational control.",
    serial: "REC-007",
  },
  {
    title: "Failure Receipt Preservation",
    kicker: "No fake finish lines",
    level: "evidence",
    icon: ScanLine,
    status: "Operating doctrine + receipts",
    evidence: "Failed attempts, recovery paths, source limitations, uncertainty, and known unknowns are retained as part of the operational record.",
    boundary: "Evidence quality varies by project and is classified rather than flattened into certainty.",
    serial: "REC-008",
  },
  {
    title: "Actually Builds Shit",
    kicker: "Physical + digital",
    level: "positioning",
    icon: Wrench,
    status: "Receipts-backed positioning",
    evidence: "A cross-domain record spanning industrial systems, deployed workflow prototypes, field experiments, evidence systems, and public operating artifacts.",
    boundary: "Intentionally informal language. Each underlying capability should be judged from its linked receipt—not the badge title.",
    serial: "POS-009",
  },
];

const evidenceLegend = [
  {
    level: "external" as const,
    label: "External credential",
    text: "Issued or evaluated by an employer, trainer, school, or independent authority.",
  },
  {
    level: "evidence" as const,
    label: "Evidence-backed capability",
    text: "Supported by visible work, deployments, photographs, records, witnesses, or measurable outcomes.",
  },
  {
    level: "positioning" as const,
    label: "Positioning statement",
    text: "A clearly marked role, method, or identity claim—not presented as outside certification.",
  },
];

function levelLabel(level: EvidenceLevel) {
  if (level === "external") return "External credential";
  if (level === "evidence") return "Evidence-backed";
  return "Positioning";
}

function levelClass(level: EvidenceLevel) {
  if (level === "external") return styles.external;
  if (level === "evidence") return styles.evidence;
  return styles.positioning;
}

export default function ReceiptWalletPage() {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  async function copyPage() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressBar} style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div className={styles.ghostField} aria-hidden="true">
        <div
          className={`${styles.ghostSeal} ${styles.ghostOne}`}
          style={{ transform: `translate3d(${progress * 22}vw, ${progress * 42}vh, 0) rotate(${progress * 110}deg)` }}
        >
          RECEIPTS
        </div>
        <div
          className={`${styles.ghostSeal} ${styles.ghostTwo}`}
          style={{ transform: `translate3d(${-progress * 18}vw, ${progress * 30}vh, 0) rotate(${-progress * 85}deg)` }}
        >
          PROOF
        </div>
        <div
          className={`${styles.ghostSeal} ${styles.ghostThree}`}
          style={{ transform: `translate3d(${progress * 12}vw, ${-progress * 48}vh, 0) rotate(${progress * 70}deg)` }}
        >
          HUMAN
        </div>
        <div className={styles.scanBeam} style={{ top: `${12 + progress * 74}%` }} />
      </div>

      <nav className={styles.nav} aria-label="Receipt wallet navigation">
        <a className={styles.wordmark} href="/">
          <span className={styles.wordmarkMark}>N</span>
          <span>NULLWORKS</span>
        </a>
        <div className={styles.navMeta}>
          <span className={styles.liveDot} />
          LIVE RECEIPT WALLET
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <Sparkles size={15} />
              CREDENTIALS FOR PEOPLE WHO DO THE WORK
            </div>
            <h1>
              THE RECEIPT
              <span>WALL</span>
            </h1>
            <p className={styles.heroLead}>
              Forklift certified. Industrial systems tested. AI-assisted.
              <strong> Doesn&apos;t write fucking code.</strong>
            </p>
            <p className={styles.heroBody}>
              A public wallet for credentials, evidence-backed capabilities, and blunt positioning statements—without pretending they are all the same thing.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#wallet">
                Enter the wallet
                <ChevronDown size={18} />
              </a>
              <button className={styles.secondaryButton} onClick={copyPage} type="button">
                {copied ? <CheckCircle2 size={17} /> : <Clipboard size={17} />}
                {copied ? "Link copied" : "Copy live link"}
              </button>
            </div>
          </div>

          <div className={styles.identityStage}>
            <div className={styles.orbit orbitOne} />
            <div className={styles.orbit orbitTwo} />
            <div className={styles.identityCard}>
              <div className={styles.cardTopline}>
                <span>OPERATOR ID</span>
                <span>MP-0729</span>
              </div>
              <div className={styles.portraitFrame}>
                <div className={styles.portraitMonogram}>MP</div>
                <div className={styles.portraitScan} />
              </div>
              <div className={styles.identityText}>
                <span>HUMAN AUTHORITY</span>
                <h2>Mason Perry</h2>
                <p>Operational Intelligence Systems Architect</p>
              </div>
              <div className={styles.identityStats}>
                <div>
                  <strong>09</strong>
                  <span>public badges</span>
                </div>
                <div>
                  <strong>03</strong>
                  <span>evidence classes</span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>final authority</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.heroTicker} aria-hidden="true">
          <span>RECEIPTS &gt; BADGES</span>
          <span>ORGANIZATION &gt; MORE AI</span>
          <span>HUMAN AUTHORITY REMAINS FINAL</span>
          <span>NO FAKE FINISH LINES</span>
        </div>
      </section>

      <section className={styles.manifesto}>
        <div className={styles.sectionNumber}>01</div>
        <div>
          <p className={styles.sectionKicker}>THE DIFFERENCE</p>
          <h2>A badge tells you the claim. A receipt tells you whether to believe it.</h2>
        </div>
        <p>
          This wallet does not flatten an employer credential, a demonstrated capability, and a self-declared role into one pile of shiny icons. Every claim carries its source class, evidence, status, and boundary.
        </p>
      </section>

      <section className={styles.walletSection} id="wallet">
        <div className={styles.stickyIntro}>
          <div className={styles.sectionNumber}>02</div>
          <p className={styles.sectionKicker}>BADGE WALL</p>
          <h2>Tap a badge.<br />Read the receipt.</h2>
          <p>
            The front is built to scan. The inside is built to survive scrutiny.
          </p>
          <div className={styles.classStack}>
            {evidenceLegend.map((item) => (
              <div className={styles.classMini} key={item.level}>
                <span className={`${styles.classDot} ${levelClass(item.level)}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.badgeGrid}>
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <details className={`${styles.badgeCard} ${levelClass(badge.level)}`} key={badge.serial}>
                <summary>
                  <div className={styles.badgeIndex}>{String(index + 1).padStart(2, "0")}</div>
                  <div className={styles.badgeSeal}>
                    <div className={styles.badgeSealInner}>
                      <Icon size={30} strokeWidth={1.6} />
                    </div>
                  </div>
                  <div className={styles.badgeCopy}>
                    <p>{badge.kicker}</p>
                    <h3>{badge.title}</h3>
                    <div className={styles.badgeStatusLine}>
                      <span>{levelLabel(badge.level)}</span>
                      <ChevronDown className={styles.chevron} size={17} />
                    </div>
                  </div>
                </summary>
                <div className={styles.badgeReceipt}>
                  <div>
                    <span>STATUS</span>
                    <p>{badge.status}</p>
                  </div>
                  <div>
                    <span>EVIDENCE</span>
                    <p>{badge.evidence}</p>
                  </div>
                  <div>
                    <span>CLAIM BOUNDARY</span>
                    <p>{badge.boundary}</p>
                  </div>
                  <div className={styles.serialRow}>
                    <span>{badge.serial}</span>
                    <span>NULLWORKS PUBLIC RECEIPT</span>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      <section className={styles.legendSection}>
        <div className={styles.legendHeading}>
          <div className={styles.sectionNumber}>03</div>
          <p className={styles.sectionKicker}>EVIDENCE CLASSIFICATION</p>
          <h2>One wall. Three truth states.</h2>
        </div>
        <div className={styles.legendGrid}>
          {evidenceLegend.map((item, index) => (
            <article className={`${styles.legendCard} ${levelClass(item.level)}`} key={item.level}>
              <div className={styles.legendTop}>
                <span>0{index + 1}</span>
                {item.level === "external" && <ShieldCheck size={25} />}
                {item.level === "evidence" && <Gauge size={25} />}
                {item.level === "positioning" && <Sparkles size={25} />}
              </div>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.systemSection}>
        <div className={styles.systemPanel}>
          <div className={styles.systemCopy}>
            <div className={styles.sectionNumber}>04</div>
            <p className={styles.sectionKicker}>THE SYSTEM BEHIND THE WALL</p>
            <h2>Not fake Credly.<br />Receipt-backed identity.</h2>
            <p>
              Conventional credential wallets are good at showing what an issuer awarded. This layer also shows what was built, what evidence survives, what remains uncertain, and where the claim stops.
            </p>
          </div>
          <div className={styles.systemFlow}>
            <div><span>01</span><strong>CLAIM</strong><small>What is being asserted?</small></div>
            <div><span>02</span><strong>SOURCE</strong><small>Who or what supports it?</small></div>
            <div><span>03</span><strong>EVIDENCE</strong><small>What can a reviewer inspect?</small></div>
            <div><span>04</span><strong>BOUNDARY</strong><small>Where does the claim stop?</small></div>
            <div><span>05</span><strong>RECEIPT</strong><small>What survives the story?</small></div>
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.finalSeal}>
          <BadgeCheck size={46} strokeWidth={1.2} />
        </div>
        <p className={styles.sectionKicker}>NULLWORKS / PUBLIC PROOF SYSTEM</p>
        <h2>Forklift certified.<br />Doesn&apos;t write fucking code.<br /><span>Still built the wallet.</span></h2>
        <p>
          The point is not to look certified. The point is to make the work inspectable.
        </p>
        <div className={styles.finalActions}>
          <a href="/" className={styles.primaryButton}>
            Enter NULLWORKS
            <ExternalLink size={17} />
          </a>
          <button className={styles.secondaryButton} onClick={copyPage} type="button">
            <Link2 size={17} />
            {copied ? "Link copied" : "Share this wallet"}
          </button>
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <strong>NULLWORKS</strong>
          <span>Operational Intelligence Systems</span>
        </div>
        <p>
          Original credential-wallet concept. Not affiliated with, endorsed by, or presented as Credly.
        </p>
        <span>UPDATED 2026.07.19</span>
      </footer>
    </main>
  );
}
