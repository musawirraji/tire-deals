import Link from "next/link";

export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const text = tone === "light" ? "text-cream" : "text-ink";
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label="TireDeals home"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <circle cx="14" cy="14" r="13" className="fill-ink" />
        <circle
          cx="14"
          cy="14"
          r="13"
          fill="none"
          stroke="#8ed81f"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="14" r="6" fill="none" stroke="#8ed81f" strokeWidth="2" />
        <g stroke="#8ed81f" strokeWidth="1.4" strokeLinecap="round">
          <path d="M14 1.5v4M14 22.5v4M1.5 14h4M22.5 14h4" />
        </g>
        <circle cx="14" cy="14" r="2" fill="#8ed81f" />
      </svg>
      <span className={`text-lg font-extrabold tracking-tight ${text}`}>
        Tire<span className="text-accent-700">Deals</span>
      </span>
    </Link>
  );
}
