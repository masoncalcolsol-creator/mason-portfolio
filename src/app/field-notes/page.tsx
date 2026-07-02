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

const progression = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Protect the expert",
    body: "Human authority first.",
  },
  {
    icon: Network,
    number: "02",
    title: "Organize the workforce",
    body: "Ownership, handoffs, continuity, and boundaries.",
  },
  {
    icon: Factory,
    number: "03",
    title: "Build the production system",
    body: "Horse cart to Toyota—without replacing the people who know the work.",
  },
];

export default function FieldNotesIndex() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080b10] text-[#f4ead8]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(173,132,65,.20),transparent_30%),radial-gradient(circle_at_85%_12%,rgba(67,86,111,.22),transparent_32%),linear-gradient(180deg,#090c11_0%,#0b0f15_45%,#080b10_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto w-full max-w-[1240px] px-4 pb-20 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-[26px] border border-[#d8b56a]/25 bg-[#0d1118]/88 px-4 py-4 shadow-[0_24px_90px_rgba(0,0,0,.32)] backdrop-blur-xl sm:px-6">
          <a href="/" className="flex min-w-0 items-center gap-3 no-underline">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#d8b56a]/40 bg-[#141922] shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_30px_rgba(0,0,0,.28)]">
              <span
                className="font-serif text-[20px] font-black tracking-[-0.18em] text-[#d8b56a]"
                style={{ textShadow: "0 1px 0 #fff3c5, 0 -1px 0 #6f5327, 0 4px 12px rgba(0,0,0,.55)" }}
              >
                NW
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase tracking-[0.34em] text-[#d8b56a] sm:text-xs">NULLWORKS</div>
              <div className="truncate text-sm font-semibold tracking-[0.02em] text-[#f4ead8] sm:text-base">Operational Intelligence Field Notes</div>
            </div>
          </a>

          <a
            href="mailto:masoncalcolsol@gmail.com?subject=OI%20Field%20Notes"
            className="shrink-0 rounded-full border border-[#d8b56a]/40 bg-[#d8b56a] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-[#0a0d12] no-underline shadow-[0_12px_35px_rgba(173,132,65,.22)] sm:px-5 sm:text-sm"
          >
            Contact Mason
          </a>
        </header>

        <section className="relative mt-5 overflow-hidden rounded-[38px] border border-[#d8b56a]/25 bg-[linear-gradient(135deg,rgba(18,23,32,.98),rgba(8,11,16,.98))] shadow-[0_42px_140px_rgba(0,0,0,.46)]">
          <div
            className="pointer-events-none absolute -right-8 -top-24 select-none font-serif text-[230px] font-black tracking-[-0.22em] text-white/[0.035] sm:text-[360px] lg:-right-16 lg:-top-40 lg:text-[520px]"
            style={{ textShadow: "1px 1px 0 rgba(255,255,255,.12), -1px -1px 0 rgba(0,0,0,.9), 0 24px 70px rgba(0,0,0,.55)" }}
            aria-hidden="true"
          >
            NW
          </div>

          <div className="relative grid lg:grid-cols-[1.18fr_.82fr]">
            <div className="p-7 sm:p-11 lg:p-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8b56a]/30 bg-[#d8b56a]/10 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#e3c77e]">
                <Sparkles size={14} /> Private briefing series
              </div>

              <h1 className="mt-8 max-w-[850px] font-serif text-[48px] font-semibold leading-[0.91] tracking-[-0.055em] text-[#f7efe2] sm:text-[76px] lg:text-[92px]">
                From AI Assistant to Operational Intelligence
              </h1>

              <p className="mt-8 max-w-[760px] text-base font-medium leading-[1.75] text-[#bdb5a8] sm:text-xl">
                A five-part continuity story about protecting the expert, organizing a digital workforce, building the operating layer around AI, defining the OISA role, and measuring workflow compression.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={OI_SERIES[0].href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#d8b56a] px-5 py-4 text-sm font-black text-[#090c11] no-underline shadow-[0_18px_50px_rgba(173,132,65,.24)] transition-transform hover:-translate-y-0.5"
                >
                  Begin Field Note 01 <ArrowRight size={17} />
                </a>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#857b6c]">Five notes · one operating thesis</div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.025] p-7 backdrop-blur lg:border-l lg:border-t-0 lg:p-11">
              <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#d8b56a]">The progression</div>
              <div className="mt-8 space-y-7">
                {progression.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.number} className="group grid grid-cols-[42px_1fr] gap-4">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#d8b56a]/35 bg-[#d8b56a]/8 text-[#d8b56a] shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
                        <Icon size={17} />
                      </div>
                      <div className="border-b border-white/10 pb-7 last:border-b-0">
                        <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#7f7465]">Step {item.number}</div>
                        <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[#f4ead8]">{item.title}</h2>
                        <p className="mb-0 mt-2 text-sm leading-relaxed text-[#aaa194]">{item.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d8b56a]">The collection</div>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.04em] text-[#f4ead8] sm:text-4xl">Five field notes. One operating system.</h2>
            </div>
            <div className="hidden text-xs uppercase tracking-[0.18em] text-[#756d62] sm:block">NULLWORKS · July 2026</div>
          </div>

          <div className="grid gap-4">
            {OI_SERIES.map((item, index) => (
              <a
                key={item.number}
                href={item.href}
                className="group relative grid gap-5 overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(20,25,34,.94),rgba(11,14,20,.98))] p-6 text-[#f4ead8] no-underline shadow-[0_20px_70px_rgba(0,0,0,.26)] transition-all hover:-translate-y-0.5 hover:border-[#d8b56a]/45 hover:shadow-[0_26px_90px_rgba(0,0,0,.38)] sm:grid-cols-[92px_1fr_auto] sm:items-center sm:p-8"
              >
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-[#d8b56a]/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="font-serif text-5xl font-semibold tracking-[-0.08em] text-[#d8b56a]/85">{String(item.number).padStart(2, "0")}</div>
                <div>
                  <h3 className="m-0 text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#f6eee1] sm:text-3xl">{item.title}</h3>
                  <p className="mb-0 mt-3 max-w-[780px] text-sm leading-[1.7] text-[#a9a094] sm:text-base">{summaries[index]}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8b56a]/35 bg-[#d8b56a]/10 text-[#d8b56a] transition-transform group-hover:translate-x-1">
                  <ArrowRight size={19} />
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/[0.035] px-5 py-5 text-sm text-[#8f877b] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div><strong className="text-[#e6d9c6]">Mason Perry</strong> — Founder, NULLWORKS · Operational Intelligence Systems Architect</div>
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#d8b56a]">Compress the mess. Amplify the expert.</div>
        </footer>
      </div>
    </main>
  );
}
