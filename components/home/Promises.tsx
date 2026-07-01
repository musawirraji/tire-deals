import {
  ArrowUpRight,
  BadgeCheck,
  PiggyBank,
  RefreshCw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const PROMISES = [
  { icon: Truck, title: "Free shipping", body: "To any address, installer partner or FedEx." },
  { icon: ShieldCheck, title: "Best price guarantee", body: "See the same tire at a lower price? We'll match it." },
  { icon: PiggyBank, title: "Exclusive savings", body: "Get free access to discounts on select tires, personalized coupons, and more." },
  { icon: BadgeCheck, title: "Tire replacement coverage", body: "Save your wallet from road hazards like nails." },
  { icon: RefreshCw, title: "Easy returns", body: "Don't like it? Unmounted tires can be sent back." },
];

export function Promises() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-6">
      <div className="max-w-2xl">
        <Eyebrow>Our promises</Eyebrow>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          What makes shopping with us{" "}
          <span className="text-muted">simple, fast, and reliable</span>
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROMISES.map((p) => {
          const Icon = p.icon;
          return (
            <article
              key={p.title}
              className="group flex flex-col gap-3 rounded-card border border-line bg-bg-2 p-6 transition-colors hover:border-accent-700/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent-700">
                <Icon size={20} />
              </span>
              <h3 className="text-lg font-bold text-ink">{p.title}</h3>
              <p className="text-sm text-muted">{p.body}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
                Learn more{" "}
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
