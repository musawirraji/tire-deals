"use client";

import { useState } from "react";
import type { TireProduct } from "@/lib/tire-provider";
import { sizeToString } from "@/lib/tire-provider";
import { typeLabel, formatCount } from "@/lib/format";
import { Stars } from "@/components/ui/Stars";

type Tab = "specs" | "reviews" | "description" | "brand";

const TABS: { id: Tab; label: string }[] = [
  { id: "specs", label: "Specs" },
  { id: "reviews", label: "Reviews" },
  { id: "description", label: "Description" },
  { id: "brand", label: "Brand" },
];

// deterministic mock warranty/mileage derived from the tire type
const WARRANTY: Record<string, { mileage: string; warranty: string }> = {
  "all-season": { mileage: "65,000 mi", warranty: "6-year treadwear" },
  performance: { mileage: "40,000 mi", warranty: "3-year treadwear" },
  summer: { mileage: "30,000 mi", warranty: "2-year treadwear" },
  winter: { mileage: "40,000 mi", warranty: "Limited seasonal" },
  "all-terrain": { mileage: "60,000 mi", warranty: "6-year treadwear" },
};

export function ProductTabs({ tire }: { tire: TireProduct }) {
  const [tab, setTab] = useState<Tab>("specs");
  const w = WARRANTY[tire.type] ?? WARRANTY["all-season"];

  return (
    <div className="rounded-card border border-line bg-bg-2">
      <div className="flex overflow-x-auto border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative shrink-0 px-5 py-4 text-sm font-semibold transition-colors ${
              tab === t.id ? "text-accent-700" : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent" />
            )}
          </button>
        ))}
      </div>

      <div className="p-5 md:p-6">
        {tab === "specs" && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            <Spec label="Size" value={sizeToString(tire.size)} />
            <Spec label="Type" value={typeLabel(tire.type)} />
            <Spec label="Speed rating" value={tire.speedRating} />
            <Spec label="Load index" value={String(tire.loadIndex)} />
            <Spec label="Section width" value={`${tire.size.width} mm`} />
            <Spec label="Aspect ratio" value={`${tire.size.aspect}%`} />
            <Spec label="Rim diameter" value={`${tire.size.rim}"`} />
            <Spec label="Est. mileage" value={w.mileage} />
            <Spec label="Warranty" value={w.warranty} />
          </dl>
        )}

        {tab === "reviews" && <Reviews tire={tire} />}

        {tab === "description" && (
          <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
            <p>
              The{" "}
              <span className="text-ink">
                {tire.brand} {tire.model}
              </span>{" "}
              is a {typeLabel(tire.type).toLowerCase()} tire engineered for
              confident control, a quiet ride, and long tread life. Its compound
              and tread pattern are tuned to balance grip in the wet and dry with
              everyday comfort.
            </p>
            <p>
              Backed by a {w.warranty.toLowerCase()} warranty and an estimated{" "}
              {w.mileage} of tread life, it&rsquo;s a dependable choice for
              drivers who want performance without overpaying. Every order ships
              free in 2–3 days with 3,000+ installers nationwide.
            </p>
          </div>
        )}

        {tab === "brand" && (
          <div className="max-w-2xl space-y-4 text-sm leading-relaxed text-muted">
            <p>
              <span className="text-ink">{tire.brand}</span> is one of the most
              trusted names in tires, recognized for consistent quality across
              performance, touring, and all-terrain lines. TireDeals carries the
              full {tire.brand} range at guaranteed-lowest prices.
            </p>
            <p>
              Every {tire.brand} tire sold through TireDeals is brand-new, fully
              backed by the manufacturer warranty, and eligible for our
              price-match promise.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 font-semibold text-ink">{value}</dd>
    </div>
  );
}

function Reviews({ tire }: { tire: TireProduct }) {
  // deterministic distribution weighted toward the tire's rating
  const base = Math.round(tire.rating);
  const dist = [5, 4, 3, 2, 1].map((star) => {
    const closeness = 5 - Math.abs(star - tire.rating);
    return { star, pct: Math.max(2, Math.round((closeness / 5) * 88)) };
  });
  const total = dist.reduce((a, d) => a + d.pct, 0);
  const wouldBuy = Math.min(98, Math.round((tire.rating / 5) * 100) + 6);

  const sampleReviews = [
    { name: "Marcus T.", stars: Math.min(5, base + 1), text: "Great grip and much quieter than my old set. Install was painless." },
    { name: "Priya N.", stars: base, text: "Solid value for the price. Handles wet roads well so far." },
    { name: "Dan R.", stars: Math.max(3, base - 1), text: "Good all-rounder. Wish the ride were a touch softer, but no complaints." },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr]">
      <div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-extrabold text-ink">
            {tire.rating.toFixed(1)}
          </span>
          <span className="pb-1 text-sm text-muted">/ 5</span>
        </div>
        <Stars rating={tire.rating} size={16} className="mt-1" />
        <p className="mt-1 text-xs text-muted">
          {formatCount(tire.reviewCount)} reviews · {wouldBuy}% would buy again
        </p>
        <div className="mt-4 space-y-1.5">
          {dist.map((d) => (
            <div key={d.star} className="flex items-center gap-2 text-xs">
              <span className="w-6 text-muted">{d.star}★</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ width: `${(d.pct / total) * 100}%` }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <ul className="space-y-4">
        {sampleReviews.map((r) => (
          <li key={r.name} className="border-b border-line pb-4 last:border-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">{r.name}</span>
              <Stars rating={r.stars} size={13} />
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
