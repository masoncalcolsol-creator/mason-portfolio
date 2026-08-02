import type { ReactNode } from "react";
import BloodMoonSignal from "./BloodMoonSignal";
import blood from "./bloodmoon.module.css";
import tune from "./transparency-tune.module.css";

export default function ObservationSystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${blood.frame} ${tune.tune}`}>
      <BloodMoonSignal />
      <div className={blood.content}>{children}</div>
    </div>
  );
}
