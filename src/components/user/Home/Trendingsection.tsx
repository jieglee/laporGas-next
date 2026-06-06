"use client";

import Link from "next/link";
import { ArrowRight, Flame, MapPin, MessageCircle } from "lucide-react";
import type { Report } from "@/lib/reports";

interface TrendingSectionProps {
    reports: Report[];
}

const STATUS_CFG: Record<string, { label: string; bg: string; text: string }> = {
    pending:     { label: "Menunggu",  bg: "bg-amber-50",   text: "text-amber-700" },
    approved:    { label: "Disetujui", bg: "bg-blue-50",    text: "text-blue-700" },
    on_progress: { label: "Diproses",  bg: "bg-[#FFF5EE]",  text: "text-[#E8541C]" },
    completed:   { label: "Selesai",   bg: "bg-emerald-50", text: "text-emerald-700" },
    rejected:    { label: "Ditolak",   bg: "bg-red-50",     text: "text-red-700" },
};

export default function TrendingSection({ reports }: TrendingSectionProps) {
    return (
        <section className="space-y-4">
            <header className="flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-px w-5 bg-gradient-to-r from-[#FF6B35] to-[#E8201A]" />
                        <span className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#E8541C]">Populer</span>
                    </div>
                    <h2 className="font-extrabold text-[1.1rem] tracking-[-0.02em] text-[#1a0e08] flex items-center gap-2">
                        Trending minggu ini
                        <Flame size={18} className="text-[#E8541C]" />
                    </h2>
                    <p className="text-[0.8rem] text-[#a8856b]">Laporan yang paling banyak dikomentari warga</p>
                </div>
                <Link
                    href="/user/explore"
                    className="group inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-[#E8541C] no-underline transition-all duration-200 hover:gap-2"
                >
                    Lihat semua
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
            </header>

            <div className="overflow-hidden rounded-2xl border border-[#f0e6dc] bg-white">
                {reports.map((report, idx) => {
                    const s = STATUS_CFG[report.status] ?? { label: report.status, bg: "bg-[#fafaf8]", text: "text-[#a8856b]" };
                    return (
                        <Link
                            key={report.id}
                            href={`/user/laporan/${report.id}`}
                            className="group flex items-center gap-4 border-b border-[#f5ede3] px-5 py-4 transition-colors duration-150 last:border-b-0 hover:bg-[#FFF5EE] no-underline"
                        >
                            {/* Rank number */}
                            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[0.8rem] font-extrabold ${
                                idx === 0
                                    ? "bg-gradient-to-br from-[#FF6B35] to-[#E8201A] text-white shadow-[0_4px_8px_rgba(232,84,28,0.25)]"
                                    : "bg-[#FFF5EE] text-[#E8541C]"
                            }`}>
                                {idx + 1}
                            </span>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[0.68rem] font-bold uppercase tracking-wide text-[#E8541C]">
                                        {report.category_name ?? "Umum"}
                                    </span>
                                    <span className={`text-[0.62rem] font-semibold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                                        {s.label}
                                    </span>
                                </div>
                                <h3 className="line-clamp-1 text-[0.875rem] font-semibold text-[#1a0e08] transition-colors group-hover:text-[#E8541C]">
                                    {report.title}
                                </h3>
                                {report.location && (
                                    <p className="mt-0.5 flex items-center gap-1 text-[0.75rem] text-[#a8856b]">
                                        <MapPin size={11} />
                                        {report.location}
                                    </p>
                                )}
                            </div>

                            {/* Comment count */}
                            <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#FFF5EE] border border-[rgba(232,84,28,0.12)] px-3 py-1.5 text-[0.75rem] font-semibold text-[#E8541C]">
                                <MessageCircle size={13} />
                                {report.comment_count ?? 0}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}