# Live Learning Forest — Production Activation Runbook

## Current boundary

The application code is production-capable. Public writes remain disabled until a Supabase project is connected and the migration is applied. When storage is unavailable, the Forest must fail visibly and must not manufacture a local receipt.

## Architecture

- Public interface: Next.js on Vercel
- Durable ledger: Supabase Postgres
- Public write path: browser → `/api/forest/events` → server validation/rate limit → Supabase service-role write
- Public verification path: `/api/forest/events?receipt={RECEIPT}`
- Review path: `/forest/admin` → `/api/forest/admin/queue`
- Canonical publication: separate immutable page-version event; public submissions never directly mutate truth

## 1. Create or choose the dedicated Supabase project

Use a dedicated project for the Live Learning Forest. Do not reuse a confidential evidence database.

## 2. Apply the schema

Open the Supabase SQL editor and run:

`supabase/migrations/20260728_live_learning_forest_production.sql`

The migration creates:

- immutable public submissions
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

## 6. Controlled live test

1. Open `/forest`.
2. Search for a missing subject.
3. Confirm the page returns a receipt beginning with `NW-LLF-SEED-`.
4. Open `/api/forest/events?receipt={RECEIPT}`.
5. Confirm the server returns the same receipt and `canonicalEffect = NONE`.
6. Open `/forest/admin`.
7. Enter the `FOREST_ADMIN_TOKEN`.
8. Confirm the submission appears in the queue.
9. Add a note and select `ACCEPT`, `REJECT`, `DEFER`, or `NEEDS_EVIDENCE`.
10. Refresh and confirm the latest review event appears without altering the original submission.

## 7. Database verification

Confirm rows were created in:

- `llf_public_submissions`
- `llf_review_events`
- `llf_event_ledger`

Confirm `llf_event_ledger.prior_event_hash` and `event_hash` form a continuous chain.

## Failure rules

- A successful Vercel build is not proof of database connectivity.
- A visible receipt is not valid unless the receipt verification endpoint can read it back.
- A review decision is not a canonical publication.
- No source receipt means no factual publication.
- No database connection means no fake local fallback.

## Release gate

The system may be called **production writable** only after the controlled live test completes on the exact public hostname:

`https://mason-portfolio-main.vercel.app`
