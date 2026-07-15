import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NULLWORKS Operating Map | Role, Product, Work Cells, Receipts",
  description:
    "The canonical table of contents for NULLWORKS: OISA role, OI SUITe operating layer, deployed work cells, field receipts, research, and experiments.",
};

type MapItem = {
  title: string;
  href: string;
  label: string;
  body: string;
  external?: boolean;
};

const startHere: MapItem[] = [
  {
    title: "Operational Systems",
    href: "/operational-systems",
    label: "Commercial front door",
    body: "The real-world problem, Mason's operating method, industrial fit, and the bridge from physical systems to human-AI operations.",
  },
  {
    title: "Operational Intelligence Systems Architect",
    href: "/oisa-category",
    label: "The role",
    body: "The emerging professional function responsible for designing and governing the operating company around AI workers.",
  },
  {
    title: "OI SUITe",
    href: "/field-notes/oi-suite",
    label: "The product",
    body: "The model-agnostic operating layer connecting roles, evidence, authority, continuity, review, exceptions, recovery, and telemetry.",
  },
  {
    title: "AI Operating Model Audit",
    href: "/ai-audit",
    label: "The entry point",
    body: "A workflow-first diagnostic that determines whether the next move is a work-cell pilot, an operating correction, or less AI—not more.",
  },
  {
    title: "Public Portfolio",
    href: "/",
    label: "The founder map",
    body: "The complete public evidence surface for Mason Perry, NULLWORKS, the OISA thesis, and cross-domain systems work.",
  },
];

const fieldNotes: MapItem[] = [
  {
    title: "Operational Intelligence Field Notes",
    href: "/field-notes",
    label: "Series index",
    body: "The six-part doctrine explaining the progression from expert augmentation to a governed digital production system.",
  },
  {
    title: "Let the Expert Expert",
    href: "/field-notes/let-the-expert-expert",
    label: "Field Note 01",
    body: "Protect human judgment and remove the clerical friction that keeps experts from doing expert work.",
  },
  {
    title: "When Your AI Assistant Becomes a Company",
    href: "/field-notes/when-ai-becomes-a-company",
    label: "Field Note 02",
    body: "Why adding capable agents creates an organizational problem before it creates a model problem.",
  },
  {
    title: "OI SUITe",
    href: "/field-notes/oi-suite",
    label: "Field Note 03",
    body: "The human-readable operating system around the AI Operator and specialist digital workforce.",
  },
  {
    title: "The OI Architect",
    href: "/field-notes/the-oi-architect",
    label: "Field Note 04",
    body: "Why software, AI, workflow, governance, evidence, and human authority require one whole-system owner.",
  },
  {
    title: "Horse Cart to Toyota",
    href: "/field-notes/horse-cart-to-toyota",
    label: "Field Note 05",
    body: "Workflow compression, recovered capacity, and the difference between adding a faster tool and changing the operating system.",
  },
  {
    title: "Da Vinci or Toyota?",
    href: "/field-notes/da-vinci-vs-toyota",
    label: "Field Note 06",
    body: "The strategic choice between one overloaded generalist and a coordinated company of bounded specialists.",
  },
];

const workCells: MapItem[] = [
  {
    title: "ORI TAC OPS",
    href: "/tac-ops",
    label: "Physical operations",
    body: "Damaged-label recovery with OCR, human verification, helper-label output, re-entry into automated flow, and exception telemetry.",
  },
  {
    title: "LINKED-OUT",
    href: "/linked-out",
    label: "Hiring-system field thesis",
    body: "A receipt-backed investigation of nonlinear candidates, AI screening, missing whole-path ownership, and the edge case rejected by the filter.",
  },
  {
    title: "NULLWORKS AIRLIFT",
    href: "/airlift",
    label: "Talent evidence",
    body: "A candidate-controlled evidence environment for capability that cannot be represented by a conventional resume alone.",
  },
  {
    title: "Voice Foundry",
    href: "/voice-foundry",
    label: "Voice and continuity",
    body: "Original audio, corrected transcripts, vocabulary, decisions, and transferable human context preserved as connected records.",
  },
  {
    title: "LenderFlow / LENA",
    href: "https://lf-lender-intake.vercel.app/",
    label: "External work cell",
    body: "Human-reviewed intake, lender-fit reasoning, source receipts, exception handling, and MISMO-oriented workflow compression.",
    external: true,
  },
  {
    title: "LegalFlow LF2 / KONRAN",
    href: "https://legalflow-lf2-beta.vercel.app/dashboard",
    label: "External work cell",
    body: "Source-linked evidence search, chronology reconstruction, uncertainty separation, and human-expert authority over derivative records.",
    external: true,
  },
  {
    title: "PAPERGOBLIN",
    href: "https://ori-intake-papergoblin.vercel.app/",
    label: "External work cell",
    body: "Messy OCR and intake converted into editable corrections, structured packets, persistence, and reusable feedback telemetry.",
    external: true,
  },
  {
    title: "ANVIL / CUTSYNC",
    href: "https://anvil-custom-records.vercel.app/",
    label: "External work cell",
    body: "Creative production organized through canon, direction, reusable packets, versioning, review, and licensing boundaries.",
    external: true,
  },
];

