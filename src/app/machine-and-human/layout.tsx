import type { ReactNode } from "react";
import OscilloscopeBackground from "./OscilloscopeBackground";
import "./oscilloscope.css";

export default function MachineAndHumanLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mh-scope-stage">
      <OscilloscopeBackground />
      <div className="mh-scope-content">{children}</div>
    </div>
  );
}
