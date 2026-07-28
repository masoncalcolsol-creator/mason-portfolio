import { createHash, randomUUID, timingSafeEqual } from "node:crypto";

export type ForestSubmissionKind = "seed" | "proposal" | "preference" | "lexicon";

export type ForestSubmissionInput = {
  kind: ForestSubmissionKind;
  topicId?: string;
  label?: string;
  edge?: string;
  proposalText?: string;
  sourceLocator?: string;
  preference?: "red" | "yellow" | "green";
  routeDepth?: number;
  word?: string;
};

export type ForestSubmission = {
  receipt: string;
  kind: ForestSubmissionKind;
  topic_id: string | null;
  label: string | null;
  edge_type: string | null;
  proposal_text: string | null;
  source_locator: string | null;
  preference: string | null;
  route_depth: number | null;
  state: string;
  created_at: string;
};

type JsonObject = Record<string, unknown>;

const MAX_SUBMISSIONS_PER_TEN_MINUTES = 10;

function getConfig() {
  const url = (process.env.FOREST_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
  const serviceKey = process.env.FOREST_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const hashSalt = process.env.FOREST_HASH_SALT || "";
  return { url, serviceKey, hashSalt, configured: Boolean(url && serviceKey && hashSalt) };
}

function assertConfigured() {
  const config = getConfig();
  if (!config.configured) {
    throw new ForestStoreError(
      "STORAGE_NOT_CONFIGURED",
      "The production Forest ledger is not connected yet. No local substitute receipt was created.",
      503,
    );
  }
  return config;
}

async function rest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { url, serviceKey } = assertConfigured();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ForestStoreError(
      "STORAGE_REQUEST_FAILED",
      body?.message || body?.hint || `Forest storage request failed with HTTP ${response.status}.`,
      response.status,
      body,
    );
  }

  return body as T;
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\u0000/g, "").trim().slice(0, maxLength);
}

function cleanTopicId(value: unknown) {
  const cleaned = cleanText(value, 120);
  return /^[A-Z0-9][A-Z0-9-_:.]*$/i.test(cleaned) ? cleaned : "";
}

function makeReceipt(kind: ForestSubmissionKind | "review") {
  const prefix = {
    seed: "NW-LLF-SEED",
    proposal: "NW-LLF-PROPOSAL",
    preference: "NW-LLF-PREF",
    lexicon: "NW-LLF-LEX",
    review: "NW-LLF-REVIEW",
  }[kind];
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  return `${prefix}-${timestamp}-${randomUUID().slice(0, 8).toUpperCase()}`;
}

function stateFor(kind: ForestSubmissionKind) {
  return {
    seed: "QUEUED_FOR_SOURCE_REVIEW",
    proposal: "PROPOSED_NOT_PUBLISHED",
    preference: "RECORDED_ROUTING_SIGNAL",
    lexicon: "QUEUED_FOR_LEXICAL_REVIEW",
  }[kind];
}

function actorHash(request: Request) {
  const { hashSalt } = assertConfigured();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown-ip";
  const userAgent = request.headers.get("user-agent") || "unknown-agent";
  return createHash("sha256").update(`${hashSalt}|${forwarded}|${userAgent}`).digest("hex");
}

async function enforceRateLimit(hash: string) {
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const query = new URLSearchParams({
    select: "receipt",
    actor_hash: `eq.${hash}`,
    created_at: `gte.${since}`,
    limit: String(MAX_SUBMISSIONS_PER_TEN_MINUTES + 1),
  });
  const rows = await rest<Array<{ receipt: string }>>(`llf_public_submissions?${query.toString()}`);
  if (rows.length >= MAX_SUBMISSIONS_PER_TEN_MINUTES) {
    throw new ForestStoreError(
      "RATE_LIMITED",
      "This device has planted several items recently. Please wait a few minutes before adding another.",
      429,
    );
  }
}

