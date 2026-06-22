import type { Metadata } from "next";
import Link from "next/link";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getGoodNewsMagazine } from "@/lib/goodNews";
import GoodNewsReader from "@/components/GoodNewsReader";

export const metadata: Metadata = {
  title: "Good News",
  description:
    "A daily reading room of uplifting, real good news — faith, heroes, animals, and hope. A Premium member benefit of The Daily Walk.",
};

export default async function GoodNewsPage() {
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
