/**
 * Feature switches.
 *
 * GOOD_NEWS_ENABLED — master switch for everything that surfaces Good News
 * Network stories (the homepage "Good news" section, the /good-news reading
 * room, and the "Good News" nav link). ON in the lowest-risk format only:
 * category + headline + a link out to the source, branded tiles (no third-party
 * images), and NO article excerpts — so we never reproduce headline+lead.
 */
export const GOOD_NEWS_ENABLED = true;

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
