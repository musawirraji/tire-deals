import { MapPin, Star } from "lucide-react";
import { RadialSearch } from "./RadialSearch";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 md:px-6 md:pt-16">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs text-muted">
          <span className="flex text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          4.8 from 50,000+ verified reviews
        </p>

        <h1 className="mx-auto max-w-4xl text-balance text-[clamp(2.4rem,8vw,5.25rem)] font-extrabold leading-[0.98] tracking-tight">
          The Lowest Tire Prices Online.{" "}
          <span className="relative whitespace-nowrap text-accent">
            Period.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg font-semibold text-ink">
          It&rsquo;s Not Just Tread, It&rsquo;s Trust.
        </p>
        <p className="mx-auto mt-1 max-w-xl text-sm text-muted">
          Good tires don&rsquo;t have to be expensive.
        </p>

        {/* dial + floating stat cards */}
        <div className="relative mt-10">
          <StatCard
            className="left-0 top-2 hidden lg:flex"
            top={
              <span className="flex items-center gap-1 text-accent">
                <Star size={14} fill="currentColor" strokeWidth={0} /> 4.6
              </span>
            }
            label="Rated by 4,541 verified customers"
          />
          <StatCard
            className="right-0 top-10 hidden lg:flex"
            top={
              <span className="flex items-center gap-1 text-ink">
                <MapPin size={14} className="text-accent" /> 75073
              </span>
            }
            label="Tires & installers near you"
            big="142"
          />

          <RadialSearch />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  className = "",
  top,
  label,
  big,
}: {
  className?: string;
  top: React.ReactNode;
  label: string;
  big?: string;
}) {
  return (
    <div
      className={`absolute z-20 w-44 flex-col items-start gap-1 rounded-2xl border border-line bg-surface/80 p-4 text-left backdrop-blur ${className}`}
    >
      <div className="text-sm font-bold">{top}</div>
      {big && <div className="text-3xl font-extrabold text-accent">{big}</div>}
      <p className="text-xs leading-snug text-muted">{label}</p>
    </div>
  );
}
