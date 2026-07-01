"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Car, ChevronLeft, ChevronRight, Ruler, Search, Tag, Layers } from "lucide-react";
import {
  TIRE_TYPES,
  tireProvider,
  type TireProduct,
  type TireType,
} from "@/lib/tire-provider";
import {
  brandResultsHref,
  sizeResultsHref,
  typeResultsHref,
  vehicleResultsHref,
} from "@/lib/routes";
import { typeLabel } from "@/lib/format";

type Category = "vehicle" | "size" | "type" | "brand";

const CATEGORIES: {
  key: Category;
  label: string;
  pos: "top" | "left" | "right" | "bottom";
  icon: typeof Car;
}[] = [
  { key: "vehicle", label: "Vehicle", pos: "top", icon: Car },
  { key: "size", label: "Size", pos: "left", icon: Ruler },
  { key: "type", label: "Type", pos: "right", icon: Layers },
  { key: "brand", label: "Brand", pos: "bottom", icon: Tag },
];

const POS_CLASS: Record<string, string> = {
  top: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
  right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  bottom: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
};

export function RadialSearch() {
  const [active, setActive] = useState<Category>("vehicle");
  const [allTires, setAllTires] = useState<TireProduct[]>([]);

  useEffect(() => {
    tireProvider.getAll().then(setAllTires);
  }, []);

  const activeIndex = CATEGORIES.findIndex((c) => c.key === active);
  const rotate = (dir: 1 | -1) =>
    setActive(
      CATEGORIES[(activeIndex + dir + CATEGORIES.length) % CATEGORIES.length]
        .key,
    );

  const activeCat = CATEGORIES[activeIndex];

  return (
    <div className="flex w-full flex-col items-center gap-7">
      {/* The dial */}
      <div className="relative flex items-center justify-center px-12 sm:px-16">
        <button
          onClick={() => rotate(-1)}
          aria-label="Previous category"
          className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/80 text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="relative aspect-square w-[clamp(230px,64vw,380px)]">
          {/* glow */}
          <div className="td-glow pointer-events-none absolute inset-[-14%]" />

          {/* rotating ring */}
          <div className="td-spin-slow absolute inset-[10%] rounded-full border border-dashed border-line" />

          {/* tire */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tire.svg"
            alt="Tire"
            className="absolute inset-[16%] h-auto w-[68%] select-none"
            draggable={false}
          />

          {/* center label */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-0.5 rounded-full bg-bg/75 px-5 py-3 text-center backdrop-blur-sm">
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
                Search tires
              </span>
              <span className="text-lg font-extrabold leading-none text-ink">
                {activeCat.label}
              </span>
            </div>
          </div>

          {/* category nodes */}
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const on = c.key === active;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`absolute z-10 flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-semibold backdrop-blur transition-all ${POS_CLASS[c.pos]} ${
                  on
                    ? "border-accent bg-accent text-bg shadow-glow"
                    : "border-line bg-surface/90 text-ink hover:border-accent/60"
                }`}
                aria-pressed={on}
              >
                <Icon size={15} />
                {c.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => rotate(1)}
          aria-label="Next category"
          className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/80 text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* The control panel for the active category */}
      <div className="w-full max-w-xl rounded-[28px] border border-line bg-surface/70 p-5 backdrop-blur sm:p-6">
        {active === "vehicle" && <VehicleForm />}
        {active === "size" && <SizeForm tires={allTires} />}
        {active === "type" && <TypeForm />}
        {active === "brand" && <BrandForm />}
      </div>
    </div>
  );
}

/* ---------- shared select ---------- */

