import o0 from "@/app/instantiation/assets/original-0";
import o1 from "@/app/instantiation/assets/original-1";
import o2 from "@/app/instantiation/assets/original-2";

export const dynamic = "force-static";

export function GET() {
  const body = Uint8Array.from(Buffer.from(o0 + o1 + o2, "base64"));

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(body.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition":
        'inline; filename="Instantiation_v0.1_Original_Working_Draft.pdf"',
      ETag: '"1e2a20197a26acdbcb818578528ea075d4709452ca548ebc777ee3505f6b63cb"',
    },
  });
}
