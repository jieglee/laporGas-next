"use client";

import { Search, X, Calendar } from "lucide-react";

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

export default function RiwayatFilters({ filter, onChange }: Props) {
  const hasActive = filter.search || filter.waktu !== "all";

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
      {/* Search */}
      <div
        style={{
          flex: 1,
          minWidth: 240,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "white",
          border: "0.5px solid #f0e6dc",
          borderRadius: 10,
          height: 38,
          padding: "0 14px",
          transition: "all 0.2s",
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

      {/* Filter waktu */}
      <div style={{ position: "relative" }}>
        <Calendar
          size={14}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#a8856b",
            pointerEvents: "none",
          }}
        />
        <select
          value={filter.waktu}
          onChange={(e) => onChange({ ...filter, waktu: e.target.value as WaktuRange })}
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
          }}
        >
          {WAKTU_OPTS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Reset */}
      {hasActive && (
        <button
          onClick={() => onChange({ search: "", waktu: "all" })}
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
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <X size={12} /> Reset
        </button>
      )}
    </div>
  );
}