function Select({
  label,
  value,
  onChange,
  options,
  disabled,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: (string | number)[];
  disabled?: boolean;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </span>
      <select
        value={value}
        disabled={disabled}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-line bg-surface-2 px-3.5 py-3 text-sm text-ink outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239aa29a' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.9rem center",
          backgroundSize: "12px",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function SearchButton({
  disabled,
  children,
}: {
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-bg transition-all hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Search size={17} />
      {children}
    </button>
  );
}

/* ---------- vehicle ---------- */

function VehicleForm() {
  const router = useRouter();
  const [years, setYears] = useState<number[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [trims, setTrims] = useState<string[]>([]);

  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trim, setTrim] = useState("");

  useEffect(() => {
    tireProvider.getYears().then(setYears);
  }, []);

  useEffect(() => {
    setMake("");
    setMakes([]);
    if (year) tireProvider.getMakes(Number(year)).then(setMakes);
  }, [year]);

  useEffect(() => {
    setModel("");
    setModels([]);
    if (year && make) tireProvider.getModels(Number(year), make).then(setModels);
  }, [year, make]);

  useEffect(() => {
    setTrim("");
    setTrims([]);
    if (year && make && model)
      tireProvider.getTrims(Number(year), make, model).then(setTrims);
  }, [year, make, model]);

  const ready = Boolean(year && make && model && trim);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!ready) return;
        router.push(
          vehicleResultsHref({ year: Number(year), make, model, trim }),
        );
      }}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-2 gap-3">
        <Select label="Year" placeholder="Select year" value={year} onChange={setYear} options={years} />
        <Select label="Make" placeholder="Select make" value={make} onChange={setMake} options={makes} disabled={!year} />
        <Select label="Model" placeholder="Select model" value={model} onChange={setModel} options={models} disabled={!make} />
        <Select label="Trim" placeholder="Select trim" value={trim} onChange={setTrim} options={trims} disabled={!model} />
      </div>
      <SearchButton disabled={!ready}>Find tires that fit</SearchButton>
    </form>
  );
}

/* ---------- size ---------- */

function SizeForm({ tires }: { tires: TireProduct[] }) {
  const router = useRouter();
  const [width, setWidth] = useState("");
  const [aspect, setAspect] = useState("");
  const [rim, setRim] = useState("");

  const widths = useMemo(
    () => Array.from(new Set(tires.map((t) => t.size.width))).sort((a, b) => a - b),
    [tires],
  );
  const aspects = useMemo(
    () =>
      Array.from(
        new Set(
          tires
            .filter((t) => String(t.size.width) === width)
            .map((t) => t.size.aspect),
        ),
      ).sort((a, b) => a - b),
    [tires, width],
  );
  const rims = useMemo(
    () =>
      Array.from(
        new Set(
          tires
            .filter(
              (t) =>
                String(t.size.width) === width &&
                String(t.size.aspect) === aspect,
            )
            .map((t) => t.size.rim),
        ),
      ).sort((a, b) => a - b),
    [tires, width, aspect],
  );

  const ready = Boolean(width && aspect && rim);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!ready) return;
        router.push(
          sizeResultsHref({
            width: Number(width),
            aspect: Number(aspect),
            rim: Number(rim),
          }),
        );
      }}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-3 gap-3">
        <Select label="Width" placeholder="Width" value={width} onChange={(v) => { setWidth(v); setAspect(""); setRim(""); }} options={widths} />
        <Select label="Aspect" placeholder="Ratio" value={aspect} onChange={(v) => { setAspect(v); setRim(""); }} options={aspects} disabled={!width} />
        <Select label="Rim" placeholder="Diameter" value={rim} onChange={setRim} options={rims.map((r) => `R${r}`)} disabled={!aspect} />
      </div>
      <div className="flex items-center justify-center gap-2 text-sm text-muted">
        Your size:
        <span className="rounded-md bg-surface-2 px-2.5 py-1 font-mono font-semibold text-accent">
          {width || "—"}/{aspect || "—"}
          {rim ? rim.replace("R", "R") : "R—"}
        </span>
      </div>
      <SearchButton disabled={!ready}>Search this size</SearchButton>
    </form>
  );
}

/* ---------- type ---------- */

function TypeForm() {
  const router = useRouter();
  const [type, setType] = useState<TireType | "">("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (type) router.push(typeResultsHref(type));
      }}
      className="flex flex-col gap-4"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-muted">
        Tire type
      </span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {TIRE_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-colors ${
              type === t
                ? "border-accent bg-accent text-bg"
                : "border-line bg-surface-2 text-ink hover:border-accent/60"
            }`}
          >
            {typeLabel(t)}
          </button>
        ))}
      </div>
      <SearchButton disabled={!type}>Browse {type ? typeLabel(type) : ""} tires</SearchButton>
    </form>
  );
}

/* ---------- brand ---------- */

function BrandForm() {
  const router = useRouter();
  const [brands, setBrands] = useState<string[]>([]);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    tireProvider.getBrands().then(setBrands);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (brand) router.push(brandResultsHref(brand));
      }}
      className="flex flex-col gap-4"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-muted">
        Shop by brand
      </span>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {brands.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBrand(b)}
            className={`rounded-xl border px-2 py-3 text-sm font-semibold transition-colors ${
              brand === b
                ? "border-accent bg-accent text-bg"
                : "border-line bg-surface-2 text-ink hover:border-accent/60"
            }`}
          >
            {b}
          </button>
        ))}
      </div>
      <SearchButton disabled={!brand}>See {brand || "brand"} tires</SearchButton>
    </form>
  );
}
