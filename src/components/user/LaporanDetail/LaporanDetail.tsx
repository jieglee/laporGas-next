'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ArrowBigUp } from "lucide-react";
import { getReportById, getUpvoteStatus, toggleUpvote, type Report } from "@/lib/reports";
import { getComments, createComment, deleteComment, type Comment } from "@/lib/comments";
import { STATUS_CFG, PRIORITY_CFG } from "@/constants/report-config";
import { cn } from "@/lib/utils";

interface LaporanDetailProps { reportId: number; }

function fmtDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function fmt(n: number) { return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n); }

function Inisial({ name, size = 36, official = false }: { name: string; size?: number; official?: boolean }) {
    const txt = (name ?? "?").split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase();
    return (
        <div
            className={cn(
                "rounded-full shrink-0 flex items-center justify-center font-bold text-white",
                official ? "bg-gradient-to-br from-blue-500 to-blue-800" : "bg-gradient-to-br from-[#FF6B35] to-[#E8541C]",
                size === 22 ? "w-[22px] h-[22px] text-[7px]" : "w-9 h-9 text-xs"
            )}
        >
            {txt}
        </div>
    );
}

export default function LaporanDetail({ reportId }: LaporanDetailProps) {
    const { data: session } = useSession();
    const role = session?.user?.role;
    const isAdmin = role === "admin" || role === "superadmin";

    const [report, setReport] = useState<Report | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(0);
    const [upvoted, setUpvoted] = useState(false);
    const [upvoting, setUpvoting] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [reportData, commentsData, upvoteData] = await Promise.all([
                    getReportById(reportId), getComments(reportId), getUpvoteStatus(reportId),
                ]);
                setReport(reportData);
                setComments(commentsData);
                setUpvoteCount(upvoteData.upvote_count);
                setUpvoted(upvoteData.upvoted);
            } catch { setError("Laporan tidak ditemukan"); }
            finally { setLoading(false); }
        }
        fetchData();
    }, [reportId]);

    const handleUpvote = async () => {
        if (!session) { window.location.href = "/auth/login"; return; }
        try {
            setUpvoting(true);
            const result = await toggleUpvote(reportId);
            setUpvoteCount(result.upvote_count);
            setUpvoted(result.upvoted);
        } catch (err) { console.error("Gagal upvote:", err); }
        finally { setUpvoting(false); }
    };

    const handleSubmitComment = async () => {
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
        <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#f0e6dc] border-t-[#E8541C] rounded-full animate-spin mx-auto mb-3" />
                <p className="text-[0.82rem] text-[#a8856b]">Memuat laporan...</p>
            </div>
        </div>
    );

    if (error || !report) return (
        <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-[0.85rem] text-[#BE123C]">{error ?? "Terjadi kesalahan"}</p>
        </div>
    );

    const statusCfg = STATUS_CFG[report.status] ?? { label: report.status, badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
    const priorityCfg = PRIORITY_CFG[report.priority] ?? { label: report.priority, soft: "text-gray-500 bg-gray-500/10", text: "text-gray-500" };
    const officialComments = comments.filter((c) => c.type === "official");
    const publicComments = comments.filter((c) => c.type === "public");

    const imgs = Array.isArray(report.images)
    ? report.images
    : typeof report.images === "string"
        ? [report.images]
        : report.image_url
            ? [report.image_url]
            : [];

            console.log(report.images)
console.log(report.image_url)

    return (
        <div className="max-w-[780px] mx-auto px-5 pt-8 pb-[80px]">

            {/* ── HEADER CARD ── */}
            <div className="bg-white rounded-[20px] border border-[#F3F0ED] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] px-8 py-7 mb-4">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-[18px] flex-wrap">
                    <span className="text-[0.68rem] font-semibold tracking-[0.06em] uppercase text-[#9CA3AF] bg-[#F9FAFB] border border-[#F3F4F6] rounded-[6px] px-[10px] py-[3px]">
                        #{report.id}
                    </span>
                    <span className={cn("inline-flex items-center gap-[5px] text-[0.72rem] font-semibold rounded-full px-3 py-1", statusCfg.badge)}>
                        <span className={cn("w-[6px] h-[6px] rounded-full", statusCfg.dot)} />
                        {statusCfg.label}
                    </span>
                    <span className={cn("text-[0.68rem] font-semibold rounded-[6px] px-[10px] py-[3px]", priorityCfg.soft)}>
                        ↑ {priorityCfg.label}
                    </span>
                    {report.category_name && (
                        <span className="text-[0.68rem] text-[#6B7280] bg-[#F9FAFB] border border-[#F3F4F6] rounded-[6px] px-[10px] py-[3px]">
                            {report.category_name}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className="font-sans text-[1.6rem] font-extrabold text-[#111827] tracking-[-0.03em] leading-[1.2] m-0 mb-[10px]">
                    {report.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                    <div className="flex items-center gap-[6px]">
                        <Inisial name={report.user_name ?? "U"} size={22} />
                        <span className="text-[0.78rem] text-[#6B7280]">{report.user_name ?? "Anonim"}</span>
                    </div>
                    <span className="text-[#E5E7EB]">·</span>
                    <span className="text-[0.78rem] text-[#9CA3AF]">🗓 {fmtDate(report.created_at)}</span>
                    {report.location && <>
                        <span className="text-[#E5E7EB]">·</span>
                        <span className="text-[0.78rem] text-[#9CA3AF]">📍 {report.location}</span>
                    </>}
                </div>

                <div className="h-px bg-[#F9FAFB] mb-5" />

                <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#D1D5DB] m-0 mb-[10px]">Kronologi</p>
                <p className="text-[0.9rem] text-[#374151] leading-[1.75] m-0">{report.description}</p>

{report.latitude && report.longitude && (
    <div className="mt-5 overflow-hidden rounded-[14px] border border-[#F3F4F6]">
        <iframe
            src={`https://maps.google.com/maps?q=${report.latitude},${report.longitude}&z=15&output=embed`}
            width="100%"
            height="260"
            loading="lazy"
            className="border-0 w-full"
        />
    </div>
)}


                {/* Images */}
                {imgs.length > 0 && (
                    <div className="mt-5">
                        <img src={imgs[0]} alt="Bukti laporan" className="w-full max-h-[360px] object-cover rounded-[14px] border border-[#F3F4F6] block" />
                        {imgs.length > 1 && (
                            <div className="grid gap-2 mt-2 grid-cols-[repeat(auto-fill,minmax(100px,1fr))]">
                                {imgs.slice(1).map((url, i) => (
                                    <img key={i} src={url} alt={`Foto ${i + 2}`}
                                         className="w-full aspect-square object-cover rounded-[10px] border border-[#F3F4F6] cursor-pointer"
                                         onClick={() => window.open(url, "_blank")} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Upvote */}
                <div className="mt-5 pt-5 border-t border-[#F9FAFB] flex items-center gap-4">
                    <button
                        onClick={handleUpvote}
                        disabled={upvoting}
                        className={cn(
                            "inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[0.85rem] font-bold transition-all duration-200 border-[1.5px]",
                            upvoted
                                ? "border-[#E8541C] bg-[#FFF5EE] text-[#E8541C]"
                                : "border-[#F0E6DC] bg-white text-gray-500 hover:border-[#E8541C] hover:text-[#E8541C] hover:bg-[#FFF5EE]",
                            upvoting && "opacity-60 cursor-not-allowed"
                        )}
                    >
                        <ArrowBigUp
                            size={18}
                            strokeWidth={upvoted ? 2.5 : 1.8}
                            fill={upvoted ? "#E8541C" : "none"}
                            className={cn("transition-all duration-200", upvoted ? "text-[#E8541C]" : "text-gray-400")}
                        />
                        {upvoted ? "Didukung" : "Dukung Laporan"}
                        <span
                            className={cn(
                                "rounded-full px-2 py-px text-[0.75rem] font-bold transition-all duration-200",
                                upvoted ? "bg-[#E8541C] text-white" : "bg-gray-100 text-gray-500"
                            )}
                        >
                            {fmt(upvoteCount)}
                        </span>
                    </button>
                    <span className="text-[0.75rem] text-[#D1D5DB]">
                        {upvoteCount > 0 ? `${fmt(upvoteCount)} warga mendukung laporan ini` : "Jadilah yang pertama mendukung!"}
                    </span>
                </div>
            </div>

            {/* ── TINDAK LANJUT ── */}
            {officialComments.length > 0 && (
                <div className="bg-white rounded-[20px] border border-[#DBEAFE] px-8 py-6 mb-4">
                    <div className="flex items-center gap-[10px] mb-5">
                        <div className="w-8 h-8 rounded-[10px] flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800">
                            <span className="text-[0.9rem]">🏛️</span>
                        </div>
                        <div>
                            <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#93C5FD] m-0">Tindak Lanjut</p>
                            <p className="text-[0.85rem] font-bold text-[#1E40AF] m-0">Catatan resmi instansi</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[14px]">
                        {officialComments.map((c) => {
                            const isOwner = session?.user?.id === String(c.user_id);
                            return (
                                <div key={c.id} className="flex gap-3">
                                    <div className="w-[3px] rounded-full shrink-0 min-h-[40px] bg-gradient-to-b from-blue-500 to-blue-300" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-[6px] flex-wrap">
                                            <Inisial name={c.name ?? "A"} size={28} official />
                                            <span className="text-[0.82rem] font-bold text-[#1E3A8A]">{c.name ?? "Admin"}</span>
                                            <span className="text-[0.6rem] font-bold bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE] px-2 py-[2px] rounded-full">INSTANSI</span>
                                            <span className="text-[0.72rem] text-[#93C5FD]">{fmtDate(c.created_at)}</span>
                                            {isOwner && (
                                                <button onClick={() => handleDeleteComment(c.id)} className="ml-auto text-[0.7rem] text-[#FCA5A5] bg-transparent border-0 cursor-pointer p-0">Hapus</button>
                                            )}
                                        </div>
                                        <p className="text-[0.88rem] text-[#1E40AF] leading-[1.65] m-0 pl-9">{c.comment}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── KOMENTAR PUBLIK ── */}
            <div className="bg-white rounded-[20px] border border-[#F3F0ED] px-8 py-6">
                <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#D1D5DB] m-0 mb-[2px]">Diskusi</p>
                <p className="text-[0.85rem] font-bold text-[#111827] m-0 mb-5">
                    Komentar Publik <span className="text-[#9CA3AF] font-normal">({publicComments.length})</span>
                </p>

                {session ? (
                    <div className="mb-6">
                        {isAdmin && (
                            <div className="inline-flex items-center gap-[6px] bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg px-[10px] py-1 mb-[10px]">
                                <span className="text-[0.65rem] font-bold text-[#1D4ED8]">🏛️ KOMENTAR ADMIN — akan tampil sebagai Tindak Lanjut</span>
                            </div>
                        )}
                        <div className="flex gap-[10px]">
                            <Inisial name={session.user?.name ?? "U"} size={36} official={isAdmin} />
                            <div className="flex-1 flex gap-2">
                                <input
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={isAdmin ? "Tulis tindak lanjut resmi..." : "Tulis komentar..."}
                                    className={cn(
                                        "flex-1 rounded-xl px-4 py-[10px] text-[0.85rem] text-[#111827] outline-none border transition-colors",
                                        isAdmin
                                            ? "border-blue-200 bg-blue-50 focus:border-blue-500"
                                            : "border-[#F0E6DC] bg-[#FAFAF8] focus:border-[#E8541C]"
                                    )}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                                />
                                <button
                                    onClick={handleSubmitComment}
                                    disabled={submitting || !newComment.trim()}
                                    className={cn(
                                        "text-white border-0 rounded-xl px-[18px] py-[10px] text-[0.82rem] font-semibold whitespace-nowrap",
                                        isAdmin
                                            ? "bg-gradient-to-br from-blue-500 to-blue-800"
                                            : "bg-gradient-to-br from-[#FF6B35] to-[#E8541C]",
                                        (submitting || !newComment.trim()) && "opacity-45 cursor-not-allowed"
                                    )}
                                    disabled={submitting || !newComment.trim()}
                                >
                                    {submitting ? "..." : "Kirim"}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#FAFAF8] rounded-xl px-4 py-[14px] mb-5 text-center">
                        <p className="text-[0.82rem] text-[#9CA3AF] m-0">
                            <a href="/auth/login" className="text-[#E8541C] font-semibold no-underline">Login</a> untuk berkomentar
                        </p>
                    </div>
                )}

                {publicComments.length === 0 ? (
                    <div className="text-center py-8 text-[#D1D5DB]">
                        <p className="text-[1.5rem] m-0 mb-2">💬</p>
                        <p className="text-[0.82rem] m-0">Belum ada komentar. Jadilah yang pertama!</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {publicComments.map((c, idx) => {
                            const isOwner = session?.user?.id === String(c.user_id);
                            return (
                                <div
                                    key={c.id}
                                    className={cn(
                                        "flex gap-3 pb-4",
                                        idx === 0 ? "pt-0" : "pt-4",
                                        idx < publicComments.length - 1 && "border-b border-gray-50"
                                    )}
                                >
                                    <Inisial name={c.name ?? "U"} size={36} />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[0.82rem] font-bold text-[#111827]">{c.name ?? "Anonim"}</span>
                                                <span className="text-[0.72rem] text-[#D1D5DB]">{fmtDate(c.created_at)}</span>
                                            </div>
                                            {isOwner && (
                                                <button
                                                    onClick={() => handleDeleteComment(c.id)}
                                                    className="text-[0.7rem] text-[#FCA5A5] bg-transparent border-0 cursor-pointer p-0 transition-colors duration-150 hover:text-[#EF4444]"
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[0.85rem] text-[#374151] leading-[1.65] m-0">{c.comment}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}