"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Pencil, ChevronDown } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface FieldChange {
  field: string;          // "Judul", "Deskripsi", "Lokasi", "Foto"
  before: string;
  after: string;
}

export interface RiwayatEdit {
  id: string;
  laporanId: string;
  laporanJudul: string;
  pelapor: { nama: string; inisial: string };
  timestamp: string;       // "5 menit lalu"
  tanggalLengkap: string;  // "17 Mei 2026, 14:30 WIB"
  fieldChanges: FieldChange[];
}

// ── Component ──────────────────────────────────────────────────────────────────

interface Props {
  riwayat: RiwayatEdit;
  index: number;
}

export default function RiwayatItem({ riwayat, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const fieldCount = riwayat.fieldChanges.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "white",
        border: "0.5px solid #f0e6dc",
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 8,
        transition: "border-color 0.15s",
      }}
      whileHover={{ borderColor: "rgba(255,107,53,0.2)" }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        {/* Icon */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,107,53,0.1)",
            color: "#E8541C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Pencil size={14} strokeWidth={2} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 4,
              flexWrap: "wrap",
            }}
          >
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1a0e08", margin: 0, lineHeight: 1.4 }}>
              <span style={{ fontWeight: 700 }}>{riwayat.pelapor.nama}</span>
              {" mengedit "}
              <Link
                href={`/admin/laporan/${riwayat.laporanId}`}
                style={{
                  color: "#E8541C",
                  textDecoration: "none",
                  fontWeight: 700,
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {riwayat.laporanId}
              </Link>
            </p>
            <span
              title={riwayat.tanggalLengkap}
              style={{ fontSize: "0.65rem", color: "#c9a892", whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}
            >
              {riwayat.timestamp}
            </span>
          </div>

          {/* Judul laporan */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "#8a6f5e",
              margin: "0 0 8px",
              lineHeight: 1.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {riwayat.laporanJudul}
          </p>

          {/* Field changes summary (pills) */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.65rem", color: "#a8856b" }}>
              {fieldCount} {fieldCount > 1 ? "perubahan" : "perubahan"}:
            </span>
            {riwayat.fieldChanges.map((fc, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  color: "#E8541C",
                  background: "#FFF5EE",
                  border: "0.5px solid rgba(255,107,53,0.15)",
                  padding: "2px 8px",
                  borderRadius: 99,
                }}
              >
                {fc.field}
              </span>
            ))}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setExpanded((p) => !p)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "#a8856b",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 0 0",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E8541C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#a8856b")}
          >
            {expanded ? "Sembunyikan" : "Lihat"} detail perubahan
            <ChevronDown
              size={11}
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {/* Expandable detail */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              {riwayat.fieldChanges.map((fc, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fafaf8",
                    border: "0.5px solid #f0e6dc",
                    borderRadius: 10,
                    padding: "10px 12px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: "#6b5546",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      margin: "0 0 8px",
                    }}
                  >
                    {fc.field}
                  </p>

                  {/* Before */}
                  <div style={{ marginBottom: 8 }}>
                    <p
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 600,
                        color: "#a8856b",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        margin: "0 0 3px",
                      }}
                    >
                      Sebelum
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#8a6f5e",
                        lineHeight: 1.5,
                        margin: 0,
                        textDecoration: "line-through",
                        textDecorationColor: "rgba(220,38,38,0.4)",
                      }}
                    >
                      {fc.before}
                    </p>
                  </div>

                  {/* After */}
                  <div>
                    <p
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 600,
                        color: "#059669",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        margin: "0 0 3px",
                      }}
                    >
                      Sesudah
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "#1a0e08", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                      {fc.after}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}