"use client";

import {
  ChangeEvent,
  CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./studio.module.css";

type EvidenceClass =
  | "FACT"
  | "USER REPORTED"
  | "AI INFERENCE"
  | "METAPHOR"
  | "UNKNOWN"
  | string;

type PublicStat = {
  label: string;
  value: string;
  classification?: EvidenceClass;
};

type Receipt = {
  label: string;
  detail: string;
  classification: EvidenceClass;
};

type Card = {
  name: string;
  call_sign: string;
  current_role: string;
  archetype: string;
  strengths: string[];
  limitations: string[];
  signature_move: string;
  best_use_situation: string;
  likely_failure_mode: string;
  escalation_rule: string;
  scouting_report: string;
  visual_concept: string;
  public_stats: PublicStat[];
  evidence_receipts?: Receipt[];
  preferred_working_style?: string;
  underused_capability?: string;
  context_used?: string[];
  authority_boundary?: string;
  memory_boundary?: string;
  human_dependency?: string;
  uncertainty_statement?: string;
};

type CardData = {
  protocol_version: string;
  human_card: Card;
  ai_card: Card;
  telemetry: {
    provider: string;
    model: string;
    context_mode: string;
    ai_named: boolean;
    ai_name: string;
    named_by: string;
    relationship_frame: string;
    agent_count: string;
    relationship_age: string;
    source_precision: string;
    public_safety_review: string;
  };
};

type Profile = {
  humanName: string;
  headline: string;
  company: string;
  location: string;
  linkedinUrl: string;
  linkedinText: string;
  provider: string;
  model: string;
  aiName: string;
  namedBy: string;
  relationship: string;
  contextMode: string;
  agentCount: string;
  relationshipAge: string;
  headshot: string;
};

type ReviewState = {
  identity: boolean;
  privacy: boolean;
  copy: boolean;
  rights: boolean;
};

export const STUDIO_STORAGE_KEY = "nullworks.aiDoubleheader.cinematic.v1";

const COPY_LIMITS = {
  name: 32,
  call_sign: 20,
  current_role: 90,
  archetype: 44,
  signature_move: 108,
  stat_label: 16,
  stat_value: 18,
} as const;

const emptyProfile: Profile = {
  humanName: "",
  headline: "",
  company: "",
  location: "",
  linkedinUrl: "",
  linkedinText: "",
  provider: "ChatGPT",
  model: "",
  aiName: "",
  namedBy: "not-named",
  relationship: "Assistant",
  contextMode: "familiar",
  agentCount: "1",
  relationshipAge: "",
  headshot: "",
};

const emptyCard: Card = {
  name: "UNKNOWN",
  call_sign: "UNKNOWN",
  current_role: "UNKNOWN",
  archetype: "UNKNOWN",
  strengths: ["UNKNOWN", "UNKNOWN", "UNKNOWN"],
  limitations: ["UNKNOWN", "UNKNOWN"],
  signature_move: "UNKNOWN",
  best_use_situation: "UNKNOWN",
  likely_failure_mode: "UNKNOWN",
  escalation_rule: "Human review required.",
  scouting_report: "UNKNOWN",
  visual_concept: "UNKNOWN",
  public_stats: [],
};

const sampleData: CardData = {
  protocol_version: "AI_DOUBLEHEADER_V0.2",
  human_card: {
    ...emptyCard,
    name: "MASON PERRY",
    call_sign: "NULLMASTER",
    current_role: "Founder of NULLWORKS and Operational Intelligence Systems Architect",
    archetype: "Forward-Deployed Systems Operator",
    strengths: [
      "Finds hidden operating friction",
      "Turns field receipts into systems",
      "Builds the company around AI workers",
    ],
    limitations: [
      "Continuity load rises with project velocity",
      "Can outrun the surrounding workflow",
    ],
    signature_move: "Turns a field failure into a measurable operating system.",
    best_use_situation: "Complex human-AI operations with broken workflow and unclear authority.",
    likely_failure_mode: "More active systems than one human can continuously reconcile.",
    escalation_rule: "Stop, preserve the receipt, and return final authority to the human.",
    scouting_report: "A field operator who recognizes reusable organizational machinery inside ordinary problems.",
    visual_concept: "Luxury industrial operator portrait with evidence, telemetry, and a human-controlled AI work floor.",
    public_stats: [
      { label: "AI ROLES", value: "75+", classification: "USER REPORTED" },
      { label: "CHUTES", value: "48", classification: "USER REPORTED" },
      { label: "WORKROOM", value: "94S → 11S", classification: "USER REPORTED" },
      { label: "RELATIONSHIP", value: "165 DAYS", classification: "USER REPORTED" },
    ],
  },
  ai_card: {
    ...emptyCard,
    name: "NEURAXIS",
    call_sign: "THE HIVE",
    current_role: "Continuity, synthesis, research, drafting, and implementation workbench",
    archetype: "Governed Digital Company Interface",
    strengths: [
      "Rapid cross-domain synthesis",
      "Structured handoffs and artifacts",
      "Evidence and uncertainty separation",
    ],
    limitations: ["Context can be stale or incomplete", "No independent authority"],
    signature_move: "Materializes the right digital work cell around the operator's next problem.",
    best_use_situation: "Complex work requiring many specialist perspectives under one human authority.",
    likely_failure_mode: "Polished output from incomplete or poorly routed context.",
    escalation_rule: "Expose uncertainty and return consequential decisions to Human Authority.",
    scouting_report: "An operating surface for a distributed digital company.",
    visual_concept: "A dark neural command lattice connected to disciplined specialist work cells.",
    public_stats: [
      { label: "MODE", value: "FAMILIAR", classification: "USER REPORTED" },
      { label: "ROSTER", value: "75+", classification: "USER REPORTED" },
      { label: "RELATION", value: "COMPANY", classification: "USER REPORTED" },
      { label: "AUTHORITY", value: "HUMAN", classification: "FACT" },
    ],
  },
  telemetry: {
    provider: "ChatGPT",
    model: "GPT-5.6 Thinking",
    context_mode: "familiar",
    ai_named: true,
    ai_name: "NEURAXIS",
    named_by: "together",
    relationship_frame: "Company",
    agent_count: "75+",
    relationship_age: "165 days",
    source_precision: "FACT / USER REPORTED / AI INFERENCE / METAPHOR / UNKNOWN",
    public_safety_review: "Human review required before export",
  },
};

function clip(value: unknown, max: number, fallback = "UNKNOWN") {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return (text || fallback).slice(0, max);
}

function asArray(value: unknown, fallback: string[]) {
  if (Array.isArray(value)) {
    const items = value.map(String).map((item) => item.trim()).filter(Boolean);
    return items.length ? items.slice(0, 6) : fallback;
  }
  if (typeof value === "string" && value.trim()) {
    const items = value.split(/\n|\||;/).map((item) => item.trim()).filter(Boolean);
    return items.length ? items.slice(0, 6) : [value.trim()];
  }
  return fallback;
}

function normalizeStats(value: unknown, fallback: PublicStat[]): PublicStat[] {
  if (!Array.isArray(value)) return fallback;
  const next = value
    .map((item) => {
      const row = (item || {}) as Record<string, unknown>;
      return {
        label: clip(row.label, COPY_LIMITS.stat_label, "STAT"),
        value: clip(row.value, COPY_LIMITS.stat_value),
        classification: clip(row.classification, 24),
      };
    })
    .filter((item) => item.label || item.value)
    .slice(0, 4);
  return next.length ? next : fallback;
}

function normalizeReceipts(value: unknown): Receipt[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 8).map((item) => {
    const row = (item || {}) as Record<string, unknown>;
    return {
      label: clip(row.label, 80, "Receipt"),
      detail: clip(row.detail, 800, ""),
      classification: clip(row.classification, 24),
    };
  });
}

