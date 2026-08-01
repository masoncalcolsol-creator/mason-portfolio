import { continuityCalculusAvifBase64 } from "../../amanda-brief/continuityImage";

export const dynamic = "force-static";

export async function GET() {
  return new Response(Buffer.from(continuityCalculusAvifBase64, "base64"), {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/avif",
      "Content-Disposition":
        'inline; filename="NULLWORKS_Continuity_Calculus_Infographic.avif"',
      "X-Content-Type-Options": "nosniff",
    },
  });
}
