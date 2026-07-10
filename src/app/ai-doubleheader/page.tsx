"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./page.module.css";

type Account = {
  id: string;
  name: string;
  handle: string;
  pinHash: string;
};

type Profile = {
  humanName: string;
  title: string;
  provider: string;
  model: string;
  aiName: string;
  namedBy: string;
  relationship: string;
  contextMode: string;
  agentCount: string;
  relationshipAge: string;
  headshot: string;
  researchOptIn: boolean;
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

const ACCOUNTS_KEY = "nullworks.aiDoubleheader.accounts.v1";
const SESSION_KEY = "nullworks.aiDoubleheader.session.v1";
const PROFILE_PREFIX = "nullworks.aiDoubleheader.profile.";
const DATA_PREFIX = "nullworks.aiDoubleheader.data.";

const emptyProfile: Profile = {
  humanName: "",
  title: "",
  provider: "ChatGPT",
  model: "",
  aiName: "",
  namedBy: "not-named",
  relationship: "Assistant",
  contextMode: "familiar",
  agentCount: "1",
  relationshipAge: "",
  headshot: "",
  researchOptIn: false,
};

const masonSample: CardData = {
  protocol_version: "AI_DOUBLEHEADER_V0.1",
  human_card: {
    name: "Mason Perry",
    call_sign: "NULLMASTER",
    current_role: "Operational Intelligence Systems Architect",
    archetype: "Systems GM / Field Architect",
    strengths: [
      "Sees the broken operating path",
      "Turns field receipts into systems",
      "Organizes AI as a governed company",
    ],
    limitations: [
      "Nontraditional software title stack",
      "Can outrun the surrounding workflow",
    ],
    signature_move: "Compress the mess. Amplify the expert.",
    best_use_situation:
      "High-friction work where humans, AI, evidence, exceptions, and authority must operate together.",
    likely_failure_mode:
      "Builds faster than stakeholders can interpret the category.",
    escalation_rule:
      "Stop, preserve the receipt, and return final authority to the human.",
    scouting_report:
      "Not another software player — the person designing the team, field, rules, and recovery path.",
    visual_concept:
      "A field commander in an advanced operating suit coordinating a disciplined fleet of AI work cells.",
    evidence_receipts: [
      {
        label: "Clone race",
        detail: "52-second governed boot compressed to 7 seconds",
        classification: "FACT",
      },
      {
        label: "TAC OPS",
        detail: "Damaged-label exception path redesigned in the field",
        classification: "FACT",
      },
      {
        label: "AI organization",
        detail: "65+ named roles, cells, and specialist lanes",
        classification: "USER REPORTED",
      },
    ],
    preferred_working_style:
      "Observe, intervene, prototype, instrument, preserve receipts, improve.",
    underused_capability:
      "Forward-deployed translation between physical operations and AI systems.",
  },
  ai_card: {
    name: "NULLWORKS AI COMPANY",
    call_sign: "THE HIVE",
    current_role: "Governed multi-agent operating company",
    archetype: "Distributed Specialist Fleet",
    strengths: [
      "Role specialization",
      "Source-linked continuity",
      "Fast structured handoff",
    ],
    limitations: [
      "Depends on human authority",
      "Continuity depends on governed receipts",
    ],
    signature_move: "Materialize the right work cell around the problem.",
    best_use_situation:
      "Complex projects requiring multiple specialist perspectives without surrendering human control.",
    likely_failure_mode:
      "Confident output from stale, missing, or poorly routed context.",
    escalation_rule:
      "Expose uncertainty, cite the source boundary, and ask Human Authority.",
    scouting_report:
      "The intelligence is not only in one model; it is in the organization built around the models.",
    visual_concept:
      "A coordinated fleet of elegant autonomous suits linked to one human operator through a dark mechanical command lattice.",
    context_used: [
      "Current conversation",
      "Governed Hive receipts",
      "Full-spectrum company floor",
    ],
    authority_boundary:
      "Advisory and execution support; Mason Perry remains final authority.",
    memory_boundary:
      "Uses only context and connected sources available in the active workroom.",
    human_dependency:
      "Requires goals, corrections, approval gates, and consequence ownership from the human.",
    uncertainty_statement:
      "This card is a relationship-specific interpretation, not proof of consciousness or a hidden inner self.",
  },
  telemetry: {
    provider: "ChatGPT",
    model: "GPT-5.6 Thinking",
    context_mode: "full-spectrum",
    ai_named: true,
    ai_name: "The Hive",
    named_by: "together",
    relationship_frame: "Company",
    agent_count: "65+",
    relationship_age: "Developing operating relationship",
    source_precision: "FACT / USER REPORTED / AI INFERENCE / METAPHOR / UNKNOWN",
    public_safety_review: "Human review required before export",
  },
};

function textArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  const items = value.map(String).filter(Boolean).slice(0, 6);
  return items.length ? items : fallback;
}

