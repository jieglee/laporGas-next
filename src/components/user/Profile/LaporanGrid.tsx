"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, FileText } from "lucide-react";
import { type UserLaporan, STATUS_BADGE } from "@/lib/mock-user";

const IconUpvote = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
    <path d="M6.5 2L11 7H8.5v4h-4V7H2L6.5 2z" />
  </svg>
);

const IconPhoto = () => (
  <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="4" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
    <circle cx="8" cy="10" r="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
    <path d="M2 15l5-4 4 3 3-2 6 5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

function GridItem({ laporan, index }: { laporan: UserLaporan; index: number }) {
  const s = STATUS_BADGE[laporan.status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/user/laporan/${laporan.id}`}
        style={{
          position: "relative",
          display: "block",
          aspectRatio: "1/1",
          background: "linear-gradient(135deg, #d0ccc8, #b8b4b0)",
          borderRadius: 4,
          overflow: "hidden",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconPhoto />
        </div>

        <div style={{ position: "absolute", top: 8, left: 8 }}>
          <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 7px", borderRadius: 99, background: s.bg, color: s.color }}>
            {laporan.status}
          </span>
        </div>

        <div style={{ position: "absolute", top: 8, right: 8, fontSize: "0.55rem", fontWeight: 600, background: "rgba(0,0,0,0.4)", color: "white", padding: "2px 6px", borderRadius: 99, backdropFilter: "blur(4px)" }}>
          {laporan.fotoCount}
        </div>

        <div
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: 0, transition: "opacity 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "white", fontSize: "0.78rem", fontWeight: 700 }}>
            <IconUpvote />
            {fmt(laporan.upvote)}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "white", fontSize: "0.78rem", fontWeight: 700 }}>
            <MessageCircle size={13} fill="white" strokeWidth={0} />
            {laporan.komentar}
          </span>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 10px 8px", background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}>
          <p style={{ fontSize: "0.65rem", color: "white", fontWeight: 600, margin: 0, lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {laporan.judul}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

interface Props {
  laporan: UserLaporan[];
}

export default function LaporanGrid({ laporan }: Props) {
  if (laporan.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "64px 0" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,107,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <FileText size={22} color="#E8541C" strokeWidth={1.8} />
        </div>
        <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a0e08", marginBottom: 4 }}>
          Belum ada laporan
        </p>
        <p style={{ fontSize: "0.75rem", color: "#a8856b" }}>
          Laporan yang kamu buat akan muncul di sini
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
      {laporan.map((l, i) => (
        <GridItem key={l.id} laporan={l} index={i} />
      ))}
    </div>
  );
}