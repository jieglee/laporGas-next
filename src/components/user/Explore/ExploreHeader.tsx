"use client";

import { Search, X } from "lucide-react";
import { type ExploreKategori, KATEGORI_TABS } from "./types";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  kategori: ExploreKategori;
  onKategori: (v: ExploreKategori) => void;
  totalCount: number;
}

export default function ExploreHeader({ search, onSearch, kategori, onKategori, totalCount }: Props) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1.65rem",
            fontWeight: 800,
            color: "#1a0e08",
            letterSpacing: "-0.03em",
            margin: "0 0 4px",
          }}
        >
          Explore
        </h1>
        <p style={{ fontSize: "0.82rem", color: "#a8856b", margin: 0 }}>
          {totalCount} laporan dari komunitas
        </p>
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "white",
          border: "0.5px solid #f0e6dc",
          borderRadius: 12,
          padding: "0 16px",
          height: 46,
          marginBottom: 14,
          transition: "border-color 0.15s",
        }}
        onFocusCapture={(e) => (e.currentTarget.style.borderColor = "rgba(255,107,53,0.4)")}
        onBlurCapture={(e) => (e.currentTarget.style.borderColor = "#f0e6dc")}
      >
        <Search size={16} style={{ color: "#a8856b", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Cari laporan, lokasi, atau pelapor..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "0.88rem",
            color: "#1a0e08",
            background: "transparent",
            fontFamily: "inherit",
          }}
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", color: "#a8856b" }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Category tabs — horizontally scrollable */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          scrollbarWidth: "none",
          paddingBottom: 2,
        }}
      >
        {KATEGORI_TABS.map((tab) => {
          const active = kategori === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onKategori(tab.value)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 99,
                border: `0.5px solid ${active ? "transparent" : "#f0e6dc"}`,
                background: active ? "linear-gradient(135deg, #FF6B35, #E8541C)" : "white",
                color: active ? "white" : "#3d2817",
                fontSize: "0.78rem",
                fontWeight: active ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
                boxShadow: active ? "0 4px 12px rgba(255,107,53,0.25)" : "none",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "#fafaf8";
                  e.currentTarget.style.borderColor = "rgba(255,107,53,0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#f0e6dc";
                }
              }}
            >
              <span style={{ fontSize: "1rem" }}>{tab.emoji}</span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}