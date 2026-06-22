import { NextResponse } from "next/server";
import { fetchPassage, type Translation } from "@/lib/bibleText";

// GET /api/passage?ref=John%201&t=web  → public-domain WEB/KJV text for a reading.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ref = (searchParams.get("ref") ?? "").trim();
  const t: Translation = searchParams.get("t") === "kjv" ? "kjv" : "web";
  if (!ref) return NextResponse.json({ error: "missing ref" }, { status: 400 });

  const passage = await fetchPassage(ref, t);
  if (!passage)
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  return NextResponse.json(passage);
}
