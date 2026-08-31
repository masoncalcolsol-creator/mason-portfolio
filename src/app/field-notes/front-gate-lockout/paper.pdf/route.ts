import { NextResponse } from "next/server";
import PAPER_PDF_B64 from "../_paper.b64";

export async function GET() {
  const bytes = Buffer.from(PAPER_PDF_B64.replace(/\s+/g, ""), "base64");
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=\"NULLWORKS_Front_Gate_Lockout_2026-08-31.pdf\"",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
