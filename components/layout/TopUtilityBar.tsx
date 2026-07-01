import { Star } from "lucide-react";

export function TopUtilityBar() {
  return (
    <div className="hidden border-b border-line bg-black/40 text-xs text-muted md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <span>
          Rated <span className="text-ink">&ldquo;Excellent&rdquo;</span> by Shopper Approved
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="text-ink">4.7</span>
          <span>(80,558 reviews)</span>
        </span>
        <span>
          <span className="text-ink">95%</span> Would Buy Again
        </span>
      </div>
    </div>
  );
}
