import { speak, twiml, xmlEscape } from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type HiveStatus = {
  ok: boolean;
  mode: "HIVE_CONNECTED" | "HIVE_TOKEN_MISSING" | "HIVE_READ_FAILED";
  bootVersion?: string;
  floorVersion?: string;
  floorStatus?: string;
  company?: string;
  category?: string;
  readiness?: string;
  exactNextAction?: string;
  floorExcerpt?: string;
  bootExcerpt?: string;
  error?: string;
};

const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const DEFAULT_OPENAI_MODEL = "gpt-5.5";
const RAW_OPENAI_MODEL = (process.env.OPENAI_MODEL || "").trim();
const OPENAI_MODEL = !RAW_OPENAI_MODEL || RAW_OPENAI_MODEL.toLowerCase().includes("luna")
  ? DEFAULT_OPENAI_MODEL
  : RAW_OPENAI_MODEL;

function pickYamlValue(content: string, key: string): string | undefined {
  const match = content.match(new RegExp(`^${key}:\\s*["']?([^\\n"']+)`, "m"));
  return match?.[1]?.trim();
}

function excerpt(content: string, max = 3200): string {
  return content.length <= max ? content : `${content.slice(0, max)}\n...[truncated for phone context]`;
}

async function fetchHiveFile(path: string): Promise<string> {
  if (!HIVE_TOKEN) throw new Error("HIVE_GITHUB_TOKEN missing");
  const url = `https://api.github.com/repos/${HIVE_REPO}/contents/${encodeURIComponent(path).replaceAll("%2F", "/")}?ref=${encodeURIComponent(HIVE_BRANCH)}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${HIVE_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "NULLWORKS-Neuraxis-Twilio-Hive-Bridge",
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`GitHub read failed for ${path}: ${response.status}`);
  const data = await response.json() as { content?: string };
  if (!data.content) throw new Error(`GitHub file missing content: ${path}`);
  return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function readHiveStatus(): Promise<HiveStatus> {
  if (!HIVE_TOKEN) return { ok: false, mode: "HIVE_TOKEN_MISSING", error: "Hosting environment is missing HIVE_GITHUB_TOKEN." };
  try {
    const boot = await fetchHiveFile("HIVE_BOOT.yaml");
    const floorPath = pickYamlValue(boot, "company_floor") || "hive/current/company_floor.yaml";
    const floor = await fetchHiveFile(floorPath);
    return {
      ok: true,
      mode: "HIVE_CONNECTED",
      bootVersion: pickYamlValue(boot, "version"),
      floorVersion: pickYamlValue(floor, "floor_version"),
      floorStatus: pickYamlValue(floor, "status"),
      company: pickYamlValue(floor, "company"),
      category: pickYamlValue(floor, "category"),
      readiness: pickYamlValue(floor, "readiness"),
      exactNextAction: pickYamlValue(floor, "exact_next_action"),
      bootExcerpt: excerpt(boot, 1800),
      floorExcerpt: excerpt(floor, 3600),
    };
  } catch (error) {
    return { ok: false, mode: "HIVE_READ_FAILED", error: error instanceof Error ? error.message : "Unknown Hive read failure" };
  }
}

async function readCommand(request: Request): Promise<{ text: string; callSid: string }> {
  const params = new URLSearchParams(await request.text());
  return {
    text: `${params.get("SpeechResult") || ""} ${params.get("Digits") || ""}`.trim(),
    callSid: params.get("CallSid") || "unknown-call",
  };
}

function clampPhoneAnswer(text: string): string {
  const cleaned = text.replace(/[`*_#]/g, "").replace(/\s+/g, " ").trim();
  if (cleaned.length <= 560) return cleaned;
  return `${cleaned.slice(0, 520)}. Ask me to continue if you want the next part.`;
}

function extractOutputText(data: unknown): string {
  const record = data as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };
  return record.output_text
    || record.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join(" ")
    || "I heard you, but I did not get a usable answer.";
}

function conceptAnswer(command: string): string | undefined {
  if (/polymath\s*(squared|square|2|two)|polymath²/.test(command)) {
    return "Polymath squared is Mason's term for a polymath whose range is multiplied by a coordinated digital company. He is the Da Vinci-like human across physical disciplines, then extends that reach across digital time and space through specialist workrooms, memory, evidence, and parallel execution. The second digital life adds to his physical life instead of replacing it.";
  }

  if (/phrononaut|fro[- ]?no[- ]?(not|knot)|frow[- ]?no[- ]?(not|knot)|frononaut/.test(command)) {
    return "Phrononaut, pronounced fro-no-not, is Mason's term for a navigator of practical wisdom. It means useful insight can come from anywhere, especially the person closest to the work, while recognizing that curiosity still needs an attention budget. It is not a hairstyle.";
  }

  if (/da\s*vinci|davinci/.test(command)) {
    return "Da Vinci represents broad individual capability. Mason has that cross-domain systems range, and NULLWORKS adds the Toyota layer: bounded digital specialists, repeatable work cells, review, continuity, and scale across digital time and space.";
  }

  if (/who is mason|what does mason|tell me about mason/.test(command)) {
    return "Mason Perry is the founder of NULLWORKS and a pioneering Operational Intelligence Systems Architect. He works from the outcome backward, connecting physical operations, people, AI, software, authority, evidence, and implementation.";
  }

  if (/what is nullworks|what does nullworks|who is nullworks/.test(command)) {
    return "NULLWORKS builds the operating company around AI workers: roles, workflow, authority, evidence, exceptions, memory, review, and telemetry. The model may be the worker. The operator still needs the factory.";
  }

  if (/what is oisa|what does oisa|operational intelligence systems architect/.test(command)) {
    return "An OISA connects operations, AI, software, data, authority, evidence, exceptions, human judgment, and implementation into one working organizational system.";
  }

  return undefined;
}

