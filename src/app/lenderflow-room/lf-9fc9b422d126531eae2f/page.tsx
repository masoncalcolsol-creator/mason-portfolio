import type { Metadata } from "next";

import LenderFlowRoomClient from "./LenderFlowRoomClient";
import LenderFlowToolBridge from "./LenderFlowToolBridge";

export const metadata: Metadata = {
  title: "LenderFlow Room | NULLWORKS",
  description: "Private multi-person LenderFlow voice room with LENA.",
  robots: { index: false, follow: false },
};

export default function LenderFlowRoomPage() {
  return (
    <>
      <LenderFlowToolBridge />
      <LenderFlowRoomClient />
    </>
  );
}
