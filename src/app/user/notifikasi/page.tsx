"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { getReports } from "@/lib/reports";
import { getComments } from "@/lib/comments";
import NotifItem from "@/components/user/Notifikasi/NotifItem";

export type NotifGrup = "laporan" | "sosial" | "sistem";

export interface Notif {
    id: string;
    judul: string;
    deskripsi: string;
    waktu: string;
    dibaca: boolean;
    grup: NotifGrup;
    reportId?: number;
}

const STATUS_NOTIF: Record<string, { judul: string; deskripsi: (title: string) => string }> = {
    approved: {
        judul: "Laporan Disetujui ✅",
        deskripsi: (t) => `Laporan "${t}" telah disetujui oleh admin dan akan segera ditindaklanjuti.`,
    },
    on_progress: {
        judul: "Laporan Sedang Diproses 🔄",
        deskripsi: (t) => `Laporan "${t}" sedang dalam proses penanganan oleh tim terkait.`,
    },
    completed: {
        judul: "Laporan Selesai 🎉",
        deskripsi: (t) => `Laporan "${t}" telah selesai ditangani. Terima kasih telah melapor!`,
    },
    rejected: {
        judul: "Laporan Ditolak ❌",
        deskripsi: (t) => `Laporan "${t}" tidak dapat diproses. Cek detail laporan untuk informasi lebih lanjut.`,
    },
};

const GRUP_CONFIG: Record<NotifGrup, { label: string }> = {
    laporan: { label: "Laporan" },
    sosial:  { label: "Sosial" },
    sistem:  { label: "Sistem" },
};

