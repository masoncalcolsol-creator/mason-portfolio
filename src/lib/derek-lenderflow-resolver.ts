import type { DerekRuleProposal, DerekRuleValue } from "@/lib/derek-lenderflow-auth";
import { containsGlobalLenderScope } from "@/lib/derek-lenderflow-conversation";

const DEFAULT_LF_BASE_URL = "https://lf-lender-intake.vercel.app";
const DEFAULT_DIRECT_PATH = "/api/rules/direct";
const CATALOG_TIMEOUT_MS = 5_000;

type ResolveResponse = {
  ok?: boolean;
  exactLenderMatch?: boolean;
  mutationPerformed?: boolean;
  resolvedLender?: { slug?: string; displayName?: string };
  error?: string;
};

export type ResolvedLenderIdentity = {
  slug: string;
  displayName: string;
};

export type LenderIdentityResult =
  | { ok: true; lender: ResolvedLenderIdentity }
  | { ok: false; clarification: string };

export type CanonicalLenderResult =
  | { ok: true; proposal: DerekRuleProposal }
  | { ok: false; clarification: string };

function clean(value: unknown, max = 500): string {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function spokenValue(value: DerekRuleValue): string {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null) return "not applicable";
  return String(value);
}

function shortCanonicalSummary(proposal: DerekRuleProposal, lenderName: string): string {
  const program = proposal.appliesToAllPrograms ? "" : ` for the ${proposal.program || "specified"} program`;
  const previousFico = proposal.spokenSummary.match(/\bfrom\s+(\d{3})\b/i)?.[1];

  if (proposal.fieldKey === "absoluteMinFico" && typeof proposal.value === "number") {
    const change = previousFico && Number(previousFico) !== proposal.value
      ? ` from ${previousFico} to ${proposal.value}`
      : ` to ${proposal.value}`;
    return `Only the lender named ${lenderName}${program}: change the minimum FICO${change}.`;
  }

  const operator = proposal.operator === "minimum"
    ? "set the minimum to"
    : proposal.operator === "maximum"
      ? "set the maximum to"
      : proposal.operator === "excludes"
        ? "exclude"
        : proposal.operator === "includes"
          ? "include"
          : "set to";
  return `Only the lender named ${lenderName}${program}: ${proposal.fieldKey} ${operator} ${spokenValue(proposal.value)}.`;
}

/**
 * The command route places Vercel's short-lived production workload identity in
 * LF_ADMIN_KEY for the duration of each invocation. Legacy environment keys
 * remain compatible, but are no longer required.
 */
export function ensureDerekBridgeCredential(): string {
  return process.env.LF_ADMIN_KEY || process.env.TWILIO_AUTH_TOKEN || "";
}

async function requestCanonicalIdentity(input: {
  utterance: string;
  lenderSlug?: string;
  lenderDisplayName?: string;
}): Promise<LenderIdentityResult> {
  if (containsGlobalLenderScope(input.utterance)) {
    return {
      ok: false,
      clarification: "I heard a command for multiple lenders. This workroom can change only one lender at a time.",
    };
  }

  const key = ensureDerekBridgeCredential();
  if (!key) {
    return {
      ok: false,
      clarification: "The production workload identity is unavailable, so I will not confirm or publish a lender rule.",
    };
  }

  const base = (process.env.LF_PUBLIC_BASE_URL || DEFAULT_LF_BASE_URL).replace(/\/$/, "");
  const directPath = process.env.LF_DIRECT_RULE_PATH || DEFAULT_DIRECT_PATH;
  const endpoint = `${base}${directPath.startsWith("/") ? directPath : `/${directPath}`}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-lf-admin-key": key,
      },
      body: JSON.stringify({
        action: "resolve_lender",
        lenderSlug: input.lenderSlug || "",
        lenderDisplayName: input.lenderDisplayName || "",
        utterance: input.utterance,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(CATALOG_TIMEOUT_MS),
    });

    const data = await response.json().catch(() => ({})) as ResolveResponse;
    const slug = clean(data.resolvedLender?.slug, 180);
    const displayName = clean(data.resolvedLender?.displayName, 180);
    const exact = response.ok
      && data.ok === true
      && data.exactLenderMatch === true
      && data.mutationPerformed === false
      && Boolean(slug && displayName);

    if (!exact) {
      const detail = clean(data.error, 220).toLowerCase();
      return {
        ok: false,
        clarification: detail.includes("ambiguous")
          ? "I found more than one possible lender. Say the full company name once."
          : "I could not match that company name to the active lender catalog. Say the full company name once.",
      };
    }

    return { ok: true, lender: { slug, displayName } };
  } catch (error) {
    console.error("Derek canonical lender identity request failed", error);
    const timedOut = error instanceof Error && /timeout|aborted/i.test(`${error.name} ${error.message}`);
    return {
      ok: false,
      clarification: timedOut
        ? "The lender catalog took too long to answer. Nothing changed. Say the company name again."
        : "LenderFlow did not answer the catalog lookup, so nothing is ready for confirmation.",
    };
  }
}

/** Resolve the lender directly from the entire short conversation before rule parsing. */
export async function resolveDerekLenderIdentity(utterance: string): Promise<LenderIdentityResult> {
  return requestCanonicalIdentity({ utterance });
}

export function applyCanonicalLender(
  proposal: DerekRuleProposal,
  lender: ResolvedLenderIdentity,
): DerekRuleProposal {
  return {
    ...proposal,
    lenderSlug: lender.slug,
    lenderDisplayName: lender.displayName,
    spokenSummary: shortCanonicalSummary(proposal, lender.displayName),
  };
}

/** Fallback for non-FICO rules whose parser supplied a candidate lender name. */
export async function resolveCanonicalDerekLender(
  proposal: DerekRuleProposal,
  utterance = "",
): Promise<CanonicalLenderResult> {
  const identity = await requestCanonicalIdentity({
    utterance,
    lenderSlug: proposal.lenderSlug,
    lenderDisplayName: proposal.lenderDisplayName,
  });
  if (!identity.ok) return identity;
  return { ok: true, proposal: applyCanonicalLender(proposal, identity.lender) };
}
