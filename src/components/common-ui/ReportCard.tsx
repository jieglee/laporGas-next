"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowBigUp, MessageCircle, Image as ImageIcon } from "lucide-react";
import type { Report, ReportStatus } from "@/lib/reports";

// ── Status config ──────────────────────────────────────
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

// ── Props ──────────────────────────────────────────────
interface ReportCardProps {
    report: Report
    index?: number
    // Variant: "status" (default) | "nearby" (tampilkan jarak, bukan status)
    variant?: "status" | "nearby"
    distance?: string  // hanya untuk variant "nearby"
}

export default function ReportCard({ report, index = 0, variant = "status", distance }: ReportCardProps) {
    const s = STATUS_CFG[report.status] ?? { label: report.status, bg: "#F3F4F6", color: "#6B7280", dot: "#9CA3AF" }
    const inisial = getInisial(report.user_name ?? "?")
    const bg = avatarBg(report.user_name ?? "?")

    return (
        <Link href={`/user/laporan/${report.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <motion.article
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    background: "white",
                    border: "0.5px solid #f0e6dc",
                    borderRadius: 14,
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
                whileHover={{
                    borderColor: "rgba(255,107,53,0.3)",
                    boxShadow: "0 8px 28px rgba(255,107,53,0.1)",
                    y: -3,
                }}
            >
                {/* Thumbnail */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "linear-gradient(135deg,#e0dcd8,#cac6c2)", flexShrink: 0 }}>
                    {report.image_url ? (
                        <img
                            src={report.image_url}
                            alt={report.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            onError={(e) => { e.currentTarget.style.display = "none" }}
                        />
                    ) : (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ImageIcon size={26} color="rgba(255,255,255,0.4)" strokeWidth={1.5} />
                        </div>
                    )}

                    {/* Badge — status atau jarak */}
                    {variant === "nearby" && distance ? (
                        <div style={{ position: "absolute", top: 9, left: 9, display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.62rem", fontWeight: 600, padding: "3px 9px", borderRadius: 99, background: "rgba(255,255,255,0.92)", color: "#3d2817", backdropFilter: "blur(8px)" }}>
                            <MapPin size={9} color="#E8541C" strokeWidth={2.5} />
                            {distance}
                        </div>
                    ) : (
                        <div style={{ position: "absolute", top: 9, left: 9, display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 99, background: s.bg, color: s.color }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: s.dot }} />
                            {s.label}
                        </div>
                    )}

                    {/* Hover overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,14,8,0.6) 0%, transparent 60%)" }}
                    />
                </div>

                {/* Content */}
                <div style={{ padding: "12px 13px", display: "flex", flexDirection: "column", flex: 1, gap: 7 }}>
                    {/* Pelapor row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                            {inisial}
                        </div>
                        <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#3d2817", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {report.user_name ?? "Anonim"}
                        </span>
                        <span style={{ fontSize: "0.62rem", color: "#c9a892", marginLeft: "auto", whiteSpace: "nowrap" }}>
                            {fmtDate(report.created_at)}
                        </span>
                    </div>

                    {/* Judul */}
                    <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a0e08", margin: 0, lineHeight: 1.4, letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {report.title}
                    </h3>

                    {/* Lokasi */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#a8856b" }}>
                        <MapPin size={10} strokeWidth={2} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: "0.68rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {report.location ?? "Lokasi tidak diketahui"}
                        </span>
                    </div>

                    {/* Engagement — real data dari backend */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto", paddingTop: 6, borderTop: "0.5px solid #f5ede3" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: "#6b5546" }}>
                            <ArrowBigUp size={13} strokeWidth={1.8} style={{ color: "#E8541C" }} />
                            {fmt(report.upvote_count ?? 0)}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: "#6b5546" }}>
                            <MessageCircle size={11} strokeWidth={1.8} style={{ color: "#a8856b" }} />
                            {fmt(report.comment_count ?? 0)}
                        </span>
                        {report.category_name && (
                            <span style={{ marginLeft: "auto", fontSize: "0.6rem", fontWeight: 600, color: "#E8541C", background: "#FFF5EE", padding: "2px 7px", borderRadius: 99, whiteSpace: "nowrap" }}>
                                {report.category_name}
                            </span>
                        )}
                    </div>
                </div>
            </motion.article>
        </Link>
    )
}