import { ArrowUpRight, Home, MapPin, MessageSquare, Truck } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IMG } from "@/lib/images";

const PILLS = [
  "SimpleScore™",
  "Personal driving style",
  "Vehicle information",
  "Your location",
];

const DELIVERY = [
  { icon: Truck, label: "Have a mobile installer come to your location" },
  { icon: MapPin, label: "Directly to a local installer" },
  { icon: Home, label: "Have it shipped right to your door" },
];

export function GuidedShopping() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 md:px-6">
      {/* guided card */}
      <div className="relative overflow-hidden rounded-hero bg-dark p-7 text-cream md:p-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.guidedWheel}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-3/5 object-cover opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]"
        />
        <div className="td-glow pointer-events-none absolute -right-10 top-1/2 h-96 w-96 -translate-y-1/2" />

        <div className="relative max-w-xl">
          <Eyebrow tone="light">Guided shopping</Eyebrow>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Get personalized recommendations
          </h2>
          <p className="mt-3 max-w-md text-sm text-dark-muted">
            We&rsquo;re a team of passionate tire experts who&rsquo;ve built an
            online tool that guides you to a personalized set of three tire
            recommendations.
          </p>

          <p className="mt-6 text-xs uppercase tracking-wide text-dark-muted">
            We recommend tires based on:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PILLS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-dark-line bg-dark-2/70 px-3.5 py-2 text-sm font-medium text-cream backdrop-blur"
              >
                {p}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-bold text-dark transition-colors hover:bg-accent-bright">
              Enter your vehicle info <ArrowUpRight size={16} />
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-dark-line-strong px-5 py-3 text-sm font-bold text-cream transition-colors hover:border-cream">
              Chat with a tire expert <MessageSquare size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* install + delivery */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative flex flex-col justify-center overflow-hidden rounded-hero border border-line bg-bg-2 p-8 md:p-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.installHands}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 object-cover [mask-image:linear-gradient(to_left,black,transparent)] sm:block"
          />
          <div className="relative max-w-sm">
            <Eyebrow>Installation</Eyebrow>
            <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Buy with us and install at your favorite shop
            </h3>
            <p className="mt-3 text-sm text-muted">
              During checkout, choose the most convenient way to receive your
              tires. We make installation effortless — wherever you are.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-bold text-cream">
                Shop now <ArrowUpRight size={16} />
              </button>
              <button className="rounded-full border border-line-strong px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-ink">
                All about installers
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {DELIVERY.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.label}
                className="flex items-center gap-4 rounded-card border border-line bg-bg-2 p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-700">
                  <Icon size={22} />
                </span>
                <p className="text-sm font-semibold text-ink">{d.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
