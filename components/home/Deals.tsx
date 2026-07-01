import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IMG } from "@/lib/images";

const DEALS = [
  { img: IMG.deals.offroad, brand: "Hankook", model: "Dynapro AT2", from: "$168", back: "$80 back" },
  { img: IMG.deals.summer, brand: "Michelin", model: "Pilot Sport 4S", from: "$248", back: "$70 back" },
  { img: IMG.deals.muscle, brand: "Goodyear", model: "Eagle F1", from: "$204", back: "$100 back" },
  { img: IMG.deals.super, brand: "Pirelli", model: "P Zero", from: "$268", back: "$90 back" },
];

export function Deals() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-6">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow>Current deals</Eyebrow>
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Rebates &amp; savings
          </h2>
        </div>
        <p className="text-sm text-muted">Updated weekly. Limited quantities.</p>
      </div>

      <div className="td-noscroll -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        {DEALS.map((d) => (
          <article
            key={d.brand}
            className="group relative flex aspect-[3/4] min-w-[248px] max-w-[280px] flex-1 snap-start flex-col justify-end overflow-hidden rounded-card border border-line"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.img}
              alt={`${d.brand} ${d.model}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/10" />

            <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-dark/70 px-2.5 py-1 text-[11px] font-medium text-cream backdrop-blur">
              <Clock size={12} /> Ends in 5 days
            </span>

            <div className="relative p-5 text-cream">
              <span className="text-sm font-bold uppercase tracking-wide text-accent">
                {d.brand}
              </span>
              <p className="mt-0.5 text-lg font-extrabold">{d.model}</p>
              <p className="text-xs text-cream/80">from {d.from}/tire · set of 4</p>
              <span className="mt-3 inline-flex rounded-full bg-accent px-3 py-1.5 text-sm font-bold text-dark">
                {d.back}
              </span>
            </div>
          </article>
        ))}

        <Link
          href="/results"
          className="flex min-w-[130px] snap-start flex-col items-center justify-center gap-2 rounded-card border border-dashed border-line-strong text-sm font-semibold text-muted transition-colors hover:border-ink hover:text-ink"
        >
          View all
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
