import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { tireProvider } from "@/lib/tire-provider";
import { ProductCard } from "@/components/results/ProductCard";

export async function PopularTires() {
  const all = await tireProvider.getAll();
  // pick the highest-rated tire per brand, then take the top 8 by reviews
  const byBrand = new Map<string, (typeof all)[number]>();
  for (const t of all) {
    const cur = byBrand.get(t.brand);
    if (!cur || t.rating > cur.rating) byBrand.set(t.brand, t);
  }
  const popular = [...byBrand.values()]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-6">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            • Popular right now
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Top-rated tires
          </h2>
        </div>
        <Link
          href="/results"
          className="hidden items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent sm:flex"
        >
          View all <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {popular.map((t) => (
          <ProductCard key={t.id} tire={t} href={`/product/${t.id}`} />
        ))}
      </div>
    </section>
  );
}
