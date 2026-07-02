import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Factory,
  FileText,
  Gauge,
  GitBranch,
  Mail,
  Network,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "When Your AI Assistant Becomes a Company | NULLWORKS Field Notes",
  description:
    "Why a growing digital workforce needs visible ownership, boundaries, continuity, quality gates, telemetry, and final human authority.",
};

const questions = [
  "How are you assigning ownership across agents?",
  "How do you prevent duplicated work without forcing every specialist into one overloaded context?",
  "Where do decisions, failures, corrections, and unfinished work live?",
  "How do you know when an agent has exceeded its authority?",
  "Who owns the final output?",
  "At what scale does orchestration become a larger problem than model capability?",
];

const operatingPrinciples = [
  {
    icon: Boxes,
    title: "Specialization",
    body: "Use bounded specialists instead of asking one universal assistant to remember and perform everything.",
  },
  {
    icon: GitBranch,
    title: "Explicit routing",
    body: "Every request needs an owner, a destination, a current state, and a visible next action.",
  },
  {
    icon: FileText,
    title: "Source continuity",
    body: "Decisions should remain connected to evidence, corrections, unresolved questions, and prior failures.",
  },
  {
    icon: ShieldCheck,
    title: "Authority boundaries",
    body: "Agents may investigate, compare, draft, test, and recommend. The human authorizes consequential action.",
  },
  {
    icon: Gauge,
    title: "Telemetry",
    body: "Every completed action, correction, delay, and failure should improve the operating record.",
  },
  {
    icon: Factory,
    title: "Continuous improvement",
    body: "The goal is not more AI activity. It is less waste, shorter cycles, better handoffs, and stronger expert output.",
  },
];

