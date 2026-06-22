import "server-only";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

/** Gate a server action / page to admins only. Redirects home otherwise. */
export async function requireAdmin() {
  const user = await getUser();
  if (!isAdminEmail(user?.email)) redirect("/");
  return user!;
}

/** Non-redirecting check for server components that branch on admin status. */
export async function currentUserIsAdmin(): Promise<boolean> {
  const user = await getUser();
  return isAdminEmail(user?.email);
}
