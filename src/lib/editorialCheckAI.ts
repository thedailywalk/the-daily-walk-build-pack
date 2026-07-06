import "server-only";
import type { Finding } from "@/lib/editorialCheck";

/**
 * The optional "deep check": when ANTHROPIC_API_KEY is set, ask the model to
 * verify each quoted verse actually matches its reference (NIV) and to flag any
 * tone or doctrinal problems. Best-effort — never throws; returns a friendly
 * note if the AI isn't available.
 */
export async function deepCheck(input: {
  verses: { where: string; ref: string; text: string }[];
  body: string;
}): Promise<Finding[]> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return [
      {
        level: "info",
        label: "Deep check needs an AI key",
        detail:
          "Add ANTHROPIC_API_KEY to enable verse-accuracy + tone verification.",
      },
    ];
  }

  const versesText = input.verses.length
    ? input.verses
        .map(
          (v, i) =>
            `${i + 1}. [${v.where}] Reference: ${v.ref || "(none)"}\n   Quoted: "${v.text || "(none)"}"`
        )
        .join("\n")
    : "(none)";

  const user = `You are an editorial checker for "The Daily Walk", a warm Christian devotional newsletter that quotes the NIV. Review the draft and report ONLY problems.

VERSES TO VERIFY — does the quoted wording plausibly match that reference in the NIV? Allow minor punctuation, ellipsis, and partial quotes; flag a clear mismatch, a wrong reference, or an invented verse:
${versesText}

DRAFT BODY — flag tone problems (guilt/shame language, church jargon that excludes newcomers, prosperity-gospel claims) or anything factually wrong about the Bible passage. Do NOT nitpick ordinary style:
"""
${input.body.slice(0, 6000)}
"""

Return ONLY a JSON object, no markdown:
{"findings":[{"level":"warn"|"info","label":"short problem","detail":"what to check or fix"}]}
Use "warn" for likely errors (a misquoted verse, a wrong reference, a real doctrinal/factual problem). Use "info" for softer tone suggestions. If everything looks good, return {"findings":[]}.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model:
          process.env.DEVOTIONAL_MODEL ??
          process.env.GUIDE_MODEL ??
          "claude-haiku-4-5-20251001",
        max_tokens: 900,
        messages: [{ role: "user", content: user }],
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      return [
        {
          level: "info",
          label: "Deep check unavailable right now",
          detail: `The AI service returned ${res.status}. Try again shortly.`,
        },
      ];
    }
    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const raw = (data.content ?? [])
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("")
      .trim();
    const json = raw.match(/\{[\s\S]*\}/);
    if (!json) return [];
    const parsed = JSON.parse(json[0]) as { findings?: unknown };
    const list = Array.isArray(parsed.findings) ? parsed.findings : [];
    return list
      .filter((f): f is { level?: string; label?: string; detail?: string } =>
        Boolean(f && typeof f === "object" && (f as { label?: string }).label)
      )
      .map((f) => ({
        level: f.level === "warn" ? ("warn" as const) : ("info" as const),
        label: String(f.label).slice(0, 160),
        detail: f.detail ? String(f.detail).slice(0, 260) : undefined,
      }));
  } catch {
    return [{ level: "info", label: "Deep check unavailable right now" }];
  }
}