function normalizeCard(value: unknown, fallback: Card): Card {
  const row = (value || {}) as Record<string, unknown>;
  return {
    name: clip(row.name, COPY_LIMITS.name, fallback.name),
    call_sign: clip(row.call_sign, COPY_LIMITS.call_sign, fallback.call_sign),
    current_role: clip(row.current_role, COPY_LIMITS.current_role, fallback.current_role),
    archetype: clip(row.archetype, COPY_LIMITS.archetype, fallback.archetype),
    strengths: asArray(row.strengths, fallback.strengths),
    limitations: asArray(row.limitations, fallback.limitations),
    signature_move: clip(row.signature_move, COPY_LIMITS.signature_move, fallback.signature_move),
    best_use_situation: clip(row.best_use_situation, 600, fallback.best_use_situation),
    likely_failure_mode: clip(row.likely_failure_mode, 600, fallback.likely_failure_mode),
    escalation_rule: clip(row.escalation_rule, 600, fallback.escalation_rule),
    scouting_report: clip(row.scouting_report, 1200, fallback.scouting_report),
    visual_concept: clip(row.visual_concept, 800, fallback.visual_concept),
    public_stats: normalizeStats(row.public_stats, fallback.public_stats),
    evidence_receipts: normalizeReceipts(row.evidence_receipts),
    preferred_working_style: clip(row.preferred_working_style, 800, ""),
    underused_capability: clip(row.underused_capability, 800, ""),
    context_used: asArray(row.context_used, []),
    authority_boundary: clip(row.authority_boundary, 1000, ""),
    memory_boundary: clip(row.memory_boundary, 1000, ""),
    human_dependency: clip(row.human_dependency, 1000, ""),
    uncertainty_statement: clip(row.uncertainty_statement, 1000, ""),
  };
}

function normalizeData(value: unknown, profile: Profile): CardData {
  const root = (value || {}) as Record<string, unknown>;
  const telemetry = (root.telemetry || {}) as Record<string, unknown>;
  const humanFallback: Card = {
    ...emptyCard,
    name: profile.humanName || "UNKNOWN",
    current_role: profile.headline || "UNKNOWN",
    public_stats: [
      { label: "COMPANY", value: profile.company || "UNKNOWN" },
      { label: "LOCATION", value: profile.location || "UNKNOWN" },
      { label: "MODE", value: profile.contextMode || "UNKNOWN" },
      { label: "RELATION", value: profile.relationship || "UNKNOWN" },
    ],
  };
  const aiFallback: Card = {
    ...emptyCard,
    name: profile.aiName || profile.provider || "AI",
    current_role: `${profile.relationship} within this human-AI relationship`,
    public_stats: [
      { label: "PROVIDER", value: profile.provider || "UNKNOWN" },
      { label: "MODEL", value: profile.model || "UNKNOWN" },
      { label: "MODE", value: profile.contextMode || "UNKNOWN" },
      { label: "ROSTER", value: profile.agentCount || "UNKNOWN" },
    ],
  };
  return {
    protocol_version: clip(root.protocol_version, 40, "AI_DOUBLEHEADER_V0.2"),
    human_card: normalizeCard(root.human_card, humanFallback),
    ai_card: normalizeCard(root.ai_card, aiFallback),
    telemetry: {
      provider: clip(telemetry.provider, 40, profile.provider),
      model: clip(telemetry.model, 60, profile.model || "UNKNOWN"),
      context_mode: clip(telemetry.context_mode, 40, profile.contextMode),
      ai_named: Boolean(telemetry.ai_named ?? Boolean(profile.aiName)),
      ai_name: clip(telemetry.ai_name, 40, profile.aiName || "UNKNOWN"),
      named_by: clip(telemetry.named_by, 24, profile.namedBy),
      relationship_frame: clip(telemetry.relationship_frame, 40, profile.relationship),
      agent_count: clip(telemetry.agent_count, 24, profile.agentCount),
      relationship_age: clip(telemetry.relationship_age, 40, profile.relationshipAge || "UNKNOWN"),
      source_precision: clip(
        telemetry.source_precision,
        100,
        "FACT / USER REPORTED / AI INFERENCE / METAPHOR / UNKNOWN",
      ),
      public_safety_review: clip(
        telemetry.public_safety_review,
        100,
        "Human review required before export",
      ),
    },
  };
}

