"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the public site chrome (Header/Footer) on routes that render their own
 * full-screen shell — the admin workspace (/admin) and the member portal
 * (/portal). The wrapped server components still render on the server; this just
 * decides whether to show them.
 */
export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) return null;
  return <>{children}</>;
}
