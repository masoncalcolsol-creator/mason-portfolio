import { after } from "next/server";

import {
  captureGrayMatter,
  getGrayMatterBrief,
  searchGrayMatter,
  sendGrayMatterDailyDigest,
} from "@/lib/gray-matter";
import { validateGrayMatterCallSession } from "@/lib/gray-matter-auth";
import { appendCallTurn } from "@/lib/neuraxis-call-telemetry";
import {
  readTwilioForm,
  say,
  speak,
  speechOrDigits,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function clip(value: string, max = 900): string {
  const cleaned = String(value || "").replace(/[`*_#]/g, "").replace(/\s+/g, " ").trim();
  return cleaned.length <= max ? cleaned : `${cleaned.slice(0, max - 40)}. Ask me to continue later.`;
}

export async function POST(request: Request) {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }
  const url = new URL(request.url);
  const state = url.searchParams.get("state") || "";
  if (!validateGrayMatterCallSession(state, params.CallSid || "", params.From || "")) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Gray Matter session expired or invalid.", request.url)}<Hangup/></Response>`, 403);
  }

  const heard = speechOrDigits(params).trim();
  const command = heard.toLowerCase();
  const loopUrl = new URL("/api/neuraxis/twilio/gray-matter/capture", request.url);
  loopUrl.searchParams.set("state", state);

  if (/^(done|stop|goodbye|hang up|finish)$/.test(command)) {
    after(async () => {
      await appendCallTurn({
        callSid: params.CallSid || "unknown-call",
        room: "gray_matter",
        step: "session_closed",
        preserveSpeech: false,
        capturedFields: { action: "SESSION_CLOSED_BY_MASON" },
      }).catch(() => undefined);
    });
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Gray Matter closed. Your transcripts remain searchable in Gmail and indexed in the Hive.", request.url)}<Hangup/></Response>`);
  }

  let spoken = "";
  let step = "capture";
  let capturedFields: Record<string, unknown> = {};

  try {
    if (/\b(daily triage|daily digest|what(?:'s| is) open|read my list|status|brief me)\b/.test(command)) {
      step = "brief_readback";
      const brief = await getGrayMatterBrief();
      spoken = brief.spoken;
      capturedFields = {
        today_entries: brief.todayEntries.length,
        open_actions: brief.openActions.length,
        spillover: brief.spillover.length,
      };
    } else if (/\b(send|email)\b.*\b(digest|triage)\b/.test(command)) {
      step = "digest_sent_to_self";
      const digest = await sendGrayMatterDailyDigest();
      spoken = digest.gmailMessageId
        ? `Today's Gray Matter digest was sent to your Gmail. It contains ${digest.counts.todayEntries} entries, ${digest.counts.openActions} open actions, and ${digest.counts.spillover} spillover items.`
        : `The digest was built, but Gmail delivery failed. ${digest.warnings[0] || "Check the Gmail configuration."}`;
      capturedFields = {
        digest_id: digest.digestId,
        gmail_message_id: digest.gmailMessageId || null,
        counts: digest.counts,
        warnings: digest.warnings,
      };
    } else if (/^(search|find|look up|lookup)\b/.test(command)) {
      step = "journal_search";
      const query = heard.replace(/^(search(?: for)?|find|look up|lookup)\s+/i, "").trim();
      if (!query) {
        spoken = "Tell me the topic you want searched.";
      } else {
        const results = await searchGrayMatter(query, 3);
        spoken = results.length
          ? `I found ${results.length} matching ${results.length === 1 ? "entry" : "entries"}. ${results.map((result, index) => `${index + 1}. ${result.subject}. ${result.snippet || result.excerpt.slice(0, 180)}`).join(" ")}`
          : `I did not find a Gray Matter journal entry matching ${query}.`;
        capturedFields = { query, result_ids: results.map((result) => result.id) };
      }
    } else if (/\b(reply to|send an email|email them|respond to)\b/.test(command)) {
      step = "outbound_instruction_captured";
      const result = await captureGrayMatter({
        transcript: `OUTBOUND COMMUNICATION INSTRUCTION — review required before sending: ${heard}`,
        source: "TWILIO",
        callSid: params.CallSid,
      });
      spoken = `I vaulted that communication instruction as ${result.entry.id}. I did not send or reply blindly; it remains confirmation-gated.`;
      capturedFields = { entry_id: result.entry.id, action_ids: result.actions.map((action) => action.id), warnings: result.warnings };
    } else if (heard) {
      const result = await captureGrayMatter({ transcript: heard, source: "TWILIO", callSid: params.CallSid });
      step = "journal_entry_captured";
      spoken = result.entry.gmail_message_id
        ? `Vaulted as ${result.entry.id}. I classified it as ${result.entry.category} with ${result.actions.length} open ${result.actions.length === 1 ? "action" : "actions"}. Audio was not retained.`
        : `I created entry ${result.entry.id}, but the Gmail archive needs attention. ${result.warnings[0] || "The Hive receipt was preserved."}`;
      capturedFields = {
        entry_id: result.entry.id,
        category: result.entry.category,
        urgency: result.entry.urgency,
        gmail_message_id: result.entry.gmail_message_id || null,
        action_ids: result.actions.map((action) => action.id),
        warnings: result.warnings,
      };
    } else {
      spoken = "I did not receive a transcript. Try one short note.";
      step = "empty_transcript";
    }
  } catch (error) {
    console.error("Gray Matter phone command failed", error);
    spoken = `Gray Matter hit a temporary error. ${error instanceof Error ? error.message : "Try again shortly."}`;
    step = "command_failed";
    capturedFields = { error: error instanceof Error ? error.message : "unknown" };
  }

  after(async () => {
    await appendCallTurn({
      callSid: params.CallSid || "unknown-call",
      room: "gray_matter",
      step,
      preserveSpeech: false,
      capturedFields,
    }).catch(() => undefined);
  });

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  ${speak(clip(spoken), request.url)}
  <Pause length="1"/>
  <Redirect method="POST">${xmlEscape(loopUrl.toString())}</Redirect>
</Response>`);
}
