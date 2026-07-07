export const runtime = "nodejs";

export async function GET() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">
      <title id="title">Chute-edge installation condition</title>
      <desc id="desc">Privacy-safe field evidence card representing the physical transition condition documented in the Toyota recruiter field case.</desc>
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#07121a"/>
          <stop offset="1" stop-color="#101719"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#bg)"/>
      <rect x="90" y="90" width="1420" height="820" rx="54" fill="#f2ecdf"/>
      <path d="M270 670 L720 370 L1320 370 L1320 510 L770 510 L350 790 Z" fill="#a9afb0" stroke="#172127" stroke-width="18"/>
      <path d="M720 370 L770 510" stroke="#d8ff3f" stroke-width="28"/>
      <circle cx="744" cy="440" r="84" fill="none" stroke="#d8ff3f" stroke-width="12"/>
      <path d="M803 500 L950 647" stroke="#172127" stroke-width="16"/>
      <text x="950" y="690" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="#172127">PHYSICAL CATCH POINT</text>
      <text x="150" y="195" font-family="Arial, sans-serif" font-size="34" font-weight="800" letter-spacing="6" fill="#68791c">PRIVACY-SAFE FIELD EVIDENCE</text>
      <text x="150" y="865" font-family="Arial, sans-serif" font-size="32" fill="#4f554f">The documented root cause was a physical transition condition—not a software configuration fault.</text>
    </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
