"use client";

import { useState, useEffect, useRef } from "react";
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
  const [visible, setVisible] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Animate in/out
  useEffect(() => {
    if (laporan) {
      setAlasan("");
      requestAnimationFrame(() => setVisible(true));
      setTimeout(() => textareaRef.current?.focus(), 100);
    } else {
      setVisible(false);
    }
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

  if (!laporan) return null;

  const valid = alasan.trim().length >= 10;

  const handleSubmit = () => {
    if (!valid) return;
    onConfirm(alasan.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-5 transition-all duration-200"
      style={{
        background: visible ? "rgba(26,14,8,0.6)" : "rgba(26,14,8,0)",
        backdropFilter: visible ? "blur(8px)" : "blur(0px)",
      }}
      onClick={onClose}
    >
      <div
        className="flex flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.25)] transition-all duration-[280ms]"
        style={{
          width: "min(480px, 95vw)",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(14px)",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-[22px] pt-5 pb-4 flex gap-3 items-start relative">
          <div className="w-10 h-10 rounded-[11px] bg-[rgba(220,38,38,0.1)] flex items-center justify-center text-[#DC2626] shrink-0">
            <AlertTriangle size={18} strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h2
              className="text-[1.05rem] font-extrabold text-[#1a0e08] tracking-[-0.02em] m-0 mb-1"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Tolak laporan ini?
            </h2>
            <p className="text-[0.78rem] text-[#8a6f5e] m-0 leading-[1.5]">
              Berikan alasan jelas — pelapor akan dapat notifikasi
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-transparent border-0 cursor-pointer text-[#a8856b] p-1 flex rounded-lg transition-colors duration-150 hover:text-[#1a0e08]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Laporan ref */}
        <div className="mx-[22px] mb-[14px] px-[14px] py-[10px] bg-[#fafaf8] border-[0.5px] border-[#f0e6dc] rounded-[10px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[0.62rem] font-bold text-[#6b5546] bg-white border-[0.5px] border-[#f0e6dc] px-[7px] py-[1px] rounded-[5px]">
              {laporan.id}
            </span>
            <span className="text-[0.65rem] text-[#a8856b]">oleh {laporan.pelapor.nama}</span>
          </div>
          <p
            className="text-[0.82rem] font-semibold text-[#1a0e08] m-0"
            style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}
          >
            {laporan.judul}
          </p>
        </div>

        {/* Body */}
        <div className="px-[22px] pb-[18px]">
          {/* Quick reasons */}
          <div className="mb-3">
            <p className="text-[0.62rem] font-bold text-[#a8856b] uppercase tracking-[0.06em] m-0 mb-2">
              Alasan cepat
            </p>
            <div className="flex gap-[6px] flex-wrap">
              {QUICK_REASONS.map((r) => {
                const selected = alasan === r;
                return (
                  <button
                    key={r}
                    onClick={() => setAlasan(r)}
                    className={`text-[0.72rem] font-medium px-[11px] py-[6px] rounded-full border-[0.5px] cursor-pointer transition-all duration-150 text-left font-[inherit] ${
                      selected
                        ? "bg-[rgba(220,38,38,0.08)] text-[#B91C1C] border-[rgba(220,38,38,0.3)]"
                        : "bg-white text-[#6b5546] border-[#f0e6dc] hover:bg-[#fafaf8] hover:border-[#d4b89e]"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Textarea */}
          <div>
            <div className="flex justify-between items-baseline mb-[6px]">
              <label className="text-[0.7rem] font-bold text-[#6b5546] tracking-[0.02em]">
                Detail alasan
              </label>
              <span className={`text-[0.65rem] ${alasan.length < 10 ? "text-[#a8856b]" : alasan.length > 280 ? "text-[#DC2626]" : "text-[#059669]"}`}>
                {alasan.length}/300
              </span>
            </div>
            <textarea
              ref={textareaRef}
              value={alasan}
              onChange={(e) => setAlasan(e.target.value.slice(0, 300))}
              placeholder="Tulis alasan penolakan yang jelas dan informatif untuk pelapor..."
              rows={4}
              className="w-full bg-[#fafaf8] rounded-[10px] px-3 py-[10px] text-[0.82rem] text-[#1a0e08] font-[inherit] outline-none resize-none leading-[1.6] transition-colors duration-200 border-[0.5px] box-border"
              style={{ borderColor: valid ? "rgba(255,107,53,0.3)" : "#f0e6dc" }}
            />
            <p className="text-[0.65rem] text-[#a8856b] mt-[6px] mb-0 leading-[1.5]">
              Minimal 10 karakter
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-[22px] py-[14px] border-t-[0.5px] border-[#f5ede3] bg-[#fafaf8] flex gap-[10px] justify-end">
          <button
            onClick={onClose}
            className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[10px] px-[18px] py-[10px] text-[0.78rem] font-semibold text-[#3d2817] cursor-pointer transition-colors duration-150 font-[inherit] hover:bg-[#fafaf8]"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={!valid}
            className="font-bold text-[0.78rem] px-5 py-[10px] rounded-[10px] border-0 transition-all duration-200 font-[inherit]"
            style={{
              background: valid ? "linear-gradient(135deg, #DC2626, #B91C1C)" : "#FEE2E2",
              color: valid ? "white" : "#fca5a5",
              cursor: valid ? "pointer" : "not-allowed",
              boxShadow: valid ? "0 4px 12px rgba(220,38,38,0.25)" : "none",
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
      </div>
    </div>
  );
}