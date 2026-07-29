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

/**
 * Resolve a proposed spoken lender identity against LenderFlow's canonical
 * catalog before the caller ever hears a confirmation. This action is read-only.
 */
export async function resolveCanonicalDerekLender(proposal: DerekRuleProposal): Promise<CanonicalLenderResult> {
  if (containsGlobalLenderScope(proposal.lenderDisplayName)) {
    return {
      ok: false,
      clarification: "I heard a command for multiple lenders. This workroom cannot make a global lender change. Say the exact proper name, for example: the lender named Change Wholesale.",
    };
  }

  const key = process.env.LF_ADMIN_KEY || "";
  if (!key) {
    return { ok: false, clarification: "The private lender identity bridge is unavailable, so I will not confirm or publish a rule." };
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
          ? "That lender name matched more than one catalog entry. Say the exact proper name after the words: the lender named."
          : "I could not resolve one exact lender from that wording. Say the exact proper name, for example: the lender named Change Wholesale.",
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
      clarification: "I could not verify the exact lender identity, so nothing is ready for confirmation. Say the exact lender name again.",
    };
  }
}
