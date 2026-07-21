# INSTANTIATION deployment

## Route

- Page: `/instantiation`
- Poster: `/api/assets/instantiation-poster`
- Current public-safe PDF: `/api/instantiation/current-pdf`
- Immutable original PDF: `/api/instantiation/original-pdf`
- Challenge intake: `POST /api/instantiation/challenges`

The first deployment is a **red-team working draft** and is deliberately marked `noindex`. It does not claim a public release, completed external review, endorsement, or contributor permission.

## Private intake configuration

Optional Vercel environment variables:

- `INSTANTIATION_INTAKE_WEBHOOK_URL`
- `INSTANTIATION_INTAKE_WEBHOOK_TOKEN`
- `INSTANTIATION_REVIEW_EMAIL`

No secrets are committed to the repository.

When a private webhook is configured and accepts the request, the endpoint reports durable private delivery. Without a webhook, the page creates a receipt identifier and opens a private email handoff in the contributor's mail client. Nothing is written directly to the public ledger or published automatically.

The current file input records only the selected filename. A contributor must add the actual attachment in the email handoff until private malware-scanned upload storage is connected.

## Privacy boundary

The public layer may contain only approved versions, authorized attribution, approved challenge summaries, public sources, redacted receipts, dispositions, and readable diffs.

Original submissions, email addresses, private correspondence, permission records, unredacted evidence, internal reviewer notes, attachments, and abuse metadata remain private. Carl, Dane, or any other reviewer must not be named, quoted, or represented publicly until explicit publication permission is recorded.

## Production hardening before open public intake

- Durable database and append-only audit records
- Platform or application rate limiting
- Spam and abuse controls
- Malware-scanned private upload storage
- File type and size enforcement
- Authenticated admin review queue
- Permission and attribution change workflow
- Content security review and input sanitization
- Retention, deletion, and legal-review procedures
- Automated tests for version immutability and no-public-direct-write behavior

The endpoint currently performs a same-origin check, required-field validation, basic email validation, length limits, control-character removal, and a honeypot check. These are baseline controls, not a complete public-submission security program.
