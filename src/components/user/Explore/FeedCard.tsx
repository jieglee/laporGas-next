"use client";

import { useState } from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { type LaporanItem, STATUS_CONFIG, KATEGORI_CONFIG } from "@/lib/mock-explore";

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

const IconUpvote = ({ filled }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 13 13" fill="none">
    <path d="M6.5 2L11 7H8.5v4h-4V7H2L6.5 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill={filled ? "currentColor" : "none"} />
  </svg>
);

interface Props {
  laporan: LaporanItem;
  active: boolean;
  onClick: () => void;
}

export default function FeedCard({ laporan, active, onClick }: Props) {
  const [upvoted, setUpvoted] = useState(false);
  const [count, setCount] = useState(laporan.upvote);
  const s = STATUS_CONFIG[laporan.status];

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvoted((p) => !p);
    setCount((p) => (upvoted ? p - 1 : p + 1));
  };

  return (
    <article
      style={{
        background: "white",
        border: `0.5px solid ${active ? "rgba(255,107,53,0.4)" : "#f0e6dc"}`,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 20,
        boxShadow: active ? "0 4px 24px rgba(255,107,53,0.1)" : "none",
        transition: "all 0.2s",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6B35, #E8541C)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "white",
            flexShrink: 0,
          }}
        >
          {laporan.pelapor.inisial}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a0e08", margin: 0 }}>
            {laporan.pelapor.nama}
          </p>
          <p style={{ fontSize: "0.65rem", color: "#a8856b", margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
            <MapPin size={10} /> {laporan.lokasi} · {laporan.waktu}
          </p>
        </div>
        <span
          style={{
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            padding: "3px 9px",
            borderRadius: 99,
            background: s.bg,
            color: s.color,
            flexShrink: 0,
          }}
        >
          {s.label}
        </span>
      </div>

      {/* Photo — big, clickable */}
      <div
        onClick={onClick}
        style={{
          aspectRatio: "4/3",
          background: "linear-gradient(135deg, #d0ccc8, #b8b4b0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="4" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <circle cx="8" cy="10" r="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <path d="M2 15l5-4 4 3 3-2 6 5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>

        {/* foto count */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: "0.6rem",
            fontWeight: 600,
            background: "rgba(0,0,0,0.45)",
            color: "white",
            padding: "2px 8px",
            borderRadius: 99,
          }}
        >
          {laporan.fotoCount} foto
        </div>

        {/* kategori */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            color: "white",
            padding: "3px 9px",
            borderRadius: 99,
          }}
        >
          {KATEGORI_CONFIG[laporan.kategori]}
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: "10px 14px 4px", display: "flex", gap: 14, alignItems: "center" }}>
        <button
          onClick={handleUpvote}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            color: upvoted ? "#E8541C" : "#a8856b",
            fontSize: "0.78rem",
            fontWeight: 600,
            transition: "color 0.15s",
          }}
        >
          <IconUpvote filled={upvoted} />
          {fmt(count)}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            color: active ? "#E8541C" : "#a8856b",
            fontSize: "0.78rem",
            fontWeight: 600,
            transition: "color 0.15s",
          }}
        >
          <MessageCircle size={15} />
          {laporan.komentar.length}
        </button>
      </div>

      {/* Caption */}
      <div style={{ padding: "6px 14px 14px" }}>
        <p style={{ fontSize: "0.82rem", color: "#1a0e08", lineHeight: 1.5, margin: 0 }}>
          <span style={{ fontWeight: 700 }}>{laporan.pelapor.nama.split(" ")[0]} </span>
          {laporan.judul}
        </p>
        {laporan.komentar.length > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0 0",
              fontSize: "0.75rem",
              color: "#a8856b",
              display: "block",
            }}
          >
            Lihat {laporan.komentar.length} komentar
          </button>
        )}
      </div>
    </article>
  );
}