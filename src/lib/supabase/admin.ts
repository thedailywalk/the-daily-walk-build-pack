import "server-only";
import { createClient } from "@supabase/supabase-js";

/** True only when the service-role key is available (server-side admin writes). */
export const adminDbConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Service-role Supabase client — bypasses RLS. Use ONLY in server code that has
 * already verified the caller is an admin (see requireAdmin). Never expose the
 * service-role key to the browser.
 */
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
