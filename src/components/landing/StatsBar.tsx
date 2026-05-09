"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

function Counter({ value }: { value: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (!inView) return;
        const num = parseInt(value.replace(/[^0-9]/g, ""));
        const suffix = value.replace(/[0-9.,]/g, "");
        const duration = 1600;
        const step = (ts: number, start: number) => {
            const p = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.floor(eased * num).toLocaleString() + suffix);
            if (p < 1) requestAnimationFrame((t) => step(t, start));
        };
        requestAnimationFrame((t) => step(t, t));
    }, [inView, value]);

    return <span ref={ref}>{display}</span>;
}

export default function StatsBar() {
    const t = useTranslations("landing.stats");
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    const stats = [
        { key: "reports", value: "12400+" },
        { key: "resolved", value: "9800+" },
        { key: "agencies", value: "340+" },
        { key: "rate", value: "78%" },
    ];

    return (
        <section
            id="stats"
            ref={ref}
            style={{
                background: "#fff",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                padding: "56px 24px",
            }}
        >
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 16,
                    }}
                    className="grid-cols-2 md:grid-cols-4"
                >
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.key}
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                background: "#FAFAFA",
                                border: "1px solid rgba(0,0,0,0.06)",
                                borderRadius: 16,
                                padding: "28px 20px",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 800,
                                    fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                                    letterSpacing: "-0.02em",
                                    backgroundImage: "linear-gradient(135deg, #E8201A, #FF6B35)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    lineHeight: 1.1,
                                }}
                            >
                                {inView ? <Counter value={s.value} /> : "0"}
                            </div>
                            <div
                                style={{
                                    color: "rgba(30,30,30,0.45)",
                                    fontSize: "0.78rem",
                                    marginTop: 6,
                                    fontWeight: 500,
                                }}
                            >
                                {t(s.key)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}