"use client";

import Script from "next/script";
import { createElement } from "react";

/**
 * Embeds a Givebutter donation form directly on the page so people can give
 * without leaving the site. Givebutter gives you an embed snippet like:
 *
 *   <script src="https://widgets.givebutter.com/latest.umd.cjs?acct=XXXX&p=other" async></script>
 *   <givebutter-widget id="XXXXXX"></givebutter-widget>
 *
 * Paste the widget ID (and account ID) into your env / site config and this
 * renders the same thing the React way. `<givebutter-widget>` is a custom
 * element, so we create it with React.createElement to avoid JSX typing noise.
 */
export default function GivebutterEmbed({
  widgetId,
  accountId,
}: {
  widgetId: string;
  accountId?: string;
}) {
  const src = accountId
    ? `https://widgets.givebutter.com/latest.umd.cjs?acct=${accountId}&p=other`
    : "https://widgets.givebutter.com/latest.umd.cjs?p=other";

  return (
    <div className="gb-embed">
      <Script src={src} strategy="afterInteractive" />
      {createElement("givebutter-widget", { id: widgetId })}
    </div>
  );
}
