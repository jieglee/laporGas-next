"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, FileEdit, ArrowLeft } from "lucide-react"
import { getAdminNotifs, markRead, markAllRead, type AdminNotif } from "@/lib/admin-notif"

function fmtWaktu(dateStr: string): string {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diff < 60) return "Baru saja"
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
    if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
}

export default function AdminNotifikasiPage() {
    const router = useRouter()
    const [notifs, setNotifs] = useState<AdminNotif[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAdminNotifs()
            .then((data) => {
                setNotifs(data)
                markAllRead(data.map((n) => n.id))
            })
            .finally(() => setLoading(false))
    }, [])

    const unreadTotal = notifs.filter((n) => !n.dibaca).length

    const handleRead = (notif: AdminNotif) => {
        markRead(notif.id)
        setNotifs((prev) => prev.map((n) => n.id === notif.id ? { ...n, dibaca: true } : n))
        router.push(`/admin/laporan/${notif.report_id}`)
    }

    const handleMarkAll = () => {
        markAllRead(notifs.map((n) => n.id))
        setNotifs((prev) => prev.map((n) => ({ ...n, dibaca: true })))
    }

    return (
        <div className="min-h-screen bg-[#fafaf8]">
            <div className="max-w-[680px] mx-auto px-4 pb-12">

                {/* Header */}
                <div className="pt-8 pb-5 flex items-end justify-between gap-4 sticky top-0 bg-[#fafaf8] z-10">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h1 className="font-extrabold text-[1.5rem] tracking-[-0.03em] text-[#1a0e08] m-0">
                                Notifikasi
                            </h1>
                            {unreadTotal > 0 && (
                                <span className="text-[0.65rem] font-bold bg-[#E8541C] text-white px-[9px] py-[2px] rounded-full">
                                    {unreadTotal} baru
                                </span>
                            )}
                        </div>
                        <p className="text-[0.78rem] text-[#a8856b] m-0">
                            Laporan yang diedit oleh pelapor
                        </p>
                    </div>
                    {unreadTotal > 0 && (
                        <button
                            onClick={handleMarkAll}
                            className="text-[0.72rem] font-semibold text-[#E8541C] bg-transparent border-0 cursor-pointer p-0 whitespace-nowrap"
                        >
                            Tandai semua dibaca
                        </button>
                    )}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-16">
                        <p className="text-[0.82rem] text-[#a8856b]">Memuat notifikasi...</p>
                    </div>
                )}

                {/* Empty */}
                {!loading && notifs.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-14 h-14 rounded-full bg-[rgba(232,84,28,0.08)] flex items-center justify-center mx-auto mb-4">
                            <Bell size={22} color="#E8541C" strokeWidth={1.8} />
                        </div>
                        <p className="text-[0.9rem] font-semibold text-[#1a0e08] mb-1">
                            Tidak ada notifikasi
                        </p>
                        <p className="text-[0.78rem] text-[#a8856b]">
                            Belum ada laporan yang diedit oleh pelapor
                        </p>
                    </div>
                )}

                {/* List */}
                {!loading && notifs.length > 0 && (
                    <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-2xl overflow-hidden">
                        {notifs.map((notif, idx) => (
                            <button
                                key={notif.id}
                                onClick={() => handleRead(notif)}
                                className={[
                                    "w-full text-left flex items-start gap-4 px-5 py-4 transition-colors duration-150 cursor-pointer border-0 bg-transparent",
                                    idx < notifs.length - 1 ? "border-b border-[#f5ede3]" : "",
                                    !notif.dibaca ? "bg-[#FFFCFA]" : "bg-white",
                                    "hover:bg-[#FFF5EE]",
                                ].join(" ")}
                            >
                                {/* Icon */}
                                <div className={[
                                    "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5",
                                    !notif.dibaca
                                        ? "bg-gradient-to-br from-[#FF6B35] to-[#E8541C]"
                                        : "bg-[#f5ede3]",
                                ].join(" ")}>
                                    <FileEdit
                                        size={18}
                                        color={!notif.dibaca ? "#fff" : "#a8856b"}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className={[
                                            "text-[0.875rem] leading-snug m-0",
                                            !notif.dibaca
                                                ? "font-semibold text-[#1a0e08]"
                                                : "font-medium text-[#3d2817]",
                                        ].join(" ")}>
                                            <span className="text-[#E8541C]">{notif.user_name}</span>
                                            {" "}mengedit laporan
                                        </p>
                                        <span className="text-[0.7rem] text-[#c9a892] whitespace-nowrap shrink-0">
                                            {fmtWaktu(notif.updated_at)}
                                        </span>
                                    </div>

                                    <p className="text-[0.8rem] text-[#6b5546] m-0 mt-1 line-clamp-1">
                                        {notif.report_title}
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[0.68rem] font-semibold text-[#E8541C] bg-[#FFF5EE] border border-[rgba(232,84,28,0.15)] px-2 py-0.5 rounded-full">
                                            {notif.edit_count}× diedit
                                        </span>
                                        <span className="text-[0.7rem] text-[#a8856b]">
                                            Klik untuk lihat detail →
                                        </span>
                                    </div>
                                </div>

                                {/* Unread dot */}
                                {!notif.dibaca && (
                                    <div className="shrink-0 w-2 h-2 rounded-full bg-[#E8541C] mt-2" />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}