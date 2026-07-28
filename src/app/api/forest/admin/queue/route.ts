import {
  addForestReview,
  adminAuthorized,
  forestErrorResponse,
  listForestReviewQueue,
} from "@/lib/forest-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized() {
  return Response.json(
    { ok: false, error: { code: "UNAUTHORIZED", message: "Final Human Authority token required." } },
    { status: 401, headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET(request: Request) {
  if (!adminAuthorized(request)) return unauthorized();
  try {
    const queue = await listForestReviewQueue();
    return Response.json({ ok: true, queue }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return forestErrorResponse(error);
  }
}

export async function POST(request: Request) {
  if (!adminAuthorized(request)) return unauthorized();
  try {
    const body = await request.json();
    const review = await addForestReview({
      submissionReceipt: body.submissionReceipt,
      decision: body.decision,
      note: body.note,
    });
    return Response.json({ ok: true, review }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return forestErrorResponse(error);
  }
}
