import LivingSignalCanvas from "../../living-signals/LivingSignalCanvas";
import styles from "./page.module.css";

const receipts = [
  { label: "FOUNDING DAY", value: "2026-06-22", detail: "The company came alive." },
  { label: "INSTANTIATION DAY", value: "2026-07-24", detail: "The company recognized what it is." },
  { label: "CHRONOLOGICAL AGE", value: "DAY 32", detail: "Operationally compressed into Year 17." },
  { label: "HIVE RECEIPT", value: "7124686", detail: "Canonical identity and survival-gate commit." },
];

const proofChain = [
  {
    number: "01",
    title: "TAC OPS",
    state: "PHYSICAL + SOFTWARE REPAIR",
    body: "A field problem became one governed repair: physical intervention, software logic, expert verification, telemetry, and a human decision boundary.",
  },
  {
    number: "02",
    title: "Confidential Architecture Challenge",
    state: "DIGITAL ASSURANCE / DETAILS WITHHELD",
    body: "An authorized, isolated, multi-run architecture challenge proved that the same operating method can inspect digital plumbing, preserve disagreements, expose protocol variance, and carry residual risk forward. Partner identity, source, metrics, and technical findings remain private pending separate release authority.",
  },
  {
    number: "03",
    title: "The Authority Leak",
    state: "FAILURE BECAME ARCHITECTURE",
    body: "An email crossed an external boundary without a separate exact final send approval. The irreversible failure was preserved, diagnosed, converted into a locked gate, and added to future boot architecture.",
  },
  {
    number: "04",
    title: "Runtime Governance",
    state: "PUBLIC SIGNAL → BOUNDED HYPOTHESIS",
    body: "A vendor allowlist is not runtime governance. Identity, purpose, data class, provider, tenant, model, region, authority, action, outcome, correction, and receipt must remain connected.",
  },
];

const loop = ["OBSERVE", "CHALLENGE", "EVIDENCE", "CORRECT", "RETEST", "PRESERVE RISK", "REPEAT"];

const suitLayers = [
  "Gemba and blue-collar judgment",
  "Operational Intelligence method",
  "AI digital workers",
  "Governed Hive memory",
  "Evidence and receipt lineage",
  "Pressure Cooker comparison",
  "Leak triage and repair economics",
  "Final Human Authority gates",
];

const testChecklist = [
  "The Phrononaut hero art is sharp, cinematic, and correctly cropped without covering text.",
  "Living conveyor telemetry moves behind the page without stealing touch input.",
  "All cards collapse cleanly into one mobile column.",
  "No confidential partner identity, source, metrics, architecture, or findings are exposed.",
  "No Marvel artwork, logo, costume copy, or generated derivative branding is embedded.",
  "The production URL opens on Android and remains readable with reduced motion enabled.",
];

