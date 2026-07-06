import { ImageResponse } from "next/og";

/**
 * On-brand, shareable verse/quote card (1080×1080). Built from query params so
 * it's self-contained (no DB needed) and can be embedded in the newsletters:
 *   /api/verse-card?t=<verse or quote>&r=<reference>
 * Readers save it and share it — every share is a small billboard for the walk.
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = (searchParams.get("t") || "Walk with God in real life.").slice(0, 260);
  const ref = (searchParams.get("r") || "").slice(0, 70);

  // Scale the quote down as it gets longer so it always fits the card.
  const len = text.length;
  const fs = len > 200 ? 40 : len > 150 ? 48 : len > 100 ? 56 : len > 60 ? 66 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg,#264a75 0%,#1F3A5F 55%,#10243f 100%)",
          padding: 96,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 44,
            right: 44,
            bottom: 44,
            border: "3px solid #C9A24B",
            borderRadius: 30,
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            letterSpacing: 9,
            color: "#E3C074",
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 34,
          }}
        >
          THE DAILY WALK
        </div>
        <div style={{ display: "flex", color: "#C9A24B", fontSize: 96, lineHeight: 1 }}>
          &ldquo;
        </div>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            color: "#F5EFE0",
            fontSize: fs,
            lineHeight: 1.34,
            fontWeight: 600,
            maxWidth: 840,
          }}
        >
          {text}
        </div>
        {ref ? (
          <div
            style={{
              display: "flex",
              color: "#E3C074",
              fontSize: 34,
              fontWeight: 700,
              marginTop: 44,
            }}
          >
            — {ref}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 72,
            color: "#9fb0c6",
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          thedailywalknewsletter.com
        </div>
      </div>
    ),
    { width: 1080, height: 1080 }
  );
}
