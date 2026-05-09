"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

// Icons per step
const StepIcons = [
    // Tulis Laporan — edit/pencil
    <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>,
    // Proses Verifikasi — forward/share
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 14 20 9 15 4" />
        <path d="M4 20v-7a4 4 0 014-4h12" />
    </svg>,
    // Proses Tindak Lanjut — chat/message
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>,
    // Beri Tanggapan — reply chat
    <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M9 10h6" />
        <path d="M9 14h4" />
    </svg>,
    // Selesai — checkmark
    <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>,
];

export default function HowItWorks() {
    const t = useTranslations("landing.how");
    const locale = useLocale();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    const steps: { titleKey: string; descKey: string }[] = [
        { titleKey: "step1Title", descKey: "step1Desc" },
        { titleKey: "step2Title", descKey: "step2Desc" },
        { titleKey: "step3Title", descKey: "step3Desc" },
        { titleKey: "step4Title", descKey: "step4Desc" },
        { titleKey: "step5Title", descKey: "step5Desc" },
    ];

    return (
        <section
            id="how-it-works"
            style={{
                background: "#fff",
                padding: "80px 24px 72px",
            }}
        >
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: 64 }}
                >
                    <h2
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
                            letterSpacing: "-0.03em",
                            color: "#111",
                            marginBottom: 12,
                        }}
                    >
                        {t("title")}
                    </h2>
                    <p style={{ color: "rgba(30,30,30,0.45)", fontSize: "1rem", maxWidth: 420, margin: "0 auto" }}>
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div ref={ref} style={{ position: "relative" }}>
                    {/* Connector line (desktop) */}
                    <div
                        className="hidden md:block"
                        style={{
                            position: "absolute",
                            top: 36, // center of icon circle
                            left: "10%",
                            right: "10%",
                            height: 1.5,
                            background: "rgba(0,0,0,0.08)",
                            zIndex: 0,
                        }}
                    />

                    {/* Animated fill line */}
                    <motion.div
                        className="hidden md:block"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "absolute",
                            top: 36,
                            left: "10%",
                            right: "10%",
                            height: 1.5,
                            background: "linear-gradient(90deg, #E8201A, #FF6B35, #FFB800)",
                            zIndex: 1,
                            transformOrigin: "left",
                        }}
                    />

                    {/* Steps */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            gap: "0 12px",
                            position: "relative",
                            zIndex: 2,
                        }}
                        className="grid-cols-1 md:grid-cols-5"
                    >
                        {steps.map((step, i) => {
                            const isFirst = i === 0;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ textAlign: "center", padding: "0 8px" }}
                                >
                                    {/* Icon circle */}
                                    <div
                                        style={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: "50%",
                                            margin: "0 auto 20px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            position: "relative",
                                            // First step = filled red, rest = light gray outline
                                            background: isFirst ? "linear-gradient(135deg, #E8201A, #FF4D4D)" : "#F3F3F3",
                                            border: isFirst ? "none" : "1.5px solid rgba(0,0,0,0.08)",
                                            boxShadow: isFirst ? "0 8px 24px rgba(232,32,26,0.25)" : "none",
                                            color: isFirst ? "white" : "#555",
                                            transition: "all 0.3s",
                                        }}
                                    >
                                        {StepIcons[i]}
                                    </div>

                                    {/* Title */}
                                    <div
                                        style={{
                                            fontWeight: 700,
                                            fontSize: "0.9rem",
                                            color: "#111",
                                            marginBottom: 10,
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {t(step.titleKey)}
                                    </div>

                                    {/* Desc */}
                                    <div
                                        style={{
                                            fontSize: "0.78rem",
                                            color: "rgba(30,30,30,0.45)",
                                            lineHeight: 1.65,
                                        }}
                                    >
                                        {t(step.descKey)}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    style={{ textAlign: "center", marginTop: 52 }}
                >
                    <Link
                        href={`/${locale}/user/pengaduan/buat`}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            border: "1.5px solid #E8201A",
                            color: "#E8201A",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            padding: "13px 32px",
                            borderRadius: 10,
                            textDecoration: "none",
                            transition: "all 0.25s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#E8201A";
                            e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#E8201A";
                        }}
                    >
                        {t("cta")}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}