"use client";

import { useState, useEffect, useRef } from "react";
import { X, AlertTriangle } from "lucide-react";
import type { AdminLaporan } from "./types";
import { cn } from "@/lib/utils";

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
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [laporan, onClose]);

  useEffect(() => {
    document.body.style.overflow = laporan ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
      className={cn(
        "fixed inset-0 z-[110] flex items-center justify-center p-5 transition-all duration-200",
        visible ? "bg-[rgba(26,14,8,0.6)] backdrop-blur-sm" : "bg-transparent backdrop-blur-none"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.25)] transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] w-[min(480px,95vw)]",
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.94] translate-y-3.5"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-[22px] pt-5 pb-4 flex gap-3 items-start relative">
          <div className="w-10 h-10 rounded-[11px] bg-red-50 flex items-center justify-center text-red-600 shrink-0">
            <AlertTriangle size={18} strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h2 className="font-sans text-[1.05rem] font-extrabold text-[#1a0e08] tracking-[-0.02em] m-0 mb-1">
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

        <div className="mx-[22px] mb-[14px] px-[14px] py-[10px] bg-[#fafaf8] border-[0.5px] border-[#f0e6dc] rounded-[10px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[0.62rem] font-bold text-[#6b5546] bg-white border-[0.5px] border-[#f0e6dc] px-[7px] py-px rounded-[5px]">
              {laporan.id}
            </span>
            <span className="text-[0.65rem] text-[#a8856b]">oleh {laporan.pelapor.nama}</span>
          </div>
          <p className="text-[0.82rem] font-semibold text-[#1a0e08] m-0 line-clamp-1">{laporan.judul}</p>
        </div>

        <div className="px-[22px] pb-[18px]">
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
                    className={cn(
                      "text-[0.72rem] font-medium px-[11px] py-1.5 rounded-full border-[0.5px] cursor-pointer transition-all duration-150 text-left font-[inherit]",
                      selected
                        ? "bg-red-50 text-red-800 border-red-300"
                        : "bg-white text-[#6b5546] border-[#f0e6dc] hover:bg-[#fafaf8] hover:border-[#d4b89e]"
                    )}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <label className="text-[0.7rem] font-bold text-[#6b5546] tracking-[0.02em]">Detail alasan</label>
              <span
                className={cn(
                  "text-[0.65rem]",
                  alasan.length < 10 ? "text-[#a8856b]" : alasan.length > 280 ? "text-red-600" : "text-emerald-600"
                )}
              >
                {alasan.length}/300
              </span>
            </div>
            <textarea
              ref={textareaRef}
              value={alasan}
              onChange={(e) => setAlasan(e.target.value.slice(0, 300))}
              placeholder="Tulis alasan penolakan yang jelas dan informatif untuk pelapor..."
              rows={4}
              className={cn(
                "w-full bg-[#fafaf8] rounded-[10px] px-3 py-[10px] text-[0.82rem] text-[#1a0e08] font-[inherit] outline-none resize-none leading-[1.6] transition-colors duration-200 border-[0.5px] box-border",
                valid ? "border-[rgba(255,107,53,0.3)]" : "border-[#f0e6dc]"
              )}
            />
            <p className="text-[0.65rem] text-[#a8856b] mt-1.5 mb-0 leading-[1.5]">Minimal 10 karakter</p>
          </div>
        </div>

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
            className={cn(
              "font-bold text-[0.78rem] px-5 py-[10px] rounded-[10px] border-0 transition-all duration-200 font-[inherit]",
              valid
                ? "bg-gradient-to-br from-red-600 to-red-800 text-white cursor-pointer shadow-[0_4px_12px_rgba(220,38,38,0.25)] hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(220,38,38,0.4)]"
                : "bg-red-100 text-red-300 cursor-not-allowed"
            )}
          >
            Tolak Laporan
          </button>
        </div>
      </div>
    </div>
  );
}
