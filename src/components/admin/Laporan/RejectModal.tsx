"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import type { AdminLaporan } from "./types";

interface Props {
  laporan: AdminLaporan | null;
  onClose: () => void;
  onConfirm: (alasan: string) => void;
}

const QUICK_REASONS = [
  "Duplikat dengan laporan yang sudah ada",
  "Informasi tidak lengkap atau tidak jelas",
  "Foto tidak menunjukkan masalah yang dilaporkan",
  "Bukan kewenangan platform",
];

export default function RejectModal({ laporan, onClose, onConfirm }: Props) {
  const [alasan, setAlasan] = useState("");

  useEffect(() => {
    if (laporan) setAlasan("");
  }, [laporan?.id]);

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

  const valid = alasan.trim().length >= 10;

  const handleSubmit = () => {
    if (!valid) return;
    onConfirm(alasan.trim());
    onClose();
  };

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
            zIndex: 110,
            background: "rgba(26,14,8,0.6)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.94, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 14 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(480px, 95vw)",
              background: "white",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 22px 16px",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 11,
                  background: "rgba(220,38,38,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#DC2626",
                  flexShrink: 0,
                }}
              >
                <AlertTriangle size={18} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: "#1a0e08",
                    letterSpacing: "-0.02em",
                    margin: 0,
                    marginBottom: 4,
                  }}
                >
                  Tolak laporan ini?
                </h2>
                <p style={{ fontSize: "0.78rem", color: "#8a6f5e", margin: 0, lineHeight: 1.5 }}>
                  Berikan alasan jelas — pelapor akan dapat notifikasi
                </p>
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

            {/* Laporan ref */}
            <div
              style={{
                margin: "0 22px 14px",
                padding: "10px 14px",
                background: "#fafaf8",
                border: "0.5px solid #f0e6dc",
                borderRadius: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span
                  style={{
                    fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: "#6b5546",
                    background: "white",
                    border: "0.5px solid #f0e6dc",
                    padding: "1px 7px",
                    borderRadius: 5,
                  }}
                >
                  {laporan.id}
                </span>
                <span style={{ fontSize: "0.65rem", color: "#a8856b" }}>
                  oleh {laporan.pelapor.nama}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#1a0e08",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {laporan.judul}
              </p>
            </div>

            {/* Body */}
            <div style={{ padding: "0 22px 18px" }}>
              {/* Quick reasons */}
              <div style={{ marginBottom: 12 }}>
                <p
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: "#a8856b",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    margin: "0 0 8px",
                  }}
                >
                  Alasan cepat
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {QUICK_REASONS.map((r) => {
                    const selected = alasan === r;
                    return (
                      <button
                        key={r}
                        onClick={() => setAlasan(r)}
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          padding: "6px 11px",
                          borderRadius: 99,
                          background: selected ? "rgba(220,38,38,0.08)" : "white",
                          color: selected ? "#B91C1C" : "#6b5546",
                          border: `0.5px solid ${selected ? "rgba(220,38,38,0.3)" : "#f0e6dc"}`,
                          cursor: "pointer",
                          transition: "all 0.15s",
                          fontFamily: "inherit",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          if (!selected) {
                            e.currentTarget.style.background = "#fafaf8";
                            e.currentTarget.style.borderColor = "#d4b89e";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selected) {
                            e.currentTarget.style.background = "white";
                            e.currentTarget.style.borderColor = "#f0e6dc";
                          }
                        }}
                      >
                        {r}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Textarea */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 6,
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#6b5546",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Detail alasan
                  </label>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color:
                        alasan.length < 10
                          ? "#a8856b"
                          : alasan.length > 280
                          ? "#DC2626"
                          : "#059669",
                    }}
                  >
                    {alasan.length}/300
                  </span>
                </div>
                <textarea
                  value={alasan}
                  onChange={(e) => setAlasan(e.target.value.slice(0, 300))}
                  placeholder="Tulis alasan penolakan yang jelas dan informatif untuk pelapor..."
                  rows={4}
                  autoFocus
                  style={{
                    width: "100%",
                    background: "#fafaf8",
                    border: `0.5px solid ${valid ? "rgba(255,107,53,0.3)" : "#f0e6dc"}`,
                    borderRadius: 10,
                    padding: "10px 12px",
                    fontSize: "0.82rem",
                    color: "#1a0e08",
                    fontFamily: "inherit",
                    outline: "none",
                    resize: "none",
                    lineHeight: 1.6,
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                />
                <p
                  style={{
                    fontSize: "0.65rem",
                    color: "#a8856b",
                    margin: "6px 0 0",
                    lineHeight: 1.5,
                  }}
                >
                  Minimal 10 karakter
                </p>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "14px 22px",
                borderTop: "0.5px solid #f5ede3",
                background: "#fafaf8",
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={onClose}
                style={{
                  background: "white",
                  border: "0.5px solid #f0e6dc",
                  borderRadius: 10,
                  padding: "10px 18px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#3d2817",
                  cursor: "pointer",
                  transition: "background 0.15s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fafaf8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={!valid}
                style={{
                  background: valid ? "linear-gradient(135deg, #DC2626, #B91C1C)" : "#FEE2E2",
                  color: valid ? "white" : "#fca5a5",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "none",
                  cursor: valid ? "pointer" : "not-allowed",
                  boxShadow: valid ? "0 4px 12px rgba(220,38,38,0.25)" : "none",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (valid) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(220,38,38,0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (valid) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(220,38,38,0.25)";
                  }
                }}
              >
                Tolak Laporan
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}