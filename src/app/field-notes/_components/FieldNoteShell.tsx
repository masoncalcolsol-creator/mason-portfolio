import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Mail } from "lucide-react";

export type SeriesLink = {
  number: number;
  title: string;
  href: string;
};

export const OI_SERIES: SeriesLink[] = [
  {
    number: 1,
    title: "Let the Expert Expert",
    href: "/field-notes/let-the-expert-expert",
  },
  {
    number: 2,
    title: "When Your AI Assistant Becomes a Company",
    href: "/field-notes/when-ai-becomes-a-company",
  },
  {
    number: 3,
    title: "OI SUITe: The Operating System Around the AI",
    href: "/field-notes/oi-suite",
  },
  {
    number: 4,
    title: "The AI Engineer Builds the Worker. The OI Architect Builds the Company.",
    href: "/field-notes/the-oi-architect",
  },
  {
    number: 5,
    title: "Horse Cart to Toyota: What Workflow Compression Is Worth",
    href: "/field-notes/horse-cart-to-toyota",
  },
];

export function FieldNoteShell({
  number,
  eyebrow,
  title,
  deck,
  children,
  source,
}: {
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
    <main className="min-h-screen bg-[#f4efe4] text-[#19170f]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(177,137,60,.14),transparent_35%),radial-gradient(circle_at_88%_18%,rgba(25,23,15,.08),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 pb-20 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-[24px] border border-[#cdbb93] bg-[#fffaf0]/92 px-4 py-4 shadow-[0_20px_70px_rgba(49,39,20,.10)] backdrop-blur sm:px-6">
          <a href="/field-notes" className="min-w-0 no-underline">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8c6927] sm:text-xs">
              NULLWORKS // OI FIELD NOTES
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
          <div className="p-6 sm:p-10 lg:p-14">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b78b39]/35 bg-[#efe3ca] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#76551d]">
                Field Note {String(number).padStart(2, "0")} of 05
              </div>
              <div className="flex gap-2" aria-label={`Field note ${number} of 5`}>
                {OI_SERIES.map((item) => (
                  <span
                    key={item.number}
                    className={`h-1.5 w-8 rounded-full ${item.number <= number ? "bg-[#9a742d]" : "bg-[#ddd0b3]"}`}
                  />
                ))}
              </div>
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.26em] text-[#8c6927]">{eyebrow}</p>
            <h1 className="mt-4 max-w-[1000px] font-serif text-[44px] font-bold leading-[0.96] tracking-[-0.055em] text-[#19170f] sm:text-[66px] lg:text-[82px]">
              {title}
            </h1>
            <p className="mt-7 max-w-[820px] text-lg font-medium leading-relaxed text-[#5e5543] sm:text-xl">{deck}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#6d624d]">
              <strong className="text-[#19170f]">Mason Perry</strong>
              <span>Founder, NULLWORKS</span>
              <span>Operational Intelligence Systems Architect</span>
              <span>July 2026</span>
            </div>

            {source ? (
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#a98135] bg-[#fffaf0] px-4 py-3 text-sm font-black text-[#6f511f] no-underline"
              >
                {source.label} <ExternalLink size={15} />
              </a>
            ) : null}
          </div>
        </section>

        <article className="mx-auto mt-10 max-w-[900px]">{children}</article>

        <section className="mt-14 grid gap-4 sm:grid-cols-2">
          {previous ? (
            <a
              href={previous.href}
              className="rounded-[26px] border border-[#cdbb93] bg-[#fffaf0] p-6 text-[#19170f] no-underline shadow-[0_20px_65px_rgba(49,39,20,.09)]"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#8c6927]">
                <ArrowLeft size={15} /> Previous
              </div>
              <div className="mt-3 text-xl font-black leading-tight tracking-[-0.03em]">{previous.title}</div>
            </a>
          ) : (
            <div />
          )}

          {next ? (
            <a
              href={next.href}
              className="rounded-[26px] border border-[#19170f] bg-[#19170f] p-6 text-[#fffaf0] no-underline shadow-[0_24px_75px_rgba(25,23,15,.22)]"
            >
              <div className="flex items-center justify-end gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#d7b96f]">
                Next field note <ArrowRight size={15} />
              </div>
              <div className="mt-3 text-right text-xl font-black leading-tight tracking-[-0.03em]">{next.title}</div>
            </a>
          ) : (
            <a
              href="mailto:masoncalcolsol@gmail.com?subject=OI%20Pilot%20Conversation"
              className="rounded-[26px] border border-[#19170f] bg-[#19170f] p-6 text-[#fffaf0] no-underline shadow-[0_24px_75px_rgba(25,23,15,.22)]"
            >
              <div className="flex items-center justify-end gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#d7b96f]">
                Start a pilot <ArrowRight size={15} />
              </div>
              <div className="mt-3 text-right text-xl font-black leading-tight tracking-[-0.03em]">
                Map the workflow. Measure the waste. Install the operating layer.
              </div>
            </a>
          )}
        </section>

        <footer className="mt-8 rounded-[24px] border border-[#cdbb93] bg-[#fffaf0]/88 px-5 py-5 text-sm leading-relaxed text-[#675d49] sm:px-7">
          <strong className="text-[#19170f]">NULLWORKS</strong> — Compress the mess. Amplify the expert.
          <div className="mt-2 text-xs text-[#776c56]">
            Views are Mason&apos;s own. Public architecture only. No customer, employer, or USPS confidential information is included.
          </div>
        </footer>
      </div>
    </main>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="text-2xl font-semibold leading-[1.45] tracking-[-0.025em] text-[#29251b] sm:text-3xl">{children}</p>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[17px] leading-[1.82] text-[#514936] sm:text-lg">{children}</p>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-14 font-serif text-4xl font-bold tracking-[-0.045em] text-[#19170f] sm:text-5xl">{children}</h2>;
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-10 border-l-4 border-[#a98135] bg-[#ede3cd] px-5 py-7 font-serif text-3xl font-bold leading-tight tracking-[-0.035em] text-[#241f15] sm:px-8 sm:text-4xl">
      {children}
    </blockquote>
  );
}

export function TruthBox({ title = "Truth boundary", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-9 rounded-[24px] border border-[#b9954a] bg-[#fffaf0] p-5 shadow-[0_18px_55px_rgba(49,39,20,.08)] sm:p-7">
      <div className="text-xs font-black uppercase tracking-[0.2em] text-[#8c6927]">{title}</div>
      <div className="mt-3 text-sm leading-relaxed text-[#5c533f] sm:text-base">{children}</div>
    </aside>
  );
}

export function BulletGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <section key={item.title} className="rounded-[24px] border border-[#cfbf9c] bg-[#fffaf0] p-5 shadow-[0_16px_50px_rgba(49,39,20,.08)]">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-[#8c6927]">{item.title}</div>
          <p className="mb-0 mt-3 text-sm leading-relaxed text-[#675d49] sm:text-base">{item.body}</p>
        </section>
      ))}
    </div>
  );
}
