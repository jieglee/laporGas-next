"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, MapPin, ArrowBigUp, MessageCircle, Calendar, Mail,
  ExternalLink, Check, X as XIcon, Loader, CheckCircle2,
  Image as ImageIcon, AlertCircle,
} from "lucide-react";
import {
  type AdminLaporan,
  type AdminLaporanStatus,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  KATEGORI_LABEL,
  avatarColor,
} from "./types";

interface Props {
  laporan: AdminLaporan | null;
  onClose: () => void;
  onAction: (id: string, action: { type: "approve" | "rejectAsk" | "update"; status?: AdminLaporanStatus }) => void;
}

export default function DetailModal({ laporan, onClose, onAction }: Props) {
  useEffect(() => {
    if (!laporan) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [laporan, onClose]);

  useEffect(() => {
    document.body.style.overflow = laporan ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [laporan]);

  return (
    <AnimatePresence>
      {laporan && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(26,14,8,0.55)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(720px, 95vw)",
              maxHeight: "92vh",
              background: "white",
              borderRadius: 18,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
            }}
          >
            <ModalContent laporan={laporan} onClose={onClose} onAction={onAction} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalContent({
  laporan,
  onClose,
  onAction,
}: {
  laporan: AdminLaporan;
  onClose: () => void;
  onAction: (id: string, action: { type: "approve" | "rejectAsk" | "update"; status?: AdminLaporanStatus }) => void;
}) {
  const s = STATUS_CONFIG[laporan.status];
  const p = PRIORITY_CONFIG[laporan.priority];
  const avatar = avatarColor(laporan.pelapor.inisial);

  return (
    <>
      {/* Header */}
      <div
        style={{
          padding: "16px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "0.5px solid #f5ede3",
          flexShrink: 0,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#6b5546",
              background: "#fafaf8",
              border: "0.5px solid #f0e6dc",
              padding: "3px 9px",
              borderRadius: 7,
            }}
          >
            {laporan.id}
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              padding: "3px 10px",
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
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: 99,
              background: p.bg,
              color: p.color,
            }}
          >
            {p.label}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#a8856b",
            padding: 4,
            display: "flex",
            borderRadius: 8,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1a0e08")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a8856b")}
        >
          <X size={20} />
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Photo gallery placeholder */}
        <div
          style={{
            height: 260,
            background: "linear-gradient(135deg, #d0ccc8, #b8b4b0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <ImageIcon size={36} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />

          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 14,
              fontSize: "0.68rem",
              fontWeight: 600,
              background: "rgba(0,0,0,0.55)",
              color: "white",
              padding: "5px 12px",
              borderRadius: 99,
              backdropFilter: "blur(8px)",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <ImageIcon size={11} strokeWidth={2} />
            {laporan.fotoCount} foto
          </div>

          {/* Kategori overlay */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              fontSize: "0.6rem",
              fontWeight: 700,
              background: "rgba(0,0,0,0.55)",
              color: "white",
              padding: "4px 10px",
              borderRadius: 99,
              backdropFilter: "blur(8px)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {KATEGORI_LABEL[laporan.kategori]}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "22px 24px" }}>
          {/* Title */}
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.35rem",
              fontWeight: 800,
              color: "#1a0e08",
              letterSpacing: "-0.025em",
              margin: "0 0 12px",
              lineHeight: 1.3,
            }}
          >
            {laporan.judul}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "0.88rem",
              color: "#3d2817",
              lineHeight: 1.7,
              margin: "0 0 20px",
            }}
          >
            {laporan.deskripsi}
          </p>

          {/* Reject reason kalau ada */}
          {laporan.status === "rejected" && laporan.rejectReason && (
            <div
              style={{
                background: "#FEF2F2",
                border: "0.5px solid #FECACA",
                borderLeft: "3px solid #DC2626",
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 6,
                }}
              >
                <AlertCircle size={13} color="#B91C1C" strokeWidth={2} />
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#B91C1C",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Alasan penolakan
                </span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#3d2817", lineHeight: 1.6, margin: 0 }}>
                {laporan.rejectReason}
              </p>
            </div>
          )}

          {/* Meta grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              paddingTop: 16,
              borderTop: "0.5px solid #f5ede3",
            }}
          >
            <MetaItem
              icon={
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: avatar.bg,
                    color: avatar.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                  }}
                >
                  {laporan.pelapor.inisial}
                </div>
              }
              label="Pelapor"
              value={laporan.pelapor.nama}
              isAvatar
            />

            <MetaItem
              icon={<Mail size={14} strokeWidth={1.8} />}
              label="Email"
              value={laporan.pelapor.email}
            />

            <MetaItem
              icon={<MapPin size={14} strokeWidth={1.8} />}
              label="Lokasi"
              value={laporan.alamat}
            />

            <MetaItem
              icon={<Calendar size={14} strokeWidth={1.8} />}
              label="Dibuat"
              value={laporan.createdAt}
            />
          </div>

          {/* Engagement */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 18,
              paddingTop: 16,
              borderTop: "0.5px solid #f5ede3",
            }}
          >
            <EngagementStat
              icon={<ArrowBigUp size={15} strokeWidth={1.8} />}
              value={laporan.upvote.toLocaleString("id-ID")}
              label="Dukungan"
            />
            <EngagementStat
              icon={<MessageCircle size={13} strokeWidth={1.8} />}
              value={laporan.komentarCount}
              label="Komentar"
            />
            <EngagementStat
              icon={<ImageIcon size={13} strokeWidth={1.8} />}
              value={laporan.fotoCount}
              label="Foto bukti"
            />
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div
        style={{
          padding: "14px 22px",
          borderTop: "0.5px solid #f5ede3",
          display: "flex",
          gap: 10,
          justifyContent: "space-between",
          flexShrink: 0,
          background: "#fafaf8",
          flexWrap: "wrap",
        }}
      >
        <Link
          href={`/admin/laporan/${laporan.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "white",
            border: "0.5px solid #f0e6dc",
            borderRadius: 10,
            padding: "10px 16px",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#3d2817",
            textDecoration: "none",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FFF5EE";
            e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
            e.currentTarget.style.color = "#E8541C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.borderColor = "#f0e6dc";
            e.currentTarget.style.color = "#3d2817";
          }}
        >
          <ExternalLink size={13} strokeWidth={1.8} />
          Buka halaman lengkap
        </Link>

        {/* Action buttons sesuai status */}
        <div style={{ display: "flex", gap: 8 }}>
          {laporan.status === "pending" && (
            <>
              <button
                onClick={() => { onAction(laporan.id, { type: "rejectAsk" }); onClose(); }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "white",
                  color: "#B91C1C",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  padding: "10px 16px",
                  borderRadius: 10,
                  border: "0.5px solid #FEE2E2",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              >
                <XIcon size={13} strokeWidth={2.4} />
                Reject
              </button>
              <button
                onClick={() => { onAction(laporan.id, { type: "approve" }); onClose(); }}
                style={primaryBtn}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,107,53,0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,107,53,0.22)"; }}
              >
                <Check size={13} strokeWidth={2.4} />
                Approve
              </button>
            </>
          )}

          {laporan.status === "approved" && (
            <button
              onClick={() => { onAction(laporan.id, { type: "update", status: "on_progress" }); onClose(); }}
              style={primaryBtn}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,107,53,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,107,53,0.22)"; }}
            >
              <Loader size={13} strokeWidth={1.8} />
              Set On Progress
            </button>
          )}

          {laporan.status === "on_progress" && (
            <button
              onClick={() => { onAction(laporan.id, { type: "update", status: "completed" }); onClose(); }}
              style={primaryBtn}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,107,53,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,107,53,0.22)"; }}
            >
              <CheckCircle2 size={13} strokeWidth={1.8} />
              Tandai Selesai
            </button>
          )}
        </div>
      </div>
    </>
  );
}

const primaryBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: "linear-gradient(135deg, #FF6B35, #E8541C)",
  color: "white",
  fontWeight: 700,
  fontSize: "0.78rem",
  padding: "10px 18px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(255,107,53,0.22)",
  transition: "all 0.2s",
  fontFamily: "inherit",
};

function MetaItem({
  icon,
  label,
  value,
  isAvatar,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isAvatar?: boolean;
}) {
  return (
    <div>
      <p
        style={{
          fontSize: "0.58rem",
          fontWeight: 700,
          color: "#a8856b",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          margin: "0 0 6px",
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#3d2817", fontSize: "0.82rem", fontWeight: 500 }}>
        <span style={{ color: "#8a6f5e", display: "flex", flexShrink: 0 }}>{icon}</span>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
      </div>
    </div>
  );
}

function EngagementStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "rgba(255,107,53,0.08)",
          color: "#E8541C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1rem",
            fontWeight: 800,
            color: "#1a0e08",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: "0.62rem", color: "#a8856b", fontWeight: 500, marginTop: 2 }}>
          {label}
        </div>
      </div>
    </div>
  );
}