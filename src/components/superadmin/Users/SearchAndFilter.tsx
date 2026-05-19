    "use client";

import { Search, X } from "lucide-react";

type StatusFilter = "semua" | "aktif" | "nonaktif";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  status: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
  placeholder?: string;
};

export default function SearchAndFilter({
  query,
  onQueryChange,
  status,
  onStatusChange,
  placeholder = "Cari nama atau email...",
}: Props) {
  return (
    <div className="space-y-2.5">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-2.5 pl-9 pr-9 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#C0392B]/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C0392B]/10"
        />
        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Status filter */}
      <div className="flex gap-1.5">
        {(["semua", "aktif", "nonaktif"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(s)}
            className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-medium capitalize transition-colors ${
              status === s
                ? "bg-neutral-900 text-white"
                : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}