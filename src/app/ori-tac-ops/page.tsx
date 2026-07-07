import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileSearch,
  Gauge,
  HardDriveUpload,
  Human,
  Mail,
  PackageCheck,
  Printer,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ORI TAC OPS | Human-Controlled Damaged-Label Recovery",
  description:
    "A simple, portable, human-controlled work cell for damaged parcel-label recovery, designed as a controlled OI SUITe pilot rather than a staffing-reduction tool.",
};

const flow = [
  {
    icon: ScanLine,
    number: "01",
    title: "Capture what survived",
    body: "Use a phone to photograph the damaged label and preserve the readable evidence before more handling is added.",
  },
  {
    icon: FileSearch,
    number: "02",
    title: "Let OCR assist",
    body: "The system proposes readable names, addresses, tracking blocks, and destination clues. It does not silently decide the answer.",
  },
  {
    icon: Human,
    number: "03",
    title: "Employee verifies",
    body: "A trained employee corrects, rejects, or escalates the result. Human judgment and approved process remain final.",
  },
  {
    icon: Printer,
    number: "04",
    title: "Print a helper label",
    body: "The printer creates a clearly marked recovery aid: USPS REPAIR HELPER LABEL, NOT POSTAGE, HUMAN VERIFIED, REPAIR CANDIDATE.",
  },
  {
    icon: PackageCheck,
    number: "05",
    title: "Return to approved flow",
    body: "The parcel follows the locally approved recovery path. The prototype does not invent routing authority.",
  },
  {
    icon: ClipboardCheck,
    number: "06",
    title: "Leave a receipt",
    body: "The pilot records what was recovered, what remained uncertain, how long it took, and whether the parcel stayed in motion.",
  },
];

const audiences = [
  {
    icon: Wrench,
    label: "For the employee doing the work",
    title: "Less hunting. Less retyping. You still decide.",
    body: "ORI TAC OPS is a workbench, not a replacement worker. It keeps the surviving evidence, machine suggestion, employee correction, printer output, and next handoff in one visible place.",
  },
  {
    icon: Gauge,
    label: "For Postal leadership",
    title: "Turn a recurring exception into a measurable process.",
    body: "A controlled pilot can measure exception volume, recovery rate, operator minutes, false recovery, rework, training burden, downstream handling, and unresolved risk before anyone claims savings or scale.",
  },
  {
    icon: Workflow,
    label: "For Toyota and systems integrators",
    title: "The app is not the product. The complete work cell is.",
    body: "This is an OI SUITe field experiment: operator, evidence, OCR, correction, physical printer, authority boundary, recovery path, telemetry, and human acceptance testing designed as one operating system.",
  },
];

const rules = [
  {
    title: "It does not replace postal employees.",
    body: "The employee owns interpretation, correction, escalation, and final responsibility.",
  },
  {
    title: "It does not create postage.",
    body: "Every output is visibly marked as a repair helper label and must remain inside approved recovery procedures.",
  },
  {
    title: "It is not connected to secure USPS production systems.",
    body: "The current independent prototype uses a portable phone, web interface, printer, and recovery-only labels. No private customer dataset is presented as a product asset.",
  },
  {
    title: "It is not a deployed USPS program.",
    body: "The next legitimate step is a bounded, authorized pilot with privacy, safety, labor, technical, and operational review.",
  },
];

const metrics = [
  "Recovery candidates presented",
  "Successfully recovered parcels",
  "False or unsafe recoveries",
  "Employee minutes per case",
  "Rework and repeat handling",
  "Downstream exception routing",
  "Training and cognitive burden",
  "Hardware, support, and privacy cost",
];

const photoSlots = [
  {
    title: "Portable kit",
    body: "Closed hard-case configuration with phone, Brother QL-820NWB printer, supplies, and power path.",
  },
  {
    title: "Work cell deployed",
    body: "The kit opened at a clean work surface, showing the actual operator sequence without exposing mail data.",
  },
  {
    title: "Helper-label close-up",
    body: "A sanitized sample showing NOT POSTAGE, HUMAN VERIFIED, REPAIR CANDIDATE, and the intended visual hierarchy.",
  },
  {
    title: "Before and after",
    body: "A fully sanitized damaged-label example beside the corrected helper output and final recovery receipt.",
  },
];

