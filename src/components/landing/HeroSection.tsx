"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 80]);
    const opacity = useTransform(scrollY, [0, 350], [1, 0]);

    const fadeUp = (delay: number) => ({
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ background: "linear-gradient(160deg, #fff 0%, #FFF5F5 40%, #fff 100%)" }}
        >
            {/* Grid lines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                }}
            />

            {/* Glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: 700, height: 700, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(232,32,26,0.10) 0%, rgba(255,107,53,0.05) 40%, transparent 70%)",
                    top: -200, left: "50%", transform: "translateX(-50%)", filter: "blur(40px)",
                }}
            />

            {/* Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border pointer-events-none" style={{ borderColor: "rgba(232,32,26,0.05)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border pointer-events-none" style={{ borderColor: "rgba(232,32,26,0.03)" }} />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-28 pb-20"
            >

                {/* Title */}
                <motion.h1
                    {...fadeUp(0.3)}
                    style={{
                        fontFamily: "'Syne', sans-serif", fontWeight: 800,
                        fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05,
                        letterSpacing: "-0.035em", color: "#111", marginBottom: "1.25rem",
                    }}
                >
                    Suara Warga,
                    <br />
                    <span style={{ backgroundImage: "linear-gradient(90deg, #E8201A, #FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Aksi Nyata.
                    </span>
                </motion.h1>

                {/* Desc */}
                <motion.p
                    {...fadeUp(0.45)}
                    style={{ color: "rgba(30,30,30,0.5)", fontSize: "1.05rem", maxWidth: 500, margin: "0 auto 2.5rem", lineHeight: 1.75 }}
                >
                    Laporkan masalah di sekitar Anda — jalan rusak, sampah menumpuk, fasilitas umum bermasalah — langsung ke instansi terkait. Transparan, cepat, terukur.
                </motion.p>

                {/* CTAs */}
                <motion.div {...fadeUp(0.6)} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <Link
                        href="/Login"
                        style={{
                            background: "linear-gradient(135deg, #E8201A, #FF6B35)", color: "white",
                            fontWeight: 700, fontSize: "0.92rem", padding: "14px 32px", borderRadius: "14px",
                            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                            boxShadow: "0 8px 24px rgba(232,32,26,0.28)", transition: "all 0.3s",
                        }}
                    >
                        Mulai Lapor
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                    <a
                        href="#how-it-works"
                        style={{
                            background: "transparent", border: "1.5px solid rgba(0,0,0,0.12)",
                            color: "rgba(30,30,30,0.65)", fontWeight: 600, fontSize: "0.92rem",
                            padding: "14px 32px", borderRadius: "14px", textDecoration: "none",
                            display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s",
                        }}
                    >
                        Lihat Cara Kerja
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                    </a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} style={{ marginTop: 64, display: "flex", justifyContent: "center" }}>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        style={{ width: 20, height: 32, borderRadius: 10, border: "1.5px solid rgba(0,0,0,0.12)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 5 }}
                    >
                        <div style={{ width: 3, height: 8, borderRadius: 4, background: "rgba(0,0,0,0.2)" }} />
                    </motion.div>
                </motion.div>
            </motion.div>

            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
        </section>
    );
}