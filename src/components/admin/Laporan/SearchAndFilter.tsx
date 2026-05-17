"use client";

import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
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


const selectStyle: React.CSSProperties = {
  background: "white",
  border: "0.5px solid #f0e6dc",
  borderRadius: 9,
  padding: "8px 30px 8px 12px",
  fontSize: "0.75rem",
  color: "#3d2817",
  cursor: "pointer",
  outline: "none",
  fontFamily: "inherit",
  fontWeight: 500,
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23a8856b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
};

export default function SearchAndFilter({ filter, onChange }: Props) {
  const hasActiveFilter =
    filter.search || filter.kategori !== "all" || filter.priority !== "all";

  const reset = () =>
    onChange({ search: "", kategori: "all", priority: "all", sortBy: "newest" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "white",
          border: "0.5px solid #f0e6dc",
          borderRadius: 10,
          padding: "10px 14px",
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
            fontSize: "0.82rem",
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
              borderRadius: 4,
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <SlidersHorizontal size={14} style={{ color: "#a8856b" }} />

        <select
          value={filter.kategori}
          onChange={(e) =>
            onChange({ ...filter, kategori: e.target.value as LaporanKategori | "all" })
          }
          style={selectStyle}
        >
          {KATEGORI_OPTS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <select
          value={filter.priority}
          onChange={(e) =>
            onChange({ ...filter, priority: e.target.value as LaporanPriority | "all" })
          }
          style={selectStyle}
        >
          {PRIORITY_OPTS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {hasActiveFilter && (
          <button
            onClick={reset}
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#E8541C",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <X size={11} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}