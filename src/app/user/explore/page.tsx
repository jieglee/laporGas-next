"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import FeedCard from "@/components/user/Explore/FeedCard";
import CommentModal from "@/components/user/Explore/CommentModal";
import {
  MOCK_FEED,
  KATEGORI_CONFIG,
  type LaporanItem,
  type KategoriLaporan,
  type StatusLaporan,
} from "@/lib/mock-explore";

interface Filter {
  search: string;
  kategori: KategoriLaporan | "semua";
  status: StatusLaporan | "semua";
}

const KATEGORI_OPTS = [
  { value: "semua", label: "Semua" },
  ...Object.entries(KATEGORI_CONFIG).map(([k, v]) => ({ value: k, label: v })),
] as { value: KategoriLaporan | "semua"; label: string }[];

const STATUS_OPTS = [
  { value: "semua",    label: "Semua" },
  { value: "menunggu", label: "Menunggu" },
  { value: "diproses", label: "Diproses" },
  { value: "selesai",  label: "Selesai" },
  { value: "ditolak",  label: "Ditolak" },
] as { value: StatusLaporan | "semua"; label: string }[];

export default function ExplorePage() {
  const [filter, setFilter] = useState<Filter>({ search: "", kategori: "semua", status: "semua" });
  const [selected, setSelected] = useState<LaporanItem | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = useMemo(() =>
    MOCK_FEED.filter((l) => {
      const q = filter.search.toLowerCase();
      const matchSearch = !q || l.judul.toLowerCase().includes(q) || l.deskripsi.toLowerCase().includes(q);
      const matchKat = filter.kategori === "semua" || l.kategori === filter.kategori;
      const matchStatus = filter.status === "semua" || l.status === filter.status;
      return matchSearch && matchKat && matchStatus;
    }), [filter]);

  const chip = (active: boolean) => ({
    fontSize: "0.7rem",
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 99,
    border: "0.5px solid",
    cursor: "pointer" as const,
    transition: "all 0.15s",
    borderColor: active ? "#FF6B35" : "#f0e6dc",
    background: active ? "rgba(255,107,53,0.08)" : "white",
    color: active ? "#E8541C" : "#6b5546",
  });

  return (
    <>
      <div style={{ background: "#fafaf8", minHeight: "100vh", padding: "28px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>

          {/* Title */}
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#1a0e08", letterSpacing: "-0.03em", marginBottom: 3 }}>
              Explore
            </h1>
            <p style={{ fontSize: "0.78rem", color: "#a8856b" }}>
              Temukan laporan dari seluruh penjuru kota
            </p>
          </div>

          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "white",
            border: `0.5px solid ${searchFocused ? "rgba(255,107,53,0.4)" : "#f0e6dc"}`,
            borderRadius: 12, padding: "9px 14px", marginBottom: 12,
            transition: "all 0.2s",
            boxShadow: searchFocused ? "0 0 0 3px rgba(255,107,53,0.08)" : "none",
          }}>
            <Search size={15} style={{ color: "#a8856b", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Cari laporan..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{ flex: 1, border: "none", outline: "none", fontSize: "0.82rem", color: "#1a0e08", background: "transparent", fontFamily: "inherit" }}
            />
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", marginBottom: 24 }}>
            <SlidersHorizontal size={13} style={{ color: "#a8856b" }} />
            {KATEGORI_OPTS.map((o) => (
              <button key={o.value} onClick={() => setFilter({ ...filter, kategori: o.value })} style={chip(filter.kategori === o.value)}>
                {o.label}
              </button>
            ))}
            <div style={{ width: 1, height: 14, background: "#f0e6dc" }} />
            {STATUS_OPTS.map((o) => (
              <button key={o.value} onClick={() => setFilter({ ...filter, status: o.value })} style={chip(filter.status === o.value)}>
                {o.label}
              </button>
            ))}
          </div>

          {/* Feed */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 0", color: "#a8856b" }}>
              <p style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: 4 }}>Tidak ada laporan</p>
              <p style={{ fontSize: "0.75rem" }}>Coba ubah filter atau kata kunci</p>
            </div>
          ) : filtered.map((l) => (
            <FeedCard
              key={l.id}
              laporan={l}
              active={false}
              onClick={() => setSelected(l)}
            />
          ))}
        </div>
      </div>

      {/* Modal overlay - IG style */}
      <CommentModal laporan={selected} onClose={() => setSelected(null)} />
    </>
  );
}