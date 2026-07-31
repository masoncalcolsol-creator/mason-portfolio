"use client";

import { useLayoutEffect } from "react";

type RealtimeEvent = Record<string, any>;

type PendingRule = {
  token: string;
  summary: string;
  preparedAt: number;
};

function parseArguments(value: unknown): Record<string, unknown> {
  if (typeof value !== "string") return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

function toolCall(event: RealtimeEvent): { name: string; callId: string; args: Record<string, unknown> } | null {
  if (event.type === "response.function_call_arguments.done") {
    const name = String(event.name || "");
    const callId = String(event.call_id || "");
    if (!name || !callId) return null;
    return { name, callId, args: parseArguments(event.arguments) };
  }

  if (event.type === "response.output_item.done" && event.item?.type === "function_call") {
    const name = String(event.item.name || "");
    const callId = String(event.item.call_id || "");
    if (!name || !callId) return null;
    return { name, callId, args: parseArguments(event.item.arguments) };
  }

  return null;
}

async function postRule(body: Record<string, unknown>): Promise<Record<string, unknown>> {
  try {
    const response = await fetch("/api/lenderflow-room/rule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({
      ok: false,
      mutationPerformed: false,
      error: `Rule service returned HTTP ${response.status}.`,
    })) as Record<string, unknown>;
    return { httpStatus: response.status, ...data };
  } catch (error) {
    return {
      ok: false,
      mutationPerformed: false,
      error: error instanceof Error ? error.message : "The rule service could not be reached.",
    };
  }
}

function sendToolOutput(channel: RTCDataChannel, callId: string, output: Record<string, unknown>): void {
  if (channel.readyState !== "open") return;
  channel.send(JSON.stringify({
    type: "conversation.item.create",
    item: {
      type: "function_call_output",
      call_id: callId,
      output: JSON.stringify(output),
    },
  }));
  channel.send(JSON.stringify({ type: "response.create" }));
}

function attachToolHandler(channel: RTCDataChannel): void {
  let pendingRule: PendingRule | null = null;
  let latestHumanTranscript = "";
  let latestHumanTranscriptAt = 0;
  const handledCalls = new Set<string>();

  channel.addEventListener("message", (message) => {
    let event: RealtimeEvent;
    try {
      event = JSON.parse(String(message.data || "")) as RealtimeEvent;
    } catch {
      return;
    }

    if (event.type === "conversation.item.input_audio_transcription.completed") {
      latestHumanTranscript = String(event.transcript || "").replace(/\s+/g, " ").trim();
      latestHumanTranscriptAt = Date.now();
      return;
    }

    const call = toolCall(event);
    if (!call || handledCalls.has(call.callId)) return;
    handledCalls.add(call.callId);

    void (async () => {
      if (call.name === "prepare_lenderflow_rule") {
        const result = await postRule({
          action: "prepare",
          proposal: call.args,
        });
        if (result.ok === true && typeof result.confirmationToken === "string") {
          pendingRule = {
            token: result.confirmationToken,
            summary: String(result.spokenSummary || ""),
            preparedAt: Date.now(),
          };
        } else {
          pendingRule = null;
        }
        sendToolOutput(channel, call.callId, result);
        return;
      }

      if (call.name === "publish_lenderflow_rule") {
        if (!pendingRule) {
          sendToolOutput(channel, call.callId, {
            ok: false,
            mutationPerformed: false,
            error: "No verified prepared rule is waiting for approval. Prepare and read the rule back again.",
          });
          return;
        }
        if (latestHumanTranscriptAt <= pendingRule.preparedAt) {
          sendToolOutput(channel, call.callId, {
            ok: false,
            mutationPerformed: false,
            error: "No separate spoken approval was detected after the read-back. Nothing changed.",
          });
          return;
        }

        const result = await postRule({
          action: "publish",
          confirmationToken: pendingRule.token,
          affirmation: latestHumanTranscript,
          confirmedBy: String(call.args.confirmedBy || "Authorized LenderFlow room participant"),
        });
        if (result.mutationPerformed === true) pendingRule = null;
        sendToolOutput(channel, call.callId, {
          ...result,
          approvedUtteranceDetected: latestHumanTranscript,
        });
        return;
      }

      sendToolOutput(channel, call.callId, {
        ok: false,
        mutationPerformed: false,
        error: `Unknown LenderFlow tool: ${call.name}`,
      });
    })();
  });
}

export default function LenderFlowToolBridge() {
  useLayoutEffect(() => {
    if (typeof window === "undefined" || typeof RTCPeerConnection === "undefined") return;

    const prototype = RTCPeerConnection.prototype;
    const original = prototype.createDataChannel;
    prototype.createDataChannel = function createDataChannelWithLenderFlowTools(
      label: string,
      dataChannelDict?: RTCDataChannelInit,
    ): RTCDataChannel {
      const channel = original.call(this, label, dataChannelDict);
      if (label === "oai-events") attachToolHandler(channel);
      return channel;
    };

    return () => {
      prototype.createDataChannel = original;
    };
  }, []);

  return null;
}
