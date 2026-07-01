import Link from "next/link";
import { Suspense } from "react";
import { SearchX } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProductCard } from "@/components/results/ProductCard";
import { FilterSidebar } from "@/components/results/FilterSidebar";
import { MobileFilters } from "@/components/results/MobileFilters";
import { SortControl } from "@/components/results/SortControl";
import { getResults } from "@/lib/results";
import { productHref, type SearchParams } from "@/lib/routes";

export const metadata = {
  title: "Shop tires — TireDeals",
};

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { ctx, results, facets, options } = await getResults(params);

  const activeCount =
    facets.types.length +
    facets.brands.length +
    facets.speeds.length +
    facets.loads.length +
    facets.price.length +
    (facets.rating ? 1 : 0);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-6">
        {/* context header */}
        <nav className="mb-4 text-xs text-muted">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>{" "}
          / <span className="text-ink">Shop Tires</span>
        </nav>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {ctx.heading}
          </h1>
          <p className="text-sm text-muted">{ctx.subheading}</p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MobileFilters
              options={options}
              facets={facets}
              activeCount={activeCount}
            />
            <span className="text-sm text-muted">
              <span className="font-bold text-ink">{results.length}</span>{" "}
              {results.length === 1 ? "tire" : "tires"}
            </span>
          </div>
          <Suspense>
            <SortControl value={facets.sort} />
          </Suspense>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Suspense>
                <FilterSidebar options={options} facets={facets} />
              </Suspense>
            </div>
          </aside>

          {/* results */}
          <div>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {results.map((t) => (
                  <ProductCard
                    key={t.id}
                    tire={t}
                    href={productHref(t.id, params)}
                    fits={ctx.fits}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border border-dashed border-line bg-surface/40 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-accent">
        <SearchX size={26} />
      </span>
      <h2 className="text-lg font-bold">Not finding what you&rsquo;re looking for?</h2>
      <p className="max-w-sm text-sm text-muted">
        No tires match your current filters. Try clearing a filter or start a new
        search by vehicle or size.
      </p>
      <Link
        href="/"
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-bg"
      >
        Start a new search
      </Link>
    </div>
  );
}
