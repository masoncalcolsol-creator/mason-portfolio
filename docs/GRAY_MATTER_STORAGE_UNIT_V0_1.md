# GRAY MATTER STORAGE UNIT — V0.1

## Truth state

```yaml
system: GRAY_MATTER_STORAGE_UNIT
version: 0.1
human_authority: Mason Perry
source_state: FEATURE_BRANCH_BUILT
production_deployment: NOT_VERIFIED
live_phone_test: NOT_RUN
live_gmail_write_test: NOT_RUN_BY_APPLICATION
cron_delivery_test: NOT_RUN
```

No component may be called live, deployed, synchronized, or complete until the relevant receipt exists.

## Purpose

Gray Matter converts short spoken or typed thoughts into a searchable, date-stamped private journal and an operational action ledger.

The V0.1 loop is:

```text
VOICE OR TEXT
  -> TRANSCRIPT
  -> HUMAN REVIEW WHEN USING WEB
  -> GMAIL JOURNAL ARCHIVE
  -> STRUCTURED HIVE INDEX + ACTION LEDGER
  -> HASH / METADATA RECEIPT
  -> 6:00 P.M. PHOENIX DAILY TRIAGE EMAIL
  -> WEB OR NEURAXIS PHONE RECALL
```

## Storage boundary

### Gmail — human-readable source archive

Gmail receives the full transcript, title, summary, category, tags, extracted actions, capture date/time, entry ID, and SHA-256 transcript hash.

Labels:

- `GRAY MATTER STORAGE UNIT/JOURNAL ENTRIES`
- `GRAY MATTER STORAGE UNIT/DAILY DIGESTS`
- `GRAY MATTER STORAGE UNIT/ACTION QUEUE`
- `GRAY MATTER STORAGE UNIT/RECEIPTS`

### Private Hive — machine-readable continuity

The Hive receives:

- the structured entry index;
- open action records;
- Gmail message IDs;
- transcript hashes;
- category, urgency, timestamps, and receipt state;
- digest counts and delivery receipts.

The normal Hive receipt does **not** contain the full transcript. The Gmail archive is the human source record; the Hive carries the index, actions, provenance, and integrity hash.

### Audio — transient only

V0.1 intentionally does not maintain an audio vault.

- Browser capture holds recording chunks only in memory while the recording is active.
- The temporary Blob is submitted to the existing server transcription route.
- After transcription, the client does not save the Blob to IndexedDB, localStorage, Gmail, Drive, or the Hive.
- The phone lane uses Twilio speech gathering rather than a recording endpoint.

The preserved source is the transcript. This is a deliberate privacy and storage-cost boundary.

## Capture surfaces

### Browser / mobile web

Route: `/gray-matter`

Capabilities:

- session-token gate;
- one-tap microphone recorder;
- transient transcription through the existing Voice Foundry transcription route;
- editable transcript before vaulting;
- Gmail/Hive write receipt;
- current triage display;
- Gmail full-text journal search.

### NEURAXIS phone

Menu option: `3`

Access requires both:

1. the approved Mason caller number; and
2. the hashed Gray Matter passphrase.

Supported V0.1 commands:

- speak a note to archive it;
- `daily triage` or `brief me`;
- `search for <topic>`;
- `send today's digest`;
- state an outbound email/reply instruction for later review;
- `done`.

Outbound messages to third parties are not sent blindly in V0.1. They are captured as confirmation-gated action instructions.

## Daily digest

Vercel cron schedule:

```json
{
  "path": "/api/gray-matter/digest",
  "schedule": "0 1 * * *"
}
```

Phoenix remains UTC-7 year-round, so `01:00 UTC` maps to `6:00 p.m. America/Phoenix` on the preceding UTC date. The digest itself calculates the current Phoenix local date at invocation time.

The email contains:

- entries added today;
- all open actions;
- items spilled over from earlier days;
- items without a clear planning slot;
- counts and a receipt boundary.

