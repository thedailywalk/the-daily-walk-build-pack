import "server-only";

/**
 * Turn a devotional's "Try this today" step into a concrete, everyday example —
 * one plain sentence ("For example, …"). Uses Claude when ANTHROPIC_API_KEY is
 * set; returns "" otherwise so the step still stands on its own.
 */
export async function draftStepExample(step: string, reading: string): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || step.trim().length < 8) return "";
  const user = `A Christian devotional gives this "try this today" step:
"${step}"
(Today's reading: ${reading})

Write ONE short, concrete example of what doing this could look like in real, everyday life — specific and relatable, warm, plain language, no church jargon, no guilt. It must begin with "For example," and be a single sentence. Return ONLY that sentence.`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: process.env.DEVOTIONAL_MODEL ?? process.env.GUIDE_MODEL ?? "claude-haiku-4-5-20251001",
        max_tokens: 160,
        messages: [{ role: "user", content: user }],
      }),
      cache: "no-store",
    });
    if (!res.ok) return "";
    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    let out = (data.content ?? []).filter((c) => c.type === "text").map((c) => c.text).join("").trim();
    out = out.replace(/^["“]|["”]$/g, "").trim();
    if (out && !/^for example/i.test(out)) out = `For example, ${out.charAt(0).toLowerCase()}${out.slice(1)}`;
    return out;
  } catch {
    return "";
  }
}
