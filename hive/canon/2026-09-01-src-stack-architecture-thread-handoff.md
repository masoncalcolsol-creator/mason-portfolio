# NULLWORKS // HIVE // THREAD HANDOFF

STATUS: SAVE / STAMP / EARMARK / LOCK
DATE: 2026-09-01
TIMEZONE: America/Phoenix
HUMAN AUTHORITY: Mason Perry
RECEIPT: NW-THREAD-HANDOFF-SRC-ARCH-20260901-001
PUBLIC HOST: https://nullworks.systems
REPO: masoncalcolsol-creator/mason-portfolio
BRANCH: main

This document is the continuity packet for another thread. Read this first.
Do not invent a second landing site. Do not publish Vercel aliases as the company front door.

## What this thread was doing

Mason pointed at the public application line in `src/`:

- `src/app`
- `src/lib`
- `src/middleware.ts`

Question asked: build a separate landing page, or integrate into the regular stack?

Locked answer: **integrate into the regular stack.**

Follow-up: where does it belong?
Locked answer: as a refinement of existing `/architecture`, not a new route, not `/`, not a new repo.

Follow-up: which surface makes the most sense?
Locked answer: **`/architecture`** (Tier 1 Corporate). `/` remains the company door.

Follow-up: put it there and refine architecture.
Done on main.

## Locked decisions

1. No separate landing-page repository.
2. No competing production host. Canonical public domain is `https://nullworks.systems` only.
3. Preview `*.vercel.app` URLs are internal review only.
4. New public work is a route under `src/app/<route>/page.tsx`.
5. Route existence is not corporate navigation and is not an automatic sitemap entry.
6. Persistent identity bar stays: Architecture → Systems → Proof → Research → Company.
7. Hive records decisions. Hive is not the website.
8. Human authority remains final. Mason Perry is publication and deployment authority.

## The public stack line

| Path | Meaning |
|---|---|
| `src/app` | Routes are doors. Audience pages may change sequence, not facts. |
| `src/lib` | Shared truth used by those routes. |
| `src/middleware.ts` | Production host lock. Portfolio/Vercel production aliases redirect to `nullworks.systems`. |

Middleware invariant already in code:

- Canonical host: `nullworks.systems`
- `www.nullworks.systems` redirects
- Localhost does not redirect
- Non-production Vercel env stays addressable
- Production `*.vercel.app` and hosts containing `mason-portfolio` redirect 308 to the canonical host

## What shipped in this thread

### Commit 7cbd2c35d0c8d4b8cc1d8fb205a886936084aa63

First hive lock of the landing-vs-stack decision.

Files:

- `hive/events/2026-09-01T08-13-00-07-00_src_stack_landing_vs_integrate.yaml`
- `hive/canon/landing-vs-regular-stack-2026-09-01.md`

Receipt: `NW-SRC-STACK-LANDING-20260901-001`

### Commit ee74f842ed1ab585d61a8298bddccfcbdd958056

Public page refine.

Files:

- `src/app/architecture/page.tsx` — added stack-line band, three cards, research nav link, host note in footer. UMBRA / PENUMBRA / turnstile / UMBRA Network kept.
- `hive/events/2026-09-01T08-25-00-07-00_architecture_src_stack_line.yaml`

Receipt: `NW-ARCH-SRC-LINE-20260901-001`

Public URL: `https://nullworks.systems/architecture`

## Governing docs another thread must honor

- `AGENTS.md` — public domain and inbound email rules
- `docs/PUBLIC_ROUTE_GOVERNANCE_V1.md` — eight tiers; assign a tier before global linking
- `README.md` — public-by-intent boundary; this repo is not the private Corporate WiFi Hive
- `hive/canon/landing-vs-regular-stack-2026-09-01.md` — short decision lock
- This file — full thread continuity

## Public inbound email

Route NULLWORKS-owned public CTAs through `nullworks.neuraxis@gmail.com`.
Do not publish Mason's personal Gmail as a public intake destination.

## What was inspected but not changed

- `src/app/page.tsx` — corporate home left alone on purpose
- `src/middleware.ts` — already encodes the host lock; no code change this thread
- `src/app/sitemap.ts` — `/architecture` already allowlisted
- Laboratory, ANVIL, music, and private workroom routes — out of scope

## Explicit non-goals for the next thread

- Do not create `feature/*-landing` unless Mason names a new audience door and assigns a tier.
- Do not move ANVIL / Nan Wisdom / opera pages into corporate nav.
- Do not hard-code `mason-portfolio-main.vercel.app` or `mason-portfolio-phi.vercel.app`.
- Do not dump every `src/app` route into the sitemap.
- Do not treat this public repo hive as the private Corporate WiFi Hive. No credentials, tokens, customer data, or unpublished manuscripts.

## Suggested next moves if Mason continues

Priority order unless he says otherwise:

1. Visual pass of deployed `/architecture` on phone and desktop.
2. If copy needs tightening, edit `src/app/architecture/page.tsx` only.
3. If a *named* audience or product door is requested, create `src/app/<route>/page.tsx`, assign a governance tier, and write a hive event before adding sitemap or global nav.
4. Stop. Do not keep inventing pages because the repository can hold them.

## How another thread should announce itself in hive

Write a new event under `hive/events/` with:

- `receipt_id`
- `recorded_at_local` in America/Phoenix
- `human_authority: Mason Perry`
- `related` pointing at this handoff and the two prior receipts
- `final_disposition`

Then implement. Do not implement first and receipt later.

## One-line state

The line is `src/app` + `src/lib` + `src/middleware.ts`. The public explanation lives at `/architecture`. The company door remains `/`. Saved, stamped, earmarked, locked.
