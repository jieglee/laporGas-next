'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getReportById, type Report } from "@/lib/reports";
import { getComments, createComment, deleteComment, type Comment } from "@/lib/comments";

interface LaporanDetailProps {
    reportId: number;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
    pending:     { bg: "#FEF3C7", color: "#92400E" },
    approved:    { bg: "#DBEAFE", color: "#1D4ED8" },
    on_progress: { bg: "#FFEDD5", color: "#C2410C" },
    completed:   { bg: "#D1FAE5", color: "#047857" },
    rejected:    { bg: "#FEE2E2", color: "#B91C1C" },
}

const STATUS_LABEL: Record<string, string> = {
    pending:     "Menunggu",
    approved:    "Disetujui",
    on_progress: "Sedang Diproses",
    completed:   "Selesai",
    rejected:    "Ditolak",
}

function fmtDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    }).replace("pukul", "pukul")
}

export default function LaporanDetail({ reportId }: LaporanDetailProps) {
    const { data: session } = useSession()
    const [report, setReport] = useState<Report | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [newComment, setNewComment] = useState("")
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const [reportData, commentsData] = await Promise.all([
                    getReportById(reportId),
                    getComments(reportId),
                ])
                setReport(reportData)
                setComments(commentsData)
            } catch {
                setError("Laporan tidak ditemukan")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [reportId])

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
        <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center">
            <p className="text-gray-400 text-sm">Memuat laporan...</p>
        </div>
    )

    if (error || !report) return (
        <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center">
            <p className="text-red-500 text-sm">{error ?? "Terjadi kesalahan"}</p>
        </div>
    )

    const statusStyle = STATUS_STYLE[report.status] ?? { bg: "#F3F4F6", color: "#6B7280" }
    const publicComments = comments.filter((c) => c.type === "public")
    const officialComments = comments.filter((c) => c.type === "official")

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6 bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                        {report.category_name ?? "Umum"}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                        ● {STATUS_LABEL[report.status] ?? report.status}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {report.priority}
                    </span>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">{report.title}</h1>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 flex-wrap">
                    <span>🗓 {fmtDate(report.created_at)}</span>
                    {report.location && <><span>·</span><span>📍 {report.location}</span></>}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Kronologi</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{report.description}</p>
                </div>

                {report.image_url && (
                    <img src={report.image_url} alt="Bukti" className="rounded-xl w-full max-h-72 object-cover border border-gray-100" />
                )}
            </div>

            {/* Tindak Lanjut (Official Comments) */}
            {officialComments.length > 0 && (
                <div className="mb-6 bg-white rounded-2xl border border-gray-100 p-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Tindak Lanjut</p>
                    <p className="text-sm font-semibold text-gray-800 mb-4">Catatan resmi instansi</p>
                    <div className="space-y-4">
                        {officialComments.map((c) => {
                            const inisial = (c.name ?? "A").split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase()
                            const isOwner = session?.user?.id === String(c.user_id)
                            return (
                                <div key={c.id} className="flex gap-3">
                                    {/* Blue left border */}
                                    <div style={{ width: 3, borderRadius: 99, background: "#3B82F6", flexShrink: 0 }} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                                                {inisial}
                                            </div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-sm font-semibold text-gray-800">{c.name ?? "Admin"}</span>
                                                <span className="text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">
                                                    INSTANSI
                                                </span>
                                                <span className="text-xs text-gray-400">{fmtDate(c.created_at)}</span>
                                            </div>
                                            {isOwner && (
                                                <button onClick={() => handleDeleteComment(c.id)} className="ml-auto text-xs text-red-400 hover:text-red-600">
                                                    Hapus
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700 ml-10">{c.comment}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Public Comments */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <p className="text-sm font-semibold text-gray-800 mb-4">
                    Komentar Publik ({publicComments.length})
                </p>

                {session ? (
                    <div className="flex gap-3 mb-6">
                        <input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Tulis komentar..."
                            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
                            onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                        />
                        <button
                            onClick={handleSubmitComment}
                            disabled={submitting || !newComment.trim()}
                            className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-orange-600 disabled:opacity-40"
                        >
                            {submitting ? "..." : "Kirim"}
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-gray-400 mb-6">
                        <a href="/auth/login" className="text-orange-500 hover:underline">Login</a> untuk berkomentar.
                    </p>
                )}

                {publicComments.length === 0 ? (
                    <p className="text-gray-400 text-sm">Belum ada komentar publik.</p>
                ) : (
                    <div className="space-y-4">
                        {publicComments.map((c) => {
                            const inisial = (c.name ?? "U").split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase()
                            const isOwner = session?.user?.id === String(c.user_id)
                            return (
                                <div key={c.id} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                        {inisial}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-gray-800">{c.name ?? "Anonim"}</span>
                                                <span className="text-xs text-gray-400">{fmtDate(c.created_at)}</span>
                                            </div>
                                            {isOwner && (
                                                <button onClick={() => handleDeleteComment(c.id)} className="text-xs text-red-400 hover:text-red-600">
                                                    Hapus
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700">{c.comment}</p>
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