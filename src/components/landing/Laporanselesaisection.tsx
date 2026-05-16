"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, ThumbsUp, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────────────────────

type Kategori = "infrastruktur" | "keamanan" | "kebersihan" | "sosial" | "lainnya";

interface Laporan {
    id: string;
    judul: string;
    deskripsi: string;
    kategori: Kategori;
    pelapor: string;
    komentar: number;
    dukungan: number;
    lokasi?: string;
}

// ── Config ─────────────────────────────────────────────────────────────────────

const KATEGORI: Record<Kategori, string> = {
    infrastruktur: "Infrastruktur",
    keamanan: "Keamanan",
    kebersihan: "Kebersihan",
    sosial: "Sosial",
    lainnya: "Lainnya",
};

const DATA: Laporan[] = [
    {
        id: "1",
        judul: "Pohon tumbang menutup akses jalan tembus SMPN 4",
        deskripsi:
            "Terganggunya masyarakat karena ada pohon tumbang menutup jalan tembus ke SMPN 4 (muka Bapperida) dan juga tidak kelihatan saat malam hari.",
        kategori: "infrastruktur",
        pelapor: "Kecamatan Parsel",
        komentar: 5,
        dukungan: 1,
        lokasi: "Kec. Parsel",
    },
    {
        id: "2",
        judul: "Pembakaran sampah harian di area perumahan",
        deskripsi:
            "Tetangga hampir setiap hari membakar sampah, sudah ditegur dan lapor ke RT namun tidak ada hasil, mohon ditindaklanjuti.",
        kategori: "kebersihan",
        pelapor: "Putria",
        komentar: 0,
        dukungan: 0,
    },
    {
        id: "3",
        judul: "Angin kencang merusak atap rumah warga",
        deskripsi:
            "Dampak angin kencang di Jl. Sukahaji RT.02 RW.02 Kel. Melong Kec. Cimahi Selatan menyebabkan kerusakan pada beberapa rumah.",
        kategori: "keamanan",
        pelapor: "Andra Relawan Melong",
        komentar: 0,
        dukungan: 0,
        lokasi: "Cimahi Selatan",
    },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const getInisial = (nama: string) =>
    nama.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

// ── Card ───────────────────────────────────────────────────────────────────────

function Card({ laporan, index }: { laporan: Laporan; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col gap-3.5 rounded-2xl border border-[#f0e6dc] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF6B35]/30 hover:shadow-[0_8px_24px_rgba(255,107,53,0.08)]"
        >
            {/* Top row */}
            <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-[#FFF5EE] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#E8541C]">
                    {KATEGORI[laporan.kategori]}
                </span>
                <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                        Selesai
                    </span>
                </div>
            </div>

            {/* Title + desc */}
            <div className="flex flex-col gap-1.5">
                <h3 className="text-[14px] font-bold leading-snug text-[#1a0e08] line-clamp-2 transition-colors group-hover:text-[#E8541C]">
                    {laporan.judul}
                </h3>
                <p className="text-[12px] leading-relaxed text-[#8a6f5e] line-clamp-3">
                    {laporan.deskripsi}
                </p>
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center gap-2 border-t border-[#f5ede3] pt-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#FF6B35] to-[#E8541C] text-[9px] font-bold text-white">
                    {getInisial(laporan.pelapor)}
                </div>
                <div className="flex min-w-0 flex-col">
                    <span className="truncate text-[11px] font-medium text-[#3d2817]">
                        {laporan.pelapor}
                    </span>
                    {laporan.lokasi && (
                        <span className="flex items-center gap-0.5 text-[10px] text-[#a8856b]">
                            <MapPin className="h-2.5 w-2.5" />
                            {laporan.lokasi}
                        </span>
                    )}
                </div>

                <div className="ml-auto flex items-center gap-3 text-[#a8856b]">
                    <span className="flex items-center gap-1 text-[11px]">
                        <MessageCircle className="h-3 w-3" />
                        {laporan.komentar}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                        <ThumbsUp className="h-3 w-3" />
                        {laporan.dukungan}
                    </span>
                </div>
            </div>
        </motion.article>
    );
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function LaporanSelesaiSection() {
    return (
        <section className="relative w-full py-20">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="mb-10 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="font-['Syne'] text-2xl font-bold tracking-tight text-[#1a0e08] sm:text-3xl">
                            Laporan yang telah ditangani
                        </h2>
                    </div>

                    <Link
                        href="/auth/login"
                        className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#f0e6dc] bg-white px-4 py-2 text-[12px] font-medium text-[#6b5546] transition-all hover:border-[#FF6B35] hover:text-[#E8541C]"
                    >
                        Lihat semua
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {DATA.map((l, i) => (
                        <Card key={l.id} laporan={l} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}