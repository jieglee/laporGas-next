"use client";

import { motion } from "framer-motion";
import {
  MapPin, ArrowBigUp, MessageCircle, Image as ImageIcon, Clock,
  Check, X as XIcon, Loader, CheckCircle2, MoreHorizontal,
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
  onClick: (l: AdminLaporan) => void;
  onAction: (id: string, action: { type: "approve" | "rejectAsk" | "update"; status?: AdminLaporanStatus }) => void;
}

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
    default: { bg: "white", color: "#3d2817", border: "#f0e6dc" },
    primary: { bg: "linear-gradient(135deg, #FF6B35, #E8541C)", color: "white", border: "transparent" },
    danger:  { bg: "white", color: "#B91C1C", border: "#FEE2E2" },
  };
  const s = styles[variant];

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(e); }}
      title={title}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "7px 12px",
        borderRadius: 8,
        background: s.bg,
        color: s.color,
        border: `0.5px solid ${s.border}`,
        cursor: "pointer",
        transition: "all 0.15s",
        fontSize: "0.72rem",
        fontWeight: 600,
        fontFamily: "inherit",
        boxShadow: variant === "primary" ? "0 4px 12px rgba(255,107,53,0.22)" : "none",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (variant === "default") {
          e.currentTarget.style.background = "#FFF5EE";
          e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
          e.currentTarget.style.color = "#E8541C";
        } else if (variant === "primary") {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,107,53,0.35)";
        } else if (variant === "danger") {
          e.currentTarget.style.background = "#FEF2F2";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = variant === "primary" ? "linear-gradient(135deg, #FF6B35, #E8541C)" : variant === "danger" ? "white" : "white";
        if (variant === "default") {
          e.currentTarget.style.borderColor = "#f0e6dc";
          e.currentTarget.style.color = "#3d2817";
        }
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = variant === "primary" ? "0 4px 12px rgba(255,107,53,0.22)" : "none";
      }}
    >
      {children}
    </button>
  );
}

export default function LaporanCard({ laporan, index, onClick, onAction }: Props) {
  const s = STATUS_CONFIG[laporan.status];
  const p = PRIORITY_CONFIG[laporan.priority];
  const avatar = avatarColor(laporan.pelapor.inisial);

  const showApproveReject = laporan.status === "pending";
  const showSetProgress = laporan.status === "approved";
  const showMarkCompleted = laporan.status === "on_progress";

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(laporan)}
      style={{
        background: "white",
        border: "0.5px solid #f0e6dc",
        borderRadius: 14,
        padding: 0,
        marginBottom: 10,
        cursor: "pointer",
        transition: "all 0.2s",
        overflow: "hidden",
      }}
      whileHover={{
        borderColor: "rgba(255,107,53,0.25)",
        boxShadow: "0 6px 20px rgba(255,107,53,0.08)",
        y: -1,
      }}
    >
      <div style={{ display: "flex", gap: 14, padding: "16px 18px" }}>
        {/* Photo thumbnail */}
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: 10,
            background: "linear-gradient(135deg, #d0ccc8, #b8b4b0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <ImageIcon size={24} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
          <div
            style={{
              position: "absolute",
              bottom: 6,
              right: 6,
              fontSize: "0.58rem",
              fontWeight: 600,
              background: "rgba(0,0,0,0.55)",
              color: "white",
              padding: "2px 7px",
              borderRadius: 99,
              backdropFilter: "blur(4px)",
              display: "inline-flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <ImageIcon size={9} strokeWidth={2} />
            {laporan.fotoCount}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {/* Top row: ID + status + priority + time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 7,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#6b5546",
                background: "#fafaf8",
                border: "0.5px solid #f0e6dc",
                padding: "2px 8px",
                borderRadius: 6,
              }}
            >
              {laporan.id}
            </span>

            {/* Status with dot */}
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                padding: "3px 9px",
                borderRadius: 99,
                background: s.bg,
                color: s.color,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
              {s.label}
            </span>

            {/* Priority */}
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                padding: "3px 9px",
                borderRadius: 99,
                background: p.bg,
                color: p.color,
              }}
            >
              {p.label}
            </span>

            <span style={{ marginLeft: "auto", fontSize: "0.68rem", color: "#c9a892", display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={11} strokeWidth={1.8} />
              {laporan.createdAt}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#1a0e08",
              margin: 0,
              marginBottom: 5,
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {laporan.judul}
          </h3>

          {/* Description preview */}
          <p
            style={{
              fontSize: "0.78rem",
              color: "#8a6f5e",
              margin: 0,
              marginBottom: 10,
              lineHeight: 1.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {laporan.deskripsi}
          </p>

          {/* Bottom row: pelapor + meta + actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginTop: "auto",
              flexWrap: "wrap",
            }}
          >
            {/* Left meta */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flexWrap: "wrap" }}>
              {/* Pelapor avatar + nama */}
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
                <span style={{ fontSize: "0.72rem", color: "#3d2817", fontWeight: 500, whiteSpace: "nowrap" }}>
                  {laporan.pelapor.nama}
                </span>
              </div>

              {/* Lokasi */}
              <span style={{ fontSize: "0.7rem", color: "#a8856b", display: "flex", alignItems: "center", gap: 3, minWidth: 0 }}>
                <MapPin size={11} strokeWidth={1.8} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{laporan.lokasi}</span>
              </span>

              {/* Kategori */}
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  color: "#E8541C",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {KATEGORI_LABEL[laporan.kategori]}
              </span>

              {/* Engagement */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#a8856b", fontSize: "0.7rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <ArrowBigUp size={12} strokeWidth={1.8} />
                  {fmt(laporan.upvote)}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <MessageCircle size={11} strokeWidth={1.8} />
                  {laporan.komentarCount}
                </span>
              </div>
            </div>

            {/* Right: action buttons */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {showApproveReject && (
                <>
                  <ActionBtn
                    title="Approve"
                    variant="primary"
                    onClick={() => onAction(laporan.id, { type: "approve" })}
                  >
                    <Check size={13} strokeWidth={2.4} />
                    Approve
                  </ActionBtn>
                  <ActionBtn
                    title="Reject"
                    variant="danger"
                    onClick={() => onAction(laporan.id, { type: "rejectAsk" })}
                  >
                    <XIcon size={13} strokeWidth={2.4} />
                    Reject
                  </ActionBtn>
                </>
              )}

              {showSetProgress && (
                <ActionBtn
                  title="Set on progress"
                  onClick={() => onAction(laporan.id, { type: "update", status: "on_progress" })}
                >
                  <Loader size={12} strokeWidth={1.8} />
                  On Progress
                </ActionBtn>
              )}

              {showMarkCompleted && (
                <ActionBtn
                  title="Mark completed"
                  onClick={() => onAction(laporan.id, { type: "update", status: "completed" })}
                >
                  <CheckCircle2 size={12} strokeWidth={1.8} />
                  Selesai
                </ActionBtn>
              )}

              {!showApproveReject && !showSetProgress && !showMarkCompleted && (
                <button
                  onClick={(e) => { e.stopPropagation(); onClick(laporan); }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "white",
                    border: "0.5px solid #f0e6dc",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#a8856b",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#fafaf8";
                    e.currentTarget.style.color = "#E8541C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "#a8856b";
                  }}
                >
                  <MoreHorizontal size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}