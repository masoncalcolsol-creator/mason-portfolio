import Link from "next/link";
import type { ReactNode } from "react";

export default function AnvilShell({ children, accent = "#ff4d57" }: { children: ReactNode; accent?: string }) {
  return (
    <main className="anvilSystem" style={{ "--accent": accent } as React.CSSProperties}>
      <style>{`
        :root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#070707}.anvilSystem{min-height:100vh;color:#eee9df;background:radial-gradient(circle at 82% 4%,color-mix(in srgb,var(--accent) 13%,transparent),transparent 28rem),linear-gradient(#080808,#0d0c0b 52%,#060606);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.anvilNav{position:sticky;top:0;z-index:80;background:rgba(7,7,7,.86);backdrop-filter:blur(16px);border-bottom:1px solid #2a2926}.anvilNavIn{width:min(1180px,calc(100% - 32px));min-height:62px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:18px}.anvilBrand{font-weight:950;letter-spacing:.14em;color:#fff;text-decoration:none;font-size:13px}.anvilBrand b{color:var(--accent)}.anvilLinks{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.anvilLinks a{color:#bdb8ae;text-decoration:none;font:800 11px ui-monospace,monospace;letter-spacing:.06em;border:1px solid #302e2a;border-radius:999px;padding:8px 10px}.anvilLinks a:hover{color:#070707;background:var(--accent);border-color:var(--accent)}.anvilCrumb{width:min(1180px,calc(100% - 32px));margin:auto;padding:18px 0 0;color:#77736b;font:800 10px ui-monospace,monospace;letter-spacing:.13em}.anvilCrumb a{color:#aaa49a;text-decoration:none}.anvilFoot{width:min(1180px,calc(100% - 32px));margin:60px auto 0;padding:28px 0 44px;border-top:1px solid #292824;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;color:#77736b;font-size:12px}.anvilFoot a{color:var(--accent);text-decoration:none;font-weight:900}@media(max-width:720px){.anvilNavIn{align-items:flex-start;padding:13px 0;flex-direction:column}.anvilLinks{justify-content:flex-start}.anvilLinks a{padding:7px 9px}}
      `}</style>
      <nav className="anvilNav">
        <div className="anvilNavIn">
          <Link className="anvilBrand" href="/anvil">NULLWORKS // <b>ANVIL</b></Link>
          <div className="anvilLinks">
            <Link href="/anvil/artists">ARTISTS</Link>
            <Link href="/anvil/projects">PROJECTS</Link>
            <Link href="/anvil/releases">RELEASES</Link>
            <Link href="/anvil/labs">LABS</Link>
            <Link href="/">NULLWORKS ↗</Link>
          </div>
        </div>
      </nav>
      <div className="anvilCrumb"><Link href="/">NULLWORKS</Link> / <Link href="/anvil">ANVIL</Link></div>
      {children}
      <footer className="anvilFoot"><span>ANVIL is the creative production organism inside NULLWORKS.</span><Link href="/">RETURN TO NULLWORKS</Link></footer>
    </main>
  );
}
