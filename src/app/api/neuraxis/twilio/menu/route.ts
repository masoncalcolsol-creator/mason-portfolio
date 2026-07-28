import { after } from "next/server";

import {
  normalizePhone,
  readTwilioForm,
  say,
  speak,
  speechOrDigits,
  twiml,
  validateTwilioRequest,
  xmlEscape,
} from "@/lib/neuraxis-twilio";
import { recordRoomSelection } from "@/lib/neuraxis-call-telemetry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function menuChoice(value: string): "1" | "2" | "3" | "4" | "5" | "7" | "8" | "9" | "" {
  const normalized = value.toLowerCase().trim();
  if (normalized === "1" || /\b(one|shared|workroom)\b/.test(normalized)) return "1";
  if (normalized === "2" || /\b(two|room two|private workroom two|anthony|black flag|fishing|kayak)\b/.test(normalized)) return "2";
  if (normalized === "3" || /\b(three|room three|derek|bullen|lenderflow|lender flow|broker rule|matching rule)\b/.test(normalized)) return "3";
  if (normalized === "4" || /\b(four|gray matter|grey matter|journal|voice memo|note vault|storage unit)\b/.test(normalized)) return "4";
  if (normalized === "5" || /\b(five|audit|ai audit)\b/.test(normalized)) return "5";
  if (normalized === "7" || /\b(seven|mr sloth|mister sloth|sloth|quiet booth|observation)\b/.test(normalized)) return "7";
  if (normalized === "8" || /\b(eight|pressure cooker|kaironull|dane)\b/.test(normalized)) return "8";
  if (normalized === "9" || /\b(nine|private|hive)\b/.test(normalized)) return "9";
  return "";
}

export async function POST(request: Request) {
  const params = await readTwilioForm(request);
  if (!validateTwilioRequest(request, params)) {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${say("Access denied.")}<Hangup/></Response>`, 403);
  }

  const spokenSelection = speechOrDigits(params);
  const choice = menuChoice(spokenSelection);
  const origin = new URL(request.url).origin;
  const room = choice === "1"
    ? "workroom"
    : choice === "2"
      ? "anthony"
      : choice === "3" || choice === "4"
        ? "private"
        : choice === "5"
          ? "audit"
          : choice === "7"
            ? "sloth"
            : choice === "8"
              ? "pressure"
              : choice === "9"
                ? "private"
                : undefined;

  if (room && params.CallSid) {
    after(async () => {
      try {
        await recordRoomSelection({
          callSid: params.CallSid,
          room: room as Parameters<typeof recordRoomSelection>[0]["room"],
          caller: params.From,
          selection: choice === "3"
            ? `DEREK_LENDERFLOW: ${spokenSelection}`
            : choice === "4"
              ? `GRAY_MATTER: ${spokenSelection}`
              : spokenSelection,
        });
      } catch (error) {
        console.error("NEURAXIS room-selection telemetry failed", error);
      }
    });
  }

  if (choice === "1") {
    const target = `${origin}/api/neuraxis/twilio/voice?room=workroom`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Opening the shared workroom.", request.url)}<Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  if (choice === "2") {
    const target = `${origin}/api/neuraxis/twilio/anthony`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  if (choice === "3") {
    const target = `${origin}/api/neuraxis/twilio/derek`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Opening Derek Bullen's private LenderFlow workroom.", request.url)}<Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  if (choice === "4") {
    const target = `${origin}/api/neuraxis/twilio/gray-matter`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Opening Mason's Gray Matter Storage Unit.", request.url)}<Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  if (choice === "5") {
    const target = `${origin}/api/neuraxis/twilio/audit/start`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  if (choice === "7") {
    const target = `${origin}/api/neuraxis/twilio/mr-sloth`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  if (choice === "8") {
    const target = `${origin}/api/neuraxis/twilio/pressure-cooker`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response><Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  if (choice === "9") {
    const allowed = normalizePhone(process.env.NEURAXIS_MASON_CALLER || "");
    const caller = normalizePhone(params.From || "");
    if (!allowed || caller !== allowed) {
      return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Mason's private Hive requires the approved caller number.", request.url)}<Hangup/></Response>`);
    }
    const target = `${origin}/api/neuraxis/twilio/voice?room=private`;
    return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("Private lane accepted.", request.url)}<Redirect method="POST">${xmlEscape(target)}</Redirect></Response>`);
  }

  const retry = `${origin}/api/neuraxis/twilio/voice?telemetry=1`;
  return twiml(`<?xml version="1.0" encoding="UTF-8"?><Response>${speak("I did not recognize that choice.", request.url)}<Redirect method="POST">${xmlEscape(retry)}</Redirect></Response>`);
}
