import { NextResponse } from "next/server";

export const runtime = "nodejs";

const FALLBACK_ENDPOINT = "https://anvil-custom-records.vercel.app/api/try";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const form = body.form || {};
    const packet = String(body.packet || "").trim();

    if (!packet) {
      return NextResponse.json(
        { ok: false, error: "Forge packet is required." },
        { status: 400 }
      );
    }

    const endpoint = process.env.ANVIL_TRY_ENDPOINT || FALLBACK_ENDPOINT;

    const forwardedBody = {
      contact: String(form.contact || form.customerContact || "nullworks.ai@gmail.com"),
      packet,
      name: String(form.recipient || "ANVIL Song Forge Visitor"),
      creator: String(form.recipient || "ANVIL Song Forge Visitor"),
      org: "NULLWORKS ANVIL / Song Forge",
      usage: String(form.useCase || "Song forge intake"),
      genre: "ANVIL Song Forge",
      avoid: String(form.rating || "Human review required."),
      lane: "anvil-song-forge",
      route: "/anvil-song-forge",
      albumType: "Song Forge Request",
      genreId: "anvil-song-forge",
      privacySetting: "Private beta",
      operatorNotes: "Submitted from Mason portfolio /anvil-song-forge.",
      emotionalTarget: [
        "AI-assisted custom song",
        "Human-reviewed",
        "Creative packet"
      ],
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forwardedBody),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      return NextResponse.json(
        { ok: false, error: data.error || "Forge submit failed.", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      routedTo: endpoint,
      requestId: data.requestId || data.id || null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to submit forge packet.",
      },
      { status: 500 }
    );
  }
}
