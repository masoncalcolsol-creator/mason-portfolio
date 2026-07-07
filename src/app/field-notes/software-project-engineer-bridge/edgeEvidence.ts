const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" role="img" aria-labelledby="title description">
  <title id="title">Bulk chute failure mechanism</title>
  <desc id="description">A package stalls at a protruding chute transition, blocks a photoeye, and faults the upstream bulk feed line.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#10151c"/>
      <stop offset="1" stop-color="#080b0f"/>
    </linearGradient>
    <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#828991"/>
      <stop offset=".5" stop-color="#d2d5d7"/>
      <stop offset="1" stop-color="#60676e"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#000" flood-opacity=".45"/>
    </filter>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
      <path d="M0,0 L12,6 L0,12 Z" fill="#e7b84d"/>
    </marker>
  </defs>

  <rect width="1200" height="750" fill="url(#bg)"/>
  <text x="70" y="78" fill="#e7b84d" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="4">FIELD MECHANISM DIAGRAM</text>
  <text x="70" y="132" fill="#f5f1e8" font-family="Arial, sans-serif" font-size="46" font-weight="800">One stalled package → one blocked photoeye → one line fault</text>

  <g filter="url(#shadow)">
    <path d="M105 250 H560 L920 570 H1080" fill="none" stroke="url(#steel)" stroke-width="138" stroke-linejoin="round"/>
    <path d="M105 250 H560 L920 570 H1080" fill="none" stroke="#171b20" stroke-width="105" stroke-linejoin="round"/>
  </g>

  <path d="M555 198 L620 260 L596 291 L531 229 Z" fill="#e7b84d" stroke="#f8df9a" stroke-width="5"/>
  <text x="545" y="175" fill="#f8df9a" font-family="Arial, sans-serif" font-size="25" font-weight="700">PROTRUDING TRANSITION</text>

  <g transform="translate(510 236) rotate(41)" filter="url(#shadow)">
    <rect x="0" y="0" width="155" height="105" rx="13" fill="#c58a4b" stroke="#f0c68c" stroke-width="5"/>
    <path d="M77 0 V105 M0 52 H155" stroke="#8f5e2f" stroke-width="4" opacity=".7"/>
  </g>
  <text x="645" y="368" fill="#f5f1e8" font-family="Arial, sans-serif" font-size="29" font-weight="700">STALLED PACKAGE</text>

  <g>
    <circle cx="686" cy="330" r="19" fill="#ff5d55"/>
    <circle cx="686" cy="330" r="37" fill="none" stroke="#ff5d55" stroke-width="5" opacity=".45"/>
    <path d="M686 330 L835 330" stroke="#ff5d55" stroke-width="8" stroke-dasharray="16 13"/>
    <text x="742" y="302" fill="#ff9a95" font-family="Arial, sans-serif" font-size="25" font-weight="700">PHOTOEYE BLOCKED</text>
  </g>

  <path d="M845 396 C940 414 1015 390 1090 340" fill="none" stroke="#e7b84d" stroke-width="8" marker-end="url(#arrow)"/>
  <g transform="translate(880 238)">
    <rect width="250" height="112" rx="20" fill="#241d10" stroke="#e7b84d" stroke-width="4"/>
    <text x="125" y="48" text-anchor="middle" fill="#e7b84d" font-family="Arial, sans-serif" font-size="25" font-weight="800">BULK FEED LINE</text>
    <text x="125" y="82" text-anchor="middle" fill="#f5f1e8" font-family="Arial, sans-serif" font-size="25" font-weight="800">FAULT / STOP</text>
  </g>

  <g transform="translate(70 626)">
    <rect width="1060" height="78" rx="18" fill="#151a20" stroke="#3a4149" stroke-width="2"/>
    <text x="35" y="49" fill="#c9bfae" font-family="Arial, sans-serif" font-size="27">
      Root cause: insufficient slope and interfering material edge — not the pneumatic control program.
    </text>
  </g>
</svg>`;

export const edgeInterference = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
