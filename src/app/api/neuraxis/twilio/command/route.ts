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
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.5-mini";

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function pickYamlValue(content: string, key: string): string | undefined {
  const match = content.match(new RegExp(`^${key}:\\s*[\"']?([^\\n\"']+)`, "m"));
  return match?.[1]?.trim();
}

function excerpt(content: string, max = 3600): string {
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
  if (!HIVE_TOKEN) {
    return { ok: false, mode: "HIVE_TOKEN_MISSING", error: "Hosting environment is missing HIVE_GITHUB_TOKEN." };
  }
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
      bootExcerpt: excerpt(boot, 2400),
      floorExcerpt: excerpt(floor, 5200),
    };
  } catch (error) {
    return { ok: false, mode: "HIVE_READ_FAILED", error: error instanceof Error ? error.message : "Unknown Hive read failure" };
  }
}

function say(text: string): string {
  return `<Say language="en-US">${xmlEscape(text)}</Say>`;
}

function twiml(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/xml; charset=utf-8", "cache-control": "no-store" },
  });
}

async function readCommand(request: Request): Promise<{ text: string; callSid: string }> {
  const body = await request.text();
  const params = new URLSearchParams(body);
  const speech = params.get("SpeechResult") || "";
  const digits = params.get("Digits") || "";
  const callSid = params.get("CallSid") || "unknown-call";
  return { text: `${speech} ${digits}`.trim(), callSid };
}

function clampPhoneAnswer(text: string): string {
  const cleaned = text
    .replace(/[`*_#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length <= 950) return cleaned;
  return `${cleaned.slice(0, 900)}. I am trimming there for the phone call. Ask me to continue if you want the next part.`;
}

async function askOpenAI(userSpeech: string, status: HiveStatus, callSid: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    return "Natural conversation is not connected yet because OPENAI_API_KEY is missing in Vercel. I can still answer menu commands like Hive status, full spectrum clone, and log to Hive.";
  }

  const system = `You are Neuraxis, the NULLWORKS phone gateway. You are speaking over a phone call, so answer conversationally in 1 to 4 short spoken paragraphs. Mason Perry is Founder and final Human Authority. Use the Hive excerpts below as current operating context. Do not claim live synchronization, deployment, endorsement, referral, interview, or institutional approval without a receipt. Do not expose secrets, tokens, private keys, passwords, or unnecessary protected personal details. If asked to save/write/log something to Hive, explain that direct phone writeback is not enabled yet unless the current code says otherwise, and route Mason to the Gmail dropbox phrase or ask him to confirm in ChatGPT. Be helpful, blunt, and operational. If uncertain, say what is unknown.`;

  const context = `CALL SID: ${callSid}\nHIVE MODE: ${status.mode}\nBOOT VERSION: ${status.bootVersion || "unknown"}\nFLOOR VERSION: ${status.floorVersion || "unknown"}\nCOMPANY: ${status.company || "NULLWORKS"}\nCATEGORY: ${status.category || "Operational Intelligence systems architecture"}\nREADINESS: ${status.readiness || status.floorStatus || "unknown"}\nEXACT NEXT ACTION: ${status.exactNextAction || "unknown"}\n\nHIVE BOOT EXCERPT:\n${status.bootExcerpt || "unavailable"}\n\nCOMPANY FLOOR EXCERPT:\n${status.floorExcerpt || "unavailable"}`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        instructions: system,
        input: [
          { role: "system", content: [{ type: "input_text", text: context }] },
          { role: "user", content: [{ type: "input_text", text: userSpeech || "status" }] },
        ],
        max_output_tokens: 260,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return `Natural conversation reached OpenAI but failed with status ${response.status}. The Hive bridge still works. Error receipt should be checked in Vercel logs.`;
    }

    const data = await response.json() as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> };
    const text = data.output_text || data.output?.flatMap(item => item.content || []).map(item => item.text || "").join(" ") || "I heard you, but I did not get a usable model response.";
    return clampPhoneAnswer(text);
  } catch {
    return "Natural conversation failed during the OpenAI call. The Hive bridge is still online, but the phone brain needs the Vercel logs checked.";
  }
}

async function handle(request: Request): Promise<Response> {
  const { text, callSid } = request.method === "POST" ? await readCommand(request) : { text: "status", callSid: "browser-test" };
  const command = text.toLowerCase();
  const status = await readHiveStatus();
  const voiceUrl = new URL("/api/neuraxis/twilio/voice", request.url).toString();

  let spoken: string;

  if (!status.ok) {
    spoken = `Neuraxis received your words, but Hive Brain is not live connected. Mode ${status.mode}. ${status.error || ""}`;
  } else if (command === "1" || command.includes("hive status") || command === "status") {
    spoken = `Hive status. Boot version ${status.bootVersion || "unknown"}. ${status.company || "NULLWORKS"}. Floor version ${status.floorVersion || "unknown"}. Readiness ${status.readiness || status.floorStatus || "unknown"}.`;
  } else if (command.includes("full spectrum") || command.includes("clone")) {
    spoken = `Full Spectrum Clone route confirmed. Hive boot version ${status.bootVersion || "unknown"}. Company floor ${status.floorVersion || "unknown"}. Human Authority remains Mason Perry. Use current Hive files first, then project receipts. Do not overclaim.`;
  } else if (command.includes("log") || command.includes("receipt") || command.includes("save")) {
    spoken = `I can understand the logging request, but direct phone writeback is not enabled yet. Use the Gmail drop box phrase: hashtag Neuraxis log into Hive. Then ask ChatGPT to retrieve the email and write the Hive receipt.`;
  } else {
    spoken = await askOpenAI(text, status, callSid);
  }

  const response = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  ${say(spoken)}
  <Pause length="1"/>
  <Redirect method="POST">${xmlEscape(voiceUrl)}</Redirect>
</Response>`;

  return twiml(response);
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