const research: MapItem[] = [
  {
    title: "Model-Agnostic Transplant",
    href: "/model-agnostic-transplant",
    label: "Continuity experiment",
    body: "Tests whether governed organizational identity and operating doctrine survive movement across model providers and local workrooms.",
  },
  {
    title: "The Lost Why",
    href: "/the-lost-why",
    label: "OI Benchmark 001",
    body: "A field paper on the difference between transferring information and preserving identity, mission, chronology, and local purpose.",
  },
  {
    title: "Operational Wisdom Mining",
    href: "/wisdom-mining",
    label: "Research lane",
    body: "Preserving the original human story while structuring signals, decisions, rationale, exceptions, outcomes, and reusable lessons.",
  },
  {
    title: "Mr. Sloth",
    href: "/mr-sloth",
    label: "Forward-deployed observer",
    body: "An educational mascot experiment for preserving accidents, weak signals, workarounds, context, and Human Authority before promotion.",
  },
  {
    title: "NULLWORKS Company Structure",
    href: "/nullworks-company-structure-oisa.svg",
    label: "Digital factory map",
    body: "Mason as final Human Authority, executive functions, specialist cells, review gates, telemetry, and client boundaries in one visual.",
    external: true,
  },
];

function Card({ item }: { item: MapItem }) {
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      className="card"
    >
      <span className="label">{item.label}</span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <span className="open">Open {item.external ? "public system ↗" : "page →"}</span>
    </a>
  );
}

function Section({ id, number, eyebrow, title, body, items }: { id: string; number: string; eyebrow: string; title: string; body: string; items: MapItem[] }) {
  return (
    <section id={id}>
      <div className="sectionHead">
        <div className="sectionNumber">{number}</div>
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
          <p className="sectionBody">{body}</p>
        </div>
      </div>
      <div className="grid">{items.map((item) => <Card item={item} key={`${item.href}-${item.title}`} />)}</div>
    </section>
  );
}

