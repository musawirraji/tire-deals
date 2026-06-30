// Tire data contracts for the TireDeals demo.
//
// The whole point of this layer: the app talks to a `TireProvider`, never to a
// concrete data source. The demo ships a mock implementation backed by local
// JSON. In production the AutoSync feed implements this same interface — swapping
// the live feed for the mock is an implementation detail, not a rewrite.

export type TireType =
  | "all-season"
  | "winter"
  | "performance"
  | "all-terrain"
  | "summer";

export interface TireSize {
  width: number; // section width, mm (e.g. 225)
  aspect: number; // aspect ratio, % (e.g. 65)
  rim: number; // rim diameter, in (e.g. 17)
}

export interface TireProduct {
  id: string;
  brand: string;
  model: string;
  size: TireSize;
  type: TireType;
  speedRating: string; // e.g. "V", "W", "Y"
  loadIndex: number; // e.g. 99
  price: number;
  rating: number; // 0–5
  reviewCount: number;
  imageUrl: string;
}

export interface Vehicle {
  year: number;
  make: string;
  model: string;
  trim: string;
}

export interface VehicleFitment extends Vehicle {
  fitsSizes: TireSize[];
}

export interface SizeQuery {
  width: number;
  aspect: number;
  rim: number;
}

// AutoSync feed implements TireProvider in production; see data integration phase.
export interface TireProvider {
  getYears(): Promise<number[]>;
  getMakes(year: number): Promise<string[]>;
  getModels(year: number, make: string): Promise<string[]>;
  getTrims(year: number, make: string, model: string): Promise<string[]>;
  getFitment(v: Vehicle): Promise<VehicleFitment | null>;
  getBrands(): Promise<string[]>;
  getById(id: string): Promise<TireProduct | null>;
  searchByVehicle(v: Vehicle): Promise<TireProduct[]>;
  searchBySize(s: SizeQuery): Promise<TireProduct[]>;
  searchByBrand(brand: string): Promise<TireProduct[]>;
  getAll(): Promise<TireProduct[]>;
}

export function sizeToString(s: TireSize): string {
  return `${s.width}/${s.aspect}R${s.rim}`;
}

export function sameSize(a: TireSize, b: TireSize): boolean {
  return a.width === b.width && a.aspect === b.aspect && a.rim === b.rim;
}
