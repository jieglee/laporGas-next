"use client";

import { useRouter } from "next/navigation";
import {
  Image as ImageIcon,
  ArrowBigUp,
  MessageCircle,
  Calendar,
  ChevronRight,
  Tag,
} from "lucide-react";
import { staggerClass } from "@/lib/stagger";
import { cn } from "@/lib/utils";

export type UserLaporanStatus = "pending" | "approved" | "on_progress" | "completed" | "rejected";

export interface UserLaporan {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  status: UserLaporanStatus;
  imageUrl?: string | null;
  upvote: number;
  komentarCount: number;
  createdAt: string;
}

const STATUS_CONFIG: Record<UserLaporanStatus, { label: string; badge: string; dot: string }> = {
  pending: { label: "Menunggu", badge: "bg-amber-100 text-amber-900", dot: "bg-amber-500" },
  approved: { label: "Disetujui", badge: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
  on_progress: { label: "Diproses", badge: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
  completed: { label: "Selesai", badge: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  rejected: { label: "Ditolak", badge: "bg-red-100 text-red-800", dot: "bg-red-500" },
};

interface Props {
  laporan: UserLaporan;
  index: number;
}

export default function UserLaporanCard({ laporan, index }: Props) {
  const router = useRouter();
  const s = STATUS_CONFIG[laporan.status];

  return (
    <article
      onClick={() => router.push(`/user/laporan/${laporan.id}`)}
      className={cn(
        "bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] overflow-hidden cursor-pointer flex flex-col",
        "transition-all duration-200 hover:border-[rgba(255,107,53,0.3)] hover:shadow-[0_8px_28px_rgba(255,107,53,0.1)] hover:-translate-y-[3px]",
        "animate-fade-slide-up-sm opacity-0",
        staggerClass(index)
      )}
    >
      <div className="relative w-full shrink-0 aspect-video bg-gradient-to-br from-[#e0dcd8] to-[#cac6c2]">
        {laporan.imageUrl ? (
          <img
            src={laporan.imageUrl}
            alt={laporan.judul}
            className="w-full h-full object-cover block"
            onError={(e) => e.currentTarget.classList.add("hidden")}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon size={28} className="text-white/40" strokeWidth={1.5} />
          </div>
        )}

        <div
          className={cn(
            "absolute top-[9px] left-[9px] inline-flex items-center gap-1 text-[0.58rem] font-bold tracking-[0.05em] uppercase px-[9px] py-[3px] rounded-full",
            s.badge
          )}
        >
          <span className={cn("w-[5px] h-[5px] rounded-full", s.dot)} />
          {s.label}
        </div>
      </div>

      <div className="px-[15px] py-[13px] flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-[5px]">
          <Tag size={11} strokeWidth={2} className="text-[#E8541C]" />
          <span className="text-[0.62rem] font-bold text-[#E8541C] uppercase tracking-[0.06em]">
            {laporan.kategori}
          </span>
        </div>

        <h3 className="text-[0.9rem] font-bold text-[#1a0e08] m-0 leading-[1.4] tracking-[-0.01em] line-clamp-2">
          {laporan.judul}
        </h3>

        <p className="text-[0.75rem] text-[#8a6f5e] m-0 leading-[1.55] line-clamp-2">{laporan.deskripsi}</p>

        <div className="border-t-[0.5px] border-[#f5ede3] mt-[2px]" />

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-[7px] text-[#a8856b] text-[0.68rem]">
            <Calendar size={11} strokeWidth={1.8} />
            {laporan.createdAt}
          </div>
          <div className="flex items-center gap-[10px] text-[#a8856b] text-[0.68rem]">
            <span className="flex items-center gap-[3px]">
              <ArrowBigUp size={11} strokeWidth={1.8} />
              {laporan.upvote}
            </span>
            <span className="flex items-center gap-[3px]">
              <MessageCircle size={10} strokeWidth={1.8} />
              {laporan.komentarCount}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/user/laporan/${laporan.id}`);
          }}
          className="w-full inline-flex items-center justify-center gap-[6px] py-2 bg-[#FFF5EE] text-[#E8541C] border-[0.5px] border-[rgba(255,107,53,0.2)] rounded-[9px] text-[0.75rem] font-bold cursor-pointer font-[inherit] transition-all duration-150 hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#E8541C] hover:text-white hover:border-transparent"
        >
          Lihat Detail <ChevronRight size={13} strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}
