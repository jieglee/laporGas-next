"use client";

import Link from "next/link";
import { Construction, Building2, Trash2, Car } from "lucide-react";

const CATEGORIES = [
    { slug: "infrastruktur", label: "Infrastruktur", icon: Construction },
    { slug: "fasilitas-umum", label: "Fasilitas Umum", icon: Building2 },
    { slug: "kebersihan", label: "Kebersihan", icon: Trash2 },
    { slug: "lalu-lintas", label: "Lalu Lintas", icon: Car },
];

export default function CategorySection() {
    return (
        <section className="space-y-4">
            <header>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#1a0e08", letterSpacing: "-0.02em", marginBottom: 4 }}>
                    Jelajahi kategori
                </h2>
                <p style={{ fontSize: "0.82rem", color: "#a8856b" }}>
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
                            className="group flex flex-col items-center gap-3 rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                                textDecoration: "none",
                                background: "white",
                                borderColor: "#f0e6dc",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,107,53,0.08)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#f0e6dc";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div
                                className="flex items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                                style={{
                                    width: 48,
                                    height: 48,
                                    background: "linear-gradient(135deg, rgba(255,107,53,0.1), rgba(232,84,28,0.06))",
                                }}
                            >
                                <Icon size={22} strokeWidth={1.8} style={{ color: "#E8541C" }} />
                            </div>
                            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#3d2817" }}>
                                {cat.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}