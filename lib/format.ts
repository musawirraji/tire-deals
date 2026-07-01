import type { TireType } from "@/lib/tire-provider";

export function formatPrice(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

const TYPE_LABELS: Record<TireType, string> = {
  "all-season": "All-Season",
  winter: "Winter",
  performance: "Performance",
  "all-terrain": "All-Terrain",
  summer: "Summer",
};

export function typeLabel(t: TireType): string {
  return TYPE_LABELS[t] ?? t;
}
