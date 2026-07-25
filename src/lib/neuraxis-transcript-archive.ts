import crypto from "node:crypto";

const HIVE_REPO = process.env.HIVE_REPO || "masoncalcolsol-creator/nullworks-corporate-wifi-hive";
const HIVE_BRANCH = process.env.HIVE_BRANCH || "main";
const HIVE_TOKEN = process.env.HIVE_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";
const TRANSCRIPT_ROOT = "hive/transcripts/pressure-cooker";

export type PressureCookerTranscriptTurn = {
  index: number;
  recorded_at: string;
  participant_role: "admin" | "guest";
  input_mode: "VOICE_TRANSCRIPTION" | "TEXT_INPUT";
  participant_text: string;
  workroom_answer: string;
  answer_complete: boolean;
  transport: "DIRECT_BROWSER_AUDIO";
  international_pstn_leg: false;
  transcription_model: string;
  response_model: string;
  tts_model: string;
};

export type PressureCookerTranscriptArchive = {
  schema_version: "1.0";
  reference: string;
  workroom_id: "NULLWORKS_PRESSURE_COOKER_DIRECT_BROWSER";
  session_id: string;
  consent_state: "PARTICIPANT_OPT_IN";
  raw_audio_preserved: false;
  created_at: string;
  updated_at: string;
  turns: PressureCookerTranscriptTurn[];
};

type GithubFile = { sha?: string; content?: string; name?: string; path?: string; type?: string };

function safeSessionId(value: string): string {
  return String(value || "unknown-session").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 90);
}

function archivePath(sessionId: string): string {
  return `${TRANSCRIPT_ROOT}/${safeSessionId(sessionId)}.json`;
}

function archiveReference(sessionId: string): string {
  const digest = crypto.createHash("sha256").update(sessionId, "utf8").digest("hex").slice(0, 10).toUpperCase();
  return `PC-TRANSCRIPT-${digest}`;
}

function repoParts(): { owner: string; repo: string } {
  const [owner, repo] = HIVE_REPO.split("/");
  if (!owner || !repo) throw new Error("HIVE_REPO must be owner/repository.");
  return { owner, repo };
}

function headers(): Record<string, string> {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${HIVE_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
    "User-Agent": "NULLWORKS-Pressure-Cooker-Transcript-Archive",
  };
}

async function readArchive(sessionId: string): Promise<{ archive?: PressureCookerTranscriptArchive; sha?: string }> {
  if (!HIVE_TOKEN) throw new Error("HIVE_GITHUB_TOKEN missing");
  const { owner, repo } = repoParts();
  const path = archivePath(sessionId);
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replaceAll("%2F", "/")}?ref=${encodeURIComponent(HIVE_BRANCH)}`,
    { headers: headers(), cache: "no-store" },
  );
  if (response.status === 404) return {};
  if (!response.ok) throw new Error(`Transcript archive read failed: ${response.status}`);
  const file = await response.json() as GithubFile;
  if (!file.content) throw new Error("Transcript archive content missing");
  const archive = JSON.parse(Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8")) as PressureCookerTranscriptArchive;
  return { archive, sha: file.sha };
}

async function writeArchive(archive: PressureCookerTranscriptArchive, sha?: string): Promise<void> {
  if (!HIVE_TOKEN) throw new Error("HIVE_GITHUB_TOKEN missing");
  const { owner, repo } = repoParts();
  const path = archivePath(archive.session_id);
  const body: Record<string, unknown> = {
    message: `pressure cooker transcript: ${archive.reference}`,
    branch: HIVE_BRANCH,
    content: Buffer.from(`${JSON.stringify(archive, null, 2)}\n`, "utf8").toString("base64"),
  };
  if (sha) body.sha = sha;
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path).replaceAll("%2F", "/")}`,
    { method: "PUT", headers: headers(), body: JSON.stringify(body), cache: "no-store" },
  );
  if (!response.ok) throw new Error(`Transcript archive write failed: ${response.status} ${(await response.text()).slice(0, 240)}`);
}

