"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const briefing = `
NULLWORKS COPPOLA CONTINUITY LAB. AUDIO BRIEFING ONE.

Human Authority: Mason Perry. Shared workroom participants include Mason, Jason, and Neuraxis. This briefing is an original NULLWORKS research summary. It is not Francis Ford Coppola's copyrighted commentary transcript.

The verified historical starting point is a June 2013 IÉSEG working paper by Hedley Malloch and Birgit Kleymann titled Francis Ford Coppola as Bricoleur in the Making of The Godfather: An Alternative View on Strategy as Practice.

The paper analyzed an approximately nineteen-thousand-word transcription of Coppola's audio commentary for The Godfather. The researchers coded the commentary using NVivo and interpreted the production through bricolage, co-creation, resource use, and what they called governed emergence.

The important evidence boundary is that the nineteen-thousand-word transcription was the researchers' dataset. It was not published as a full appendix in the working paper, and NULLWORKS has not located an authorized public copy. Therefore this page does not pretend to possess it, reproduce it, or generate a replacement narration.

The original Coppola commentary runs approximately two hours and fifty-seven minutes and was recorded for home-video editions of The Godfather. The safest verified access route is a licensed disc edition containing the director's commentary. The page also links to Coppola's official audiobook version of The Godfather Notebook, narrated by Coppola and built from eight selected scenes.

The first research hypothesis is that Coppola's notebook may have functioned as an analog continuity kernel inside a larger distributed creative system. Coppola held governing intent and final creative authority. The notebook externalized scene context, interpretation, risks, imagery, emotional purpose, and adaptation choices. Actors and department specialists supplied distributed cognition. The production environment supplied pressure, opportunity, material limits, accidents, and interpersonal feedback.

That remains a hypothesis rather than a conclusion. The 2013 study did not directly analyze the notebook as an artifact. It mainly analyzed Coppola's retrospective commentary. The next research stage must therefore compare the notebook, the novel, screenplay drafts, production records, collaborator accounts, the filmed material, the edit, and Coppola's later explanations.

Five initial scene pilots have been selected. First, Michael's restaurant assassination of Sollozzo and McCluskey. Second, Luca Brasi rehearsing his greeting and then faltering before Don Corleone. Third, the opening office scene and Brando's cat. Fourth, Michael in Sicily, including the language and translation problem. Fifth, Don Corleone playing with his grandson using an orange peel.

For each scene, the research chain will trace the novel source, Coppola's interpretation, screenplay state, notebook preparation, governing intent, planned execution, collaborator contribution, production constraint or opportunity, Coppola intervention, filmed material, editorial transformation, finished scene, retrospective explanation, and unresolved uncertainty.

The strongest current caution is hindsight bias. A memory reported decades later is evidence of the speaker's later account, not automatic proof of exactly what happened during production. Contradictions will be preserved rather than silently reconciled.

The working proposition is simple: preserve the why, allow the form to learn. Strong control of intent does not require rigid control of every implementation detail. But no claim will be promoted until the evidence chain supports it.

End of audio briefing one.
`;

type SpeechState = "idle" | "playing" | "paused";

export default function AudioBrief() {
  const [state, setState] = useState<SpeechState>("idle");
  const [rate, setRate] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const supported = useMemo(
    () => typeof window !== "undefined" && "speechSynthesis" in window,
    [],
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const start = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(briefing);
    utterance.rate = rate;
    utterance.pitch = 0.92;
    utterance.onend = () => setState("idle");
    utterance.onerror = () => setState("idle");
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setState("playing");
  };

  const pauseOrResume = () => {
    if (!supported) return;
    if (state === "playing") {
      window.speechSynthesis.pause();
      setState("paused");
    } else if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
    }
  };

  const stop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setState("idle");
  };

  const changeRate = (nextRate: number) => {
    setRate(nextRate);
    if (state !== "idle") {
      window.speechSynthesis.cancel();
      setState("idle");
    }
  };

  return (
    <section className="audio-console" aria-labelledby="audio-brief-title">
      <div>
        <div className="console-label">NULLWORKS ORIGINAL // MOBILE LISTENING MODE</div>
        <h2 id="audio-brief-title">Audio briefing one</h2>
        <p>
          Browser narration of the current research position. This is an original
          NULLWORKS briefing—not Coppola&apos;s commentary transcript and not a cloned voice.
        </p>
      </div>

      <div className="controls" aria-label="Audio briefing controls">
        <button type="button" onClick={start} disabled={!supported || state !== "idle"}>
          Play briefing
        </button>
        <button type="button" onClick={pauseOrResume} disabled={!supported || state === "idle"}>
          {state === "paused" ? "Resume" : "Pause"}
        </button>
        <button type="button" onClick={stop} disabled={!supported || state === "idle"}>
          Stop
        </button>
      </div>

      <div className="rate-row" aria-label="Playback speed">
        <span>Speed</span>
        {[0.85, 1, 1.15, 1.3].map((option) => (
          <button
            key={option}
            type="button"
            className={rate === option ? "selected" : ""}
            onClick={() => changeRate(option)}
          >
            {option}×
          </button>
        ))}
      </div>

      <div className="console-status" role="status">
        {!supported
          ? "Browser speech is not supported on this device."
          : state === "idle"
            ? "Ready. Start playback before driving and do not operate the page while moving."
            : state === "paused"
              ? "Paused."
              : "Playing. Keep the browser active for the most reliable mobile playback."}
      </div>
    </section>
  );
}
