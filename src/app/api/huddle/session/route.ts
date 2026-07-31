export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const CONFIGURED_REALTIME_MODEL = (process.env.OPENAI_REALTIME_MODEL || "").trim();
const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";

function safeLabel(value: string | null, fallback: string): string {
  const cleaned = (value || "").replace(/[^a-zA-Z0-9 _.-]/g, "").trim();
  return cleaned.slice(0, 48) || fallback;
}

function yamlValue(content: string, key: string): string | undefined {
  const match = content.match(new RegExp(`^${key}:\\s*["']?([^\\n"']+)`, "m"));
  return match?.[1]?.trim();
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
        "User-Agent": "NULLWORKS-Huddle-Realtime",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) return "";
  const data = (await response.json()) as { content?: string };
  if (!data.content) return "";
  return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function loadHiveBriefing(): Promise<string> {
  try {
    const boot = await fetchHiveFile("HIVE_BOOT.yaml");
    if (!boot) return "Hive briefing unavailable for this session.";
    const floorPath = yamlValue(boot, "company_floor") || "hive/current/company_floor.yaml";
    const floor = await fetchHiveFile(floorPath);
    const briefing = `HIVE BOOT:\n${boot.slice(0, 2400)}\n\nCURRENT COMPANY FLOOR:\n${floor.slice(0, 4200)}`;
    return briefing.slice(0, 6600);
  } catch (error) {
    console.error("Huddle Hive briefing failed", error);
    return "Hive briefing unavailable for this session.";
  }
}

type OpenAIErrorShape = {
  error?: {
    message?: string;
    code?: string;
    param?: string;
    type?: string;
  };
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
  return Array.from(
    new Set(
      [CONFIGURED_REALTIME_MODEL, "gpt-realtime", "gpt-realtime-mini"]
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  );
}

function buildForm(offerSdp: string, session: Record<string, unknown>): FormData {
  const form = new FormData();
  form.append("sdp", new Blob([offerSdp], { type: "application/sdp" }), "offer.sdp");
  form.append("session", new Blob([JSON.stringify(session)], { type: "application/json" }), "session.json");
  return form;
}

async function createRealtimeCall(
  offerSdp: string,
  session: Record<string, unknown>,
): Promise<{ response: Response; body: string }> {
  const response = await fetch("https://api.openai.com/v1/realtime/calls", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: buildForm(offerSdp, session),
    cache: "no-store",
  });
  return { response, body: await response.text() };
}

export async function POST(request: Request): Promise<Response> {
  if (!OPENAI_API_KEY) {
    return Response.json(
      { ok: false, error: "OPENAI_API_KEY is not configured in the hosting environment." },
      { status: 503 },
    );
  }

  const offerSdp = await request.text();
  if (!offerSdp.startsWith("v=0")) {
    return Response.json({ ok: false, error: "Invalid WebRTC offer." }, { status: 400 });
  }

  const requestUrl = new URL(request.url);
  const room = safeLabel(requestUrl.searchParams.get("room"), "private-room");
  const hostName = safeLabel(requestUrl.searchParams.get("host"), "Mason");
  const guestName = safeLabel(requestUrl.searchParams.get("guest"), "Guest");
  const hiveBriefing = await loadHiveBriefing();

  const instructions = `You are the NULLWORKS Huddle voice agent inside a private browser room. The human participants are ${hostName}, the room host and final Human Authority, and possibly ${guestName}, an invited guest. More than one human voice may arrive through the same mixed audio channel. Do not pretend you can identify a speaker with certainty from voice alone. Use names only when the speaker states or clarifies who is speaking.

Speak naturally, promptly, and in compact conversational turns. Let the humans finish. You may be interrupted. Answer the immediate question first, then ask at most one useful follow-up. Never call yourself a telephone bot. Do not expose credentials, private tokens, protected personal records, or unnecessary compartmentalized Hive material. Do not claim that a deployment, writeback, receipt, external action, or verification occurred unless the session has direct evidence. Mason remains final Human Authority. If the invited guest asks for restricted or personal information, explain that the room has a privacy boundary and answer only from approved context.

This is room ${room}. This session is live and ephemeral. The browser may display an automated transcript, which can contain transcription errors.

APPROVED HIVE BRIEFING:
${hiveBriefing}`;

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
                  prompt: `Private NULLWORKS Huddle with ${hostName} and ${guestName}.`,
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
        {
          name: "compatibility",
          session: {
            type: "realtime",
            model,
            instructions,
          },
        },
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
        lastFailure = {
          status: upstream.response.status,
          model,
          profile: profile.name,
          ...parsed,
        };
        console.error(
          "OpenAI Realtime call creation failed",
          JSON.stringify(lastFailure).slice(0, 1400),
        );

        if (![400, 404].includes(upstream.response.status)) break;
      }

      if (lastFailure && ![400, 404].includes(lastFailure.status)) break;
    }

    return Response.json(
      {
        ok: false,
        error: "Realtime session creation failed.",
        upstreamStatus: lastFailure?.status,
        upstreamMessage: lastFailure?.message,
        upstreamCode: lastFailure?.code,
        upstreamParam: lastFailure?.param,
        attemptedModel: lastFailure?.model,
        attemptedProfile: lastFailure?.profile,
      },
      { status: 502 },
    );
  } catch (error) {
    console.error("OpenAI Realtime network failure", error);
    return Response.json({ ok: false, error: "Realtime network failure." }, { status: 502 });
  }
}
