"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Pencil, MapPin, Calendar, User, Tag, ArrowBigUp, MessageCircle, Trash2, Building2 } from "lucide-react";
import { getReportById, type Report } from "@/lib/reports";
import { getComments, createComment, deleteComment, type Comment } from "@/lib/comments";
import { STATUS_CFG, PRIORITY_CFG } from "@/constants/report-config";
import { cn } from "@/lib/utils";
import EditLaporanModal from "@/components/admin/Users/profile/EditLaporanModal";

interface Props { reportId: number; }

function fmtDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
}

function Avatar({ name, size = "md", official = false }: { name: string; size?: "sm" | "md"; official?: boolean }) {
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

export default function LaporanDetail({ reportId }: Props) {
    const { data: session } = useSession();
    const role = session?.user?.role;
    const isAdmin = role === "admin" || role === "superadmin";

    const [report, setReport] = useState<Report | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [reportData, commentsData] = await Promise.all([
                    getReportById(reportId), getComments(reportId),
                ]);
                setReport(reportData);
                setComments(commentsData);
            } catch { setError("Laporan tidak ditemukan"); }
            finally { setLoading(false); }
        }
        fetchData();
    }, [reportId]);

    const handleSubmitComment = async () => {
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

    const handleLaporanSaved = (updated: Report) => {
        setReport((prev) => prev ? { ...prev, ...updated } : prev);
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#f0e6dc] border-t-[#E8541C] rounded-full animate-spin mx-auto mb-3" />
                <p className="text-[0.82rem] text-[#a8856b]">Memuat laporan...</p>
            </div>
        </div>
    );

    if (error || !report) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-[0.85rem] text-red-500">{error ?? "Terjadi kesalahan"}</p>
        </div>
    );

    const statusCfg = STATUS_CFG[report.status] ?? { label: report.status, badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
    const priorityCfg = PRIORITY_CFG[report.priority] ?? { label: String(report.priority), text: "text-gray-500", soft: "text-gray-500 bg-gray-500/10" };
    const officialComments = comments.filter((c) => c.type === "official");
    const publicComments = comments.filter((c) => c.type === "public");
    const isOwner = session?.user?.id === String(report.user_id);
    const canEdit = isOwner && report.status === "pending" && (report.edit_count ?? 0) < 1;

    const imgs = Array.isArray(report.images)
        ? report.images
        : report.image_url ? [report.image_url] : [];

    return (
        <div className="w-full max-w-[1400px] mx-auto px-8 py-8">

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
                    <span className={cn("text-[0.68rem] font-semibold rounded-md px-2.5 py-0.75", priorityCfg.soft)}>
                        ↑ {priorityCfg.label}
                    </span>
                    {report.category_name && (
                        <span className="text-[0.68rem] text-[#6B7280] bg-[#F9FAFB] border border-[#F3F4F6] rounded-md px-[10px] py-[3px]">
                            {report.category_name}
                        </span>
                    )}
                    {canEdit && (
                        <button onClick={() => setEditOpen(true)}
                            className="ml-auto inline-flex items-center gap-[6px] px-3 py-[6px] rounded-lg text-[0.72rem] font-semibold text-[#E8541C] bg-[#FFF5EE] border border-[rgba(232,84,28,0.2)] hover:bg-[#FFE8DC] transition-colors cursor-pointer">
                            <Pencil size={12} strokeWidth={2} /> Edit Laporan
                        </button>
                    )}
                </div>

                <h1 className="font-sans text-[1.75rem] font-extrabold text-[#111827] tracking-[-0.03em] leading-[1.2] m-0 mb-3">
                    {report.title}
                </h1>

                {/* Meta row */}
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
                            {report.location}
                        </span>
                    )}
                </div>
            </div>

            {/* ── MAIN GRID: Kiri (konten) + Kanan (maps) ── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 mb-6">

                {/* ── KIRI ── */}
                <div className="flex flex-col gap-5">

                    {/* Foto */}
                    {imgs.length > 0 && (
                        <div className="bg-white rounded-2xl border border-[#f0e6dc] overflow-hidden">
                            <div className="relative w-full aspect-[16/9] bg-[#f5f0eb]">
                                <img
                                    src={imgs[activeImg]}
                                    alt="Foto laporan"
                                    className="w-full h-full object-cover"
                                />
                                {imgs.length > 1 && (
                                    <div className="absolute bottom-3 left-3 right-3 flex gap-2 justify-center">
                                        {imgs.map((_, i) => (
                                            <button key={i} onClick={() => setActiveImg(i)}
                                                className={cn(
                                                    "w-2 h-2 rounded-full transition-all border-0 cursor-pointer",
                                                    i === activeImg ? "bg-white scale-125" : "bg-white/50"
                                                )} />
                                        ))}
                                    </div>
                                )}
                            </div>
                            {imgs.length > 1 && (
                                <div className="flex gap-2 p-3 overflow-x-auto">
                                    {imgs.map((url, i) => (
                                        <button key={i} onClick={() => setActiveImg(i)}
                                            className={cn(
                                                "w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer transition-all p-0",
                                                i === activeImg ? "border-[#E8541C]" : "border-transparent opacity-60 hover:opacity-100"
                                            )}>
                                            <img src={url} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Deskripsi */}
                    <div className="bg-white rounded-2xl border border-[#f0e6dc] px-6 py-5">
                        <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#D1D5DB] m-0 mb-3">Kronologi</p>
                        <p className="text-[0.9rem] text-[#374151] leading-[1.8] m-0">{report.description}</p>

                        {report.status === "rejected" && report.reject_reason && (
                            <div className="mt-4 bg-red-50 border border-red-100 rounded-xl px-5 py-4">
                                <p className="text-[0.65rem] font-bold text-red-400 uppercase tracking-[0.08em] m-0 mb-2">✕ Alasan penolakan</p>
                                <p className="text-[0.85rem] text-red-800 m-0 leading-[1.65]">{report.reject_reason}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── KANAN: Maps ── */}
                <div className="flex flex-col gap-4">
                    {report.latitude && report.longitude ? (
                        <div className="bg-white rounded-2xl border border-[#f0e6dc] overflow-hidden">
                            <div className="px-4 py-3 border-b border-[#f0e6dc] flex items-center gap-2">
                                <MapPin size={14} color="#E8541C" strokeWidth={2} />
                                <span className="text-[0.78rem] font-semibold text-[#3d2817]">Lokasi Kejadian</span>
                            </div>
                            <iframe
                                src={`https://maps.google.com/maps?q=${report.latitude},${report.longitude}&z=15&output=embed`}
                                width="100%"
                                height="260"
                                loading="lazy"
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

                    {/* Stats card */}
                    <div className="bg-white rounded-2xl border border-[#f0e6dc] px-5 py-4">
                        <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#D1D5DB] m-0 mb-3">Statistik</p>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-[0.8rem] text-[#6b5546]">
                                    <ArrowBigUp size={15} strokeWidth={1.8} /> Dukungan
                                </span>
                                <span className="text-[0.8rem] font-bold text-[#1a0e08]">{report.upvote_count ?? 0}</span>
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
                            <p className="text-[0.85rem] font-bold text-[#1E40AF] m-0">Catatan resmi</p>
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
                                        {session?.user?.id === String(c.user_id) && (
                                            <button onClick={() => handleDeleteComment(c.id)} className="ml-auto text-[0.7rem] text-red-300 bg-transparent border-0 cursor-pointer p-0 hover:text-red-500">Hapus</button>
                                        )}
                                    </div>
                                    <p className="text-[0.88rem] text-[#1E40AF] leading-[1.65] m-0 pl-8">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── KOMENTAR PUBLIK ── */}
            <div className="bg-white rounded-2xl border border-[#f0e6dc] px-6 py-5">
                <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#D1D5DB] m-0 mb-1">Diskusi</p>
                <p className="text-[0.88rem] font-bold text-[#111827] m-0 mb-5">
                    Komentar Publik <span className="text-[#9CA3AF] font-normal">({publicComments.length})</span>
                </p>

                {session ? (
                    <div className="mb-6">
                        {isAdmin && (
                            <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-3 py-1 mb-3">
                                <span className="text-[0.65rem] font-bold text-[#1D4ED8]">🏛️ Mode Admin — komentar tampil sebagai Tindak Lanjut</span>
                            </div>
                        )}
                        <div className="flex gap-3 items-start">
                            <Avatar name={session.user?.name ?? "U"} official={isAdmin} />
                            <div className="flex-1 flex gap-2">
                                <input
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={isAdmin ? "Tulis tindak lanjut resmi..." : "Tulis komentar..."}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                                    className={cn(
                                        "flex-1 rounded-xl px-4 py-[10px] text-[0.85rem] text-[#111827] outline-none border transition-colors",
                                        isAdmin
                                            ? "border-blue-200 bg-blue-50 focus:border-blue-500"
                                            : "border-[#f0e6dc] bg-[#fafaf8] focus:border-[#E8541C]"
                                    )}
                                />
                                <button
                                    onClick={handleSubmitComment}
                                    disabled={submitting || !newComment.trim()}
                                    className={cn(
                                        "text-white border-0 rounded-xl px-5 py-[10px] text-[0.82rem] font-semibold whitespace-nowrap cursor-pointer transition-opacity",
                                        isAdmin ? "bg-gradient-to-br from-blue-500 to-blue-700" : "bg-gradient-to-br from-[#FF6B35] to-[#E8541C]",
                                        (submitting || !newComment.trim()) && "opacity-40 cursor-not-allowed"
                                    )}
                                >
                                    {submitting ? "..." : "Kirim"}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#fafaf8] rounded-xl px-4 py-4 mb-5 text-center">
                        <p className="text-[0.82rem] text-[#9CA3AF] m-0">
                            <a href="/auth/login" className="text-[#E8541C] font-semibold no-underline">Login</a> untuk berkomentar
                        </p>
                    </div>
                )}

                {publicComments.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-[0.82rem] text-[#D1D5DB] m-0">Belum ada komentar. Jadilah yang pertama!</p>
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
                                        {session?.user?.id === String(c.user_id) && (
                                            <button onClick={() => handleDeleteComment(c.id)}
                                                className="flex items-center gap-1 text-[0.7rem] text-[#FCA5A5] bg-transparent border-0 cursor-pointer p-0 hover:text-[#EF4444] transition-colors">
                                                <Trash2 size={11} strokeWidth={1.8} /> Hapus
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[0.85rem] text-[#374151] leading-[1.65] m-0">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <EditLaporanModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                report={report}
                onSaved={handleLaporanSaved}
            />
        </div>
    );
}