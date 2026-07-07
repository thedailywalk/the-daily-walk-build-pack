import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { isAdminEmail } from "@/lib/admin";
import { GOOD_NEWS_ENABLED } from "@/lib/flags";
import { site } from "@/lib/site";
import SetPassword from "@/components/SetPassword";

export const metadata: Metadata = {
  title: "My account",
  robots: { index: false },
};

const TIER_LABEL: Record<string, string> = {
  free: "Free",
  premium: "Premium",
  patron: "Patron",
};

export default async function AccountPage() {
  if (!supabaseConfigured) redirect("/");
  const user = await getUser();

  // Gate: must be signed in.
  if (!user?.email) redirect("/login");

  const ent = await getEntitlement(user.email);
  const isPaid = ent.tier === "premium" || ent.tier === "patron";
  const isAdmin = isAdminEmail(user.email);

  return (
    <>
      <header className="hero sunrise portal-hero">
        <div className="wrap">
          <div className="inner">
            <div className="rule" />
            <div className="eyebrow">My account</div>
            <h1>Welcome back</h1>
          </div>
        </div>
      </header>
      <section>
      <div className="wrap" style={{ maxWidth: 720 }}>
        {/* Status card */}
        <div className="rcard" style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div className="rk">Signed in as</div>
              <div style={{ fontSize: 16, color: "var(--navy)", marginTop: 4 }}>
                {user.email}
              </div>
            </div>
            <span
              style={{
                fontFamily: "var(--sans)",
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#fff",
                background: isPaid ? "var(--gold)" : "var(--grey)",
                padding: "6px 14px",
                borderRadius: 20,
              }}
            >
              {TIER_LABEL[ent.tier] ?? "Free"} plan
            </span>
          </div>
        </div>

        {/* Entitlement-gated content */}
        {isPaid ? (
          <div className="rcard" style={{ marginBottom: 20 }}>
            <div className="rk">Your Bible-in-a-Year journey</div>
            <p style={{ color: "#3c4350", fontSize: 15, margin: "8px 0 14px" }}>
              You&apos;re all set with {TIER_LABEL[ent.tier]}. Track your progress
              through the whole Bible — today&apos;s reading, mark days complete,
              and pick up right where you left off.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/journey" className="btn btn-gold">
                Open My Journey →
              </Link>
            </div>
            <div className="muted" style={{ fontSize: 13, marginTop: 12 }}>
              Subscription status: {ent.status ?? "active"}
            </div>
          </div>
        ) : (
          <div
            className="rcard"
            style={{ marginBottom: 20, background: "var(--cream)" }}
          >
            <div className="rk">Unlock the guided journey</div>
            <p style={{ color: "#3c4350", fontSize: 15, margin: "8px 0 14px" }}>
              You&apos;re on the <strong>Free</strong> plan — the daily
              newsletter, prayer, and Good News. Upgrade to{" "}
              <strong>Premium</strong> for the guided Bible-in-a-Year journey
              from your Day 1, the weekend deep-dive, and the full
              archive.
            </p>
            <Link href="/pricing" className="btn btn-gold">
              See Premium →
            </Link>
          </div>
        )}

        {/* Owner-only: prayer wall moderation */}
        {isAdmin && (
          <div
            className="rcard"
            style={{ marginBottom: 20, background: "var(--cream)" }}
          >
            <div className="rk">Prayer Wall · owner tools</div>
            <p style={{ color: "#3c4350", fontSize: 15, margin: "8px 0 14px" }}>
              Review and approve member prayer requests before they appear on the
              public wall.
            </p>
            <Link href="/admin/prayers" className="btn btn-navy">
              Review prayer requests →
            </Link>
            <div style={{ marginTop: 16, display: GOOD_NEWS_ENABLED ? "block" : "none" }}>
              <div className="rk">Homepage Good News</div>
              <p style={{ color: "#3c4350", fontSize: 15, margin: "8px 0 14px" }}>
                Pick which three Good News stories appear on the{" "}
                <strong>homepage</strong> — or leave it automatic (it always
                tries to include a faith story).
              </p>
              <Link href="/admin/good-news" className="btn btn-ghost">
                Choose homepage stories →
              </Link>
            </div>
          </div>
        )}

        {/* Billing + account actions */}
        <div className="rcard" style={{ marginBottom: 20 }}>
          <div className="rk">Billing &amp; subscription</div>
          <p style={{ color: "#3c4350", fontSize: 15, margin: "8px 0 14px" }}>
            {isPaid
              ? "Manage your payment method, plan, or cancel anytime."
              : "No paid subscription yet."}
          </p>
          {site.beehiiv.manageUrl ? (
            <a
              href={site.beehiiv.manageUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Manage billing →
            </a>
          ) : (
            <span className="muted" style={{ fontSize: 13 }}>
              Billing portal link coming soon.
            </span>
          )}
        </div>

        <div className="rcard" style={{ marginBottom: 20 }}>
          <div className="rk">Sign-in</div>
          <p style={{ color: "#3c4350", fontSize: 15, margin: "8px 0 14px" }}>
            Prefer a password over an emailed code? Set one here.
          </p>
          <SetPassword />
        </div>

        <form action="/auth/signout" method="post">
          <button type="submit" className="btn btn-ghost">
            Sign out
          </button>
        </form>
      </div>
      </section>
    </>
  );
}
