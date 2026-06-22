import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { getGoodNewsCandidates } from "@/lib/goodNews";
import { getFeaturedGoodNews } from "@/lib/featuredGoodNews";
import GoodNewsCurator, {
  type CandidateItem,
} from "@/components/GoodNewsCurator";

export const metadata: Metadata = {
  title: "Good News studio",
  robots: { index: false },
};

export default async function GoodNewsStudioPage() {
  if (!supabaseConfigured) redirect("/");
  const user = await getUser();
  if (!user?.email) redirect("/login");
  if (!isAdminEmail(user.email)) redirect("/");

  const [pool, featured] = await Promise.all([
    getGoodNewsCandidates(20),
    getFeaturedGoodNews(),
  ]);

  // Make sure currently-featured stories are always in the list (and first),
  // even if they're older than today's fresh batch.
  const seen = new Set<string>();
  const candidates: CandidateItem[] = [];
  for (const f of featured) {
    const key = f.href.replace(/\/+$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push({ ...f, faith: false });
  }
  for (const c of pool) {
    const key = c.href.replace(/\/+$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push(c);
  }

  return (
    <section>
      <div className="wrap" style={{ maxWidth: 1040 }}>
        <div className="sec-tag" style={{ textAlign: "left" }}>
          Admin · Good News studio
        </div>
        <h1 style={{ fontSize: 32, color: "var(--navy)", margin: "8px 0 6px" }}>
          Today&apos;s Good News
        </h1>
        <p className="muted" style={{ margin: "0 0 8px", maxWidth: 640 }}>
          A fresh batch of uplifting stories every morning. Leave it on{" "}
          <strong>automatic</strong> and the homepage picks the day&apos;s best
          three (always trying to include a ✝ faith story) — or tap up to{" "}
          <strong>three</strong> below to feature them yourself. Your picks stay
          until you change them or switch back to automatic.
        </p>
        <p className="muted" style={{ margin: "0 0 18px", fontSize: 13 }}>
          {candidates.length === 0
            ? "Couldn't load stories right now — try again in a minute."
            : `${candidates.length} stories to choose from.`}{" "}
          <Link href="/account">← Back to account</Link>
        </p>

        {candidates.length > 0 && (
          <GoodNewsCurator
            candidates={candidates}
            initialSelected={featured.map((f) => f.href)}
          />
        )}
      </div>
    </section>
  );
}
