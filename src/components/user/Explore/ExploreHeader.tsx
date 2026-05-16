"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { KategoriLaporan, StatusLaporan } from "@/lib/mock-explore";
import { KATEGORI_CONFIG } from "@/lib/mock-explore";

export interface ExploreFilter {
  search: string;
  kategori: KategoriLaporan | "semua";
  status: StatusLaporan | "semua";
}

interface Props {
  filter: ExploreFilter;
  onChange: (f: ExploreFilter) => void;
}

const KATEGORI_OPTIONS = [
  { value: "semua", label: "Semua" },
  ...Object.entries(KATEGORI_CONFIG).map(([k, v]) => ({ value: k, label: v })),
] as { value: KategoriLaporan | "semua"; label: string }[];

const STATUS_OPTIONS = [
  { value: "semua",    label: "Semua Status" },
  { value: "menunggu", label: "Menunggu" },
  { value: "diproses", label: "Diproses" },
  { value: "selesai",  label: "Selesai" },
  { value: "ditolak",  label: "Ditolak" },
] as { value: StatusLaporan | "semua"; label: string }[];

export default function ExploreHeader({ filter, onChange }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Title */}
      <div style={{ marginBottom: 18 }}>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#1a0e08",
            letterSpacing: "-0.03em",
            marginBottom: 4,
          }}
        >
          Explore
        </h1>
        <p style={{ fontSize: "0.82rem", color: "#a8856b" }}>
          Temukan laporan dari seluruh penjuru kota
        </p>
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "white",
          border: `0.5px solid ${focused ? "rgba(255,107,53,0.4)" : "#f0e6dc"}`,
          borderRadius: 12,
          padding: "10px 14px",
          marginBottom: 12,
          transition: "border-color 0.2s",
          boxShadow: focused ? "0 0 0 3px rgba(255,107,53,0.08)" : "none",
        }}
      >
        <Search size={16} style={{ color: "#a8856b", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Cari laporan..."
          value={filter.search}
          onChange={(e) => onChange({ ...filter, search: e.target.value })}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <SlidersHorizontal size={14} style={{ color: "#a8856b" }} />

        {/* Kategori */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {KATEGORI_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filter, kategori: opt.value })}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: 99,
                border: "0.5px solid",
                cursor: "pointer",
                transition: "all 0.15s",
                borderColor: filter.kategori === opt.value ? "#FF6B35" : "#f0e6dc",
                background: filter.kategori === opt.value ? "rgba(255,107,53,0.08)" : "white",
                color: filter.kategori === opt.value ? "#E8541C" : "#6b5546",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div style={{ width: 1, height: 16, background: "#f0e6dc" }} />

        {/* Status */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filter, status: opt.value })}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: 99,
                border: "0.5px solid",
                cursor: "pointer",
                transition: "all 0.15s",
                borderColor: filter.status === opt.value ? "#FF6B35" : "#f0e6dc",
                background: filter.status === opt.value ? "rgba(255,107,53,0.08)" : "white",
                color: filter.status === opt.value ? "#E8541C" : "#6b5546",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}