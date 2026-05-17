"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, ArrowBigUp, MessageCircle, Eye, Check, X,
  Loader, CheckCircle2,
} from "lucide-react";
import {
  type AdminLaporan,
  type AdminLaporanStatus,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  KATEGORI_LABEL,
} from "./types";

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

interface Props {
  laporan: AdminLaporan;
  index: number;
  onPreview: (l: AdminLaporan) => void;
  onAction: (id: string, action: { type: "approve" | "reject" | "update"; status?: AdminLaporanStatus }) => void;
}

// Action button factory
function ActionBtn({
  onClick,
  children,
  variant = "default",
  title,
}: {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  variant?: "default" | "primary" | "danger";
  title: string;
}) {
  const styles = {
    default: { bg: "white", color: "#3d2817", border: "#f0e6dc", hoverBg: "#FFF5EE", hoverColor: "#E8541C", hoverBorder: "rgba(255,107,53,0.3)" },
    primary: { bg: "linear-gradient(135deg, #FF6B35, #E8541C)", color: "white", border: "transparent", hoverBg: "linear-gradient(135deg, #FF6B35, #E8541C)", hoverColor: "white", hoverBorder: "transparent" },
    danger:  { bg: "white", color: "#B91C1C", border: "#FEE2E2", hoverBg: "#FEF2F2", hoverColor: "#B91C1C", hoverBorder: "#FECACA" },
  };
  const s = styles[variant];

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(e); }}
      title={title}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 8,
        background: s.bg,
        color: s.color,
        border: `0.5px solid ${s.border}`,
        cursor: "pointer",
        transition: "all 0.15s",
        flexShrink: 0,
        boxShadow: variant === "primary" ? "0 2px 8px rgba(255,107,53,0.22)" : "none",
      }}
      onMouseEnter={(e) => {
        if (variant !== "primary") {
          e.currentTarget.style.background = s.hoverBg;
          e.currentTarget.style.color = s.hoverColor;
          e.currentTarget.style.borderColor = s.hoverBorder;
        } else {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 6px 14px rgba(255,107,53,0.35)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = s.bg;
        e.currentTarget.style.color = s.color;
        e.currentTarget.style.borderColor = s.border;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = variant === "primary" ? "0 2px 8px rgba(255,107,53,0.22)" : "none";
      }}
    >
      {children}
    </button>
  );
}

export default function LaporanRow({ laporan, index, onPreview, onAction }: Props) {
  const s = STATUS_CONFIG[laporan.status];
  const p = PRIORITY_CONFIG[laporan.priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.02, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) 130px 110px 100px 110px auto",
          gap: 14,
          padding: "14px 20px",
          alignItems: "center",
          transition: "background 0.15s",
          borderBottom: "0.5px solid #f5ede3",
          cursor: "default",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#fafaf8")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        {/* Laporan: avatar + judul + meta */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6B35, #E8541C)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "white",
              flexShrink: 0,
            }}
          >
            {laporan.pelapor.inisial}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p
              style={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#1a0e08",
                margin: 0,
                marginBottom: 3,
                lineHeight: 1.35,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {laporan.judul}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.68rem", color: "#a8856b" }}>
              <span style={{ fontWeight: 500 }}>{laporan.pelapor.nama}</span>
              <span style={{ color: "#d4b89e" }}>·</span>
              <MapPin size={10} strokeWidth={1.8} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {laporan.lokasi}
              </span>
              <span style={{ color: "#d4b89e" }}>·</span>
              <span>{laporan.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Kategori */}
        <span style={{ fontSize: "0.72rem", color: "#6b5546", fontWeight: 500 }}>
          {KATEGORI_LABEL[laporan.kategori]}
        </span>

        {/* Status */}
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "3px 9px",
            borderRadius: 99,
            background: s.bg,
            color: s.color,
            justifySelf: "start",
          }}
        >
          {s.label}
        </span>

        {/* Priority */}
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "3px 9px",
            borderRadius: 99,
            background: p.bg,
            color: p.color,
            justifySelf: "start",
          }}
        >
          {p.label}
        </span>

        {/* Engagement */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end", color: "#a8856b", fontSize: "0.72rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <ArrowBigUp size={13} strokeWidth={1.8} />
            {fmt(laporan.upvote)}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <MessageCircle size={12} strokeWidth={1.8} />
            {laporan.komentarCount}
          </span>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <ActionBtn
            title="Preview"
            onClick={() => onPreview(laporan)}
          >
            <Eye size={14} strokeWidth={1.8} />
          </ActionBtn>

          {laporan.status === "pending" && (
            <>
              <ActionBtn
                title="Approve"
                variant="primary"
                onClick={() => onAction(laporan.id, { type: "approve" })}
              >
                <Check size={14} strokeWidth={2.2} />
              </ActionBtn>
              <ActionBtn
                title="Reject"
                variant="danger"
                onClick={() => onAction(laporan.id, { type: "reject" })}
              >
                <X size={14} strokeWidth={2.2} />
              </ActionBtn>
            </>
          )}

          {laporan.status === "approved" && (
            <ActionBtn
              title="Set on progress"
              onClick={() => onAction(laporan.id, { type: "update", status: "on_progress" })}
            >
              <Loader size={13} strokeWidth={1.8} />
            </ActionBtn>
          )}

          {laporan.status === "on_progress" && (
            <ActionBtn
              title="Mark completed"
              onClick={() => onAction(laporan.id, { type: "update", status: "completed" })}
            >
              <CheckCircle2 size={13} strokeWidth={1.8} />
            </ActionBtn>
          )}

          <Link
            href={`/admin/laporan/${laporan.id}`}
            style={{ textDecoration: "none", display: "inline-flex" }}
          >
            <ActionBtn title="Lihat detail" onClick={() => {}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </ActionBtn>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}