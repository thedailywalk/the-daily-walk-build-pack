import { Suspense } from "react";
import AdminSidebar from "@/components/AdminSidebar";

/**
 * Admin workspace shell — a dark, full-screen "content command center" that is
 * visually its own environment, separate from the warm public/member site.
 * Public Header/Footer are hidden on /admin (see HideOnAdmin in the root layout).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <Suspense fallback={<aside className="aside" />}>
        <AdminSidebar />
      </Suspense>
      <div className="admin-main">{children}</div>
    </div>
  );
}
