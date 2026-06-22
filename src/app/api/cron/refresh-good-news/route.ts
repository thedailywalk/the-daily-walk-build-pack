import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

/**
 * Refreshes the automatic Good News set each morning (Vercel Cron, 5am PT).
 * If CRON_SECRET is set, requests must send `Authorization: Bearer <secret>`
 * (Vercel does this automatically). If it's unset, the endpoint is open but
 * only busts a public cache, which is harmless.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  revalidateTag("good-news", "max");
  revalidatePath("/");

  return NextResponse.json({ ok: true, refreshedAt: new Date().toISOString() });
}
