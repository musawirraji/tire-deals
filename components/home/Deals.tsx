import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const DEALS = [
  { brand: "Hankook", title: "Up to $80 back", sub: "On a set of 4 select tires", tone: "from-[#1f3a1a] to-[#0b0c0b]" },
  { brand: "Michelin", title: "$70 rebate", sub: "Performance & all-season sets", tone: "from-[#1a2a3a] to-[#0b0c0b]" },
  { brand: "Goodyear", title: "$100 back", sub: "Wrangler all-terrain line", tone: "from-[#3a2a1a] to-[#0b0c0b]" },
  { brand: "Bridgestone", title: "$90 rebate", sub: "Potenza & Blizzak sets", tone: "from-[#2a1a3a] to-[#0b0c0b]" },
];

export function Deals() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-4 md:px-6">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            • Current deals
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Rebates &amp; savings
          </h2>
        </div>
        <p className="text-sm text-muted">Updated weekly. Limited quantities.</p>
      </div>

      <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:px-0">
        {DEALS.map((d) => (
          <article
            key={d.brand}
            className={`relative flex min-w-[260px] snap-start flex-col justify-between overflow-hidden rounded-card border border-line bg-gradient-to-br ${d.tone} p-5`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wide text-accent">
                {d.brand}
              </span>
              <span className="flex items-center gap-1 rounded-full border border-line bg-bg/50 px-2.5 py-1 text-[11px] text-muted">
                <Clock size={12} /> Ends in 5 days
              </span>
            </div>
            <div className="mt-12">
              <p className="text-2xl font-extrabold">{d.title}</p>
              <p className="mt-1 text-sm text-muted">{d.sub}</p>
            </div>
            <button className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-bg">
              Shop deal <ArrowRight size={15} />
            </button>
          </article>
        ))}
        <Link
          href="/results"
          className="flex min-w-[140px] snap-start flex-col items-center justify-center gap-2 rounded-card border border-dashed border-line text-sm font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
        >
          View all
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