function validateSubmission(input: ForestSubmissionInput) {
  if (!input || !["seed", "proposal", "preference", "lexicon"].includes(input.kind)) {
    throw new ForestStoreError("INVALID_SUBMISSION", "Unknown Forest submission type.", 400);
  }

  const normalized = {
    kind: input.kind,
    topicId: cleanTopicId(input.topicId),
    label: cleanText(input.label, 240),
    edge: cleanText(input.edge, 100),
    proposalText: cleanText(input.proposalText, 4000),
    sourceLocator: cleanText(input.sourceLocator, 1500),
    preference: input.preference,
    routeDepth: Number.isInteger(input.routeDepth) ? Math.min(3, Math.max(1, Number(input.routeDepth))) : null,
    word: cleanText(input.word, 80).toLowerCase().replace(/[^a-z0-9'-]/g, ""),
  };

  if (normalized.kind === "seed" && !normalized.label) {
    throw new ForestStoreError("INVALID_SEED", "A seed needs a topic or question.", 400);
  }
  if (normalized.kind === "proposal" && (!normalized.proposalText || !normalized.sourceLocator || !normalized.topicId)) {
    throw new ForestStoreError("INVALID_PROPOSAL", "A proposal needs a topic, proposed change, and precise source locator.", 400);
  }
  if (normalized.kind === "preference" && (!normalized.topicId || !["red", "yellow", "green"].includes(normalized.preference || ""))) {
    throw new ForestStoreError("INVALID_PREFERENCE", "A route preference needs a topic and red, yellow, or green.", 400);
  }
  if (normalized.kind === "lexicon" && !normalized.word) {
    throw new ForestStoreError("INVALID_LEXICON_LOOKUP", "A lexical review request needs a word.", 400);
  }

  return normalized;
}

export async function createForestSubmission(request: Request, input: ForestSubmissionInput) {
  const normalized = validateSubmission(input);
  const hash = actorHash(request);
  await enforceRateLimit(hash);

  const receipt = makeReceipt(normalized.kind);
  const row = {
    receipt,
    kind: normalized.kind,
    topic_id: normalized.topicId || null,
    label: normalized.kind === "lexicon" ? normalized.word : normalized.label || null,
    edge_type: normalized.edge || null,
    proposal_text: normalized.proposalText || null,
    source_locator: normalized.sourceLocator || null,
    preference: normalized.preference || null,
    route_depth: normalized.routeDepth,
    state: stateFor(normalized.kind),
    actor_hash: hash,
    payload: {
      canonical_effect: "NONE",
      truth_impact: "NONE",
      storage: "SERVER_DURABLE",
      client_version: "PUBLIC_GROVE_1.0",
    },
  };

  const rows = await rest<ForestSubmission[]>("llf_public_submissions", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(row),
  });

  return rows[0];
}

export async function getForestSubmission(receipt: string) {
  const cleaned = cleanText(receipt, 100);
  if (!/^NW-LLF-[A-Z]+-[A-Z0-9-]+$/.test(cleaned)) {
    throw new ForestStoreError("INVALID_RECEIPT", "The receipt format is invalid.", 400);
  }
  const query = new URLSearchParams({
    select: "receipt,kind,topic_id,label,edge_type,preference,route_depth,state,created_at",
    receipt: `eq.${cleaned}`,
    limit: "1",
  });
  const rows = await rest<ForestSubmission[]>(`llf_public_submissions?${query.toString()}`);
  return rows[0] || null;
}

export async function getForestStoreStatus() {
  const config = getConfig();
  if (!config.configured) {
    return {
      configured: false,
      reachable: false,
      state: "STORAGE_NOT_CONFIGURED",
      missing: [
        !config.url ? "FOREST_SUPABASE_URL" : null,
        !config.serviceKey ? "FOREST_SUPABASE_SERVICE_ROLE_KEY" : null,
        !config.hashSalt ? "FOREST_HASH_SALT" : null,
      ].filter(Boolean),
    };
  }

  try {
    await rest<Array<{ receipt: string }>>("llf_public_submissions?select=receipt&limit=1");
    return { configured: true, reachable: true, state: "READY", missing: [] };
  } catch (error) {
    return {
      configured: true,
      reachable: false,
      state: "STORAGE_UNREACHABLE",
      missing: [],
      detail: error instanceof Error ? error.message : "Unknown storage error",
    };
  }
}

export function adminAuthorized(request: Request) {
  const expected = process.env.FOREST_ADMIN_TOKEN || "";
  if (!expected) return false;
  const authorization = request.headers.get("authorization") || "";
  const supplied = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : request.headers.get("x-forest-admin-token") || "";
  const left = Buffer.from(expected);
  const right = Buffer.from(supplied);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function listForestReviewQueue() {
  return rest<JsonObject[]>(
    "llf_review_queue?select=*&order=created_at.desc&limit=200",
  );
}

export async function addForestReview(input: {
  submissionReceipt: string;
  decision: "ACCEPT" | "REJECT" | "DEFER" | "NEEDS_EVIDENCE";
  note?: string;
}) {
  const submissionReceipt = cleanText(input.submissionReceipt, 100);
  const note = cleanText(input.note, 2000);
  if (!/^NW-LLF-[A-Z]+-[A-Z0-9-]+$/.test(submissionReceipt)) {
    throw new ForestStoreError("INVALID_RECEIPT", "The review target receipt is invalid.", 400);
  }
  if (!["ACCEPT", "REJECT", "DEFER", "NEEDS_EVIDENCE"].includes(input.decision)) {
    throw new ForestStoreError("INVALID_DECISION", "Unknown review decision.", 400);
  }

  const rows = await rest<JsonObject[]>("llf_review_events", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      review_receipt: makeReceipt("review"),
      submission_receipt: submissionReceipt,
      decision: input.decision,
      note: note || null,
      reviewer: "MASON_PERRY_FINAL_HUMAN_AUTHORITY",
    }),
  });
  return rows[0];
}

export class ForestStoreError extends Error {
  code: string;
  status: number;
  detail?: unknown;

  constructor(code: string, message: string, status = 500, detail?: unknown) {
    super(message);
    this.name = "ForestStoreError";
    this.code = code;
    this.status = status;
    this.detail = detail;
  }
}

export function forestErrorResponse(error: unknown) {
  if (error instanceof ForestStoreError) {
    return Response.json(
      { ok: false, error: { code: error.code, message: error.message } },
      { status: error.status },
    );
  }
  console.error("Unhandled Forest error", error);
  return Response.json(
    { ok: false, error: { code: "INTERNAL_ERROR", message: "The Forest could not preserve this event." } },
    { status: 500 },
  );
}
