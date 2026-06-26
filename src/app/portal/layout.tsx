import { redirect } from "next/navigation";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import MemberSidebar from "@/components/MemberSidebar";

const TIER_LABEL: Record<string, string> = {
  premium: "Premium",
  patron: "Patron",
};

/** Friendly first name from an email local part. */
function nameFrom(email: string): string {
  const local = email.split("@")[0].replace(/[._-]+/g, " ").trim();
  const first = local.split(" ")[0] || "Friend";
  return first.charAt(0).toUpperCase() + first.slice(1);
}

/**
 * Member portal shell — a warm, organized "home base" for Premium/Patron
 * members, separate from both the public site and the admin workspace. Gates the
 * whole /portal tree: signed-out → login, free → pricing.
 */
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured) redirect("/");
  const user = await getUser();
  if (!user?.email) redirect("/login");
  const ent = await getEntitlement(user.email);
  if (ent.tier === "free") redirect("/pricing");

  return (
    <div className="member-shell" data-theme="night">
      <MemberSidebar tier={TIER_LABEL[ent.tier] ?? "Member"} name={nameFrom(user.email)} />
      <div className="member-main">{children}</div>
    </div>
  );
}
