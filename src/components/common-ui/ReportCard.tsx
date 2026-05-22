"use client";

import Link from "next/link";
import { MapPin, ArrowBigUp, MessageCircle, Image as ImageIcon } from "lucide-react";
import type { Report, ReportStatus } from "@/lib/reports";

const STATUS_CFG: Record<ReportStatus, { label: string; bg: string; color: string; dot: string }> = {
    pending:     { label: "Menunggu",  bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
    approved:    { label: "Disetujui", bg: "#DBEAFE", color: "#1D4ED8", dot: "#3B82F6" },
    on_progress: { label: "Diproses",  bg: "#FFEDD5", color: "#C2410C", dot: "#FB923C" },
    completed:   { label: "Selesai",   bg: "#D1FAE5", color: "#047857", dot: "#10B981" },
    rejected:    { label: "Ditolak",   bg: "#FEE2E2", color: "#B91C1C", dot: "#EF4444" },
}

const AVATAR_PALETTES = [
    "linear-gradient(135deg,#FF6B35,#E8541C)",
    "linear-gradient(135deg,#5DCAA5,#0F6E56)",
    "linear-gradient(135deg,#AFA9EC,#3C3489)",
    "linear-gradient(135deg,#F0997B,#993C1D)",
    "linear-gradient(135deg,#85B7EB,#0C447C)",
    "linear-gradient(135deg,#ED93B1,#72243E)",
]

function avatarBg(name: string) {
    const hash = (name ?? "?").split("").reduce((a, c) => a + c.charCodeAt(0), 0)
    return AVATAR_PALETTES[hash % AVATAR_PALETTES.length]
}

function getInisial(name: string) {
    return (name ?? "?").split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
}

function fmt(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n)
}

function fmtDate(dateStr: string) {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
    if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })
}

interface ReportCardProps {
    report: Report
    index?: number
    variant?: "status" | "nearby"
    distance?: string
}

export default function ReportCard({ report, index = 0, variant = "status", distance }: ReportCardProps) {
    const s = STATUS_CFG[report.status] ?? { label: report.status, bg: "#F3F4F6", color: "#6B7280", dot: "#9CA3AF" }
    const inisial = getInisial(report.user_name ?? "?")
    const bg = avatarBg(report.user_name ?? "?")

    return (
        <Link
            href={`/user/laporan/${report.id}`}
            className="no-underline text-inherit block h-full"
            style={{
                opacity: 0,
                animation: `fadeSlideIn 0.3s ease forwards`,
                animationDelay: `${index * 0.03}s`,
            }}
        >
            <article className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] overflow-hidden cursor-pointer flex flex-col h-full transition-all duration-200 hover:border-[rgba(255,107,53,0.3)] hover:shadow-[0_8px_28px_rgba(255,107,53,0.1)] hover:-translate-y-[3px]">

                {/* Thumbnail */}
                <div className="relative w-full shrink-0" style={{ aspectRatio: "4/3", background: "linear-gradient(135deg,#e0dcd8,#cac6c2)" }}>
                    {report.image_url ? (
                        <img
                            src={report.image_url}
                            alt={report.title}
                            className="w-full h-full object-cover block"
                            onError={(e) => { e.currentTarget.style.display = "none" }}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon size={26} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
                        </div>
                    )}

                    {/* Badge */}
                    {variant === "nearby" && distance ? (
                        <div className="absolute top-[9px] left-[9px] inline-flex items-center gap-1 text-[0.62rem] font-semibold px-[9px] py-[3px] rounded-full bg-[rgba(255,255,255,0.92)] text-[#3d2817] backdrop-blur-sm">
                            <MapPin size={9} color="#E8541C" strokeWidth={2.5} />
                            {distance}
                        </div>
                    ) : (
                        <div
                            className="absolute top-[9px] left-[9px] inline-flex items-center gap-1 text-[0.56rem] font-bold tracking-[0.05em] uppercase px-2 py-[3px] rounded-full"
                            style={{ background: s.bg, color: s.color }}
                        >
                            <span className="w-1 h-1 rounded-full" style={{ background: s.dot }} />
                            {s.label}
                        </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
                         style={{ background: "linear-gradient(to top, rgba(26,14,8,0.6) 0%, transparent 60%)" }} />
                </div>

                {/* Content */}
                <div className="px-[13px] py-3 flex flex-col flex-1 gap-[7px]">
                    {/* Pelapor row */}
                    <div className="flex items-center gap-[7px]">
                        <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0"
                            style={{ background: bg }}
                        />
                        <span className="text-[0.72rem] font-semibold text-[#3d2817] overflow-hidden text-ellipsis whitespace-nowrap">
                            {report.user_name ?? "Anonim"}
                        </span>
                        <span className="text-[0.62rem] text-[#c9a892] ml-auto whitespace-nowrap">
                            {fmtDate(report.created_at)}
                        </span>
                    </div>

                    {/* Judul */}
                    <h3
                        className="text-[0.85rem] font-bold text-[#1a0e08] m-0 leading-[1.4] tracking-[-0.01em]"
                        style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
                    >
                        {report.title}
                    </h3>

                    {/* Lokasi */}
                    <div className="flex items-center gap-1 text-[#a8856b]">
                        <MapPin size={10} strokeWidth={2} className="shrink-0" />
                        <span className="text-[0.68rem] overflow-hidden text-ellipsis whitespace-nowrap">
                            {report.location ?? "Lokasi tidak diketahui"}
                        </span>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center gap-[10px] mt-auto pt-[6px] border-t-[0.5px] border-[#f5ede3]">
                        <span className="flex items-center gap-1 text-[0.7rem] text-[#6b5546]">
                            <ArrowBigUp size={13} strokeWidth={1.8} className="text-[#E8541C]" />
                            {fmt(report.upvote_count ?? 0)}
                        </span>
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

            <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: scale(0.97); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </Link>
    )
}