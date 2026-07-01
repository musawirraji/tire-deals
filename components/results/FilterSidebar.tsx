"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import {
  FACET_PARAM,
  type Facets,
  type FacetOption,
  type ResultsData,
} from "@/lib/results";

const BASE_KEYS = [
  "by",
  "year",
  "make",
  "model",
  "trim",
  "width",
  "aspect",
  "rim",
  "brand",
  "type",
];

export function FilterSidebar({
  options,
  facets,
}: {
  options: ResultsData["options"];
  facets: Facets;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const push = (next: URLSearchParams) => {
    const qs = next.toString();
    router.replace(qs ? `/results?${qs}` : "/results", { scroll: false });
  };

  const toggleMulti = (param: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const cur = (next.get(param) ?? "").split(",").filter(Boolean);
    const set = new Set(cur);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    if (set.size) next.set(param, [...set].join(","));
    else next.delete(param);
    push(next);
  };

  const setRadio = (param: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (next.get(param) === value) next.delete(param);
    else next.set(param, value);
    push(next);
  };

  const clearAll = () => {
    const next = new URLSearchParams();
    for (const k of BASE_KEYS) {
      const v = searchParams.get(k);
      if (v) next.set(k, v);
    }
    const sort = searchParams.get("sort");
    if (sort) next.set("sort", sort);
    push(next);
  };

  const activeCount =
    facets.types.length +
    facets.brands.length +
    facets.speeds.length +
    facets.loads.length +
    facets.price.length +
    (facets.rating ? 1 : 0);

  return (
    <div className="flex flex-col gap-1">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
          Filters
        </h2>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-semibold text-accent-700 hover:underline"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <Group title="Price">
        {options.price.map((o) => (
          <CheckRow
            key={o.value}
            option={o}
            checked={facets.price.includes(o.value)}
            onToggle={() => toggleMulti(FACET_PARAM.price, o.value)}
          />
        ))}
      </Group>

      <Group title="Tire type">
        {options.types.map((o) => (
          <CheckRow
            key={o.value}
            option={o}
            checked={facets.types.includes(o.value)}
            onToggle={() => toggleMulti(FACET_PARAM.types, o.value)}
          />
        ))}
      </Group>

      <Group title="Brand">
        {options.brands.map((o) => (
          <CheckRow
            key={o.value}
            option={o}
            checked={facets.brands.includes(o.value)}
            onToggle={() => toggleMulti(FACET_PARAM.brands, o.value)}
          />
        ))}
      </Group>

      <Group title="Speed rating">
        <div className="flex flex-wrap gap-2 pt-1">
          {options.speeds.map((o) => (
            <Chip
              key={o.value}
              label={o.value}
              checked={facets.speeds.includes(o.value)}
              onToggle={() => toggleMulti(FACET_PARAM.speeds, o.value)}
            />
          ))}
        </div>
      </Group>

      <Group title="Load index">
        <div className="flex flex-wrap gap-2 pt-1">
          {options.loads.map((o) => (
            <Chip
              key={o.value}
              label={o.value}
              checked={facets.loads.includes(o.value)}
              onToggle={() => toggleMulti(FACET_PARAM.loads, o.value)}
            />
          ))}
        </div>
      </Group>

      <Group title="Customer rating">
        {options.rating.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-center justify-between py-1.5 text-sm"
          >
            <span className="flex items-center gap-2.5">
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  facets.rating === o.value
                    ? "border-accent"
                    : "border-line-strong"
                }`}
              >
                {facets.rating === o.value && (
                  <span className="h-2 w-2 rounded-full bg-accent" />
                )}
              </span>
              <input
                type="radio"
                className="sr-only"
                checked={facets.rating === o.value}
                onChange={() => setRadio(FACET_PARAM.rating, o.value)}
              />
              <span className="text-ink">{o.label}</span>
            </span>
            <span className="text-xs text-muted">{o.count}</span>
          </label>
        ))}
      </Group>
    </div>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details open className="group border-b border-line py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink">
        {title}
        <span className="text-muted transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pt-2">{children}</div>
    </details>
  );
}

function CheckRow({
  option,
  checked,
  onToggle,
}: {
  option: FacetOption;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-1.5 text-sm">
      <span className="flex items-center gap-2.5">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
            checked ? "border-accent bg-accent text-dark" : "border-line-strong"
          }`}
        >
          {checked && <Check size={12} strokeWidth={3} />}
        </span>
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onToggle}
        />
        <span className="text-ink">{option.label}</span>
      </span>
      <span className="text-xs text-muted">{option.count}</span>
    </label>
  );
}

function Chip({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
        checked
          ? "border-accent bg-accent text-dark"
          : "border-line bg-bg-2 text-ink hover:border-accent-700/60"
      }`}
    >
      {label}
    </button>
  );
}
