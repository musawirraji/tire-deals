import type { Vehicle } from "@/lib/tire-provider";

export type SearchParams = Record<string, string | string[] | undefined>;

export function vehicleResultsHref(v: Vehicle): string {
  const q = new URLSearchParams({
    by: "vehicle",
    year: String(v.year),
    make: v.make,
    model: v.model,
    trim: v.trim,
  });
  return `/results?${q.toString()}`;
}

export function sizeResultsHref(s: {
  width: number;
  aspect: number;
  rim: number;
}): string {
  const q = new URLSearchParams({
    by: "size",
    width: String(s.width),
    aspect: String(s.aspect),
    rim: String(s.rim),
  });
  return `/results?${q.toString()}`;
}

export function brandResultsHref(brand: string): string {
  const q = new URLSearchParams({ by: "brand", brand });
  return `/results?${q.toString()}`;
}

export function typeResultsHref(type: string): string {
  const q = new URLSearchParams({ by: "type", type });
  return `/results?${q.toString()}`;
}

export function productHref(id: string, ctx?: SearchParams): string {
  const q = new URLSearchParams();
  // carry vehicle/size fitment context forward so the PDP can confirm fit
  for (const k of ["by", "year", "make", "model", "trim", "width", "aspect", "rim"]) {
    const v = ctx?.[k];
    if (typeof v === "string" && v) q.set(k, v);
  }
  const qs = q.toString();
  return `/product/${id}${qs ? `?${qs}` : ""}`;
}

export function firstParam(
  params: SearchParams,
  key: string,
): string | undefined {
  const v = params[key];
  return Array.isArray(v) ? v[0] : v;
}