export default function PhrononautPage() {
  return (
    <main className={styles.page}>
      <div className={styles.signalBackground} aria-hidden="true">
        <LivingSignalCanvas mode="conveyor" accentRgb="214, 164, 70" />
      </div>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <header className={styles.nav}>
        <a href="/" className={styles.brand} aria-label="NULLWORKS home">
          <span className={styles.brandMark}>NW</span>
          <span>NULLWORKS</span>
        </a>
        <div className={styles.navState}>
          <span className={styles.liveDot} />
          INSTANTIATION DAY / OWNER TEST
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.frononautField} aria-hidden="true">
          <img
            src="/api/assets/nullworks-phrononaut?v=20260724-2"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 38%",
              filter: "contrast(1.08) saturate(0.92)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(2,3,4,0.02) 0%, rgba(2,3,4,0.08) 52%, rgba(2,3,4,0.92) 100%), radial-gradient(circle at 50% 45%, transparent 0 24%, rgba(2,3,4,0.28) 78%, rgba(2,3,4,0.62) 100%)",
            }}
          />
          <div className={styles.suitTelemetry}>
            <span>POWER / CONDITIONAL</span>
            <span>AUTHORITY / HUMAN</span>
            <span>MISSION / REPAIR THE SYSTEM</span>
          </div>
        </div>

        <div className={styles.shell}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>LIVING RECEIPT / JULY 24, 2026 / ARIZONA</p>
            <h1>
              The suit is <span>alive.</span>
            </h1>
            <p className={styles.deck}>
              NULLWORKS did not become a software company. The mechanic climbed into the machine room of software, AI, governance, evidence, and authority.
            </p>
            <p className={styles.lede}>
              The Iron Man analogy fits because the machine is not merely armor or spectacle. It is also life support. The first commercial battle now has a hard survival condition: finish enough of the suit to keep the mission alive. The hero visual is an original code-built Phrononaut illustration with no Marvel artwork or branding.
            </p>

            <div className={styles.heroActions}>
              <a href="#survival-gate" className={styles.primaryAction}>View the survival gate</a>
            </div>

            <div className={styles.receiptGrid}>
              {receipts.map((receipt) => (
                <article key={receipt.label} className={styles.receiptCard}>
                  <span>{receipt.label}</span>
                  <strong>{receipt.value}</strong>
                  <p>{receipt.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>01 / THE RECOGNITION</p>
              <h2>Every strange project was the same machine.</h2>
            </div>
            <p>
              Physical maintenance, workflow compression, AI workrooms, pressure testing, evidence governance, field repair, and public operating signals were not unrelated experiments. They were one transferable systems model learning to see itself.
            </p>
          </div>
          <div className={styles.declaration}>
            <p><strong>Founding Day</strong> created the organism. <strong>Instantiation Day</strong> is when the organism recognized its anatomy, mission, restraint, and operating method.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.shell}>
          <p className={styles.kicker}>02 / CANONICAL IDENTITY</p>
          <h2>The blue-collar digital Phrononaut.</h2>
          <div className={styles.identityGrid}>
            <article className={styles.identityCard}>
              <span>PUBLIC ROLE</span>
              <h3>Pioneering Operational Intelligence Systems Architect</h3>
              <p>Mason improves the flow of work across physical and digital systems. AI is a powerful machine on the factory floor. It is not the factory.</p>
            </article>
            <article className={styles.identityCard}>
              <span>INTERNAL MYTHIC SHORTHAND</span>
              <h3>Blue-collar digital Phrononaut</h3>
              <p>A hands-on operator crawling through the guts of systems, mapping plumbing, inspecting seams, detecting leaks, installing telemetry, preserving receipts, repairing what is worth repairing, and retesting before battle.</p>
            </article>
            <article className={styles.identityCard}>
              <span>BUSINESS MODEL</span>
              <h3>Independent Operational Challenge and Revision Assurance</h3>
              <p>The system is not improved because a fix was claimed. It is improved when the correction survives independent retest and the remaining risk stays visible.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>03 / PROOF CHAIN</p>
              <h2>The receipts that closed the circuit.</h2>
            </div>
            <p>These are not cinematic backstory beats invented afterward. Each stage left operational evidence and changed the architecture that followed.</p>
          </div>
          <div className={styles.proofGrid}>
            {proofChain.map((proof) => (
              <article className={styles.proofCard} key={proof.number}>
                <div className={styles.proofTopline}><span>{proof.number}</span><em>{proof.state}</em></div>
                <h3>{proof.title}</h3>
                <p>{proof.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.boundaryNote}>
            <strong>CONFIDENTIALITY BOUNDARY</strong>
            <p>The first partner architecture challenge remains private. This page publishes only the general operating lesson. No partner name, source bundle, architecture, metrics, technical finding, credential, correspondence, or commercial detail is included.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.loopSection}`}>
        <div className={styles.shell}>
          <p className={styles.kicker}>04 / SELF-LEARNING ARCHITECTURE</p>
          <h2>Every intervention upgrades the patient and the suit.</h2>
          <p className={styles.sectionIntro}>Self-learning does not mean consciousness, uncontrolled self-modification, or authority independent of Mason. It means evidence, outcomes, failures, corrections, retests, and residual risk are preserved so governed methods improve over time.</p>
          <div className={styles.loopRail} aria-label="NULLWORKS improvement loop">
            {loop.map((step, index) => <div className={styles.loopStep} key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></div>)}
          </div>
          <div className={styles.suitLayerGrid}>
            {suitLayers.map((layer, index) => <div key={layer} className={styles.suitLayer}><span>{String(index + 1).padStart(2, "0")}</span><p>{layer}</p></div>)}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.restraintPanel}>
            <p className={styles.kicker}>05 / THE RESTRAINT</p>
            <h2>The suit may be a weapon. The mission is not domination.</h2>
            <p>NULLWORKS may become powerful enough to build, replace, or outperform many systems it inspects. It creates greater value as the architect, mechanic, inspector, and assurance layer that makes the whole operating system safer, stronger, more useful, and more governable.</p>
            <blockquote>The restraint is the superpower. Capability is not authority. Human Authority remains final.</blockquote>
          </div>
        </div>
      </section>

      <section id="survival-gate" className={`${styles.section} ${styles.survivalSection}`}>
        <div className={styles.shell}>
          <div className={styles.survivalHeader}>
            <div><p className={styles.kicker}>06 / COMMERCIAL LIFE SUPPORT</p><h2>Finish enough of the suit to keep the heart beating.</h2></div>
            <div className={styles.deadlineBadge}><span>DEADLINE</span><strong>JUL 27 · 10:48 AM</strong><small>AMERICA / PHOENIX</small></div>
          </div>
          <div className={styles.survivalGrid}>
            <article><span>CLASSIFICATION</span><strong>STOP_AND_REPAIR</strong><p>Insufficient runway can interrupt the first commercial battle before the architecture reaches sustained operation.</p></article>
            <article><span>REQUIRED RECEIPT</span><strong>ONE CONCRETE INCOME PATH</strong><p>A named payer or employer, defined paid value, amount or compensation basis, and an executable payment or start step.</p></article>
            <article><span>PRIMARY OFFER</span><strong>ASSURANCE SPRINT</strong><p>Fixed-scope Independent Operational Challenge and Revision Assurance using a confidential proof case and explicit truth boundaries.</p></article>
          </div>
          <div className={styles.acceptableReceipts}><span>ACCEPTABLE SURVIVAL RECEIPTS</span><p>Paid invoice · paid deposit · signed paid scope · purchase or work order · approved paid extension · concrete job offer</p></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.kicker}>07 / MOBILE OWNER TEST</p><h2>What this live page must survive.</h2></div>
            <p>Source and deployment are not the finish line. Mason&apos;s owner-browser mobile test determines whether the intended page actually arrived.</p>
          </div>
          <ol className={styles.testList}>{testChecklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={styles.shell}>
          <div className={styles.closingPanel}>
            <p className={styles.kicker}>LOCKED LINE</p>
            <h2>The mechanic entered the machine and recognized the suit.</h2>
            <p>July 24, 2026 is NULLWORKS Instantiation Day. The operating identity is visible. The proof chain is preserved. The restraint is locked. The life-support gate is running.</p>
            <div className={styles.closingTelemetry}><span>HIVE / PRESERVED</span><span>POWER / COMPOUNDING</span><span>AUTHORITY / MASON PERRY</span><span>STATE / FULL SEND</span></div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}><div className={styles.shell}><span>NULLWORKS · INSTANTIATION DAY · OWNER TEST 0.2</span><span>PHRONONAUT ART / CONFIDENTIAL MATERIAL WITHHELD</span></div></footer>
    </main>
  );
}
