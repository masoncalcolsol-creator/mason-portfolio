export const dynamic = "force-static";

export function GET() {
  return Response.json({
    system: "LIVE_LEARNING_FOREST",
    route: "/forest",
    state: "AVAILABLE",
    groveVersion: "0.2",
    lexicalLayer: "BUILT_IN_DICTIONARY_AND_THESAURUS",
    truthBoundary: "LEXICON_LOOKUPS_DO_NOT_CREATE_CANONICAL_TOPIC_TREES",
    checkedAtBuild: new Date().toISOString(),
  });
}
