# NULLWORKS // LANDING VS REGULAR STACK

STATUS: SAVE / STAMP / EARMARK / LOCK
DATE: 2026-09-01
RECEIPT: NW-SRC-STACK-LANDING-20260901-001
REF: main @ 4679436e29a86e5d51b7c9cffb5e3b8286e1b401

## The line

`src/` is the regular stack.

- `src/app` — public routes, including the corporate landing at `/`
- `src/lib` — shared library for that same app
- `src/middleware.ts` — canonical host lock to `nullworks.systems`

## Locked decision

Do not build a separate landing page site for this work.

Integrate every new public surface into the existing mason-portfolio stack:

1. Implement as `src/app/<route>/page.tsx`.
2. Deploy through the current GitHub / Vercel pipeline.
3. Address the public result only at `https://nullworks.systems` plus the route path.
4. Keep preview Vercel URLs internal.
5. Keep human authority with Mason Perry.

## Why this is locked

The front door already exists. `/` is the corporate landing. Other pages are doors, not competing houses. Audience-specific pages may change sequencing. They may not change facts, hosts, or authority.

## Do not silently change

- Canonical public domain
- Host-governance middleware behavior in production
- The rule that new landings are routes, not new sites
- Public inbound email routing through `nullworks.neuraxis@gmail.com` except where a page belongs to an outside confirmed inbox

This document is the continuity anchor for the 2026-09-01 landing-versus-stack question.
