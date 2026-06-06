"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
    userName?: string;
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat pagi";
    if (hour < 15) return "Selamat siang";
    if (hour < 18) return "Selamat sore";
    return "Selamat malam";
}

export default function HeroSection({ userName }: HeroSectionProps) {
    const greeting = getGreeting();
    const displayName = userName?.split(" ")[0] ?? "Warga";

    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF5EE] via-white to-[#FFF5EE]/40 px-6 py-10 md:px-10 md:py-12">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[rgba(255,107,53,0.15)] blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[rgba(232,84,28,0.1)] blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-xl">
                    <p className="text-sm font-medium text-[#E8541C]">
                        {greeting}, {displayName} 👋
                    </p>
                    <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-[#1a0e08] md:text-4xl">
                        Suara yang biasanya{" "}
                        <span className="italic bg-gradient-to-r from-[#FF6B35] to-[#E8201A] bg-clip-text text-transparent">
                            terabaikan
                        </span>.
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-[#6b5546] md:text-base">
                        Lihat laporan di sekitar, dukung yang penting, atau bikin laporan baru sekarang.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href="/user/buat-laporan"
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E8201A] px-5 py-3 text-sm font-semibold text-white no-underline shadow-[0_4px_14px_rgba(255,107,53,0.35)] transition-all hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(255,107,53,0.45)]"
                    >
                        Buat laporan
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                        href="/user/explore"
                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(232,84,28,0.2)] bg-white px-5 py-3 text-sm font-semibold text-[#E8541C] no-underline transition hover:border-[rgba(232,84,28,0.35)] hover:bg-[#FFF5EE]"
                    >
                        Jelajahi laporan
                    </Link>
                </div>
            </div>
        </section>
    );
}