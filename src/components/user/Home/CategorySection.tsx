"use client";

import Link from "next/link";
import { Construction, Building2, Trash2, Car } from "lucide-react";

const CATEGORIES = [
    { slug: "infrastruktur",  label: "Infrastruktur",  icon: Construction },
    { slug: "fasilitas-umum", label: "Fasilitas Umum", icon: Building2 },
    { slug: "kebersihan",     label: "Kebersihan",     icon: Trash2 },
    { slug: "lalu-lintas",    label: "Lalu Lintas",    icon: Car },
];

export default function CategorySection() {
    return (
        <section className="space-y-4">
            <header>
                <h2 className="font-sans text-[1.1rem] font-extrabold text-[#1a0e08] tracking-[-0.02em] mb-1">
                    Jelajahi kategori
                </h2>
                <p className="text-[0.82rem] text-[#a8856b]">
                    Pilih kategori untuk lihat laporan sejenis
                </p>
            </header>

            <div className="grid grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <Link
                            key={cat.slug}
                            href={`/user/explore?kategori=${cat.slug}`}
                            className="group flex flex-col items-center gap-3 rounded-2xl border border-[#f0e6dc] bg-white p-5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,107,53,0.3)] hover:shadow-[0_8px_24px_rgba(255,107,53,0.08)]"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 bg-gradient-to-br from-[rgba(255,107,53,0.1)] to-[rgba(232,84,28,0.06)]">
                                <Icon size={22} strokeWidth={1.8} className="text-[#E8541C]" />
                            </div>
                            <span className="text-[0.8rem] font-semibold text-[#3d2817]">
                                {cat.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}