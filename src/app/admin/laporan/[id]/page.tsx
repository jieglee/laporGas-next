"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, User, Calendar, ArrowBigUp, MessageCircle, Building2 } from "lucide-react";
import { getReportById, updateReportStatus, type Report } from "@/lib/reports";
import { getComments, createComment, deleteComment, type Comment } from "@/lib/comments";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "@/components/admin/Laporan/types";
import type { AdminLaporanStatus } from "@/components/admin/Laporan/types";
import RejectModal from "@/components/admin/Laporan/RejectModal";
import { cn } from "@/lib/utils";

function fmtDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
}

function Avatar({ name, official = false, size = "md" }: { name: string; official?: boolean; size?: "sm" | "md" }) {
    const txt = (name ?? "?").split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase();
    return (
        <div className={cn(
            "rounded-full shrink-0 flex items-center justify-center font-bold text-white",
            official ? "bg-gradient-to-br from-blue-500 to-blue-700" : "bg-gradient-to-br from-[#FF6B35] to-[#E8541C]",
            size === "sm" ? "w-6 h-6 text-[8px]" : "w-9 h-9 text-[11px]"
        )}>
            {txt}
        </div>
    );
}

function ActionBtn({ label, onClick, className }: { label: string; onClick: () => void; className: string }) {
    return (
        <button onClick={onClick}
            className={cn("text-[0.82rem] font-semibold border-0 rounded-lg px-4 py-2 cursor-pointer transition-colors", className)}>
            {label}
        </button>
    );
}

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
    const [activeImg, setActiveImg] = useState(0);

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
            } catch { setError("Laporan tidak ditemukan"); }
            finally { setLoading(false); }
        }
        fetchData();
    }, [id]);

    const handleUpdateStatus = async (status: AdminLaporanStatus) => {
        if (!report) return;
        try {
            await updateReportStatus(report.id, status);
            setReport((prev) => prev ? { ...prev, status } : prev);
        } catch (err) { console.error(err); }
    };

    const handleConfirmReject = async (alasan: string) => {
        if (!report) return;
        try {
            await updateReportStatus(report.id, "rejected", alasan);
            setReport((prev) => prev ? { ...prev, status: "rejected", reject_reason: alasan } : prev);
            setRejectOpen(false);
        } catch (err) { console.error(err); }
    };

    const handleAddComment = async () => {
        if (!newComment.trim() || !report) return;
        try {
            setSubmitting(true);
            const comment = await createComment({ report_id: report.id, comment: newComment });
            setComments((prev) => [...prev, comment]);
            setNewComment("");
        } catch (err) { console.error(err); }
        finally { setSubmitting(false); }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment(commentId);
            setComments((prev) => prev.filter((c) => c.id !== commentId));
        } catch (err) { console.error(err); }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[300px]">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#f0e6dc] border-t-[#E8541C] rounded-full animate-spin mx-auto mb-3" />
                <p className="text-[0.82rem] text-[#a8856b]">Memuat laporan...</p>
            </div>
        </div>
    );

    if (error || !report) return (
        <div className="flex flex-col items-center justify-center h-[300px] gap-3">
            <p className="text-[0.85rem] text-[#C0392B]">{error ?? "Terjadi kesalahan"}</p>
            <button onClick={() => router.back()} className="text-[0.8rem] text-[#a8856b] bg-transparent border-0 cursor-pointer underline">Kembali</button>
        </div>
    );

    const statusCfg = STATUS_CONFIG[report.status as AdminLaporanStatus] ?? { label: report.status, badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
    const priorityCfg = PRIORITY_CONFIG[report.priority as keyof typeof PRIORITY_CONFIG] ?? { label: report.priority, badge: "bg-gray-100 text-gray-600" };

    const imgs = Array.isArray(report.images) && report.images.length > 0
        ? report.images
        : report.image_url ? [report.image_url] : [];

    const officialComments = comments.filter((c) => c.type === "official");
    const publicComments = comments.filter((c) => c.type === "public");

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
        fotoCount: imgs.length,
        pelapor: { nama: report.user_name ?? "-", inisial: (report.user_name ?? "U")[0], email: "-" },
        createdAt: report.created_at,
        upvote: 0,
        komentarCount: comments.length,
    };

    return (
        <div className="w-full max-w-[900px] mx-auto px-8 pt-8 pb-16 overflow-x-hidden">

            {/* Back */}
            <button onClick={() => router.back()}
                className="flex items-center gap-[6px] text-[0.82rem] text-[#a8856b] bg-transparent border-0 cursor-pointer mb-6 p-0 hover:text-[#E8541C] transition-colors">
                <ArrowLeft size={15} /> Kembali ke Daftar Laporan
            </button>

            {/* ── TOP: Judul + Badge ── */}
            <div className="mb-6">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className="text-[0.65rem] font-semibold tracking-[0.06em] uppercase text-[#9CA3AF] bg-[#F9FAFB] border border-[#F3F4F6] rounded-md px-2 py-[3px]">
                        #{report.id}
                    </span>
                    <span className={cn("inline-flex items-center gap-[5px] text-[0.72rem] font-semibold rounded-full px-3 py-1", statusCfg.badge)}>
                        <span className={cn("w-[5px] h-[5px] rounded-full", statusCfg.dot)} />
                        {statusCfg.label}
                    </span>
                    <span className={cn("text-[0.68rem] font-semibold rounded-md px-2.5 py-[3px]", priorityCfg.badge)}>
                        ↑ {priorityCfg.label}
                    </span>
                    {report.category_name && (
                        <span className="text-[0.68rem] text-[#6B7280] bg-[#F9FAFB] border border-[#F3F4F6] rounded-md px-2.5 py-[3px]">
                            {report.category_name}
                        </span>
                    )}
                </div>

                <h1 className="font-sans text-[1.75rem] font-extrabold text-[#111827] tracking-[-0.03em] leading-[1.2] m-0 mb-3">
                    {report.title}
                </h1>

                <div className="flex items-center gap-4 flex-wrap text-[0.78rem] text-[#9CA3AF]">
                    <span className="flex items-center gap-1.5">
                        <User size={13} strokeWidth={1.8} />
                        {report.user_name ?? "Anonim"}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Calendar size={13} strokeWidth={1.8} />
                        {fmtDate(report.created_at)}
                    </span>

                    {report.location && (
                        <span className="flex items-center gap-1.5">
                            <MapPin size={13} strokeWidth={1.8} />
                            <span className="break-words">
                                {report.location}
                            </span>
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-4 mt-3 text-[0.78rem] text-[#9CA3AF]">
                    <span className="flex items-center gap-1.5">
                        <MessageCircle size={13} strokeWidth={1.8} />
                        {comments.length} komentar
                    </span>

                    <span className="flex items-center gap-1.5">
                        <ArrowBigUp size={13} strokeWidth={1.8} />
                        {report.upvote_count ?? 0} dukungan
                    </span>
                </div>
            </div>

            {/* ── MAIN GRID ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-5 mb-5">

                {/* ── KIRI ── */}
                <div className="flex flex-col gap-5 min-w-0">

                    {/* Foto */}
                    {imgs.length > 0 && (
                        <div className="bg-white rounded-2xl border border-[#f0e6dc] overflow-hidden">
                            <div className="relative w-full aspect-video bg-[#f5f0eb] overflow-hidden">
                                <img
                                    src={imgs[activeImg]}
                                    alt="Foto laporan"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                {imgs.length > 1 && (
                                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 justify-center">
                                        {imgs.map((_, i) => (
                                            <button key={i} onClick={() => setActiveImg(i)}
                                                className={cn("w-2 h-2 rounded-full transition-all border-0 cursor-pointer",
                                                    i === activeImg ? "bg-white scale-125" : "bg-white/50")} />
                                        ))}
                                    </div>
                                )}
                            </div>
                            {imgs.length > 1 && (
                                <div className="flex gap-2 p-3 overflow-x-auto max-w-full">
                                    {imgs.map((url, i) => (
                                        <button key={i} onClick={() => setActiveImg(i)}
                                            className={cn("w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition-all p-0",
                                                i === activeImg ? "border-[#E8541C]" : "border-transparent opacity-60 hover:opacity-100")}>
                                            <img src={url} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Deskripsi */}
                    <div className="bg-white rounded-2xl border border-[#f0e6dc] px-6 py-5">
                        <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#fa6d1b] m-0 mb-3">Kronologi</p>
                        <p className="text-[0.9rem] text-[#374151] leading-[1.8] m-0 break-all">
                            {report.description}
                        </p>
                        {report.status === "rejected" && report.reject_reason && (
                            <div className="mt-4 bg-red-50 border border-red-100 rounded-xl px-5 py-4">
                                <p className="text-[0.65rem] font-bold text-red-400 uppercase tracking-[0.08em] m-0 mb-2">✕ Alasan penolakan</p>
                                <p className="text-[0.85rem] text-red-800 m-0 leading-[1.65]">{report.reject_reason}</p>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl border border-[#f0e6dc] px-6 py-5">
                        <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#fa6d1b] m-0 mb-3">Update Status</p>
                        <div className="flex gap-2 flex-wrap">
                            {report.status === "pending" && (<>
                                <ActionBtn label="✓ Approve" onClick={() => handleUpdateStatus("approved")} className="text-blue-800 bg-blue-100 hover:bg-blue-200" />
                                <ActionBtn label="✕ Reject" onClick={() => setRejectOpen(true)} className="text-red-800 bg-red-100 hover:bg-red-200" />
                            </>)}
                            {report.status === "approved" && (<>
                                <ActionBtn label="→ On Progress" onClick={() => handleUpdateStatus("on_progress")} className="text-orange-700 bg-orange-100 hover:bg-orange-200" />
                                <ActionBtn label="✕ Reject" onClick={() => setRejectOpen(true)} className="text-red-800 bg-red-100 hover:bg-red-200" />
                            </>)}
                            {report.status === "on_progress" && (
                                <ActionBtn label="✓ Selesai" onClick={() => handleUpdateStatus("completed")} className="text-emerald-800 bg-emerald-100 hover:bg-emerald-200" />
                            )}
                            {report.status === "completed" && (
                                <span className="text-[0.82rem] text-emerald-700 font-semibold">✓ Selesai ditangani</span>
                            )}
                            {report.status === "rejected" && (
                                <span className="text-[0.82rem] text-red-700 font-semibold">✕ Laporan ditolak</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── KANAN: Maps + Stats ── */}
                <div className="flex flex-col gap-4 min-w-0">
                    {report.latitude && report.longitude ? (
                        <div className="bg-white rounded-2xl border border-[#f0e6dc] overflow-hidden min-w-0">
                            <div className="px-4 py-3 border-b border-[#f0e6dc] flex items-center gap-2">
                                <MapPin size={14} color="#E8541C" strokeWidth={2} />
                                <span className="text-[0.78rem] font-semibold text-[#3d2817]">Lokasi Kejadian</span>
                            </div>
                            <iframe
                                src={`https://maps.google.com/maps?q=${report.latitude},${report.longitude}&z=15&output=embed`}
                                width="100%" height="240" loading="lazy"
                                className="border-0 w-full block"
                            />
                            {report.location && (
                                <div className="px-4 py-3 border-t border-[#f0e6dc]">
                                    <p className="text-[0.75rem] text-[#6b5546] m-0 flex items-start gap-1.5">
                                        <MapPin size={12} className="shrink-0 mt-0.5 text-[#E8541C]" strokeWidth={2} />
                                        {report.location}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-[#f0e6dc] p-6 text-center">
                            <div className="w-10 h-10 rounded-full bg-[#FFF5EE] flex items-center justify-center mx-auto mb-3">
                                <MapPin size={18} color="#E8541C" strokeWidth={1.8} />
                            </div>
                            <p className="text-[0.78rem] text-[#a8856b] m-0">Lokasi tidak tersedia</p>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="bg-white rounded-2xl border border-[#f0e6dc] px-5 py-4">
                        <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#fa6d1b] m-0 mb-3">Statistik</p>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <ArrowBigUp
                                        size={15}
                                        strokeWidth={1.8}
                                        className="shrink-0"
                                    />
                                    <span className="text-[0.8rem] text-[#6b5546]">
                                        Dukungan
                                    </span>
                                </div>

                                <span className="text-[0.8rem] font-bold text-[#1a0e08] leading-none">
                                    {report.upvote_count ?? 0}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-[0.8rem] text-[#6b5546]">
                                    <MessageCircle size={14} strokeWidth={1.8} /> Komentar
                                </span>
                                <span className="text-[0.8rem] font-bold text-[#1a0e08]">{comments.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── TINDAK LANJUT ── */}
            {officialComments.length > 0 && (
                <div className="bg-white rounded-2xl border border-[#DBEAFE] px-6 py-5 mb-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-[10px] flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 shrink-0">
                            <Building2 size={15} color="white" strokeWidth={2} />
                        </div>
                        <div>
                            <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#93C5FD] m-0">Tindak Lanjut</p>
                            <p className="text-[0.85rem] font-bold text-[#1E40AF] m-0">Catatan resmi instansi</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {officialComments.map((c) => (
                            <div key={c.id} className="flex gap-3">
                                <div className="w-[3px] rounded-full shrink-0 min-h-[40px] bg-gradient-to-b from-blue-500 to-blue-300" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <Avatar name={c.name ?? "A"} size="sm" official />
                                        <span className="text-[0.8rem] font-bold text-[#1E3A8A]">{c.name ?? "Admin"}</span>
                                        <span className="text-[0.6rem] font-bold bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE] px-2 py-[2px] rounded-full">INSTANSI</span>
                                        <span className="text-[0.7rem] text-[#93C5FD]">{fmtDate(c.created_at)}</span>
                                        <button onClick={() => handleDeleteComment(c.id)}
                                            className="ml-auto text-[0.7rem] text-red-300 bg-transparent border-0 cursor-pointer p-0 hover:text-red-500">
                                            Hapus
                                        </button>
                                    </div>
                                    <p className="text-[0.88rem] text-[#1E40AF] leading-[1.65] m-0 pl-8">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Input tindak lanjut */}
            <div className="bg-white rounded-2xl border border-[#f0e6dc] px-6 py-5 mb-5">
                <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#fa6d1b] m-0 mb-3">Tulis Tindak Lanjut</p>
                <div className="flex gap-2">
                    <input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Tulis tindak lanjut resmi sebagai admin..."
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                        className="flex-1 border border-[#BFDBFE] rounded-xl px-4 py-[10px] text-[0.85rem] outline-none text-[#000] bg-[#F0F9FF] focus:border-blue-400 transition-colors"
                    />
                    <button onClick={handleAddComment} disabled={submitting || !newComment.trim()}
                        className="bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0 rounded-xl px-5 py-[10px] text-[0.82rem] font-semibold cursor-pointer disabled:opacity-40 transition-opacity">
                        {submitting ? "..." : "Kirim"}
                    </button>
                </div>
            </div>

            {/* ── KOMENTAR PUBLIK ── */}
            <div className="bg-white rounded-2xl border border-[#f0e6dc] px-6 py-5">
                <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#fa6d1b] m-0 mb-1">Diskusi</p>
                <p className="text-[0.88rem] font-bold text-[#111827] m-0 mb-5">
                    Komentar Publik <span className="text-[#9CA3AF] font-normal">({publicComments.length})</span>
                </p>
                {publicComments.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-[0.82rem] text-[#D1D5DB] m-0">Belum ada komentar dari publik</p>
                    </div>
                ) : (
                    <div className="flex flex-col divide-y divide-[#f5f5f5]">
                        {publicComments.map((c) => (
                            <div key={c.id} className="flex gap-3 py-4 first:pt-0">
                                <Avatar name={c.name ?? "U"} />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[0.82rem] font-bold text-[#111827]">{c.name ?? "Anonim"}</span>
                                            <span className="text-[0.7rem] text-[#D1D5DB]">{fmtDate(c.created_at)}</span>
                                        </div>
                                        <button onClick={() => handleDeleteComment(c.id)}
                                            className="text-[0.7rem] text-[#FCA5A5] bg-transparent border-0 cursor-pointer p-0 hover:text-[#EF4444] transition-colors">
                                            Hapus
                                        </button>
                                    </div>
                                    <p className="text-[0.85rem] text-[#374151] leading-[1.65] m-0">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <RejectModal
                laporan={rejectOpen ? laporanForModal : null}
                onClose={() => setRejectOpen(false)}
                onConfirm={handleConfirmReject}
            />
        </div>
    );
}