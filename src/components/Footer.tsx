import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site">
      <div className="wrap">
        <div className="fbrand">{site.wordmark}</div>
        <div>A daily guide for walking with God in real life.</div>
        <nav aria-label="Footer">
          <Link href="/#how">How it works</Link> ·{" "}
          <Link href="/#good">Good News</Link> ·{" "}
          <Link href="/pricing">Pricing</Link> · <Link href="/about">About</Link>{" "}
          · <Link href="/subscribe">Subscribe</Link>
          {site.community.url ? (
            <>
              {" "}
              ·{" "}
              <a href={site.community.url} target="_blank" rel="noreferrer">
                Community
              </a>
            </>
          ) : null}
          {site.beehiiv.manageUrl ? (
            <>
              {" "}
              ·{" "}
              <a href={site.beehiiv.manageUrl} target="_blank" rel="noreferrer">
                Manage subscription
              </a>
            </>
          ) : null}
        </nav>
        <div className="legal">
          <a href={`mailto:${site.replyTo}`}>{site.replyTo}</a>
          {" · "}© {year} {site.name}
        </div>
      </div>
    </footer>
  );
}
