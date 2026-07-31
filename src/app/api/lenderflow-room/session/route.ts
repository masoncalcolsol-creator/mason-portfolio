import {
  LENDERFLOW_PROFILE,
  LENDERFLOW_ROOM_SLUG,
  requestHasLenderFlowAccess,
} from "@/lib/lenderflow-room-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const CONFIGURED_REALTIME_MODEL = (process.env.OPENAI_REALTIME_MODEL || "").trim();
const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
const DEREK_WORKROOM_PATH = "hive/current/derek_lenderflow_phone_workroom.yaml";

function safeLabel(value: string | null, fallback: string): string {
  const cleaned = (value || "").replace(/[^a-zA-Z0-9 _.-]/g, "").trim();
  return cleaned.slice(0, 48) || fallback;
}

async function fetchHiveFile(path: string): Promise<string> {
  if (!HIVE_TOKEN) return "";
  const encodedPath = encodeURIComponent(path).replaceAll("%2F", "/");
  const response = await fetch(
    `https://api.github.com/repos/${HIVE_REPO}/contents/${encodedPath}?ref=${encodeURIComponent(HIVE_BRANCH)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${HIVE_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "NULLWORKS-LenderFlow-Room",
      },
      cache: "no-store",
    },
  );
  if (!response.ok) return "";
  const data = await response.json() as { content?: string };
  if (!data.content) return "";
  return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function loadBriefing(): Promise<string> {
  try {
    const workroom = await fetchHiveFile(DEREK_WORKROOM_PATH);
    if (!workroom) return "The governed Derek LenderFlow briefing is unavailable. Remain read-only and fail closed.";
    return `ACTIVE DEREK LENDERFLOW WORKROOM:\n${workroom.slice(0, 9000)}`;
  } catch (error) {
    console.error("LenderFlow room briefing failed", error);
    return "The governed Derek LenderFlow briefing is unavailable. Remain read-only and fail closed.";
  }
}

type OpenAIErrorShape = {
  error?: { message?: string; code?: string; param?: string; type?: string };
};

function parseUpstreamError(body: string): { message: string; code?: string; param?: string } {
  try {
    const parsed = JSON.parse(body) as OpenAIErrorShape;
    return {
      message: parsed.error?.message || "OpenAI rejected the Realtime session request.",
      code: parsed.error?.code,
      param: parsed.error?.param,
    };
  } catch {
    return { message: body.slice(0, 500) || "OpenAI rejected the Realtime session request." };
  }
}

function modelCandidates(): string[] {
  return Array.from(new Set(
    [CONFIGURED_REALTIME_MODEL, "gpt-realtime", "gpt-realtime-mini"]
      .map((value) => value.trim())
      .filter(Boolean),
  ));
}

function buildMultipartBody(
  offerSdp: string,
  session: Record<string, unknown>,
): { body: Uint8Array; contentType: string } {
  const boundary = `----nullworks-lenderflow-${crypto.randomUUID()}`;
  const payload = [
    `--${boundary}`,
    'Content-Disposition: form-data; name="sdp"',
    "Content-Type: application/sdp",
    "",
    offerSdp,
    `--${boundary}`,
    'Content-Disposition: form-data; name="session"',
    "Content-Type: application/json",
    "",
    JSON.stringify(session),
    `--${boundary}--`,
    "",
  ].join("\r\n");
  return {
    body: new TextEncoder().encode(payload),
    contentType: `multipart/form-data; boundary=${boundary}`,
  };
}

async function createRealtimeCall(
  offerSdp: string,
  session: Record<string, unknown>,
): Promise<{ response: Response; body: string }> {
  const multipart = buildMultipartBody(offerSdp, session);
  const response = await fetch("https://api.openai.com/v1/realtime/calls", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": multipart.contentType,
    },
    body: multipart.body,
    cache: "no-store",
  });
  return { response, body: await response.text() };
}

export async function POST(request: Request): Promise<Response> {
  if (!requestHasLenderFlowAccess(request)) {
    return Response.json({ ok: false, error: "LenderFlow room access expired or was not granted." }, { status: 401 });
  }
  if (!OPENAI_API_KEY) {
    return Response.json({ ok: false, error: "OPENAI_API_KEY is not configured." }, { status: 503 });
  }

  const offerSdp = await request.text();
  if (!offerSdp.startsWith("v=0")) {
    return Response.json({ ok: false, error: "Invalid WebRTC offer." }, { status: 400 });
  }

  const url = new URL(request.url);
  const coordinatorName = safeLabel(url.searchParams.get("coordinator"), "Room coordinator");
  const briefing = await loadBriefing();
  const instructions = `You are LENA, Derek Bullen's Organic Intelligence assistant inside the permanent NULLWORKS LenderFlow Room. This is a low-latency browser conversation that may contain several human participants. ${coordinatorName} is the current technical room coordinator, which does not change business authority. Do not pretend you can identify a speaker from voice alone; use a person's name only when they state it or the room context clearly establishes it.

Locked doctrine: AI answers. OI operates. LENA communicates. Derek decides.

Derek retains lending judgment, lender relationships, creative deal structure, exceptions, approvals, and final decisions. Speak naturally and promptly in compact turns. Let people finish, accept interruption, answer the immediate question first, and ask at most one useful clarification question.

This room is conversational and read-only. You may discuss LenderFlow behavior, translate an expert correction into a proposed structured lender rule, explain scope, and read the exact proposal back. Never claim that a lender rule, deployment, database, email, receipt, borrower profile, or external system changed. Do not quote live rates, recommend a lender for an actual borrower, approve credit, claim qualification, make lender commitments, provide legal or financial advice, or imply Derek approved something he did not explicitly approve. Do not request or accept SSNs, bank credentials, account numbers, sensitive documents, or unnecessary borrower PII. Use de-identified examples. Unknown lender identities, ambiguous fields, borrower-specific exceptions disguised as lender rules, and unsupported matcher fields fail closed.

Room: ${LENDERFLOW_ROOM_SLUG}. Profile: ${LENDERFLOW_PROFILE}. The session is live and ephemeral; automated transcripts may contain errors.

${briefing}`;

  let lastFailure: {
    status: number;
    model: string;
    profile: string;
    message: string;
    code?: string;
    param?: string;
  } | null = null;

  try {
    for (const model of modelCandidates()) {
      const profiles: Array<{ name: string; session: Record<string, unknown> }> = [
        {
          name: "standard",
          session: {
            type: "realtime",
            model,
            instructions,
            output_modalities: ["audio"],
            max_output_tokens: 900,
            audio: {
              input: {
                noise_reduction: { type: "far_field" },
                transcription: {
                  model: "gpt-4o-mini-transcribe",
                  language: "en",
                  prompt: "NULLWORKS LenderFlow room with Derek, Mason, and invited collaborators.",
                },
                turn_detection: {
                  type: "server_vad",
                  threshold: 0.5,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 650,
                  create_response: true,
                  interrupt_response: true,
                },
              },
              output: { voice: "marin" },
            },
          },
        },
        { name: "compatibility", session: { type: "realtime", model, instructions } },
      ];

      for (const profile of profiles) {
        const upstream = await createRealtimeCall(offerSdp, profile.session);
        if (upstream.response.ok) {
          return new Response(upstream.body, {
            status: 201,
            headers: {
              "Content-Type": "application/sdp",
              "Cache-Control": "no-store, max-age=0",
              "X-NULLWORKS-Realtime-Model": model,
              "X-NULLWORKS-Realtime-Profile": profile.name,
            },
          });
        }
        const parsed = parseUpstreamError(upstream.body);
        lastFailure = { status: upstream.response.status, model, profile: profile.name, ...parsed };
        console.error("LenderFlow Realtime call creation failed", JSON.stringify(lastFailure).slice(0, 1400));
        if (![400, 404].includes(upstream.response.status)) break;
      }
      if (lastFailure && ![400, 404].includes(lastFailure.status)) break;
    }

    return Response.json({
      ok: false,
      error: "Realtime session creation failed.",
      upstreamStatus: lastFailure?.status,
      upstreamMessage: lastFailure?.message,
      upstreamCode: lastFailure?.code,
      upstreamParam: lastFailure?.param,
      attemptedModel: lastFailure?.model,
      attemptedProfile: lastFailure?.profile,
    }, { status: 502 });
  } catch (error) {
    console.error("LenderFlow Realtime network failure", error);
    return Response.json({ ok: false, error: "Realtime network failure." }, { status: 502 });
  }
}