Scheduled invocation time is a target, not proof of exact-to-the-second delivery. The Gmail message ID and Hive digest receipt are the completion evidence.

## Required production environment

```text
GRAY_MATTER_ACCESS_TOKEN
GRAY_MATTER_PASSPHRASE_SHA256
GRAY_MATTER_GMAIL_USER
GRAY_MATTER_GOOGLE_CLIENT_ID
GRAY_MATTER_GOOGLE_CLIENT_SECRET
GRAY_MATTER_GOOGLE_REFRESH_TOKEN
CRON_SECRET

OPENAI_API_KEY
GRAY_MATTER_MODEL                  # optional
VOICE_FOUNDRY_TRANSCRIBE_MODEL     # optional

HIVE_GITHUB_TOKEN
HIVE_REPO
HIVE_BRANCH

NEURAXIS_MASON_CALLER
NEURAXIS_STATE_SECRET
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER
NEURAXIS_PUBLIC_ORIGIN
```

The Gmail OAuth grant must authorize mailbox insert, send, label, modify, and search operations for the private NEURAXIS account. Keep the client secret, refresh token, access token, passphrase hash, Twilio credentials, and GitHub token in Vercel environment variables only.

Do not commit the plaintext passphrase. Normalize the intended phrase to lowercase with single spaces, calculate its SHA-256 hash offline, and store only the hash in `GRAY_MATTER_PASSPHRASE_SHA256`.

## Classification boundary

Machine assistance may propose:

- title;
- summary;
- category;
- tags;
- urgency;
- explicit or inferred actions.

The transcript remains the human source. Machine-derived fields are reviewable. Inferred actions are marked `INFERRED`. RED is reserved for an explicitly stated immediate stop-the-line or safety-critical item. Mason remains final Human Authority.

## Deployment gates

### Gate 1 — source build

- install dependencies;
- run lint;
- run production build;
- verify no TypeScript errors;
- verify no secret appears in the diff.

### Gate 2 — Gmail

- create one web text entry;
- confirm the message appears under `JOURNAL ENTRIES`;
- confirm the subject, transcript, local timestamp, hash, and entry ID;
- confirm no audio attachment exists;
- search for an exact phrase and retrieve the entry.

### Gate 3 — Hive

- confirm `hive/current/gray_matter_action_ledger.json` is created or updated;
- confirm the full transcript is absent from the normal event receipt;
- confirm Gmail message ID and transcript hash are present;
- confirm an explicit action appears as OPEN.

### Gate 4 — web recorder

- record a short note;
- stop and transcribe;
- edit one word;
- vault the corrected transcript;
- refresh the page and confirm no audio is recoverable from Gray Matter storage.

### Gate 5 — NEURAXIS

- call from Mason's approved caller number;
- press or say `3`;
- verify a wrong passphrase fails;
- verify the configured passphrase succeeds;
- capture one note;
- request daily triage;
- search for the note's unique phrase;
- confirm call telemetry is metadata-only for the Gray Matter lane.

### Gate 6 — digest

- invoke `/api/gray-matter/digest` with the production authorization gate;
- confirm the email arrives in the private account;
- confirm the `DAILY DIGESTS` label;
- confirm the Hive digest receipt;
- observe one scheduled 6:00 p.m. Phoenix run.

## V0.1 exclusions

- no permanent audio storage;
- no background listening;
- no automatic third-party email send or reply;
- no destructive action closure by voice;
- no claim that an inferred task is a human commitment;
- no external sharing of the journal;
- no dependency on a single phone device.

## Planned V0.2 candidates

- mark actions DONE, DEFERRED, or assigned through a confirmation step;
- conversational result pagination and `read entry <ID>`;
- Drive export / encrypted backup manifest;
- explicit recipient resolution and read-back confirmation before outbound email;
- topic relationship map across journal entries;
- duplicate-thought and unresolved-loop detection;
- configurable morning and evening readback profiles.
