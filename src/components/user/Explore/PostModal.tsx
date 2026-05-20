"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, MapPin, ArrowBigUp, MessageCircle, Image as ImageIcon,
  ChevronRight, Send,
} from "lucide-react";
import { type ExplorePost, type ExploreComment, STATUS_CONFIG, avatarColor } from "./types";

interface Props {
  post: ExplorePost | null;
  onClose: () => void;
}

const MOCK_COMMENTS: ExploreComment[] = [
  { id: "c1", nama: "Budi S.", inisial: "BS", teks: "Udah lama ini masalahnya, harap cepat ditangani!", waktu: "30 menit lalu" },
  { id: "c2", nama: "Ani K.", inisial: "AK", teks: "Saya juga pernah hampir jatuh di sini.", waktu: "1 jam lalu" },
  { id: "c3", nama: "Reno A.", inisial: "RA", teks: "Sudah lapor RT tapi tidak ada respons.", waktu: "2 jam lalu" },
];

export default function PostModal({ post, onClose }: Props) {
  const [comment, setComment] = useState("");
  const [upvoted, setUpvoted] = useState(false);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = post ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [post]);

  if (!post) return null;

  const s = STATUS_CONFIG[post.status];
  const av = avatarColor(post.pelapor.inisial);

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(26,14,8,0.6)",
            backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(780px, 95vw)",
              maxHeight: "90vh",
              background: "white",
              borderRadius: 18,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
            }}
          >
            {/* Header */}
            <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, borderBottom: "0.5px solid #f5ede3", flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: av.bg, color: av.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>
                {post.pelapor.inisial}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a0e08", margin: 0 }}>{post.pelapor.nama}</p>
                <p style={{ fontSize: "0.65rem", color: "#a8856b", margin: 0 }}>{post.createdAt}</p>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 99, background: s.bg, color: s.color }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
                {s.label}
              </span>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#a8856b", padding: 4, display: "flex", borderRadius: 8, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1a0e08")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a8856b")}
              >
                <X size={19} />
              </button>
            </div>

            {/* Scrollable body */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
              {/* Image */}
              <div style={{ width: "100%", aspectRatio: "16/9", background: "linear-gradient(135deg, #e0dcd8, #cac6c2)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {post.imageUrl
                  ? <img src={post.imageUrl} alt={post.judul} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <ImageIcon size={36} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
                }
              </div>

              <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Title + desc */}
                <div>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "#1a0e08", letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.3 }}>
                    {post.judul}
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "#3d2817", lineHeight: 1.7, margin: 0 }}>
                    {post.deskripsi}
                  </p>
                </div>

                {/* Location */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#FFF5EE", border: "0.5px solid rgba(255,107,53,0.15)", borderRadius: 8, padding: "7px 12px" }}>
                  <MapPin size={13} color="#E8541C" strokeWidth={2} />
                  <span style={{ fontSize: "0.78rem", color: "#3d2817", fontWeight: 500 }}>{post.lokasi}</span>
                </div>

                {/* Engagement */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 10, borderTop: "0.5px solid #f5ede3" }}>
                  <button
                    onClick={() => setUpvoted((p) => !p)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      padding: "8px 16px", borderRadius: 99, border: "none",
                      background: upvoted ? "linear-gradient(135deg, #FF6B35, #E8541C)" : "#fafaf8",
                      color: upvoted ? "white" : "#3d2817",
                      fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                      boxShadow: upvoted ? "0 4px 12px rgba(255,107,53,0.25)" : "none",
                      transition: "all 0.2s",
                    }}
                  >
                    <ArrowBigUp size={16} strokeWidth={1.8} />
                    {post.upvote + (upvoted ? 1 : 0)} Dukung
                  </button>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "#6b5546" }}>
                    <MessageCircle size={14} strokeWidth={1.8} style={{ color: "#a8856b" }} />
                    {post.komentarCount} komentar
                  </span>
                </div>

                {/* Comments */}
                <div>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#a8856b", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px" }}>
                    Komentar
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {MOCK_COMMENTS.map((c) => {
                      const ca = avatarColor(c.inisial);
                      return (
                        <div key={c.id} style={{ display: "flex", gap: 10 }}>
                          <div style={{ width: 30, height: 30, borderRadius: "50%", background: ca.bg, color: ca.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, flexShrink: 0 }}>
                            {c.inisial}
                          </div>
                          <div style={{ background: "#fafaf8", borderRadius: "0 10px 10px 10px", padding: "9px 12px", flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1a0e08" }}>{c.nama}</span>
                              <span style={{ fontSize: "0.62rem", color: "#c9a892" }}>{c.waktu}</span>
                            </div>
                            <p style={{ fontSize: "0.78rem", color: "#3d2817", margin: 0, lineHeight: 1.55 }}>{c.teks}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Comment input */}
            <div style={{ padding: "12px 18px", borderTop: "0.5px solid #f5ede3", display: "flex", gap: 10, alignItems: "center", flexShrink: 0, background: "#fafaf8" }}>
              <input
                type="text"
                placeholder="Tulis komentar..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && comment.trim()) setComment(""); }}
                style={{
                  flex: 1, background: "white", border: "0.5px solid #f0e6dc", borderRadius: 99,
                  padding: "10px 16px", fontSize: "0.82rem", color: "#1a0e08", fontFamily: "inherit",
                  outline: "none", transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,107,53,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#f0e6dc")}
              />
              <button
                onClick={() => { if (comment.trim()) setComment(""); }}
                disabled={!comment.trim()}
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: comment.trim() ? "linear-gradient(135deg, #FF6B35, #E8541C)" : "#f0e6dc",
                  border: "none", cursor: comment.trim() ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: comment.trim() ? "white" : "#c9a892",
                  boxShadow: comment.trim() ? "0 4px 12px rgba(255,107,53,0.22)" : "none",
                  transition: "all 0.2s", flexShrink: 0,
                }}
              >
                <Send size={15} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}