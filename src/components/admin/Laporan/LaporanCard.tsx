"use client";

import { useRouter } from "next/navigation";
import {
  MapPin,
  ArrowBigUp,
  MessageCircle,
  Image as ImageIcon,
  Check,
  X as XIcon,
  Loader,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import {
  type AdminLaporan,
  type AdminLaporanStatus,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
  KATEGORI_LABEL,
  avatarColor,
} from "./types";
import { staggerClass } from "@/lib/stagger";
import { cn } from "@/lib/utils";

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

interface Props {
  laporan: AdminLaporan;
  index: number;
  onAction: (
    id: string,
    action: { type: "approve" | "rejectAsk" | "update"; status?: AdminLaporanStatus }
  ) => void;
}

export default function LaporanCard({ laporan, index, onAction }: Props) {
  const router = useRouter();
  const s = STATUS_CONFIG[laporan.status];
  const p = PRIORITY_CONFIG[laporan.priority];
  const avatar = avatarColor(laporan.pelapor.inisial);

  return (
    <article
      onClick={() => router.push(`/admin/laporan/${laporan.id}`)}
      className={cn(
        "bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] overflow-hidden cursor-pointer flex flex-col",
        "transition-all duration-200 hover:border-[rgba(255,107,53,0.3)] hover:shadow-[0_8px_24px_rgba(255,107,53,0.09)] hover:-translate-y-[2px]",
        "animate-fade-slide-up-sm opacity-0",
        staggerClass(index)
      )}
    >
      <div className="relative w-full shrink-0 aspect-video bg-gradient-to-br from-[#e0dcd8] to-[#cac6c2]">
        <div className="absolute inset-0 flex items-center justify-center">
          {laporan.image && (
    <img
        src={laporan.image}
        alt={laporan.judul}
        className="w-full h-[180px] object-cover rounded-xl"
    />
)}
        </div>

        <div
          className={cn(
            "absolute top-[9px] left-[9px] inline-flex items-center gap-1 text-[0.58rem] font-bold tracking-[0.05em] uppercase px-[9px] py-[3px] rounded-full",
            s.badge
          )}
        >
          <span className={cn("w-[5px] h-[5px] rounded-full", s.dot)} />
          {s.label}
        </div>

        <div
          className={cn(
            "absolute top-[9px] right-[9px] text-[0.58rem] font-bold tracking-[0.05em] uppercase px-[9px] py-[3px] rounded-full",
            p.badge
          )}
        >
          {p.label}
        </div>

        {/* <div className="absolute bottom-[9px] right-[9px] text-[0.6rem] font-semibold bg-black/50 text-white px-2 py-[3px] rounded-full backdrop-blur-sm inline-flex items-center gap-1">
          <ImageIcon size={9} strokeWidth={2} />
          {laporan.fotoCount}
        </div> */}
      </div>

      <div className="px-[14px] py-[13px] flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-[6px]">
          <span className="font-mono text-[0.6rem] font-bold text-[#8a6f5e] bg-[#fafaf8] border-[0.5px] border-[#f0e6dc] px-[7px] py-[2px] rounded-[5px]">
            {laporan.id}
          </span>
          <span className="text-[0.58rem] font-bold text-[#E8541C] uppercase tracking-[0.06em]">
            {KATEGORI_LABEL[laporan.kategori]}
          </span>
        </div>

        <h3 className="text-[0.88rem] font-bold text-[#1a0e08] m-0 leading-[1.4] tracking-[-0.01em] line-clamp-2">
          {laporan.judul}
        </h3>

        <div className="flex items-center gap-1 text-[#a8856b]">
          <MapPin size={11} strokeWidth={1.8} className="shrink-0" />
          <span className="text-[0.7rem] overflow-hidden text-ellipsis whitespace-nowrap">
            {laporan.lokasi}
          </span>
        </div>

        <div className="border-t-[0.5px] border-[#f5ede3]" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6px] min-w-0">
            <div
              className={cn(
                "w-[22px] h-[22px] rounded-full flex items-center justify-center text-[0.55rem] font-bold shrink-0",
                avatar
              )}
            >
              {laporan.pelapor.inisial}
            </div>
            <span className="text-[0.7rem] text-[#3d2817] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              {laporan.pelapor.nama}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#a8856b] text-[0.68rem] shrink-0">
            <span className="flex items-center gap-[3px]">
              <ArrowBigUp size={11} strokeWidth={1.8} />
              {fmt(laporan.upvote)}
            </span>
            <span className="flex items-center gap-[3px]">
              <MessageCircle size={10} strokeWidth={1.8} />
              {laporan.komentarCount}
            </span>
          </div>
        </div>

        <div className="flex gap-[6px] mt-[2px]">
          {laporan.status === "pending" && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(laporan.id, { type: "approve" });
                }}
                className="flex-1 inline-flex items-center justify-center gap-[5px] py-[7px] rounded-lg border-0 text-[0.72rem] font-bold text-white cursor-pointer transition-all duration-150 hover:-translate-y-px bg-gradient-to-br from-[#FF6B35] to-[#E8541C] shadow-[0_3px_10px_rgba(255,107,53,0.22)] hover:shadow-[0_6px_16px_rgba(255,107,53,0.35)]"
              >
                <Check size={12} strokeWidth={2.5} /> Approve
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(laporan.id, { type: "rejectAsk" });
                }}
                className="flex-1 inline-flex items-center justify-center gap-[5px] py-[7px] rounded-lg bg-white text-[#B91C1C] border-[0.5px] border-[#FEE2E2] text-[0.72rem] font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#FEF2F2]"
              >
                <XIcon size={12} strokeWidth={2.5} /> Reject
              </button>
            </>
          )}

          {laporan.status === "approved" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction(laporan.id, { type: "update", status: "on_progress" });
              }}
              className="flex-1 inline-flex items-center justify-center gap-[5px] py-[7px] rounded-lg bg-white text-[#C2410C] border-[0.5px] border-[#FFEDD5] text-[0.72rem] font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#FFF7ED]"
            >
              <Loader size={12} strokeWidth={1.8} /> On Progress
            </button>
          )}

          {laporan.status === "on_progress" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAction(laporan.id, { type: "update", status: "completed" });
              }}
              className="flex-1 inline-flex items-center justify-center gap-[5px] py-[7px] rounded-lg bg-white text-[#047857] border-[0.5px] border-[#D1FAE5] text-[0.72rem] font-semibold cursor-pointer transition-colors duration-150 hover:bg-[#F0FDF4]"
            >
              <CheckCircle2 size={12} strokeWidth={1.8} /> Selesai
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/laporan/${laporan.id}`);
            }}
            className="w-8 h-8 rounded-lg bg-[#fafaf8] border-[0.5px] border-[#f0e6dc] cursor-pointer inline-flex items-center justify-center text-[#a8856b] shrink-0 transition-all duration-150 hover:bg-[#FFF5EE] hover:text-[#E8541C] hover:border-[rgba(255,107,53,0.3)]"
          >
            <ChevronRight size={13} strokeWidth={2} />
          </button>
        </div>
      </div>
    </article>
  );
}
