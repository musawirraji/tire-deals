import { TireEmblem } from "@/components/ui/TireEmblem";

export function Journey() {
  return (
    <section className="td-lightwash relative overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-20 text-center md:px-6 md:py-28">
        <TireEmblem className="h-28 w-28 md:h-36 md:w-36" />
        <h2 className="max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[0.98] tracking-tight text-ink">
          Your Journey Starts{" "}
          <span className="text-muted">with the Right Tires.</span>
        </h2>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">
          Premium Performance. Honest Prices.
        </p>
      </div>
    </section>
  );
}