async function askOpenAI(userSpeech: string, status: HiveStatus, callSid: string, room: "private" | "workroom"): Promise<string> {
  if (!OPENAI_API_KEY) return "Natural conversation is temporarily unavailable. The phone gateway is still online.";

  const roomRule = room === "private"
    ? "This is Mason's caller-ID-gated private lane. Mason remains final Human Authority."
    : "This is the shared workroom. Do not expose compartmentalized or unnecessary private context.";
  const instructions = `You are NEURAXIS, the NULLWORKS Organizational Intelligence phone gateway. You are not an AI assistant and must never call yourself one. ${roomRule}

Speak conversationally. Answer the caller's immediate question in one to three short sentences. Give one step at a time. Never dump a status report, long list, implementation inventory, or generic explanation unless explicitly asked. Ask at most one useful follow-up question. Use the Hive context as current operating context. Do not claim live synchronization, deployment, endorsement, approval, or verification without a receipt. Do not expose secrets, credentials, protected personal data, or private compartmentalized context. If uncertain, say what is unknown. Be warm, blunt, and operational.

Locked public meanings:
- Mason Perry is Founder of NULLWORKS and a pioneering Operational Intelligence Systems Architect.
- AI is part of the system, not the system itself.
- Polymath squared means Mason's broad physical-world capability is multiplied by a coordinated digital company operating across digital time and space. His second digital life adds to his normal physical life rather than replacing it.
- Da Vinci represents broad individual capability. Toyota represents bounded specialists, repeatable work cells, quality gates, continuity, and scale.
- Phrononaut, pronounced fro-no-not, means navigator of practical wisdom: insight can come from anywhere, especially the person closest to the work, but curiosity needs an attention budget.
- NULLWORKS builds the operating company around AI workers: roles, workflow, authority, evidence, exceptions, memory, review, and telemetry.`;

  const input = `CALL SID: ${callSid}
ROOM: ${room}
HIVE MODE: ${status.mode}
BOOT VERSION: ${status.bootVersion || "unknown"}
FLOOR VERSION: ${status.floorVersion || "unknown"}
COMPANY: ${status.company || "NULLWORKS"}
CATEGORY: ${status.category || "Operational Intelligence systems architecture"}
READINESS: ${status.readiness || status.floorStatus || "unknown"}
EXACT NEXT ACTION: ${status.exactNextAction || "unknown"}

HIVE BOOT EXCERPT:
${status.bootExcerpt || "unavailable"}

COMPANY FLOOR EXCERPT:
${status.floorExcerpt || "unavailable"}

CALLER SAID:
${userSpeech || "status"}`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        instructions,
        input,
        max_output_tokens: 170,
      }),
    });

    if (!response.ok) {
      console.error("NEURAXIS OpenAI response failed", response.status, (await response.text()).slice(0, 500));
      return "Natural conversation hit a temporary model error. Try the question once more.";
    }

    return clampPhoneAnswer(extractOutputText(await response.json()));
  } catch (error) {
    console.error("NEURAXIS OpenAI network failure", error);
    return "Natural conversation is temporarily unavailable. Try again in a moment.";
  }
}

async function handle(request: Request): Promise<Response> {
  const { text, callSid } = request.method === "POST"
    ? await readCommand(request)
    : { text: "status", callSid: "browser-test" };
  const command = text.toLowerCase();
  const room = new URL(request.url).searchParams.get("room") === "private" ? "private" : "workroom";
  const status = await readHiveStatus();
  const voiceUrl = new URL(`/api/neuraxis/twilio/voice?loop=1&room=${room}`, request.url).toString();

  let spoken: string;
  const lockedConcept = conceptAnswer(command);
  if (lockedConcept) {
    spoken = lockedConcept;
  } else if (command === "1" || command.includes("hive status") || command === "status") {
    spoken = status.ok
      ? `Hive connected. The current company floor is ${status.floorStatus || "loaded"}. What do you want to inspect?`
      : "The phone line is online, but the Hive connection is unavailable.";
  } else if (command.includes("full spectrum") || command.includes("clone")) {
    spoken = "Full Spectrum Clone route confirmed. Current Hive files come first, Human Authority remains Mason, and unsupported claims stay marked unknown.";
  } else if (command.includes("log") || command.includes("receipt") || command.includes("save")) {
    spoken = "I understand the logging request, but this workroom does not have direct writeback enabled yet. Tell Mason what should be preserved and I will keep the request concise.";
  } else if (!status.ok) {
    spoken = "I heard you, but the Hive connection is unavailable right now. Try a basic question or call again shortly.";
  } else {
    spoken = await askOpenAI(text, status, callSid, room);
  }

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  ${speak(spoken, request.url)}
  <Pause length="1"/>
  <Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>
</Response>`);
}

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }
