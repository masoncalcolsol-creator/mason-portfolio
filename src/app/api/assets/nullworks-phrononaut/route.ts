const svg = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" role="img" aria-label="Original NULLWORKS Phrononaut industrial exosuit illustration">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#030608"/><stop offset=".55" stop-color="#091014"/><stop offset="1" stop-color="#020304"/></linearGradient>
  <radialGradient id="amber" cx="50%" cy="38%" r="58%"><stop stop-color="#d6a446" stop-opacity=".34"/><stop offset=".42" stop-color="#9b6b22" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
  <radialGradient id="core" cx="50%" cy="50%" r="55%"><stop stop-color="#f8ffff"/><stop offset=".18" stop-color="#d7fbff"/><stop offset=".48" stop-color="#73d6e6"/><stop offset=".72" stop-color="#25798a"/><stop offset="1" stop-color="#06191d"/></radialGradient>
  <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#263139"/><stop offset=".22" stop-color="#0b1115"/><stop offset=".48" stop-color="#20292f"/><stop offset=".72" stop-color="#06090b"/><stop offset="1" stop-color="#151d22"/></linearGradient>
  <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#303b42"/><stop offset=".2" stop-color="#11171b"/><stop offset=".72" stop-color="#070a0c"/><stop offset="1" stop-color="#1e272d"/></linearGradient>
  <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#d6a446" stop-opacity="0"/><stop offset=".5" stop-color="#d6a446" stop-opacity=".78"/><stop offset="1" stop-color="#d6a446" stop-opacity="0"/></linearGradient>
  <filter id="glow" x="-200%" y="-200%" width="400%" height="400%"><feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="smallGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="shadow" x="-50%" y="-50%" width="200%" height="220%"><feDropShadow dx="0" dy="26" stdDeviation="28" flood-color="#000" flood-opacity=".92"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="3" seed="17"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 .08 0"/></filter>
  <pattern id="grid" width="70" height="70" patternUnits="userSpaceOnUse"><path d="M70 0H0V70" fill="none" stroke="#d6a446" stroke-opacity=".055"/></pattern>
</defs>
<rect width="1200" height="1500" fill="url(#bg)"/>
<rect width="1200" height="1500" fill="url(#grid)"/>
<ellipse cx="600" cy="570" rx="560" ry="610" fill="url(#amber)"/>
<path d="M110 0h120L420 1500H250zM970 0h120L950 1500H780z" fill="#d6a446" opacity=".025"/>
<g opacity=".55"><path d="M90 1220h1020" stroke="#d6a446" stroke-opacity=".18"/><path d="M170 1310h860" stroke="#6dc7d6" stroke-opacity=".09"/><ellipse cx="600" cy="1322" rx="410" ry="74" fill="#000" opacity=".8"/></g>
<g filter="url(#shadow)">
  <path d="M332 1040 250 1355l130 38 95-306z" fill="url(#steel)" stroke="#5c6c76" stroke-opacity=".34" stroke-width="4"/>
  <path d="m868 1040 82 315-130 38-95-306z" fill="url(#steel)" stroke="#5c6c76" stroke-opacity=".34" stroke-width="4"/>
  <path d="M426 986h348l55 338-174 42-55-260-55 260-174-42z" fill="url(#plate)" stroke="#66757d" stroke-opacity=".42" stroke-width="5"/>
  <path d="M300 470 165 570l68 248 128-39 50-211z" fill="url(#plate)" stroke="#66757d" stroke-opacity=".36" stroke-width="5"/>
  <path d="m900 470 135 100-68 248-128-39-50-211z" fill="url(#plate)" stroke="#66757d" stroke-opacity=".36" stroke-width="5"/>
  <path d="M233 800 195 1110l121 20 80-309z" fill="url(#steel)" stroke="#64737c" stroke-opacity=".38" stroke-width="5"/>
  <path d="m967 800 38 310-121 20-80-309z" fill="url(#steel)" stroke="#64737c" stroke-opacity=".38" stroke-width="5"/>
  <path d="M414 412 294 504l92 479 214 70 214-70 92-479-120-92z" fill="url(#steel)" stroke="#70808a" stroke-opacity=".44" stroke-width="6"/>
  <path d="m414 412 186 78 186-78-46 178-140 71-140-71z" fill="#080d10" stroke="#88979e" stroke-opacity=".28" stroke-width="4"/>
  <path d="M472 645 385 925l159 72 56-93 56 93 159-72-87-280-128 73z" fill="url(#plate)" stroke="#77868e" stroke-opacity=".38" stroke-width="5"/>
  <path d="M433 905h334l-26 110-141 37-141-37z" fill="#06090b" stroke="#a77e35" stroke-opacity=".46" stroke-width="5"/>
  <path d="M471 1006v105M729 1006v105" stroke="#d6a446" stroke-opacity=".27" stroke-width="5"/>
  <g>
    <path d="M432 172 368 255l22 180 93 76h234l93-76 22-180-64-83-168-54z" fill="url(#plate)" stroke="#768791" stroke-opacity=".52" stroke-width="7"/>
    <path d="m414 269 74-81h224l74 81-34 143-85 54H533l-85-54z" fill="#05090c" stroke="#87979f" stroke-opacity=".36" stroke-width="4"/>
    <path d="M443 286 520 250h160l77 36-42 85-74 33h-82l-74-33z" fill="#0c151b" stroke="#6dc7d6" stroke-opacity=".42" stroke-width="4"/>
    <path d="M470 304 545 280h110l75 24-50 34H520z" fill="#6dc7d6" opacity=".15" filter="url(#smallGlow)"/>
    <path d="m470 315 92-16 38 20-38 18-92-10zm260 0-92-16-38 20 38 18 92-10z" fill="#aaf4ff" opacity=".92" filter="url(#smallGlow)"/>
    <path d="m535 383 65 31 65-31-18 54h-94z" fill="#111a1f" stroke="#d6a446" stroke-opacity=".25" stroke-width="3"/>
    <path d="M384 272h-43l-30 57 28 86 53-10zm432 0h43l30 57-28 86-53-10z" fill="url(#steel)" stroke="#667780" stroke-opacity=".42" stroke-width="4"/>
    <path d="M469 171 503 98h194l34 73" fill="none" stroke="#d6a446" stroke-opacity=".28" stroke-width="6"/>
    <circle cx="600" cy="118" r="9" fill="#d6a446" filter="url(#smallGlow)"/>
  </g>
  <path d="M506 472 472 568l128 76 128-76-34-96-94 18z" fill="#060b0e" stroke="#6c7a82" stroke-opacity=".4" stroke-width="4"/>
  <path d="M402 520 314 585l28 156 90-32 37-151zM798 520l88 65-28 156-90-32-37-151z" fill="#1d272d" stroke="#80909a" stroke-opacity=".32" stroke-width="4"/>
  <path d="M318 586 210 626l39 130 99-34zM882 586l108 40-39 130-99-34z" fill="#080d10" stroke="#d6a446" stroke-opacity=".25" stroke-width="5"/>
  <g fill="none" stroke="#d6a446" stroke-opacity=".28" stroke-width="4"><path d="M369 468 444 602 422 833"/><path d="M831 468 756 602 778 833"/><path d="M488 687 435 887"/><path d="M712 687 765 887"/></g>
  <g fill="#050708" stroke="#71818a" stroke-opacity=".42" stroke-width="4"><path d="m206 1093-29 90 98 42 52-86z"/><path d="m994 1093 29 90-98 42-52-86z"/></g>
  <g fill="#d6a446" opacity=".52"><circle cx="352" cy="534" r="5"/><circle cx="848" cy="534" r="5"/><circle cx="412" cy="782" r="4"/><circle cx="788" cy="782" r="4"/><circle cx="476" cy="1035" r="4"/><circle cx="724" cy="1035" r="4"/></g>
</g>
<g transform="translate(600 722)">
  <circle r="122" fill="#061014" opacity=".76" stroke="#d6a446" stroke-opacity=".42" stroke-width="5"/>
  <circle r="96" fill="none" stroke="#6dc7d6" stroke-opacity=".65" stroke-width="5" stroke-dasharray="14 11"/>
  <circle r="70" fill="url(#core)" filter="url(#glow)"/>
  <path d="M0-86 74-43v86L0 86-74 43v-86z" fill="none" stroke="#d6a446" stroke-opacity=".7" stroke-width="4"/>
  <circle r="26" fill="#f4ffff" opacity=".94" filter="url(#smallGlow)"/>
</g>
<g opacity=".7" fill="#d6a446" filter="url(#smallGlow)"><circle cx="165" cy="380" r="3"/><circle cx="1040" cy="440" r="4"/><circle cx="970" cy="970" r="3"/><circle cx="220" cy="990" r="4"/><circle cx="825" cy="160" r="3"/></g>
<g stroke="#d6a446" stroke-linecap="round" opacity=".32"><path d="m145 352 42-32"/><path d="m1015 412 54-41"/><path d="m947 944 46-32"/><path d="m185 965 49-38"/></g>
<rect width="1200" height="1500" filter="url(#grain)" opacity=".55"/>
<path d="M105 1420h990" stroke="url(#edge)" stroke-width="3"/>
</svg>`;

export async function GET() {
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
