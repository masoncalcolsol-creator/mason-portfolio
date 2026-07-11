"use client";

import {
  ChangeEvent,
  CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./studio.module.css";

type PublicStat = {
  label: string;
  value: string;
  classification?: string;
};

type Receipt = {
  label: string;
  detail: string;
  classification: string;
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

const STORAGE_KEY = "nullworks.aiDoubleheader.cinematic.v1";

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
    current_role: "Operational Intelligence Systems Architect",
    archetype: "Forward-deployed systems builder",
    strengths: [
      "Finds hidden operating friction",
      "Turns field receipts into systems",
      "Builds the company around AI workers",
    ],
    limitations: ["Continuity load rises with project velocity", "Can outrun the surrounding workflow"],
    signature_move: "Compress the mess. Amplify the expert.",
    best_use_situation: "Complex human-AI operations with broken workflow and unclear authority.",
    likely_failure_mode: "More active systems than one human can continuously reconcile.",
    escalation_rule: "Stop, preserve the receipt, and return final authority to the human.",
    scouting_report: "A field operator who recognizes reusable organizational machinery inside ordinary problems.",
    visual_concept: "Luxury industrial operator portrait with evidence, telemetry, and a human-controlled AI work floor.",
    public_stats: [
      { label: "CATEGORY", value: "OISA", classification: "USER REPORTED" },
      { label: "MODE", value: "FIELD-BUILT", classification: "AI INFERENCE" },
      { label: "ROSTER", value: "75+", classification: "USER REPORTED" },
      { label: "AUTHORITY", value: "HUMAN", classification: "FACT" },
    ],
  },
  ai_card: {
    ...emptyCard,
    name: "NEURAXIS",
    call_sign: "THE HIVE",
    current_role: "Company-framed synthesis, continuity, and execution partner",
    archetype: "Distributed specialist workbench",
    strengths: [
      "Rapid cross-domain synthesis",
      "Structured handoffs and artifacts",
      "Evidence and uncertainty separation",
    ],
    limitations: ["Context can be stale or incomplete", "No independent authority"],
    signature_move: "Materialize the right work cell around the problem.",
    best_use_situation: "Complex work requiring many specialist perspectives under one human authority.",
    likely_failure_mode: "Polished output from incomplete or poorly routed context.",
    escalation_rule: "Expose uncertainty and return consequential decisions to Human Authority.",
    scouting_report: "Less a single assistant than an operating surface for a distributed digital company.",
    visual_concept: "A dark neural command lattice connected to a disciplined fleet of work cells.",
    public_stats: [
      { label: "MODEL", value: "MULTI", classification: "METAPHOR" },
      { label: "MODE", value: "FAMILIAR", classification: "FACT" },
      { label: "RELATION", value: "COMPANY", classification: "USER REPORTED" },
      { label: "ROSTER", value: "75+", classification: "USER REPORTED" },
    ],
  },
  telemetry: {
    provider: "ChatGPT",
    model: "GPT-5.6 Thinking",
    context_mode: "familiar",
    ai_named: true,
    ai_name: "Neuraxis",
    named_by: "together",
    relationship_frame: "Company",
    agent_count: "75+",
    relationship_age: "165 days",
    source_precision: "FACT / USER REPORTED / AI INFERENCE / METAPHOR / UNKNOWN",
    public_safety_review: "Human review required before export",
  },
};

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
        label: String(row.label || "STAT").slice(0, 18),
        value: String(row.value || "UNKNOWN").slice(0, 28),
        classification: String(row.classification || "UNKNOWN"),
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
      label: String(row.label || "Receipt"),
      detail: String(row.detail || ""),
      classification: String(row.classification || "UNKNOWN"),
    };
  });
}

