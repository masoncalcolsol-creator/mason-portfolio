# AI Doubleheader Cinematic Portrait Forge

## Purpose

The portrait forge keeps the participant's recognizable face while rebuilding the wardrobe, lighting, atmosphere, and role-specific world around the head and shoulders. Names, statistics, borders, and all card typography remain deterministic website layers.

## Production configuration

Set this server-side environment variable in the Vercel project:

```text
OPENAI_API_KEY=<server-side secret>
```

Never expose the key through a `NEXT_PUBLIC_` variable.

The route is:

```text
POST /api/ai-doubleheader/forge
```

The server uses the OpenAI Image API edit endpoint with `gpt-image-2`, a portrait output, medium quality, and JPEG compression.

## Beta protections

- Explicit image ownership / authorization confirmation
- 10 MB client and request boundary
- Three renders per six-hour window per observed client IP
- Server-only provider credential
- No user-entered text is rendered into the image
- Prompt excludes names, logos, captions, UI, card frames, extra people, and watermarks
- Existing deterministic card renderer adds all public copy after the image returns

The in-memory rate limiter is a beta cost brake, not a durable production quota system. Replace it with a persistent store before broad public launch.

## Manual fallback

When the provider key is absent or generation is unavailable, the user can upload finished cinematic portrait art into the same Forge modal and apply it to the human card. The rest of the Doubleheader flow still works.

## Human review gate

Before export, confirm:

1. The participant remains recognizable.
2. The generated image contains one person only.
3. No private or unexpected environmental details were introduced.
4. No text, brand mark, badge, or false credential was generated.
5. The role-specific world is metaphorical or evidence-bound rather than a false factual claim.
6. The lower card copy remains readable on a phone.
