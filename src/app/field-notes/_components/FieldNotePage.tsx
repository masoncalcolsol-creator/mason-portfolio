import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Factory,
  Mail,
} from "lucide-react";

export type FieldNoteSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
};

export type FieldNoteLink = {
  href: string;
  title: string;
  label: string;
};

export type SourceLink = {
  label: string;
  href: string;
};

export default function FieldNotePage({
  number,
  title,
  subtitle,
  thesis,
  date,
  sections,
  previous,
  next,
  sources = [],
  children,
}: {
  number: number;
  title: string;
  subtitle: string;
  thesis: string;
  date: string;
  sections: FieldNoteSection[];
  previous?: FieldNoteLink;
  next?: FieldNoteLink;
  sources?: SourceLink[];
  children?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f3eee2] text-[#19170f]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(175,135,57,.16),transparent_34%),radial-gradient(circle_at_92%_16%,rgba(25,23,15,.08),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-[1160px] px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-3 rounded-[24px] border border-[#cdbb93] bg-[#fffaf0]/95 px-4 py-4 shadow-[0_18px_70px_rgba(49,39,20,.10)] backdrop-blur sm:px-6">
          <a href="/field-notes" className="min-w-0 no-underline">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8c6927] sm:text-xs">
              NULLWORKS // FIELD NOTES
            </div>
            <div className="truncate text-lg font-black tracking-[-0.03em] text-[#19170f]">
              Operational Intelligence
            </div>
          </a>
          <a
            href="mailto:masoncalcolsol@gmail.com?subject=NULLWORKS%20Operational%20Intelligence"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#19170f] px-4 py-3 text-sm font-black text-[#fffaf0] no-underline"
          >
            <Mail size={16} />
            <span className="hidden sm:inline">Contact Mason</span>
            <span className="sm:hidden">Contact</span>
          </a>
        </header>

        <nav className="mt-4 grid grid-cols-5 gap-2" aria-label="Field note series progress">
          {[1, 2, 3, 4, 5].map((step) => (
            <a
              key={step}
              href={seriesHref(step)}
              aria-label={`Open Field Note ${step}`}
              className={`h-2 rounded-full ${step === number ? "bg-[#19170f]" : step < number ? "bg-[#a98135]" : "bg-[#d8c8a6]"}`}
            />
          ))}
        </nav>

        <section className="mt-4 overflow-hidden rounded-[32px] border border-[#cdbb93] bg-[#fffaf0] shadow-[0_34px_110px_rgba(49,39,20,.14)]">
          <div className="grid lg:grid-cols-[1.2fr_.8fr]">
            <div className="p-6 sm:p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b78b39]/35 bg-[#efe3ca] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#76551d]">
                <BookOpen size={15} /> Field Note {String(number).padStart(3, "0")}
              </div>
              <h1 className="mt-7 max-w-[800px] font-serif text-[44px] font-bold leading-[0.94] tracking-[-0.055em] text-[#19170f] sm:text-[66px] lg:text-[82px]">
                {title}
              </h1>
              <p className="mt-6 max-w-[760px] text-lg font-semibold leading-relaxed text-[#5b5240] sm:text-xl">
                {subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#d8c8a6] pt-5 text-sm text-[#6d624d]">
                <span className="font-black text-[#19170f]">Mason Perry</span>
                <span>Founder, NULLWORKS</span>
                <span>Operational Intelligence Systems Architect</span>
                <span>{date}</span>
              </div>
            </div>

            <aside className="border-t border-[#d7c8a8] bg-[#19170f] p-6 text-[#fffaf0] lg:border-l lg:border-t-0 lg:p-10">
              <div className="text-xs font-black uppercase tracking-[0.24em] text-[#d7b96f]">Core thesis</div>
              <p className="mt-5 font-serif text-3xl font-bold leading-tight tracking-[-0.035em] text-[#fffaf0] sm:text-4xl">
                {thesis}
              </p>
              <div className="mt-7 rounded-[22px] border border-[#d7b96f]/30 bg-[#d7b96f]/10 p-5 text-sm leading-relaxed text-[#ded4c1]">
                AI is the tool. Operational Intelligence is the operating system. Human authority remains final.
              </div>
            </aside>
          </div>
        </section>

        <article className="mx-auto mt-10 max-w-[880px]">
          {sections.map((section) => (
            <section key={section.heading} className="mt-12 first:mt-0">
              <h2 className="font-serif text-4xl font-bold tracking-[-0.045em] text-[#19170f] sm:text-5xl">
                {section.heading}
              </h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-6 text-[17px] leading-[1.82] text-[#514936] sm:text-lg">
                  {paragraph}
                </p>
              ))}

              {section.quote ? (
                <blockquote className="my-9 border-l-4 border-[#a98135] bg-[#e9dfca] px-5 py-7 font-serif text-3xl font-bold leading-tight tracking-[-0.035em] text-[#241f15] sm:px-8 sm:text-4xl">
                  {section.quote}
                </blockquote>
              ) : null}

              {section.bullets ? (
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-3 rounded-[20px] border border-[#cfbf9c] bg-[#fffaf0] p-4 shadow-[0_14px_45px_rgba(49,39,20,.07)]">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-[#9a742c]" size={19} />
                      <p className="m-0 text-sm font-semibold leading-relaxed text-[#514936]">{bullet}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          {children}

          {sources.length ? (
            <section className="mt-12 rounded-[24px] border border-[#cfbf9c] bg-[#fffaf0] p-5 sm:p-7">
              <div className="text-xs font-black uppercase tracking-[0.22em] text-[#8c6927]">Source receipts</div>
              <div className="mt-4 space-y-3">
                {sources.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start justify-between gap-4 rounded-[16px] bg-[#f1e8d7] px-4 py-3 text-sm font-bold text-[#4e452f] no-underline"
                  >
                    <span>{source.label}</span>
                    <ExternalLink className="mt-0.5 shrink-0 text-[#8c6927]" size={16} />
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <section className="mt-14 grid gap-4 md:grid-cols-2">
          {previous ? (
            <a href={previous.href} className="rounded-[28px] border border-[#cdbb93] bg-[#fffaf0] p-6 text-[#19170f] no-underline shadow-[0_20px_70px_rgba(49,39,20,.09)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#8c6927]">
                <ArrowLeft size={15} /> {previous.label}
              </div>
              <div className="mt-3 font-serif text-3xl font-bold tracking-[-0.04em]">{previous.title}</div>
            </a>
          ) : (
            <a href="/field-notes" className="rounded-[28px] border border-[#cdbb93] bg-[#fffaf0] p-6 text-[#19170f] no-underline shadow-[0_20px_70px_rgba(49,39,20,.09)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#8c6927]">
                <ArrowLeft size={15} /> Series home
              </div>
              <div className="mt-3 font-serif text-3xl font-bold tracking-[-0.04em]">The NULLWORKS OI Field Notes</div>
            </a>
          )}

          {next ? (
            <a href={next.href} className="rounded-[28px] border border-[#19170f] bg-[#19170f] p-6 text-[#fffaf0] no-underline shadow-[0_24px_80px_rgba(25,23,15,.24)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#d7b96f]">
                {next.label} <ArrowRight size={15} />
              </div>
              <div className="mt-3 font-serif text-3xl font-bold tracking-[-0.04em]">{next.title}</div>
            </a>
          ) : (
            <a href="mailto:masoncalcolsol@gmail.com?subject=OI%20SUITe%20Discussion" className="rounded-[28px] border border-[#19170f] bg-[#19170f] p-6 text-[#fffaf0] no-underline shadow-[0_24px_80px_rgba(25,23,15,.24)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#d7b96f]">
                Start a pilot <ArrowRight size={15} />
              </div>
              <div className="mt-3 font-serif text-3xl font-bold tracking-[-0.04em]">Build the Toyota factory around your AI workforce.</div>
            </a>
          )}
        </section>

        <footer className="mt-8 rounded-[24px] border border-[#cdbb93] bg-[#fffaf0]/90 px-5 py-5 text-sm leading-relaxed text-[#675d49] sm:px-7">
          <div className="flex items-center gap-3">
            <Factory className="shrink-0 text-[#8c6927]" size={21} />
            <div>
              <strong className="text-[#19170f]">NULLWORKS</strong> — Compress the mess. Amplify the expert. Preserve human authority.
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function seriesHref(step: number) {
  const routes: Record<number, string> = {
    1: "/field-notes/let-the-expert-expert",
    2: "/field-notes/when-ai-becomes-a-company",
    3: "/field-notes/oi-suite",
    4: "/field-notes/the-oi-architect",
    5: "/field-notes/horse-cart-to-toyota",
  };
  return routes[step];
}
