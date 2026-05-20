"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowBigUp, MessageCircle, Image as ImageIcon } from "lucide-react";
import { type ExplorePost, STATUS_CONFIG, avatarColor } from "./types";

interface Props {
  post: ExplorePost;
  index: number;
  onClick: (post: ExplorePost) => void;
}

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

export default function PostCard({ post, index, onClick }: Props) {
  const s = STATUS_CONFIG[post.status];
  const av = avatarColor(post.pelapor.inisial);

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(post)}
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
          aspectRatio: "4/3",
          background: "linear-gradient(135deg, #e0dcd8, #cac6c2)",
          flexShrink: 0,
        }}
      >
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.judul}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ImageIcon size={26} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
          </div>
        )}

        {/* Status badge */}
        <div
          style={{
            position: "absolute", top: 9, left: 9,
            display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.05em",
            textTransform: "uppercase", padding: "3px 8px", borderRadius: 99,
            background: s.bg, color: s.color,
          }}
        >
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: s.dot }} />
          {s.label}
        </div>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(26,14,8,0.6) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "12px 13px", display: "flex", flexDirection: "column", flex: 1, gap: 7 }}>
        {/* Pelapor */}
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div
            style={{
              width: 24, height: 24, borderRadius: "50%",
              background: av.bg, color: av.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.55rem", fontWeight: 700, flexShrink: 0,
            }}
          >
            {post.pelapor.inisial}
          </div>
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#3d2817" }}>
            {post.pelapor.nama}
          </span>
          <span style={{ fontSize: "0.62rem", color: "#c9a892", marginLeft: "auto", whiteSpace: "nowrap" }}>
            {post.createdAt}
          </span>
        </div>

        {/* Judul */}
        <h3
          style={{
            fontSize: "0.85rem", fontWeight: 700, color: "#1a0e08",
            margin: 0, lineHeight: 1.4, letterSpacing: "-0.01em",
            overflow: "hidden", textOverflow: "ellipsis",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          }}
        >
          {post.judul}
        </h3>

        {/* Lokasi */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#a8856b" }}>
          <MapPin size={10} strokeWidth={2} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: "0.68rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {post.lokasi}
          </span>
        </div>

        {/* Engagement */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto", paddingTop: 4, borderTop: "0.5px solid #f5ede3" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: "#6b5546" }}>
            <ArrowBigUp size={13} strokeWidth={1.8} style={{ color: "#E8541C" }} />
            {fmt(post.upvote)}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: "#6b5546" }}>
            <MessageCircle size={11} strokeWidth={1.8} style={{ color: "#a8856b" }} />
            {post.komentarCount}
          </span>
        </div>
      </div>
    </motion.article>
  );
}