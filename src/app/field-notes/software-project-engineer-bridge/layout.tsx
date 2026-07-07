import type { ReactNode } from "react";
import ChuteEvidenceCorrection from "../../_components/ChuteEvidenceCorrection";

export default function SoftwareProjectEngineerBridgeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ChuteEvidenceCorrection />
    </>
  );
}
