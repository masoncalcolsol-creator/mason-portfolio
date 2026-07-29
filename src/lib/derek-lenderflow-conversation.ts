import type { DerekRuleProposal } from "@/lib/derek-lenderflow-auth";

const MAX_TURNS = 5;
const MAX_TURN_LENGTH = 360;

function clean(value: unknown, max = MAX_TURN_LENGTH): string {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function slugify(value: string): string {
  return clean(value, 160).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function cleanLenderCandidate(value: string): string {
  return clean(value, 160)
    .replace(/^(?:hey|okay|ok|so)[, ]+/i, "")
    .replace(/^(?:please\s+)?(?:i\s+(?:need|want)\s+you\s+to|can\s+you|could\s+you|would\s+you)\s+(?:change|update|set|make)\s+/i, "")
    .replace(/\b(?:right now|currently|today)\b.*$/i, "")
    .replace(/[,:;.-]+$/g, "")
    .trim();
}

export function appendDerekConversationTurn(turns: string[] | undefined, heard: string): string[] {
  const next = clean(heard);
  const existing = (turns || []).map((turn) => clean(turn)).filter(Boolean);
  if (!next) return existing.slice(-MAX_TURNS);
  if (existing.at(-1)?.toLowerCase() === next.toLowerCase()) return existing.slice(-MAX_TURNS);
  return [...existing, next].slice(-MAX_TURNS);
}

export function derekConversationInput(turns: string[]): string {
  return turns.map((turn, index) => `Caller turn ${index + 1}: ${turn}`).join("\n");
}

function findDesiredFico(turns: string[]): number | null {
  const candidates = [...turns].reverse();
  const patterns = [
    /\b(?:minimum|min|hard minimum|absolute minimum|floor)\s+(?:fico(?:\s+score)?|credit score)?\s*(?:to|at|of|is|=)?\s*(\d{3})\b/i,
    /\b(?:fico(?:\s+score)?|credit score)\s*(?:minimum|min|floor)?\s*(?:to|at|of|is|=)?\s*(\d{3})\b/i,
    /\b(?:change|update|set|make)\b[^.]{0,120}?\bfico\b[^.]{0,50}?\bto\s*(\d{3})\b/i,
  ];

  for (const turn of candidates) {
    for (const pattern of patterns) {
      const match = turn.match(pattern);
      const value = Number(match?.[1]);
      if (Number.isInteger(value) && value >= 300 && value <= 850) return value;
    }
  }

  const joined = turns.join(" || ");
  for (const pattern of patterns) {
    const match = joined.match(pattern);
    const value = Number(match?.[1]);
    if (Number.isInteger(value) && value >= 300 && value <= 850) return value;
  }
  return null;
}

function findLender(turns: string[]): string {
  const joined = turns.join(" || ");
  const commandMatch = joined.match(/\b(?:change|update|set|make)\s+(.+?)\s+(?:the\s+)?(?:hard\s+|absolute\s+)?(?:minimum|min|floor)\s+(?:fico(?:\s+score)?|credit score)\b/i);
  if (commandMatch?.[1]) {
    const candidate = cleanLenderCandidate(commandMatch[1]);
    if (candidate) return candidate;
  }

  const boundaryMatch = joined.match(/(.+?)\s+(?:hard\s+|absolute\s+)?(?:minimum|min|floor)\s+(?:fico(?:\s+score)?|credit score)\b/i);
  if (boundaryMatch?.[1]) {
    const candidate = cleanLenderCandidate(boundaryMatch[1]);
    if (candidate && !/^(?:the|a|this|that)$/i.test(candidate)) return candidate;
  }

  for (const turn of [...turns].reverse()) {
    const candidate = cleanLenderCandidate(turn);
    if (!candidate) continue;
    if (/\d|\b(?:fico|score|minimum|min|floor|field|boundary|lender|apply|applies|change|update|set)\b/i.test(candidate)) continue;
    const words = candidate.split(/\s+/);
    if (words.length >= 1 && words.length <= 8) return candidate;
  }
  return "";
}

/**
 * Deterministic fast path for the first production use case. The general model
 * parser remains available for every other supported lender rule.
 */
export function parseConversationalFicoRule(turns: string[]): DerekRuleProposal | null {
  const fico = findDesiredFico(turns);
  const lenderDisplayName = findLender(turns);
  if (!fico || !lenderDisplayName) return null;

  const lenderSlug = slugify(lenderDisplayName);
  if (!lenderSlug) return null;

  return {
    lenderDisplayName,
    lenderSlug,
    program: null,
    appliesToAllPrograms: true,
    fieldKey: "absoluteMinFico",
    operator: "minimum",
    value: fico,
    temporary: false,
    expiresAt: null,
    note: "Broker voice correction after conversational capture, exact read-back, and explicit confirmation.",
    spokenSummary: `${lenderDisplayName}, for all programs: set the hard minimum FICO to ${fico} as a permanent broker-verified rule.`,
  };
}
