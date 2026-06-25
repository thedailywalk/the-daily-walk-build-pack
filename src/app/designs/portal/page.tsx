import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Portal designs — pick one", robots: { index: false } };
export const dynamic = "force-static";

// Refined — Constellation × Inner Circle, keeping locked anchors
const IC2 = [
  {
    slug: "ic2-northstar",
    name: "North Star",
    tag: "Streak as the guiding North Star",
    blurb: "Streak becomes a glowing North Star (with a subtle cross-glint) crowning the star-path; a drifting dove nearby. ‘Guided by His light.’",
    swatch: ["#0b1424", "#E3C074", "#6b8fd0"],
  },
  {
    slug: "ic2-dove",
    name: "The Dove's Gift",
    tag: "Dove carries your streak",
    blurb: "An animated dove gently carries your streak on a glowing ribbon — peace & the Spirit as the signature flourish, star-path woven below.",
    swatch: ["#0b1424", "#E3C074", "#cdd7e6"],
  },
  {
    slug: "ic2-path",
    name: "Path of Light",
    tag: "A walked trail of stars",
    blurb: "A winding lighted trail with footprints from Day 1 → 47 → 365, a North Star at the end, and a dove carrying a flame-lantern. ‘One step at a time.’",
    swatch: ["#0b1424", "#E3C074", "#d8a657"],
  },
  {
    slug: "ic2-daylight",
    name: "Dawn & Dusk",
    tag: "Sky shifts morning/noon/night",
    blurb: "Leans into the time-of-day ‘wow’ — see all three skies and how the hero changes when you arrive. Classy, restrained, North-Star streak.",
    swatch: ["#16263f", "#E3C074", "#e3a85a"],
  },
  {
    slug: "ic2-sanctuary",
    name: "Sanctuary Night",
    tag: "Most reverent & elevated",
    blurb: "A quiet cathedral-at-night feel — stained-glass light meets the constellation, streak as a haloed North Star, dove at rest. Calm and sacred.",
    swatch: ["#0b1424", "#E3C074", "#9b7ad0"],
  },
];

// Earlier round — dark "Inner Circle" vibe variations (with animation + visuals)
const IC = [
  {
    slug: "ic-dawn",
    name: "Dark Dawn",
    tag: "Dark + animated sunrise",
    blurb: "Night-navy with a glowing animated sunrise & rays, drifting embers, gold-forward. Aurora's warmth meets Inner Circle's dark premium.",
    swatch: ["#0e1626", "#E3C074", "#1F3A5F"],
  },
  {
    slug: "ic-aurora",
    name: "Aurora Lights",
    tag: "Dark + flowing aurora",
    blurb: "Animated aurora ribbons (teal, amethyst, gold) drifting behind the hero. Ethereal, cool jewel pops, premium and alive.",
    swatch: ["#0e1626", "#36c7b8", "#9b7ad0"],
  },
  {
    slug: "ic-arena",
    name: "The Arena",
    tag: "Dark + leaderboard-forward",
    blurb: "Elite athletic feel — a big premium leaderboard with gold rank rings & dense faith stat-chips. Bold and motivating.",
    swatch: ["#0c1322", "#E3C074", "#2f8f6b"],
  },
  {
    slug: "ic-glass",
    name: "Glasshouse",
    tag: "Dark + glassmorphism",
    blurb: "Frosted translucent cards with neon-gold edges over drifting color blobs. Sleek, modern, high-end app feel.",
    swatch: ["#0e1626", "#E3C074", "#7bd0c4"],
  },
  {
    slug: "ic-constellation",
    name: "Constellation",
    tag: "Dark + night-sky journey",
    blurb: "Twinkling stars and a glowing constellation star-path for your Day 47 of 365. Calm, awe-filled, ‘lift your eyes.’",
    swatch: ["#0b1424", "#E3C074", "#6b8fd0"],
  },
];

// First round — different overall directions
const OPTIONS = [
  {
    slug: "aurora",
    name: "Aurora",
    tag: "Warm editorial premium (light)",
    blurb: "Calm, sophisticated, cream + navy + gold with a sunrise hero. The ‘serious journey’ feel.",
    swatch: ["#FAF6EE", "#1F3A5F", "#C9A24B"],
  },
  {
    slug: "trailhead",
    name: "Trailhead",
    tag: "Playful & gamified (light)",
    blurb: "Bright, rounded, energetic — big streak flame, chunky XP bar, colorful badge tiles.",
    swatch: ["#1F3A5F", "#C9A24B", "#2f8f83"],
  },
  {
    slug: "inner-circle",
    name: "Inner Circle (original)",
    tag: "Dark premium / sleek",
    blurb: "The first dark version — deep navy, gold, avatar rings + stat chips. The base these 5 build on.",
    swatch: ["#0f1a2e", "#1F3A5F", "#E3C074"],
  },
  {
    slug: "studio",
    name: "Studio",
    tag: "Clean modern dashboard (light)",
    blurb: "Soft gray-blue with tidy white cards in a grid. The most ‘polished software’ feel.",
    swatch: ["#eef1f6", "#1F3A5F", "#C9A24B"],
  },
  {
    slug: "sanctuary",
    name: "Sanctuary",
    tag: "Jewel-tone / stained-glass",
    blurb: "Deep navy with luminous gold, teal, amethyst & rose and stained-glass motifs. Artful, vibrant.",
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
        <p style={{ color: "#5a5345", fontSize: 16, lineHeight: 1.6, maxWidth: 680, margin: "0 0 30px" }}>
          Previews only — nothing here changes your live portal. Start with the <strong>refined
          Constellation × Inner Circle concepts</strong> at the top (your locked anchors kept: the hero, the
          devotional, the wall; streak relocated to a dove / North Star; star-path woven in; time-of-day sky).
        </p>

        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: "#1F3A5F", margin: "0 0 4px" }}>
          ✦ Refined — Constellation × Inner Circle
        </h2>
        <p style={{ color: "#8a8270", fontSize: 13.5, margin: "0 0 16px" }}>
          The five that combine everything you loved. These are the front-runners.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18, marginBottom: 38 }}>
          {IC2.map((o) => <Card key={o.slug} o={o} />)}
        </div>

        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: "#1F3A5F", margin: "0 0 4px" }}>
          Earlier dark “Inner Circle” variations
        </h2>
        <p style={{ color: "#8a8270", fontSize: 13.5, margin: "0 0 16px" }}>
          Dark background, pops of color, animation & visuals. Compact encouragement wall.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18, marginBottom: 36 }}>
          {IC.map((o) => <Card key={o.slug} o={o} />)}
        </div>

        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: "#1F3A5F", margin: "0 0 16px" }}>
          The original five directions
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
          {OPTIONS.map((o) => <Card key={o.slug} o={o} />)}
        </div>

        <p style={{ color: "#8a8270", fontSize: 13, marginTop: 28 }}>
          When you’ve picked one (or “this one’s hero + that one’s leaderboard”), tell me and I’ll rebuild your
          real portal in that style.
        </p>
      </div>
    </div>
  );
}

type Opt = { slug: string; name: string; tag: string; blurb: string; swatch: string[] };

function Card({ o }: { o: Opt }) {
  return (
    <Link
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
  );
}
