"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Flame, MapPin, MessageCircle } from "lucide-react";
import type { Report } from "@/lib/reports";

interface TrendingSectionProps {
    reports: Report[];
}

const STATUS_CFG: Record<string, { label: string; text: string }> = {
    pending: { label: "Menunggu", text: "text-amber-800" },
    approved: { label: "Disetujui", text: "text-blue-800" },
    on_progress: { label: "Diproses", text: "text-orange-700" },
    completed: { label: "Selesai", text: "text-emerald-800" },
    rejected: { label: "Ditolak", text: "text-red-800" },
};

export default function TrendingSection({ reports }: TrendingSectionProps) {
    return (
        <section className="space-y-4">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-900 md:text-xl">
                        Trending minggu ini <Flame className="h-5 w-5 text-orange-500" />
                    </h2>
                    <p className="text-sm text-neutral-500">Laporan yang paling banyak dikomentari warga</p>
                </div>
                <Link href="/user/explore" className="group inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700">
                    Lihat semua <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
            </header>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                {reports.map((report, idx) => {
                    const s = STATUS_CFG[report.status] ?? { label: report.status, text: "text-gray-500" };
                    return (
                        <Link key={report.id} href={`/user/laporan/${report.id}`}
                            className="group flex items-center gap-4 border-b border-neutral-100 px-4 py-4 transition last:border-b-0 hover:bg-neutral-50 md:px-6 no-underline">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sm font-bold text-orange-600">
                                {idx + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium uppercase tracking-wide text-orange-600">
                                        {report.category_name ?? "Umum"}
                                    </span>
                                    <span className={cn("text-[0.65rem] font-semibold", s.text)}>
                                        · {s.label}
                                    </span>
                                </div>
                                <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-neutral-900 group-hover:text-orange-600">
                                    {report.title}
                                </h3>
                                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-neutral-500">
                                    <MapPin className="h-3 w-3" />{report.location ?? "Lokasi tidak diketahui"}
                                </p>
                            </div>
                            <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700">
                                <MessageCircle className="h-3.5 w-3.5" />
                                {report.comment_count ?? 0}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}