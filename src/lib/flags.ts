/**
 * Feature switches.
 *
 * GOOD_NEWS_ENABLED — master switch for the Good News DATA + admin tooling (the
 * curator/picking studio). ON. Public visibility is controlled separately by
 * GOOD_NEWS_PUBLIC below.
 */
export const GOOD_NEWS_ENABLED = true;

/**
 * GOOD_NEWS_PUBLIC — whether Good News shows on the PUBLIC site (homepage
 * section + nav + footer link). OFF: replaced publicly by the Weekly Featured
 * Video in the members' Daily Wonders tab. The admin curator stays available
 * (gated by GOOD_NEWS_ENABLED) so stories can still be browsed, organized, and
 * referenced internally — with thumbnails — even though they aren't shown
 * publicly. Flip to `true` to bring Good News back on the public site.
 */
export const GOOD_NEWS_PUBLIC = false;

/**
 * GOOD_NEWS_ROOM_ENABLED — sub-switch for the full Premium /good-news reading
 * room (30 stories a day). OFF for now: the homepage "Good news" preview stays
 * live, but the dedicated reading-room page shows a "coming soon" message.
 */
export const GOOD_NEWS_ROOM_ENABLED = false;

/**
 * PRICING_ENABLED — master switch for showing prices / paid tiers (the Pricing
 * page, the "Pricing" nav + footer links, and the homepage pricing section).
 * Turned OFF until payments are set up. Flip to `true` to show pricing again.
 */
export const PRICING_ENABLED = false;
