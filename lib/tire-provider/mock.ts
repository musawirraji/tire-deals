// Mock TireProvider — local JSON behind the production interface.
// Swap this module for an AutoSync-backed implementation and the app is unchanged.

import tiresData from "@/data/tires.json";
import fitmentData from "@/data/fitment.json";
import {
  type SizeQuery,
  type TireProduct,
  type TireProvider,
  type TireType,
  type Vehicle,
  type VehicleFitment,
  sameSize,
} from "./types";

const tires = tiresData as TireProduct[];
const fitments = fitmentData as VehicleFitment[];

const uniqueSorted = <T>(arr: T[]): T[] =>
  Array.from(new Set(arr)).sort((a, b) =>
    typeof a === "number" && typeof b === "number"
      ? a - b
      : String(a).localeCompare(String(b)),
  );

// Simulate a network round-trip so the cascading selects feel real (and so the
// async surface matches a live feed). Tiny by default.
const latency = <T>(value: T, ms = 120): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const mockProvider: TireProvider = {
  async getYears() {
    return latency(uniqueSorted(fitments.map((f) => f.year)).reverse());
  },

  async getMakes(year) {
    return latency(
      uniqueSorted(fitments.filter((f) => f.year === year).map((f) => f.make)),
    );
  },

  async getModels(year, make) {
    return latency(
      uniqueSorted(
        fitments
          .filter((f) => f.year === year && f.make === make)
          .map((f) => f.model),
      ),
    );
  },

  async getTrims(year, make, model) {
    return latency(
      uniqueSorted(
        fitments
          .filter(
            (f) => f.year === year && f.make === make && f.model === model,
          )
          .map((f) => f.trim),
      ),
    );
  },

  async getFitment(v) {
    const match = fitments.find(
      (f) =>
        f.year === v.year &&
        f.make === v.make &&
        f.model === v.model &&
        f.trim === v.trim,
    );
    return latency(match ?? null);
  },

  async getBrands() {
    return latency(uniqueSorted(tires.map((t) => t.brand)));
  },

  async getById(id) {
    return latency(tires.find((t) => t.id === id) ?? null);
  },

  async searchByVehicle(v: Vehicle) {
    const fitment = await this.getFitment(v);
    if (!fitment) return [];
    const results = tires.filter((t) =>
      fitment.fitsSizes.some((s) => sameSize(s, t.size)),
    );
    return latency(results);
  },

  async searchBySize(s: SizeQuery) {
    const results = tires.filter(
      (t) =>
        t.size.width === s.width &&
        t.size.aspect === s.aspect &&
        t.size.rim === s.rim,
    );
    return latency(results);
  },

  async searchByBrand(brand) {
    return latency(
      tires.filter((t) => t.brand.toLowerCase() === brand.toLowerCase()),
    );
  },

  async getAll() {
    return latency(tires);
  },
};

// Convenience guards reused by the UI layer.
export const TIRE_TYPES: TireType[] = [
  "all-season",
  "winter",
  "performance",
  "all-terrain",
  "summer",
];
