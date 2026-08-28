'use client';

import { usePathname } from 'next/navigation';

export default function PublicQuickNav() {
  const pathname = usePathname();

  if (pathname?.startsWith('/pmar') || pathname?.startsWith('/stallworks')) return null;

  return (
    <nav className="nw-public-quicknav print:hidden" aria-label="NULLWORKS quick navigation">
      <a href="/triage">Triage</a>
      <a href="/assurance">Services</a>
      <a href="/pricing">Pricing</a>
      <a href="mailto:nullworks.neuraxis@gmail.com?subject=NULLWORKS%20Inquiry">Contact</a>
    </nav>
  );
}
