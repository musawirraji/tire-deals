// Public entry point for the tire data layer.
// The app imports `tireProvider` and the types — never the concrete mock.
// In production, point this at the AutoSync-backed implementation.

import { mockProvider } from "./mock";
import type { TireProvider } from "./types";

export const tireProvider: TireProvider = mockProvider;

export * from "./types";
export { TIRE_TYPES } from "./mock";