export default function WhenAiBecomesACompanyPage() {
  return (
    <main className="min-h-screen bg-[#f4efe4] text-[#19170f]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(177,137,60,.14),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(25,23,15,.08),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 pb-24 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-[24px] border border-[#cdbb93] bg-[#fffaf0]/90 px-4 py-4 shadow-[0_20px_70px_rgba(49,39,20,.10)] backdrop-blur sm:px-6">
          <a href="/" className="min-w-0 no-underline">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8c6927] sm:text-xs">
              NULLWORKS // FIELD NOTES
            </div>
            <div className="truncate text-lg font-black tracking-[-0.03em] text-[#19170f]">
              Operational Intelligence
            </div>
          </a>
          <a
            href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Operational%20Intelligence"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#19170f] px-4 py-3 text-sm font-black text-[#fffaf0] no-underline shadow-[0_14px_34px_rgba(25,23,15,.22)]"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">Contact Mason</span>
            <span className="sm:hidden">Contact</span>
          </a>
        </header>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-[#cdbb93] bg-[#fffaf0] shadow-[0_34px_110px_rgba(49,39,20,.14)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_.85fr]">
            <div className="p-6 sm:p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b78b39]/35 bg-[#efe3ca] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#76551d]">
                <Sparkles size={15} /> Field Note 001
              </div>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.26em] text-[#8c6927]">
                Multi-agent orchestration // human control
              </p>

              <h1 className="mt-4 max-w-[760px] font-serif text-[46px] font-bold leading-[0.94] tracking-[-0.055em] text-[#19170f] sm:text-[68px] lg:text-[84px]">
                When Your AI Assistant Becomes a Company
              </h1>

              <p className="mt-7 max-w-[760px] text-lg font-medium leading-relaxed text-[#5e5543] sm:text-xl">
                The agents did not need an org chart. The human directing them needed a control system.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <ProofPill label="Hundreds" detail="of active and archived AI work threads" />
                <ProofPill label="Dozens" detail="of named specialist roles recovered so far" />
                <ProofPill label="One" detail="final human authority" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#article"
                  className="inline-flex items-center gap-2 rounded-full bg-[#19170f] px-5 py-3 text-sm font-black text-[#fffaf0] no-underline"
                >
                  Read the field note <ArrowDown size={16} />
                </a>
                <a
                  href="#structure"
                  className="inline-flex items-center gap-2 rounded-full border border-[#a98135] bg-[#fffaf0] px-5 py-3 text-sm font-black text-[#6f511f] no-underline"
                >
                  View the structure <Network size={16} />
                </a>
              </div>
            </div>

            <div className="border-t border-[#d7c8a8] bg-[#19170f] p-6 text-[#fffaf0] lg:border-l lg:border-t-0 lg:p-10">
              <div className="text-xs font-black uppercase tracking-[0.24em] text-[#d7b96f]">
                Two signals collided
              </div>

              <CatalystCard
                number="01"
                title="The public discussion"
                body="Hitesh shared an AI Tinkerers discussion on LinkedIn about harnessing AI. The question was not whether the tools are powerful. It was how humans should use that power intentionally."
              />

              <CatalystCard
                number="02"
                title="The operating receipt"
                body="Days later, USPS technology executive Gary C. Reblin replied to my TAC OPS strategy request: “This looks interesting,” and routed it for technical evaluation."
              />

              <div className="mt-5 rounded-[22px] border border-[#d7b96f]/35 bg-[#d7b96f]/10 p-5 text-sm leading-relaxed text-[#e9dfc8]">
                <strong className="text-[#fffaf0]">Truth boundary:</strong> TAC OPS remains an independent prototype concept, not an authorized or deployed USPS system. The receipt is that a human-centered AI strategy reached senior technical attention and was taken seriously.
              </div>
            </div>
          </div>
        </section>

        <section id="article" className="mx-auto mt-10 max-w-[900px] scroll-mt-8">
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#cdbb93] pb-5 text-sm text-[#6d624d]">
            <span className="font-black text-[#19170f]">Mason Perry</span>
            <span>Founder, NULLWORKS</span>
            <span>Operational Intelligence Systems Architect</span>
            <span>July 2, 2026</span>
          </div>

          <ArticleLead>
            A single chat window can find a cheesecake recipe, summarize a document, draft an email, or generate some code. That is useful. It is not an operating model.
          </ArticleLead>

          <ArticleParagraph>
            The model breaks when AI stops being an occasional assistant and becomes a digital workforce. Through NULLWORKS, I accumulated hundreds of active and archived work threads and a growing collection of specialized roles: research, implementation, continuity, quality review, security boundaries, public translation, artifact production, and project coordination.
          </ArticleParagraph>

          <ArticleParagraph>
            Individually, the specialists were useful. Collectively, they created a new problem: how does one human know who owns what, what has already been completed, which source is authoritative, where work was duplicated, what failed, and which decisions remain unresolved?
          </ArticleParagraph>

          <PullQuote>
            I did not organize the agents because they needed managers. I organized them because I did.
          </PullQuote>

          <ArticleHeading>The organization became the interface</ArticleHeading>

          <ArticleParagraph>
            NULLWORKS began developing executive, department, project, and specialist layers because the work exceeded my working memory. The titles were never intended to pretend that agents are people. They became compact human-readable handles for responsibility, authority, specialization, continuity, escalation, review, and handoff.
          </ArticleParagraph>

          <ArticleParagraph>
            Instead of asking one universal assistant to remember and perform everything, work could be routed through an operating structure. Operations could classify and assign incoming work. Quality could challenge assumptions and detect waste. Continuity could preserve decisions, failures, and unfinished work. Specialists could execute bounded tasks without silently becoming final decision-makers.
          </ArticleParagraph>

          <ArticleParagraph>
            The executive layer did not exist to control the agents for its own sake. It existed to protect the human operator from coordination collapse.
          </ArticleParagraph>
        </section>

        <section id="structure" className="mt-12 scroll-mt-8 rounded-[32px] border border-[#cdbb93] bg-[#fffaf0] p-4 shadow-[0_30px_100px_rgba(49,39,20,.12)] sm:p-8">
          <div className="mx-auto max-w-[900px] text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8c6927]">Public architecture view</p>
            <h2 className="mt-3 font-serif text-4xl font-bold tracking-[-0.045em] text-[#19170f] sm:text-5xl">
              The NULLWORKS Digital Workforce
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-base leading-relaxed text-[#675d49] sm:text-lg">
              A safe public flowchart showing ownership, boundaries, review, and telemetry without exposing internal prompts, routing logic, customer data, or proprietary packets.
            </p>
          </div>

          <div className="mt-7 overflow-hidden rounded-[24px] border border-[#d7c8a8] bg-[#efe7d7]">
            <img
              src="/nullworks-oi-company-structure.svg"
              alt="NULLWORKS digital workforce structure showing final human authority, boardroom control, operations, quality, continuity, project workrooms, specialist cells, review, action, telemetry, and learning."
              width={1080}
              height={1350}
              className="h-auto w-full"
            />
          </div>

          <a
            href="/nullworks-oi-company-structure.svg"
            target="_blank"
            rel="noreferrer"
            className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[#a98135] bg-[#fffaf0] px-5 py-3 text-sm font-black text-[#6f511f] no-underline"
          >
            Open full-size structure graphic <ArrowRight size={16} />
          </a>
        </section>

        <section className="mx-auto mt-12 max-w-[900px]">
          <ArticleHeading>A digital Toyota</ArticleHeading>

          <ArticleParagraph>
            The closest analogy is not a chatbot company. It is a Toyota-style production system. Toyota did not become exceptional by finding one worker capable of building the entire vehicle alone. It created visible work cells, standard handoffs, quality controls, feedback loops, clear ownership, and the authority to stop the line when something was wrong.
          </ArticleParagraph>

          <ArticleParagraph>
            A useful digital workforce needs similar properties. More agents without structure do not automatically create a smarter company. They can create faster chaos: duplicated research, missing work, authority drift, context contamination, and outputs that no one owns.
          </ArticleParagraph>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {operatingPrinciples.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[24px] border border-[#cfbf9c] bg-[#fffaf0] p-5 shadow-[0_16px_50px_rgba(49,39,20,.08)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#19170f] text-[#d7b96f]">
                    <Icon size={21} />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[#19170f]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#675d49]">{item.body}</p>
                </article>
              );
            })}
          </div>

          <ArticleHeading>Human authority remains final</ArticleHeading>

          <ArticleParagraph>
            NULLWORKS is built around one governing boundary: the digital workforce may investigate, organize, compare, draft, test, build, and recommend. The human retains final authority.
          </ArticleParagraph>

          <ArticleParagraph>
            That boundary matters most in physical systems, lending, legal evidence, safety, government, logistics, and other domains where fluent output is not the same as truth. A mature operating structure should make it visible who produced the work, what sources were used, what remains uncertain, who reviewed it, what action is authorized, and what happened afterward.
          </ArticleParagraph>

          <PullQuote>
            AI is the tool. Operational Intelligence is the connected operating system. Human authority remains final.
          </PullQuote>

          <ArticleHeading>The orchestration question</ArticleHeading>

          <ArticleParagraph>
            I did not begin by deliberately designing a multi-agent organization. I built useful specialists. Then I reached the point where organizing their work became necessary for my own mental capacity, continuity, and control.
          </ArticleParagraph>

          <ArticleParagraph>
            That raises a more useful industry question than “Which model is best?” Once the specialists multiply, coordination becomes the product.
          </ArticleParagraph>

          <div className="mt-7 space-y-3">
            {questions.map((question, index) => (
              <div key={question} className="flex gap-4 rounded-[20px] border border-[#cfbf9c] bg-[#fffaf0] p-4 sm:p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#efe3ca] text-sm font-black text-[#795a22]">
                  {index + 1}
                </div>
                <p className="m-0 self-center text-base font-bold leading-snug text-[#29251b]">{question}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-[32px] border border-[#19170f] bg-[#19170f] text-[#fffaf0] shadow-[0_34px_100px_rgba(25,23,15,.25)]">
          <div className="grid lg:grid-cols-[1fr_.8fr]">
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b96f]/35 bg-[#d7b96f]/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#d7b96f]">
                <CircleDot size={14} /> Next field note
              </div>
              <h2 className="mt-6 font-serif text-4xl font-bold tracking-[-0.05em] sm:text-6xl">
                OI SUITe: The Operating System Around the AI
              </h2>
              <p className="mt-5 max-w-[700px] text-base leading-relaxed text-[#d8cfbd] sm:text-lg">
                The next page will explain the architecture that connects the human, digital workers, workflow, evidence, authority, memory, quality controls, and telemetry into one understandable operating layer.
              </p>
            </div>

            <div className="border-t border-[#d7b96f]/25 bg-[#252118] p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div className="flex items-start gap-3">
                <UserRoundCheck className="mt-1 shrink-0 text-[#d7b96f]" size={24} />
                <div>
                  <p className="m-0 text-xs font-black uppercase tracking-[0.2em] text-[#d7b96f]">The emerging role</p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.03em]">Operational Intelligence Systems Architect</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#d8cfbd]">
                    The AI engineer can build a worker. The OI Systems Architect designs the human-readable company the workers operate inside.
                  </p>
                </div>
              </div>

              <a
                href="mailto:masoncalcolsol@gmail.com?subject=Operational%20Intelligence%20Systems%20Architecture"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d7b96f] px-5 py-4 text-sm font-black text-[#19170f] no-underline"
              >
                Compare orchestration notes <ChevronRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <footer className="mt-8 rounded-[24px] border border-[#cdbb93] bg-[#fffaf0]/85 px-5 py-5 text-sm leading-relaxed text-[#675d49] sm:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <strong className="text-[#19170f]">Mason Perry</strong> — Founder, NULLWORKS
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[#8c6927]">
                Compress the mess. Amplify the expert.
              </div>
            </div>
            <div className="text-xs text-[#776c56]">
              Views are Mason&apos;s own. Public architecture only. No customer, employer, or USPS confidential information is included.
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function ProofPill({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="rounded-[20px] border border-[#d1c09c] bg-[#f3ead8] p-4">
      <div className="text-2xl font-black tracking-[-0.04em] text-[#19170f]">{label}</div>
      <div className="mt-1 text-xs font-semibold leading-relaxed text-[#675d49]">{detail}</div>
    </div>
  );
}

function CatalystCard({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center gap-3">
        <span className="text-xs font-black tracking-[0.18em] text-[#d7b96f]">{number}</span>
        <CheckCircle2 size={17} className="text-[#d7b96f]" />
        <h3 className="m-0 text-base font-black tracking-[-0.02em] text-[#fffaf0]">{title}</h3>
      </div>
      <p className="mb-0 mt-3 text-sm leading-relaxed text-[#d8cfbd]">{body}</p>
    </div>
  );
}

function ArticleLead({ children }: { children: React.ReactNode }) {
  return <p className="text-2xl font-semibold leading-[1.45] tracking-[-0.025em] text-[#29251b] sm:text-3xl">{children}</p>;
}

function ArticleParagraph({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 text-[17px] leading-[1.82] text-[#514936] sm:text-lg">{children}</p>;
}

function ArticleHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 font-serif text-4xl font-bold tracking-[-0.045em] text-[#19170f] sm:text-5xl">
      {children}
    </h2>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-4 border-[#a98135] bg-[#ede3cd] px-5 py-7 font-serif text-3xl font-bold leading-tight tracking-[-0.035em] text-[#241f15] sm:px-8 sm:text-4xl">
      {children}
    </blockquote>
  );
}
