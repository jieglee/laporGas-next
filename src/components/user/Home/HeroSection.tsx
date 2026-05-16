"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
    userName?: string;
}

export default function HeroSection({ userName }: HeroSectionProps) {
    const greeting = getGreeting();
    const displayName = userName?.split(" ")[0] ?? "Warga";

    return (
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-orange-50 via-white to-orange-50/40 px-6 py-10 md:px-10 md:py-12">
            {/* subtle decorative blob */}
            <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl"
            />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-xl">
                    <p className="text-sm font-medium text-orange-600">
                        {greeting}, {displayName} 👋
                    </p>
                    <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl">
                        Suara yang biasanya{" "}
                        <span className="italic text-orange-500">terabaikan</span>.
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
                        Lihat laporan di sekitar, dukung yang penting, atau bikin laporan
                        baru sekarang.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href="/user/laporan/buat"
                        className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition hover:bg-orange-600"
                    >
                        Buat laporan
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                        href="/user/explore"
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/60 px-5 py-3 text-sm font-semibold text-neutral-700 backdrop-blur transition hover:border-neutral-300 hover:bg-white"
                    >
                        Jelajahi laporan
                    </Link>
                </div>
            </div>
        </section>
    );
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat pagi";
    if (hour < 15) return "Selamat siang";
    if (hour < 18) return "Selamat sore";
    return "Selamat malam";
}