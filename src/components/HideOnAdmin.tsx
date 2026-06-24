"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the public site chrome (Header/Footer) on /admin routes, so the admin
 * area renders as its own full-screen dark workspace. The wrapped server
 * components still render on the server; this just decides whether to show them.
 */
export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
