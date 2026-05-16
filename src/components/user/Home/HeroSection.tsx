"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HeroSection() {
    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #FFF8F2 0%, #FFFFFF 100%)",
                paddingTop: 96,
                paddingBottom: 64,
            }}
        >
            {/* Subtle orange glow */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: 700,
                    height: 700,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(255,107,53,0.10) 0%, rgba(255,140,66,0.05) 40%, transparent 70%)",
                    top: -200,
                    right: -200,
                    filter: "blur(40px)",
                }}
            />
            <div
                className="absolute pointer-events-none"
                style={{
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(232,90,32,0.08) 0%, transparent 70%)",
                    bottom: -150,
                    left: -100,
                    filter: "blur(40px)",
                }}
            />

            {/* Main content */}
            <div
                className="relative mx-auto w-full"
                style={{
                    maxWidth: 1180,
                    padding: "0 40px",
                }}
            >
                {/* Headline */}
                <motion.h1
                    {...fadeUp(0.2)}
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "clamp(2.8rem, 7vw, 5rem)",
                        fontWeight: 800,
                        lineHeight: 0.98,
                        letterSpacing: "-0.045em",
                        color: "#1a0e08",
                        marginBottom: 24,
                    }}
                >
                    Suara
                    <br />
                    <span
                        style={{
                            fontStyle: "italic",
                            fontWeight: 500,
                            background: "linear-gradient(90deg, #FF6B35, #E8541C)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        yang biasanya
                    </span>
                    <br />
                    terabaikan.
                </motion.h1>

                {/* Pull quote */}
                <motion.div
                    {...fadeUp(0.32)}
                    style={{
                        borderLeft: "2px solid #FF6B35",
                        paddingLeft: 18,
                        margin: "32px 0 36px",
                        maxWidth: 440,
                    }}
                >
                    <p style={{ fontSize: "0.95rem", color: "#6b5546", lineHeight: 1.75 }}>
                        Setiap hari ribuan masalah di sekitarmu menunggu untuk didengar.{" "}
                        <span style={{ color: "#1a0e08", fontWeight: 600 }}>LaporGas</span>{" "}
                        menjembatani warga dengan instansi terkait — transparan, terukur,
                        tanpa birokrasi.
                    </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    {...fadeUp(0.44)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 22,
                        flexWrap: "wrap",
                    }}
                >
                    <Link
                        href="/Login"
                        style={{
                            background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            padding: "13px 14px 13px 26px",
                            borderRadius: 999,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            letterSpacing: "0.01em",
                            boxShadow: "0 6px 20px rgba(255,107,53,0.28)",
                            transition: "all 0.25s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow =
                                "0 10px 28px rgba(255,107,53,0.4)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow =
                                "0 6px 20px rgba(255,107,53,0.28)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Mulai melapor
                        <span
                            style={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.2)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path
                                    d="M1 5h7M5.5 1.5L9 5l-3.5 3.5"
                                    stroke="white"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </Link>
                    <a
                        href="#how-it-works"
                        style={{
                            color: "#a8856b",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            textDecoration: "none",
                            borderBottom: "1px solid rgba(232,90,32,0.15)",
                            paddingBottom: 3,
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#E8541C";
                            e.currentTarget.style.borderColor = "#E8541C";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#a8856b";
                            e.currentTarget.style.borderColor = "rgba(232,90,32,0.15)";
                        }}
                    >
                        Cara kerja platform →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}