import { ArrowUpRight, Tag } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const BRANDS = [
  "MICHELIN",
  "BRIDGESTONE",
  "GOODYEAR",
  "DUNLOP",
  "FIRESTONE",
  "KUMHO",
  "CONTINENTAL",
  "PIRELLI",
  "HANKOOK",
];

export function TreadTrial() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-6">
      <div className="text-center">
        <div className="flex justify-center">
          <Eyebrow>Tread trial</Eyebrow>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Best Price Guarantee <span className="text-muted">on all brands</span>
        </h2>
      </div>

      {/* ink smear brand strip */}
      <div className="relative mt-10 overflow-hidden rounded-hero bg-dark py-10">
        <div className="td-glow pointer-events-none absolute left-1/2 top-1/2 h-64 w-[80%] -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-1/2 h-24 -translate-y-1/2 rounded-full bg-black/60 blur-md"
          style={{ clipPath: "polygon(2% 40%, 12% 15%, 30% 55%, 48% 20%, 66% 60%, 84% 22%, 98% 55%, 96% 80%, 70% 92%, 40% 85%, 16% 95%, 4% 70%)" }}
        />
        <div className="relative flex overflow-hidden">
          <div className="td-marquee flex shrink-0 items-center gap-12 px-6">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-xl font-extrabold tracking-tight text-accent/90"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-4 rounded-card border border-line bg-bg-2 p-4 pr-6 shadow-soft">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent-700">
            <Tag size={20} />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">Found a lower price?</p>
            <p className="text-xs text-muted">We&rsquo;ll match it.</p>
          </div>
          <button className="ml-2 inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
            Learn more <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
