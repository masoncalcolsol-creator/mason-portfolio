import LivingSignalCanvas from "../living-signals/LivingSignalCanvas";

export const metadata = { robots: { index: false, follow: false } };

export default function AmandaConveyorBackground() {
  return (
    <main
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "#050607",
      }}
    >
      <LivingSignalCanvas mode="conveyor" accentRgb="255,216,77" />
    </main>
  );
}
