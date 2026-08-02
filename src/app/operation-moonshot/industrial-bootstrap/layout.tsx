import type { ReactNode } from "react";
import LunarDaySignal from "./LunarDaySignal";
import light from "./lightmoon.module.css";

export default function IndustrialBootstrapLayout({ children }: { children: ReactNode }) {
  return (
    <div className={light.frame}>
      <LunarDaySignal />
      {children}
    </div>
  );
}
