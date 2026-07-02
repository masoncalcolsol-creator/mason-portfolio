import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Mail } from "lucide-react";

export type SeriesLink = { number: number; title: string; href: string };

export const OI_SERIES: SeriesLink[] = [
  { number: 1, title: "Let the Expert Expert", href: "/field-notes/let-the-expert-expert" },
  { number: 2, title: "When Your AI Assistant Becomes a Company", href: "/field-notes/when-ai-becomes-a-company" },
  { number: 3, title: "OI SUITe: The Operating System Around the AI", href: "/field-notes/oi-suite" },
  { number: 4, title: "The AI Engineer Builds the Worker. The OI Architect Builds the Company.", href: "/field-notes/the-oi-architect" },
  { number: 5, title: "Horse Cart to Toyota: What Workflow Compression Is Worth", href: "/field-notes/horse-cart-to-toyota" },
];

export function FieldNoteShell({ number, eyebrow, title, deck, children, source }: {
  number: number;
  eyebrow: string;
  title: string;
  deck: string;
  children: ReactNode;
  source?: { label: string; href: string };
}) {
  const currentIndex = OI_SERIES.findIndex((item) => item.number === number);
  const previous = currentIndex > 0 ? OI_SERIES[currentIndex - 1] : null;
  const next = currentIndex < OI_SERIES.length - 1 ? OI_SERIES[currentIndex + 1] : null;

  return (
    <main className="min-h-screen overflow-hidden bg-[#080b10] text-[#f4ead8]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(173,132,65,.18),transparent_30%),radial-gradient(circle_at_88%_15%,rgba(64,82,108,.20),transparent_32%),linear-gradient(180deg,#090c11_0%,#0b0f15_46%,#080b10_100%)]" />
      <div className="relative mx-auto w-full max-w-[1180px] px-4 pb-20 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-[26px] border border-[#d8b56a]/25 bg-[#0d1118]/90 px-4 py-4 shadow-[0_24px_90px_rgba(0,0,0,.32)] backdrop-blur-xl sm:px-6">
          <a href="/field-notes" className="flex min-w-0 items-center gap-3 no-underline">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#d8b56a]/40 bg-[#141922] shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_30px_rgba(0,0,0,.28)]">
              <span className="font-serif text-xl font-black tracking-[-0.18em] text-[#d8b56a]">NW</span>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase tracking-[0.32em] text-[#d8b56a] sm:text-xs">NULLWORKS // OI FIELD NOTES</div>
              <div className="truncate text-sm font-semibold text-[#f4ead8] sm:text-base">Operational Intelligence</div>
            </div>
          </a>
          <a href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Operational%20Intelligence" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#d8b56a] px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-[#090c11] no-underline sm:px-5 sm:text-sm">
            <Mail size={15} /><span className="hidden sm:inline">Contact Mason</span><span className="sm:hidden">Contact</span>
          </a>
        </header>

        <section className="relative mt-5 overflow-hidden rounded-[36px] border border-[#d8b56a]/25 bg-[linear-gradient(135deg,rgba(18,23,32,.98),rgba(8,11,16,.98))] shadow-[0_42px_140px_rgba(0,0,0,.46)]">
          <div className="pointer-events-none absolute -right-10 -top-28 select-none font-serif text-[250px] font-black tracking-[-0.22em] text-white/[0.035] sm:text-[420px]" aria-hidden="true">NW</div>
          <div className="relative p-7 sm:p-11 lg:p-16">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="rounded-full border border-[#d8b56a]/30 bg-[#d8b56a]/10 px-3 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#e3c77e]">Field Note {String(number).padStart(2, "0")} of 05</div>
              <div className="flex gap-2" aria-label={`Field note ${number} of 5`}>
                {OI_SERIES.map((item) => <span key={item.number} className={`h-1.5 rounded-full ${item.number === number ? "w-10 bg-[#d8b56a]" : item.number < number ? "w-6 bg-[#8d7040]" : "w-6 bg-white/10"}`} />)}
              </div>
            </div>
            <p className="mt-10 text-[11px] font-black uppercase tracking-[0.3em] text-[#d8b56a]">{eyebrow}</p>
            <h1 className="mt-5 max-w-[1030px] font-serif text-[44px] font-semibold leading-[0.93] tracking-[-0.055em] text-[#f7efe2] sm:text-[68px] lg:text-[84px]">{title}</h1>
            <p className="mt-8 max-w-[850px] text-base font-medium leading-[1.75] text-[#bdb5a8] sm:text-xl">{deck}</p>
            <div className="mt-9 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#81786d]">
              <strong className="text-[#e9ddca]">Mason Perry</strong><span>Founder, NULLWORKS</span><span>OISA</span><span>July 2026</span>
            </div>
            {source ? <a href={source.href} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#d8b56a]/35 bg-[#d8b56a]/8 px-4 py-3 text-sm font-black text-[#e3c77e] no-underline">{source.label} <ExternalLink size={15} /></a> : null}
          </div>
        </section>

        <article className="mx-auto mt-8 max-w-[960px] rounded-[34px] border border-[#d9c8a4] bg-[#f6f0e5] px-6 py-9 text-[#211e18] shadow-[0_34px_110px_rgba(0,0,0,.32)] sm:px-10 sm:py-12 lg:px-14 lg:py-16">{children}</article>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {previous ? <a href={previous.href} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-[#f4ead8] no-underline shadow-[0_20px_65px_rgba(0,0,0,.22)]"><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#d8b56a]"><ArrowLeft size={14} /> Previous</div><div className="mt-4 text-xl font-semibold leading-tight">{previous.title}</div></a> : <div />}
          {next ? <a href={next.href} className="rounded-[28px] border border-[#d8b56a]/35 bg-[linear-gradient(135deg,#1a1711,#0d1016)] p-6 text-[#f4ead8] no-underline shadow-[0_24px_75px_rgba(0,0,0,.30)]"><div className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#d8b56a]">Next field note <ArrowRight size={14} /></div><div className="mt-4 text-right text-xl font-semibold leading-tight">{next.title}</div></a> : <a href="mailto:masoncalcolsol@gmail.com?subject=OI%20Pilot%20Conversation" className="rounded-[28px] border border-[#d8b56a]/35 bg-[linear-gradient(135deg,#1a1711,#0d1016)] p-6 text-[#f4ead8] no-underline shadow-[0_24px_75px_rgba(0,0,0,.30)]"><div className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#d8b56a]">Start a pilot <ArrowRight size={14} /></div><div className="mt-4 text-right text-xl font-semibold leading-tight">Map the workflow. Measure the waste. Install the operating layer.</div></a>}
        </section>

        <footer className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.035] px-5 py-5 text-sm text-[#8f877b] sm:px-7"><strong className="text-[#e6d9c6]">NULLWORKS</strong> — Compress the mess. Amplify the expert.</footer>
      </div>
    </main>
  );
}

export function Lead({ children }: { children: ReactNode }) { return <p className="text-2xl font-semibold leading-[1.5] tracking-[-0.025em] text-[#252119] sm:text-3xl">{children}</p>; }
export function P({ children }: { children: ReactNode }) { return <p className="mt-6 text-[17px] leading-[1.86] text-[#514838] sm:text-lg">{children}</p>; }
export function H2({ children }: { children: ReactNode }) { return <h2 className="mt-14 font-serif text-4xl font-semibold tracking-[-0.045em] text-[#17140f] sm:text-5xl">{children}</h2>; }
export function Quote({ children }: { children: ReactNode }) { return <blockquote className="my-10 rounded-[24px] border border-[#c8a75c]/45 bg-[#11141a] px-6 py-8 font-serif text-3xl font-semibold leading-tight text-[#f1e7d7] shadow-[0_22px_65px_rgba(25,20,12,.20)] sm:px-9 sm:text-4xl"><div className="border-l-2 border-[#d8b56a] pl-5">{children}</div></blockquote>; }
export function TruthBox({ title = "Truth boundary", children }: { title?: string; children: ReactNode }) { return <aside className="my-9 rounded-[24px] border border-[#b9954a]/55 bg-[#eee3cf] p-5 shadow-[0_18px_55px_rgba(49,39,20,.10)] sm:p-7"><div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#7c5c24]">{title}</div><div className="mt-4 text-sm leading-relaxed text-[#514735] sm:text-base">{children}</div></aside>; }
export function BulletGrid({ items }: { items: { title: string; body: string }[] }) { return <div className="mt-7 grid gap-4 sm:grid-cols-2">{items.map((item) => <section key={item.title} className="rounded-[24px] border border-[#d1c09c] bg-[#fffaf1] p-5 shadow-[0_16px_50px_rgba(49,39,20,.08)]"><div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#7c5c24]">{item.title}</div><p className="mb-0 mt-4 text-sm leading-relaxed text-[#625845] sm:text-base">{item.body}</p></section>)}</div>; }
