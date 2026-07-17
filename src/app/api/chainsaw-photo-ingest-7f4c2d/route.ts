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

function headers(contentType = true) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token()}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "user-agent": "NULLWORKS-Mr-Smith-Image-Ingest",
    ...(contentType ? { "content-type": "application/json" } : {}),
  };
}

async function githubRest(path: string, init: RequestInit = {}) {
  const response = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...init,
    headers: { ...headers(), ...(init.headers || {}) },
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
    { headers: headers(false), cache: "no-store" },
  );
  return response.ok;
}

async function commitWithGraphQL(writes: Array<{ path: string; content: string }>) {
  const headRef = await githubRest(`/git/ref/heads/${BRANCH}`);
  const expectedHeadOid = String(headRef.object.sha);
  const query = `
    mutation InstallChainsawPhotos($input: CreateCommitOnBranchInput!) {
      createCommitOnBranch(input: $input) {
        commit { oid url }
      }
    }
  `;
  const variables = {
    input: {
      branch: { repositoryNameWithOwner: REPO, branchName: BRANCH },
      message: { headline: "Install chainsaw photos with Mr Smith asset pipeline" },
      expectedHeadOid,
      fileChanges: {
        additions: writes.map((write) => ({
          path: write.path,
          contents: Buffer.from(write.content, "utf8").toString("base64"),
        })),
      },
    },
  };

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const result = await response.json() as Record<string, any>;
  if (!response.ok || result.errors?.length || !result.data?.createCommitOnBranch?.commit?.oid) {
    throw new Error(`GitHub GraphQL ${response.status}: ${JSON.stringify(result.errors || result).slice(0, 900)}`);
  }
  return String(result.data.createCommitOnBranch.commit.oid);
}

function encodePath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function putContent(path: string, content: string, message: string) {
  let sha: string | undefined;
  const current = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${encodePath(path)}?ref=${BRANCH}`,
    { headers: headers(false), cache: "no-store" },
  );
  if (current.ok) {
    const data = await current.json() as Record<string, any>;
    sha = String(data.sha || "") || undefined;
  } else if (current.status !== 404) {
    throw new Error(`GitHub ${current.status}: unable to inspect ${path}`);
  }

  const result = await githubRest(`/contents/${encodePath(path)}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      branch: BRANCH,
      content: Buffer.from(content, "utf8").toString("base64"),
      ...(sha ? { sha } : {}),
    }),
  });
  return String(result.commit?.sha || "");
}

async function commitWithContentsApi(writes: Array<{ path: string; content: string }>) {
  let lastCommit = "";
  for (let index = 0; index < writes.length; index += 1) {
    const write = writes[index];
    lastCommit = await putContent(
      write.path,
      write.content,
      `Install chainsaw photo payload ${index + 1}/${writes.length}`,
    );
  }
  return lastCommit;
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
      writes.push({
        path: `src/app/chainsaw/photo-data/photo${index}.ts`,
        content: `export const photo${index} = [\n${chunks.map((chunk) => `  ${JSON.stringify(chunk)}`).join(",\n")}\n].join("");\n`,
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

    let commit = "";
    let transport = "graphql-createCommitOnBranch";
    try {
      commit = await commitWithGraphQL(writes);
    } catch (graphqlError) {
      transport = "contents-api-fallback";
      commit = await commitWithContentsApi(writes);
      if (!commit) throw graphqlError;
    }

    return Response.json({
      ok: true,
      count: files.length,
      commit,
      transport,
      message: "Photo payload committed. Vercel deployment is starting.",
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : "Chainsaw photo ingest failed." },
      { status: 500 },
    );
  }
}
