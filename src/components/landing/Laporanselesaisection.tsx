"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, ArrowBigUp, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getReports, type Report } from "@/lib/reports";

const getInisial = (nama: string) =>
    nama.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function Card({ report, index }: { report: Report; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#f0e6dc] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(232,84,28,0.1)] hover:border-[rgba(255,107,53,0.3)]"
        >
            {/* Top accent bar — gradient */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#FF6B35] to-[#E8201A]" />

            <div className="flex flex-col gap-4 p-5 flex-1">
                {/* Top row */}
                <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[rgba(255,107,53,0.1)] to-[rgba(232,84,28,0.06)] border border-[rgba(232,84,28,0.15)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#E8541C]">
                        {report.category_name ?? "Umum"}
                    </span>
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                            Selesai
                        </span>
                    </div>
                </div>

                {/* Title + desc */}
                <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-[14px] font-bold leading-snug text-[#1a0e08] line-clamp-2 transition-colors duration-200 group-hover:text-[#E8541C]">
                        {report.title}
                    </h3>
                    <p className="text-[12px] leading-relaxed text-[#8a6f5e] line-clamp-3">
                        {report.description}
                    </p>
                </div>

                {/* Location */}
                {report.location && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#a8856b]">
                        <MapPin className="w-3 h-3 text-[#E8541C] shrink-0" />
                        <span className="truncate">{report.location}</span>
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center gap-2 border-t border-[#f5ede3] pt-3 mt-auto">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E8201A] text-[9px] font-bold text-white shadow-[0_2px_8px_rgba(232,84,28,0.25)]">
                        {getInisial(report.user_name ?? "?")}
                    </div>
                    <span className="truncate text-[11px] font-semibold text-[#3d2817] flex-1">
                        {report.user_name ?? "Anonim"}
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[11px] text-[#a8856b]">
                            <MessageCircle className="h-3.5 w-3.5" />
                            {report.comment_count ?? 0}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-[#a8856b]">
                            <ArrowBigUp className="h-3.5 w-3.5" />
                            {report.upvote_count ?? 0}
                        </span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export default function LaporanSelesaiSection() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getReports({ status: "completed" })
            .then((data) => {
                setTotal(data.length);
                setReports(data.slice(0, 3));
            })
            .catch(() => setReports([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading || reports.length === 0) return null;

    return (
        <section className="relative w-full  overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[rgba(255,107,53,0.02)] to-transparent" />

            <div className="mx-auto max-w-6xl px-6 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 flex items-end justify-between gap-4"
                >
                    <div className="flex flex-col gap-2">
                        {/* Label */}
                        <div className="inline-flex items-center gap-2 w-fit">
                            <div className="h-px w-6 bg-gradient-to-r from-[#FF6B35] to-[#E8201A]" />
                            <span className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#E8541C]">
                                Sudah ditangani
                            </span>
                        </div>
                        <h2 className="text-[1.75rem] font-extrabold tracking-[-0.03em] text-[#1a0e08] m-0">
                            Laporan yang telah{" "}
                            <span className="bg-gradient-to-r from-[#FF6B35] to-[#E8201A] bg-clip-text text-transparent">
                                diselesaikan
                            </span>
                        </h2>
                        <p className="text-[0.82rem] text-[#a8856b] m-0">
                            {total} laporan berhasil ditangani hingga saat ini
                        </p>
                    </div>

                    <Link
                        href="/user/explore"
                        className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#f0e6dc] bg-white px-5 py-2.5 text-[12px] font-semibold text-[#6b5546] no-underline transition-all duration-200 hover:border-[rgba(232,84,28,0.3)] hover:text-[#E8541C] hover:bg-[#FFF5EE] hover:shadow-[0_4px_12px_rgba(232,84,28,0.08)]"
                    >
                        Lihat semua
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {reports.map((r, i) => (
                        <Card key={r.id} report={r} index={i} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 text-center"
                >
                </motion.div>
            </div>
        </section>
    );
}