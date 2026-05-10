"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
    const t = useTranslations("landing.footer");
    const locale = useLocale();

    const ruangLingkup = [
        { key: "statsLink", href: `/${locale}/user/statistik` },
        { key: "agenciesLink", href: `/${locale}/user/instansi` },
        { key: "privacyLink", href: "#" },
        { key: "termsLink", href: "#" },
    ];

    const kontak = [
        {
            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
            text: "Hotline: 1-400-LAPOR",
        },
        {
            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
            text: "halo@laporgas.go.id",
        },
    ];

    return (
        <footer style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>

            {/* Main section */}
            <div
                style={{
                    maxWidth: 1080,
                    margin: "0 auto",
                    padding: "52px 32px 40px",
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    gap: "32px 48px",
                }}
                className="footer-grid"
            >
                {/* Brand */}
                <div>
                    <Link
                        href={`/${locale}`}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 14 }}
                    >
                        <div
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 8,
                                background: "linear-gradient(135deg, #E8201A, #FF6B35)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 36 36" fill="none">
                                <path d="M22 7 L9 13 L9 23 L22 29 Z" fill="white" opacity="0.95" />
                                <rect x="4" y="14" width="5" height="8" rx="2" fill="white" opacity="0.95" />
                                <path d="M24 11 Q29 18 24 25" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                                <path d="M27 7 Q35 18 27 29" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                                <circle cx="6.5" cy="26" r="2.5" fill="#FFD166" />
                            </svg>
                        </div>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.02em", color: "#111" }}>
                            Lapor<span style={{ color: "#E8201A" }}>Gas</span>
                        </span>
                    </Link>

                    <p style={{ fontSize: "0.82rem", color: "rgba(0,0,0,0.42)", lineHeight: 1.8, maxWidth: 280, margin: "0 0 20px" }}>
                        {t("about")}
                    </p>

                    {/* CTA kecil */}
                    <Link
                        href={`/${locale}/user/pengaduan/buat`}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            background: "linear-gradient(135deg, #E8201A, #FF6B35)",
                            color: "white",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            padding: "9px 16px",
                            borderRadius: 9,
                            textDecoration: "none",
                            boxShadow: "0 3px 12px rgba(232,32,26,0.22)",
                        }}
                    >
                        {t("cta1")}
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Tautan */}
                <div>
                    <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(0,0,0,0.28)", margin: "0 0 16px" }}>
                        {t("scope")}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                        {ruangLingkup.map((l) => (
                            <Link
                                key={l.key}
                                href={l.href}
                                style={{ color: "rgba(0,0,0,0.48)", fontSize: "0.82rem", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#E8201A")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.48)")}
                            >
                                {t(l.key)}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Kontak */}
                <div>
                    <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(0,0,0,0.28)", margin: "0 0 16px" }}>
                        {t("contact")}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {kontak.map((k, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                <span style={{ color: "#E8201A", marginTop: 1, flexShrink: 0 }}>{k.icon}</span>
                                <span style={{ color: "rgba(0,0,0,0.48)", fontSize: "0.8rem", lineHeight: 1.55 }}>{k.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <div
                    style={{
                        maxWidth: 1080,
                        margin: "0 auto",
                        padding: "16px 32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 8,
                    }}
                >
                    <span style={{ color: "rgba(0,0,0,0.25)", fontSize: "0.72rem" }}>
                        {t("copy")}
                    </span>
                    <span style={{ color: "rgba(0,0,0,0.2)", fontSize: "0.7rem", fontStyle: "italic" }}>
                        {t("tagline")}
                    </span>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .footer-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </footer>
    );
}