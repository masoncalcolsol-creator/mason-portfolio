import type { DerekRuleProposal } from "@/lib/derek-lenderflow-auth";
import type { ResolvedLenderIdentity } from "@/lib/derek-lenderflow-resolver";

const MAX_TURNS = 5;
const MAX_TURN_LENGTH = 360;

function clean(value: unknown, max = MAX_TURN_LENGTH): string {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function slugify(value: string): string {
  return clean(value, 160).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function containsGlobalLenderScope(value: string): boolean {
  return /\b(?:all|every|each)\s+(?:the\s+)?lenders?\b/i.test(clean(value, 1200));
}

function cleanLenderCandidate(value: string): string {
  return clean(value, 160)
    .replace(/^(?:hey|okay|ok|so)[, ]+/i, "")
    .replace(/^(?:please\s+)?(?:i\s+(?:need|want)\s+you\s+to|can\s+you|could\s+you|would\s+you)\s+(?:change|update|set|make)\s+/i, "")
    .replace(/^(?:change|update|set|make)\s+/i, "")
    .replace(/^(?:the\s+)?lender\s+(?:named|called)\s+/i, "")
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
    /\b(?:change|update|set|make)\b[^.]{0,180}?\bfico\b[^.]{0,70}?\bto\s*(\d{3})\b/i,
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

function findClaimedCurrentFico(turns: string[], desired: number): number | null {
  const patterns = [
    /\b(?:currently|right now|now)\b[^.]{0,90}?\b(?:set\s+(?:at|to)|is|of)?\s*(\d{3})\b/i,
    /\bfrom\s+(\d{3})\s+(?:to|up to|down to)\s+\d{3}\b/i,
  ];
  for (const turn of [...turns].reverse()) {
    for (const pattern of patterns) {
      const value = Number(turn.match(pattern)?.[1]);
      if (Number.isInteger(value) && value >= 300 && value <= 850 && value !== desired) return value;
    }
  }
  return null;
}

function explicitNamedLender(turns: string[]): string {
  const patterns = [
    /\b(?:the\s+)?lender\s+(?:named|called)\s+(.+?)\s+(?:to\s+(?:a\s+|the\s+)?|with\s+(?:a\s+|the\s+)?|at\s+(?:a\s+|the\s+)?|for\s+(?:a\s+|the\s+)?)?(?:hard\s+|absolute\s+)?(?:minimum|min|floor)\s+(?:fico(?:\s+score)?|credit score)\b/i,
    /\b(?:the\s+)?lender\s+(?:named|called)\s+(.+?)(?=[,.]|$)/i,
  ];
  for (const turn of [...turns].reverse()) {
    for (const pattern of patterns) {
      const match = turn.match(pattern);
      if (!match?.[1]) continue;
      const candidate = cleanLenderCandidate(match[1]);
      if (candidate && !containsGlobalLenderScope(candidate)) return candidate;
    }
  }
  return "";
}

function findLender(turns: string[]): string {
  const explicit = explicitNamedLender(turns);
  if (explicit) return explicit;

  const joined = turns.join(" || ");
  const commandMatch = joined.match(/\b(?:change|update|set|make)\s+(.+?)\s+(?:the\s+)?(?:hard\s+|absolute\s+)?(?:minimum|min|floor)\s+(?:fico(?:\s+score)?|credit score)\b/i);
  if (commandMatch?.[1]) {
    const candidate = cleanLenderCandidate(commandMatch[1]);
    if (candidate && !containsGlobalLenderScope(candidate)) return candidate;
  }

  const boundaryMatch = joined.match(/(.+?)\s+(?:hard\s+|absolute\s+)?(?:minimum|min|floor)\s+(?:fico(?:\s+score)?|credit score)\b/i);
  if (boundaryMatch?.[1]) {
    const candidate = cleanLenderCandidate(boundaryMatch[1]);
    if (candidate && !containsGlobalLenderScope(candidate) && !/^(?:the|a|this|that)$/i.test(candidate)) return candidate;
  }

  for (const turn of [...turns].reverse()) {
    const candidate = cleanLenderCandidate(turn);
    if (!candidate || containsGlobalLenderScope(candidate)) continue;
    if (/\d|\b(?:fico|score|minimum|min|floor|field|boundary|lender|apply|applies|change|update|set)\b/i.test(candidate)) continue;
    const words = candidate.split(/\s+/);
    if (words.length >= 1 && words.length <= 8) return candidate;
  }
  return "";
}

/**
 * Deterministic FICO parser. When LenderFlow has already resolved the company
 * from the full conversation, that canonical identity overrides fragile speech
 * parsing entirely.
 */
export function parseConversationalFicoRule(
  turns: string[],
  canonicalLender?: ResolvedLenderIdentity,
): DerekRuleProposal | null {
  const fico = findDesiredFico(turns);
  const lenderDisplayName = canonicalLender?.displayName || findLender(turns);
  if (!fico || !lenderDisplayName || containsGlobalLenderScope(lenderDisplayName)) return null;

  const lenderSlug = canonicalLender?.slug || slugify(lenderDisplayName);
  if (!lenderSlug) return null;
  const current = findClaimedCurrentFico(turns, fico);
  const change = current ? ` from ${current} to ${fico}` : ` to ${fico}`;

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
    note: "Broker voice correction after catalog-first lender resolution, one exact read-back, and explicit confirmation.",
    spokenSummary: `Only the lender named ${lenderDisplayName}: change the minimum FICO${change}.`,
  };
}
