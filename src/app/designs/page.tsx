import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design options",
  robots: { index: false },
};

const options = [
  {
    href: "/",
    name: "Current — Classic",
    desc: "Navy gradient hero, card-based sections, matches the reference mockups. The version you've already seen.",
  },
  {
    href: "/designs/editorial",
    name: "Alternate A — Editorial",
    desc: "Warm cream palette, magazine layout, a sunrise hero with dark overlay, big serif type and numbered rhythm rows. Calm and elegant.",
  },
  {
    href: "/designs/modern",
    name: "Alternate B — Modern",
    desc: "Split hero with a live email-preview mockup, soft-shadow feature cards, a navy ‘two rhythms’ band. Contemporary and product-forward.",
  },
];

export default function DesignsIndex() {
  return (
    <section>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="sec-tag" style={{ textAlign: "left" }}>
          Internal
        </div>
        <h1 style={{ fontSize: 34, color: "var(--navy)", margin: "8px 0 8px" }}>
          Compare the three designs
        </h1>
        <p className="muted" style={{ marginBottom: 28 }}>
          Same brand and copy, three different looks. Open each and tell me which
          direction you like — we&apos;ll refine from there.
        </p>
        <div style={{ display: "grid", gap: 16 }}>
          {options.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className="rcard"
              style={{ display: "block", textDecoration: "none" }}
            >
              <div className="rk">{o.name}</div>
              <p style={{ color: "#3c4350", fontSize: 15, margin: "6px 0 0" }}>
                {o.desc}
              </p>
              <div
                style={{
                  marginTop: 12,
                  color: "var(--gold-deep)",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                View this design →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
