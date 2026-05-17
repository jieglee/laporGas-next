"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, AlertTriangle } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

export type AdminLaporanStatus = "pending" | "approved" | "on_progress" | "completed" | "rejected";
export type LaporanPriority = "low" | "medium" | "high" | "urgent";
export type LaporanKategori = "infrastruktur" | "fasilitas-umum" | "kebersihan" | "lalu-lintas";

export interface AdminLaporan {
  id: string;
  judul: string;
  kategori: LaporanKategori;
  status: AdminLaporanStatus;
  priority: LaporanPriority;
  lokasi: string;
  pelapor: { nama: string; inisial: string };
  createdAt: string;
}

const STATUS_CONFIG: Record<AdminLaporanStatus, { label: string; bg: string; color: string }> = {
  pending:     { label: "Pending",     bg: "#FEF3C7", color: "#92400E" },
  approved:    { label: "Approved",    bg: "#DBEAFE", color: "#1D4ED8" },
  on_progress: { label: "On Progress", bg: "#FFEDD5", color: "#C2410C" },
  completed:   { label: "Completed",   bg: "#D1FAE5", color: "#047857" },
  rejected:    { label: "Rejected",    bg: "#FEE2E2", color: "#B91C1C" },
};

const KATEGORI_LABEL: Record<LaporanKategori, string> = {
  "infrastruktur":  "Infrastruktur",
  "fasilitas-umum": "Fasilitas Umum",
  "kebersihan":     "Kebersihan",
  "lalu-lintas":    "Lalu Lintas",
};

// ── Component ──────────────────────────────────────────────────────────────────

interface Props {
  laporan: AdminLaporan[];
  limit?: number;
}

export default function UrgentReports({ laporan, limit = 5 }: Props) {
  const items = laporan.slice(0, limit);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: 32 }}
    >
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: "rgba(220,38,38,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#DC2626",
            }}
          >
            <AlertTriangle size={16} strokeWidth={2} />
          </div>
          <div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "#1a0e08",
                letterSpacing: "-0.025em",
                margin: 0,
                marginBottom: 2,
              }}
            >
              Laporan Urgent
            </h2>
            <p style={{ fontSize: "0.72rem", color: "#a8856b", margin: 0 }}>
              {items.length} laporan butuh penanganan cepat
            </p>
          </div>
        </div>
        <Link
          href="/admin/laporan?priority=urgent"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "#E8541C",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Lihat semua <ArrowRight size={13} />
        </Link>
      </div>

      {/* Card container */}
      <div
        style={{
          background: "white",
          border: "0.5px solid #f0e6dc",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {items.length === 0 ? (
          <div style={{ padding: "48px 20px", textAlign: "center" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1a0e08", marginBottom: 4 }}>
              🎉 Tidak ada laporan urgent
            </p>
            <p style={{ fontSize: "0.75rem", color: "#a8856b" }}>
              Semua sudah ditangani
            </p>
          </div>
        ) : (
          items.map((l, i) => {
            const s = STATUS_CONFIG[l.status];
            return (
              <Link
                key={l.id}
                href={`/admin/laporan/${l.id}`}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "16px 20px",
                  borderBottom: i < items.length - 1 ? "0.5px solid #f5ede3" : "none",
                  textDecoration: "none",
                  transition: "background 0.15s",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fafaf8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Red left accent */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "20%",
                    bottom: "20%",
                    width: 3,
                    background: "linear-gradient(180deg, #DC2626, #B91C1C)",
                    borderRadius: "0 2px 2px 0",
                  }}
                />

                {/* Avatar */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {l.pelapor.inisial}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1a0e08" }}>
                      {l.pelapor.nama}
                    </span>
                    <span style={{ fontSize: "0.62rem", color: "#c9a892" }}>·</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "#E8541C", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {KATEGORI_LABEL[l.kategori]}
                    </span>
                    <span style={{ fontSize: "0.62rem", color: "#c9a892" }}>· {l.createdAt}</span>
                  </div>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "#1a0e08",
                      margin: 0,
                      lineHeight: 1.45,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      marginBottom: 8,
                    }}
                  >
                    {l.judul}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        padding: "2px 8px",
                        borderRadius: 99,
                        background: s.bg,
                        color: s.color,
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        padding: "2px 8px",
                        borderRadius: 99,
                        background: "#FEE2E2",
                        color: "#B91C1C",
                      }}
                    >
                      Urgent
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "#a8856b", display: "flex", alignItems: "center", gap: 3 }}>
                      <MapPin size={10} /> {l.lokasi}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </motion.section>
  );
}