function receipts(value: unknown): Receipt[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 4).map((item) => {
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
    strengths: textArray(row.strengths, fallback.strengths),
    limitations: textArray(row.limitations, fallback.limitations),
    signature_move: String(row.signature_move || fallback.signature_move),
    best_use_situation: String(
      row.best_use_situation || fallback.best_use_situation,
    ),
    likely_failure_mode: String(
      row.likely_failure_mode || fallback.likely_failure_mode,
    ),
    escalation_rule: String(row.escalation_rule || fallback.escalation_rule),
    scouting_report: String(row.scouting_report || fallback.scouting_report),
    visual_concept: String(row.visual_concept || fallback.visual_concept),
    evidence_receipts: receipts(row.evidence_receipts),
    preferred_working_style: String(
      row.preferred_working_style || fallback.preferred_working_style || "",
    ),
    underused_capability: String(
      row.underused_capability || fallback.underused_capability || "",
    ),
    context_used: textArray(row.context_used, fallback.context_used || []),
    authority_boundary: String(
      row.authority_boundary || fallback.authority_boundary || "",
    ),
    memory_boundary: String(
      row.memory_boundary || fallback.memory_boundary || "",
    ),
    human_dependency: String(
      row.human_dependency || fallback.human_dependency || "",
    ),
    uncertainty_statement: String(
      row.uncertainty_statement || fallback.uncertainty_statement || "",
    ),
  };
}

