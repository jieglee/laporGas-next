"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getReportById, updateReportStatus, type Report } from "@/lib/reports";
import { getComments, createComment, deleteComment, type Comment } from "@/lib/comments";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "@/components/admin/Laporan/types";
import type { AdminLaporanStatus } from "@/components/admin/Laporan/types";
import RejectModal from "@/components/admin/Laporan/RejectModal";
import { cn } from "@/lib/utils";


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
        } catch (err) { console.error("Gagal update status:", err); }
    };

    const handleConfirmReject = async (alasan: string) => {
        if (!report) return;
        try {
            await updateReportStatus(report.id, "rejected");
            setReport((prev) => prev ? { ...prev, status: "rejected" } : prev);
            setRejectOpen(false);
        } catch (err) { console.error("Gagal reject:", err); }
    };

    const handleAddComment = async () => {
        if (!newComment.trim() || !report) return;
        try {
            setSubmitting(true);
            const comment = await createComment({ report_id: report.id, comment: newComment });
            setComments((prev) => [...prev, comment]);
            setNewComment("");
        } catch (err) { console.error("Gagal kirim komentar:", err); }
        finally { setSubmitting(false); }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment(commentId);
            setComments((prev) => prev.filter((c) => c.id !== commentId));
        } catch (err) { console.error("Gagal hapus komentar:", err); }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[300px]">
            <p className="text-[0.85rem] text-[#a8856b]">Memuat laporan...</p>
        </div>
    );

    if (error || !report) return (
        <div className="flex flex-col items-center justify-center h-[300px] gap-3">
            <p className="text-[0.85rem] text-[#C0392B]">{error ?? "Terjadi kesalahan"}</p>
            <button onClick={() => router.back()} className="text-[0.8rem] text-[#a8856b] bg-transparent border-0 cursor-pointer underline">
                Kembali
            </button>
        </div>
    );

    const statusCfg = STATUS_CONFIG[report.status as AdminLaporanStatus] ?? { label: report.status, badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
    const priorityCfg = PRIORITY_CONFIG[report.priority as keyof typeof PRIORITY_CONFIG] ?? { label: report.priority, badge: "bg-gray-100 text-gray-600" };

    const laporanForModal = {
        id: String(report.id),
        judul: report.title,
        deskripsi: report.description,
        kategori: "infrastruktur" as const,
        status: report.status as AdminLaporanStatus,
        priority: report.priority as "low" | "medium" | "high" | "urgent",
        lokasi: report.location ?? "-",
        alamat: report.location ?? "-",
        koordinat: { lat: 0, lng: 0 },
        fotoCount: report.images?.length || (report.image_url ? 1 : 0),
        pelapor: { nama: report.user_name ?? "-", inisial: (report.user_name ?? "U")[0], email: "-" },
        createdAt: report.created_at,
        upvote: 0,
        komentarCount: comments.length,
    };

return (
    <div className="px-8 pt-8 pb-16 max-w-[900px] mx-auto">
        <button
            onClick={() => router.back()}
            className="flex items-center gap-[6px] text-[0.82rem] text-[#a8856b] bg-transparent border-0 cursor-pointer mb-6 p-0"
        >
            <ArrowLeft size={15} />
            Kembali ke Daftar Laporan
        </button>

        {/* Header */}
        <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-2xl px-7 py-6 mb-4">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-[0.7rem] text-[#a8856b] bg-[#FFF5EE] border-[0.5px] border-[#f0e6dc] rounded-[6px] px-2 py-[2px]">
                    #{report.id}
                </span>
                <span className={cn("text-[0.72rem] font-semibold rounded-[20px] px-[10px] py-[3px]", statusCfg.badge)}>
                    ● {statusCfg.label}
                </span>
                <span className={cn("text-[0.72rem] font-semibold rounded-[20px] px-[10px] py-[3px]", priorityCfg.badge)}>
                    {priorityCfg.label}
                </span>
            </div>

            <h1 className="font-sans text-[1.35rem] font-extrabold text-[#1a0e08] tracking-[-0.025em] m-0 mb-2">
                {report.title}
            </h1>
            <p className="text-[0.8rem] text-[#a8856b] m-0 mb-4">
                {report.user_name} · {new Date(report.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })} · {report.location ?? "-"}
            </p>
            <p className="text-[0.88rem] text-[#3d2817] leading-[1.7] m-0">{report.description}</p>

            {/* Maps — selalu tampil kalau ada koordinat, independent dari foto */}
            {report.latitude && report.longitude && (
                <div className="mt-5 overflow-hidden rounded-[14px] border border-[#F3F4F6]">
                    <iframe
                        src={`https://maps.google.com/maps?q=${report.latitude},${report.longitude}&z=15&output=embed`}
                        width="100%"
                        height="260"
                        loading="lazy"
                        className="border-0 w-full block"
                    />
                </div>
            )}

            {/* Foto */}
            {(() => {
                const imgs = Array.isArray(report.images) && report.images.length > 0
                    ? report.images
                    : report.image_url
                        ? [report.image_url]
                        : [];

                if (imgs.length === 0) return null;

                return (
                    <div className="mt-4">
                        <img
                            src={imgs[0]}
                            alt="Bukti laporan"
                            className="w-full max-h-[320px] object-cover rounded-xl border border-[#f0e6dc]"
                        />
                        {imgs.length > 1 && (
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 mt-2">
                                {imgs.slice(1).map((url, i) => (
                                    <img
                                        key={i}
                                        src={url}
                                        alt={`Foto ${i + 2}`}
                                        className="w-full aspect-square object-cover rounded-lg border border-[#f0e6dc] cursor-pointer"
                                        onClick={() => window.open(url, "_blank")}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })()}
        </div>

        {/* Actions */}
        <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-2xl px-7 py-5 mb-4">
            <p className="text-[0.75rem] font-semibold text-[#a8856b] mb-3 uppercase tracking-[0.08em]">Update Status</p>
            <div className="flex gap-2 flex-wrap">
                {report.status === "pending" && (<>
                    <ActionBtn label="✓ Approve" onClick={() => handleUpdateStatus("approved")} className="text-blue-800 bg-blue-100" />
                    <ActionBtn label="✕ Reject" onClick={() => setRejectOpen(true)} className="text-red-800 bg-red-100" />
                </>)}
                {report.status === "approved" && (<>
                    <ActionBtn label="→ On Progress" onClick={() => handleUpdateStatus("on_progress")} className="text-orange-700 bg-orange-100" />
                    <ActionBtn label="✕ Reject" onClick={() => setRejectOpen(true)} className="text-red-800 bg-red-100" />
                </>)}
                {report.status === "on_progress" && (
                    <ActionBtn label="✓ Selesai" onClick={() => handleUpdateStatus("completed")} className="text-emerald-800 bg-emerald-100" />
                )}
                {report.status === "completed" && (
                    <span className="text-[0.82rem] text-[#047857] font-semibold">✓ Selesai ditangani</span>
                )}
                {/* Rejected — satu blok, tidak duplikat */}
                {report.status === "rejected" && (
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-[0.82rem] text-[#B91C1C] font-semibold">✕ Laporan ditolak</span>
                        {report.reject_reason && (
                            <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                                <p className="text-[0.7rem] font-bold text-red-400 uppercase tracking-[0.06em] m-0 mb-1">Alasan penolakan</p>
                                <p className="text-[0.82rem] text-red-800 m-0 leading-[1.6]">{report.reject_reason}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* TINDAK LANJUT ADMIN */}
        <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-2xl px-7 py-5 mb-4">
            <p className="text-[0.75rem] font-semibold text-[#a8856b] mb-4 uppercase tracking-[0.08em]">
                Tindak Lanjut Admin ({comments.filter(c => c.type === "official").length})
            </p>
            <div className="flex flex-col gap-[10px] mb-4">
                {comments.filter(c => c.type === "official").length === 0 && (
                    <p className="text-[0.82rem] text-[#a8856b]">Belum ada tindak lanjut resmi</p>
                )}
                {comments.filter(c => c.type === "official").map((c) => {
                    const inisial = (c.name ?? "A").split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase();
                    return (
                        <div key={c.id} className="rounded-[10px] px-[14px] py-[10px] flex justify-between items-start gap-2 bg-[#EFF6FF] border-l-[3px] border-[#3B82F6]">
                            <div className="flex gap-[10px] flex-1">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[0.7rem] font-bold text-white shrink-0 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]">
                                    {inisial}
                                </div>
                                <div>
                                    <div className="flex items-center gap-[6px] mb-[2px]">
                                        <p className="text-[0.78rem] font-semibold text-[#1a0e08] m-0">{c.name ?? "Admin"}</p>
                                        <span className="text-[0.6rem] font-bold bg-[#DBEAFE] text-[#1D4ED8] px-[6px] py-[1px] rounded-full border border-[#BFDBFE]">
                                            INSTANSI
                                        </span>
                                    </div>
                                    <p className="text-[0.82rem] text-[#3d2817] m-0">{c.comment}</p>
                                    <p className="text-[0.7rem] text-[#a8856b] mt-1 mb-0">
                                        {new Date(c.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => handleDeleteComment(c.id)}
                                className="text-[0.7rem] text-[#C0392B] bg-transparent border-0 cursor-pointer shrink-0 p-0">
                                Hapus
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="flex gap-2">
                <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tulis tindak lanjut resmi sebagai admin..."
                    className="flex-1 border-[0.5px] border-[#BFDBFE] rounded-lg px-3 py-2 text-[0.82rem] outline-none text-[#1a0e08] bg-[#F0F9FF]"
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                />
                <button
                    onClick={handleAddComment}
                    disabled={submitting || !newComment.trim()}
                    className="bg-[#1D4ED8] text-white border-0 rounded-lg px-4 py-2 text-[0.82rem] font-semibold cursor-pointer disabled:opacity-50"
                >
                    {submitting ? "..." : "Kirim"}
                </button>
            </div>
        </div>

        {/* KOMENTAR PUBLIK */}
        <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-2xl px-7 py-5">
            <p className="text-[0.75rem] font-semibold text-[#a8856b] mb-4 uppercase tracking-[0.08em]">
                Komentar Publik ({comments.filter(c => c.type === "public").length})
            </p>
            <div className="flex flex-col gap-[10px]">
                {comments.filter(c => c.type === "public").length === 0 && (
                    <p className="text-[0.82rem] text-[#a8856b]">Belum ada komentar dari publik</p>
                )}
                {comments.filter(c => c.type === "public").map((c) => {
                    const inisial = (c.name ?? "U").split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase();
                    return (
                        <div key={c.id} className="rounded-[10px] px-[14px] py-[10px] flex justify-between items-start gap-2 bg-[#FFF5EE]">
                            <div className="flex gap-[10px] flex-1">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[0.7rem] font-bold text-white shrink-0 bg-gradient-to-br from-[#FF6B35] to-[#E8541C]">
                                    {inisial}
                                </div>
                                <div>
                                    <p className="text-[0.78rem] font-semibold text-[#1a0e08] m-0 mb-[2px]">{c.name ?? "Anonim"}</p>
                                    <p className="text-[0.82rem] text-[#3d2817] m-0">{c.comment}</p>
                                    <p className="text-[0.7rem] text-[#a8856b] mt-1 mb-0">
                                        {new Date(c.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => handleDeleteComment(c.id)}
                                className="text-[0.7rem] text-[#C0392B] bg-transparent border-0 cursor-pointer shrink-0 p-0">
                                Hapus
                            </button>
                        </div>
                    );
                })}
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

function ActionBtn({ label, onClick, className }: { label: string; onClick: () => void; className: string }) {
    return (
        <button onClick={onClick} className={cn("text-[0.82rem] font-semibold border-0 rounded-lg px-4 py-2 cursor-pointer", className)}>
            {label}
        </button>
    );
}