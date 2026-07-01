import {
  type TireProduct,
  sameSize,
  sizeToString,
  tireProvider,
} from "@/lib/tire-provider";
import { firstParam, type SearchParams } from "@/lib/routes";

export interface FitVerdict {
  status: "fit" | "mismatch" | "none";
  label: string; // e.g. "2019 Toyota Camry SE" or "225/65R17"
}

/** Decide whether `tire` fits the vehicle/size carried in the URL context. */
export async function verdictFor(
  tire: TireProduct,
  params: SearchParams,
): Promise<FitVerdict> {
  const by = firstParam(params, "by");

  if (by === "vehicle") {
    const vehicle = {
      year: Number(firstParam(params, "year")),
      make: firstParam(params, "make") || "",
      model: firstParam(params, "model") || "",
      trim: firstParam(params, "trim") || "",
    };
    const label = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`;
    const fitment = await tireProvider.getFitment(vehicle);
    const fits = fitment?.fitsSizes.some((s) => sameSize(s, tire.size)) ?? false;
    return { status: fits ? "fit" : "mismatch", label };
  }

  if (by === "size") {
    const size = {
      width: Number(firstParam(params, "width")),
      aspect: Number(firstParam(params, "aspect")),
      rim: Number(firstParam(params, "rim")),
    };
    const fits = sameSize(size, tire.size);
    return { status: fits ? "fit" : "mismatch", label: sizeToString(size) };
  }

  return { status: "none", label: "" };
}
