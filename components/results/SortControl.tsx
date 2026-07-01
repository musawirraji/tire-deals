"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { SORTS, type SortKey } from "@/lib/results";

export function SortControl({ value }: { value: SortKey }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (v: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (v === "popularity") next.delete("sort");
    else next.set("sort", v);
    router.replace(`/results?${next.toString()}`, { scroll: false });
  };

  return (
    <label className="flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2.5 text-sm">
      <ArrowUpDown size={15} className="text-muted" />
      <span className="text-muted">Sort:</span>
      <select
        value={value}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent pr-4 font-semibold text-ink outline-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23f0f0f0' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "11px",
        }}
      >
        {SORTS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </label>
  );
}
