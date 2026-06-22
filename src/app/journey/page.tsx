import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getOrCreateProgress } from "@/lib/progress";
import { getStudyDay } from "@/lib/studyGuide";
import { daysCompleted, progressPercent, TOTAL_DAYS } from "@/lib/journey";
import StudyGuide from "@/components/StudyGuide";
import StudySideCards from "@/components/StudySideCards";
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
  const entry = getStudyDay(progress.currentDay);
  const done = daysCompleted(progress);
  const pct = progressPercent(progress);
  const completed = progress.status === "completed";

  return (
    <section className="sg-section">
      <div className="sg-layout">
        <aside className="sg-side sg-side-left">
          <StudySideCards
            title="Go deeper"
            words={entry.keyWords}
            reflection={entry.sideReflection}
          />
        </aside>

        <div className="sg-main">
          {completed ? (
            <div className="sg-complete" style={{ marginTop: 0 }}>
              🎉 You finished the whole journey — all 365 days. Amen. Start
              again anytime; the goal was always time <em>in</em> Scripture, not
              days in a row.
            </div>
          ) : null}

          <StudyGuide entry={entry} />

          {/* Journey-level actions */}
          <div className="sg-dayactions">
            <div className="sg-dayprogress">
              {done} of {TOTAL_DAYS} days complete · {pct}%
            </div>
            {!completed && (
              <form action={markCompleteAction}>
                <button type="submit" className="btn btn-gold">
                  ✓ Mark Day {progress.currentDay} complete →
                </button>
              </form>
            )}
            <form action={restartAction}>
              <button type="submit" className="btn btn-ghost">
                Restart at Day 1
              </button>
            </form>
          </div>

          <p style={{ marginTop: 22, fontSize: 14 }}>
            <Link href="/account">← Back to my account</Link>
          </p>
        </div>

        <aside className="sg-side sg-side-right">
          <StudySideCards title="For your heart" verses={entry.verses} />
        </aside>
      </div>
    </section>
  );
}