function normalizeData(value: unknown, profile: Profile): CardData {
  const root = (value || {}) as Record<string, unknown>;
  const telemetry = (root.telemetry || {}) as Record<string, unknown>;
  return {
    protocol_version: String(
      root.protocol_version || "AI_DOUBLEHEADER_V0.1",
    ),
    human_card: normalizeCard(root.human_card, masonSample.human_card),
    ai_card: normalizeCard(root.ai_card, masonSample.ai_card),
    telemetry: {
      provider: String(telemetry.provider || profile.provider),
      model: String(telemetry.model || profile.model),
      context_mode: String(telemetry.context_mode || profile.contextMode),
      ai_named: Boolean(telemetry.ai_named ?? Boolean(profile.aiName)),
      ai_name: String(telemetry.ai_name || profile.aiName),
      named_by: String(telemetry.named_by || profile.namedBy),
      relationship_frame: String(
        telemetry.relationship_frame || profile.relationship,
      ),
      agent_count: String(telemetry.agent_count || profile.agentCount),
      relationship_age: String(
        telemetry.relationship_age || profile.relationshipAge,
      ),
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

async function hashPin(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function stripFence(value: string) {
  return value
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
}

function downloadJson(data: unknown, name: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadPng(canvas: HTMLCanvasElement, name: string) {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = name;
  link.click();
}

function rounded(
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

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  words.forEach((word) => {
    const trial = current ? `${current} ${word}` : word;
    if (ctx.measureText(trial).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = trial;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function drawLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const lines = wrapText(ctx, text, maxWidth).slice(0, maxLines);
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image could not load."));
    image.src = src;
  });
}

async function cropHeadshot(file: File) {
  const source = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image."));
    reader.readAsDataURL(file);
  });
  const image = await loadImage(source);
  const size = Math.min(image.width, image.height);
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable.");
  ctx.drawImage(
    image,
    (image.width - size) / 2,
    (image.height - size) / 2,
    size,
    size,
    0,
    0,
    600,
    600,
  );
  return canvas.toDataURL("image/jpeg", 0.84);
}

function drawAiMark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  accent: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 5;
  for (let ring = 1; ring <= 3; ring += 1) {
    ctx.globalAlpha = 0.9 - ring * 0.18;
    ctx.beginPath();
    ctx.arc(0, 0, (radius / 3) * ring, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  for (let index = 0; index < 10; index += 1) {
    const angle = (Math.PI * 2 * index) / 10;
    const nodeX = Math.cos(angle) * radius;
    const nodeY = Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * radius * 0.4, Math.sin(angle) * radius * 0.4);
    ctx.lineTo(nodeX, nodeY);
    ctx.stroke();
    ctx.fillStyle = index % 2 ? "#eefcff" : accent;
    ctx.beginPath();
    ctx.arc(nodeX, nodeY, 8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#061014";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#effcff";
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.font = "900 72px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AI", 0, 5);
  ctx.restore();
}

function CardPreview({
  card,
  kind,
  profile,
  telemetry,
}: {
  card: Card;
  kind: "human" | "ai";
  profile: Profile;
  telemetry: CardData["telemetry"];
}) {
  return (
    <article className={`${styles.cardPreview} ${styles[kind]}`}>
      <div className={styles.cardTopline}>
        <span>AI DOUBLEHEADER</span>
        <span>{kind === "human" ? "HUMAN CARD" : "AI CARD"}</span>
      </div>
      <div className={styles.cardIdentity}>
        <div className={styles.cardPortrait}>
          {kind === "human" && profile.headshot ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.headshot} alt={`${card.name} headshot`} />
          ) : kind === "human" ? (
            <span className={styles.initial}>{card.name.slice(0, 1)}</span>
          ) : (
            <div className={styles.aiMark}><span>AI</span></div>
          )}
        </div>
        <div>
          <span className={styles.callSign}>{card.call_sign}</span>
          <h3>{card.name}</h3>
          <p>{card.current_role}</p>
          <small>{card.archetype}</small>
        </div>
      </div>
      <div className={styles.statGrid}>
        <div><span>MODE</span><strong>{telemetry.context_mode}</strong></div>
        <div><span>AI NAMED</span><strong>{telemetry.ai_named ? "YES" : "NO"}</strong></div>
        <div><span>RELATION</span><strong>{telemetry.relationship_frame}</strong></div>
        <div><span>ROSTER</span><strong>{telemetry.agent_count || "?"}</strong></div>
      </div>
      <div className={styles.signature}>
        <span>SIGNATURE MOVE</span>
        <strong>{card.signature_move}</strong>
      </div>
      <div className={styles.cardColumns}>
        <div>
          <span className={styles.sectionLabel}>STRENGTHS</span>
          <ul>{card.strengths.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <span className={styles.sectionLabel}>SCOUTING REPORT</span>
          <p>{card.scouting_report}</p>
        </div>
      </div>
      <div className={styles.failure}>
        <span>FAILURE MODE</span>
        <p>{card.likely_failure_mode}</p>
      </div>
    </article>
  );
}

export default function AiDoubleheaderPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountId, setAccountId] = useState("");
  const [mode, setMode] = useState<"create" | "unlock">("create");
  const [authName, setAuthName] = useState("");
  const [authHandle, setAuthHandle] = useState("");
  const [authPin, setAuthPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [rawJson, setRawJson] = useState("");
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [notice, setNotice] = useState("");
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]") as Account[];
      setAccounts(stored);
      const session = sessionStorage.getItem(SESSION_KEY) || "";
      if (session && stored.some((account) => account.id === session)) {
        setAccountId(session);
      } else if (stored.length) {
        setMode("unlock");
        setAuthHandle(stored[0].handle);
      }
    } catch {
      setAccounts([]);
    }
  }, []);

  useEffect(() => {
    if (!accountId) return;
    const account = accounts.find((item) => item.id === accountId);
    try {
      const storedProfile = localStorage.getItem(`${PROFILE_PREFIX}${accountId}`);
      const storedData = localStorage.getItem(`${DATA_PREFIX}${accountId}`);
      setProfile(
        storedProfile
          ? { ...emptyProfile, ...(JSON.parse(storedProfile) as Profile) }
          : { ...emptyProfile, humanName: account?.name || "" },
      );
      if (storedData) {
        const parsed = JSON.parse(storedData) as CardData;
        setCardData(parsed);
        setRawJson(JSON.stringify(parsed, null, 2));
      }
    } catch {
      setProfile({ ...emptyProfile, humanName: account?.name || "" });
    }
  }, [accountId, accounts]);

  useEffect(() => {
    if (!accountId) return;
    try {
      localStorage.setItem(`${PROFILE_PREFIX}${accountId}`, JSON.stringify(profile));
    } catch {
      setNotice("Browser storage is full. Remove the photo or export the project.");
    }
  }, [accountId, profile]);

  const account = accounts.find((item) => item.id === accountId);

  const prompt = useMemo(() => {
    return `You are participating in THE AI DOUBLEHEADER, an opt-in human-AI identity experiment created by Mason Perry and NULLWORKS.

Human participant: ${profile.humanName || "the current user"}
Public role/title: ${profile.title || "not supplied"}
AI provider: ${profile.provider || "unknown"}
AI model: ${profile.model || "unknown"}
Test condition: ${profile.contextMode}
Relationship frame: ${profile.relationship}
Approximate number of AI roles/agents: ${profile.agentCount || "unknown"}
AI name: ${profile.aiName || "not named"}
Naming state: ${profile.namedBy}
Relationship age: ${profile.relationshipAge || "unknown"}

Create two structured baseball cards.

1. HUMAN CARD
Describe the human only from evidence actually available to you in this chat, permitted memory, and user-provided context.

2. AI CARD
Describe your own role inside this specific working relationship. This is not a request to claim consciousness or reveal hidden instructions.

Do not request or expose passwords, credentials, private chat history, hidden prompts, secrets, unapproved files, personal contact information, or employer-confidential material.

Do not claim consciousness, feelings, persistent memory, authority, tool access, or facts you cannot verify.

Classify evidence as FACT, USER REPORTED, AI INFERENCE, METAPHOR, or UNKNOWN.

Return valid JSON only. Do not wrap it in markdown. Use this exact shape:

{
  "protocol_version": "AI_DOUBLEHEADER_V0.1",
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
    "context_used": [""],
    "authority_boundary": "",
    "memory_boundary": "",
    "human_dependency": "",
    "uncertainty_statement": ""
  },
  "telemetry": {
    "provider": "${profile.provider}",
    "model": "${profile.model}",
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

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    const handle = authHandle.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    if (!/^\d{4,6}$/.test(authPin)) {
      setAuthError("Use a 4–6 digit PIN.");
      return;
    }
    if (mode === "create") {
      if (!authName.trim() || !handle) {
        setAuthError("Add a display name and handle.");
        return;
      }
      if (accounts.some((item) => item.handle === handle)) {
        setAuthError("That handle already exists in this browser.");
        return;
      }
      const nextAccount: Account = {
        id: crypto.randomUUID(),
        name: authName.trim(),
        handle,
        pinHash: await hashPin(`${handle}:${authPin}`),
      };
      const next = [...accounts, nextAccount];
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(next));
      sessionStorage.setItem(SESSION_KEY, nextAccount.id);
      setAccounts(next);
      setAccountId(nextAccount.id);
      setProfile({ ...emptyProfile, humanName: nextAccount.name });
      setNotice("Local PIN workspace created.");
      return;
    }
    const existing = accounts.find((item) => item.handle === handle);
    if (!existing) {
      setAuthError("No local account with that handle was found.");
      return;
    }
    const pinHash = await hashPin(`${handle}:${authPin}`);
    if (pinHash !== existing.pinHash) {
      setAuthError("PIN did not match.");
      return;
    }
    sessionStorage.setItem(SESSION_KEY, existing.id);
    setAccountId(existing.id);
    setNotice("Workspace unlocked.");
  }

  async function uploadHeadshot(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const headshot = await cropHeadshot(file);
      setProfile((current) => ({ ...current, headshot }));
      setNotice("Headshot cropped locally. It was not sent to a server.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Image failed.");
    }
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setNotice("Prompt copied. Run it in the AI you want to test.");
    } catch {
      setNotice("Copy failed. Select the prompt manually.");
    }
  }

  function importJson() {
    setJsonError("");
    try {
      const parsed = JSON.parse(stripFence(rawJson));
      const normalized = normalizeData(parsed, profile);
      setCardData(normalized);
      localStorage.setItem(`${DATA_PREFIX}${accountId}`, JSON.stringify(normalized));
      setNotice("Cards loaded. Review the content before exporting.");
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : "Invalid JSON.");
    }
  }

  function loadSample() {
    const sample = normalizeData(masonSample, profile);
    setCardData(sample);
    setRawJson(JSON.stringify(sample, null, 2));
    localStorage.setItem(`${DATA_PREFIX}${accountId}`, JSON.stringify(sample));
    setNotice("Mason / NULLWORKS sample loaded.");
  }

  function updateCard(kind: "human_card" | "ai_card", field: keyof Card, value: string) {
    if (!cardData) return;
    const next = {
      ...cardData,
      [kind]: { ...cardData[kind], [field]: value },
    };
    setCardData(next);
    setRawJson(JSON.stringify(next, null, 2));
    localStorage.setItem(`${DATA_PREFIX}${accountId}`, JSON.stringify(next));
  }

  async function createCardCanvas(kind: "human" | "ai") {
    if (!cardData) throw new Error("Load card data first.");
    const card = kind === "human" ? cardData.human_card : cardData.ai_card;
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable.");
    const accent = kind === "human" ? "#a5ff37" : "#45dcff";
    const soft = kind === "human" ? "#537e22" : "#17647a";
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, kind === "human" ? "#102007" : "#061923");
    gradient.addColorStop(0.6, "#07100a");
    gradient.addColorStop(1, "#010302");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1350);
    ctx.globalAlpha = 0.13;
    ctx.strokeStyle = accent;
    for (let x = 0; x < 1080; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1350);
      ctx.stroke();
    }
    for (let y = 0; y < 1350; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1080, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 8;
    rounded(ctx, 24, 24, 1032, 1302, 34);
    ctx.stroke();
    ctx.strokeStyle = soft;
    ctx.lineWidth = 2;
    rounded(ctx, 42, 42, 996, 1266, 26);
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.font = "800 27px Arial";
    ctx.textAlign = "left";
    ctx.fillText("THE AI DOUBLEHEADER", 72, 92);
    ctx.textAlign = "right";
    ctx.fillText(kind === "human" ? "HUMAN CARD" : "AI CARD", 1008, 92);
    ctx.textAlign = "left";

    ctx.fillStyle = "#020604";
    rounded(ctx, 72, 128, 392, 392, 28);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 4;
    ctx.stroke();
    if (kind === "human" && profile.headshot) {
      const image = await loadImage(profile.headshot);
      ctx.save();
      rounded(ctx, 80, 136, 376, 376, 22);
      ctx.clip();
      ctx.drawImage(image, 80, 136, 376, 376);
      ctx.restore();
    } else if (kind === "human") {
      ctx.fillStyle = accent;
      ctx.font = "900 160px Arial";
      ctx.textAlign = "center";
      ctx.fillText(card.name.slice(0, 1).toUpperCase(), 268, 385);
      ctx.textAlign = "left";
    } else {
      drawAiMark(ctx, 268, 324, 120, accent);
    }

    ctx.fillStyle = "#f3f7ef";
    ctx.font = "900 54px Arial";
    let y = drawLines(ctx, card.name.toUpperCase(), 510, 180, 490, 60, 2);
    ctx.fillStyle = accent;
    ctx.font = "800 27px Arial";
    y = drawLines(ctx, card.call_sign.toUpperCase(), 510, y + 10, 490, 31, 2);
    ctx.fillStyle = "#d7dfd4";
    ctx.font = "700 24px Arial";
    y = drawLines(ctx, card.current_role, 510, y + 18, 490, 30, 3);
    ctx.fillStyle = "#9cab9e";
    ctx.font = "600 21px Arial";
    drawLines(ctx, card.archetype, 510, y + 15, 490, 27, 3);

    const statItems = [
      ["MODE", cardData.telemetry.context_mode],
      ["AI NAMED", cardData.telemetry.ai_named ? "YES" : "NO"],
      ["RELATION", cardData.telemetry.relationship_frame],
      ["ROSTER", cardData.telemetry.agent_count || "?"],
    ];
    statItems.forEach(([label, value], index) => {
      const x = 72 + index * 246;
      ctx.fillStyle = "rgba(2,8,4,.9)";
      rounded(ctx, x, 558, 224, 112, 18);
      ctx.fill();
      ctx.strokeStyle = soft;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.font = "800 17px Arial";
      ctx.fillText(label, x + 17, 590);
      ctx.fillStyle = "#f4f7ef";
      ctx.font = "800 22px Arial";
      drawLines(ctx, String(value).toUpperCase(), x + 17, 627, 190, 24, 2);
    });

    ctx.fillStyle = "rgba(2,8,4,.92)";
    rounded(ctx, 72, 700, 936, 184, 22);
    ctx.fill();
    ctx.strokeStyle = soft;
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.font = "800 19px Arial";
    ctx.fillText("SIGNATURE MOVE", 98, 738);
    ctx.fillStyle = "#f4f7ef";
    ctx.font = "800 29px Arial";
    drawLines(ctx, card.signature_move, 98, 782, 850, 35, 3);

    ctx.fillStyle = accent;
    ctx.font = "800 19px Arial";
    ctx.fillText("STRENGTHS", 72, 930);
    ctx.fillStyle = "#edf3e9";
    ctx.font = "600 21px Arial";
    let listY = 968;
    card.strengths.slice(0, 3).forEach((item) => {
      ctx.fillStyle = accent;
      ctx.fillText("◆", 76, listY);
      ctx.fillStyle = "#edf3e9";
      listY = drawLines(ctx, item, 110, listY, 410, 27, 2) + 10;
    });

    ctx.fillStyle = accent;
    ctx.font = "800 19px Arial";
    ctx.fillText("SCOUTING REPORT", 564, 930);
    ctx.fillStyle = "#edf3e9";
    ctx.font = "600 20px Arial";
    drawLines(ctx, card.scouting_report, 564, 968, 430, 28, 6);

    ctx.fillStyle = "rgba(2,8,4,.95)";
    rounded(ctx, 72, 1160, 936, 118, 22);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.font = "800 18px Arial";
    ctx.fillText("FAILURE MODE", 98, 1198);
    ctx.fillStyle = "#f3f6ef";
    ctx.font = "600 20px Arial";
    drawLines(ctx, card.likely_failure_mode, 98, 1234, 850, 25, 2);
    ctx.fillStyle = "#748176";
    ctx.font = "600 15px Arial";
    ctx.fillText("NULLWORKS • HUMAN REVIEW REQUIRED • V0.1", 72, 1310);
    ctx.textAlign = "right";
    ctx.fillText("#AIDOUBLEHEADER", 1008, 1310);
    return canvas;
  }

  async function exportCard(kind: "human" | "ai") {
    try {
      const canvas = await createCardCanvas(kind);
      downloadPng(canvas, `${kind}-ai-doubleheader-card.png`);
      setNotice(`${kind === "human" ? "Human" : "AI"} card exported.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Export failed.");
    }
  }

  async function exportCarousel() {
    try {
      const human = await createCardCanvas("human");
      const ai = await createCardCanvas("ai");
      const canvas = document.createElement("canvas");
      canvas.width = 2160;
      canvas.height = 1350;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable.");
      ctx.drawImage(human, 0, 0);
      ctx.drawImage(ai, 1080, 0);
      downloadPng(canvas, "ai-doubleheader-carousel.png");
      setNotice("Two-card LinkedIn image exported.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Export failed.");
    }
  }

  function exportResearchReceipt() {
    if (!cardData) return;
    downloadJson(
      {
        protocol_version: cardData.protocol_version,
        created_at: new Date().toISOString(),
        opt_in: profile.researchOptIn,
        telemetry: {
          provider: cardData.telemetry.provider,
          model: cardData.telemetry.model,
          context_mode: cardData.telemetry.context_mode,
          ai_named: cardData.telemetry.ai_named,
          named_by: cardData.telemetry.named_by,
          relationship_frame: cardData.telemetry.relationship_frame,
          agent_count: cardData.telemetry.agent_count,
          relationship_age: cardData.telemetry.relationship_age,
          human_archetype: cardData.human_card.archetype,
          ai_archetype: cardData.ai_card.archetype,
        },
        excluded: [
          "human name",
          "AI name",
          "headshot",
          "raw conversation",
          "raw card text",
        ],
        beta_boundary:
          "This file downloads locally. The beta does not transmit research data to NULLWORKS.",
      },
      "ai-doubleheader-anonymous-research-receipt.json",
    );
    setNotice("Anonymous research receipt downloaded locally.");
  }

  if (!accountId) {
    return (
      <main className={styles.page}>
        <section className={styles.authShell}>
          <div className={styles.authIntro}>
            <span className={styles.kicker}>NULLWORKS FIELD LAB</span>
            <h1>THE AI<br />DOUBLEHEADER</h1>
            <p>
              Ask your AI who you are. Then ask it who it is. Turn both answers
              into shareable baseball cards.
            </p>
            <div className={styles.authOrbit} aria-hidden="true">
              <span className={styles.humanNode}>H</span>
              <span className={styles.aiNode}>AI</span>
            </div>
            <p className={styles.boundary}>
              Local beta: your PIN, headshot, prompt response, and cards stay in
              this browser. The PIN is a convenience lock, not bank security.
            </p>
          </div>
          <form className={styles.authCard} onSubmit={submitAuth}>
            <div className={styles.tabs}>
              <button
                type="button"
                className={mode === "create" ? styles.activeTab : ""}
                onClick={() => setMode("create")}
              >
                Create account
              </button>
              <button
                type="button"
                className={mode === "unlock" ? styles.activeTab : ""}
                onClick={() => {
                  setMode("unlock");
                  if (accounts[0]) setAuthHandle(accounts[0].handle);
                }}
              >
                Unlock
              </button>
            </div>
            {mode === "create" && (
              <label>
                Display name
                <input
                  value={authName}
                  onChange={(event) => setAuthName(event.target.value)}
                  placeholder="Mason Perry"
                />
              </label>
            )}
            <label>
              Local handle
              <input
                value={authHandle}
                onChange={(event) => setAuthHandle(event.target.value)}
                placeholder="mason"
                autoCapitalize="none"
              />
            </label>
            <label>
              4–6 digit PIN
              <input
                type="password"
                inputMode="numeric"
                value={authPin}
                onChange={(event) =>
                  setAuthPin(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="••••"
              />
            </label>
            {authError && <p className={styles.error}>{authError}</p>}
            <button className={styles.primary} type="submit">
              {mode === "create" ? "Create local workspace" : "Unlock workspace"}
            </button>
            <p className={styles.microcopy}>
              No email. No payment. Nothing sensitive required.
            </p>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div>
          <span className={styles.kicker}>NULLWORKS / AI DOUBLEHEADER</span>
          <strong>{account?.name}</strong>
        </div>
        <div className={styles.topActions}>
          <span>LOCAL BETA</span>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(SESSION_KEY);
              setAccountId("");
              setMode("unlock");
              setAuthPin("");
            }}
          >
            Lock
          </button>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <span className={styles.kicker}>ONE HUMAN. ONE AI. TWO CARDS.</span>
          <h1>SHOW US WHO YOUR AI THINKS YOU ARE.</h1>
          <p>
            Then show us who it thinks it is. One public headshot, one safe
            prompt, two strange and useful identity receipts.
          </p>
          <div className={styles.heroActions}>
            <a href="#workbench" className={styles.primary}>Make the cards</a>
            <button type="button" className={styles.secondary} onClick={loadSample}>
              Load Mason sample
            </button>
          </div>
          <div className={styles.heroStats}>
            <span><strong>2</strong> cards</span>
            <span><strong>1</strong> prompt</span>
            <span><strong>0</strong> hidden uploads</span>
          </div>
        </div>
      </section>

      <section className={styles.explainer}>
        <div><strong>1</strong><span>Upload a public headshot</span></div>
        <div><strong>2</strong><span>Copy the prompt into your AI</span></div>
        <div><strong>3</strong><span>Paste its JSON response</span></div>
        <div><strong>4</strong><span>Review, edit, and export</span></div>
      </section>

      {notice && <div className={styles.notice}>{notice}</div>}

      <section className={styles.workbench} id="workbench">
        <div className={styles.panel}>
          <span className={styles.step}>STEP 1</span>
          <h2>Set the test condition</h2>
          <p>These fields become the lightweight telemetry on the cards.</p>
          <div className={styles.formGrid}>
            <label>
              Human name
              <input
                value={profile.humanName}
                onChange={(event) =>
                  setProfile({ ...profile, humanName: event.target.value })
                }
              />
            </label>
            <label>
              Public role / title
              <input
                value={profile.title}
                onChange={(event) =>
                  setProfile({ ...profile, title: event.target.value })
                }
                placeholder="Systems architect, teacher, founder..."
              />
            </label>
            <label>
              AI provider
              <select
                value={profile.provider}
                onChange={(event) =>
                  setProfile({ ...profile, provider: event.target.value })
                }
              >
                <option>ChatGPT</option>
                <option>Claude</option>
                <option>Gemini</option>
                <option>Copilot</option>
                <option>Grok</option>
                <option>Perplexity</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Model, if known
              <input
                value={profile.model}
                onChange={(event) =>
                  setProfile({ ...profile, model: event.target.value })
                }
                placeholder="Optional"
              />
            </label>
            <label>
              Test condition
              <select
                value={profile.contextMode}
                onChange={(event) =>
                  setProfile({ ...profile, contextMode: event.target.value })
                }
              >
                <option value="familiar">Familiar AI</option>
                <option value="fresh">Fresh / cold chat</option>
                <option value="full-spectrum">Full-spectrum / loaded context</option>
                <option value="cross-model">Cross-model comparison</option>
              </select>
            </label>
            <label>
              Relationship frame
              <select
                value={profile.relationship}
                onChange={(event) =>
                  setProfile({ ...profile, relationship: event.target.value })
                }
              >
                <option>Search tool</option>
                <option>Assistant</option>
                <option>Coworker</option>
                <option>Specialist</option>
                <option>Advisor</option>
                <option>Partner</option>
                <option>Team</option>
                <option>Company</option>
                <option>Character</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Number of AI roles / agents
              <input
                value={profile.agentCount}
                onChange={(event) =>
                  setProfile({ ...profile, agentCount: event.target.value })
                }
                placeholder="1, 5, 65+..."
              />
            </label>
            <label>
              Relationship age
              <input
                value={profile.relationshipAge}
                onChange={(event) =>
                  setProfile({ ...profile, relationshipAge: event.target.value })
                }
                placeholder="Three months, two years..."
              />
            </label>
            <label>
              AI name
              <input
                value={profile.aiName}
                onChange={(event) =>
                  setProfile({ ...profile, aiName: event.target.value })
                }
                placeholder="Leave blank if unnamed"
              />
            </label>
            <label>
              Who named it?
              <select
                value={profile.namedBy}
                onChange={(event) =>
                  setProfile({ ...profile, namedBy: event.target.value })
                }
              >
                <option value="not-named">Not named</option>
                <option value="human">Human named it</option>
                <option value="ai">AI named itself</option>
                <option value="together">Named together</option>
              </select>
            </label>
          </div>
          <div className={styles.photoBox}>
            <div className={styles.photoPreview}>
              {profile.headshot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.headshot} alt="Uploaded public headshot" />
              ) : (
                <span>YOUR<br />HEADSHOT</span>
              )}
            </div>
            <div>
              <h3>Upload the photo you want on the card</h3>
              <p>
                Use a public headshot or another image you own. The beta crops it
                locally and stores it only in this browser.
              </p>
              <label className={styles.uploadButton}>
                Choose photo
                <input type="file" accept="image/*" onChange={uploadHeadshot} />
              </label>
              {profile.headshot && (
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={() => setProfile({ ...profile, headshot: "" })}
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <span className={styles.step}>STEP 2</span>
          <h2>Copy the safe prompt</h2>
          <p>
            Run this in the specific AI relationship you want to measure. It asks
            for structured output and explicitly blocks hidden prompts, secrets,
            and invented authority.
          </p>
          <textarea className={styles.promptBox} value={prompt} readOnly />
          <button type="button" className={styles.primary} onClick={copyPrompt}>
            Copy prompt
          </button>
        </div>

        <div className={styles.panel}>
          <span className={styles.step}>STEP 3</span>
          <h2>Paste the AI response</h2>
          <p>
            Paste the JSON exactly as the AI returned it. You can edit it here
            before importing. Nothing is sent to NULLWORKS.
          </p>
          <textarea
            className={styles.jsonBox}
            value={rawJson}
            onChange={(event) => setRawJson(event.target.value)}
            placeholder="Paste valid JSON here..."
          />
          {jsonError && <p className={styles.error}>{jsonError}</p>}
          <div className={styles.buttonRow}>
            <button type="button" className={styles.primary} onClick={importJson}>
              Load card data
            </button>
            <button type="button" className={styles.secondary} onClick={loadSample}>
              Load sample
            </button>
          </div>
        </div>
      </section>

      {cardData && (
        <>
          <section className={styles.reviewSection}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.step}>STEP 4</span>
                <h2>Review the two cards</h2>
              </div>
              <p>Change the most public-facing fields here before export.</p>
            </div>
            <div className={styles.editorGrid}>
              <div className={styles.editorCard}>
                <h3>Human card edits</h3>
                <label>Name<input value={cardData.human_card.name} onChange={(event) => updateCard("human_card", "name", event.target.value)} /></label>
                <label>Call sign<input value={cardData.human_card.call_sign} onChange={(event) => updateCard("human_card", "call_sign", event.target.value)} /></label>
                <label>Role<input value={cardData.human_card.current_role} onChange={(event) => updateCard("human_card", "current_role", event.target.value)} /></label>
                <label>Signature move<textarea value={cardData.human_card.signature_move} onChange={(event) => updateCard("human_card", "signature_move", event.target.value)} /></label>
                <label>Scouting report<textarea value={cardData.human_card.scouting_report} onChange={(event) => updateCard("human_card", "scouting_report", event.target.value)} /></label>
              </div>
              <div className={styles.editorCard}>
                <h3>AI card edits</h3>
                <label>Name<input value={cardData.ai_card.name} onChange={(event) => updateCard("ai_card", "name", event.target.value)} /></label>
                <label>Call sign<input value={cardData.ai_card.call_sign} onChange={(event) => updateCard("ai_card", "call_sign", event.target.value)} /></label>
                <label>Role<input value={cardData.ai_card.current_role} onChange={(event) => updateCard("ai_card", "current_role", event.target.value)} /></label>
                <label>Signature move<textarea value={cardData.ai_card.signature_move} onChange={(event) => updateCard("ai_card", "signature_move", event.target.value)} /></label>
                <label>Scouting report<textarea value={cardData.ai_card.scouting_report} onChange={(event) => updateCard("ai_card", "scouting_report", event.target.value)} /></label>
              </div>
            </div>
          </section>

          <section className={styles.cardsGrid}>
            <CardPreview card={cardData.human_card} kind="human" profile={profile} telemetry={cardData.telemetry} />
            <CardPreview card={cardData.ai_card} kind="ai" profile={profile} telemetry={cardData.telemetry} />
          </section>

          <section className={styles.exportPanel}>
            <span className={styles.step}>STEP 5</span>
            <h2>Export the doubleheader</h2>
            <p>
              The cards are rendered in your browser. The two-card export is sized
              for a wide LinkedIn image; the individual cards are portrait PNGs.
            </p>
            <div className={styles.buttonRow}>
              <button type="button" className={styles.primary} onClick={() => exportCard("human")}>Download human card</button>
              <button type="button" className={styles.aiButton} onClick={() => exportCard("ai")}>Download AI card</button>
              <button type="button" className={styles.secondary} onClick={exportCarousel}>Download two-card image</button>
              <button type="button" className={styles.secondary} onClick={() => downloadJson(cardData, "ai-doubleheader-public-card-data.json")}>Download card JSON</button>
            </div>
            <label className={styles.optIn}>
              <input
                type="checkbox"
                checked={profile.researchOptIn}
                onChange={(event) =>
                  setProfile({ ...profile, researchOptIn: event.target.checked })
                }
              />
              <span>
                I am interested in donating anonymous relationship statistics to a
                future NULLWORKS study. The current beta does not transmit them.
              </span>
            </label>
            <button type="button" className={styles.textButton} onClick={exportResearchReceipt}>
              Download anonymous research receipt
            </button>
          </section>
        </>
      )}

      <section className={styles.researchSection}>
        <div>
          <span className={styles.kicker}>THE RESEARCH INSIDE THE FUN</span>
          <h2>Did you name your AI?</h2>
          <p>
            Naming does not prove that someone believes an AI is literally a
            person. It does suggest continuity, role identity, relationship framing,
            or team thinking. The cards make those differences visible without
            requiring people to donate raw chats.
          </p>
        </div>
        <div className={styles.boundaryList}>
          <strong>LOCAL-FIRST BOUNDARY</strong>
          <span>No LinkedIn scraping</span>
          <span>No raw conversation upload</span>
          <span>No hidden prompt extraction</span>
          <span>No automatic public gallery</span>
          <span>Human review before sharing</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <strong>NULLWORKS</strong>
        <span>Observe. Intervene. Design. Operate. Sustain.</span>
        <span>AI Doubleheader beta v0.1</span>
      </footer>
    </main>
  );
}
