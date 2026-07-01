import {
  type TireProduct,
  type TireType,
  type Vehicle,
  sizeToString,
  tireProvider,
} from "@/lib/tire-provider";
import { typeLabel } from "@/lib/format";
import { firstParam, type SearchParams } from "@/lib/routes";

export interface PriceBracket {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const PRICE_BRACKETS: PriceBracket[] = [
  { id: "0-100", label: "Under $100", min: 0, max: 100 },
  { id: "100-150", label: "$100 – $150", min: 100, max: 150 },
  { id: "150-200", label: "$150 – $200", min: 150, max: 200 },
  { id: "200-250", label: "$200 – $250", min: 200, max: 250 },
  { id: "250-9999", label: "$250 & up", min: 250, max: 99999 },
];

export const RATING_OPTIONS = [
  { id: "4.5", label: "4.5 & up", min: 4.5 },
  { id: "4", label: "4.0 & up", min: 4 },
  { id: "3.5", label: "3.5 & up", min: 3.5 },
];

export type SortKey = "price-asc" | "price-desc" | "rating" | "popularity";

export const SORTS: { id: SortKey; label: string }[] = [
  { id: "popularity", label: "Most popular" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Highest rated" },
];

export interface Facets {
  types: string[];
  brands: string[];
  speeds: string[];
  loads: string[];
  price: string[];
  rating: string;
  sort: SortKey;
}

export interface ResultsContext {
  heading: string;
  subheading: string;
  by: string;
  label: string; // vehicle/size string, e.g. "2019 Toyota Camry SE" or "225/65R17"
  fits: boolean; // whether to badge cards as "fits your vehicle"
  narrowed: boolean; // results are filtered to a vehicle/size (show fitment banner)
}

const list = (p: SearchParams, key: string): string[] => {
  const v = firstParam(p, key);
  return v ? v.split(",").filter(Boolean) : [];
};

// Facet params use dedicated keys (typef/brandf) so they never collide with the
// base-search params `type`/`brand` used by `by=type` and `by=brand`.
export function parseFacets(p: SearchParams): Facets {
  const sort = (firstParam(p, "sort") as SortKey) || "popularity";
  return {
    types: list(p, "typef"),
    brands: list(p, "brandf"),
    speeds: list(p, "speed"),
    loads: list(p, "load"),
    price: list(p, "price"),
    rating: firstParam(p, "rating") || "",
    sort,
  };
}

// URL param key for each facet group (consumed by the sidebar too).
export const FACET_PARAM = {
  types: "typef",
  brands: "brandf",
  speeds: "speed",
  loads: "load",
  price: "price",
  rating: "rating",
  sort: "sort",
} as const;

async function baseSet(
  p: SearchParams,
): Promise<{ tires: TireProduct[]; ctx: ResultsContext }> {
  const by = firstParam(p, "by") || "all";

  if (by === "vehicle") {
    const v: Vehicle = {
      year: Number(firstParam(p, "year")),
      make: firstParam(p, "make") || "",
      model: firstParam(p, "model") || "",
      trim: firstParam(p, "trim") || "",
    };
    const tires = await tireProvider.searchByVehicle(v);
    const label = `${v.year} ${v.make} ${v.model} ${v.trim}`;
    return {
      tires,
      ctx: {
        heading: `Tires that fit your ${label}`,
        subheading: "Guaranteed fitment from our vehicle database.",
        by,
        label,
        fits: true,
        narrowed: true,
      },
    };
  }

  if (by === "size") {
    const size = {
      width: Number(firstParam(p, "width")),
      aspect: Number(firstParam(p, "aspect")),
      rim: Number(firstParam(p, "rim")),
    };
    const tires = await tireProvider.searchBySize(size);
    return {
      tires,
      ctx: {
        heading: `Tires in size ${sizeToString(size)}`,
        subheading: "All tires matching your exact size.",
        by,
        label: sizeToString(size),
        fits: false,
        narrowed: true,
      },
    };
  }

  if (by === "brand") {
    const brand = firstParam(p, "brand") || "";
    const tires = await tireProvider.searchByBrand(brand);
    return {
      tires,
      ctx: {
        heading: `${brand} tires`,
        subheading: `Every ${brand} tire in the catalog.`,
        by,
        label: brand,
        fits: false,
        narrowed: false,
      },
    };
  }

  if (by === "type") {
    const type = (firstParam(p, "type") || "") as TireType;
    const all = await tireProvider.getAll();
    return {
      tires: all.filter((t) => t.type === type),
      ctx: {
        heading: `${typeLabel(type)} tires`,
        subheading: `Browse our ${typeLabel(type).toLowerCase()} range.`,
        by,
        label: typeLabel(type),
        fits: false,
        narrowed: false,
      },
    };
  }

  const all = await tireProvider.getAll();
  return {
    tires: all,
    ctx: {
      heading: "All tires",
      subheading: "Browse the full catalog, then filter to your needs.",
      by,
      label: "",
      fits: false,
      narrowed: false,
    },
  };
}

function applyFacets(tires: TireProduct[], f: Facets): TireProduct[] {
  let out = tires;
  if (f.types.length)
    out = out.filter((t) => f.types.includes(t.type));
  if (f.brands.length)
    out = out.filter((t) => f.brands.includes(t.brand));
  if (f.speeds.length)
    out = out.filter((t) => f.speeds.includes(t.speedRating));
  if (f.loads.length)
    out = out.filter((t) => f.loads.includes(String(t.loadIndex)));
  if (f.price.length) {
    const ranges = PRICE_BRACKETS.filter((b) => f.price.includes(b.id));
    out = out.filter((t) =>
      ranges.some((b) => t.price >= b.min && t.price < b.max),
    );
  }
  if (f.rating) {
    const min = Number(f.rating);
    out = out.filter((t) => t.rating >= min);
  }
  return out;
}

function sortTires(tires: TireProduct[], sort: SortKey): TireProduct[] {
  const out = [...tires];
  switch (sort) {
    case "price-asc":
      return out.sort((a, b) => a.price - b.price);
    case "price-desc":
      return out.sort((a, b) => b.price - a.price);
    case "rating":
      return out.sort((a, b) => b.rating - a.rating);
    default:
      return out.sort((a, b) => b.reviewCount - a.reviewCount);
  }
}

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

function countBy(
  tires: TireProduct[],
  keyFn: (t: TireProduct) => string,
): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of tires) {
    const k = keyFn(t);
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
}

export interface ResultsData {
  ctx: ResultsContext;
  results: TireProduct[];
  totalInBase: number;
  facets: Facets;
  options: {
    types: FacetOption[];
    brands: FacetOption[];
    speeds: FacetOption[];
    loads: FacetOption[];
    price: FacetOption[];
    rating: FacetOption[];
  };
}

export async function getResults(p: SearchParams): Promise<ResultsData> {
  const { tires: base, ctx } = await baseSet(p);
  const facets = parseFacets(p);
  const results = sortTires(applyFacets(base, facets), facets.sort);

  const typeCounts = countBy(base, (t) => t.type);
  const brandCounts = countBy(base, (t) => t.brand);
  const speedCounts = countBy(base, (t) => t.speedRating);
  const loadCounts = countBy(base, (t) => String(t.loadIndex));

  const options = {
    types: [...typeCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => ({
        value,
        label: typeLabel(value as TireType),
        count,
      })),
    brands: [...brandCounts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, label: value, count })),
    speeds: [...speedCounts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, label: value, count })),
    loads: [...loadCounts.entries()]
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([value, count]) => ({ value, label: value, count })),
    price: PRICE_BRACKETS.map((b) => ({
      value: b.id,
      label: b.label,
      count: base.filter((t) => t.price >= b.min && t.price < b.max).length,
    })).filter((o) => o.count > 0),
    rating: RATING_OPTIONS.map((r) => ({
      value: r.id,
      label: r.label,
      count: base.filter((t) => t.rating >= r.min).length,
    })),
  };

  return { ctx, results, totalInBase: base.length, facets, options };
}
