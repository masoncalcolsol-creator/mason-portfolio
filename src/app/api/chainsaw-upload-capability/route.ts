export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      githubWriteAvailable: Boolean(
        process.env.HIVE_GITHUB_TOKEN ||
          process.env.GITHUB_TOKEN ||
          process.env.GH_TOKEN,
      ),
      vercelBlobAvailable: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      checkedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-NULLWORKS-Probe": "chainsaw-image-transport-v1",
      },
    },
  );
}
