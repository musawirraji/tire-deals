import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductCard } from "@/components/results/ProductCard";
import { Stars } from "@/components/ui/Stars";
import { tireProvider, sizeToString, sameSize } from "@/lib/tire-provider";
import { formatCount, formatPrice, typeLabel } from "@/lib/format";
import { verdictFor } from "@/lib/fitment";
import { productHref, type SearchParams } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tire = await tireProvider.getById(id);
  return {
    title: tire ? `${tire.brand} ${tire.model} — TireDeals` : "Tire — TireDeals",
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const ctx = await searchParams;
  const tire = await tireProvider.getById(id);
  if (!tire) notFound();

  const verdict = await verdictFor(tire, ctx);

  const all = await tireProvider.getAll();
  const related = all
    .filter((t) => t.id !== tire.id && sameSize(t.size, tire.size))
    .slice(0, 4);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-6">
        <nav className="mb-5 text-xs text-muted">
          <Link href="/" className="hover:text-accent-700">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/results" className="hover:text-accent-700">
            Shop Tires
          </Link>{" "}
          / <span className="text-ink">{tire.brand}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-card border border-line bg-dark">
              <div className="td-glow pointer-events-none absolute inset-12" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tire.imageUrl}
                alt={`${tire.brand} ${tire.model}`}
                className="relative h-2/3 w-2/3"
                draggable={false}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-xl border bg-dark ${
                    i === 0 ? "border-accent" : "border-line"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tire.imageUrl}
                    alt=""
                    className="h-1/2 w-1/2 opacity-80"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* info */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-wide text-accent-700">
                  {tire.brand}
                </span>
                <span className="rounded-md bg-black/5 px-2 py-0.5 text-xs text-muted">
                  {typeLabel(tire.type)}
                </span>
              </div>
              <h1 className="mt-1.5 text-3xl font-extrabold tracking-tight md:text-4xl">
                {tire.model}
              </h1>
              <p className="mt-2 font-mono text-sm text-muted">
                {sizeToString(tire.size)} · {tire.speedRating}
                {tire.loadIndex} speed/load rating
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <Stars rating={tire.rating} size={16} />
                <span className="font-semibold text-ink">
                  {tire.rating.toFixed(1)}
                </span>
                <span className="text-muted">
                  ({formatCount(tire.reviewCount)} reviews)
                </span>
              </div>
            </div>

            {/* fitment confirmation */}
            {verdict.status === "fit" && (
              <div className="flex items-center gap-3 rounded-card border border-accent-700/40 bg-accent/15 px-4 py-3.5">
                <BadgeCheck size={22} className="shrink-0 text-accent-700" />
                <p className="text-sm font-semibold text-ink">
                  Confirmed fit for your {verdict.label}
                </p>
              </div>
            )}
            {verdict.status === "mismatch" && (
              <div className="flex items-center gap-3 rounded-card border border-amber-500/40 bg-amber-500/10 px-4 py-3.5">
                <AlertTriangle size={22} className="shrink-0 text-amber-400" />
                <p className="text-sm font-semibold text-ink">
                  This size may not fit your {verdict.label}. Double-check your
                  vehicle&rsquo;s recommended size.
                </p>
              </div>
            )}

            <div className="rounded-card border border-line bg-bg-2 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-ink">
                    {formatPrice(tire.price)}
                  </span>
                  <span className="ml-1 text-sm text-muted">per tire</span>
                  <p className="mt-1 text-sm text-muted">
                    {formatPrice(tire.price * 4)} for a set of 4
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-dark transition-colors hover:bg-accent-bright">
                  <ShoppingCart size={17} />
                  Add to cart
                </button>
                <button className="flex-1 rounded-full border border-line-strong px-5 py-3.5 text-sm font-bold text-ink transition-colors hover:border-ink">
                  Add to a set of 4
                </button>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <CreditCard size={13} className="text-accent-700" />
                Pay later with Affirm / Klarna / Snap
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
              <Perk icon={Truck} label="Free 2–3 day shipping" />
              <Perk icon={ShieldCheck} label="Price-match guarantee" />
              <Perk icon={BadgeCheck} label="3,000+ installers" />
            </ul>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-10">
          <ProductTabs tire={tire} />
        </div>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 text-xl font-extrabold tracking-tight">
              Also fits size {sizeToString(tire.size)}
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((t) => (
                <ProductCard key={t.id} tire={t} href={productHref(t.id, ctx)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}

function Perk({
  icon: Icon,
  label,
}: {
  icon: typeof Truck;
  label: string;
}) {
  return (
    <li className="flex items-center gap-2 rounded-xl border border-line bg-bg-2 px-3 py-2.5 text-muted">
      <Icon size={16} className="shrink-0 text-accent-700" />
      {label}
    </li>
  );
}
