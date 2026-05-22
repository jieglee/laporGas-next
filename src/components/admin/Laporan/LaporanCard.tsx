"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin, ArrowBigUp, MessageCircle, Image as ImageIcon,
  Check, X as XIcon, Loader, CheckCircle2, ChevronRight,
} from "lucide-react";
import {
  type AdminLaporan, type AdminLaporanStatus,
  STATUS_CONFIG, PRIORITY_CONFIG, KATEGORI_LABEL, avatarColor,
} from "./types";

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

interface Props {
  laporan: AdminLaporan;
  index: number;
  onAction: (id: string, action: { type: "approve" | "rejectAsk" | "update"; status?: AdminLaporanStatus }) => void;
}

export default function LaporanCard({ laporan, index, onAction }: Props) {
  const router = useRouter();
  const s = STATUS_CONFIG[laporan.status];
  const p = PRIORITY_CONFIG[laporan.priority];
  const avatar = avatarColor(laporan.pelapor.inisial);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => router.push(`/admin/laporan/${laporan.id}`)}
      className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] overflow-hidden cursor-pointer flex flex-col transition-all duration-200"
      whileHover={{ borderColor: "rgba(255,107,53,0.3)", boxShadow: "0 8px 24px rgba(255,107,53,0.09)", y: -2 }}
    >
      {/* Thumbnail */}
      <div className="relative w-full shrink-0" style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #e0dcd8, #cac6c2)" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon size={28} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
        </div>

        {/* Status — top left */}
        <div
          className="absolute top-[9px] left-[9px] inline-flex items-center gap-1 text-[0.58rem] font-bold tracking-[0.05em] uppercase px-[9px] py-[3px] rounded-full"
          style={{ background: s.bg, color: s.color }}
        >
          <span className="w-[5px] h-[5px] rounded-full" style={{ background: s.dot }} />
          {s.label}
        </div>

        {/* Priority — top right */}
        <div
          className="absolute top-[9px] right-[9px] text-[0.58rem] font-bold tracking-[0.05em] uppercase px-[9px] py-[3px] rounded-full"
          style={{ background: p.bg, color: p.color }}
        >
          {p.label}
        </div>

        {/* Foto count — bottom right */}
        <div className="absolute bottom-[9px] right-[9px] text-[0.6rem] font-semibold bg-[rgba(0,0,0,0.52)] text-white px-2 py-[3px] rounded-full backdrop-blur-sm inline-flex items-center gap-1">
          <ImageIcon size={9} strokeWidth={2} />
          {laporan.fotoCount}
        </div>
      </div>

      {/* Content */}
      <div className="px-[14px] py-[13px] flex flex-col flex-1 gap-2">

        {/* ID + Kategori */}
        <div className="flex items-center gap-[6px]">
          <span className="font-mono text-[0.6rem] font-bold text-[#8a6f5e] bg-[#fafaf8] border-[0.5px] border-[#f0e6dc] px-[7px] py-[2px] rounded-[5px]">
            {laporan.id}
          </span>
          <span className="text-[0.58rem] font-bold text-[#E8541C] uppercase tracking-[0.06em]">
            {KATEGORI_LABEL[laporan.kategori]}
          </span>
        </div>

        {/* Judul */}
        <h3
          className="text-[0.88rem] font-bold text-[#1a0e08] m-0 leading-[1.4] tracking-[-0.01em]"
          style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
        >
          {laporan.judul}
        </h3>

        {/* Lokasi */}
        <div className="flex items-center gap-1 text-[#a8856b]">
          <MapPin size={11} strokeWidth={1.8} className="shrink-0" />
          <span className="text-[0.7rem] overflow-hidden text-ellipsis whitespace-nowrap">{laporan.lokasi}</span>
        </div>

        {/* Divider */}
        <div className="border-t-[0.5px] border-[#f5ede3]" />

        {/* Pelapor + engagement */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6px] min-w-0">
            <div
              className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[0.55rem] font-bold shrink-0"
              style={{ background: avatar.bg, color: avatar.color }}
            >
              {laporan.pelapor.inisial}
            </div>
            <span className="text-[0.7rem] text-[#3d2817] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              {laporan.pelapor.nama}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#a8856b] text-[0.68rem] shrink-0">
            <span className="flex items-center gap-[3px]"><ArrowBigUp size={11} strokeWidth={1.8} />{fmt(laporan.upvote)}</span>
            <span className="flex items-center gap-[3px]"><MessageCircle size={10} strokeWidth={1.8} />{laporan.komentarCount}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-[6px] mt-[2px]">
          {laporan.status === "pending" && (<>
            <button
              onClick={(e) => { e.stopPropagation(); onAction(laporan.id, { type: "approve" }); }}
              className="flex-1 inline-flex items-center justify-center gap-[5px] py-[7px] rounded-lg border-0 text-[0.72rem] font-bold text-white cursor-pointer transition-all duration-150 hover:-translate-y-px"
              style={{ background: "linear-gradient(135deg, #FF6B35, #E8541C)", boxShadow: "0 3px 10px rgba(255,107,53,0.22)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 16px rgba(255,107,53,0.35)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 3px 10px rgba(255,107,53,0.22)")}
            >
              <Check size={12} strokeWidth={2.5} /> Approve
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onAction(laporan.id, { type: "rejectAsk" }); }}
              className="flex-1 inline-flex items-center justify-center gap-[5px] py-[7px] rounded-lg bg-white text-[#B91C1C] border-[0.5px] border-[#FEE2E2] text-[0.72rem] font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#FEF2F2]"
            >
              <XIcon size={12} strokeWidth={2.5} /> Reject
            </button>
          </>)}

          {laporan.status === "approved" && (
            <button
              onClick={(e) => { e.stopPropagation(); onAction(laporan.id, { type: "update", status: "on_progress" }); }}
              className="flex-1 inline-flex items-center justify-center gap-[5px] py-[7px] rounded-lg bg-white text-[#C2410C] border-[0.5px] border-[#FFEDD5] text-[0.72rem] font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#FFF7ED]"
            >
              <Loader size={12} strokeWidth={1.8} /> On Progress
            </button>
          )}

          {laporan.status === "on_progress" && (
            <button
              onClick={(e) => { e.stopPropagation(); onAction(laporan.id, { type: "update", status: "completed" }); }}
              className="flex-1 inline-flex items-center justify-center gap-[5px] py-[7px] rounded-lg bg-white text-[#047857] border-[0.5px] border-[#D1FAE5] text-[0.72rem] font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#F0FDF4]"
            >
              <CheckCircle2 size={12} strokeWidth={1.8} /> Selesai
            </button>
          )}

          {/* Chevron detail */}
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/admin/laporan/${laporan.id}`); }}
            className="w-8 h-8 rounded-lg bg-[#fafaf8] border-[0.5px] border-[#f0e6dc] cursor-pointer inline-flex items-center justify-center text-[#a8856b] shrink-0 transition-all duration-150 hover:bg-[#FFF5EE] hover:text-[#E8541C] hover:border-[rgba(255,107,53,0.3)]"
          >
            <ChevronRight size={13} strokeWidth={2} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
