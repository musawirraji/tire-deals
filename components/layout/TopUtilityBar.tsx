import { Star } from "lucide-react";

export function TopUtilityBar() {
  return (
    <div className="bg-accent text-[13px] font-medium text-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-5 py-2 md:px-6">
        <span className="hidden sm:inline">
          Rated <span className="font-bold">&ldquo;Excellent&rdquo;</span> by
          Shopper Approved
        </span>
        <span className="flex items-center gap-1.5">
          <span className="font-bold">4.7</span>
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="hidden xs:inline">(60,156 reviews)</span>
        </span>
        <span className="hidden sm:inline">
          <span className="font-bold">95%</span> Would Buy Again
        </span>
      </div>
    </div>
  );
}
