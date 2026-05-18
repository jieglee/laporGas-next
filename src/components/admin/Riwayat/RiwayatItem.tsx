"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil, ChevronDown, FileText, MapPin, Image as ImageIcon,
  Tag, Type, ExternalLink,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

export type FieldType = "Judul" | "Deskripsi" | "Lokasi" | "Kategori" | "Foto";

export interface FieldChange {
  field: FieldType;
  before: string;
  after: string;
}

export interface RiwayatEdit {
  id: string;
  laporanId: string;
  laporanJudul: string;
  pelapor: { nama: string; inisial: string };
  timestamp: string;
  tanggalLengkap: string;
  fieldChanges: FieldChange[];
}

// ── Field icon map ─────────────────────────────────────────────────────────────

const FIELD_ICON: Record<FieldType, React.ElementType> = {
  "Judul":     Type,
  "Deskripsi": FileText,
  "Lokasi":    MapPin,
  "Kategori":  Tag,
  "Foto":      ImageIcon,
};

// Konsisten color buat avatar berdasar hash dari inisial
function avatarColor(inisial: string): { bg: string; color: string } {
  const palettes = [
    { bg: "#FAECE7", color: "#993C1D" }, // coral
    { bg: "#E1F5EE", color: "#0F6E56" }, // teal
    { bg: "#EEEDFE", color: "#3C3489" }, // purple
    { bg: "#FBEAF0", color: "#72243E" }, // pink
    { bg: "#E6F1FB", color: "#0C447C" }, // blue
    { bg: "#FAEEDA", color: "#854F0B" }, // amber
  ];
  const hash = inisial.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return palettes[hash % palettes.length];
}

// ── Component ──────────────────────────────────────────────────────────────────

interface Props {
  riwayat: RiwayatEdit;
  index: number;
}

export default function RiwayatItem({ riwayat, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const fieldCount = riwayat.fieldChanges.length;
  const avatar = avatarColor(riwayat.pelapor.inisial);

  // Preview = changes pertama (kalau cuma 1, full; kalau banyak, expandable)
  const preview = riwayat.fieldChanges[0];
  const restCount = fieldCount - 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "white",
        border: "0.5px solid #f0e6dc",
        borderRadius: 14,
        padding: "16px 18px",
        marginBottom: 10,
        transition: "all 0.2s",
      }}
      whileHover={{
        borderColor: "rgba(255,107,53,0.25)",
        boxShadow: "0 4px 16px rgba(255,107,53,0.06)",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
        {/* Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: avatar.bg,
            color: avatar.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.72rem",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {riwayat.pelapor.inisial}
        </div>

        {/* Title content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 3,
            }}
          >
            <p style={{ fontSize: "0.85rem", color: "#1a0e08", margin: 0, lineHeight: 1.4 }}>
              <span style={{ fontWeight: 600 }}>{riwayat.pelapor.nama}</span>
              <span style={{ color: "#8a6f5e" }}> mengedit </span>
              <Link
                href={`/admin/laporan/${riwayat.laporanId}`}
                style={{
                  fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
                  fontSize: "0.72rem",
                  background: "#FFF5EE",
                  border: "0.5px solid rgba(255,107,53,0.15)",
                  padding: "2px 8px",
                  borderRadius: 6,
                  color: "#E8541C",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.15s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,107,53,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FFF5EE";
                }}
              >
                {riwayat.laporanId}
                <ExternalLink size={9} strokeWidth={2.2} />
              </Link>
            </p>
          </div>
          <p
            style={{
              fontSize: "0.78rem",
              color: "#8a6f5e",
              margin: 0,
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
        </div>

        {/* Timestamp */}
        <span
          title={riwayat.tanggalLengkap}
          style={{
            fontSize: "0.68rem",
            color: "#c9a892",
            whiteSpace: "nowrap",
            flexShrink: 0,
            paddingTop: 4,
          }}
        >
          {riwayat.timestamp}
        </span>
      </div>

      {/* Field changes preview */}
      <FieldChangeBlock change={preview} />

      {/* Show more if multiple */}
      {restCount > 0 && (
        <button
          onClick={() => setExpanded((p) => !p)}
          style={{
            marginTop: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.72rem",
            fontWeight: 600,
            color: expanded ? "#E8541C" : "#8a6f5e",
            background: expanded ? "#FFF5EE" : "transparent",
            border: `0.5px solid ${expanded ? "rgba(255,107,53,0.25)" : "transparent"}`,
            borderRadius: 8,
            padding: "5px 10px",
            cursor: "pointer",
            transition: "all 0.15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            if (!expanded) {
              e.currentTarget.style.background = "#fafaf8";
              e.currentTarget.style.color = "#E8541C";
            }
          }}
          onMouseLeave={(e) => {
            if (!expanded) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#8a6f5e";
            }
          }}
        >
          {expanded
            ? "Sembunyikan perubahan lain"
            : `Lihat ${restCount} perubahan lain`}
          <ChevronDown
            size={12}
            strokeWidth={2}
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>
      )}

      {/* Expanded extra changes */}
      <AnimatePresence>
        {expanded && restCount > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 10 }}>
              {riwayat.fieldChanges.slice(1).map((fc, i) => (
                <FieldChangeBlock key={i} change={fc} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

// ── FieldChangeBlock — GitHub-style diff card ─────────────────────────────────

function FieldChangeBlock({ change }: { change: FieldChange }) {
  const Icon = FIELD_ICON[change.field];

  return (
    <div
      style={{
        border: "0.5px solid #f0e6dc",
        borderRadius: 10,
        overflow: "hidden",
        background: "white",
      }}
    >
      {/* Field label header */}
      <div
        style={{
          padding: "8px 12px",
          background: "#fafaf8",
          borderBottom: "0.5px solid #f0e6dc",
          display: "flex",
          alignItems: "center",
          gap: 7,
        }}
      >
        <Icon size={12} strokeWidth={2} style={{ color: "#a8856b" }} />
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "#6b5546",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {change.field}
        </span>
      </div>

      {/* Diff content */}
      <div style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace", fontSize: "0.75rem" }}>
        {/* Before (removed) */}
        <div
          style={{
            display: "flex",
            background: "rgba(220,38,38,0.06)",
            padding: "8px 12px",
            gap: 10,
            alignItems: "flex-start",
            lineHeight: 1.55,
          }}
        >
          <span
            style={{
              color: "#B91C1C",
              fontWeight: 700,
              flexShrink: 0,
              userSelect: "none",
              minWidth: 10,
            }}
          >
            −
          </span>
          <span style={{ color: "#7a2222", flex: 1, wordBreak: "break-word" }}>
            {change.before}
          </span>
        </div>

        {/* After (added) */}
        <div
          style={{
            display: "flex",
            background: "rgba(16,185,129,0.06)",
            padding: "8px 12px",
            gap: 10,
            alignItems: "flex-start",
            borderTop: "0.5px solid #f5ede3",
            lineHeight: 1.55,
          }}
        >
          <span
            style={{
              color: "#059669",
              fontWeight: 700,
              flexShrink: 0,
              userSelect: "none",
              minWidth: 10,
            }}
          >
            +
          </span>
          <span style={{ color: "#1a4d3a", flex: 1, wordBreak: "break-word", fontWeight: 500 }}>
            {change.after}
          </span>
        </div>
      </div>
    </div>
  );
}