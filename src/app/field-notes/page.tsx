import type { Metadata } from "next";
import { ArrowRight, Factory, Network, ShieldCheck, Sparkles } from "lucide-react";
import { OI_SERIES } from "./_components/FieldNoteShell";

export const metadata: Metadata = {
  title: "NULLWORKS OI Field Notes | Mason Perry",
  description:
    "A five-part field-note series on human-centered AI, multi-agent orchestration, Operational Intelligence Systems Architecture, and workflow compression.",
};

const summaries = [
  "Why AI should increase the capacity of willing experts instead of hiding, bypassing, or replacing their judgment.",
  "What changes when one assistant becomes a digital workforce and coordination becomes the limiting factor.",
  "The human-readable operating layer connecting agents, tools, evidence, memory, authority, workrooms, and telemetry.",
  "Why organizations need a new systems role that operates across software, AI, workflow, governance, and human authority.",
  "How to move from fragmented AI use to Toyota-style production—and how to measure the value created.",
];

export default function FieldNotesIndex() {
  return (
    <main className="min-h-screen bg-[#f4efe4] text-[#19170f]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(177,137,60,.15),transparent_35%),radial-gradient(circle_at_90%_18%,rgba(25,23,15,.08),transparent_30%)]" />
      <div className="relative mx-auto w-full max-w-[1180px] px-4 pb-20 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-[24px] border border-[#cdbb93] bg-[#fffaf0]/92 px-4 py-4 shadow-[0_20px_70px_rgba(49,39,20,.10)] backdrop-blur sm:px-6">
          <a href="/" className="no-underline">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8c6927] sm:text-xs">NULLWORKS</div>
            <div className="text-lg font-black tracking-[-0.03em] text-[#19170f]">Operational Intelligence Field Notes</div>
          </a>
          <a href="mailto:masoncalcolsol@gmail.com?subject=OI%20Field%20Notes" className="rounded-full bg-[#19170f] px-4 py-3 text-sm font-black text-[#fffaf0] no-underline">
            Contact Mason
          </a>
        </header>

        <section className="mt-5 overflow-hidden rounded-[34px] border border-[#cdbb93] bg-[#fffaf0] shadow-[0_34px_110px_rgba(49,39,20,.14)]">
          <div className="grid lg:grid-cols-[1.15fr_.85fr]">
            <div className="p-6 sm:p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b78b39]/35 bg-[#efe3ca] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#76551d]">
                <Sparkles size={15} /> Five-part series
              </div>
              <h1 className="mt-7 max-w-[800px] font-serif text-[48px] font-bold leading-[0.94] tracking-[-0.055em] sm:text-[72px] lg:text-[88px]">
                From AI Assistant to Operational Intelligence
              </h1>
              <p className="mt-7 max-w-[760px] text-lg font-medium leading-relaxed text-[#5e5543] sm:text-xl">
                A continuity story about protecting the expert, organizing a digital workforce, building the operating layer around AI, defining the OISA role, and measuring the value of workflow compression.
              </p>
              <a href={OI_SERIES[0].href} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#19170f] px-5 py-4 text-sm font-black text-[#fffaf0] no-underline">
                Start with Field Note 01 <ArrowRight size={17} />
              </a>
            </div>

            <div className="border-t border-[#d7c8a8] bg-[#19170f] p-6 text-[#fffaf0] lg:border-l lg:border-t-0 lg:p-10">
              <div className="text-xs font-black uppercase tracking-[0.24em] text-[#d7b96f]">The progression</div>
              <div className="mt-7 space-y-5">
                <Step icon={<ShieldCheck size={19} />} title="Protect the expert" body="Human authority first." />
                <Step icon={<Network size={19} />} title="Organize the workforce" body="Ownership, handoffs, continuity, and boundaries." />
                <Step icon={<Factory size={19} />} title="Build the production system" body="Horse cart to Toyota—without replacing the people who know the work." />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4">
          {OI_SERIES.map((item, index) => (
            <a
              key={item.number}
              href={item.href}
              className="group grid gap-4 rounded-[28px] border border-[#cdbb93] bg-[#fffaf0] p-5 text-[#19170f] no-underline shadow-[0_18px_60px_rgba(49,39,20,.08)] sm:grid-cols-[90px_1fr_auto] sm:items-center sm:p-7"
            >
              <div className="font-serif text-5xl font-bold text-[#a27a31]">{String(item.number).padStart(2, "0")}</div>
              <div>
                <h2 className="m-0 text-2xl font-black leading-tight tracking-[-0.035em] sm:text-3xl">{item.title}</h2>
                <p className="mb-0 mt-3 max-w-[760px] text-sm leading-relaxed text-[#675d49] sm:text-base">{summaries[index]}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#19170f] text-[#d7b96f] transition-transform group-hover:translate-x-1">
                <ArrowRight size={20} />
              </div>
            </a>
          ))}
        </section>

        <footer className="mt-8 rounded-[24px] border border-[#cdbb93] bg-[#fffaf0]/88 px-5 py-5 text-sm text-[#675d49] sm:px-7">
          <strong className="text-[#19170f]">Mason Perry</strong> — Founder, NULLWORKS · Operational Intelligence Systems Architect
        </footer>
      </div>
    </main>
  );
}

function Step({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-4 rounded-[22px] border border-white/10 bg-white/[0.045] p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d7b96f]/12 text-[#d7b96f]">{icon}</div>
      <div>
        <h3 className="m-0 text-lg font-black">{title}</h3>
        <p className="mb-0 mt-2 text-sm leading-relaxed text-[#d8cfbd]">{body}</p>
      </div>
    </div>
  );
}
