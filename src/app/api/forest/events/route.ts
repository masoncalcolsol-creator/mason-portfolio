import {
  createForestSubmission,
  forestErrorResponse,
  getForestSubmission,
  type ForestSubmissionInput,
} from "@/lib/forest-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const receipt = new URL(request.url).searchParams.get("receipt") || "";
    const event = await getForestSubmission(receipt);
    if (!event) {
      return Response.json(
        { ok: false, error: { code: "RECEIPT_NOT_FOUND", message: "No durable Forest event matches this receipt." } },
        { status: 404, headers: { "Cache-Control": "no-store" } },
      );
    }
    return Response.json(
      {
        ok: true,
        event,
        canonicalEffect: "NONE",
        note: "This receipt verifies a submitted event. Publication requires a separate review and canonical-version event.",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return forestErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as ForestSubmissionInput;
    const event = await createForestSubmission(request, input);
    return Response.json(
      {
        ok: true,
        event,
        storage: "SERVER_DURABLE",
        canonicalEffect: "NONE",
      },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return forestErrorResponse(error);
  }
}
