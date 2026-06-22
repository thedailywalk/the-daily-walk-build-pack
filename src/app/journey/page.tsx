import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getOrCreateProgress } from "@/lib/progress";
import { getPlanDay } from "@/lib/plan";
import { daysCompleted, progressPercent, TOTAL_DAYS } from "@/lib/journey";
import { markCompleteAction, restartAction } from "./actions";

export const metadata: Metadata = {
  title: "My Journey",
  robots: { index: false },
};

export default async function JourneyPage() {
  // Gate: signed in + paying subscriber.
  if (!supabaseConfigured) redirect("/");
  const user = await getUser();
  if (!user?.email) redirect("/login");
  const ent = await getEntitlement(user.email);
  if (ent.tier === "free") redirect("/pricing");

  const progress = await getOrCreateProgress(user.id);
  const today = getPlanDay(progress.currentDay);
  const done = daysCompleted(progress);
  const pct = progressPercent(progress);
  const completed = progress.status === "completed";

  return (
    <section>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="sec-tag" style={{ textAlign: "left" }}>
          My Journey · Bible in a Year
        </div>
        <h1 style={{ fontSize: 34, color: "var(--navy)", margin: "8px 0 4px" }}>
          {completed ? "You finished the journey! 🎉" : `Day ${progress.currentDay} of ${TOTAL_DAYS}`}
        </h1>
        <p className="muted" style={{ margin: "0 0 16px" }}>
          This week: <strong style={{ color: "var(--navy)" }}>{today.weekTheme}</strong>
        </p>

        {/* Progress bar */}
        <div
          style={{
            height: 12,
            background: "var(--cream)",
            border: "1px solid var(--line)",
            borderRadius: 20,
            overflow: "hidden",
          }}
          aria-label={`${pct}% complete`}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: "var(--gold)",
              transition: "width .3s",
            }}
          />
        </div>
        <p className="muted" style={{ fontSize: 13, margin: "8px 0 28px" }}>
          {done} of {TOTAL_DAYS} days complete · {pct}%
        </p>

        {/* Today's reading */}
        {!completed && (
          <div className="rcard" style={{ marginBottom: 20 }}>
            <div className="rk">Today&apos;s reading · Day {progress.currentDay}</div>
            <h3 style={{ color: "var(--navy)", margin: "8px 0 12px", fontSize: 22 }}>
              📖 {today.main}
            </h3>
            <p style={{ color: "#3c4350", fontSize: 15, margin: "0 0 14px" }}>
              <strong>Be real with God:</strong> {today.companion}
            </p>
            <div
              style={{
                background: "var(--cream)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: "14px 18px",
                color: "var(--navy)",
                fontSize: 15,
              }}
            >
              <strong>Make it real:</strong> {today.prompt}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          {!completed && (
            <form action={markCompleteAction}>
              <button type="submit" className="btn btn-gold">
                ✓ Mark Day {progress.currentDay} complete
              </button>
            </form>
          )}
          <form action={restartAction}>
            <button type="submit" className="btn btn-ghost">
              Restart at Day 1
            </button>
          </form>
        </div>

        {completed && (
          <div className="rcard" style={{ marginTop: 20, background: "var(--cream)" }}>
            <p style={{ margin: 0, color: "#3c4350", fontSize: 15 }}>
              You read all 365 days — the whole Bible, from Jesus to the very end.
              Start again anytime; the goal was always 365 days <em>in</em>
              Scripture, not 365 days in a row. 🙏
            </p>
          </div>
        )}

        <p style={{ marginTop: 28, fontSize: 14 }}>
          <Link href="/account">← Back to my account</Link>
        </p>
      </div>
    </section>
  );
}
