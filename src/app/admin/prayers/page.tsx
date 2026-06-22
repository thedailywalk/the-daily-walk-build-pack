import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { listPendingPrayers } from "@/lib/prayers";
import { approvePrayerAction, rejectPrayerAction } from "./actions";

export const metadata: Metadata = {
  title: "Prayer approvals",
  robots: { index: false },
};

export default async function AdminPrayersPage() {
  if (!supabaseConfigured) redirect("/");
  const user = await getUser();
  if (!user?.email) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/");

  const pending = await listPendingPrayers();

  return (
    <section>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="sec-tag" style={{ textAlign: "left" }}>
          Admin · Prayer Wall
        </div>
        <h1 style={{ fontSize: 32, color: "var(--navy)", margin: "8px 0 4px" }}>
          Approval queue
        </h1>
        <p className="muted" style={{ margin: "0 0 24px" }}>
          {pending.length === 0
            ? "All caught up — nothing waiting for review."
            : `${pending.length} request${pending.length === 1 ? "" : "s"} waiting for review.`}{" "}
          Approved requests appear on the{" "}
          <Link href="/prayer-wall">public wall</Link>.
        </p>

        {pending.map((p) => (
          <div className="admin-prayer" key={p.id}>
            <p className="prayer-body">{p.body}</p>
            <div className="prayer-meta">
              <span className="prayer-author">
                {p.name?.trim() ? p.name : "Anonymous"}
              </span>
              <span className="prayer-dot" aria-hidden="true">
                ·
              </span>
              <span className="prayer-time">
                {new Date(p.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="admin-actions">
              <form action={approvePrayerAction}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="btn btn-gold">
                  ✓ Approve
                </button>
              </form>
              <form action={rejectPrayerAction}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="btn btn-ghost">
                  Hide
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
