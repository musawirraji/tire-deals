import { BadgeCheck, CreditCard, Star, Truck, Wrench } from "lucide-react";

const BADGES = [
  { icon: Star, big: "4.8 / 5", label: "Rating from 50,000+ verified reviews" },
  { icon: Wrench, big: "3,000+", label: "Installers across the country" },
  { icon: BadgeCheck, big: "Best Price", label: "We match any lower price" },
  { icon: Truck, big: "2–3 Days", label: "Fast nationwide shipping" },
  { icon: CreditCard, big: "Buy Now", label: "Pay later with Affirm / Klarna / Snap" },
];

export function TrustBadges() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {BADGES.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.label} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent-700">
                <Icon size={20} />
              </span>
              <div className="text-lg font-extrabold leading-tight text-ink">
                {b.big}
              </div>
              <p className="max-w-[16ch] text-xs leading-snug text-muted">
                {b.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