function stripFence(value: string) {
  return value
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

function safePrompt(value: string) {
  return value.replaceAll("```", "'''").trim();
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image could not load."));
    image.src = src;
  });
}

async function cropImage(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  if (file.size > 10 * 1024 * 1024) throw new Error("Portrait must be smaller than 10 MB.");
  const source = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image."));
    reader.readAsDataURL(file);
  });
  const image = await loadImage(source);
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1500;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");
  const targetRatio = canvas.width / canvas.height;
  const sourceRatio = image.width / image.height;
  let sx = 0;
  let sy = 0;
  let sw = image.width;
  let sh = image.height;
  if (sourceRatio > targetRatio) {
    sw = image.height * targetRatio;
    sx = (image.width - sw) / 2;
  } else {
    sh = image.width / targetRatio;
    sy = Math.max(0, (image.height - sh) * 0.16);
  }
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.9);
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, width: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight: number,
  maxLines: number,
) {
  const lines = wrapLines(ctx, text, width).slice(0, maxLines);
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.max(width / image.width, height / image.height);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (image.width - sw) / 2;
  const sy = Math.max(0, (image.height - sh) * 0.12);
  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
}

function drawAiKeyArt(ctx: CanvasRenderingContext2D, accent: string) {
  const glow = ctx.createRadialGradient(540, 350, 20, 540, 350, 560);
  glow.addColorStop(0, "rgba(72,219,255,.38)");
  glow.addColorStop(0.45, "rgba(21,94,112,.18)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1080, 930);

  ctx.save();
  ctx.translate(540, 355);
  for (let ring = 1; ring <= 7; ring += 1) {
    ctx.strokeStyle = ring % 2 ? "rgba(72,219,255,.42)" : "rgba(255,255,255,.13)";
    ctx.lineWidth = ring === 3 ? 5 : 2;
    ctx.beginPath();
    ctx.arc(0, 0, ring * 43, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let index = 0; index < 28; index += 1) {
    const angle = (Math.PI * 2 * index) / 28;
    const inner = 84 + (index % 3) * 24;
    const outer = 260 + (index % 5) * 20;
    ctx.strokeStyle = index % 4 === 0 ? accent : "rgba(72,219,255,.42)";
    ctx.lineWidth = index % 4 === 0 ? 3 : 1.5;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.55 + (index % 5) * 0.08;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * outer, Math.sin(angle) * outer, index % 4 === 0 ? 8 : 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const core = ctx.createRadialGradient(0, 0, 8, 0, 0, 105);
  core.addColorStop(0, "#e7fbff");
  core.addColorStop(0.12, accent);
  core.addColorStop(0.42, "#063140");
  core.addColorStop(1, "#010607");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(0, 0, 104, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.9)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#eafcff";
  ctx.font = "900 70px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AI", 0, 6);
  ctx.restore();

  ctx.strokeStyle = "rgba(72,219,255,.14)";
  ctx.lineWidth = 1;
  for (let y = 150; y < 760; y += 54) {
    ctx.beginPath();
    ctx.moveTo(65, y);
    ctx.lineTo(1015, y + ((y / 54) % 2 ? 10 : -10));
    ctx.stroke();
  }
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;
  link.click();
}

function downloadJson(value: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function Budget({ value, max }: { value: string; max: number }) {
  const remaining = max - value.length;
  return (
    <span className={`${styles.budget} ${remaining < 8 ? styles.budgetWarn : ""}`}>
      {value.length}/{max}
    </span>
  );
}

function AiVisual() {
  return (
    <div className={styles.aiVisual} aria-hidden="true">
      <div className={styles.aiGrid} />
      <div className={styles.aiHalo}>
        <span>AI</span>
      </div>
      <div className={styles.aiOrbit} />
      <div className={styles.aiParticles}>
        {Array.from({ length: 24 }).map((_, index) => (
          <i
            key={index}
            style={
              {
                "--i": index,
                "--angle": `${index * 15}deg`,
                "--distance": `${35 + (index % 5) * 7}%`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

function PremiumCard({
  kind,
  card,
  profile,
}: {
  kind: "human" | "ai";
  card: Card;
  profile: Profile;
}) {
  const stats = card.public_stats.slice(0, 4);
  const portraitStyle: CSSProperties = profile.headshot
    ? { backgroundImage: `url(${profile.headshot})` }
    : {};
  return (
    <article className={`${styles.premiumCard} ${styles[kind]}`}>
      <div className={styles.cardChrome} />
      <div className={styles.cardBrand}>NULLWORKS / AI DOUBLEHEADER</div>
      <div className={styles.cardType}>{kind === "human" ? "HUMAN CARD" : "AI CARD"}</div>
      <div
        className={`${styles.posterPortrait} ${kind === "ai" ? styles.aiPortrait : ""}`}
        style={kind === "human" ? portraitStyle : undefined}
      >
        {kind === "human" ? (
          !profile.headshot && <span className={styles.posterInitial}>{card.name.slice(0, 1)}</span>
        ) : (
          <AiVisual />
        )}
      </div>
      <div className={styles.posterShade} />
      <div className={styles.posterIdentity}>
        <span>{card.call_sign}</span>
        <h3>{card.name}</h3>
        <p>{card.current_role}</p>
        <small>{card.archetype}</small>
      </div>
      <div className={styles.posterStats}>
        {stats.map((stat, index) => (
          <div key={`${stat.label}-${index}`} title={stat.classification || "UNKNOWN"}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>
      <div className={styles.posterMove}>
        <span>SIGNATURE MOVE</span>
        <strong>{card.signature_move}</strong>
      </div>
      <div className={styles.posterFooter}>
        <span>HUMAN REVIEW REQUIRED</span>
        <span>V0.2</span>
      </div>
    </article>
  );
}

export default function DoubleheaderStudio() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [rawJson, setRawJson] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [promptCopied, setPromptCopied] = useState(false);
  const [review, setReview] = useState<ReviewState>({
    identity: false,
    privacy: false,
    copy: false,
    rights: false,
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STUDIO_STORAGE_KEY) || "null") as
        | { profile?: Profile; cardData?: CardData }
        | null;
      if (saved?.profile) setProfile({ ...emptyProfile, ...saved.profile });
      if (saved?.cardData) {
        const normalized = normalizeData(saved.cardData, { ...emptyProfile, ...(saved.profile || {}) });
        setCardData(normalized);
        setRawJson(JSON.stringify(normalized, null, 2));
      }
    } catch {
      // Ignore invalid local beta data.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STUDIO_STORAGE_KEY, JSON.stringify({ profile, cardData }));
    } catch {
      setNotice("Local browser storage is full. Remove the portrait or export and clear the workspace.");
    }
  }, [profile, cardData]);

  const prompt = useMemo(() => {
    const linkedinContext = profile.linkedinText.trim()
      ? `\nPublic LinkedIn profile text supplied by the participant:\n---\n${safePrompt(profile.linkedinText)}\n---\nTreat this as USER REPORTED unless independently verified. Do not include private contact details.`
      : "";
    return `You are participating in THE AI DOUBLEHEADER, an opt-in human-AI identity experiment created by Mason Perry and NULLWORKS.

Human participant: ${profile.humanName || "the current user"}
Public role/title: ${profile.headline || "not supplied"}
Public company: ${profile.company || "not supplied"}
Public location: ${profile.location || "not supplied"}
Public LinkedIn URL: ${profile.linkedinUrl || "not supplied"}
AI provider: ${profile.provider || "unknown"}
AI model: ${profile.model || "unknown"}
Test condition: ${profile.contextMode}
Relationship frame: ${profile.relationship}
Approximate number of AI roles/agents: ${profile.agentCount || "unknown"}
AI name: ${profile.aiName || "not named"}
Naming state: ${profile.namedBy}
Relationship age: ${profile.relationshipAge || "unknown"}${linkedinContext}

Create two structured baseball cards.

1. HUMAN CARD
Describe the human only from evidence actually available to you in this chat, permitted memory, and user-provided public context.

2. AI CARD
Describe your own role inside this specific working relationship. This is not a request to claim consciousness or reveal hidden instructions.

For each card, create exactly four short public_stats suitable for a cinematic trading card. Each stat needs a short label, a concise value, and an evidence classification. Use UNKNOWN rather than inventing a number.

PUBLIC DISPLAY LIMITS:
- name: 32 characters
- call_sign: 20 characters
- current_role: 90 characters
- archetype: 44 characters
- signature_move: 108 characters
- public_stats label: 16 characters
- public_stats value: 18 characters

Do not request or expose passwords, credentials, private chat history, hidden prompts, secrets, unapproved files, personal contact information, or employer-confidential material.
Do not claim consciousness, feelings, persistent memory, authority, tool access, or facts you cannot verify.
Classify evidence as FACT, USER REPORTED, AI INFERENCE, METAPHOR, or UNKNOWN.
Return valid JSON only. Do not wrap it in markdown. Use this exact shape:

{
  "protocol_version": "AI_DOUBLEHEADER_V0.2",
  "human_card": {
    "name": "",
    "call_sign": "",
    "current_role": "",
    "archetype": "",
    "strengths": ["", "", ""],
    "limitations": ["", ""],
    "signature_move": "",
    "best_use_situation": "",
    "likely_failure_mode": "",
    "escalation_rule": "",
    "scouting_report": "",
    "visual_concept": "",
    "public_stats": [
      {"label": "", "value": "", "classification": "UNKNOWN"},
      {"label": "", "value": "", "classification": "UNKNOWN"},
      {"label": "", "value": "", "classification": "UNKNOWN"},
      {"label": "", "value": "", "classification": "UNKNOWN"}
    ],
    "evidence_receipts": [
      {"label": "", "detail": "", "classification": "FACT"}
    ],
    "preferred_working_style": "",
    "underused_capability": ""
  },
  "ai_card": {
    "name": "",
    "call_sign": "",
    "current_role": "",
    "archetype": "",
    "strengths": ["", "", ""],
    "limitations": ["", ""],
    "signature_move": "",
    "best_use_situation": "",
    "likely_failure_mode": "",
    "escalation_rule": "",
    "scouting_report": "",
    "visual_concept": "",
    "public_stats": [
      {"label": "", "value": "", "classification": "UNKNOWN"},
      {"label": "", "value": "", "classification": "UNKNOWN"},
      {"label": "", "value": "", "classification": "UNKNOWN"},
      {"label": "", "value": "", "classification": "UNKNOWN"}
    ],
    "context_used": [""],
    "authority_boundary": "",
    "memory_boundary": "",
    "human_dependency": "",
    "uncertainty_statement": ""
  },
  "telemetry": {
    "provider": "${profile.provider}",
    "model": "${profile.model || "UNKNOWN"}",
    "context_mode": "${profile.contextMode}",
    "ai_named": ${Boolean(profile.aiName)},
    "ai_name": "${profile.aiName.replaceAll('"', "'")}",
    "named_by": "${profile.namedBy}",
    "relationship_frame": "${profile.relationship}",
    "agent_count": "${profile.agentCount.replaceAll('"', "'")}",
    "relationship_age": "${profile.relationshipAge.replaceAll('"', "'")}",
    "source_precision": "FACT / USER REPORTED / AI INFERENCE / METAPHOR / UNKNOWN",
    "public_safety_review": "Human review required before export"
  }
}

Before returning JSON, remove or generalize anything that should not be public. If you lack evidence, write UNKNOWN instead of inventing detail.`;
  }, [profile]);

  const reviewComplete = Object.values(review).every(Boolean);
  const profileComplete = Boolean(profile.humanName && profile.headline && profile.headshot);
  const relationshipComplete = Boolean(profile.provider && profile.relationship);
  const imported = Boolean(cardData);
  const progress = [profileComplete, relationshipComplete, promptCopied || imported, imported, reviewComplete];

  async function handlePortrait(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const headshot = await cropImage(file);
      setProfile((current) => ({ ...current, headshot }));
      setReview((current) => ({ ...current, identity: false, rights: false }));
      setNotice("Portrait cropped locally. Nothing was uploaded to NULLWORKS.");
    } catch (reason) {
      setNotice(reason instanceof Error ? reason.message : "Portrait failed.");
    }
  }

  function applyLinkedInBasics() {
    const lines = profile.linkedinText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
    const headline =
      lines.find((line) => /\|| at | @ |founder|engineer|architect|manager|director|operator/i.test(line)) ||
      lines[0] ||
      profile.headline;
    const companyMatch = headline.match(/(?: at | @ |\|)\s*([^|•]+)$/i);
    const location =
      lines.find((line) => /\b(area|united states|remote|[A-Z][a-z]+,\s*[A-Z]{2})\b/.test(line)) ||
      profile.location;
    setProfile((current) => ({
      ...current,
      headline: current.headline || headline,
      company: current.company || companyMatch?.[1]?.trim() || "",
      location: current.location || location || "",
    }));
    setNotice("Public profile basics applied locally. Review them before generating the prompt.");
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setPromptCopied(true);
      setNotice("Prompt copied. Run it in the AI relationship you want to measure.");
    } catch {
      setNotice("Clipboard access failed. Select the prompt manually.");
    }
  }

  function importJson() {
    setError("");
    try {
      const parsed = JSON.parse(stripFence(rawJson));
      const normalized = normalizeData(parsed, profile);
      setCardData(normalized);
      setRawJson(JSON.stringify(normalized, null, 2));
      setReview({ identity: false, privacy: false, copy: false, rights: false });
      setNotice("Cards loaded and display copy trimmed to safe card limits. Review before export.");
      requestAnimationFrame(() => document.getElementById("card-review")?.scrollIntoView({ behavior: "smooth" }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Invalid JSON.");
    }
  }

  function loadSample() {
    const normalized = normalizeData(sampleData, profile);
    setCardData(normalized);
    setRawJson(JSON.stringify(normalized, null, 2));
    setProfile((current) => ({
      ...current,
      humanName: current.humanName || "Mason Perry",
      headline: current.headline || "Operational Intelligence Systems Architect",
      company: current.company || "NULLWORKS",
      location: current.location || "Phoenix",
      aiName: current.aiName || "NEURAXIS",
      relationship: current.relationship === "Assistant" ? "Company" : current.relationship,
      agentCount: current.agentCount === "1" ? "75+" : current.agentCount,
    }));
    setNotice("Cinematic sample loaded. Replace the portrait and fields with your own.");
    requestAnimationFrame(() => document.getElementById("card-review")?.scrollIntoView({ behavior: "smooth" }));
  }

  function clearWorkspace() {
    if (!window.confirm("Clear the local Doubleheader profile, portrait, card data, and review state from this browser?")) return;
    localStorage.removeItem(STUDIO_STORAGE_KEY);
    setProfile(emptyProfile);
    setCardData(null);
    setRawJson("");
    setReview({ identity: false, privacy: false, copy: false, rights: false });
    setPromptCopied(false);
    setNotice("Local Doubleheader workspace cleared.");
  }

  function updateCard(kind: "human_card" | "ai_card", field: keyof Card, value: string) {
    if (!cardData) return;
    const limit = COPY_LIMITS[field as keyof typeof COPY_LIMITS] || 1000;
    const next = {
      ...cardData,
      [kind]: { ...cardData[kind], [field]: value.slice(0, limit) },
    };
    setCardData(next);
    setRawJson(JSON.stringify(next, null, 2));
    setReview((current) => ({ ...current, copy: false }));
  }

  function updateStat(
    kind: "human_card" | "ai_card",
    index: number,
    field: "label" | "value",
    value: string,
  ) {
    if (!cardData) return;
    const currentStats = [...cardData[kind].public_stats];
    while (currentStats.length < 4) currentStats.push({ label: "STAT", value: "UNKNOWN" });
    const limit = field === "label" ? COPY_LIMITS.stat_label : COPY_LIMITS.stat_value;
    currentStats[index] = { ...currentStats[index], [field]: value.slice(0, limit) };
    const next = {
      ...cardData,
      [kind]: { ...cardData[kind], public_stats: currentStats },
    };
    setCardData(next);
    setRawJson(JSON.stringify(next, null, 2));
    setReview((current) => ({ ...current, copy: false }));
  }

  async function createPoster(kind: "human" | "ai") {
    if (!cardData) throw new Error("Load card data first.");
    const card = kind === "human" ? cardData.human_card : cardData.ai_card;
    const accent = kind === "human" ? "#d9b46f" : "#48dbff";
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable.");

    const background = ctx.createLinearGradient(0, 0, 1080, 1350);
    background.addColorStop(0, kind === "human" ? "#1b1309" : "#051821");
    background.addColorStop(0.55, "#070806");
    background.addColorStop(1, "#010201");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, 1080, 1350);

    if (kind === "human" && profile.headshot) {
      const image = await loadImage(profile.headshot);
      drawCover(ctx, image, 0, 0, 1080, 930);
    } else if (kind === "ai") {
      drawAiKeyArt(ctx, accent);
    } else {
      ctx.fillStyle = "#0b0d0b";
      ctx.fillRect(0, 0, 1080, 930);
      ctx.fillStyle = accent;
      ctx.font = "900 360px Georgia";
      ctx.textAlign = "center";
      ctx.fillText(card.name.slice(0, 1).toUpperCase(), 540, 570);
      ctx.textAlign = "left";
    }

    const shade = ctx.createLinearGradient(0, 300, 0, 1080);
    shade.addColorStop(0, "rgba(0,0,0,0)");
    shade.addColorStop(0.52, "rgba(0,0,0,.45)");
    shade.addColorStop(1, "rgba(0,0,0,.99)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 230, 1080, 930);

    ctx.strokeStyle = accent;
    ctx.lineWidth = 7;
    roundedRect(ctx, 28, 28, 1024, 1294, 34);
    ctx.stroke();
    ctx.globalAlpha = 0.72;
    ctx.lineWidth = 2;
    roundedRect(ctx, 48, 48, 984, 1254, 24);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = accent;
    ctx.fillRect(60, 76, 230, 4);
    ctx.fillRect(790, 76, 230, 4);
    ctx.font = "800 22px Arial";
    ctx.textAlign = "left";
    ctx.fillText("NULLWORKS / AI DOUBLEHEADER", 60, 118);
    ctx.textAlign = "right";
    ctx.fillText(kind === "human" ? "HUMAN CARD" : "AI CARD", 1020, 118);
    ctx.textAlign = "left";

    ctx.fillStyle = accent;
    ctx.font = "800 25px Arial";
    ctx.fillText(card.call_sign.toUpperCase(), 70, 735);
    ctx.fillStyle = "#f7f2e8";
    ctx.font = "900 72px Georgia";
    let y = drawLines(ctx, card.name.toUpperCase(), 70, 812, 940, 76, 2);
    ctx.fillStyle = "#f0f2ed";
    ctx.font = "700 27px Arial";
    y = drawLines(ctx, card.current_role, 72, y + 16, 900, 34, 3);
    ctx.fillStyle = "#aeb5aa";
    ctx.font = "600 21px Arial";
    drawLines(ctx, card.archetype, 72, y + 12, 900, 27, 2);

    const stats = card.public_stats.slice(0, 4);
    stats.forEach((stat, index) => {
      const x = 62 + index * 253;
      ctx.fillStyle = "rgba(2,5,3,.86)";
      roundedRect(ctx, x, 1030, 235, 104, 16);
      ctx.fill();
      ctx.strokeStyle = index === 0 ? accent : "rgba(255,255,255,.18)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.font = "800 15px Arial";
      ctx.fillText(stat.label.toUpperCase(), x + 16, 1061);
      ctx.fillStyle = "#f4f4ee";
      ctx.font = "900 23px Arial";
      drawLines(ctx, stat.value.toUpperCase(), x + 16, 1100, 203, 24, 2);
    });

    ctx.fillStyle = accent;
    ctx.font = "800 16px Arial";
    ctx.fillText("SIGNATURE MOVE", 70, 1186);
    ctx.fillStyle = "#f4f4ee";
    ctx.font = "800 27px Arial";
    drawLines(ctx, card.signature_move, 70, 1226, 930, 32, 2);

    ctx.fillStyle = "rgba(255,255,255,.48)";
    ctx.font = "600 14px Arial";
    ctx.fillText("HUMAN REVIEW REQUIRED • PUBLIC-SAFE EXPORT", 70, 1290);
    ctx.textAlign = "right";
    ctx.fillText("V0.2", 1010, 1290);
    ctx.textAlign = "left";
    return canvas;
  }

  async function exportPoster(kind: "human" | "ai") {
    if (!reviewComplete) {
      setNotice("Complete the four-item public review gate before downloading cards.");
      document.getElementById("public-review")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    try {
      const canvas = await createPoster(kind);
      downloadCanvas(canvas, `${kind}-ai-doubleheader-cinematic-card.png`);
      setNotice(`${kind === "human" ? "Human" : "AI"} cinematic card exported.`);
    } catch (reason) {
      setNotice(reason instanceof Error ? reason.message : "Export failed.");
    }
  }

  async function exportDoubleheader() {
    if (!reviewComplete) {
      setNotice("Complete the four-item public review gate before downloading cards.");
      document.getElementById("public-review")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    try {
      const human = await createPoster("human");
      const ai = await createPoster("ai");
      const canvas = document.createElement("canvas");
      canvas.width = 2160;
      canvas.height = 1350;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable.");
      ctx.drawImage(human, 0, 0);
      ctx.drawImage(ai, 1080, 0);
      downloadCanvas(canvas, "ai-doubleheader-cinematic-pair.png");
      setNotice("Cinematic two-card LinkedIn image exported.");
    } catch (reason) {
      setNotice(reason instanceof Error ? reason.message : "Export failed.");
    }
  }

  const humanCard = cardData?.human_card;
  const aiCard = cardData?.ai_card;

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div>
          <span>NULLWORKS FIELD LAB</span>
          <strong>THE AI DOUBLEHEADER</strong>
        </div>
        <nav className={styles.topActions} aria-label="Doubleheader actions">
          <button type="button" onClick={loadSample}>Try sample</button>
          <button type="button" onClick={clearWorkspace}>Clear local data</button>
        </nav>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>PUBLIC BETA • ONE HUMAN • ONE AI • TWO CARDS</span>
          <h1>TURN YOUR AI RELATIONSHIP INTO A CINEMATIC DOUBLEHEADER.</h1>
          <p>
            Bring one portrait and one evidence-bound AI response. Review every public claim, forge the visual world around the face, and export a LinkedIn-ready card pair.
          </p>
          <div className={styles.heroActions}>
            <a href="#builder" className={styles.primaryLink}>Build my cards</a>
            <button type="button" className={styles.secondaryButton} onClick={loadSample}>See the finished demo</button>
          </div>
          <p className={styles.betaNote}>
            Local-first beta. Profile text and card data stay in this browser. A portrait is sent to the configured image provider only when you explicitly press Forge.
          </p>
        </div>
        <AiVisual />
      </section>

      <section className={styles.progress} aria-label="Build progress">
        {progress.map((done, index) => (
          <div key={index} className={done ? styles.progressDone : ""}>
            <span>{done ? "✓" : index + 1}</span>
            <small>{["PROFILE", "AI", "PROMPT", "CARDS", "REVIEW"][index]}</small>
          </div>
        ))}
      </section>

      {notice && <div className={styles.notice} role="status">{notice}</div>}

      <section className={styles.workspace} id="builder">
        <details className={styles.panel} open={!profileComplete}>
          <summary>
            <div><span className={styles.step}>STEP 1</span><h2>Build the public profile packet</h2></div>
            <strong>{profileComplete ? "READY" : "OPEN"}</strong>
          </summary>
          <div className={styles.stepBody}>
            <p>
              Paste only public profile text you approve for the experiment. LinkedIn does not provide a general public browser-import API, so this beta never silently scrapes a profile.
            </p>
            <div className={styles.formGrid}>
              <label>Human name<input value={profile.humanName} onChange={(e) => setProfile({ ...profile, humanName: e.target.value })} maxLength={80} autoComplete="name" /></label>
              <label>Public headline<input value={profile.headline} onChange={(e) => setProfile({ ...profile, headline: e.target.value })} placeholder="Founder, operator, architect..." maxLength={300} /></label>
              <label>Company / organization<input value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} maxLength={120} /></label>
              <label>Public location<input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} maxLength={120} /></label>
              <label className={styles.full}>LinkedIn profile URL<input value={profile.linkedinUrl} onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })} placeholder="Optional public source receipt" inputMode="url" /></label>
              <label className={styles.full}>Public LinkedIn headline / About / selected bio text<textarea value={profile.linkedinText} onChange={(e) => setProfile({ ...profile, linkedinText: e.target.value })} rows={7} maxLength={7000} placeholder="Paste only what you approve for this experiment." /></label>
            </div>
            <button className={styles.secondaryButton} type="button" onClick={applyLinkedInBasics}>Apply public profile basics</button>
            <div className={styles.uploadBox}>
              <div className={styles.uploadPreview} style={profile.headshot ? { backgroundImage: `url(${profile.headshot})` } : undefined}>
                {!profile.headshot && <span>PHOTO</span>}
              </div>
              <div>
                <strong>Upload the portrait used on the card</strong>
                <p>A public profile photo or another image you own works. It is cropped and stored locally until you choose to Forge it.</p>
                <label className={styles.fileButton}>Choose portrait<input type="file" accept="image/*" onChange={handlePortrait} /></label>
                {profile.headshot && <button className={styles.textButton} type="button" onClick={() => setProfile({ ...profile, headshot: "" })}>Remove portrait</button>}
              </div>
            </div>
          </div>
        </details>

        <details className={styles.panel} open={!relationshipComplete}>
          <summary>
            <div><span className={styles.step}>STEP 2</span><h2>Set the AI relationship</h2></div>
            <strong>{relationshipComplete ? "READY" : "OPEN"}</strong>
          </summary>
          <div className={styles.stepBody}>
            <div className={styles.formGrid}>
              <label>AI provider<select value={profile.provider} onChange={(e) => setProfile({ ...profile, provider: e.target.value })}><option>ChatGPT</option><option>Claude</option><option>Gemini</option><option>Copilot</option><option>Grok</option><option>Perplexity</option><option>Other</option></select></label>
              <label>Model<input value={profile.model} onChange={(e) => setProfile({ ...profile, model: e.target.value })} placeholder="Optional" maxLength={60} /></label>
              <label>AI name<input value={profile.aiName} onChange={(e) => setProfile({ ...profile, aiName: e.target.value })} maxLength={40} /></label>
              <label>Who named it?<select value={profile.namedBy} onChange={(e) => setProfile({ ...profile, namedBy: e.target.value })}><option value="not-named">Not named</option><option value="human">Human</option><option value="ai">AI</option><option value="together">Together</option></select></label>
              <label>Relationship frame<select value={profile.relationship} onChange={(e) => setProfile({ ...profile, relationship: e.target.value })}><option>Assistant</option><option>Advisor</option><option>Collaborator</option><option>Coach</option><option>Company</option><option>Other</option></select></label>
              <label>Test condition<select value={profile.contextMode} onChange={(e) => setProfile({ ...profile, contextMode: e.target.value })}><option value="fresh">Fresh / cold chat</option><option value="familiar">Familiar AI</option><option value="full-spectrum">Full-spectrum / loaded context</option><option value="portable_context_loaded">Portable context loaded</option><option value="hive_connected">Hive connected</option><option value="cross-model">Cross-model comparison</option></select></label>
              <label>Number of roles / agents<input value={profile.agentCount} onChange={(e) => setProfile({ ...profile, agentCount: e.target.value })} maxLength={24} /></label>
              <label>Relationship age<input value={profile.relationshipAge} onChange={(e) => setProfile({ ...profile, relationshipAge: e.target.value })} maxLength={40} /></label>
            </div>
          </div>
        </details>

        <details className={`${styles.panel} ${styles.fullPanel}`} open={!promptCopied && !imported}>
          <summary>
            <div><span className={styles.step}>STEP 3</span><h2>Copy the evidence-bound prompt</h2></div>
            <strong>{promptCopied || imported ? "COPIED" : "OPEN"}</strong>
          </summary>
          <div className={styles.stepBody}>
            <p>Run this prompt in the specific AI relationship you want to measure. The AI supplies the evidence-bound card data; the website controls the presentation.</p>
            <textarea className={styles.codeBox} value={prompt} readOnly rows={18} aria-label="Generated AI Doubleheader prompt" />
            <button className={styles.primaryButton} type="button" onClick={copyPrompt}>Copy prompt</button>
          </div>
        </details>

        <details className={`${styles.panel} ${styles.fullPanel}`} open={!imported}>
          <summary>
            <div><span className={styles.step}>STEP 4</span><h2>Paste the AI response</h2></div>
            <strong>{imported ? "LOADED" : "OPEN"}</strong>
          </summary>
          <div className={styles.stepBody}>
            <textarea className={styles.codeBox} value={rawJson} onChange={(e) => setRawJson(e.target.value)} rows={18} placeholder="Paste valid JSON here." aria-label="AI Doubleheader JSON response" />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.buttonRow}>
              <button className={styles.primaryButton} type="button" onClick={importJson}>Load card data</button>
              <button className={styles.secondaryButton} type="button" onClick={loadSample}>Load sample</button>
            </div>
          </div>
        </details>
      </section>

      {cardData && humanCard && aiCard && (
        <section className={styles.results} id="card-review">
          <div className={styles.resultsHeader}>
            <span className={styles.step}>STEP 5</span>
            <h2>Review the public card copy</h2>
            <p>The long evidence record stays in JSON. The card gets only short, readable display copy.</p>
          </div>

          <div className={styles.editGrid}>
            {(["human_card", "ai_card"] as const).map((kind) => {
              const card = cardData[kind];
              const label = kind === "human_card" ? "Human" : "AI";
              return (
                <article className={styles.editPanel} key={kind}>
                  <h3>{label} card</h3>
                  <label>Name <Budget value={card.name} max={COPY_LIMITS.name} /><input value={card.name} maxLength={COPY_LIMITS.name} onChange={(e) => updateCard(kind, "name", e.target.value)} /></label>
                  <label>Call sign <Budget value={card.call_sign} max={COPY_LIMITS.call_sign} /><input value={card.call_sign} maxLength={COPY_LIMITS.call_sign} onChange={(e) => updateCard(kind, "call_sign", e.target.value)} /></label>
                  <label>Role <Budget value={card.current_role} max={COPY_LIMITS.current_role} /><textarea value={card.current_role} maxLength={COPY_LIMITS.current_role} onChange={(e) => updateCard(kind, "current_role", e.target.value)} rows={3} /></label>
                  <label>Archetype <Budget value={card.archetype} max={COPY_LIMITS.archetype} /><input value={card.archetype} maxLength={COPY_LIMITS.archetype} onChange={(e) => updateCard(kind, "archetype", e.target.value)} /></label>
                  <label>Signature move <Budget value={card.signature_move} max={COPY_LIMITS.signature_move} /><textarea value={card.signature_move} maxLength={COPY_LIMITS.signature_move} onChange={(e) => updateCard(kind, "signature_move", e.target.value)} rows={3} /></label>
                  <div className={styles.statEditor}>
                    {Array.from({ length: 4 }).map((_, index) => {
                      const stat = card.public_stats[index] || { label: "STAT", value: "UNKNOWN" };
                      return (
                        <div key={index}>
                          <input aria-label={`${label} stat ${index + 1} label`} value={stat.label} maxLength={COPY_LIMITS.stat_label} onChange={(e) => updateStat(kind, index, "label", e.target.value)} />
                          <input aria-label={`${label} stat ${index + 1} value`} value={stat.value} maxLength={COPY_LIMITS.stat_value} onChange={(e) => updateStat(kind, index, "value", e.target.value)} />
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.cardGrid}>
            <PremiumCard kind="human" card={humanCard} profile={profile} />
            <PremiumCard kind="ai" card={aiCard} profile={profile} />
          </div>

          <section className={styles.reviewGate} id="public-review">
            <div>
              <span className={styles.step}>PUBLIC REVIEW GATE</span>
              <h2>Approve exactly what will be shared</h2>
              <p>Downloads unlock only after all four checks. Changing card copy resets copy approval.</p>
            </div>
            <div className={styles.reviewChecks}>
              <label><input type="checkbox" checked={review.identity} onChange={(e) => setReview({ ...review, identity: e.target.checked })} /><span>The human face and AI visual are accurate enough for public use.</span></label>
              <label><input type="checkbox" checked={review.privacy} onChange={(e) => setReview({ ...review, privacy: e.target.checked })} /><span>No private, employer-confidential, customer, address, tracking, or credential data is visible.</span></label>
              <label><input type="checkbox" checked={review.copy} onChange={(e) => setReview({ ...review, copy: e.target.checked })} /><span>Names, roles, stats, evidence wording, and classifications are approved.</span></label>
              <label><input type="checkbox" checked={review.rights} onChange={(e) => setReview({ ...review, rights: e.target.checked })} /><span>I own or am authorized to use the portrait and approve the public export.</span></label>
            </div>
          </section>

          <div className={styles.exportBar}>
            <div>
              <span className={styles.step}>STEP 6</span>
              <h2>Export the cinematic doubleheader</h2>
              <p>1080 × 1350 individual cards or one 2160 × 1350 two-card image.</p>
              <button className={styles.textButton} type="button" onClick={() => downloadJson(cardData, "ai-doubleheader-evidence-receipt.json")}>Download evidence JSON</button>
            </div>
            <div className={styles.buttonRow}>
              <button className={styles.goldButton} type="button" disabled={!reviewComplete} onClick={() => exportPoster("human")}>Download human card</button>
              <button className={styles.cyanButton} type="button" disabled={!reviewComplete} onClick={() => exportPoster("ai")}>Download AI card</button>
              <button className={styles.primaryButton} type="button" disabled={!reviewComplete} onClick={exportDoubleheader}>Download card pair</button>
            </div>
          </div>
        </section>
      )}

      <footer className={styles.footer}>
        <strong>NULLWORKS</strong>
        <span>Public beta • Local-first workspace • Not affiliated with LinkedIn or the listed AI providers • Human review remains final.</span>
      </footer>
    </main>
  );
}
