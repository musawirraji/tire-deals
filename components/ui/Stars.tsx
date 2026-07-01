import { Star } from "lucide-react";

export function Stars({
  rating,
  size = 14,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={`relative inline-flex ${className}`}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      <span className="flex text-muted/40">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} strokeWidth={1.5} />
        ))}
      </span>
      <span
        className="absolute inset-0 flex overflow-hidden text-accent-700"
        style={{ width: `${pct}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} strokeWidth={1.5} fill="currentColor" />
        ))}
      </span>
    </span>
  );
}
