"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LaporanCard from "@/components/user/Home/LaporanCard";
import { LAPORAN_TRENDING } from "@/lib/mock-laporan";

export default function TrendingSection() {
    return (
        <section
            style={{
                paddingTop: 40,
                paddingBottom: 96,
                position: "relative",
            }}
        >
            <div style={{ padding: "0 24px", maxWidth: 1080, margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
                    <div>
                        <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8541C", marginBottom: 6 }}>
                            Sedang Ramai
                        </p>
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "#1a0e08", letterSpacing: "-0.02em" }}>
                            Laporan Trending
                        </h2>
                    </div>
                    <Link
                        href="/user/jelajah"
                        style={{
                            fontSize: "0.72rem",
                            color: "#E8541C",
                            fontWeight: 600,
                            textDecoration: "none",
                            transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                        Lihat semua →
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 14,
                    }}
                    className="trending-grid"
                >
                    {LAPORAN_TRENDING.map((l) => (
                        <LaporanCard key={l.id} laporan={l} />
                    ))}
                </motion.div>
            </div>

            <style jsx>{`
                @media (max-width: 900px) {
                    .trending-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                @media (max-width: 600px) {
                    .trending-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}