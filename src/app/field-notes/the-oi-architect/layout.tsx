import type { ReactNode } from "react";

export default function OiArchitectLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div style={{ padding: "12px 16px", background: "#0a1520", color: "#f7f0df", textAlign: "center", fontSize: "13px", fontWeight: 800 }}>
        OISA founding definition and field standard v0.1 are now live. {" "}
        <a href="/oisa-category" style={{ color: "#e5c77e", textDecoration: "underline", textUnderlineOffset: "3px" }}>
          Open the category page →
        </a>
      </div>
      {children}
    </>
  );
}
