import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const STEPS = [
  {
    n: "01",
    title: "Find the perfect tire",
    body: "Browse our huge catalog or go with personalized recommendations for you.",
  },
  {
    n: "02",
    title: "Book your install",
    body: "At checkout, schedule your preferred installation appointment time.",
  },
  {
    n: "03",
    title: "Pay online",
    body: "All-inclusive pricing. No hidden costs. You'll be in and out of the shop in no time.",
  },
  {
    n: "04",
    title: "Drive confidently",
    body: "24/7 roadside assistance included with installation.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-6">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-4xl font-extrabold leading-[0.95] tracking-tight md:text-5xl">
            Four steps. <br />
            <span className="text-muted">Done.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm text-muted">
            Find the perfect tire and get it delivered to, and installed at, your
            shop.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/results"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-bold text-cream transition-colors hover:bg-ink/90"
            >
              Start to search <ArrowUpRight size={16} />
            </Link>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-ink">
              Chat with a tire expert <MessageSquare size={15} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="relative flex items-center gap-5 overflow-hidden rounded-card border border-line bg-bg-2 p-6 shadow-soft"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none text-[6rem] font-extrabold leading-none text-ink/[0.05]"
              >
                {s.n}
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-extrabold text-accent-700">
                {s.n}
              </span>
              <div className="relative">
                <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-1 max-w-md text-sm text-muted">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
