import {
  ArrowRight,
  Boxes,
  BriefcaseBusiness,
  ExternalLink,
  Factory,
  FileSearch,
  Gauge,
  GitBranch,
  Github,
  Mail,
  Network,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Workflow,
} from "lucide-react";

const systems = [
  {
    title: "LenderFlow / LENA",
    tag: "Lending OI",
    body: "A human-reviewed lender-fit and workflow system built from direct broker discovery. Structures lender appetite, exceptions, freshness, source receipts, and missing information without making lending decisions.",
    href: "https://lf-lender-intake.vercel.app/",
    icon: BriefcaseBusiness,
  },
  {
    title: "LegalFlow LF2 / KONRAN",
    tag: "Evidence OI",
    body: "Source-linked evidence search, derivative records, timeline reconstruction, and human-expert authority for complex legal-document workflows.",
    href: "https://legalflow-lf2-beta.vercel.app/dashboard",
    icon: FileSearch,
  },
  {
    title: "PAPERGOBLIN",
    tag: "OCR + intake OI",
    body: "OCR intake, editable correction, validation, persistence, and reusable human-correction telemetry built as a functional prototype during an airline flight.",
    href: "https://ori-intake-papergoblin.vercel.app/",
    icon: ScanLine,
  },
  {
    title: "ANVIL / CUTSYNC",
    tag: "Production OI",
    body: "Structured creative intake, media workflows, reusable production packets, versioning, licensing boundaries, and human review for high-output creative work.",
    href: "https://anvil-custom-records.vercel.app/",
    icon: Sparkles,
  },
];

const services = [
  {
    title: "Personal OI SUITe",
    body: "One command layer for projects, agents, sources, decisions, unfinished work, commitments, and personal operating continuity.",
    icon: UserRoundCheck,
  },
  {
    title: "Team OI SUITe",
    body: "Visible ownership, scoped workrooms, AI-worker coordination, evidence, approval gates, continuity, and operating telemetry.",
    icon: Network,
  },
  {
    title: "Enterprise OI Control Layer",
    body: "AI and tool inventory, governance, permissions, cross-functional routing, source traceability, auditability, and measurable value.",
    icon: Factory,
  },
];

