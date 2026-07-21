import c0 from "@/app/instantiation/assets/current-0";
import c1 from "@/app/instantiation/assets/current-1";
import c2 from "@/app/instantiation/assets/current-2";
import c3 from "@/app/instantiation/assets/current-3";

export const dynamic = "force-static";

export function GET() {
  const body = Uint8Array.from(Buffer.from(c0 + c1 + c2 + c3, "base64"));

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(body.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition":
        'inline; filename="Instantiation_v0.8_Public_Red_Team_Edition.pdf"',
      ETag: '"fd3ffa8ba35b53804f9f878a8a74760d09120f6accd2b4e667dd439ba05593e9"',
    },
  });
}
