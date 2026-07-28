const SOURCES = [
  {
    id: "SRC-BNF-GUILLAUME-TELL",
    publisher: "Bibliothèque nationale de France",
    url: "https://catalogue.bnf.fr/ark:/12148/cb13918026z",
  },
  {
    id: "SRC-MET-ROSSINI-TIMELINE",
    publisher: "Metropolitan Opera",
    url: "https://www.metopera.org/discover/education/educator-guides/la-cenerentola/the-operas-plot-and-creation/",
  },
  {
    id: "SRC-MET-GUILLAUME-TELL",
    publisher: "Metropolitan Opera",
    url: "https://www.metopera.org/user-information/synopses-archive/guillaume-tell/",
  },
  {
    id: "SRC-SFO-GUILLAUME-TELL-ARCHIVE",
    publisher: "San Francisco Opera Performance Archive",
    url: "https://archive.sfopera.com/guillaume-tell/1991-1992",
  },
  {
    id: "SRC-LOC-TELL-DAWN-1904",
    publisher: "Library of Congress",
    url: "https://www.loc.gov/item/jukebox-245816/",
  },
  {
    id: "SRC-LOC-TELL-STORM-1907",
    publisher: "Library of Congress",
    url: "https://www.loc.gov/item/jukebox-119720/",
  },
  {
    id: "SRC-LOC-TELL-CALM-1909",
    publisher: "Library of Congress",
    url: "https://www.loc.gov/item/jukebox-119725/",
  },
  {
    id: "SRC-LOC-TELL-FINALE-1909",
    publisher: "Library of Congress",
    url: "https://www.loc.gov/item/jukebox-119734/",
  },
  {
    id: "SRC-CARNEGIE-1812",
    publisher: "Carnegie Hall Data Lab",
    url: "https://data.carnegiehall.org/works/18188/about",
  },
  {
    id: "SRC-UTAH-SYMPHONY-1812",
    publisher: "Utah Symphony",
    url: "https://utahsymphony.org/explore/2013/09/tchaikovsky-1812-ouverture-solennelle-op-49/",
  },
  {
    id: "SRC-LOC-1812-1909",
    publisher: "Library of Congress",
    url: "https://www.loc.gov/item/jukebox-422360/",
  },
];

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function inspectSource(source: (typeof SOURCES)[number]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const checkedAt = new Date().toISOString();

  try {
    let response = await fetch(source.url, {
      method: "HEAD",
      redirect: "follow",
      cache: "no-store",
      signal: controller.signal,
      headers: { "User-Agent": "NULLWORKS-Live-Learning-Forest-Source-Check/1.0" },
    });

    if (response.status === 403 || response.status === 405 || response.status === 501) {
      response = await fetch(source.url, {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
        signal: controller.signal,
        headers: {
          "User-Agent": "NULLWORKS-Live-Learning-Forest-Source-Check/1.0",
          Range: "bytes=0-2047",
        },
      });
    }

    const reachable = response.status >= 200 && response.status < 400;
    return {
      ...source,
      reachable,
      state: reachable ? "REACHABLE" : "BROKEN_OR_BLOCKED",
      status: response.status,
      finalUrl: response.url,
      checkedAt,
    };
  } catch (error) {
    return {
      ...source,
      reachable: false,
      state: error instanceof Error && error.name === "AbortError" ? "TIMEOUT" : "REQUEST_FAILED",
      status: null,
      finalUrl: null,
      checkedAt,
      detail: error instanceof Error ? error.message : "Unknown source-check error",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  const results = await Promise.all(SOURCES.map(inspectSource));
  const broken = results.filter((source) => !source.reachable);

  return Response.json(
    {
      system: "LIVE_LEARNING_FOREST_SOURCE_INTEGRITY",
      policy: "A source card is not healthy merely because a citation was written. The exact public URL must resolve.",
      state: broken.length === 0 ? "PASS" : "DEGRADED",
      total: results.length,
      reachable: results.length - broken.length,
      broken: broken.length,
      results,
    },
    {
      status: broken.length === 0 ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
