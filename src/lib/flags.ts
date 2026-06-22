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
 * PRICING_ENABLED — master switch for showing prices / paid tiers (the Pricing
 * page, the "Pricing" nav + footer links, and the homepage pricing section).
 * Turned OFF until payments are set up. Flip to `true` to show pricing again.
 */
export const PRICING_ENABLED = false;
