"use client";

import { usePathname } from "next/navigation";

/**
 * Shows/hides public site chrome per route. By default hides on the admin
 * workspace and the member portal (which render their own full-screen shells);
 * pass `paths` to override which route prefixes to hide on.
 *
 * The header is kept visible inside /admin (so the owner can always jump back to
 * the site, the portal, or account) — only the portal hides it, since the portal
 * has its own full sidebar nav.
 */
export default function HideOnAdmin({
  children,
  paths = ["/admin", "/portal"],
}: {
  children: React.ReactNode;
  paths?: string[];
}) {
  const pathname = usePathname() ?? "";
  if (paths.some((p) => pathname.startsWith(p))) return null;
  return <>{children}</>;
}