function normalizeCard(value: unknown, fallback: Card): Card {
  const row = (value || {}) as Record<string, unknown>;
  return {
    name: String(row.name || fallback.name),
    call_sign: String(row.call_sign || fallback.call_sign),
    current_role: String(row.current_role || fallback.current_role),
    archetype: String(row.archetype || fallback.archetype),
    strengths: asArray(row.strengths, fallback.strengths),
    limitations: asArray(row.limitations, fallback.limitations),
    signature_move: String(row.signature_move || fallback.signature_move),
    best_use_situation: String(row.best_use_situation || fallback.best_use_situation),
    likely_failure_mode: String(row.likely_failure_mode || fallback.likely_failure_mode),
    escalation_rule: String(row.escalation_rule || fallback.escalation_rule),
    scouting_report: String(row.scouting_report || fallback.scouting_report),
    visual_concept: String(row.visual_concept || fallback.visual_concept),
    public_stats: normalizeStats(row.public_stats, fallback.public_stats),
    evidence_receipts: normalizeReceipts(row.evidence_receipts),
    preferred_working_style: String(row.preferred_working_style || ""),
    underused_capability: String(row.underused_capability || ""),
    context_used: asArray(row.context_used, []),
    authority_boundary: String(row.authority_boundary || ""),
    memory_boundary: String(row.memory_boundary || ""),
    human_dependency: String(row.human_dependency || ""),
    uncertainty_statement: String(row.uncertainty_statement || ""),
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
    current_role: `${profile.relationship} within this specific human-AI relationship`,
    public_stats: [
      { label: "PROVIDER", value: profile.provider || "UNKNOWN" },
      { label: "MODEL", value: profile.model || "UNKNOWN" },
      { label: "MODE", value: profile.contextMode || "UNKNOWN" },
      { label: "ROSTER", value: profile.agentCount || "UNKNOWN" },
    ],
  };
  return {
    protocol_version: String(root.protocol_version || "AI_DOUBLEHEADER_V0.2"),
    human_card: normalizeCard(root.human_card, humanFallback),
    ai_card: normalizeCard(root.ai_card, aiFallback),
    telemetry: {
      provider: String(telemetry.provider || profile.provider),
      model: String(telemetry.model || profile.model || "UNKNOWN"),
      context_mode: String(telemetry.context_mode || profile.contextMode),
      ai_named: Boolean(telemetry.ai_named ?? Boolean(profile.aiName)),
      ai_name: String(telemetry.ai_name || profile.aiName || "UNKNOWN"),
      named_by: String(telemetry.named_by || profile.namedBy),
      relationship_frame: String(telemetry.relationship_frame || profile.relationship),
      agent_count: String(telemetry.agent_count || profile.agentCount),
      relationship_age: String(telemetry.relationship_age || profile.relationshipAge || "UNKNOWN"),
      source_precision: String(
        telemetry.source_precision ||
          "FACT / USER REPORTED / AI INFERENCE / METAPHOR / UNKNOWN",
      ),
      public_safety_review: String(
        telemetry.public_safety_review || "Human review required before export",
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
    sy = Math.max(0, (image.height - sh) * 0.2);
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
  const sy = Math.max(0, (image.height - sh) * 0.18);
  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
}

function drawAiCore(ctx: CanvasRenderingContext2D, x: number, y: number, accent: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = accent;
  ctx.fillStyle = accent;
  for (let ring = 1; ring <= 5; ring += 1) {
    ctx.globalAlpha = 0.32 + ring * 0.08;
    ctx.lineWidth = ring === 3 ? 5 : 2;
    ctx.beginPath();
    ctx.arc(0, 0, ring * 52, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  for (let index = 0; index < 12; index += 1) {
    const angle = (Math.PI * 2 * index) / 12;
    const inner = 62;
    const outer = 250;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * outer, Math.sin(angle) * outer, 9, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#020807";
  ctx.beginPath();
  ctx.arc(0, 0, 76, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#f4fbff";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.font = "900 74px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AI", 0, 6);
  ctx.restore();
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;
  link.click();
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
      <div className={styles.posterPortrait} style={kind === "human" ? portraitStyle : undefined}>
        {kind === "human" ? (
          !profile.headshot && <span className={styles.posterInitial}>{card.name.slice(0, 1)}</span>
        ) : (
          <div className={styles.orbitMark}><span>AI</span></div>
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
          <div key={`${stat.label}-${index}`}>
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

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as
        | { profile?: Profile; cardData?: CardData }
        | null;
      if (saved?.profile) setProfile({ ...emptyProfile, ...saved.profile });
      if (saved?.cardData) {
        setCardData(saved.cardData);
        setRawJson(JSON.stringify(saved.cardData, null, 2));
      }
    } catch {
      // Ignore invalid local beta data.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, cardData }));
    } catch {
      setNotice("Local browser storage is full. Remove the portrait or export your cards.");
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

  async function handlePortrait(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const headshot = await cropImage(file);
      setProfile((current) => ({ ...current, headshot }));
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
    setNotice("Public LinkedIn basics applied locally. Review the fields before generating the prompt.");
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
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
      setNotice("Cards loaded. Review the public-facing fields before export.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Invalid JSON.");
    }
  }

  function loadSample() {
    setCardData(sampleData);
    setRawJson(JSON.stringify(sampleData, null, 2));
    setProfile((current) => ({
      ...current,
      humanName: current.humanName || "Mason Perry",
      headline: current.headline || "Operational Intelligence Systems Architect",
      company: current.company || "NULLWORKS",
      location: current.location || "Greater Phoenix Area",
    }));
    setNotice("Mason / NULLWORKS cinematic sample loaded.");
  }

  function updateCard(kind: "human_card" | "ai_card", field: keyof Card, value: string) {
    if (!cardData) return;
    const next = {
      ...cardData,
      [kind]: { ...cardData[kind], [field]: value },
    };
    setCardData(next);
    setRawJson(JSON.stringify(next, null, 2));
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
    currentStats[index] = { ...currentStats[index], [field]: value };
    const next = {
      ...cardData,
      [kind]: { ...cardData[kind], public_stats: currentStats },
    };
    setCardData(next);
    setRawJson(JSON.stringify(next, null, 2));
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
    background.addColorStop(0, kind === "human" ? "#1b1309" : "#06151d");
    background.addColorStop(0.55, "#070806");
    background.addColorStop(1, "#010201");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, 1080, 1350);

    if (kind === "human" && profile.headshot) {
      const image = await loadImage(profile.headshot);
      drawCover(ctx, image, 0, 0, 1080, 930);
    } else if (kind === "ai") {
      const glow = ctx.createRadialGradient(540, 390, 10, 540, 390, 500);
      glow.addColorStop(0, "rgba(72,219,255,.32)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 1080, 900);
      drawAiCore(ctx, 540, 390, accent);
    } else {
      ctx.fillStyle = "#0b0d0b";
      ctx.fillRect(0, 0, 1080, 930);
      ctx.fillStyle = accent;
      ctx.font = "900 360px Georgia";
      ctx.textAlign = "center";
      ctx.fillText(card.name.slice(0, 1).toUpperCase(), 540, 570);
      ctx.textAlign = "left";
    }

    const shade = ctx.createLinearGradient(0, 330, 0, 1070);
    shade.addColorStop(0, "rgba(0,0,0,0)");
    shade.addColorStop(0.55, "rgba(0,0,0,.48)");
    shade.addColorStop(1, "rgba(0,0,0,.98)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 250, 1080, 900);

    ctx.strokeStyle = accent;
    ctx.lineWidth = 7;
    roundedRect(ctx, 28, 28, 1024, 1294, 34);
    ctx.stroke();
    ctx.globalAlpha = 0.7;
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
      ctx.fillStyle = "rgba(2,5,3,.83)";
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
    try {
      const canvas = await createPoster(kind);
      downloadCanvas(canvas, `${kind}-ai-doubleheader-cinematic-card.png`);
      setNotice(`${kind === "human" ? "Human" : "AI"} cinematic card exported.`);
    } catch (reason) {
      setNotice(reason instanceof Error ? reason.message : "Export failed.");
    }
  }

  async function exportDoubleheader() {
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
        <button type="button" onClick={loadSample}>Load cinematic sample</button>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>ONE HUMAN. ONE AI. TWO IDENTITY RECEIPTS.</span>
          <h1>MAKE THE CARD LOOK AS IMPORTANT AS THE EXPERIMENT.</h1>
          <p>
            Use a real public portrait, optional public LinkedIn profile text, and one evidence-bound AI response.
            The result is a premium LinkedIn-ready card—not a dashboard screenshot.
          </p>
        </div>
        <div className={styles.heroSeal} aria-hidden="true"><span>AI</span></div>
      </section>

      {notice && <div className={styles.notice}>{notice}</div>}

      <section className={styles.workspace}>
        <article className={styles.panel}>
          <span className={styles.step}>STEP 1</span>
          <h2>Build the public profile packet</h2>
          <p>
            LinkedIn does not provide a general public browser-import API. Paste only the public headline/About text you want the AI to use. Nothing leaves this browser unless you paste the generated prompt into an AI.
          </p>
          <div className={styles.formGrid}>
            <label>Human name<input value={profile.humanName} onChange={(e) => setProfile({ ...profile, humanName: e.target.value })} /></label>
            <label>Public headline<input value={profile.headline} onChange={(e) => setProfile({ ...profile, headline: e.target.value })} placeholder="Founder, operator, architect..." /></label>
            <label>Company / organization<input value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} /></label>
            <label>Public location<input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} /></label>
            <label className={styles.full}>LinkedIn profile URL<input value={profile.linkedinUrl} onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })} placeholder="Optional public source receipt" /></label>
            <label className={styles.full}>Paste public LinkedIn headline / About / selected bio text<textarea value={profile.linkedinText} onChange={(e) => setProfile({ ...profile, linkedinText: e.target.value })} rows={7} placeholder="Paste only what you approve for this experiment." /></label>
          </div>
          <button className={styles.secondaryButton} type="button" onClick={applyLinkedInBasics}>Apply public profile basics</button>
          <div className={styles.uploadBox}>
            <div className={styles.uploadPreview} style={profile.headshot ? { backgroundImage: `url(${profile.headshot})` } : undefined}>
              {!profile.headshot && <span>PHOTO</span>}
            </div>
            <div>
              <strong>Upload the portrait used on the card</strong>
              <p>A downloaded LinkedIn profile photo or another image you own works. It is cropped and stored locally.</p>
              <label className={styles.fileButton}>Choose portrait<input type="file" accept="image/*" onChange={handlePortrait} /></label>
              {profile.headshot && <button className={styles.textButton} type="button" onClick={() => setProfile({ ...profile, headshot: "" })}>Remove portrait</button>}
            </div>
          </div>
        </article>

        <article className={styles.panel}>
          <span className={styles.step}>STEP 2</span>
          <h2>Set the AI relationship</h2>
          <div className={styles.formGrid}>
            <label>AI provider<select value={profile.provider} onChange={(e) => setProfile({ ...profile, provider: e.target.value })}><option>ChatGPT</option><option>Claude</option><option>Gemini</option><option>Copilot</option><option>Grok</option><option>Perplexity</option><option>Other</option></select></label>
            <label>Model<input value={profile.model} onChange={(e) => setProfile({ ...profile, model: e.target.value })} placeholder="Optional" /></label>
            <label>AI name<input value={profile.aiName} onChange={(e) => setProfile({ ...profile, aiName: e.target.value })} /></label>
            <label>Who named it?<select value={profile.namedBy} onChange={(e) => setProfile({ ...profile, namedBy: e.target.value })}><option value="not-named">Not named</option><option value="human">Human</option><option value="ai">AI</option><option value="together">Together</option></select></label>
            <label>Relationship frame<select value={profile.relationship} onChange={(e) => setProfile({ ...profile, relationship: e.target.value })}><option>Assistant</option><option>Advisor</option><option>Collaborator</option><option>Coach</option><option>Company</option><option>Other</option></select></label>
            <label>Test condition<select value={profile.contextMode} onChange={(e) => setProfile({ ...profile, contextMode: e.target.value })}><option value="fresh">Fresh / cold chat</option><option value="familiar">Familiar AI</option><option value="full-spectrum">Full-spectrum / loaded context</option><option value="portable-context">Portable context loaded</option><option value="cross-model">Cross-model comparison</option></select></label>
            <label>Number of roles / agents<input value={profile.agentCount} onChange={(e) => setProfile({ ...profile, agentCount: e.target.value })} /></label>
            <label>Relationship age<input value={profile.relationshipAge} onChange={(e) => setProfile({ ...profile, relationshipAge: e.target.value })} /></label>
          </div>
        </article>

        <article className={`${styles.panel} ${styles.fullPanel}`}>
          <span className={styles.step}>STEP 3</span>
          <h2>Copy the evidence-bound prompt</h2>
          <textarea className={styles.codeBox} value={prompt} readOnly rows={18} />
          <button className={styles.primaryButton} type="button" onClick={copyPrompt}>Copy prompt</button>
        </article>

        <article className={`${styles.panel} ${styles.fullPanel}`}>
          <span className={styles.step}>STEP 4</span>
          <h2>Paste the AI response</h2>
          <textarea className={styles.codeBox} value={rawJson} onChange={(e) => setRawJson(e.target.value)} rows={18} placeholder="Paste valid JSON here." />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttonRow}>
            <button className={styles.primaryButton} type="button" onClick={importJson}>Load card data</button>
            <button className={styles.secondaryButton} type="button" onClick={loadSample}>Load sample</button>
          </div>
        </article>
      </section>

      {cardData && humanCard && aiCard && (
        <section className={styles.results}>
          <div className={styles.resultsHeader}>
            <span className={styles.step}>STEP 5</span>
            <h2>Review the public card copy</h2>
            <p>Keep the card visual. Put the long evidence receipt in the exported JSON, not on the poster.</p>
          </div>
          <div className={styles.editGrid}>
            {(["human_card", "ai_card"] as const).map((kind) => {
              const card = cardData[kind];
              const label = kind === "human_card" ? "Human" : "AI";
              return (
                <article className={styles.editPanel} key={kind}>
                  <h3>{label} card</h3>
                  <label>Name<input value={card.name} onChange={(e) => updateCard(kind, "name", e.target.value)} /></label>
                  <label>Call sign<input value={card.call_sign} onChange={(e) => updateCard(kind, "call_sign", e.target.value)} /></label>
                  <label>Role<textarea value={card.current_role} onChange={(e) => updateCard(kind, "current_role", e.target.value)} rows={3} /></label>
                  <label>Archetype<input value={card.archetype} onChange={(e) => updateCard(kind, "archetype", e.target.value)} /></label>
                  <label>Signature move<textarea value={card.signature_move} onChange={(e) => updateCard(kind, "signature_move", e.target.value)} rows={3} /></label>
                  <div className={styles.statEditor}>
                    {Array.from({ length: 4 }).map((_, index) => {
                      const stat = card.public_stats[index] || { label: "STAT", value: "UNKNOWN" };
                      return (
                        <div key={index}>
                          <input aria-label={`${label} stat ${index + 1} label`} value={stat.label} onChange={(e) => updateStat(kind, index, "label", e.target.value)} />
                          <input aria-label={`${label} stat ${index + 1} value`} value={stat.value} onChange={(e) => updateStat(kind, index, "value", e.target.value)} />
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

          <div className={styles.exportBar}>
            <div>
              <span className={styles.step}>STEP 6</span>
              <h2>Export the cinematic doubleheader</h2>
              <p>1080 × 1350 individual cards or one 2160 × 1350 two-card image.</p>
            </div>
            <div className={styles.buttonRow}>
              <button className={styles.goldButton} type="button" onClick={() => exportPoster("human")}>Download human card</button>
              <button className={styles.cyanButton} type="button" onClick={() => exportPoster("ai")}>Download AI card</button>
              <button className={styles.primaryButton} type="button" onClick={exportDoubleheader}>Download card pair</button>
            </div>
          </div>
        </section>
      )}

      <footer className={styles.footer}>
        <strong>NULLWORKS</strong>
        <span>Public profile text and portraits remain local to this browser. Human review remains final.</span>
      </footer>
    </main>
  );
}
