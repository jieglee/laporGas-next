"use client";

import Link from "next/link";
import { MapPin, ArrowBigUp, MessageCircle, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import type { Report, ReportStatus } from "@/lib/reports";
import { toggleUpvote, getUpvoteStatus } from "@/lib/reports";
import { staggerClass } from "@/lib/stagger";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const STATUS_CFG: Record<ReportStatus, { label: string; badge: string; dot: string }> = {
  pending:     { label: "Menunggu",  badge: "bg-amber-100 text-amber-900",    dot: "bg-amber-500" },
  approved:    { label: "Disetujui", badge: "bg-blue-100 text-blue-800",      dot: "bg-blue-500" },
  on_progress: { label: "Diproses",  badge: "bg-orange-100 text-orange-700",  dot: "bg-orange-400" },
  completed:   { label: "Selesai",   badge: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  rejected:    { label: "Ditolak",   badge: "bg-red-100 text-red-800",        dot: "bg-red-500" },
};

const AVATAR_CLASSES = [
  "bg-gradient-to-br from-[#FF6B35] to-[#E8541C] text-white",
  "bg-gradient-to-br from-[#5DCAA5] to-[#0F6E56] text-white",
  "bg-gradient-to-br from-[#AFA9EC] to-[#3C3489] text-white",
  "bg-gradient-to-br from-[#F0997B] to-[#993C1D] text-white",
  "bg-gradient-to-br from-[#85B7EB] to-[#0C447C] text-white",
  "bg-gradient-to-br from-[#ED93B1] to-[#72243E] text-white",
];

function avatarClass(name: string) {
  const hash = (name ?? "?").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_CLASSES[hash % AVATAR_CLASSES.length];
}

function getInisial(name: string) {
  return (name ?? "?").split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function fmt(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

function fmtDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

interface ReportCardProps {
  report: Report;
  index?: number;
  variant?: "status" | "nearby";
  distance?: string;
}

export default function ReportCard({ report, index = 0, variant = "status", distance }: ReportCardProps) {
  const { data: session } = useSession();
  const s = STATUS_CFG[report.status] ?? { label: report.status, badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
  const inisial = getInisial(report.user_name ?? "?");
  const avatar = avatarClass(report.user_name ?? "?");

  const [upvoteCount, setUpvoteCount] = useState(report.upvote_count ?? 0);
  const [upvoted, setUpvoted] = useState(false);
  const [upvoting, setUpvoting] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;
    getUpvoteStatus(report.id).then((data) => {
      setUpvoted(data.upvoted);
      setUpvoteCount(data.upvote_count);
    }).catch(() => {});
  }, [report.id, session?.user?.id]);

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) { window.location.href = "/auth/login"; return; }
    if (upvoting) return;
    try {
      setUpvoting(true);
      const result = await toggleUpvote(report.id);
      setUpvoteCount(result.upvote_count);
      setUpvoted(result.upvoted);
    } catch (err) { console.error("Gagal upvote:", err); }
    finally { setUpvoting(false); }
  };

  return (
    <Link
      href={`/user/laporan/${report.id}`}
      className={cn("no-underline text-inherit block opacity-0 animate-fade-slide-in", staggerClass(index))}
    >
      <article className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] overflow-hidden cursor-pointer flex flex-col transition-all duration-200 hover:border-[rgba(255,107,53,0.3)] hover:shadow-[0_8px_28px_rgba(255,107,53,0.1)] hover:-translate-y-[3px]">
        {/* Thumbnail */}
        <div className="relative w-full h-[220px] shrink-0 bg-gradient-to-br from-[#e0dcd8] to-[#cac6c2] overflow-hidden">
          {report.image_url ? (
            <img src={report.image_url} alt={report.title}
                 className="w-full h-full object-cover block"
                 onError={(e) => e.currentTarget.classList.add("hidden")} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon size={26} className="text-white/40" strokeWidth={1.5} />
            </div>
          )}

          {variant === "nearby" && distance ? (
            <div className="absolute top-[9px] left-[9px] inline-flex items-center gap-1 text-[0.62rem] font-semibold px-[9px] py-[3px] rounded-full bg-white/90 text-[#3d2817] backdrop-blur-sm">
              <MapPin size={9} className="text-[#E8541C]" strokeWidth={2.5} />
              {distance}
            </div>
          ) : (
            <div className={cn("absolute top-[9px] left-[9px] inline-flex items-center gap-1 text-[0.56rem] font-bold tracking-[0.05em] uppercase px-2 py-[3px] rounded-full", s.badge)}>
              <span className={cn("w-1 h-1 rounded-full", s.dot)} />
              {s.label}
            </div>
          )}

          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-[rgba(26,14,8,0.6)] via-transparent to-transparent" />
        </div>

        <div className="px-[13px] py-3 flex flex-col flex-1 gap-[7px]">
          {/* User + date */}
          <div className="flex items-center gap-[7px]">
            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[0.55rem] font-bold shrink-0", avatar)}>
              {inisial}
            </div>
            <span className="text-[0.72rem] font-semibold text-[#3d2817] overflow-hidden text-ellipsis whitespace-nowrap">
              {report.user_name ?? "Anonim"}
            </span>
            <span className="text-[0.62rem] text-[#c9a892] ml-auto whitespace-nowrap">
              {fmtDate(report.created_at)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[0.85rem] font-bold text-[#1a0e08] m-0 leading-[1.4] tracking-[-0.01em] line-clamp-2">
            {report.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-[#a8856b]">
            <MapPin size={10} strokeWidth={2} className="shrink-0" />
            <span className="text-[0.68rem] overflow-hidden text-ellipsis whitespace-nowrap">
              {report.location ?? "Lokasi tidak diketahui"}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-[10px] mt-auto pt-[6px] border-t-[0.5px] border-[#f5ede3]">
            {/* Upvote button */}
            <button
              onClick={handleUpvote}
              disabled={upvoting}
              className={cn(
                "flex items-center gap-1 text-[0.7rem] font-semibold transition-all duration-150 bg-transparent border-0 cursor-pointer p-0",
                upvoted ? "text-[#E8541C]" : "text-[#6b5546] hover:text-[#E8541C]",
                upvoting && "opacity-50 cursor-not-allowed"
              )}
            >
              <ArrowBigUp
                size={15}
                strokeWidth={upvoted ? 2.5 : 1.8}
                fill={upvoted ? "#E8541C" : "none"}
                className="transition-all duration-200"
              />
              {fmt(upvoteCount)}
            </button>

            <span className="flex items-center gap-1 text-[0.7rem] text-[#6b5546]">
              <MessageCircle size={11} strokeWidth={1.8} className="text-[#a8856b]" />
              {fmt(report.comment_count ?? 0)}
            </span>

            {report.category_name && (
              <span className="ml-auto text-[0.6rem] font-semibold text-[#E8541C] bg-[#FFF5EE] px-[7px] py-[2px] rounded-full whitespace-nowrap">
                {report.category_name}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}