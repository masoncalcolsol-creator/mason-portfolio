# OI Conversation Canvas — Beta 0.1 Build Report

**Status:** DEPLOYMENT BUILD IN PROGRESS AT TIME OF REPORT CREATION  
**Build date:** 2026-07-06  
**Human authority:** Mason Perry  
**Project:** NULLWORKS / OI SUITe / NEURAXIS / OI Audio  
**Route:** `/conversation-canvas`

## 1. Starting concept

Mason proposed a founder interview experience in which a phone call, Zoom meeting, or recorded conversation generates a living page while the humans are still talking.

The desired page should:

- create a timestamped timeline as new questions are asked;
- render each question as an expandable bubble or branch;
- preserve the transcript for that exchange;
- separate every participant into distinct copyable speaker blocks;
- allow exact quotes to be copied from a call;
- grow into new sections or pages as themes emerge;
- let a founder observe the artifact materializing in real time;
- preserve the difference between verbatim speech, structured interpretation, and generated content.

## 2. Prototype objective

Build and deploy a usable browser beta immediately, without pretending that live Twilio, Zoom, automatic diarization, or Hive Brain write-back were already connected.

The beta needed to prove the interaction model before adding the production audio and identity infrastructure.

## 3. Implemented beta

### Session controls

- editable session title;
- live elapsed-time counter;
- new-session reset;
- guided founder-discovery demo;
- Markdown export;
- browser-local persistence through `localStorage`.

### Conversation capture

- explicit speaker selection for Mason, Founder, and NEURAXIS;
- typed capture as the reliable baseline;
- optional browser-native speech recognition where supported;
- provisional live transcript display;
- question, answer, decision, and note classifications;
- automatic timestamping;
- finalized speaker blocks.

### Timeline

- questions automatically create timeline branches;
- each branch can be opened or collapsed;
- every participant remains separately attributable;
- each block includes speaker, timestamp, classification, and final/provisional state;
- verbatim copy and attributed-quote copy controls.

### Quote view

- answer and decision blocks become quote-ready cards;
- each card preserves speaker and timestamp;
- one-click copying is available.

### Living page view

- session-level artifact header;
- counts for questions, decisions, and quote blocks;
- lightweight conversation-theme extraction;
- generated section list;
- explicit separation of verbatim, structured, and generated layers.

### Embedded report view

- concept summary;
- implemented-now scope;
- truth boundary;
- next-build requirements;
- pass/next acceptance checklist.

### Mobile behavior

- responsive single-column layout;
- mobile-friendly capture controls;
- speaker and classification controls sized for touch;
- compatible with the browser speech path where the mobile browser supports it.

## 4. Architecture

### Current beta

`Browser UI → manual speaker assignment → typed/browser speech capture → timestamped local session state → timeline / quotes / living page → Markdown export`

### Production target

`Twilio / Zoom / browser audio → consent + identity → streaming transcription → speaker diarization → question/decision parser → real-time shared page → artifact builder → approved tool execution → Hive Brain telemetry`

## 5. Truth boundary

Beta 0.1 does **not** yet provide:

- a live Twilio telephone number;
- Zoom audio ingestion;
- automatic multi-speaker diarization;
- authenticated multi-user shared sessions;
- database persistence;
- secure raw-audio storage;
- direct Hive Brain synchronization;
- automated deployment or repository actions from spoken commands;
- legal recording-consent enforcement;
- production-grade correction, redaction, or retention controls.

Browser speech recognition is optional and browser-dependent. Typed capture is the supported beta fallback.

## 6. Security and human-authority boundary

- no audio is uploaded by this browser beta;
- session state remains in the local browser unless exported;
- future call integrations require explicit recording notice and lawful consent;
- public quotes require human review;
- generated interpretations must always link back to verbatim source material;
- consequential tool actions require authenticated, scoped authorization;
- Human Authority remains final.

## 7. Acceptance results

| Requirement | Result |
|---|---|
| Timestamped speaker blocks | PASS |
| Expandable question timeline | PASS |
| Separate copyable speaker blocks | PASS |
| Attributed quote copying | PASS |
| Verbatim / structured / generated separation | PASS |
| Living page structure | PASS |
| Local persistence | PASS |
| Markdown export | PASS |
| Mobile-responsive interface | PASS |
| Optional browser voice capture | PASS / browser dependent |
| Live Twilio or Zoom audio | NEXT |
| Automatic speaker diarization | NEXT |
| Shared founder observation session | NEXT |
| Hive Brain synchronization | NEXT |

## 8. Repository receipts

Repository: `masoncalcolsol-creator/mason-portfolio`

- `9940ab7db2a9aa0643149e898a70279c12c2dc42` — add route and metadata
- `b95b12e7c041a8fc37a3c2a90b9890c0b0a70bfc` — interactive beta client
- `f8e9f31104f5166265b7c8b68f2831a11f573cbc` — responsive visual system

Research origin receipt:

- `masoncalcolsol-creator/nullworks-corporate-wifi-hive/research/LIVE_FOUNDER_INTERVIEW_PAGE.md`
- concept commit `1c769cf8dcffadcae7696d7f83bd5f0dbb2cfa82`

## 9. Exact next build

1. Test Beta 0.1 on Mason's Android phone and desktop.
2. Record usability failures, copy friction, and speaker-switch mistakes.
3. Add a secure session backend and shareable observer link.
4. Add streaming audio ingestion with explicit consent.
5. Add speaker diarization and human correction controls.
6. Add provisional-to-final transcript state transitions.
7. Connect approved decisions and artifacts to the Hive Brain.
8. Add Twilio call routing only after identity, authorization, logging, and stop controls are defined.

## 10. Concept-to-prototype conclusion

The concept was reduced to its smallest honest test:

**Can a conversation become a source-linked timeline, quote library, and growing product page while the operator is still conducting the interview?**

Beta 0.1 implements that interaction model in a mobile-ready browser prototype without claiming the production audio infrastructure is complete.

**The conversation becomes the interface, evidence record, and first version of the product.**
