import type { ReactNode } from "react";
import BloodMoonSignal from "./BloodMoonSignal";
import blood from "./bloodmoon.module.css";

export default function ObservationSystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className={blood.frame}>
      <BloodMoonSignal />
      <div className={blood.content}>{children}</div>
    </div>
  );
}
