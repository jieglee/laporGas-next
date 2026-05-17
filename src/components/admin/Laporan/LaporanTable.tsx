"use client";

import { FileText } from "lucide-react";
import LaporanRow from "./LaporanRow";
import type { AdminLaporan, AdminLaporanStatus } from "./types";

interface Props {
  laporan: AdminLaporan[];
  onPreview: (l: AdminLaporan) => void;
  onAction: (id: string, action: { type: "approve" | "reject" | "update"; status?: AdminLaporanStatus }) => void;
}

export default function LaporanTable({ laporan, onPreview, onAction }: Props) {
  if (laporan.length === 0) {
    return (
      <div
        style={{
          background: "white",
          border: "0.5px solid #f0e6dc",
          borderRadius: 14,
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(255,107,53,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <FileText size={22} color="#E8541C" strokeWidth={1.8} />
        </div>
        <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a0e08", marginBottom: 4 }}>
          Tidak ada laporan ditemukan
        </p>
        <p style={{ fontSize: "0.75rem", color: "#a8856b" }}>
          Coba ubah filter atau kata kunci pencarian
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "white",
        border: "0.5px solid #f0e6dc",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) 130px 110px 100px 110px auto",
          gap: 14,
          padding: "12px 20px",
          background: "#fafaf8",
          borderBottom: "0.5px solid #f5ede3",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#a8856b",
        }}
      >
        <span>Laporan</span>
        <span>Kategori</span>
        <span>Status</span>
        <span>Prioritas</span>
        <span style={{ textAlign: "right" }}>Engagement</span>
        <span style={{ minWidth: 160 }}>Aksi</span>
      </div>

      {/* Rows */}
      {laporan.map((l, i) => (
        <LaporanRow
          key={l.id}
          laporan={l}
          index={i}
          onPreview={onPreview}
          onAction={onAction}
        />
      ))}
    </div>
  );
}