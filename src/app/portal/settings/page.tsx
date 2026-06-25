import type { Metadata } from "next";
import Link from "next/link";
import { getUser } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { isAdminEmail } from "@/lib/admin";
import { GOOD_NEWS_ENABLED } from "@/lib/flags";
import { site } from "@/lib/site";
import SetPassword from "@/components/SetPassword";

export const metadata: Metadata = { title: "My Settings", robots: { index: false } };
export const dynamic = "force-dynamic";

const TIER_LABEL: Record<string, string> = { free: "Free", premium: "Premium", patron: "Patron" };

export default async function PortalSettings() {
  // Portal layout already gates: signed-out → /login, free → /pricing.
  const user = await getUser();
  const email = user!.email!;
  const ent = await getEntitlement(email);
  const isAdmin = isAdminEmail(email);

  return (
    <div className="m-wrap">
      <section className="m-hero m-hero-sm">
        <div className="m-hero-in">
          <span className="m-hero-kicker">My Settings</span>
          <h1 className="m-hero-h">Your account</h1>
          <p className="m-hero-sub">Your plan, sign-in, and account — all in one place.</p>
        </div>
      </section>

      {/* Account */}
      <section className="m-panel m-set">
        <div className="m-set-row">
          <div>
            <span className="m-card-eyebrow">Signed in as</span>
            <div className="m-set-email">{email}</div>
            <div className="m-card-line muted">Subscription status: {ent.status ?? "active"}</div>
          </div>
          <span className="m-tier">{TIER_LABEL[ent.tier] ?? "Free"} plan</span>
        </div>
      </section>

      {/* Journey */}
      <section className="m-panel m-set">
        <span className="m-card-eyebrow">✦ Your Bible-in-a-Year journey</span>
        <p className="m-card-line">
          You&apos;re all set with {TIER_LABEL[ent.tier]}. Track your progress through the whole Bible —
          today&apos;s reading, mark days complete, and pick up right where you left off.
        </p>
        <Link href="/journey" className="btn btn-gold">Open My Journey →</Link>
      </section>

      {/* Owner-only tools */}
      {isAdmin && (
        <section className="m-panel m-set">
          <span className="m-card-eyebrow">Owner tools</span>
          <p className="m-card-line">Review member prayer requests before they appear on the public wall.</p>
          <div className="m-set-actions">
            <Link href="/admin/prayers" className="btn btn-ghost">Review prayer requests →</Link>
            {GOOD_NEWS_ENABLED && (
              <Link href="/admin/good-news" className="btn btn-ghost">Choose homepage stories →</Link>
            )}
            <Link href="/admin/devotionals" className="btn btn-ghost">Open the admin studio →</Link>
          </div>
        </section>
      )}

      {/* Billing */}
      <section className="m-panel m-set">
        <span className="m-card-eyebrow">Billing &amp; subscription</span>
        <p className="m-card-line">Manage your payment method, plan, or cancel anytime.</p>
        {site.beehiiv.manageUrl ? (
          <a href={site.beehiiv.manageUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
            Manage billing →
          </a>
        ) : (
          <span className="muted" style={{ fontSize: 13 }}>Billing portal link coming soon.</span>
        )}
      </section>

      {/* Sign-in / password */}
      <section className="m-panel m-set">
        <span className="m-card-eyebrow">Sign-in</span>
        <p className="m-card-line">Prefer a password over an emailed code? Set one here.</p>
        <SetPassword />
      </section>

      <form action="/auth/signout" method="post" style={{ marginTop: 4 }}>
        <button type="submit" className="btn btn-ghost">Sign out</button>
      </form>
    </div>
  );
}
