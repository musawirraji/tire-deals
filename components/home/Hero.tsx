import { MapPin, ThumbsUp } from "lucide-react";
import { RadialSearch } from "./RadialSearch";
import { IMG } from "@/lib/images";

export function Hero() {
  return (
    <section className="px-3 pt-3 md:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-hero bg-dark px-5 pb-14 pt-10 text-cream md:px-10 md:pb-16 md:pt-14">
        {/* moody photo + glow backdrop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.heroCar}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/40 to-dark" />
        <div className="td-glow pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/3" />

        <div className="relative text-center">
          <h1 className="mx-auto max-w-4xl text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight">
            The Lowest Tire Prices Online.{" "}
            <span className="text-accent">Period.</span>
          </h1>
          <p className="mx-auto mt-5 text-lg font-semibold">
            It&rsquo;s Not Just Tread, It&rsquo;s Trust.
          </p>
          <p className="mx-auto mt-1 text-sm text-dark-muted">
            Good tires don&rsquo;t have to be expensive.
          </p>

          <div className="relative mt-8">
            <StatCard
              className="left-0 top-4 hidden lg:flex"
              top={
                <span className="flex items-center gap-1.5">
                  <ThumbsUp size={15} className="text-accent" /> 4.6
                </span>
              }
              label="Rated by 4,541 verified customers"
            />
            <StatCard
              className="right-0 top-10 hidden lg:flex"
              top={
                <span className="flex items-center gap-1.5 text-cream">
                  <MapPin size={15} className="text-accent" /> Near 75073
                </span>
              }
              big="142"
              label="Tires & installers near you"
            />

            <RadialSearch />
          </div>
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
      className={`absolute z-20 w-48 flex-col items-start gap-1 rounded-2xl border border-dark-line bg-dark-2/80 p-4 text-left backdrop-blur ${className}`}
    >
      <div className="text-sm font-bold">{top}</div>
      {big && <div className="text-3xl font-extrabold text-accent">{big}</div>}
      <p className="text-xs leading-snug text-dark-muted">{label}</p>
    </div>
  );
}
