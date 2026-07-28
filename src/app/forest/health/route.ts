export const dynamic = "force-static";

export function GET() {
  return Response.json({
    system: "LIVE_LEARNING_FOREST",
    route: "/forest",
    state: "AVAILABLE",
    groveVersion: "0.2",
    canonicalHost: "mason-portfolio-main.vercel.app",
    canonicalUrl: "https://mason-portfolio-main.vercel.app/forest",
    stableAliasUrl: "https://mason-portfolio-main.vercel.app/live-learning-forest",
    legacyHost: {
      hostname: "mason-portfolio-phi.vercel.app",
      state: "STALE_DEPLOYMENT_ALIAS",
      action: "REASSIGN_OR_REDIRECT_IN_VERCEL_PROJECT_SETTINGS",
    },
    lexicalLayer: "BUILT_IN_DICTIONARY_AND_THESAURUS",
    truthBoundary: "LEXICON_LOOKUPS_DO_NOT_CREATE_CANONICAL_TOPIC_TREES",
    checkedAtBuild: new Date().toISOString(),
  });
}