export default function OperatingMapPage() {
  return (
    <main>
      <style>{`
        :root{color-scheme:dark}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#05090d}
        main{min-height:100vh;color:#f5f1e8;background:radial-gradient(circle at 8% 0%,rgba(255,83,16,.16),transparent 30rem),radial-gradient(circle at 92% 8%,rgba(214,159,62,.12),transparent 34rem),#05090d;font-family:Inter,Arial,sans-serif}
        .shell{width:min(1180px,calc(100% - 30px));margin:0 auto;padding-bottom:70px}
        nav{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 0;border-bottom:1px solid rgba(255,255,255,.12)}
        .brand{color:#fff;text-decoration:none;font-weight:950;letter-spacing:.1em}.brand span{color:#ff5b18}.navLinks{display:flex;gap:18px;flex-wrap:wrap}.navLinks a{color:#b8c4cb;text-decoration:none;font-size:13px;font-weight:800}
        header{padding:68px 0 50px}.heroLabel,.eyebrow{color:#ff6b22;font-size:11px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}
        h1{max-width:1000px;margin:18px 0 0;font-family:Georgia,serif;font-size:clamp(58px,9vw,112px);line-height:.86;letter-spacing:-.065em}
        .deck{max-width:900px;margin:26px 0 0;color:#c7c8c4;font-size:clamp(19px,2.4vw,28px);line-height:1.48}
        .stack{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:34px}.stack a{padding:19px;border:1px solid rgba(255,255,255,.15);border-radius:17px;color:#f8f4ec;text-decoration:none;background:rgba(255,255,255,.035)}.stack strong{display:block;color:#ff8a4e;font-size:13px;text-transform:uppercase;letter-spacing:.09em}.stack span{display:block;margin-top:7px;font-family:Georgia,serif;font-size:22px;line-height:1.1}
        .notice{margin-top:28px;padding:16px 18px;border-left:3px solid #d8a13d;background:rgba(216,161,61,.08);color:#c8c1b2;line-height:1.6;font-size:14px}
        section{padding:66px 0;border-top:1px solid rgba(255,255,255,.1)}.sectionHead{display:grid;grid-template-columns:80px 1fr;gap:20px;align-items:start}.sectionNumber{font-family:Georgia,serif;color:#d8a13d;font-size:54px;line-height:1}h2{max-width:880px;margin:10px 0 0;font-family:Georgia,serif;font-size:clamp(38px,5.5vw,66px);line-height:.96;letter-spacing:-.045em}.sectionBody{max-width:860px;color:#aeb8bd;font-size:17px;line-height:1.7}
        .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin-top:30px}.card{display:flex;flex-direction:column;min-height:250px;padding:23px;border:1px solid rgba(255,255,255,.13);border-radius:20px;color:inherit;text-decoration:none;background:linear-gradient(155deg,rgba(255,255,255,.048),rgba(255,255,255,.015));transition:.18s ease}.card:hover{transform:translateY(-3px);border-color:rgba(255,107,34,.58)}.label{color:#ff8041;font-size:10px;font-weight:950;letter-spacing:.14em;text-transform:uppercase}.card h3{margin:13px 0 0;font-family:Georgia,serif;font-size:27px;line-height:1.05}.card p{color:#aeb8bd;line-height:1.62}.open{margin-top:auto;padding-top:18px;color:#f0c47a;font-size:13px;font-weight:900}
        footer{display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;padding:38px 0 0;border-top:1px solid rgba(255,255,255,.1);color:#7f929e;font-size:13px}footer strong{color:#f4efe7}
        @media(max-width:850px){.stack,.grid{grid-template-columns:1fr 1fr}.sectionHead{grid-template-columns:1fr}.sectionNumber{font-size:38px}.navLinks{display:none}}
        @media(max-width:560px){.shell{width:min(100% - 22px,1180px)}header{padding-top:44px}.stack,.grid{grid-template-columns:1fr}.card{min-height:0}h1{font-size:58px}.deck{font-size:19px}section{padding:52px 0}}
      `}</style>
      <div className="shell">
        <nav>
          <a href="/" className="brand"><span>NW</span> NULLWORKS</a>
          <div className="navLinks">
            <a href="#start">Start here</a>
            <a href="#work-cells">Work cells</a>
            <a href="#research">Research</a>
            <a href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Operating%20Map">Contact Mason</a>
          </div>
        </nav>

        <header>
          <div className="heroLabel">Canonical public table of contents // July 2026</div>
          <h1>The operating company, organized.</h1>
          <p className="deck">OISA is the role. OI SUITe is the product. Work cells are the deployments. Receipts are the proof. This page connects the public system so a visitor can enter at the level they understand.</p>
          <div className="stack">
            <a href="/oisa-category"><strong>01 // Role</strong><span>OISA</span></a>
            <a href="/field-notes/oi-suite"><strong>02 // Product</strong><span>OI SUITe</span></a>
            <a href="#work-cells"><strong>03 // Deployment</strong><span>Work cells</span></a>
            <a href="#receipts"><strong>04 // Proof</strong><span>Receipts</span></a>
          </div>
          <div className="notice"><strong>Inventory boundary:</strong> This is the current public-facing page and system inventory. Redirect-only routes, private workrooms, source files, static image assets, and unpublished experiments are intentionally omitted.</div>
        </header>

        <Section id="start" number="01" eyebrow="Role, product, and entry point" title="Understand what NULLWORKS actually sells." body="Begin with the real-world problem, then move through the professional role, the operating framework, and the smallest diagnostic engagement." items={startHere} />
        <Section id="doctrine" number="02" eyebrow="Public operating doctrine" title="Read the system in sequence." body="The field-note series explains the underlying architecture without requiring the reader to understand every prototype first." items={fieldNotes} />
        <Section id="work-cells" number="03" eyebrow="Deployed and prototype systems" title="The applications are proof vehicles." body="Each work cell applies the same architecture to a different domain: messy input, evidence, authority, human review, exception handling, recovery, and measurable output." items={workCells} />
        <Section id="receipts" number="04" eyebrow="Research, continuity, and field evidence" title="The factory learns from every experiment." body="These pages preserve the category research, model-agnostic continuity work, wisdom-mining lane, and public organizational structure behind the visible applications." items={research} />

        <footer>
          <div><strong>NULLWORKS</strong> — Building the operating company around AI workers.</div>
          <div>Founder: Mason Perry · Operational Intelligence Systems Architect · Human Authority remains final.</div>
        </footer>
      </div>
    </main>
  );
}
