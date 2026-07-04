import Link from "next/link";

/**
 * Reusable "Give" call-to-action. Drives to the on-site /give page (where the
 * Givebutter donation form lives), so giving always feels part of The Daily
 * Walk. Drop it anywhere: <GiveButton /> or <GiveButton label="Give to the mission" />.
 */
export default function GiveButton({
  href = "/give",
  label = "Give",
  className = "btn btn-gold",
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={className}>
      <span aria-hidden="true">♥</span> {label}
    </Link>
  );
}
