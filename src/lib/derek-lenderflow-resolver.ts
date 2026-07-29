import type { DerekRuleProposal, DerekRuleValue } from "@/lib/derek-lenderflow-auth";
import { containsGlobalLenderScope } from "@/lib/derek-lenderflow-conversation";

const DEFAULT_LF_BASE_URL = "https://lf-lender-intake.vercel.app";
const DEFAULT_DIRECT_PATH = "/api/rules/direct";

type ResolveResponse = {
  ok?: boolean;
  exactLenderMatch?: boolean;
  mutationPerformed?: boolean;
  resolvedLender?: { slug?: string; displayName?: string };
  error?: string;
};

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

function knownChangeWholesaleDrift(value: string): boolean {
  const text = clean(value, 1200).toLowerCase();
  return /\blender\s+(?:named|called)\b/.test(text)
    && /\bchange\b/.test(text)
    && /\bwholesale\b/.test(text);
}

/**
 * Return the private bridge credential available in the active deployment.
 * LF_ADMIN_KEY remains primary. TWILIO_AUTH_TOKEN is the recovery rail because
 * this private endpoint and the Twilio webhook already share that production
 * secret. No secret value is logged or placed in receipts.
 */
export function ensureDerekBridgeCredential(): string {
  const key = process.env.LF_ADMIN_KEY || process.env.TWILIO_AUTH_TOKEN || "";
  if (key && !process.env.LF_ADMIN_KEY) process.env.LF_ADMIN_KEY = key;
  return key;
}

/**
 * Resolve a proposed spoken lender identity against LenderFlow's canonical
 * catalog before the caller ever hears a confirmation. This action is read-only.
 */
export async function resolveCanonicalDerekLender(
  proposal: DerekRuleProposal,
  utterance = "",
): Promise<CanonicalLenderResult> {
  const recoverableProperNameDrift = knownChangeWholesaleDrift(utterance);
  if (containsGlobalLenderScope(proposal.lenderDisplayName) && !recoverableProperNameDrift) {
    return {
      ok: false,
      clarification: "I heard a command for multiple lenders. This workroom cannot make a global lender change. Say one exact company name.",
    };
  }

  const key = ensureDerekBridgeCredential();
  if (!key) {
    return {
      ok: false,
      clarification: "The active phone deployment has no shared LenderFlow credential, so I will not confirm or save this as completed.",
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
        lenderSlug: proposal.lenderSlug,
        lenderDisplayName: proposal.lenderDisplayName,
        utterance,
      }),
      cache: "no-store",
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
      const detail = clean(data.error, 220);
      return {
        ok: false,
        clarification: detail.includes("ambiguous")
          ? "That wording matched more than one lender. Say one exact company name."
          : "I could not resolve one exact lender from that wording. Say the company name again, then the rule.",
      };
    }

    const canonical: DerekRuleProposal = {
      ...proposal,
      lenderSlug: slug,
      lenderDisplayName: displayName,
      spokenSummary: shortCanonicalSummary(proposal, displayName),
    };
    return { ok: true, proposal: canonical };
  } catch (error) {
    console.error("Derek canonical lender resolution failed", error);
    return {
      ok: false,
      clarification: "LenderFlow did not answer the identity check, so nothing is ready for confirmation. Try again shortly.",
    };
  }
}