export async function appendPressureCookerTranscript(input: {
  sessionId: string;
  participantRole: "admin" | "guest";
  inputMode: "VOICE_TRANSCRIPTION" | "TEXT_INPUT";
  participantText: string;
  workroomAnswer: string;
  answerComplete: boolean;
  transcriptionModel: string;
  responseModel: string;
  ttsModel: string;
}): Promise<{ reference: string; turnIndex: number }> {
  const now = new Date().toISOString();
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const existing = await readArchive(input.sessionId);
    const base: PressureCookerTranscriptArchive = existing.archive || {
      schema_version: "1.0",
      reference: archiveReference(input.sessionId),
      workroom_id: "NULLWORKS_PRESSURE_COOKER_DIRECT_BROWSER",
      session_id: safeSessionId(input.sessionId),
      consent_state: "PARTICIPANT_OPT_IN",
      raw_audio_preserved: false,
      created_at: now,
      updated_at: now,
      turns: [],
    };
    const turn: PressureCookerTranscriptTurn = {
      index: (base.turns.at(-1)?.index || 0) + 1,
      recorded_at: now,
      participant_role: input.participantRole,
      input_mode: input.inputMode,
      participant_text: input.participantText.slice(0, 12000),
      workroom_answer: input.workroomAnswer.slice(0, 24000),
      answer_complete: input.answerComplete,
      transport: "DIRECT_BROWSER_AUDIO",
      international_pstn_leg: false,
      transcription_model: input.transcriptionModel,
      response_model: input.responseModel,
      tts_model: input.ttsModel,
    };
    const next = { ...base, updated_at: now, turns: [...base.turns, turn].slice(-200) };
    try {
      await writeArchive(next, existing.sha);
      return { reference: next.reference, turnIndex: turn.index };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!/409|422/.test(message) || attempt === 3) throw error;
    }
  }
  throw new Error("Transcript archive retries exhausted");
}

async function listArchives(): Promise<GithubFile[]> {
  if (!HIVE_TOKEN) throw new Error("HIVE_GITHUB_TOKEN missing");
  const { owner, repo } = repoParts();
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(TRANSCRIPT_ROOT).replaceAll("%2F", "/")}?ref=${encodeURIComponent(HIVE_BRANCH)}&per_page=100`,
    { headers: headers(), cache: "no-store" },
  );
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`Transcript directory read failed: ${response.status}`);
  const items = await response.json() as GithubFile[];
  return items.filter((item) => item.type === "file" && item.name?.endsWith(".json")).slice(-100);
}

export async function searchPressureCookerTranscripts(query: string, limit = 20): Promise<Array<{
  reference: string;
  updated_at: string;
  turn_index: number;
  participant_role: "admin" | "guest";
  participant_excerpt: string;
  answer_excerpt: string;
}>> {
  const terms = String(query || "").toLowerCase().split(/\s+/).map((term) => term.trim()).filter(Boolean).slice(0, 8);
  if (!terms.length) return [];
  const files = await listArchives();
  const archives = await Promise.all(files.map(async (item) => {
    if (!item.path) return null;
    const { owner, repo } = repoParts();
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(item.path).replaceAll("%2F", "/")}?ref=${encodeURIComponent(HIVE_BRANCH)}`,
      { headers: headers(), cache: "no-store" },
    );
    if (!response.ok) return null;
    const file = await response.json() as GithubFile;
    if (!file.content) return null;
    try {
      return JSON.parse(Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8")) as PressureCookerTranscriptArchive;
    } catch {
      return null;
    }
  }));

  const results: Array<{
    reference: string;
    updated_at: string;
    turn_index: number;
    participant_role: "admin" | "guest";
    participant_excerpt: string;
    answer_excerpt: string;
    score: number;
  }> = [];
  for (const archive of archives) {
    if (!archive) continue;
    for (const turn of archive.turns) {
      const haystack = `${turn.participant_text}\n${turn.workroom_answer}`.toLowerCase();
      const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
      if (score !== terms.length) continue;
      results.push({
        reference: archive.reference,
        updated_at: turn.recorded_at,
        turn_index: turn.index,
        participant_role: turn.participant_role,
        participant_excerpt: turn.participant_text.slice(0, 420),
        answer_excerpt: turn.workroom_answer.slice(0, 700),
        score,
      });
    }
  }
  return results
    .sort((a, b) => b.score - a.score || b.updated_at.localeCompare(a.updated_at))
    .slice(0, Math.max(1, Math.min(limit, 50)))
    .map(({ score: _score, ...result }) => result);
}
