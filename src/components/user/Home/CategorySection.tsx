"use client";

import Link from "next/link";
import { Construction, Building2, Trash2, Car } from "lucide-react";

const CATEGORIES = [
    { slug: "infrastruktur",  label: "Infrastruktur",  icon: Construction, color: "from-[#FF6B35] to-[#E8201A]" },
    { slug: "fasilitas-umum", label: "Fasilitas Umum", icon: Building2,    color: "from-[#FF6B35] to-[#E8541C]" },
    { slug: "kebersihan",     label: "Kebersihan",     icon: Trash2,       color: "from-[#E8541C] to-[#C0392B]" },
    { slug: "lalu-lintas",    label: "Lalu Lintas",    icon: Car,          color: "from-[#FF8C42] to-[#E8541C]" },
];

export default function CategorySection() {
    return (
        <section className="space-y-4">
            <header>
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-px w-5 bg-gradient-to-r from-[#FF6B35] to-[#E8201A]" />
                    <span className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#E8541C]">Kategori</span>
                </div>
                <h2 className="font-extrabold text-[1.1rem] tracking-[-0.02em] text-[#1a0e08]">
                    Jelajahi kategori
                </h2>
                <p className="text-[0.8rem] text-[#a8856b]">Pilih kategori untuk lihat laporan sejenis</p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <Link
                            key={cat.slug}
                            href={`/user/explore?kategori=${cat.slug}`}
                            className="group flex flex-col items-center gap-3 rounded-2xl border border-[#f0e6dc] bg-white px-4 py-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(255,107,53,0.25)] hover:shadow-[0_8px_24px_rgba(232,84,28,0.1)]"
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} shadow-[0_4px_12px_rgba(232,84,28,0.2)] transition-transform duration-200 group-hover:scale-110`}>
                                <Icon size={22} strokeWidth={1.8} className="text-white" />
                            </div>
                            <span className="text-[0.8rem] font-semibold text-[#3d2817] text-center">
                                {cat.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}