import { getForestStoreStatus } from "@/lib/forest-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const storage = await getForestStoreStatus();
  return Response.json(
    {
      system: "LIVE_LEARNING_FOREST",
      groveVersion: "1.0",
      canonicalHost: "mason-portfolio-main.vercel.app",
      canonicalUrl: "https://mason-portfolio-main.vercel.app/forest",
      storage,
      writesEnabled: storage.state === "READY",
      truthBoundary: "PUBLIC_SUBMISSIONS_CREATE_RECEIPTS_AND_REVIEW_WORK; THEY_DO_NOT_MUTATE_CANONICAL_CLAIMS",
      checkedAt: new Date().toISOString(),
    },
    {
      status: storage.state === "READY" ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