function fmtWaktu(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function getReadKey(userId: string) { return `notif_read_${userId}`; }

function getReadIds(userId: string): Set<string> {
    try {
        const raw = localStorage.getItem(getReadKey(userId));
        return new Set(raw ? JSON.parse(raw) : []);
    } catch { return new Set(); }
}

function saveReadIds(userId: string, ids: Set<string>) {
    try { localStorage.setItem(getReadKey(userId), JSON.stringify([...ids])); } catch {}
}

async function generateNotifs(userId: string, readIds: Set<string>): Promise<Notif[]> {
    const allReports = await getReports();
    const myReports = allReports.filter((r) => String(r.user_id) === userId);
    const notifs: Notif[] = [];

    for (const report of myReports) {
        const statusCfg = STATUS_NOTIF[report.status];
        if (statusCfg) {
            const id = `status_${report.id}_${report.status}`;
            notifs.push({
                id,
                judul: statusCfg.judul,
                deskripsi: statusCfg.deskripsi(report.title),
                waktu: fmtWaktu(report.updated_at),
                dibaca: readIds.has(id),
                grup: "laporan",
                reportId: report.id,
            });
        }

        try {
            const comments = await getComments(report.id);
            const othersComments = comments.filter((c) => String(c.user_id) !== userId);
            if (othersComments.length > 0) {
                const latest = othersComments[othersComments.length - 1];
                const id = `comment_${report.id}_${latest.id}`;
                notifs.push({
                    id,
                    judul: "Komentar Baru 💬",
                    deskripsi: `${latest.name ?? "Seseorang"} berkomentar di laporan "${report.title}": "${latest.comment.slice(0, 60)}${latest.comment.length > 60 ? "..." : ""}"`,
                    waktu: fmtWaktu(latest.created_at),
                    dibaca: readIds.has(id),
                    grup: "sosial",
                    reportId: report.id,
                });
            }
        } catch {}
    }

    const sistemId = "sistem_welcome";
    notifs.push({
        id: sistemId,
        judul: "Selamat datang di LaporGas 👋",
        deskripsi: "Buat laporan pengaduan dan pantau statusnya secara real-time. Suara kamu penting!",
        waktu: "Hari ini",
        dibaca: readIds.has(sistemId),
        grup: "sistem",
    });

    return notifs.sort((a, b) => (a.dibaca !== b.dibaca ? (a.dibaca ? 1 : -1) : 0));
}

const GROUPS: NotifGrup[] = ["laporan", "sosial", "sistem"];

export default function NotifikasiPage() {
    const { data: session } = useSession();
    const [notifs, setNotifs] = useState<Notif[]>([]);
    const [loading, setLoading] = useState(true);
    const userId = session?.user?.id ?? "";

    useEffect(() => {
        if (!userId) return;
        async function load() {
            try {
                setLoading(true);
                const readIds = getReadIds(userId);
                const result = await generateNotifs(userId, readIds);
                setNotifs(result);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [userId]);

    const unreadTotal = notifs.filter((n) => !n.dibaca).length;

    const handleRead = (id: string) => {
        const readIds = getReadIds(userId);
        readIds.add(id);
        saveReadIds(userId, readIds);
        setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, dibaca: true } : n)));
    };

    const handleMarkAllRead = () => {
        const readIds = getReadIds(userId);
        notifs.forEach((n) => readIds.add(n.id));
        saveReadIds(userId, readIds);
        setNotifs((prev) => prev.map((n) => ({ ...n, dibaca: true })));
    };

    const byGrup = (grup: NotifGrup) => notifs.filter((n) => n.grup === grup);

    return (
        <div className="min-h-screen bg-[#fafaf8]">
            <div className="max-w-[600px] mx-auto px-4 pb-12">

                {/* Header */}
                <div className="pt-7 pb-4 px-1 flex items-end justify-between sticky top-0 bg-[#fafaf8] z-10">
                    <div>
                        <div className="flex items-center gap-[10px] mb-[2px]">
                            <h1 className="text-[1.5rem] font-extrabold text-[#1a0e08] tracking-[-0.03em] m-0"
                                style={{ fontFamily: "'Syne', sans-serif" }}>
                                Notifikasi
                            </h1>
                            {unreadTotal > 0 && (
                                <span className="text-[0.65rem] font-bold bg-[#FF6B35] text-white px-[9px] py-[2px] rounded-full">
                                    {unreadTotal} baru
                                </span>
                            )}
                        </div>
                        <p className="text-[0.75rem] text-[#a8856b] m-0">Update terbaru seputar laporan & aktivitasmu</p>
                    </div>
                    {unreadTotal > 0 && (
                        <button onClick={handleMarkAllRead}
                            className="text-[0.72rem] font-semibold text-[#E8541C] bg-transparent border-0 cursor-pointer p-0 whitespace-nowrap">
                            Tandai semua dibaca
                        </button>
                    )}
                </div>

                {loading && (
                    <div className="text-center py-[60px]">
                        <p className="text-[0.82rem] text-[#a8856b]">Memuat notifikasi...</p>
                    </div>
                )}

                {!loading && notifs.length === 0 && (
                    <div className="text-center py-[80px]">
                        <div className="w-[52px] h-[52px] rounded-full bg-[rgba(255,107,53,0.08)] flex items-center justify-center mx-auto mb-[14px]">
                            <Bell size={22} color="#E8541C" strokeWidth={1.8} />
                        </div>
                        <p className="text-[0.88rem] font-semibold text-[#1a0e08] mb-1">Tidak ada notifikasi</p>
                        <p className="text-[0.75rem] text-[#a8856b]">Kamu sudah up to date!</p>
                    </div>
                )}

                {!loading && GROUPS.map((grup, i) => {
                    const items = byGrup(grup);
                    if (items.length === 0) return null;
                    const unread = items.filter((n) => !n.dibaca).length;
                    return (
                        <motion.div key={grup} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                            <div className="pt-[18px] pb-2 px-1 flex items-center gap-[7px]">
                                <p className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[#a8856b] m-0">
                                    {GRUP_CONFIG[grup].label}
                                </p>
                                {unread > 0 && (
                                    <span className="text-[0.6rem] font-bold bg-[#FF6B35] text-white px-[6px] py-[1px] rounded-full">
                                        {unread}
                                    </span>
                                )}
                            </div>
                            <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] overflow-hidden">
                                {items.map((n, idx) => (
                                    <div key={n.id} className={idx < items.length - 1 ? "border-b-[0.5px] border-[#f5ede3]" : ""}>
                                        <NotifItem notif={n} onRead={handleRead} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}