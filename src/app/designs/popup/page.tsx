import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Popup looks — pick one", robots: { index: false } };
export const dynamic = "force-static";

const LOOKS = [
  { slug: "pop-cream", name: "Cream Classic", blurb: "Warm cream card, navy header bar, gold accents + verse panel. Polished & trustworthy (refined current look).", swatch: ["#FAF6EE", "#1F3A5F", "#C9A24B"] },
  { slug: "pop-dark", name: "Dark (Inner Circle)", blurb: "Deep-navy card, gold accents, faint stars. Sleek & premium — matches the members' portal vibe.", swatch: ["#0e1626", "#E3C074", "#16263f"] },
  { slug: "pop-sunrise", name: "Sunrise", blurb: "A dawn scene across the top (navy → gold horizon) over a light body. Hopeful — a new morning with God.", swatch: ["#1F3A5F", "#e3a85a", "#FAF6EE"] },
  { slug: "pop-minimal", name: "Minimal", blurb: "Ultra-clean white card, big serif headline, lots of whitespace, just the essentials. Understated & elegant.", swatch: ["#ffffff", "#1F3A5F", "#C9A24B"] },
  { slug: "pop-verse", name: "Verse-forward", blurb: "Leads with a large Scripture as the emotional hook over a soft gradient. Immersive & devotional.", swatch: ["#16263f", "#C9A24B", "#e3a85a"] },
];

export default function PopupDesignIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f1e9", fontFamily: "Inter, system-ui, sans-serif", padding: "48px 20px" }}>
      <div style={{ maxWidth: 940, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase", color: "#B8902E", margin: 0 }}>
          The Daily Walk · Welcome popup
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 34, color: "#1F3A5F", margin: "8px 0 6px" }}>
          Pick the join popup
        </h1>
        <p style={{ color: "#5a5345", fontSize: 16, lineHeight: 1.6, maxWidth: 640, margin: "0 0 26px" }}>
          Five looks for the popup that greets new visitors. Open each, then tell me the one you want and
          I&apos;ll make it the live popup. (Previews only.)
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
          {LOOKS.map((o) => (
            <Link key={o.slug} href={`/designs/popup/${o.slug}`} style={{ display: "block", background: "#fff", border: "1px solid #e7ddc7", borderRadius: 16, padding: 22, textDecoration: "none", boxShadow: "0 12px 30px -22px rgba(31,58,95,0.5)" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                {o.swatch.map((c) => (
                  <span key={c} style={{ width: 26, height: 26, borderRadius: 7, background: c, border: "1px solid rgba(0,0,0,0.08)" }} />
                ))}
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#1F3A5F" }}>{o.name}</div>
              <p style={{ color: "#5a5345", fontSize: 14, lineHeight: 1.55, margin: "8px 0 14px" }}>{o.blurb}</p>
              <span style={{ display: "inline-block", background: "#1F3A5F", color: "#fff", fontWeight: 700, fontSize: 14, padding: "9px 16px", borderRadius: 10 }}>
                Preview {o.name} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
