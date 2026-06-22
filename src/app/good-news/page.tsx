import type { Metadata } from "next";
import Link from "next/link";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getGoodNewsMagazine } from "@/lib/goodNews";
import { GOOD_NEWS_ENABLED, GOOD_NEWS_ROOM_ENABLED } from "@/lib/flags";
import GoodNewsReader from "@/components/GoodNewsReader";

export const metadata: Metadata = {
  title: "Good News",
  description:
    "A daily reading room of uplifting, real good news — faith, heroes, animals, and hope. A Premium member benefit of The Daily Walk.",
};

export default async function GoodNewsPage() {
  if (!GOOD_NEWS_ENABLED || !GOOD_NEWS_ROOM_ENABLED) {
    return (
      <section>
        <div className="wrap" style={{ maxWidth: 560 }}>
          <div className="sec-tag">Coming soon</div>
          <h1 className="h">The full reading room is on its way</h1>
          <p className="sub">
            Your daily Good News briefing is already in every issue. The full
            reading room — dozens of uplifting, sourced stories in one calm place
            — is coming soon. In the meantime, the daily devotional and prayer
            wall are here for you. 🙏
          </p>
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <Link href="/prayer-wall" className="btn btn-gold">
              Visit the Prayer Wall
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const user = supabaseConfigured ? await getUser() : null;
  const ent = user?.email ? await getEntitlement(user.email) : null;
  const paid = !!ent && ent.tier !== "free";

  if (!paid) {
    return (
      <section>
        <div className="wrap" style={{ maxWidth: 560 }}>
          <div className="sec-tag">Premium</div>
          <h1 className="h">The Good News reading room</h1>
          <p className="sub">
            Every day, 30 fresh, uplifting stories — faith, heroes, animals, and
            hope — in one calm place to read. A Premium &amp; Patron benefit.
          </p>
          <div className="prayer-submit" style={{ textAlign: "center" }}>
            <div className="prayer-thanks-emoji" aria-hidden="true">
              📰
            </div>
            {user ? (
              <>
                <h3>This is a Premium feature</h3>
                <p>
                  Upgrade to Premium or Patron to open your daily Good News
                  reading room.
                </p>
                <Link href="/pricing" className="btn btn-gold">
                  See Premium
                </Link>
              </>
            ) : (
              <>
                <h3>Members only</h3>
                <p>
                  Sign in as a Premium or Patron member to open your daily Good
                  News reading room.
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/login" className="btn btn-navy">
                    Sign in
                  </Link>
                  <Link href="/pricing" className="btn btn-ghost">
                    See Premium
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  const items = await getGoodNewsMagazine(30);

  if (items.length === 0) {
    return (
      <section>
        <div className="wrap" style={{ maxWidth: 560 }}>
          <h1 className="h">Good News</h1>
          <p className="sub">
            We couldn&apos;t load today&apos;s stories just now — please try
            again in a minute. <Link href="/account">← My account</Link>
          </p>
        </div>
      </section>
    );
  }

  // PT date: "YYYY-MM-DD" key for the daily prompt + a friendly label.
  const todayKey = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Los_Angeles",
  });
  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });

  return (
    <section className="gnr-section">
      <div className="wrap" style={{ maxWidth: 1080 }}>
        <GoodNewsReader
          items={items}
          todayKey={todayKey}
          todayLabel={todayLabel}
        />
      </div>
    </section>
  );
}
