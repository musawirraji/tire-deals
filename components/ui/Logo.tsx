import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label="TireDeals home"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden
        className="shrink-0 transition-transform duration-300 group-hover:rotate-90"
      >
        <circle cx="13" cy="13" r="12" fill="#0b0c0b" stroke="#b6f23b" strokeWidth="2" />
        <circle cx="13" cy="13" r="5.5" fill="none" stroke="#b6f23b" strokeWidth="2" />
        <circle cx="13" cy="13" r="1.6" fill="#b6f23b" />
      </svg>
      <span className="text-lg font-extrabold tracking-tight">
        Tire<span className="text-accent">Deals</span>
      </span>
    </Link>
  );
}
