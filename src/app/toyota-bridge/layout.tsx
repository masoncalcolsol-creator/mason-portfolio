import type { ReactNode } from "react";
import ChuteEvidenceCorrection from "../_components/ChuteEvidenceCorrection";

export default function ToyotaBridgeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ChuteEvidenceCorrection />
    </>
  );
}
