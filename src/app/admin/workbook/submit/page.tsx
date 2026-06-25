import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { submitInspirationAction } from "../actions";

export const metadata: Metadata = { title: "Add inspiration", robots: { index: false } };
export const dynamic = "force-dynamic";

const ERR: Record<string, string> = {
  short: "That was too short to analyze — paste the full transcript or note (a few sentences at least).",
  notheme: "I couldn’t find a clear spiritual theme in that. Add a little more, or tell me the theme in your own words.",
  nofit: "I found the theme, but no unlocked study day was a strong match right now. Nothing was added — that’s by design.",
};

const SOURCE_TYPES = ["reel", "sermon", "transcript", "note", "newsletter", "other"];

export default async function SubmitInspiration({
  searchParams,
}: {
  searchParams: Promise<{ err?: string; lib?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;

  return (
    <section className="section lib-warm wb-warm">
      <div className="adm-wrap" style={{ maxWidth: 760 }}>
        <header className="lib-hero">
          <div className="lib-hero-kicker">Admin · Workbook Evolution</div>
          <h1 className="lib-hero-title">Add inspiration</h1>
          <p className="lib-hero-sub">
            Paste a reel/sermon transcript, your notes, or a devotional idea. The system finds the
            study days it would genuinely strengthen and drafts the update in your voice — for your
            approval. <strong>Inspiration shapes delivery, never doctrine; nothing is copied.</strong>
          </p>
          <div className="lib-hero-cta">
            <Link href="/admin/workbook" className="wb-btn wb-btn-ghost">← Dashboard</Link>
          </div>
        </header>

        {sp.lib && (
          <div className="wb-flash">
            ✓ Also saved to your <Link href="/admin/library?final=1">Content Library</Link> as an unfinished
            draft — finish it there when you have time.
          </div>
        )}
        {sp.err && <div className="wb-flash wb-flash-soft">{ERR[sp.err] ?? "Try again."}</div>}

        <form action={submitInspirationAction} className="wb-form">
          <label className="adm-field">
            <span>What is this?</span>
            <input name="sourceLabel" placeholder="e.g. Johnny Chang reel on beating anxiety" />
          </label>

          <div className="wb-form-row">
            <label className="adm-field">
              <span>Type</span>
              <select name="sourceType" defaultValue="transcript">
                {SOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <label className="adm-field">
              <span>Reference link (optional)</span>
              <input name="link" placeholder="Instagram / YouTube URL — for your records" />
            </label>
            <label className="adm-field">
              <span>Max suggestions</span>
              <select name="maxPlacements" defaultValue="5">
                {[3, 5, 8].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
          </div>

          <label className="adm-field">
            <span>Paste the transcript / notes</span>
            <textarea
              name="text"
              rows={12}
              placeholder="Paste the full transcript or your notes here. The more you give, the better the matches and the drafts."
              required
            />
          </label>

          <label className="wb-check-wide">
            <input type="checkbox" name="toLibrary" defaultChecked />
            <span>
              <strong>Also save to my Content Library</strong> (for newsletter research). It’ll be filed as an
              unfinished draft — auto-tagged with the themes found here — so you enter it once and finish it
              later. Great when something fits both the workbook <em>and</em> the newsletter.
            </span>
          </label>

          <div className="wb-form-actions">
            <button type="submit" className="btn-gold">Analyze &amp; suggest updates →</button>
            <span className="adm-hint">Takes a few seconds. You’ll review every suggestion before anything changes.</span>
          </div>
        </form>

        <div className="wb-note">
          <h3>About Instagram Reel links — can this be fully automatic?</h3>
          <p>
            Short answer: <strong>paste the transcript</strong> (Option B) is the reliable, safe path, and
            it’s what this form uses.
          </p>
          <ul>
            <li>
              <strong>Instagram has no public “give me this Reel’s transcript” API.</strong> Their Graph API
              only reaches business/creator accounts you own and doesn’t hand back captions for arbitrary
              public Reels. Auto-scraping a Reel’s audio/captions violates Instagram’s Terms — not worth the risk.
            </li>
            <li>
              <strong>YouTube</strong> does expose captions for many videos, so a link → transcript step is more
              feasible there; we can add that later as a convenience for YouTube links specifically.
            </li>
            <li>
              <strong>Cleanest workflow today:</strong> open the Reel, tap the captions/transcript (or use your
              phone’s built-in transcription), paste it here. The moment you do, the rest is automatic — themes,
              tone, matching chapters, and drafted updates.
            </li>
          </ul>
          <p className="adm-hint">
            The reference link you add is stored for your records only — it is never auto-fetched.
          </p>
        </div>
      </div>
    </section>
  );
}
