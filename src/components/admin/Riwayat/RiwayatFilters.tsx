"use client";

import { Search, X } from "lucide-react";

export type WaktuRange = "all" | "today" | "week" | "month";

export interface RiwayatFilterState {
  search: string;
  waktu: WaktuRange;
}

interface Props {
  filter: RiwayatFilterState;
  onChange: (f: RiwayatFilterState) => void;
}

const WAKTU_OPTS: { value: WaktuRange; label: string }[] = [
  { value: "all",   label: "Semua waktu" },
  { value: "today", label: "Hari ini" },
  { value: "week",  label: "Minggu ini" },
  { value: "month", label: "Bulan ini" },
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

export default function RiwayatFilters({ filter, onChange }: Props) {
  const hasActive = filter.search || filter.waktu !== "all";
  const reset = () => onChange({ search: "", waktu: "all" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
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
          placeholder="Cari ID laporan, judul, atau pelapor..."
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
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", color: "#a8856b" }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter waktu + reset */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <select
          value={filter.waktu}
          onChange={(e) => onChange({ ...filter, waktu: e.target.value as WaktuRange })}
          style={selectStyle}
        >
          {WAKTU_OPTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {hasActive && (
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
            <X size={11} /> Reset filter
          </button>
        )}
      </div>
    </div>
  );
}