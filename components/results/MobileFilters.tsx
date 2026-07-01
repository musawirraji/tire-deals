"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import type { Facets, ResultsData } from "@/lib/results";

export function MobileFilters({
  options,
  facets,
  activeCount,
}: {
  options: ResultsData["options"];
  facets: Facets;
  activeCount: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-line bg-bg-2 px-4 py-2.5 text-sm font-semibold text-ink lg:hidden"
      >
        <SlidersHorizontal size={15} />
        Filters
        {activeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-dark">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-bg">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="text-base font-bold">Filters</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line"
              >
                <X size={17} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-3">
              <FilterSidebar options={options} facets={facets} />
            </div>
            <div className="border-t border-line p-4">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-full bg-accent py-3 text-sm font-bold text-dark"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
