import { writeHiveReceipt } from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const recent = new Map<string, number>();

function clean(value: unknown, max: number): string {
  return String(value || "").trim().slice(0, max);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const last = recent.get(ip) || 0;
  if (now - last < 5_000) return Response.json({ ok: false, error: "Please wait a few seconds and try again." }, { status: 429 });
  recent.set(ip, now);

  let body: Record<string, unknown>;
  try { body = await request.json(); }
  catch { return Response.json({ ok: false, error: "Invalid request." }, { status: 400 }); }

  if (clean(body.website, 100)) return Response.json({ ok: true });
  const reference = clean(body.reference, 32).toUpperCase();
  const email = clean(body.email, 240);
  const name = clean(body.name, 160);
  const company = clean(body.company, 200);
  const notes = clean(body.notes, 8000);
  if (!/^NW-[A-F0-9]{8}$/.test(reference)) return Response.json({ ok: false, error: "That audit reference is not valid." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(email)) return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });

  const receipt = await writeHiveReceipt({
    reference,
    category: "ai_audit_continuation",
    payload: {
      event_type: "AI_AUDIT_CONTINUATION",
      truth_state: "USER_REPORTED",
      reference,
      email,
      name: name || null,
      company: company || null,
      additional_context: notes || null,
      consent: body.consent === true,
      submitted_at: new Date().toISOString(),
      boundary: "Contact and context supplied by the person using the SMS continuation link. Identity is not independently authenticated.",
    },
  });

  if (!receipt.ok) return Response.json({ ok: false, error: "The continuation could not be stored. Keep your reference and contact Mason directly." }, { status: 503 });
  return Response.json({ ok: true, reference });
}
