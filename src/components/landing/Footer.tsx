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
            icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
            ),
            text: "Hotline: 1-400-LAPOR",
        },
        {
            icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            ),
            text: "halo@laporgas.go.id",
        },
        {
            icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
            text: "Jl. Jenderal Sudirman No.1, Jakarta Pusat",
        },
    ];

    return (
        <footer style={{ background: "#1A2238", color: "white" }}>
            {/* Help banner */}
            <div
                style={{
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    padding: "20px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    maxWidth: 1080,
                    margin: "0 auto",
                }}
            >
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                    {t("helpBanner")}
                </span>
                <Link
                    href="#"
                    style={{
                        border: "1px solid rgba(255,255,255,0.25)",
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        padding: "8px 18px",
                        borderRadius: 8,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s",
                    }}
                >
                    {t("helpCta")}
                </Link>
            </div>

            {/* Main footer */}
            <div
                style={{
                    maxWidth: 1080,
                    margin: "0 auto",
                    padding: "48px 32px 36px",
                    display: "grid",
                    gridTemplateColumns: "2fr 1.2fr 1.5fr",
                    gap: "40px 32px",
                }}
                className="footer-grid"
            >
                {/* Brand column */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                background: "linear-gradient(135deg, #E8201A, #FF6B35)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7zm-1 14v-1h2v1h-2zm3-2.54V15h-4v-1.54C8.21 12.6 7 10.9 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.9-1.21 3.6-3 4.46z" />
                            </svg>
                        </div>
                        <span
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: "1.2rem",
                                letterSpacing: "-0.02em",
                                color: "white",
                            }}
                        >
                            Lapor<span style={{ color: "#FF6B35" }}>Gas</span>
                        </span>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 280 }}>
                        {t("about")}
                    </p>
                </div>

                {/* Ruang Lingkup */}
                <div>
                    <div
                        style={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.35)",
                            marginBottom: 16,
                        }}
                    >
                        {t("scope")}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {ruangLingkup.map((l) => (
                            <Link
                                key={l.key}
                                href={l.href}
                                style={{
                                    color: "rgba(255,255,255,0.55)",
                                    fontSize: "0.83rem",
                                    textDecoration: "none",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                            >
                                {t(l.key)}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Kontak Resmi */}
                <div>
                    <div
                        style={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.35)",
                            marginBottom: 16,
                        }}
                    >
                        {t("contact")}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {kontak.map((k, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                <span style={{ color: "#FF6B35", marginTop: 2, flexShrink: 0 }}>{k.icon}</span>
                                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", lineHeight: 1.5 }}>
                                    {k.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    padding: "16px 32px",
                    maxWidth: 1080,
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 8,
                }}
            >
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.72rem" }}>
                    {t("copy")}
                </span>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.68rem", fontStyle: "italic" }}>
                    {t("tagline")}
                </span>
            </div>

            <style>{`
        @media (max-width: 768px) {
            .footer-grid { grid-template-columns: 1fr !important; }
        }
        `}</style>
        </footer>
    );
}