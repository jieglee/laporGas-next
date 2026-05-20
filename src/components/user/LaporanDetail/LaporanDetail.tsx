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
    pending:     "Pending",
    approved:    "Disetujui",
    on_progress: "Sedang Diproses",
    completed:   "Selesai",
    rejected:    "Ditolak",
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
    const isOwner = session?.user?.id === String(report.user_id)
    

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {report.category_name ?? "Umum"}
                    </span>
                    <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                    >
                        {STATUS_LABEL[report.status] ?? report.status}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {report.priority}
                    </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{report.title}</h1>
                <p className="text-gray-600">
                    {report.location ?? "-"} •{" "}
                    {new Date(report.created_at).toLocaleDateString("id-ID", {
                        day: "numeric", month: "long", year: "numeric"
                    })}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Dilaporkan oleh <strong>{report.user_name}</strong>
                </p>
            </div>

            {/* Deskripsi */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700">{report.description}</p>
            </div>

            {/* Foto */}
            {report.image_url && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3">Foto Bukti</h2>
                    <img
                        src={report.image_url}
                        alt="Bukti laporan"
                        className="rounded-xl w-full max-h-80 object-cover border border-gray-200"
                    />
                </div>
            )}

            {/* Lokasi koordinat */}
            {report.latitude && report.longitude && (
                <div className="mb-6 bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">Koordinat Lokasi</p>
                    <p className="text-sm text-gray-700">
                        {report.latitude}, {report.longitude}
                    </p>
                </div>
            )}

            {/* Stats */}
            <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">💬</span>
                    <span className="font-semibold">{comments.length} Komentar</span>
                </div>
            </div>

            {/* Komentar */}
            <div>
                <h2 className="text-xl font-bold mb-4">Komentar ({comments.length})</h2>
                

                {/* Form tambah komentar — hanya muncul kalau sudah login */}
                {session ? (
                    <div className="flex gap-3 mb-6">
                        <input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Tulis komentar..."
                            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                        />
                        <button
                            onClick={handleSubmitComment}
                            disabled={submitting || !newComment.trim()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? "..." : "Kirim"}
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 mb-6">
                        <a href="/auth/login" className="text-blue-600 hover:underline">Login</a> untuk menambahkan komentar.
                    </p>
                )}

                {/* List komentar */}
                {comments.length === 0 ? (
                    <p className="text-gray-400 text-sm">Belum ada komentar.</p>
                ) : (
                    <div className="space-y-4">
                        {comments.map((c) => {
                            const inisial = c.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
                            const isCommentOwner = session?.user?.id === String(c.user_id)

                            return (
                                <div key={c.id} className="border-b pb-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
                                            {inisial}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-sm">{c.name}</span>
                                                    <span className="text-xs text-gray-500">
                                                        • {new Date(c.created_at).toLocaleDateString("id-ID", {
                                                            day: "numeric", month: "short", year: "numeric"
                                                        })}
                                                    </span>
                                                </div>
                                                {/* Tombol hapus — hanya owner komentar */}
                                                {isCommentOwner && (
                                                    <button
                                                        onClick={() => handleDeleteComment(c.id)}
                                                        className="text-xs text-red-500 hover:text-red-700"
                                                    >
                                                        Hapus
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-gray-700 text-sm">{c.comment}</p>
                                        </div>
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