export default function OriTacOpsLandingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/" className={styles.brand} aria-label="NULLWORKS home">
            <span className={styles.mark}>NW</span>
            <span>
              <strong>NULLWORKS</strong>
              <small>Human-controlled Operational Intelligence</small>
            </span>
          </a>
          <nav className={styles.nav} aria-label="ORI TAC OPS links">
            <a href="#how-it-works">How it works</a>
            <a href="#pilot">Pilot</a>
            <a href="/field-notes/ori-tac-ops-oisa-beta-test">Full case study</a>
            <a className={styles.contact} href="mailto:masoncalcolsol@gmail.com?subject=ORI%20TAC%20OPS%20controlled%20pilot">
              <Mail size={15} /> Contact Mason
            </a>
          </nav>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <Sparkles size={14} /> Portable exception recovery // Human verified
            </div>
            <h1>When the label fails, the parcel should not disappear into the process.</h1>
            <p className={styles.deck}>
              ORI TAC OPS is a portable, human-controlled damaged-label recovery work cell. It helps a postal employee preserve what survived, use OCR as an assistant, correct the result, print a clearly marked helper label, and return the parcel to the approved recovery flow.
            </p>
            <p className={styles.plainLanguage}>
              <strong>Plain English:</strong> take a picture, check the answer, print a helper label, keep the parcel moving.
            </p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#how-it-works">
                See the 30-second flow <ArrowRight size={16} />
              </a>
              <a className={styles.secondary} href="/field-notes/ori-tac-ops-oisa-beta-test">
                Read the complete field case
              </a>
            </div>
            <div className={styles.statusLine}>
              <span><CheckCircle2 size={14} /> Working portable prototype</span>
              <span><ShieldCheck size={14} /> Controlled pilot requested</span>
              <span><Eye size={14} /> Not a USPS production deployment</span>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="ORI TAC OPS portable recovery work cell diagram">
            <div className={styles.visualGrid} aria-hidden="true" />
            <div className={styles.packageCard}>
              <span>Damaged label</span>
              <strong>Evidence survives</strong>
              <div className={styles.fakeBarcode} aria-hidden="true" />
              <small>Unreadable fields remain uncertain</small>
            </div>
            <div className={styles.phoneCard}>
              <div className={styles.phoneTop}><ScanLine size={16} /> ORI</div>
              <div className={styles.phoneField}><span>NAME</span><strong>Suggested → employee checks</strong></div>
              <div className={styles.phoneField}><span>ADDRESS</span><strong>Editable, never hidden</strong></div>
              <div className={styles.phoneField}><span>TRACKING</span><strong>Preserve surviving block</strong></div>
              <div className={styles.verifyButton}><BadgeCheck size={15} /> HUMAN VERIFIED</div>
            </div>
            <div className={styles.printerCard}>
              <Printer size={25} />
              <strong>Helper label</strong>
              <span>NOT POSTAGE</span>
              <span>REPAIR CANDIDATE</span>
            </div>
            <div className={styles.operatorCore}>
              <ShieldCheck size={27} />
              <strong>EMPLOYEE</strong>
              <span>Verify · correct · decide</span>
            </div>
            <div className={styles.flowArrowOne} aria-hidden="true">→</div>
            <div className={styles.flowArrowTwo} aria-hidden="true">→</div>
            <div className={styles.visualCaption}>
              <span>THE COMPLETE SYSTEM</span>
              <strong>Operator + evidence + OCR + printer + approved handoff + telemetry</strong>
            </div>
          </div>
        </section>

        <section id="how-it-works" className={styles.lightSection}>
          <div className={styles.sectionLabel}>The 30-second explanation</div>
          <h2>One exception. One visible work cell. Six simple steps.</h2>
          <p className={styles.sectionLead}>
            The goal is not to make the employee trust a mysterious AI answer. The goal is to put the surviving evidence, machine assistance, human correction, physical output, and next approved action on one screen.
          </p>
          <div className={styles.flowGrid}>
            {flow.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.number} className={styles.flowCard}>
                  <div className={styles.flowIcon}><Icon size={22} /></div>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.audienceSection}>
          <div className={styles.sectionLabel}>One page, three audiences</div>
          <h2>The same system should make sense on the floor, in the boardroom, and in an engineering review.</h2>
          <div className={styles.audienceGrid}>
            {audiences.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className={styles.audienceCard}>
                  <Icon size={25} />
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.rulesSection}>
          <div className={styles.rulesIntro}>
            <div className={styles.sectionLabel}>Four rules that do not move</div>
            <h2>Human authority is not a marketing line. It is the operating boundary.</h2>
            <p>
              ORI TAC OPS only makes sense if the people responsible for the mail can see what the system is doing, correct it, stop it, and escalate uncertainty.
            </p>
          </div>
          <div className={styles.rulesGrid}>
            {rules.map((rule, index) => (
              <article key={rule.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{rule.title}</h3>
                <p>{rule.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pilot" className={styles.pilotSection}>
          <div className={styles.pilotCopy}>
            <div className={styles.sectionLabel}>The correct next step</div>
            <h2>Run a small controlled pilot. Measure the current state before claiming the future.</h2>
            <p>
              A valid test begins with a bounded site, approved operators, sanitized evidence, defined escalation, and a clear stop condition. The pilot should compare the existing exception path with the portable work cell—not assume that technology automatically creates value.
            </p>
            <div className={styles.hypothesisCard}>
              <Gauge size={24} />
              <div>
                <span>Small-volume hypothesis</span>
                <strong>Could recovering roughly three additional parcels per day justify the complete cost of the work cell?</strong>
                <p>That is a question for measured pilot data, not a published savings claim.</p>
              </div>
            </div>
          </div>
          <div className={styles.metricsPanel}>
            <span className={styles.metricsLabel}>Pilot telemetry</span>
            {metrics.map((metric) => (
              <div key={metric}><CheckCircle2 size={15} /> {metric}</div>
            ))}
          </div>
        </section>

        <section className={styles.oiSection}>
          <div className={styles.oiVisual}>
            <div className={styles.oiRing} aria-hidden="true" />
            <div className={styles.oiCenter}>
              <Users size={28} />
              <strong>HUMAN AUTHORITY</strong>
              <span>final</span>
            </div>
            <div className={`${styles.oiNode} ${styles.nodeOne}`}><ScanLine size={18} /> Capture</div>
            <div className={`${styles.oiNode} ${styles.nodeTwo}`}><FileSearch size={18} /> OCR</div>
            <div className={`${styles.oiNode} ${styles.nodeThree}`}><Printer size={18} /> Output</div>
            <div className={`${styles.oiNode} ${styles.nodeFour}`}><Gauge size={18} /> Telemetry</div>
          </div>
          <div className={styles.oiCopy}>
            <div className={styles.sectionLabel}>Why Toyota should care</div>
            <h2>ORI TAC OPS is an OI SUITe experiment disguised as a damaged-label tool.</h2>
            <p>
              The useful product is not “AI reads a label.” The useful product is the operating architecture around that capability: the employee role, source evidence, authority limits, correction path, hardware, training, exception routing, telemetry, and recovery receipt.
            </p>
            <p>
              That same method applies to warehouse automation, installation, software implementation, maintenance support, customer turnover, and any environment where physical operations and digital systems meet.
            </p>
            <a className={styles.darkLink} href="/toyota-bridge">
              See Mason&apos;s Toyota role-fit case <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className={styles.photoSection}>
          <div className={styles.photoHeader}>
            <div>
              <div className={styles.sectionLabel}>Field evidence gallery</div>
              <h2>Photo slots are ready.</h2>
              <p>These placeholders can be replaced with sanitized real photos without changing the page structure.</p>
            </div>
            <HardDriveUpload size={33} />
          </div>
          <div className={styles.photoGrid}>
            {photoSlots.map((slot, index) => (
              <article key={slot.title} className={styles.photoCard}>
                <div className={styles.photoPlaceholder}>
                  <Box size={31} />
                  <span>PHOTO SLOT {String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{slot.title}</h3>
                <p>{slot.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.evidenceSection}>
          <div className={styles.evidenceIcon}><BadgeCheck size={27} /></div>
          <div>
            <div className={styles.sectionLabel}>What is real today</div>
            <h2>A working test article and a legitimate routing receipt—not a production claim.</h2>
            <p>
              Mason built and field-tested a portable prototype using a dedicated phone, web interface, Brother QL-820NWB printer, hard case, helper labels, and a human-verification path. After a senior Postal technology leader invited a submission through Postal channels, the controlled-pilot packet was sent and routed toward technical review.
            </p>
            <p>
              That is evidence of serious institutional interest and correct routing. It is not approval, procurement, endorsement, pilot authorization, or deployment.
            </p>
          </div>
        </section>

        <section className={styles.truthSection}>
          <ShieldCheck size={28} />
          <div>
            <strong>Public truth boundary</strong>
            <p>
              ORI TAC OPS is an independent NULLWORKS human-centered logistics exception-recovery concept with a working portable prototype and a controlled-pilot request. It is not an approved, purchased, connected, or deployed USPS production system. No controlled pilot has yet validated recovery rates, exact savings, training time, enterprise impact, or return on investment. USPS and Toyota do not sponsor or endorse this page. Human authority remains final.
            </p>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div>
            <div className={styles.sectionLabel}>The simple pitch</div>
            <h2>Do not replace the expert. Give the expert a better recovery work cell.</h2>
            <p>
              The next conversation is not “Should AI run the mail?” It is “Can a small, controlled, employee-led test reduce avoidable exception handling without creating new risk?”
            </p>
          </div>
          <div className={styles.finalActions}>
            <a className={styles.primary} href="mailto:masoncalcolsol@gmail.com?subject=ORI%20TAC%20OPS%20controlled%20pilot">
              Discuss a controlled pilot <ArrowRight size={16} />
            </a>
            <a className={styles.secondary} href="/field-notes/ori-tac-ops-oisa-beta-test">
              Read the full OISA case study
            </a>
          </div>
        </section>

        <footer className={styles.footer}>
          <div>
            <strong>Mason Perry</strong>
            <span>Founder, NULLWORKS · Operational Intelligence Systems Architect</span>
          </div>
          <p>Human authority remains final.</p>
        </footer>
      </div>
    </main>
  );
}
