"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getReportById, updateReportStatus, type Report } from "@/lib/reports";
import { getComments, createComment, deleteComment, type Comment } from "@/lib/comments";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "@/components/admin/Laporan/types";
import type { AdminLaporanStatus } from "@/components/admin/Laporan/types";
import RejectModal from "@/components/admin/Laporan/RejectModal";

export default function AdminLaporanDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [report, setReport] = useState<Report | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [reportData, commentsData] = await Promise.all([
                    getReportById(Number(id)),
                    getComments(Number(id)),
                ]);
                setReport(reportData);
                setComments(commentsData);
            } catch {
                setError("Laporan tidak ditemukan");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleUpdateStatus = async (status: AdminLaporanStatus) => {
        if (!report) return;
        try {
            await updateReportStatus(report.id, status);
            setReport((prev) => prev ? { ...prev, status } : prev);
        } catch (err) {
            console.error("Gagal update status:", err);
        }
    };

    const handleConfirmReject = async (_alasan: string) => {
        if (!report) return;
        try {
            await updateReportStatus(report.id, "rejected");
            setReport((prev) => prev ? { ...prev, status: "rejected" } : prev);
            setRejectOpen(false);
        } catch (err) {
            console.error("Gagal reject:", err);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim() || !report) return;
        try {
            setSubmitting(true);
            const comment = await createComment({ report_id: report.id, comment: newComment });
            setComments((prev) => [...prev, comment]);
            setNewComment("");
        } catch (err) {
            console.error("Gagal kirim komentar:", err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment(commentId);
            setComments((prev) => prev.filter((c) => c.id !== commentId));
        } catch (err) {
            console.error("Gagal hapus komentar:", err);
        }
    };

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
            <p style={{ fontSize: "0.85rem", color: "#a8856b" }}>Memuat laporan...</p>
        </div>
    );

    if (error || !report) return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, gap: 12 }}>
            <p style={{ fontSize: "0.85rem", color: "#C0392B" }}>{error ?? "Terjadi kesalahan"}</p>
            <button onClick={() => router.back()} style={{ fontSize: "0.8rem", color: "#a8856b", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                Kembali
            </button>
        </div>
    );

    const statusCfg = STATUS_CONFIG[report.status as AdminLaporanStatus] ?? { label: report.status, bg: "#F3F4F6", color: "#6B7280", dot: "#9CA3AF" };
    const priorityCfg = PRIORITY_CONFIG[report.priority as keyof typeof PRIORITY_CONFIG] ?? { label: report.priority, bg: "#F3F4F6", color: "#6B7280" };

const laporanForModal = {
    id: String(report.id),
    judul: report.title,
    deskripsi: report.description,
    kategori: "infrastruktur" as const,
    status: report.status as AdminLaporanStatus,
    priority: report.priority as "low" | "medium" | "high" | "urgent",
    
    lokasi: report.location ?? "-",
    alamat: report.location ?? "-",

    koordinat: {
        lat: 0,
        lng: 0,
    },

    fotoCount: report.image_url ? 1 : 0,

    pelapor: {
        nama: report.user_name ?? "-",
        inisial: (report.user_name ?? "U")[0],
        email: "-",
    },

    createdAt: report.created_at,
    upvote: 0,
    komentarCount: comments.length,
};

    return (
        <div style={{ padding: "32px 32px 64px", maxWidth: 900, margin: "0 auto" }}>
            <button
                onClick={() => router.back()}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#a8856b", background: "none", border: "none", cursor: "pointer", marginBottom: 24, padding: 0 }}
            >
                <ArrowLeft size={15} />
                Kembali ke Daftar Laporan
            </button>

            {/* Header */}
            <div style={{ background: "white", border: "0.5px solid #f0e6dc", borderRadius: 16, padding: "24px 28px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.7rem", color: "#a8856b", background: "#FFF5EE", border: "0.5px solid #f0e6dc", borderRadius: 6, padding: "2px 8px" }}>#{report.id}</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, background: statusCfg.bg, color: statusCfg.color, borderRadius: 20, padding: "3px 10px" }}>● {statusCfg.label}</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, background: priorityCfg.bg, color: priorityCfg.color, borderRadius: 20, padding: "3px 10px" }}>{priorityCfg.label}</span>
                </div>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.35rem", fontWeight: 800, color: "#1a0e08", letterSpacing: "-0.025em", margin: "0 0 8px" }}>{report.title}</h1>
                <p style={{ fontSize: "0.8rem", color: "#a8856b", margin: "0 0 16px" }}>
                    {report.user_name} · {new Date(report.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })} · {report.location ?? "-"}
                </p>
                <p style={{ fontSize: "0.88rem", color: "#3d2817", lineHeight: 1.7, margin: 0 }}>{report.description}</p>
                {report.image_url && (
                    <img src={report.image_url} alt="Bukti" style={{ marginTop: 16, width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 12, border: "0.5px solid #f0e6dc" }} />
                )}
            </div>

            {/* Actions */}
            <div style={{ background: "white", border: "0.5px solid #f0e6dc", borderRadius: 16, padding: "20px 28px", marginBottom: 16 }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#a8856b", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Update Status</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {report.status === "pending" && (<>
                        <ActionBtn label="✓ Approve" onClick={() => handleUpdateStatus("approved")} color="#1D4ED8" bg="#DBEAFE" />
                        <ActionBtn label="✕ Reject" onClick={() => setRejectOpen(true)} color="#B91C1C" bg="#FEE2E2" />
                    </>)}
                    {report.status === "approved" && (<>
                        <ActionBtn label="→ On Progress" onClick={() => handleUpdateStatus("on_progress")} color="#C2410C" bg="#FFEDD5" />
                        <ActionBtn label="✕ Reject" onClick={() => setRejectOpen(true)} color="#B91C1C" bg="#FEE2E2" />
                    </>)}
                    {report.status === "on_progress" && (
                        <ActionBtn label="✓ Selesai" onClick={() => handleUpdateStatus("completed")} color="#047857" bg="#D1FAE5" />
                    )}
                    {report.status === "completed" && <span style={{ fontSize: "0.82rem", color: "#047857", fontWeight: 600 }}>✓ Selesai ditangani</span>}
                    {report.status === "rejected" && <span style={{ fontSize: "0.82rem", color: "#B91C1C", fontWeight: 600 }}>✕ Laporan ditolak</span>}
                </div>
            </div>

            {/* Komentar */}
            <div style={{ background: "white", border: "0.5px solid #f0e6dc", borderRadius: 16, padding: "20px 28px" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#a8856b", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Komentar & Tindak Lanjut ({comments.length})
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                    {comments.length === 0 && <p style={{ fontSize: "0.82rem", color: "#a8856b" }}>Belum ada komentar</p>}
                    {comments.map((c) => {
    const inisial = (c.name ?? "A").split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase();
    const isOfficial = c.type === "official";
    return (
        <div key={c.id} style={{
            background: isOfficial ? "#EFF6FF" : "#FFF5EE",
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 8,
            borderLeft: isOfficial ? "3px solid #3B82F6" : "none",
        }}>
            <div style={{ display: "flex", gap: 10, flex: 1 }}>
                <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: isOfficial ? "linear-gradient(135deg, #3B82F6, #1D4ED8)" : "linear-gradient(135deg, #FF6B35, #E8541C)",
                    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.7rem", fontWeight: 700, flexShrink: 0
                }}>
                    {inisial}
                </div>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1a0e08", margin: 0 }}>
                            {c.name ?? "Admin"}
                        </p>
                        {isOfficial && (
                            <span style={{ fontSize: "0.6rem", fontWeight: 700, background: "#DBEAFE", color: "#1D4ED8", padding: "1px 6px", borderRadius: 99, border: "1px solid #BFDBFE" }}>
                                INSTANSI
                            </span>
                        )}
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "#3d2817", margin: 0 }}>{c.comment}</p>
                    <p style={{ fontSize: "0.7rem", color: "#a8856b", margin: "4px 0 0" }}>
                        {new Date(c.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                </div>
            </div>
            <button onClick={() => handleDeleteComment(c.id)} style={{ fontSize: "0.7rem", color: "#C0392B", background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0 }}>
                Hapus
            </button>
        </div>
    );
})}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Tulis tindak lanjut sebagai admin..."
                        style={{ flex: 1, border: "0.5px solid #f0e6dc", borderRadius: 8, padding: "8px 12px", fontSize: "0.82rem", outline: "none", color: "#1a0e08", background: "#fafaf8" }}
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                    />
                    <button
                        onClick={handleAddComment}
                        disabled={submitting || !newComment.trim()}
                        style={{ background: "#E8541C", color: "white", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", opacity: submitting || !newComment.trim() ? 0.5 : 1 }}
                    >
                        {submitting ? "..." : "Kirim"}
                    </button>
                </div>
            </div>

            <RejectModal
                laporan={rejectOpen ? laporanForModal : null}
                onClose={() => setRejectOpen(false)}
                onConfirm={handleConfirmReject}
            />
        </div>
    );
}

function ActionBtn({ label, onClick, color, bg }: { label: string; onClick: () => void; color: string; bg: string }) {
    return (
        <button onClick={onClick} style={{ fontSize: "0.82rem", fontWeight: 600, color, background: bg, border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer" }}>
            {label}
        </button>
    );
}