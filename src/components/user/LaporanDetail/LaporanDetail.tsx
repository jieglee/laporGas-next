'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ArrowBigUp } from "lucide-react";
import { getReportById, getUpvoteStatus, toggleUpvote, type Report } from "@/lib/reports";
import { getComments, createComment, deleteComment, type Comment } from "@/lib/comments";
import {
  STATUS_CFG,
  PRIORITY_CFG,
} from "@/constants/report-config";

interface LaporanDetailProps {
    reportId: number;
}

function fmtDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    })
}

function fmt(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n)
}

function Inisial({ name, size = 36, official = false }: { name: string; size?: number; official?: boolean }) {
    const txt = (name ?? "?").split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase()
    return (
        <div style={{
            width: size, height: size, borderRadius: "50%", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: size * 0.33, fontWeight: 700, color: "white",
            background: official ? "linear-gradient(135deg,#3B82F6,#1D4ED8)" : "linear-gradient(135deg,#FF6B35,#E8541C)",
        }}>
            {txt}
        </div>
    )
}

export default function LaporanDetail({ reportId }: LaporanDetailProps) {
    const { data: session } = useSession()
    const role = session?.user?.role
    const isAdmin = role === "admin" || role === "superadmin"

    const [report, setReport] = useState<Report | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [newComment, setNewComment] = useState("")
    const [submitting, setSubmitting] = useState(false)

    // Upvote state
    const [upvoteCount, setUpvoteCount] = useState(0)
    const [upvoted, setUpvoted] = useState(false)
    const [upvoting, setUpvoting] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const [reportData, commentsData, upvoteData] = await Promise.all([
                    getReportById(reportId),
                    getComments(reportId),
                    getUpvoteStatus(reportId),
                ])
                setReport(reportData)
                setComments(commentsData)
                setUpvoteCount(upvoteData.upvote_count)
                setUpvoted(upvoteData.upvoted)
            } catch {
                setError("Laporan tidak ditemukan")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [reportId])

    const handleUpvote = async () => {
        if (!session) {
            window.location.href = "/auth/login"
            return
        }
        try {
            setUpvoting(true)
            const result = await toggleUpvote(reportId)
            setUpvoteCount(result.upvote_count)
            setUpvoted(result.upvoted)
        } catch (err) {
            console.error("Gagal upvote:", err)
        } finally {
            setUpvoting(false)
        }
    }

    const handleSubmitComment = async () => {
        if (!newComment.trim() || !report) return
        try {
            setSubmitting(true)
            const comment = await createComment({ report_id: report.id, comment: newComment })
            setComments((prev) => [...prev, comment])
            setNewComment("")
        } catch (err) {
            console.error("Gagal kirim komentar:", err)
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment(commentId)
            setComments((prev) => prev.filter((c) => c.id !== commentId))
        } catch (err) {
            console.error("Gagal hapus komentar:", err)
        }
    }

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
            <div style={{ textAlign: "center" }}>
                <div style={{ width: 32, height: 32, border: "2px solid #f0e6dc", borderTop: "2px solid #E8541C", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
                <p style={{ fontSize: "0.82rem", color: "#a8856b" }}>Memuat laporan...</p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )

    if (error || !report) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
            <p style={{ fontSize: "0.85rem", color: "#BE123C" }}>{error ?? "Terjadi kesalahan"}</p>
        </div>
    )

    const statusCfg = STATUS_CFG[report.status] ?? { label: report.status, bg: "#F3F4F6", color: "#6B7280", dot: "#9CA3AF" }
    const priorityCfg = PRIORITY_CFG[report.priority] ?? { label: report.priority, color: "#6B7280" }
    const officialComments = comments.filter((c) => c.type === "official")
    const publicComments = comments.filter((c) => c.type === "public")

    return (
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "32px 20px 80px" }}>

            {/* ── HEADER CARD ── */}
            <div style={{ background: "white", borderRadius: 20, border: "1px solid #F3F0ED", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.03)", padding: "28px 32px", marginBottom: 16 }}>

                {/* Badges */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9CA3AF", background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 6, padding: "3px 10px" }}>
                        #{report.id}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.72rem", fontWeight: 600, background: statusCfg.bg, color: statusCfg.color, borderRadius: 99, padding: "4px 12px" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusCfg.dot }} />
                        {statusCfg.label}
                    </span>
                    <span style={{ fontSize: "0.68rem", fontWeight: 600, color: priorityCfg.color, background: `${priorityCfg.color}12`, borderRadius: 6, padding: "3px 10px" }}>
                        ↑ {priorityCfg.label}
                    </span>
                    {report.category_name && (
                        <span style={{ fontSize: "0.68rem", color: "#6B7280", background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 6, padding: "3px 10px" }}>
                            {report.category_name}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 0 10px" }}>
                    {report.title}
                </h1>

                {/* Meta */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Inisial name={report.user_name ?? "U"} size={22} />
                        <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>{report.user_name ?? "Anonim"}</span>
                    </div>
                    <span style={{ color: "#E5E7EB" }}>·</span>
                    <span style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>🗓 {fmtDate(report.created_at)}</span>
                    {report.location && <>
                        <span style={{ color: "#E5E7EB" }}>·</span>
                        <span style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>📍 {report.location}</span>
                    </>}
                </div>

                <div style={{ height: 1, background: "#F9FAFB", margin: "0 0 20px" }} />

                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D1D5DB", margin: "0 0 10px" }}>
                    Kronologi
                </p>
                <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.75, margin: 0 }}>
                    {report.description}
                </p>

                {/* Foto bukti — support multiple images */}
                {(report.images?.length > 0 || report.image_url) && (() => {
                    const imgs = report.images?.length > 0
                        ? report.images
                        : [report.image_url!]
                    return (
                        <div style={{ marginTop: 20 }}>
                            {/* Cover — foto pertama besar */}
                            <img
                                src={imgs[0]}
                                alt="Bukti laporan"
                                style={{ width: "100%", maxHeight: 360, objectFit: "cover", borderRadius: 14, border: "1px solid #F3F4F6", display: "block" }}
                            />
                            {/* Foto lainnya — grid kecil */}
                            {imgs.length > 1 && (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 8, marginTop: 8 }}>
                                    {imgs.slice(1).map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            alt={`Foto ${i + 2}`}
                                            style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: 10, border: "1px solid #F3F4F6", cursor: "pointer" }}
                                            onClick={() => window.open(url, "_blank")}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })()}

                {/* ── UPVOTE BUTTON ── */}
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #F9FAFB", display: "flex", alignItems: "center", gap: 16 }}>
                    <button
                        onClick={handleUpvote}
                        disabled={upvoting}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 20px",
                            borderRadius: 99,
                            border: upvoted ? "1.5px solid #E8541C" : "1.5px solid #F0E6DC",
                            background: upvoted ? "#FFF5EE" : "white",
                            color: upvoted ? "#E8541C" : "#6B7280",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            cursor: upvoting ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                            opacity: upvoting ? 0.6 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!upvoted) {
                                e.currentTarget.style.borderColor = "#E8541C"
                                e.currentTarget.style.color = "#E8541C"
                                e.currentTarget.style.background = "#FFF5EE"
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!upvoted) {
                                e.currentTarget.style.borderColor = "#F0E6DC"
                                e.currentTarget.style.color = "#6B7280"
                                e.currentTarget.style.background = "white"
                            }
                        }}
                    >
                        <ArrowBigUp
                            size={18}
                            strokeWidth={upvoted ? 2.5 : 1.8}
                            fill={upvoted ? "#E8541C" : "none"}
                            style={{ color: upvoted ? "#E8541C" : "#9CA3AF", transition: "all 0.2s" }}
                        />
                        {upvoted ? "Didukung" : "Dukung Laporan"}
                        <span style={{
                            background: upvoted ? "#E8541C" : "#F3F4F6",
                            color: upvoted ? "white" : "#6B7280",
                            borderRadius: 99,
                            padding: "1px 8px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            transition: "all 0.2s",
                        }}>
                            {fmt(upvoteCount)}
                        </span>
                    </button>

                    <span style={{ fontSize: "0.75rem", color: "#D1D5DB" }}>
                        {upvoteCount > 0
                            ? `${fmt(upvoteCount)} warga mendukung laporan ini`
                            : "Jadilah yang pertama mendukung!"}
                    </span>
                </div>
            </div>

            {/* ── TINDAK LANJUT ── */}
            {officialComments.length > 0 && (
                <div style={{ background: "white", borderRadius: 20, border: "1px solid #DBEAFE", padding: "24px 32px", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "0.9rem" }}>🏛️</span>
                        </div>
                        <div>
                            <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#93C5FD", margin: 0 }}>Tindak Lanjut</p>
                            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1E40AF", margin: 0 }}>Catatan resmi instansi</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {officialComments.map((c) => {
                            const isOwner = session?.user?.id === String(c.user_id)
                            return (
                                <div key={c.id} style={{ display: "flex", gap: 12 }}>
                                    <div style={{ width: 3, borderRadius: 99, background: "linear-gradient(to bottom,#3B82F6,#93C5FD)", flexShrink: 0, minHeight: 40 }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                                            <Inisial name={c.name ?? "A"} size={28} official />
                                            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1E3A8A" }}>{c.name ?? "Admin"}</span>
                                            <span style={{ fontSize: "0.6rem", fontWeight: 700, background: "#DBEAFE", color: "#1D4ED8", border: "1px solid #BFDBFE", padding: "2px 8px", borderRadius: 99 }}>INSTANSI</span>
                                            <span style={{ fontSize: "0.72rem", color: "#93C5FD" }}>{fmtDate(c.created_at)}</span>
                                            {isOwner && (
                                                <button onClick={() => handleDeleteComment(c.id)} style={{ marginLeft: "auto", fontSize: "0.7rem", color: "#FCA5A5", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Hapus</button>
                                            )}
                                        </div>
                                        <p style={{ fontSize: "0.88rem", color: "#1E40AF", lineHeight: 1.65, margin: 0, paddingLeft: 36 }}>{c.comment}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* ── KOMENTAR PUBLIK ── */}
            <div style={{ background: "white", borderRadius: 20, border: "1px solid #F3F0ED", padding: "24px 32px" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D1D5DB", margin: "0 0 2px" }}>Diskusi</p>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#111827", margin: "0 0 20px" }}>
                    Komentar Publik <span style={{ color: "#9CA3AF", fontWeight: 400 }}>({publicComments.length})</span>
                </p>

                {session ? (
                    <div style={{ marginBottom: 24 }}>
                        {isAdmin && (
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "4px 10px", marginBottom: 10 }}>
                                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#1D4ED8" }}>🏛️ KOMENTAR ADMIN — akan tampil sebagai Tindak Lanjut</span>
                            </div>
                        )}
                        <div style={{ display: "flex", gap: 10 }}>
                            <Inisial name={session.user?.name ?? "U"} size={36} official={isAdmin} />
                            <div style={{ flex: 1, display: "flex", gap: 8 }}>
                                <input
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={isAdmin ? "Tulis tindak lanjut resmi..." : "Tulis komentar..."}
                                    style={{
                                        flex: 1, border: `1px solid ${isAdmin ? "#BFDBFE" : "#F0E6DC"}`,
                                        borderRadius: 12, padding: "10px 16px", fontSize: "0.85rem",
                                        outline: "none", color: "#111827", background: isAdmin ? "#F0F9FF" : "#FAFAF8",
                                    }}
                                    onFocus={(e) => e.currentTarget.style.borderColor = isAdmin ? "#3B82F6" : "#E8541C"}
                                    onBlur={(e) => e.currentTarget.style.borderColor = isAdmin ? "#BFDBFE" : "#F0E6DC"}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                                />
                                <button
                                    onClick={handleSubmitComment}
                                    disabled={submitting || !newComment.trim()}
                                    style={{
                                        background: isAdmin ? "linear-gradient(135deg,#3B82F6,#1D4ED8)" : "linear-gradient(135deg,#FF6B35,#E8541C)",
                                        color: "white", border: "none", borderRadius: 12, padding: "10px 18px",
                                        fontSize: "0.82rem", fontWeight: 600, cursor: submitting || !newComment.trim() ? "not-allowed" : "pointer",
                                        opacity: submitting || !newComment.trim() ? 0.45 : 1, whiteSpace: "nowrap",
                                    }}
                                >
                                    {submitting ? "..." : "Kirim"}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ background: "#FAFAF8", borderRadius: 12, padding: "14px 16px", marginBottom: 20, textAlign: "center" }}>
                        <p style={{ fontSize: "0.82rem", color: "#9CA3AF", margin: 0 }}>
                            <a href="/auth/login" style={{ color: "#E8541C", fontWeight: 600, textDecoration: "none" }}>Login</a> untuk berkomentar
                        </p>
                    </div>
                )}

                {publicComments.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "32px 0", color: "#D1D5DB" }}>
                        <p style={{ fontSize: "1.5rem", margin: "0 0 8px" }}>💬</p>
                        <p style={{ fontSize: "0.82rem", margin: 0 }}>Belum ada komentar. Jadilah yang pertama!</p>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {publicComments.map((c, idx) => {
                            const isOwner = session?.user?.id === String(c.user_id)
                            return (
                                <div key={c.id} style={{ display: "flex", gap: 12, paddingTop: idx === 0 ? 0 : 16, paddingBottom: 16, borderBottom: idx < publicComments.length - 1 ? "1px solid #F9FAFB" : "none" }}>
                                    <Inisial name={c.name ?? "U"} size={36} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111827" }}>{c.name ?? "Anonim"}</span>
                                                <span style={{ fontSize: "0.72rem", color: "#D1D5DB" }}>{fmtDate(c.created_at)}</span>
                                            </div>
                                            {isOwner && (
                                                <button onClick={() => handleDeleteComment(c.id)}
                                                    style={{ fontSize: "0.7rem", color: "#FCA5A5", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                                                    onMouseEnter={(e) => e.currentTarget.style.color = "#EF4444"}
                                                    onMouseLeave={(e) => e.currentTarget.style.color = "#FCA5A5"}
                                                >Hapus</button>
                                            )}
                                        </div>
                                        <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.65, margin: 0 }}>{c.comment}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}