"use client";

import { Search, X, Tag, Flag, ArrowUpDown } from "lucide-react";
import {
  type LaporanPriority,
  type LaporanKategori,
  KATEGORI_LABEL,
} from "./types";

export type SortBy = "newest" | "oldest" | "urgent";

export interface FilterState {
  search: string;
  kategori: LaporanKategori | "all";
  priority: LaporanPriority | "all";
  sortBy: SortBy;
}

interface Props {
  filter: FilterState;
  onChange: (f: FilterState) => void;
}

const KATEGORI_OPTS: { value: LaporanKategori | "all"; label: string }[] = [
  { value: "all", label: "Semua kategori" },
  ...Object.entries(KATEGORI_LABEL).map(([k, v]) => ({
    value: k as LaporanKategori,
    label: v,
  })),
];

const PRIORITY_OPTS: { value: LaporanPriority | "all"; label: string }[] = [
  { value: "all",    label: "Semua prioritas" },
  { value: "urgent", label: "Urgent" },
  { value: "high",   label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low",    label: "Low" },
];

const SORT_OPTS: { value: SortBy; label: string }[] = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "urgent", label: "Prioritas urgent" },
];

function SelectField({
  icon,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#a8856b", pointerEvents: "none", display: "flex" }}>
        {icon}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "white",
          border: "0.5px solid #f0e6dc",
          borderRadius: 10,
          height: 38,
          padding: "0 36px 0 34px",
          fontSize: "0.78rem",
          color: "#3d2817",
          cursor: "pointer",
          outline: "none",
          fontFamily: "inherit",
          fontWeight: 500,
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23a8856b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          minWidth: 160,
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export default function SearchAndFilter({ filter, onChange }: Props) {
  const hasActive =
    filter.search || filter.kategori !== "all" || filter.priority !== "all";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "white",
          border: "0.5px solid #f0e6dc",
          borderRadius: 10,
          padding: "0 14px",
          height: 42,
        }}
      >
        <Search size={15} style={{ color: "#a8856b", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Cari laporan, pelapor, atau ID..."
          value={filter.search}
          onChange={(e) => onChange({ ...filter, search: e.target.value })}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "0.85rem",
            color: "#1a0e08",
            background: "transparent",
            fontFamily: "inherit",
          }}
        />
        {filter.search && (
          <button
            onClick={() => onChange({ ...filter, search: "" })}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 2,
              display: "flex",
              color: "#a8856b",
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <SelectField
          icon={<Tag size={13} strokeWidth={1.8} />}
          value={filter.kategori}
          onChange={(v) => onChange({ ...filter, kategori: v as LaporanKategori | "all" })}
          options={KATEGORI_OPTS}
        />
        <SelectField
          icon={<Flag size={13} strokeWidth={1.8} />}
          value={filter.priority}
          onChange={(v) => onChange({ ...filter, priority: v as LaporanPriority | "all" })}
          options={PRIORITY_OPTS}
        />

        {hasActive && (
          <button
            onClick={() => onChange({ search: "", kategori: "all", priority: "all", sortBy: filter.sortBy })}
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#E8541C",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 4px",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}