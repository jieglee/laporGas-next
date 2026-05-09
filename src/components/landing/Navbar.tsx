"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const t = useTranslations("landing.nav");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const toggleLang = () => {
        const next = locale === "id" ? "en" : "id";
        const newPath = pathname.replace(`/${locale}`, `/${next}`);
        router.push(newPath);
    };

    const links = [
        { key: "home", href: "#" },
        { key: "howItWorks", href: "#how-it-works" },
        { key: "stats", href: "#stats" },
        { key: "about", href: "#about" },
    ];

    return (
        <>
            {/* ── DESKTOP: floating centered rounded rect ── */}
            <div
                className="hidden md:flex fixed top-5 left-0 right-0 z-50 justify-center px-6"
                style={{ pointerEvents: "none" }}
            >
                <motion.nav
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        pointerEvents: "auto",
                        display: "flex",
                        alignItems: "center",
                        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.88)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(0,0,0,0.07)",
                        borderRadius: 14,
                        padding: "7px 7px 7px 18px",
                        boxShadow: scrolled
                            ? "0 8px 32px rgba(0,0,0,0.10)"
                            : "0 4px 20px rgba(0,0,0,0.07)",
                        transition: "background 0.3s ease, box-shadow 0.3s ease",
                        gap: 0,
                    }}
                >
                    {/* Brand */}
                    <Link
                        href={`/${locale}`}
                        style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginRight: 16 }}
                    >
                        <span
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: "0.95rem",
                                letterSpacing: "-0.02em",
                                color: "#111",
                            }}
                        >
                            Lapor<span style={{ color: "#E8201A" }}>Gas</span>
                        </span>
                    </Link>

                    {/* Divider */}
                    <div style={{ width: 1, height: 18, background: "rgba(0,0,0,0.07)", marginRight: 16, flexShrink: 0 }} />

                    {/* Nav Links */}
                    <div style={{ display: "flex", alignItems: "center", gap: 20, marginRight: 16 }}>
                        {links.map((l) => (
                            <a
                                key={l.key}
                                href={l.href}
                                style={{
                                    color: "rgba(0,0,0,0.42)",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    textDecoration: "none",
                                    transition: "color 0.2s",
                                    whiteSpace: "nowrap",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.42)")}
                            >
                                {t(l.key)}
                            </a>
                        ))}
                    </div>

                    {/* Divider */}
                    <div style={{ width: 1, height: 18, background: "rgba(0,0,0,0.07)", marginRight: 10, flexShrink: 0 }} />

                    {/* Lang toggle */}
                    <button
                        onClick={toggleLang}
                        style={{
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            padding: "5px 9px",
                            borderRadius: 7,
                            border: "1px solid rgba(0,0,0,0.10)",
                            color: "rgba(0,0,0,0.38)",
                            background: "transparent",
                            cursor: "pointer",
                            marginRight: 8,
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#111";
                            e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "rgba(0,0,0,0.38)";
                            e.currentTarget.style.borderColor = "rgba(0,0,0,0.10)";
                        }}
                    >
                        {locale === "id" ? "EN" : "ID"}
                    </button>

                    {/* Masuk button */}
                    <Link
                        href={`/${locale}/auth/masuk`}
                        style={{
                            color: "rgba(0,0,0,0.6)",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            padding: "8px 14px",
                            borderRadius: 9,
                            textDecoration: "none",
                            border: "1px solid rgba(0,0,0,0.10)",
                            background: "transparent",
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            marginRight: 6,
                            transition: "all 0.2s",
                            whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#111";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.22)";
                            (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.03)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.6)";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.10)";
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                    >
                        {t("masuk")}
                    </Link>

                    {/* Buat Akun button */}
                    <Link
                        href={`/${locale}/auth/daftar`}
                        style={{
                            background: "linear-gradient(135deg, #E8201A, #FF6B35)",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            padding: "9px 16px",
                            borderRadius: 9,
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            boxShadow: "0 3px 12px rgba(232,32,26,0.22)",
                            transition: "box-shadow 0.25s, transform 0.2s",
                            whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(232,32,26,0.35)";
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 3px 12px rgba(232,32,26,0.22)";
                            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        }}
                    >
                        {t("daftar")}
                    </Link>
                </motion.nav>
            </div>

            {/* ── MOBILE: full width sticky ── */}
            <motion.div
                className="md:hidden fixed top-0 left-0 right-0 z-50"
                initial={{ y: -56, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    background: "rgba(255,255,255,0.97)",
                    backdropFilter: "blur(16px)",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 16px",
                        height: 56,
                    }}
                >
                    <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 7,
                                background: "linear-gradient(135deg, #E8201A, #FF6B35)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg width="15" height="15" viewBox="0 0 36 36" fill="none">
                                <path d="M22 7 L9 13 L9 23 L22 29 Z" fill="white" opacity="0.95" />
                                <rect x="4" y="14" width="5" height="8" rx="2" fill="white" opacity="0.95" />
                                <path d="M24 11 Q29 18 24 25" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                                <path d="M27 7 Q35 18 27 29" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                                <circle cx="6.5" cy="26" r="2.5" fill="#FFD166" />
                            </svg>
                        </div>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em", color: "#111" }}>
                            Lapor<span style={{ color: "#E8201A" }}>Gas</span>
                        </span>
                    </Link>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button
                            onClick={toggleLang}
                            style={{
                                fontSize: "0.62rem",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                padding: "4px 8px",
                                borderRadius: 6,
                                border: "1px solid rgba(0,0,0,0.10)",
                                color: "rgba(0,0,0,0.38)",
                                background: "transparent",
                                cursor: "pointer",
                            }}
                        >
                            {locale === "id" ? "EN" : "ID"}
                        </button>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{ padding: 6, background: "none", border: "none", cursor: "pointer", color: "rgba(0,0,0,0.5)" }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {menuOpen
                                    ? <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
                                    : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}
                            </svg>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                overflow: "hidden",
                                borderTop: "1px solid rgba(0,0,0,0.06)",
                                padding: "12px 16px 16px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            {links.map((l) => (
                                <a
                                    key={l.key}
                                    href={l.href}
                                    onClick={() => setMenuOpen(false)}
                                    style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}
                                >
                                    {t(l.key)}
                                </a>
                            ))}

                            {/* Mobile: Masuk + Daftar side by side */}
                            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                                <Link
                                    href={`/${locale}/auth/masuk`}
                                    style={{
                                        flex: 1,
                                        color: "rgba(0,0,0,0.65)",
                                        fontWeight: 600,
                                        fontSize: "0.85rem",
                                        padding: "10px 0",
                                        borderRadius: 10,
                                        textAlign: "center",
                                        textDecoration: "none",
                                        border: "1px solid rgba(0,0,0,0.12)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 6,
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    {t("masuk")}
                                </Link>
                                <Link
                                    href={`/${locale}/auth/daftar`}
                                    style={{
                                        flex: 1,
                                        background: "linear-gradient(135deg, #E8201A, #FF6B35)",
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: "0.85rem",
                                        padding: "10px 0",
                                        borderRadius: 10,
                                        textAlign: "center",
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 6,
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <line x1="19" y1="8" x2="19" y2="14" />
                                        <line x1="22" y1="11" x2="16" y2="11" />
                                    </svg>
                                    {t("daftar")}
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Spacer buat konten di bawah navbar mobile */}
            <div className="md:hidden" style={{ height: 56 }} />
        </>
    );
}