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
    <section className="border-y border-line bg-surface/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden md:grid-cols-5">
        {BADGES.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.label}
              className="flex flex-col items-start gap-2 bg-bg/40 px-5 py-6"
            >
              <Icon size={22} className="text-accent" />
              <div className="text-lg font-extrabold leading-tight">{b.big}</div>
              <p className="text-xs leading-snug text-muted">{b.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
