import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";

/**
 * Magic-link landing route. Supports both Supabase flows:
 *  - PKCE:        ?code=...                 → exchangeCodeForSession
 *  - OTP/magic:   ?token_hash=...&type=...  → verifyOtp
 * On success, redirects to ?next (default /account).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  if (!supabaseConfigured) return NextResponse.redirect(`${origin}/`);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  // After sign-in, land on the member home base (/portal). The portal layout
  // gates appropriately (free → /pricing, signed-out → /login). A ?next param
  // (e.g. set when redirected from a gated page) still takes precedence.
  const next = searchParams.get("next") ?? "/portal";

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
