export const dynamic = "force-static";

export function GET() {
  return Response.json({
    system: "LIVE_LEARNING_FOREST",
    route: "/forest",
    state: "APPLICATION_AVAILABLE",
    groveVersion: "1.1",
    canonicalHost: "mason-portfolio-main.vercel.app",
    canonicalUrl: "https://mason-portfolio-main.vercel.app/forest",
    stableAliasUrl: "https://mason-portfolio-main.vercel.app/live-learning-forest",
    seedNurseryUrl: "https://mason-portfolio-main.vercel.app/forest/nursery",
    humanReceiptPattern: "https://mason-portfolio-main.vercel.app/forest/receipt?receipt={RECEIPT}",
    liveStorageStatusUrl: "https://mason-portfolio-main.vercel.app/api/forest/status",
    governedReviewConsole: "https://mason-portfolio-main.vercel.app/forest/admin",
    receiptVerificationPattern: "https://mason-portfolio-main.vercel.app/api/forest/events?receipt={RECEIPT}",
    sourceIntegrityHealth: "https://mason-portfolio-main.vercel.app/api/forest/sources/health",
    legacyHost: {
      hostname: "mason-portfolio-phi.vercel.app",
      state: "STALE_DEPLOYMENT_ALIAS",
      action: "REASSIGN_OR_REDIRECT_IN_VERCEL_PROJECT_SETTINGS",
    },
    lexicalLayer: "BUILT_IN_DICTIONARY_AND_THESAURUS",
    seedPlanningLayer: "SHAREABLE_PREPUBLICATION_SEED_PACKETS",
    writeArchitecture: "SERVER_API_TO_SUPABASE_APPEND_ONLY_LEDGER",
    truthBoundary: "PUBLIC_SUBMISSIONS_NEVER_DIRECTLY_MUTATE_CANONICAL_TOPIC_TREES",
    checkedAtBuild: new Date().toISOString(),
  });
}
