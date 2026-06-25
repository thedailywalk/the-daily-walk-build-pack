import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Portal designs — pick one", robots: { index: false } };
export const dynamic = "force-static";

const OPTIONS = [
  {
    slug: "aurora",
    name: "Aurora",
    tag: "Warm editorial premium",
    blurb: "Calm, sophisticated, cream + navy + gold with a sunrise hero. Feels trustworthy and devotional — the ‘serious journey’ feel.",
    swatch: ["#FAF6EE", "#1F3A5F", "#C9A24B"],
  },
  {
    slug: "trailhead",
    name: "Trailhead",
    tag: "Playful & gamified (Duolingo-style)",
    blurb: "Bright, rounded, energetic — big streak flame, chunky XP bar, colorful badge tiles. Lively and motivating, especially for younger members.",
    swatch: ["#1F3A5F", "#C9A24B", "#2f8f83"],
  },
  {
    slug: "inner-circle",
    name: "Inner Circle",
    tag: "Dark premium / sleek",
    blurb: "Deep navy-to-black with gold, avatar rings, and stat chips — exclusive and cool, like a premium training app. Bridges teen + adult.",
    swatch: ["#0f1a2e", "#1F3A5F", "#E3C074"],
  },
  {
    slug: "studio",
    name: "Studio",
    tag: "Clean modern dashboard",
    blurb: "Soft gray-blue with tidy white cards in a grid. Professional and current — the most ‘polished software’ feel.",
    swatch: ["#eef1f6", "#1F3A5F", "#C9A24B"],
  },
  {
    slug: "sanctuary",
    name: "Sanctuary",
    tag: "Rich jewel-tone / stained-glass",
    blurb: "Deep navy with luminous gold, teal, amethyst & rose accents and stained-glass motifs. Artful, vibrant, memorable.",
    swatch: ["#16263f", "#C9A24B", "#7b5ea7"],
  },
];

export default function PortalDesignIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f1e9", fontFamily: "Inter, system-ui, sans-serif", padding: "48px 20px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase", color: "#B8902E", margin: 0 }}>
          The Daily Walk · Member portal
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: "#1F3A5F", margin: "8px 0 6px" }}>
          Pick your portal look
        </h1>
        <p style={{ color: "#5a5345", fontSize: 16, lineHeight: 1.6, maxWidth: 640, margin: "0 0 28px" }}>
          Five completely different directions — same content, same brand, very different feel. Open each,
          see which one feels like sitting down for a real journey (and fun enough to keep coming back).
          These are previews only; nothing here changes your live portal.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
          {OPTIONS.map((o) => (
            <Link
              key={o.slug}
              href={`/designs/portal/${o.slug}`}
              style={{
                display: "block",
                background: "#fff",
                border: "1px solid #e7ddc7",
                borderRadius: 16,
                padding: 22,
                textDecoration: "none",
                boxShadow: "0 12px 30px -22px rgba(31,58,95,0.5)",
              }}
            >
              <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                {o.swatch.map((c) => (
                  <span key={c} style={{ width: 26, height: 26, borderRadius: 7, background: c, border: "1px solid rgba(0,0,0,0.08)" }} />
                ))}
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#1F3A5F" }}>{o.name}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#B8902E", textTransform: "uppercase", letterSpacing: 0.4, margin: "2px 0 8px" }}>
                {o.tag}
              </div>
              <p style={{ color: "#5a5345", fontSize: 14, lineHeight: 1.55, margin: "0 0 14px" }}>{o.blurb}</p>
              <span style={{ display: "inline-block", background: "#1F3A5F", color: "#fff", fontWeight: 700, fontSize: 14, padding: "9px 16px", borderRadius: 10 }}>
                Preview {o.name} →
              </span>
            </Link>
          ))}
        </div>

        <p style={{ color: "#8a8270", fontSize: 13, marginTop: 28 }}>
          When you’ve picked one, tell me the name and I’ll rebuild your real portal in that style.
        </p>
      </div>
    </div>
  );
}
