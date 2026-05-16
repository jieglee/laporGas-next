"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin, X, Send, MoreHorizontal, Bookmark,
  Share2, Flag, Navigation
} from "lucide-react";
import { type LaporanItem, STATUS_CONFIG, KATEGORI_CONFIG } from "@/lib/mock-explore";

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

function Avatar({ inisial, bg = "#f5ede3", color = "#a8856b", size = 32 }: {
  inisial: string; bg?: string; color?: string; size?: number;
}) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.3, fontWeight: 700, color, flexShrink: 0,
    }}>
      {inisial}
    </div>
  );
}

const IconHeart = ({ filled }: { filled?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "#E8541C" : "none"} stroke={filled ? "#E8541C" : "#3d2817"} strokeWidth="1.8">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const IconComment = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3d2817" strokeWidth="1.8">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" strokeLinejoin="round" />
  </svg>
);

interface Props {
  laporan: LaporanItem | null;
  onClose: () => void;
}

export default function CommentModal({ laporan, onClose }: Props) {
  const [tab, setTab] = useState<"komentar" | "tindaklanjut">("komentar");
  const [input, setInput] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(laporan?.upvote ?? 0);
  const [bookmarked, setBookmarked] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = laporan ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [laporan]);

  // Reset state when laporan changes
  useEffect(() => {
    if (laporan) {
      setLiked(false);
      setLikeCount(laporan.upvote);
      setBookmarked(false);
      setTab("komentar");
      setInput("");
      setShowMore(false);
    }
  }, [laporan?.id]);

  if (!laporan) return null;
  const s = STATUS_CONFIG[laporan.status];

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.75)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            width: "min(1080px, 95vw)",
            height: "min(680px, 90vh)",
            borderRadius: 6,
            overflow: "hidden",
            background: "white",
            boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          }}
        >
          {/* LEFT: Photo */}
          <div style={{
            flex: 1, background: "#1a1412",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              width: "100%", height: "100%",
              background: "linear-gradient(135deg, #2a2420, #1a1210)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="52" height="52" viewBox="0 0 22 22" fill="none">
                <rect x="2" y="4" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <circle cx="8" cy="10" r="2" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <path d="M2 15l5-4 4 3 3-2 6 5" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Status */}
            <div style={{ position: "absolute", top: 14, left: 14 }}>
              <span style={{
                fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.07em",
                textTransform: "uppercase", padding: "3px 10px", borderRadius: 99,
                background: s.bg, color: s.color,
              }}>
                {s.label}
              </span>
            </div>

            {/* Bottom overlay */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "40px 16px 16px",
              background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            }}>
              <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
                {KATEGORI_CONFIG[laporan.kategori]}
              </span>
              <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)" }}>
                {laporan.fotoCount} foto
              </span>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: 14, right: 14,
                width: 30, height: 30, borderRadius: "50%",
                background: "rgba(0,0,0,0.4)", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.65)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.4)")}
            >
              <X size={14} />
            </button>
          </div>

          {/* RIGHT: Comments panel */}
          <div style={{ width: 400, display: "flex", flexDirection: "column", background: "white", flexShrink: 0, borderLeft: "0.5px solid #f0e6dc" }}>

            {/* Header */}
            <div style={{
              padding: "13px 16px", borderBottom: "0.5px solid #f5ede3",
              display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
            }}>
              <Avatar inisial={laporan.pelapor.inisial} bg="linear-gradient(135deg, #FF6B35, #E8541C)" color="white" size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1a0e08", margin: 0 }}>
                  {laporan.pelapor.nama}
                </p>
                <p style={{ fontSize: "0.65rem", color: "#a8856b", margin: 0, display: "flex", alignItems: "center", gap: 3 }}>
                  <MapPin size={10} /> {laporan.lokasi} · {laporan.waktu}
                </p>
              </div>

              {/* More options */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowMore((p) => !p)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#a8856b", padding: 4, display: "flex" }}
                >
                  <MoreHorizontal size={18} />
                </button>

                {showMore && (
                  <div style={{
                    position: "absolute", top: "100%", right: 0, zIndex: 10,
                    background: "white", border: "0.5px solid #f0e6dc", borderRadius: 12,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)", overflow: "hidden",
                    minWidth: 180,
                  }}>
                    {[
                      { icon: <Navigation size={14} />, label: "Lihat di Maps", action: () => window.open(`https://maps.google.com/?q=${laporan.lokasi}`) },
                      { icon: <Share2 size={14} />, label: "Bagikan laporan", action: () => {} },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => { item.action(); setShowMore(false); }}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", gap: 10,
                          padding: "11px 14px", background: "none", border: "none",
                          cursor: "pointer", fontSize: "0.8rem", fontWeight: 500,
                          color: "#3d2817",
                          borderBottom: i < 2 ? "0.5px solid #f5ede3" : "none",
                          transition: "background 0.1s",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#fafaf8")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                      >
                        {item.icon} {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "0.5px solid #f5ede3", padding: "0 16px", flexShrink: 0 }}>
              {(["komentar", "tindaklanjut"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    fontSize: "0.72rem", fontWeight: 600,
                    padding: "10px 0", marginRight: 18,
                    cursor: "pointer", background: "none", border: "none",
                    borderBottom: `1.5px solid ${tab === t ? "#E8541C" : "transparent"}`,
                    color: tab === t ? "#1a0e08" : "#a8856b",
                    transition: "all 0.15s",
                  }}
                >
                  {t === "komentar"
                    ? `Komentar (${laporan.komentar.length})`
                    : `Tindak Lanjut (${laporan.tindakLanjut.length})`}
                </button>
              ))}
            </div>

            {/* Scrollable — caption + comments together */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>

              {/* Caption as first item */}
              <div style={{ display: "flex", gap: 10, marginBottom: 18, paddingBottom: 18, borderBottom: "0.5px solid #f5ede3" }}>
                <Avatar inisial={laporan.pelapor.inisial} bg="linear-gradient(135deg, #FF6B35, #E8541C)" color="white" size={30} />
                <div>
                  <p style={{ fontSize: "0.82rem", color: "#1a0e08", lineHeight: 1.55, margin: 0 }}>
                    <span style={{ fontWeight: 700 }}>{laporan.pelapor.nama} </span>
                    {laporan.judul}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#8a6f5e", lineHeight: 1.6, margin: "5px 0 4px" }}>
                    {laporan.deskripsi}
                  </p>
                  <span style={{ fontSize: "0.62rem", color: "#c9a892" }}>{laporan.waktu}</span>
                </div>
              </div>

              {/* Comments / Tindak Lanjut */}
              {tab === "komentar" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {laporan.komentar.length === 0 ? (
                    <p style={{ fontSize: "0.78rem", color: "#c9a892", textAlign: "center", padding: "24px 0" }}>
                      Belum ada komentar.
                    </p>
                  ) : laporan.komentar.map((c) => (
                    <div key={c.id} style={{ display: "flex", gap: 10 }}>
                      <Avatar inisial={c.inisial} size={30} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "0.82rem", color: "#1a0e08", lineHeight: 1.5, margin: 0 }}>
                          <span style={{ fontWeight: 700 }}>{c.nama} </span>
                          {c.teks}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 5 }}>
                          <span style={{ fontSize: "0.62rem", color: "#c9a892" }}>{c.waktu} lalu</span>
                          <button style={{ fontSize: "0.62rem", color: "#a8856b", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 }}>
                            {c.upvote} suka
                          </button>
                          <button style={{ fontSize: "0.62rem", color: "#a8856b", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                            Balas
                          </button>
                        </div>
                      </div>
                      <button style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 0", color: "#d4b89e", alignSelf: "flex-start" }}>
                        <IconHeart />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {laporan.tindakLanjut.length === 0 ? (
                    <p style={{ fontSize: "0.78rem", color: "#c9a892", textAlign: "center", padding: "24px 0" }}>
                      Belum ada tindak lanjut resmi.
                    </p>
                  ) : laporan.tindakLanjut.map((n) => (
                    <div key={n.id} style={{ display: "flex", gap: 10 }}>
                      <Avatar inisial={n.inisial} bg="#EFF6FF" color="#1D4ED8" size={30} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1D4ED8" }}>{n.instansi}</span>
                          <span style={{ fontSize: "0.58rem", fontWeight: 700, background: "#DBEAFE", color: "#1D4ED8", padding: "2px 6px", borderRadius: 99 }}>
                            ✓ Resmi
                          </span>
                          <span style={{ fontSize: "0.62rem", color: "#c9a892" }}>{n.waktu}</span>
                        </div>
                        <p style={{
                          fontSize: "0.75rem", color: "#444", lineHeight: 1.65,
                          padding: "10px 12px", background: "#F8FBFF",
                          border: "0.5px solid #DBEAFE", borderRadius: 8,
                          borderLeft: "2px solid #3B82F6", margin: 0,
                        }}>
                          {n.teks}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions bar */}
            <div style={{ borderTop: "0.5px solid #f5ede3", padding: "10px 16px", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                <button
                  onClick={() => { setLiked((p) => !p); setLikeCount((p) => (liked ? p - 1 : p + 1)); }}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, transition: "transform 0.15s", transform: liked ? "scale(1.12)" : "scale(1)" }}
                >
                  <IconHeart filled={liked} />
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  <IconComment />
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#3d2817" }}>
                  <Share2 size={20} strokeWidth={1.8} />
                </button>
                <button
                  onClick={() => setBookmarked((p) => !p)}
                  style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", padding: 0, color: bookmarked ? "#E8541C" : "#3d2817", transition: "color 0.15s" }}
                >
                  <Bookmark size={20} strokeWidth={1.8} fill={bookmarked ? "#E8541C" : "none"} />
                </button>
              </div>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a0e08", margin: "0 0 2px" }}>
                {fmt(likeCount)} dukungan
              </p>
              <p style={{ fontSize: "0.62rem", color: "#c9a892", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {laporan.waktu}
              </p>
            </div>

            {/* Comment input */}
            <div style={{
              borderTop: "0.5px solid #f5ede3", padding: "11px 16px",
              display: "flex", gap: 10, alignItems: "center", flexShrink: 0,
            }}>
              <Avatar inisial="AJ" bg="linear-gradient(135deg, #FF6B35, #E8541C)" color="white" size={28} />
              <input
                type="text"
                placeholder="Tambahkan komentar..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) setInput(""); }}
                style={{
                  flex: 1, border: "none", outline: "none",
                  fontSize: "0.82rem", color: "#1a0e08",
                  fontFamily: "inherit", background: "transparent", padding: 0,
                }}
              />
              {input.trim() && (
                <button
                  onClick={() => setInput("")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <Send size={16} color="#E8541C" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}