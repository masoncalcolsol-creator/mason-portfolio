import { nullworksMetadata } from "../lib/siteMetadata";
import styles from "../corporate.module.css";

export const metadata = nullworksMetadata({
  title: "Architecture",
  description:
    "Governed operational architecture for identity, authority, intent, policy, safe execution, telemetry, verification, provenance, and receipts. The public stack line is src/app, src/lib, and src/middleware.ts on nullworks.systems.",
  path: "/architecture",
  kicker: "NULLWORKS // ARCHITECTURE",
  accent: "#78e6d2",
});

const gates = [
  ["REQUEST", "What is being asked?"],
  ["IDENTITY", "Who or what is acting?"],
  ["AUTHORITY", "What are they allowed to do?"],
  ["INTENT", "What outcome is actually desired?"],
  ["POLICY", "What rules constrain the action?"],
  ["PLAN", "What bounded sequence will be attempted?"],
  ["SAFE EXECUTION", "What capabilities may be exposed?"],
  ["TELEMETRY", "What happened while it ran?"],
  ["VERIFICATION", "Did reality match the intended outcome?"],
  ["RECEIPT", "What evidence survives afterward?"],
];

const stackLine = [
  [
    "src/app",
    "Routes are doors",
    "Public surfaces live as routes in this application. A page may exist without entering corporate navigation or the sitemap. New work is a door, not a second website.",
  ],
  [
    "src/lib",
    "Shared truth",
    "Common metadata, helpers, and operating utilities stay here so audience-specific pages can change sequence without inventing a second set of facts.",
  ],
  [
    "src/middleware.ts",
    "Canonical host lock",
    "Production traffic that still hits a portfolio or Vercel alias is redirected to nullworks.systems. Preview URLs stay internal. The company front door is one host.",
  ],
];

export default function Page() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.nav}>
          <a className={styles.brand} href="/">
            NULLWORKS<span>ARCHITECTURE</span>
          </a>
          <div className={styles.links}>
            <a href="/products">Systems</a>
            <a href="/proof">Proof</a>
            <a href="/research">Research</a>
            <a href="/company">Company</a>
          </div>
        </nav>

        <section className={styles.compactHero}>
          <div className={styles.eyebrow}>Governed operational intelligence infrastructure</div>
          <h1 className={styles.title}>Architecture before autonomy.</h1>
          <p className={styles.lead}>
            UMBRA is the governed operational plane. PENUMBRA is the human-facing interface.
            Together they create a bounded place where humans, AI, applications, and authorized
            entities can interact without confusing capability with authority.
          </p>
        </section>

        <div className={styles.band}>
          UMBRA → GOVERNED OPERATIONS · PENUMBRA → HUMAN SUPERVISION · UMBRA NETWORK → FEDERATION
        </div>

        <section className={styles.section}>
          <div className={styles.two}>
            <div className={styles.panel}>
              <h3>UMBRA</h3>
              <p>
                Model-, agent-, device-, manufacturer-, and vendor-agnostic control architecture for
                identity, authority, intent, policy, execution, telemetry, verification, provenance,
                escalation, revocation, and receipts.
              </p>
            </div>
            <div className={styles.panel}>
              <h3>PENUMBRA</h3>
              <p>
                The human-facing layer that makes state, evidence, uncertainty, permissions, review,
                exceptions, and stop-the-line controls legible to the accountable person.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.kicker}>Domain instantiation</div>
            <h2 className={styles.h2}>The architecture stays. The operating world changes.</h2>
            <p className={styles.body}>
              NULLWORKS can apply the same governed architecture to different physical and digital
              domains without renaming the architecture for each project.
            </p>
          </div>
          <div className={styles.two}>
            <div className={styles.panel}>
              <h3>NOXWORKS</h3>
              <p>
                The NULLWORKS lunar instantiated prototype lab: the home for lunar systems,
                lunar prototypes, terrestrial analogs that directly serve lunar programs, and
                future Moon-instantiated operational experimentation.
              </p>
            </div>
            <div className={styles.panel}>
              <h3>PORTUS LUNARIS</h3>
              <p>
                The lunar spaceport program developed through NOXWORKS. PORTUS is the port-operations
                layer inside that program; UMBRA remains the underlying governed architecture and
                PENUMBRA remains the human supervisory interface.
              </p>
              <p><a className={styles.route} href="/portus-lunaris">Open PORTUS LUNARIS →</a></p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.kicker}>The public stack line</div>
            <h2 className={styles.h2}>One application. Many doors. One host.</h2>
            <p className={styles.body}>
              The presentation layer for NULLWORKS is this repository, not a family of landing sites.
              Corporate home stays at /. New surfaces are routes under src/app. Hive events record
              the decision. They are not the website.
            </p>
          </div>
          <div className={styles.grid}>
            {stackLine.map(([label, title, body]) => (
              <div className={styles.card} key={label}>
                <div className={styles.cardLabel}>{label}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.kicker}>The turnstile</div>
            <h2 className={styles.h2}>Capability does not equal permission.</h2>
          </div>
          <div className={styles.list}>
            {gates.map(([a, b]) => (
              <div className={styles.item} key={a}>
                <strong>{a}</strong>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.statement}>
            <strong>Future: UMBRA Network</strong>
            <p>
              A federation layer for independent organizations and architectures to communicate
              through common protocols for identity, authority, intent, constraints, capability
              exposure, execution, verification, and receipts without requiring a shared database,
              AI model, or software stack.
            </p>
          </div>
        </section>

        <footer className={styles.footer}>
          <a className={styles.route} href="/">
            ← NULLWORKS
          </a>
          <span>Human authority remains final. Public host: nullworks.systems</span>
        </footer>
      </div>
    </main>
  );
}
