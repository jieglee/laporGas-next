"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Image as ImageIcon, ArrowBigUp, MessageCircle,
  Calendar, ChevronRight, Tag,
} from "lucide-react";

export type UserLaporanStatus = "pending" | "approved" | "on_progress" | "completed" | "rejected";

export interface UserLaporan {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  status: UserLaporanStatus;
  imageUrl?: string | null;
  upvote: number;
  komentarCount: number;
  createdAt: string;
}

const STATUS_CONFIG: Record<UserLaporanStatus, { label: string; bg: string; color: string; dot: string }> = {
  pending:     { label: "Menunggu",   bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
  approved:    { label: "Disetujui",  bg: "#DBEAFE", color: "#1D4ED8", dot: "#3B82F6" },
  on_progress: { label: "Diproses",   bg: "#FFEDD5", color: "#C2410C", dot: "#FB923C" },
  completed:   { label: "Selesai",    bg: "#D1FAE5", color: "#047857", dot: "#10B981" },
  rejected:    { label: "Ditolak",    bg: "#FEE2E2", color: "#B91C1C", dot: "#EF4444" },
};

interface Props {
  laporan: UserLaporan;
  index: number;
}

export default function UserLaporanCard({ laporan, index }: Props) {
  const router = useRouter();
  const s = STATUS_CONFIG[laporan.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => router.push(`/user/laporan/${laporan.id}`)}
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
        boxShadow: "0 8px 28px rgba(255,107,53,0.1)",
        y: -3,
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
        {laporan.imageUrl ? (
          <img
            src={laporan.imageUrl}
            alt={laporan.judul}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ImageIcon size={28} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
          </div>
        )}

        {/* Status badge */}
        <div
          style={{
            position: "absolute", top: 9, left: 9,
            display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.05em",
            textTransform: "uppercase", padding: "3px 9px", borderRadius: 99,
            background: s.bg, color: s.color,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
          {s.label}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "13px 15px", display: "flex", flexDirection: "column", flex: 1, gap: 8 }}>
        {/* Kategori */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Tag size={11} strokeWidth={2} style={{ color: "#E8541C" }} />
          <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#E8541C", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {laporan.kategori}
          </span>
        </div>

        {/* Judul */}
        <h3
          style={{
            fontSize: "0.9rem", fontWeight: 700, color: "#1a0e08",
            margin: 0, lineHeight: 1.4, letterSpacing: "-0.01em",
            overflow: "hidden", textOverflow: "ellipsis",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          }}
        >
          {laporan.judul}
        </h3>

        {/* Deskripsi */}
        <p
          style={{
            fontSize: "0.75rem", color: "#8a6f5e", margin: 0,
            lineHeight: 1.55, overflow: "hidden", textOverflow: "ellipsis",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          }}
        >
          {laporan.deskripsi}
        </p>

        <div style={{ borderTop: "0.5px solid #f5ede3", marginTop: 2 }} />

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#a8856b", fontSize: "0.68rem" }}>
            <Calendar size={11} strokeWidth={1.8} />
            {laporan.createdAt}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#a8856b", fontSize: "0.68rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <ArrowBigUp size={11} strokeWidth={1.8} />
              {laporan.upvote}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <MessageCircle size={10} strokeWidth={1.8} />
              {laporan.komentarCount}
            </span>
          </div>
        </div>

        {/* Lihat detail button */}
        <button
          onClick={(e) => { e.stopPropagation(); router.push(`/user/laporan/${laporan.id}`); }}
          style={{
            width: "100%",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            gap: 6, padding: "8px 0",
            background: "#FFF5EE",
            color: "#E8541C",
            border: "0.5px solid rgba(255,107,53,0.2)",
            borderRadius: 9, fontSize: "0.75rem", fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #FF6B35, #E8541C)";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor = "transparent";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFF5EE";
            e.currentTarget.style.color = "#E8541C";
            e.currentTarget.style.borderColor = "rgba(255,107,53,0.2)";
          }}
        >
          Lihat Detail <ChevronRight size={13} strokeWidth={2} />
        </button>
      </div>
    </motion.article>
  );
}