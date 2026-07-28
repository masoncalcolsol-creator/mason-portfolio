# Live Learning Forest — Production Activation Runbook

## Current boundary

The application code is production-capable. Public writes remain disabled until a Supabase project is connected and the migrations are applied. When storage is unavailable, the Forest must fail visibly and must not manufacture a local receipt.

The Seed Nursery at `/forest/nursery` can plan and share prepublication seed packets before storage is connected. A packet becomes a planted seed only after the durable ledger returns a receipt.

## Architecture

- Public interface: Next.js on Vercel
- Seed planning and sharing: `/forest/nursery`
- Human-readable receipt: `/forest/receipt?receipt={RECEIPT}`
- Durable ledger: Supabase Postgres
- Public write path: browser → `/api/forest/events` → server validation/rate limit → Supabase service-role write
- Public verification path: `/api/forest/events?receipt={RECEIPT}`
- Review path: `/forest/admin` → `/api/forest/admin/queue`
- Canonical publication: separate immutable page-version event; public submissions never directly mutate truth

## 1. Create or choose the dedicated Supabase project

Use a dedicated project for the Live Learning Forest. Do not reuse a confidential evidence database.

## 2. Apply the schema

Apply both migrations in filename order:

1. `supabase/migrations/20260728_live_learning_forest_production.sql`
2. `supabase/migrations/20260728_live_learning_forest_seed_nursery.sql`

Using `supabase db push` applies pending migrations in order.

The migrations create or update:

- immutable public submissions
- structured Seed Nursery context
- append-only human review events
- hash-chained event ledger
- governed review queue view
- canonical page-version table
- RLS with no direct anonymous database access

## 3. Add Vercel environment variables

In the `mason-portfolio-main` Vercel project, add these variables to Production and Preview:

- `FOREST_SUPABASE_URL`
- `FOREST_SUPABASE_SERVICE_ROLE_KEY`
- `FOREST_HASH_SALT`
- `FOREST_ADMIN_TOKEN`

Use `.env.forest.example` only as the name contract. Never commit real values.

Generate independent secrets for the salt and admin token. The service-role key stays server-side and is never exposed to the browser.

## 4. Redeploy

Redeploy the latest `main` commit after adding the variables.

## 5. Verify the live storage boundary

Open:

`/api/forest/status`

Required result:

- `storage.state = READY`
- `writesEnabled = true`

The static application health endpoint is `/forest/health`. It proves the route exists, not that the database is writable.

## 6. Controlled Seed Nursery test

1. Open `/forest/nursery`.
2. Create a packet with a question, curiosity trigger, uncertain starting memory, source lead, route preference, and planter name or pseudonym.
3. Copy the shareable packet URL and open it in a private browser window.
4. Confirm the packet fields survive in the URL and remain editable.
5. Click **Plant durable seed**.
6. Confirm the page returns a receipt beginning with `NW-LLF-SEED-`.
7. Open `/forest/receipt?receipt={RECEIPT}`.
8. Confirm the human-readable page shows the same question, context, source lead, route intent, planter, receipt, and truth boundary.
9. Open `/api/forest/events?receipt={RECEIPT}` and confirm the machine record returns `canonicalEffect = NONE`.
10. Open `/forest/admin` and enter `FOREST_ADMIN_TOKEN`.
11. Confirm the same structured seed packet appears in the queue.
12. Add a note and select `ACCEPT`, `REJECT`, `DEFER`, or `NEEDS_EVIDENCE`.
13. Refresh and confirm the latest review event appears without altering the original submission.

## 7. Carl or Ira pressure test

Send one person a prefilled Seed Nursery URL, not the canonical Rossini page alone. Ask them to:

1. Explain what they believe the system is doing.
2. Change one field in the packet.
3. Plant the seed.
4. Send the receipt link back.
5. Distinguish the receipt from a verified factual page.

Pass condition: they understand that the system preserves and governs curiosity before publishing knowledge.

## 8. Database verification

Confirm rows were created in:

- `llf_public_submissions`
- `llf_review_events`
- `llf_event_ledger`

Confirm `llf_event_ledger.prior_event_hash` and `event_hash` form a continuous chain.

## Failure rules

- A successful Vercel build is not proof of database connectivity.
- A visible receipt is not valid unless the receipt verification endpoint can read it back.
- A shareable seed packet is not a planted seed until the shared ledger accepts it.
- A review decision is not a canonical publication.
- No source receipt means no factual publication.
- No database connection means no fake local fallback.

## Release gate

The system may be called **production writable** only after the controlled live test completes on the exact public hostname:

`https://mason-portfolio-main.vercel.app`