const loop = [
  ["Discover", "Sit with the expert and map the real workflow, exceptions, authority, evidence, delays, and informal knowledge."],
  ["Structure", "Define work cells, ownership, context boundaries, routing, sources, review gates, continuity, and telemetry."],
  ["Build", "Create the smallest useful dashboard, workflow, agent tools, data model, and human control surface."],
  ["Verify", "Run real cases, preserve failures, expose uncertainty, compare to sources, and keep final authority human."],
  ["Improve", "Measure cycle time, rework, errors, duplicate effort, recovered capacity, adoption, and business outcomes."],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4efe4] text-[#19170f]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(177,137,60,.15),transparent_35%),radial-gradient(circle_at_90%_18%,rgba(25,23,15,.08),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 pb-20 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-[24px] border border-[#cdbb93] bg-[#fffaf0]/92 px-4 py-4 shadow-[0_20px_70px_rgba(49,39,20,.10)] backdrop-blur sm:px-6">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8c6927] sm:text-xs">NULLWORKS</div>
            <div className="text-lg font-black tracking-[-0.03em] text-[#19170f]">Mason Perry</div>
          </div>
          <div className="flex gap-2">
            <a
              href="https://github.com/masoncalcolsol-creator"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-[#a98135] bg-[#fffaf0] px-4 py-3 text-sm font-black text-[#6f511f] no-underline sm:inline-flex"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="mailto:masoncalcolsol@gmail.com?subject=Operational%20Intelligence%20Systems%20Architecture"
              className="inline-flex items-center gap-2 rounded-full bg-[#19170f] px-4 py-3 text-sm font-black text-[#fffaf0] no-underline"
            >
              <Mail size={16} /> Contact
            </a>
          </div>
        </header>

        <section className="mt-5 overflow-hidden rounded-[34px] border border-[#cdbb93] bg-[#fffaf0] shadow-[0_34px_110px_rgba(49,39,20,.14)]">
          <div className="grid lg:grid-cols-[1.18fr_.82fr]">
            <div className="p-6 sm:p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b78b39]/35 bg-[#efe3ca] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#76551d]">
                <Workflow size={15} /> Operational Intelligence Systems Architect
              </div>

              <h1 className="mt-7 max-w-[820px] font-serif text-[48px] font-bold leading-[0.93] tracking-[-0.06em] sm:text-[72px] lg:text-[92px]">
                I build the company around the AI.
              </h1>

              <p className="mt-7 max-w-[780px] text-lg font-medium leading-relaxed text-[#5e5543] sm:text-xl">
                I help individuals and organizations turn disconnected AI tools, agents, expert knowledge, records, and workflows into a human-readable Operational Intelligence operating system.
              </p>

              <p className="mt-5 max-w-[780px] text-base leading-relaxed text-[#675d49] sm:text-lg">
                The goal is not another chatbot. It is visible ownership, scoped workrooms, source-linked decisions, authority boundaries, review gates, continuity, telemetry, and final human control.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/field-notes" className="inline-flex items-center gap-2 rounded-full bg-[#19170f] px-5 py-4 text-sm font-black text-[#fffaf0] no-underline">
                  Read the OI Field Notes <ArrowRight size={17} />
                </a>
                <a href="#systems" className="inline-flex items-center gap-2 rounded-full border border-[#a98135] bg-[#fffaf0] px-5 py-4 text-sm font-black text-[#6f511f] no-underline">
                  View working systems <Boxes size={17} />
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Proof value="Industrial" label="electronics, automation, logistics, OCR, controls, fault isolation" />
                <Proof value="Applied AI" label="workflow discovery, full-stack prototypes, human-in-loop systems" />
                <Proof value="OISA" label="orchestration, authority, continuity, telemetry, workflow compression" />
              </div>
            </div>

            <div className="border-t border-[#d7c8a8] bg-[#19170f] p-6 text-[#fffaf0] lg:border-l lg:border-t-0 lg:p-10">
              <div className="text-xs font-black uppercase tracking-[0.24em] text-[#d7b96f]">The operating thesis</div>
              <h2 className="mt-6 font-serif text-4xl font-bold leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                The AI engineer builds the worker. The OI architect builds the company.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#d8cfbd]">
                NULLWORKS evolved because a growing digital workforce exceeded one human&apos;s ability to mentally track ownership, context, duplication, handoffs, authority, failures, and unfinished work.
              </p>
              <blockquote className="mt-7 border-l-4 border-[#d7b96f] pl-5 font-serif text-2xl font-bold leading-tight text-[#fffaf0]">
                I did not organize the agents because they needed managers. I organized them because I did.
              </blockquote>
              <a
                href="/nullworks-company-structure-oisa.svg"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d7b96f] px-5 py-4 text-sm font-black text-[#19170f] no-underline"
              >
                View NULLWORKS structure <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="rounded-[28px] border border-[#cdbb93] bg-[#fffaf0] p-6 shadow-[0_18px_60px_rgba(49,39,20,.08)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#19170f] text-[#d7b96f]">
                  <Icon size={22} />
                </div>
                <h2 className="mt-6 text-2xl font-black tracking-[-0.04em]">{service.title}</h2>
                <p className="mb-0 mt-3 text-sm leading-relaxed text-[#675d49] sm:text-base">{service.body}</p>
              </article>
            );
          })}
        </section>

        <section id="systems" className="mt-10 scroll-mt-8">
          <div className="max-w-[820px]">
            <div className="text-xs font-black uppercase tracking-[0.24em] text-[#8c6927]">Selected systems</div>
            <h2 className="mt-3 font-serif text-4xl font-bold tracking-[-0.05em] sm:text-6xl">Operational problems converted into working software.</h2>
            <p className="mt-5 text-base leading-relaxed text-[#675d49] sm:text-lg">
              Functional prototypes and live betas used to validate workflows, reduce uncertainty, preserve human review, and give specialist teams a working frame to harden, secure, scale, polish, and operate.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {systems.map((system) => {
              const Icon = system.icon;
              return (
                <article key={system.title} className="rounded-[28px] border border-[#cdbb93] bg-[#fffaf0] p-6 shadow-[0_18px_60px_rgba(49,39,20,.08)] sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#19170f] text-[#d7b96f]">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8c6927]">{system.tag}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-[-0.04em] sm:text-3xl">{system.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#675d49] sm:text-base">{system.body}</p>
                  <a href={system.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#76551d] no-underline">
                    Open system <ExternalLink size={15} />
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[34px] border border-[#19170f] bg-[#19170f] text-[#fffaf0] shadow-[0_30px_100px_rgba(25,23,15,.24)]">
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="text-xs font-black uppercase tracking-[0.24em] text-[#d7b96f]">The OISA operating loop</div>
            <h2 className="mt-4 max-w-[850px] font-serif text-4xl font-bold tracking-[-0.05em] sm:text-6xl">Discover → Structure → Build → Verify → Improve</h2>

            <div className="mt-8 grid gap-4 lg:grid-cols-5">
              {loop.map(([title, body], index) => (
                <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-[#d7b96f]">0{index + 1}</div>
                  <h3 className="mt-3 text-xl font-black">{title}</h3>
                  <p className="mb-0 mt-3 text-sm leading-relaxed text-[#d8cfbd]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-[#cdbb93] bg-[#fffaf0] p-6 shadow-[0_20px_70px_rgba(49,39,20,.09)] sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#efe3ca] text-[#8c6927]">
              <ShieldCheck size={23} />
            </div>
            <h2 className="mt-6 font-serif text-4xl font-bold tracking-[-0.05em]">Human authority remains final.</h2>
            <p className="mt-5 text-base leading-relaxed text-[#675d49] sm:text-lg">
              AI may investigate, organize, retrieve, compare, draft, test, build, and recommend. Consequential action remains with the accountable expert. Sources, uncertainty, review status, permissions, and stop-the-line controls should be visible by design.
            </p>
          </div>

          <div className="rounded-[30px] border border-[#cdbb93] bg-[#efe3ca] p-6 shadow-[0_20px_70px_rgba(49,39,20,.09)] sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#19170f] text-[#d7b96f]">
              <Gauge size={23} />
            </div>
            <h2 className="mt-6 font-serif text-4xl font-bold tracking-[-0.05em]">Measure the mess before claiming the compression.</h2>
            <p className="mt-5 text-base leading-relaxed text-[#675d49] sm:text-lg">
              Start with one real workflow and a defensible baseline. Measure searching, waiting, retyping, duplication, errors, corrections, handoffs, and cycle time. Then build, test, and show what changed.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[34px] border border-[#cdbb93] bg-[#fffaf0] p-6 text-center shadow-[0_24px_80px_rgba(49,39,20,.11)] sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#19170f] text-[#d7b96f]">
            <GitBranch size={25} />
          </div>
          <h2 className="mx-auto mt-6 max-w-[850px] font-serif text-4xl font-bold tracking-[-0.05em] sm:text-6xl">
            Need a Toyota-style operating system for your AI workforce?
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-base leading-relaxed text-[#675d49] sm:text-lg">
            Give me one painful workflow, one willing expert, the sources needed to understand the work, and permission to measure reality honestly.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="mailto:masoncalcolsol@gmail.com?subject=OI%20Pilot%20Conversation" className="inline-flex items-center gap-2 rounded-full bg-[#19170f] px-5 py-4 text-sm font-black text-[#fffaf0] no-underline">
              Start an OI pilot <ArrowRight size={17} />
            </a>
            <a href="/field-notes/horse-cart-to-toyota" className="inline-flex items-center gap-2 rounded-full border border-[#a98135] bg-[#fffaf0] px-5 py-4 text-sm font-black text-[#6f511f] no-underline">
              Read the value model <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <footer className="mt-8 rounded-[24px] border border-[#cdbb93] bg-[#fffaf0]/88 px-5 py-5 text-sm leading-relaxed text-[#675d49] sm:px-7">
          <strong className="text-[#19170f]">Mason Perry</strong> — Founder, NULLWORKS · Operational Intelligence Systems Architect · Phoenix, Arizona
          <div className="mt-2 text-xs text-[#776c56]">Views are Mason&apos;s own. Public architecture only. No customer, employer, or USPS confidential information is included.</div>
        </footer>
      </div>
    </main>
  );
}

function Proof({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[20px] border border-[#d1c09c] bg-[#f3ead8] p-4">
      <div className="text-xl font-black tracking-[-0.04em] text-[#19170f]">{value}</div>
      <div className="mt-1 text-xs font-semibold leading-relaxed text-[#675d49]">{label}</div>
    </div>
  );
}
