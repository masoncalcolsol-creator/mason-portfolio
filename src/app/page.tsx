"use client";

import { useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowRight,
  Mail,
  Phone,
  ExternalLink,
  ScanLine,
  BriefcaseBusiness,
  Sparkles,
  Music2,
  Mountain,
  FileSearch,
  ClipboardCheck,
  Radio,
} from "lucide-react";

const CONTACT_EMAIL = "Masoncalcolsol@gmail.com";
const CONTACT_PHONE = "9097257741";

const DEMO_LINKS = {
  checkmate: "https://checkmate-mvp.vercel.app/",
  anvilForge: "/anvil-song-forge",
  ircode: "/ircode",
};

const companyCopy: Record<string, { title: string; subtitle: string; focus: string }> = {
  calcom: {
    title: "I turn messy coordination into usable workflows.",
    subtitle:
      "CHECKMATE, CUTSYNC, PAPERGOBLIN, and TAC OPS are all coordination systems: raw human intent in, structured action out.",
    focus: "Scheduling-grade clarity, intake design, AI-assisted iteration, and operational UX.",
  },
  stripe: {
    title: "I build trust layers around messy money and messy humans.",
    subtitle:
      "CHECKMATE starts as receipt splitting, but the deeper product is itemized trust, structured settlement, and low-friction group payment behavior.",
    focus: "Consumer finance UX, itemized data, proof states, and payment-ready workflows.",
  },
  supabase: {
    title: "I build fast MVPs that create usable data trails.",
    subtitle:
      "My work turns intake, uploads, OCR, creative briefs, and field chaos into structured packets teams can actually use.",
    focus: "Backend-shaped product thinking, AI-assisted systems, and database-friendly user flows.",
  },
  vercel: {
    title: "I ship portfolio-grade product surfaces fast.",
    subtitle:
      "NULLWORKS ANVIL, CUTSYNC, CHECKMATE, and the IRCODE packet show the same pattern: live demos, fast iteration, clear user paths.",
    focus: "Frontend velocity, deployment discipline, product storytelling, and demo conversion.",
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
    title: "AI-assisted product builder turning chaos into shipped systems.",
    subtitle:
      "Founder/operator of NULLWORKS ANVIL and CUTSYNC. I build UX, OCR, creative-production, and operational-intelligence tools that convert messy human input into structured packets, usable interfaces, and finished assets.",
    focus:
      "AI-assisted product throughput: UX/UI, workflow automation, OCR, creative systems, and real-world ops software.",
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://mason-portfolio-phi.vercel.app";
  const qrUrl = useMemo(() => currentUrl, [currentUrl]);

  return (
    <main className="min-h-screen bg-[#08090b] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,72,0,.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,.08),transparent_32%)]" />

      <section className="relative mx-auto max-w-7xl px-6 py-8 md:py-12">
        <nav className="flex items-center justify-between border border-white/10 bg-white/[.03] rounded-3xl px-5 py-4 backdrop-blur">
          <div>
            <div className="text-sm uppercase tracking-[0.35em] text-orange-300">NULLWORKS // ANVIL // CUTSYNC</div>
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
              <Sparkles size={16} /> Transparent AI-assisted throughput, built in public
            </div>

            <h1>{profile.title}</h1>
            <p className="lead">{profile.subtitle}</p>

            <div className="focus-box">
              <span>Current focus</span>
              <strong>{profile.focus}</strong>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mt-8">
              <MiniProof value="NULLWORKS ANVIL" label="AI music, creator packets, and custom-record workflow" />
              <MiniProof value="CUTSYNC" label="30-sec reels, media briefs, and rapid creator content" />
              <MiniProof value="Ops + OCR" label="PAPERGOBLIN, TAC OPS, CHECKMATE, USPS field systems" />
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <a className="btn primary" href={DEMO_LINKS.anvilForge}>
                Try ANVIL Song Forge <ArrowRight size={18} />
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
              Mobile-friendly proof of AI-assisted product throughput: creative systems, OCR workflows, ops tools, and deployable demos.
            </p>
            <a className="btn primary full" href={DEMO_LINKS.anvilForge}>
              Launch ANVIL Forge <ExternalLink size={17} />
            </a>
          </div>
        </div>

        <section className="card proof mt-6">
          <div>
            <div className="pill"><Radio size={16} /> Active field + creative pilots</div>
            <h2>Not tutorial projects. Real workflows with real users.</h2>
            <p>
              NULLWORKS ANVIL and CUTSYNC are built around live creator, media, and operations problems: custom music briefs, short-form action sports edits, OCR cleanup, field documentation, and messy data rescue.
            </p>
          </div>

          <div className="proof-grid">
            <Stat value="BBMR" label="Media/social workflow relationship with Lee Stockwell, Director of Media for Big Bear Mountain Resort." />
            <Stat value="Pro DH" label="MTB race-content workflow direction for Clay Harper, founder/promoter of the Pro Downhill Series." />
            <Stat value="ANVIL" label="Custom record and reel-production system: human references in, production-ready AI packets out." />
            <Stat value="USPS Ops" label="OCR, equipment documentation, daily proof-of-work, and real-world maintenance intelligence." />
          </div>
        </section>

        <section id="projects" className="grid md:grid-cols-3 gap-5 mt-6">
          <ProjectCard
            icon={<Music2 />}
            title="NULLWORKS ANVIL / CUTSYNC"
            tag="Primary proof"
            body="AI-assisted creative production system for songs, reels, creator packets, and custom records. It lets users describe music like humans, then translates references into production-ready prompts."
            link={DEMO_LINKS.anvilForge}
            cta="Open song forge"
          />

          <ProjectCard
            icon={<Mountain />}
            title="Action Sports Media Workflows"
            tag="Active pilots"
            body="Creator and resort-friendly workflow thinking for BBMR and Pro Downhill Series style content: race hype, short-form edits, sponsor-safe music, captions, and fast turnaround."
            link={DEMO_LINKS.anvilForge}
            cta="See the workflow"
          />

          <ProjectCard
            icon={<ScanLine />}
            title="CHECKMATE"
            tag="Live demo"
            body="Receipt scanner that turns OCR chaos into editable item bubbles, assigns people, calculates splits, and generates settlement-ready summaries."
            link={DEMO_LINKS.checkmate}
            cta="Try receipt demo"
          />

          <ProjectCard
            icon={<FileSearch />}
            title="PAPERGOBLIN"
            tag="OCR + intake"
            body="Friendly messy-document system for turning forms, PDFs, screenshots, and field notes into structured packets a human operator can review and act on."
            link="#contact"
            cta="Discuss concept"
          />

          <ProjectCard
            icon={<ClipboardCheck />}
            title="TAC OPS / OCR Recovery"
            tag="Operational intelligence"
            body="Physical-world exception handling for misroutes, damaged labels, package evidence, scanner data, and proof-of-work recovery workflows."
            link="#contact"
            cta="View ops direction"
          />

          <ProjectCard
            icon={<BriefcaseBusiness />}
            title="Polymorphic Portfolio"
            tag="This page"
            body="Same builder, same proof, different lens per employer. Recruiters get tailored product storytelling without needing a whole new app per application."
            link={`${currentUrl.split("?")[0]}?company=vercel`}
            cta="See tailored version"
          />
        </section>

        <section className="card proof mt-6">
          <div>
            <h2>The working pattern</h2>
            <p>
              The throughline is simple: take messy human input, build the intake surface, structure the data, generate a useful packet, and make the next action obvious.
            </p>
          </div>

          <div className="proof-grid">
            <Stat value="Messy input" label="Voice notes, screenshots, receipts, media clips, package labels, client vibes" />
            <Stat value="Structured packet" label="Clear fields, outputs, prompts, QA notes, and next actions" />
            <Stat value="Human judgment" label="AI accelerates; Mason owns taste, product fit, and final delivery" />
            <Stat value="Fast rails" label="First railroad tracks quickly, then refine, harden, and scale" />
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>Need a high-output builder for product chaos?</h2>
          <p>Give me messy input, a real user problem, and permission to use modern tools transparently. I will turn it into a usable workflow fast.</p>

          <div className="flex flex-wrap justify-center gap-3">
            <a className="btn primary" href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20Demo%20Follow-up`}>
              Email Mason <Mail size={17} />
            </a>
            <a className="btn secondary" href={`sms:${CONTACT_PHONE}`}>
              Text Mason <Phone size={17} />
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}

function MiniProof({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat min-h-[120px]">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
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
  const external = link.startsWith("http");

  return (
    <article className="card project">
      <div className="project-top">
        <div className="icon">{icon}</div>
        <span>{tag}</span>
      </div>

      <h3>{title}</h3>
      <p>{body}</p>

      <a className="project-link" href={link} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
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
