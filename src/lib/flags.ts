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
 * Video on the members' dashboard. The admin curator stays available
 * (gated by GOOD_NEWS_ENABLED) so stories can still be browsed, organized, and
 * referenced internally — with thumbnails — even though they aren't shown
 * publicly. Flip to `true` to bring Good News back on the public site.
 */
export const GOOD_NEWS_PUBLIC = true;

/**
 * PRICING_ENABLED — master switch for showing prices / paid tiers (the Pricing
 * page, the "Pricing" nav + footer links, and the homepage pricing section).
 * Turned OFF until payments are set up. Flip to `true` to show pricing again.
 */
export const PRICING_ENABLED = true;

/**
 * DEVOTIONAL_AUTO_PUBLISH — when ON, the daily cron automatically publishes that
 * day's devotional (marks it "ready") so it goes live on the site, in the member
 * archive, and in the RSS feed with zero clicks. You can still edit any issue
 * before (or after) it publishes. Flip to `false` to go back to manual approval.
 */
export const DEVOTIONAL_AUTO_PUBLISH = true;
