import type { Metadata } from "next";
import Link from "next/link";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { listApprovedPrayers } from "@/lib/prayers";
import PrayerForm from "@/components/PrayerForm";
import PrayButton from "@/components/PrayButton";

export const metadata: Metadata = {
  title: "Prayer Wall",
  description:
    "Share what's on your heart and pray for one another. A welcoming wall of prayer requests from The Daily Walk community.",
};

const AVATAR_COLORS = [
  "#1F3A5F", "#C9A24B", "#3C7A5A", "#B5654A", "#5A6AA0", "#8A6CAB",
];
function avatarColor(name: string | null): string {
  if (!name?.trim()) return "#9aa1ad";
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}
function initial(name: string | null): string {
  return name?.trim() ? name.trim()[0].toUpperCase() : "🙏";
}

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const secs = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default async function PrayerWallPage() {
  const user = supabaseConfigured ? await getUser() : null;
  const ent = user?.email ? await getEntitlement(user.email) : null;
  const canPost = !!ent && ent.tier !== "free";
  const prayers = await listApprovedPrayers();

  return (
    <section className="prayer-wall">
      <div className="wrap">
        <div className="sec-tag">Community</div>
        <h1 className="h">The Prayer Wall</h1>
        <p className="sub">
          Share what&apos;s on your heart, and pray for one another. &ldquo;Carry
          each other&apos;s burdens.&rdquo; — Galatians 6:2
        </p>

        {/* SUBMIT — kept right at the top so it's the first thing members reach. */}
        <div className="prayer-submit" id="share">
          <div className="prayer-submit-head">
            <span aria-hidden="true">🙏</span> Lift it up together
          </div>
          <div className="prayer-submit-body">
          {!supabaseConfigured ? (
            <p className="muted" style={{ margin: 0 }}>
              The prayer wall is opening soon. 🙏
            </p>
          ) : canPost ? (
            <PrayerForm />
          ) : user ? (
            <div className="prayer-signin">
              <div className="prayer-thanks-emoji" aria-hidden="true">
                🙏
              </div>
              <h3>Sharing is a Premium feature</h3>
              <p>
                Become a Founding Member to post your own prayer requests.
                Praying over the wall below is always free.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/pricing" className="btn btn-gold">
                  See Premium
                </Link>
              </div>
            </div>
          ) : (
            <div className="prayer-signin">
              <div className="prayer-thanks-emoji" aria-hidden="true">
                🙏
              </div>
              <h3>Have a prayer request?</h3>
              <p>
                Founding Members can share requests with the
                community. Anyone can pray over the wall below.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/login" className="btn btn-navy">
                  Sign in
                </Link>
                <Link href="/pricing" className="btn btn-ghost">
                  See Premium
                </Link>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* WALL */}
        {prayers.length === 0 ? (
          <p className="muted prayer-empty">
            No prayers yet — be the first to share, and watch this wall fill with
            grace.
          </p>
        ) : (
          <div className="prayer-grid">
            {prayers.map((p) => (
              <article className="prayer-card" key={p.id}>
                <p className="prayer-body">{p.body}</p>
                <div className="prayer-meta">
                  <span
                    className="prayer-avatar"
                    style={{ background: avatarColor(p.name) }}
                    aria-hidden="true"
                  >
                    {initial(p.name)}
                  </span>
                  <span className="prayer-byline">
                    <span className="prayer-author">
                      {p.name?.trim() ? p.name : "Anonymous"}
                    </span>
                    <span className="prayer-time">{timeAgo(p.createdAt)}</span>
                  </span>
                </div>
                <PrayButton id={p.id} count={p.prayCount} />
              </article>
            ))}
          </div>
        )}

        <div className="prayer-band">
          <h2>You&apos;re never praying alone.</h2>
          <p>
            Every request here is lifted up by this community. Add yours above,
            or pray over someone else&apos;s today.
          </p>
          <div className="verse">
            &ldquo;The prayer of a righteous person is powerful and
            effective.&rdquo; — James 5:16
          </div>
        </div>
      </div>
    </section>
  );
}
