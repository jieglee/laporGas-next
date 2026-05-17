"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, MapPin, ArrowBigUp, MessageCircle, Calendar, Mail,
  ExternalLink, Check, X as XIcon,
} from "lucide-react";
import {
  type AdminLaporan,
  type AdminLaporanStatus,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  KATEGORI_LABEL,
} from "./types";

interface Props {
  laporan: AdminLaporan | null;
  onClose: () => void;
  onAction: (id: string, action: { type: "approve" | "reject" | "update"; status?: AdminLaporanStatus }) => void;
}

export default function PreviewModal({ laporan, onClose, onAction }: Props) {
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
            backdropFilter: "blur(4px)",
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
              width: "min(640px, 95vw)",
              maxHeight: "90vh",
              background: "white",
              borderRadius: 16,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "0.5px solid #f5ede3",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "3px 9px",
                    borderRadius: 99,
                    background: STATUS_CONFIG[laporan.status].bg,
                    color: STATUS_CONFIG[laporan.status].color,
                  }}
                >
                  {STATUS_CONFIG[laporan.status].label}
                </span>
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "3px 9px",
                    borderRadius: 99,
                    background: PRIORITY_CONFIG[laporan.priority].bg,
                    color: PRIORITY_CONFIG[laporan.priority].color,
                  }}
                >
                  {PRIORITY_CONFIG[laporan.priority].label}
                </span>
                <span style={{ fontSize: "0.7rem", color: "#c9a892" }}>ID: {laporan.id}</span>
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
                <X size={18} />
              </button>
            </div>

            {/* Body - scrollable */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {/* Photo placeholder */}
              <div
                style={{
                  height: 220,
                  background: "linear-gradient(135deg, #d0ccc8, #b8b4b0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <svg width="36" height="36" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="4" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <circle cx="8" cy="10" r="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <path d="M2 15l5-4 4 3 3-2 6 5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 12,
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    background: "rgba(0,0,0,0.45)",
                    color: "white",
                    padding: "3px 9px",
                    borderRadius: 99,
                  }}
                >
                  {laporan.fotoCount} foto
                </div>
              </div>

              <div style={{ padding: "20px 22px" }}>
                {/* Kategori */}
                <span
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: "#E8541C",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {KATEGORI_LABEL[laporan.kategori]}
                </span>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "#1a0e08",
                    letterSpacing: "-0.025em",
                    margin: "8px 0 12px",
                    lineHeight: 1.3,
                  }}
                >
                  {laporan.judul}
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#3d2817",
                    lineHeight: 1.7,
                    margin: "0 0 18px",
                  }}
                >
                  {laporan.deskripsi}
                </p>

                {/* Meta grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                    paddingTop: 16,
                    borderTop: "0.5px solid #f5ede3",
                  }}
                >
                  <MetaItem icon={<MapPin size={13} strokeWidth={1.8} />} label="Lokasi" value={laporan.alamat} />
                  <MetaItem
                    icon={<Calendar size={13} strokeWidth={1.8} />}
                    label="Dibuat"
                    value={laporan.createdAt}
                  />
                  <MetaItem
                    icon={
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {laporan.pelapor.inisial}
                      </div>
                    }
                    label="Pelapor"
                    value={laporan.pelapor.nama}
                  />
                  <MetaItem icon={<Mail size={13} strokeWidth={1.8} />} label="Email" value={laporan.pelapor.email} />
                </div>

                {/* Engagement */}
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    marginTop: 14,
                    paddingTop: 14,
                    borderTop: "0.5px solid #f5ede3",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#3d2817", fontSize: "0.8rem" }}>
                    <ArrowBigUp size={14} strokeWidth={1.8} />
                    <strong style={{ fontWeight: 700 }}>{laporan.upvote.toLocaleString("id-ID")}</strong>
                    <span style={{ color: "#a8856b" }}>dukungan</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#3d2817", fontSize: "0.8rem" }}>
                    <MessageCircle size={13} strokeWidth={1.8} />
                    <strong style={{ fontWeight: 700 }}>{laporan.komentarCount}</strong>
                    <span style={{ color: "#a8856b" }}>komentar</span>
                  </div>
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
                  padding: "9px 16px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#3d2817",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF5EE"; e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)"; e.currentTarget.style.color = "#E8541C"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#f0e6dc"; e.currentTarget.style.color = "#3d2817"; }}
              >
                <ExternalLink size={13} strokeWidth={1.8} />
                Buka detail
              </Link>

              {laporan.status === "pending" && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => { onAction(laporan.id, { type: "reject" }); onClose(); }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "white",
                      color: "#B91C1C",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      padding: "9px 16px",
                      borderRadius: 10,
                      border: "0.5px solid #FEE2E2",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  >
                    <XIcon size={13} strokeWidth={2.2} />
                    Reject
                  </button>
                  <button
                    onClick={() => { onAction(laporan.id, { type: "approve" }); onClose(); }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      padding: "9px 18px",
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(255,107,53,0.22)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,107,53,0.35)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,107,53,0.22)"; }}
                  >
                    <Check size={13} strokeWidth={2.2} />
                    Approve
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <p
        style={{
          fontSize: "0.6rem",
          fontWeight: 700,
          color: "#a8856b",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          margin: "0 0 4px",
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#3d2817", fontSize: "0.78rem" }}>
        <span style={{ color: "#8a6f5e", display: "flex", flexShrink: 0 }}>{icon}</span>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
      </div>
    </div>
  );
}