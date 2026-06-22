/**
 * Admins can moderate community content (e.g. approve prayer requests).
 * Keep this in sync with the admin RLS policy in Supabase (same email).
 */
const ADMIN_EMAILS = new Set(
  ["thedailywalknewsletter@gmail.com"]
    .concat((process.env.ADMIN_EMAILS ?? "").split(","))
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
);

export function isAdminEmail(email?: string | null): boolean {
  return !!email && ADMIN_EMAILS.has(email.trim().toLowerCase());
}
