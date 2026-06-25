import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Popup looks — side by side", robots: { index: false } };
export const dynamic = "force-static";

const LOOKS = [
  { slug: "pop-cream", name: "Cream Classic", blurb: "Warm cream card, navy header, gold + verse panel. Polished & trustworthy." },
  { slug: "pop-dark", name: "Dark (Inner Circle)", blurb: "Deep-navy card, gold accents, faint stars. Sleek — matches the portal." },
  { slug: "pop-sunrise", name: "Sunrise", blurb: "A dawn scene across the top over a light body. Hopeful, new-morning." },
  { slug: "pop-minimal", name: "Minimal", blurb: "Ultra-clean white card, big serif headline, lots of whitespace." },
  { slug: "pop-verse", name: "Verse-forward", blurb: "Leads with a large Scripture over a soft gradient. Immersive & devotional." },
];

export default function PopupGallery() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f1e9", fontFamily: "Inter, system-ui, sans-serif", padding: "40px 20px 60px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase", color: "#B8902E", margin: 0 }}>
          The Daily Walk · Welcome popup
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 34, color: "#1F3A5F", margin: "8px 0 6px" }}>
          All five popups, side by side
        </h1>
        <p style={{ color: "#5a5345", fontSize: 16, lineHeight: 1.6, maxWidth: 680, margin: "0 0 26px" }}>
          Each tile is the real popup. Tap <strong>Open full</strong> to see one full-screen. Then tell me the
          one you want and I&apos;ll make it the live popup. (Previews only.)
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: 20 }}>
          {LOOKS.map((o) => (
            <div key={o.slug} style={{ background: "#fff", border: "1px solid #e7ddc7", borderRadius: 16, overflow: "hidden", boxShadow: "0 12px 30px -22px rgba(31,58,95,0.5)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #eee4cf" }}>
                <div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 18, color: "#1F3A5F" }}>{o.name}</div>
                  <div style={{ fontSize: 12, color: "#8a8270" }}>{o.blurb}</div>
                </div>
                <Link href={`/designs/popup/${o.slug}`} style={{ flexShrink: 0, background: "#1F3A5F", color: "#fff", fontWeight: 700, fontSize: 13, padding: "8px 12px", borderRadius: 9, textDecoration: "none" }}>
                  Open full →
                </Link>
              </div>
              <iframe
                src={`/designs/popup/${o.slug}`}
                title={o.name}
                loading="lazy"
                style={{ width: "100%", height: 580, border: "none", display: "block", background: "#0f1a2e" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
