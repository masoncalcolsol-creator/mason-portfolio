'use client';

import { usePathname } from 'next/navigation';

export default function PublicQuickNav() {
  const pathname = usePathname();

  // Private/reviewer and field-operation surfaces must not inherit corporate navigation.
  if (
    pathname?.startsWith('/pmar') ||
    pathname?.startsWith('/stallworks') ||
    pathname?.startsWith('/review') ||
    pathname?.startsWith('/private') ||
    pathname?.startsWith('/workroom')
  ) return null;

  return (
    <nav className="nw-public-quicknav print:hidden" aria-label="NULLWORKS corporate navigation">
      <a href="/architecture">Architecture</a>
      <a href="/products">Systems</a>
      <a href="/proof">Proof</a>
      <a href="/research">Research</a>
      <a href="/company">Company</a>
    </nav>
  );
}
