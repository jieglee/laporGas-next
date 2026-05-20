"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin, ArrowBigUp, MessageCircle, Image as ImageIcon,
  Check, X as XIcon, Loader, CheckCircle2, ChevronRight,
} from "lucide-react";
import {
  type AdminLaporan,
  type AdminLaporanStatus,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  KATEGORI_LABEL,
  avatarColor,
} from "./types";

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

interface Props {
  laporan: AdminLaporan;
  index: number;
  onAction: (
    id: string,
    action: { type: "approve" | "rejectAsk" | "update"; status?: AdminLaporanStatus }
  ) => void;
}

export default function LaporanCard({ laporan, index, onAction }: Props) {
  const router = useRouter();
  const s = STATUS_CONFIG[laporan.status];
  const p = PRIORITY_CONFIG[laporan.priority];
  const avatar = avatarColor(laporan.pelapor.inisial);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => router.push(`/admin/laporan/${laporan.id}`)}
      style={{
        background: "white",
        border: "0.5px solid #f0e6dc",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s",
      }}
      whileHover={{
        borderColor: "rgba(255,107,53,0.3)",
        boxShadow: "0 8px 24px rgba(255,107,53,0.09)",
        y: -2,
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          background: "linear-gradient(135deg, #e0dcd8, #cac6c2)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageIcon size={28} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
        </div>

        {/* Status — top left */}
        <div
          style={{
            position: "absolute",
            top: 9,
            left: 9,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "3px 9px",
            borderRadius: 99,
            background: s.bg,
            color: s.color,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
          {s.label}
        </div>

        {/* Priority — top right */}
        <div
          style={{
            position: "absolute",
            top: 9,
            right: 9,
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "3px 9px",
            borderRadius: 99,
            background: p.bg,
            color: p.color,
          }}
        >
          {p.label}
        </div>

        {/* Foto count — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 9,
            right: 9,
            fontSize: "0.6rem",
            fontWeight: 600,
            background: "rgba(0,0,0,0.52)",
            color: "white",
            padding: "3px 8px",
            borderRadius: 99,
            backdropFilter: "blur(4px)",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <ImageIcon size={9} strokeWidth={2} />
          {laporan.fotoCount}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "13px 14px", display: "flex", flexDirection: "column", flex: 1, gap: 8 }}>

        {/* ID + Kategori */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
              fontSize: "0.6rem",
              fontWeight: 700,
              color: "#8a6f5e",
              background: "#fafaf8",
              border: "0.5px solid #f0e6dc",
              padding: "2px 7px",
              borderRadius: 5,
            }}
          >
            {laporan.id}
          </span>
          <span
            style={{
              fontSize: "0.58rem",
              fontWeight: 700,
              color: "#E8541C",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {KATEGORI_LABEL[laporan.kategori]}
          </span>
        </div>

        {/* Judul */}
        <h3
          style={{
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "#1a0e08",
            margin: 0,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {laporan.judul}
        </h3>

        {/* Lokasi */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#a8856b" }}>
          <MapPin size={11} strokeWidth={1.8} style={{ flexShrink: 0 }} />
          <span
            style={{
              fontSize: "0.7rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {laporan.lokasi}
          </span>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "0.5px solid #f5ede3" }} />

        {/* Pelapor + engagement */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: avatar.bg,
                color: avatar.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.55rem",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {laporan.pelapor.inisial}
            </div>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#3d2817",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {laporan.pelapor.nama}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#a8856b", fontSize: "0.68rem", flexShrink: 0 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <ArrowBigUp size={11} strokeWidth={1.8} />
              {fmt(laporan.upvote)}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <MessageCircle size={10} strokeWidth={1.8} />
              {laporan.komentarCount}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
          {laporan.status === "pending" && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onAction(laporan.id, { type: "approve" }); }}
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  padding: "7px 0",
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                  color: "white",
                  border: "none",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: "0 3px 10px rgba(255,107,53,0.22)",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(255,107,53,0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 3px 10px rgba(255,107,53,0.22)"; }}
              >
                <Check size={12} strokeWidth={2.5} /> Approve
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onAction(laporan.id, { type: "rejectAsk" }); }}
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  padding: "7px 0",
                  borderRadius: 8,
                  background: "white",
                  color: "#B91C1C",
                  border: "0.5px solid #FEE2E2",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              >
                <XIcon size={12} strokeWidth={2.5} /> Reject
              </button>
            </>
          )}

          {laporan.status === "approved" && (
            <button
              onClick={(e) => { e.stopPropagation(); onAction(laporan.id, { type: "update", status: "on_progress" }); }}
              style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "7px 0",
                borderRadius: 8,
                background: "white",
                color: "#C2410C",
                border: "0.5px solid #FFEDD5",
                fontSize: "0.72rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#FFF7ED")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              <Loader size={12} strokeWidth={1.8} /> On Progress
            </button>
          )}

          {laporan.status === "on_progress" && (
            <button
              onClick={(e) => { e.stopPropagation(); onAction(laporan.id, { type: "update", status: "completed" }); }}
              style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "7px 0",
                borderRadius: 8,
                background: "white",
                color: "#047857",
                border: "0.5px solid #D1FAE5",
                fontSize: "0.72rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F0FDF4")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              <CheckCircle2 size={12} strokeWidth={1.8} /> Selesai
            </button>
          )}

          {/* Chevron detail */}
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/admin/laporan/${laporan.id}`); }}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#fafaf8",
              border: "0.5px solid #f0e6dc",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a8856b",
              flexShrink: 0,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF5EE"; e.currentTarget.style.color = "#E8541C"; e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fafaf8"; e.currentTarget.style.color = "#a8856b"; e.currentTarget.style.borderColor = "#f0e6dc"; }}
          >
            <ChevronRight size={13} strokeWidth={2} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}