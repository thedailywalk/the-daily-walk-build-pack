import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Daily Walk — Welcome Email ",
  robots: { index: false },
};
export const dynamic = "force-static";

/**
 * Email-safe welcome email (wider desktop version) — renders reliably in Gmail,
 * Outlook, and on phones. The optional P.S. bonus sits at the very bottom, after
 * the sign-off, so the letter reads clean first.
 */
export default function WelcomeEmailSingle() {
  const addr = site.mailingAddress || "The Daily Walk Newsletter · PO Box 1571 · Sunset Beach, CA 90742";
  const sans = "Helvetica,Arial,sans-serif";
  const serif = "Georgia,'Times New Roman',serif";

  const bullet = (emoji: string, text: string) =>
    `<tr>
      <td style="vertical-align:top;padding:0 11px 12px 0;font-size:17px;line-height:1.5;">${emoji}</td>
      <td style="vertical-align:top;padding:0 0 12px;font-family:${sans};font-size:15.5px;line-height:1.55;color:#2b2b2b;">${text}</td>
    </tr>`;

  const html = `
<div style="background:#eceef1;padding:26px 12px;">
  <div style="max-width:760px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 14px 40px -22px rgba(31,58,95,.45);">

    <!-- Slim header bar -->
    <div style="background:#1F3A5F;text-align:center;padding:15px 20px;">
      <span style="font-family:${sans};letter-spacing:4px;font-size:12px;font-weight:bold;color:#E3C074;text-transform:uppercase;">The Daily Walk Newsletter</span>
    </div>

    <div style="padding:30px 34px 8px;">
      <h1 style="font-family:${serif};font-weight:bold;color:#1F3A5F;font-size:27px;line-height:1.22;margin:0 0 16px;">Welcome in — you just made a move that matters.</h1>

      <p style="font-family:${sans};font-size:15.5px;line-height:1.7;color:#2b2b2b;margin:0 0 20px;">You did something small that has a way of quietly changing everything: you made room to walk with God.</p>

      <div style="font-family:${sans};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 12px;">Here's what happens now</div>

      <p style="font-family:${sans};font-size:15.5px;line-height:1.7;color:#2b2b2b;margin:0 0 16px;">Three mornings a week — <strong>Monday, Wednesday &amp; Friday</strong>, around 5:00 AM ET — a short devotional lands in your inbox. It takes about two minutes, and you leave with something to carry into your day:</p>

      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 20px;">
        ${bullet("📖", "Scripture made simple — clear enough to actually use")}
        ${bullet("🙏", "one honest prayer to start from")}
        ${bullet("🧭", "real, practical tools and guidance — a next step you can take <em>with</em> you, not just read")}
        ${bullet("✦", "and on Wednesdays, a Pastor's Take")}
      </table>

      <p style="font-family:${sans};font-size:15.5px;line-height:1.7;color:#2b2b2b;margin:0 0 20px;">This was never about adding one more thing to feel behind on. <strong>You don't have to have it figured out. You just have to open it.</strong> Some mornings that's a few focused minutes; some mornings it's one honest sentence to God. Both count.</p>

      <p style="font-family:${sans};font-size:15.5px;line-height:1.7;color:#2b2b2b;margin:0;">Your first devotional is on its way. Until then — welcome. We're glad you're here, and we mean that.</p>
    </div>

    <!-- Close / sign-off -->
    <div style="padding:22px 34px 4px;">
      <p style="font-family:${sans};font-size:15.5px;line-height:1.7;color:#2b2b2b;margin:0 0 20px;">If you ever have a question, some feedback, or a prayer request, don't hesitate to reach out.</p>
      <p style="font-family:${sans};font-size:15.5px;line-height:1.5;color:#2b2b2b;margin:0;">Much love and blessings,<br><span style="font-family:${serif};font-size:22px;color:#1F3A5F;font-weight:bold;">The Daily Walk Newsletter</span></p>
    </div>

    <div style="height:30px;line-height:30px;">&nbsp;</div>

    <!-- Optional P.S. bonus — at the very bottom -->
    <div style="padding:0 26px;">
      <div style="background:#faf5e7;border:1px solid #ecdcaf;border-radius:14px;padding:12px 24px 22px;">
        <div style="text-align:center;margin-top:-22px;margin-bottom:10px;">
          <span style="font-family:${sans};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#ffffff;background:#1F3A5F;padding:6px 15px;border-radius:20px;font-weight:bold;">P.S.</span>
        </div>
        <p style="font-family:${sans};font-size:14.5px;font-weight:bold;color:#1F3A5F;margin:0 0 14px;text-align:center;">Pssttt…. read on if you're curious — no pressure.</p>

        <p style="font-family:${sans};font-size:14px;line-height:1.72;color:#4a4433;margin:0 0 14px;"><strong style="color:#1F3A5F;">Want to go all in?</strong> Founding Members ($5.99/mo) get <strong>the devotional every day</strong> — plus <strong>The Spiritual Wellness Guide</strong>, with practical, real-life tools for the relationships that matter most: as a parent, a child, a husband or wife, or a friend. You'll also get <strong>full access to the platform we're building right now</strong> — a personal dashboard and portal that opens into your immersive, guided walk through the whole Bible in a year, starting on your own Day 1.</p>

        <p style="font-family:${sans};font-size:14px;line-height:1.72;color:#4a4433;margin:0 0 16px;">Here's the honest part: we're a small family who love Jesus and want to help others find Him — so we need all the support we can get to build this. Join while it's being built, help make it happen, and <strong style="color:#B8902E;">your price locks in at $5.99 for life</strong>, even after it goes up when the platform launches. And the <strong>first 3,000 members</strong> get access to live streams and sessions with a licensed Christian therapist and guest pastors, all coming soon.</p>

        <div style="height:1px;line-height:1px;background:#e6d7ad;margin:0 0 16px;">&nbsp;</div>

        <p style="font-family:${sans};font-size:14px;line-height:1.72;color:#4a4433;margin:0;"><strong style="color:#1F3A5F;">Want to help beyond a subscription?</strong> Getting the Word of God out into the world through technology is new ground for us — we know our mission and exactly where we're headed, and we're pouring everything we have into doing it well. If you feel called to come alongside us — with a donation toward the mission, a partnership, or your own gifts and ideas for what's next — we'd truly love to talk and find out how we can help each other. Reach out anytime: call <a href="tel:+13103034580" style="color:#B8902E;font-weight:bold;text-decoration:none;">310-303-4580</a> or email <a href="mailto:thedailywalknewsletter@gmail.com" style="color:#B8902E;font-weight:bold;text-decoration:none;">thedailywalknewsletter@gmail.com</a>.</p>
      </div>
    </div>

    <div style="height:24px;line-height:24px;">&nbsp;</div>

    <!-- Footer -->
    <div style="border-top:1px solid #ece4d3;padding:20px 30px;text-align:center;font-family:${sans};font-size:11.5px;line-height:1.7;color:#9a927f;">
      ${addr}<br>
      Add this address to your contacts so we land in your inbox.<br>
      <a href="#" style="color:#B8902E;text-decoration:none;">Update preferences</a> · <a href="#" style="color:#B8902E;text-decoration:none;">Unsubscribe</a>
    </div>

  </div>
</div>`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: "body{margin:0;background:#eceef1}" }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
