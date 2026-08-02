import type { ReactNode } from "react";
import blood from "./bloodmoon.module.css";

export default function ObservationSystemLayout({ children }: { children: ReactNode }) {
  return <div className={blood.frame}>{children}</div>;
}
