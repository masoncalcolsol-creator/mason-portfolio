export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const REPO = "masoncalcolsol-creator/mason-portfolio";
const BRANCH = "main";
const LOCK_PATH = "src/app/chainsaw/photo-upload-complete.ts";
const MAX_FILES = 5;
const MAX_BYTES = 1_800_000;
const CHUNK_SIZE = 60_000;

function token() {
  return process.env.PORTFOLIO_GITHUB_TOKEN
    || process.env.HIVE_GITHUB_TOKEN
    || process.env.GITHUB_TOKEN
    || "";
}

async function github(path: string, init: RequestInit = {}) {
  const response = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token()}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "content-type": "application/json",
      "user-agent": "NULLWORKS-Mr-Smith-Image-Ingest",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  const text = await response.text();
  let data: unknown = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text }; }
  if (!response.ok) {
    throw new Error(`GitHub ${response.status}: ${JSON.stringify(data).slice(0, 700)}`);
  }
  return data as Record<string, any>;
}

async function lockExists() {
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${LOCK_PATH}?ref=${BRANCH}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token()}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "user-agent": "NULLWORKS-Mr-Smith-Image-Ingest",
      },
      cache: "no-store",
    },
  );
  return response.ok;
}

async function createTextBlob(content: string) {
  const result = await github("/git/blobs", {
    method: "POST",
    body: JSON.stringify({ content, encoding: "utf-8" }),
  });
  return String(result.sha);
}

export async function POST(request: Request) {
  try {
    if (!token()) {
      return Response.json({ ok: false, error: "Portfolio GitHub write token is unavailable." }, { status: 503 });
    }

    if (await lockExists()) {
      return Response.json({ ok: false, error: "The one-use chainsaw photo ingest is already closed." }, { status: 409 });
    }

    const form = await request.formData();
    const files = form.getAll("photos").filter((value): value is File => value instanceof File);
    if (!files.length || files.length > MAX_FILES) {
      return Response.json({ ok: false, error: "Choose between one and five photos." }, { status: 400 });
    }

    const writes: Array<{ path: string; content: string }> = [];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      if (file.type !== "image/webp") {
        return Response.json({ ok: false, error: `Photo ${index + 1} was not converted to WebP.` }, { status: 400 });
      }
      if (file.size > MAX_BYTES) {
        return Response.json({ ok: false, error: `Photo ${index + 1} is still too large after compression.` }, { status: 413 });
      }

      const payload = Buffer.from(await file.arrayBuffer()).toString("base64");
      const chunks = Array.from(
        { length: Math.ceil(payload.length / CHUNK_SIZE) },
        (_, chunkIndex) => payload.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE),
      );

      chunks.forEach((chunk, chunkIndex) => {
        writes.push({
          path: `src/app/chainsaw/photo-data/photo${index}-chunks/chunk${chunkIndex}.ts`,
          content: `export default ${JSON.stringify(chunk)};\n`,
        });
      });

      const imports = chunks
        .map((_, chunkIndex) => `import chunk${chunkIndex} from "./photo${index}-chunks/chunk${chunkIndex}";`)
        .join("\n");
      const joined = chunks.map((_, chunkIndex) => `chunk${chunkIndex}`).join(" + ");
      writes.push({
        path: `src/app/chainsaw/photo-data/photo${index}.ts`,
        content: `${imports}\n\nexport const photo${index} = ${joined};\n`,
      });
    }

    for (let index = files.length; index < MAX_FILES; index += 1) {
      writes.push({
        path: `src/app/chainsaw/photo-data/photo${index}.ts`,
        content: `export const photo${index} = "";\n`,
      });
    }

    writes.push({
      path: "src/app/chainsaw/photo-manifest.ts",
      content: `export const chainsawPhotoCount = ${files.length};\n`,
    });
    writes.push({
      path: LOCK_PATH,
      content: `export const chainsawPhotoUploadComplete = ${JSON.stringify(new Date().toISOString())};\n`,
    });

    const headRef = await github(`/git/ref/heads/${BRANCH}`);
    const parentSha = String(headRef.object.sha);
    const parentCommit = await github(`/git/commits/${parentSha}`);

    const blobEntries = await Promise.all(
      writes.map(async (write) => ({
        path: write.path,
        mode: "100644",
        type: "blob",
        sha: await createTextBlob(write.content),
      })),
    );

    const tree = await github("/git/trees", {
      method: "POST",
      body: JSON.stringify({ base_tree: parentCommit.tree.sha, tree: blobEntries }),
    });
    const commit = await github("/git/commits", {
      method: "POST",
      body: JSON.stringify({
        message: `Install ${files.length} chainsaw photos with Mr Smith asset pipeline`,
        tree: tree.sha,
        parents: [parentSha],
      }),
    });
    await github(`/git/refs/heads/${BRANCH}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha, force: false }),
    });

    return Response.json({
      ok: true,
      count: files.length,
      commit: commit.sha,
      message: "Photo payload committed. Vercel deployment is starting.",
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : "Chainsaw photo ingest failed." },
      { status: 500 },
    );
  }
}
