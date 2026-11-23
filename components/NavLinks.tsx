"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/projects", label: "Projects" },
  { href: "/dashboard", label: "Dashboard" }, // logged out -> goes to /login
];

function LinkList({ pathname }: { pathname: string | null }) {
  return (
    <ul className="flex gap-6">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`font-medium transition-colors ${
                isActive
                  ? "text-white border-b-2 border-purple-600"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// usePathname() reads the URL, which on dynamic routes (like
// /dashboard/projects/[id]/edit) is only known at request time.
function ActiveLinks() {
  const pathname = usePathname();
  return <LinkList pathname={pathname} />;
}

export default function NavLinks() {
  // Without <Suspense>, `next build` fails ("usePathname() ... outside of
  // <Suspense>"). The fallback shows the same links, just without highlighting.
  return (
    <Suspense fallback={<LinkList pathname={null} />}>
      <ActiveLinks />
    </Suspense>
  );
}
