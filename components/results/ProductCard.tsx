import Link from "next/link";
import { BadgeCheck, ShoppingCart } from "lucide-react";
import type { TireProduct } from "@/lib/tire-provider";
import { sizeToString } from "@/lib/tire-provider";
import { formatCount, formatPrice, typeLabel } from "@/lib/format";
import { Stars } from "@/components/ui/Stars";

export function ProductCard({
  tire,
  href,
  fits = false,
}: {
  tire: TireProduct;
  href: string;
  fits?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-bg-2 transition-all hover:-translate-y-1 hover:border-accent-700/40 hover:shadow-soft"
    >
      <div className="relative flex items-center justify-center bg-dark px-6 py-7">
        <div className="td-glow pointer-events-none absolute inset-x-8 inset-y-2 opacity-60" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tire.imageUrl}
          alt={`${tire.brand} ${tire.model}`}
          className="relative h-32 w-32 transition-transform duration-500 group-hover:rotate-90"
          draggable={false}
        />
        {fits && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-dark">
            <BadgeCheck size={13} />
            Fits your vehicle
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wide text-accent-700">
            {tire.brand}
          </span>
          <span className="rounded-md bg-black/5 px-2 py-0.5 text-muted">
            {typeLabel(tire.type)}
          </span>
        </div>

        <h3 className="text-sm font-bold leading-snug text-ink">{tire.model}</h3>

        <p className="font-mono text-xs text-muted">
          {sizeToString(tire.size)} · {tire.speedRating}
          {tire.loadIndex}
        </p>

        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Stars rating={tire.rating} size={13} />
          <span className="font-semibold text-ink">{tire.rating.toFixed(1)}</span>
          <span>({formatCount(tire.reviewCount)})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="text-xl font-extrabold text-ink">
              {formatPrice(tire.price)}
            </span>
            <span className="block text-[11px] text-muted">per tire</span>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-dark transition-transform group-hover:scale-110">
            <ShoppingCart size={17} />
          </span>
        </div>
      </div>
    </Link>
  );
}
