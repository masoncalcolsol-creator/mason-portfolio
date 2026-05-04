"use client";

import { useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowRight,
  Mail,
  Phone,
  ExternalLink,
  ScanLine,
  Trash2,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

const CONTACT_EMAIL = "Masoncalcolsol@gmail.com";
const CONTACT_PHONE = "9097257741";

const DEMO_LINKS = {
  checkmate: "https://checkmate-mvp.vercel.app/",
  trashpanda: "https://your-trash-panda-demo.vercel.app",
  github: "https://github.com/YOUR_GITHUB",
};

const companyCopy: Record<string, { title: string; subtitle: string; focus: string }> = {
  calcom: {
    title: "Built for Cal.com-style product thinking.",
    subtitle: "Scheduling is coordination. CHECKMATE, Trash Panda, and Glacier are coordination systems disguised as simple tools.",
    focus: "Workflow deletion, UX clarity, and real-world chaos handling.",
  },
  stripe: {
    title: "Built for payment-routing brains.",
    subtitle: "CHECKMATE starts as receipt splitting, but the real system is itemized payment coordination.",
    focus: "Consumer money movement, payment links, settlement flow, and trust.",
  },
  supabase: {
    title: "Built like a Supabase-native builder would think.",
    subtitle: "Fast MVPs, real persistence, public share links, row-level data models, and product loops.",
    focus: "Backend-first demos that users can actually try.",
  },
  vercel: {
    title: "Built for deploy-speed culture.",
    subtitle: "Portfolio, demos, QR flows, and shareable app experiences built to ship fast and iterate faster.",
    focus: "Frontend velocity, product polish, and live demo conversion.",
  },
};

function getCompany() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return (params.get("company") || "").toLowerCase();
}

export default function Page() {
  const company = getCompany();

  const profile = companyCopy[company] || {
    title: "I do not build apps. I replace broken systems.",
    subtitle:
      "Self-taught full-stack builder turning messy real-world workflows into usable software demos: receipts, documents, food crews, search, and data chaos.",
    focus: "AI-assisted product engineering, workflow design, and full-stack MVP execution.",
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://your-portfolio.vercel.app";

  const qrUrl = useMemo(() => currentUrl, [currentUrl]);

  return (
    <main className="min-h-screen bg-[#08090b] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,40,40,.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,.08),transparent_30%)]" />

      <section className="relative mx-auto max-w-7xl px-6 py-8 md:py-12">
        <nav className="flex items-center justify-between border border-white/10 bg-white/[.03] rounded-3xl px-5 py-4 backdrop-blur">
          <div>
            <div className="text-sm uppercase tracking-[0.35em] text-red-300">NULLWORKS // PORTFOLIO</div>
            <div className="text-xl font-black">Mason Perry</div>
          </div>

          <div className="hidden md:flex gap-3">
            <a className="btn ghost" href={`mailto:${CONTACT_EMAIL}`}>
              <Mail size={16} /> Email
            </a>
            <a className="btn ghost" href={`sms:${CONTACT_PHONE}`}>
              <Phone size={16} /> Text
            </a>
          </div>
        </nav>

        <div className="grid lg:grid-cols-[1.25fr_.75fr] gap-6 mt-8">
          <div className="card hero">
            <div className="pill">
              <Sparkles size={16} /> Built with AI, chaos, and unreasonable momentum
            </div>

            <h1>{profile.title}</h1>

            <p className="lead">{profile.subtitle}</p>

            <div className="focus-box">
              <span>Current focus</span>
              <strong>{profile.focus}</strong>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <a className="btn primary" href={DEMO_LINKS.checkmate} target="_blank">
                Try CHECKMATE <ArrowRight size={18} />
              </a>
              <a className="btn secondary" href="#projects">
                View product stack
              </a>
            </div>
          </div>

          <div className="card qr-card">
            <div className="qr-wrap">
              <QRCodeSVG value={qrUrl} size={220} bgColor="#ffffff" fgColor="#08090b" />
            </div>
            <h2>Scan the portfolio</h2>
            <p>
              Phone-friendly demo path. No signup. No corporate hostage situation.
            </p>
            <a className="btn primary full" href={DEMO_LINKS.checkmate} target="_blank">
              Launch demo <ExternalLink size={17} />
            </a>
          </div>
        </div>

        <section id="projects" className="grid md:grid-cols-3 gap-5 mt-6">
          <ProjectCard
            icon={<ScanLine />}
            title="CHECKMATE"
            tag="Live demo priority"
            body="Receipt scanner that turns OCR chaos into editable item bubbles, assigns people, calculates splits, and generates settlement-ready summaries."
            link={DEMO_LINKS.checkmate}
            cta="Try receipt demo"
          />

          <ProjectCard
            icon={<Trash2 />}
            title="TRASH PANDA"
            tag="Data rescue system"
            body="A legal/document chaos tool concept: upload messy PDFs, OCR everything, reorganize virtually, and turn dumpster-fire data into searchable structure."
            link={DEMO_LINKS.trashpanda}
            cta="View concept"
          />

          <ProjectCard
            icon={<BriefcaseBusiness />}
            title="POLYMORPHIC PORTFOLIO"
            tag="This page"
            body="Same builder, same proof, different lens per employer. Recruiters get a tailored landing page without needing a whole custom app per application."
            link={`${currentUrl.split("?")[0]}?company=calcom`}
            cta="See tailored version"
          />
        </section>

        <section className="card proof mt-6">
          <div>
            <h2>Why this is different</h2>
            <p>
              Most applicants show tutorials. I show working systems built around real-world friction:
              bad OCR, messy receipts, group payment behavior, chaotic documents, and human laziness.
              Beautiful little disaster engines. Recruiter-safe wording, obviously.
            </p>
          </div>

          <div className="proof-grid">
            <Stat value="3+" label="active MVP systems" />
            <Stat value="AI + Full Stack" label="build method" />
            <Stat value="QR-first" label="demo strategy" />
            <Stat value="Chaos → UI" label="core design pattern" />
          </div>
        </section>

        <section className="contact">
          <h2>Need someone who deletes broken workflows?</h2>
          <p>Summon Mason. Dramatic? Yes. Memorable? Also yes.</p>

          <div className="flex flex-wrap justify-center gap-3">
            <a className="btn primary" href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20Demo%20Follow-up`}>
              Summon by email <Mail size={17} />
            </a>
            <a className="btn secondary" href={`sms:${CONTACT_PHONE}`}>
              Summon by text <Phone size={17} />
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}

function ProjectCard({
  icon,
  title,
  tag,
  body,
  link,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  tag: string;
  body: string;
  link: string;
  cta: string;
}) {
  return (
    <article className="card project">
      <div className="project-top">
        <div className="icon">{icon}</div>
        <span>{tag}</span>
      </div>

      <h3>{title}</h3>
      <p>{body}</p>

      <a className="project-link" href={link} target="_blank">
        {cta} <ArrowRight size={16} />
      </a>
    </article>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}