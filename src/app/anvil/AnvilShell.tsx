import Link from "next/link";
import type { ReactNode } from "react";

export default function AnvilShell({ children, accent = "#ff4d57" }: { children: ReactNode; accent?: string }) {
  return (
    <main className="anvilSystem" style={{ "--accent": accent } as React.CSSProperties}>
      <style>{`
        :root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#070707}.anvilSystem{min-height:100vh;color:#eee9df;background:radial-gradient(circle at 82% 4%,color-mix(in srgb,var(--accent) 13%,transparent),transparent 28rem),linear-gradient(#080808,#0d0c0b 52%,#060606);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.anvilNav{position:sticky;top:0;z-index:80;background:rgba(7,7,7,.9);backdrop-filter:blur(14px);border-bottom:1px solid #262522}.anvilNavIn{width:min(1180px,calc(100% - 24px));min-height:44px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:12px}.anvilBrand{font-weight:950;letter-spacing:.12em;color:#fff;text-decoration:none;font-size:11px;white-space:nowrap}.anvilBrand b{color:var(--accent)}.anvilLinks{display:flex;gap:4px;align-items:center}.anvilLinks a{color:#aaa59c;text-decoration:none;font:800 9px ui-monospace,monospace;letter-spacing:.04em;padding:6px 7px}.anvilLinks a:hover{color:var(--accent)}.anvilCrumb{width:min(1180px,calc(100% - 24px));margin:auto;padding:10px 0 0;color:#66625c;font:800 9px ui-monospace,monospace;letter-spacing:.11em}.anvilCrumb a{color:#918c83;text-decoration:none}.anvilFoot{width:min(1180px,calc(100% - 32px));margin:60px auto 0;padding:28px 0 44px;border-top:1px solid #292824;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;color:#77736b;font-size:12px}.anvilFoot a{color:var(--accent);text-decoration:none;font-weight:900}@media(max-width:720px){.anvilNavIn{min-height:40px;width:calc(100% - 18px);gap:6px}.anvilBrand{font-size:10px;letter-spacing:.08em}.anvilLinks{gap:0}.anvilLinks a{font-size:8px;padding:6px 5px}.anvilLinks a:nth-child(2),.anvilLinks a:nth-child(4){display:none}.anvilCrumb{display:none}}@media(max-width:410px){.anvilLinks a:nth-child(3){display:none}}
      `}</style>
      <nav className="anvilNav" aria-label="ANVIL navigation">
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
