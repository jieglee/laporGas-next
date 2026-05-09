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
        // Ganti locale di path: /id/... → /en/...
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
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
                backdropFilter: scrolled ? "blur(16px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
                boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
            }}
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Brand */}
                <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #E8201A, #FF6B35)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7zm-1 14v-1h2v1h-2zm3-2.54V15h-4v-1.54C8.21 12.6 7 10.9 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.9-1.21 3.6-3 4.46z" />
                        </svg>
                    </div>
                    <span
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800,
                            fontSize: "1.15rem",
                            letterSpacing: "-0.02em",
                            color: scrolled ? "#111" : "#111",
                        }}
                    >
                        Lapor<span style={{ color: "#E8201A" }}>Gas</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-7">
                    {links.map((l) => (
                        <a
                            key={l.key}
                            href={l.href}
                            style={{
                                color: "rgba(30,30,30,0.55)",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                textDecoration: "none",
                                letterSpacing: "0.01em",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(30,30,30,0.55)")}
                        >
                            {t(l.key)}
                        </a>
                    ))}
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleLang}
                        style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            border: "1px solid rgba(0,0,0,0.12)",
                            color: "rgba(0,0,0,0.45)",
                            background: "transparent",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        {locale === "id" ? "EN" : "ID"}
                    </button>

                    <Link
                        href={`/${locale}/user/pengaduan/buat`}
                        className="hidden md:inline-flex items-center gap-2"
                        style={{
                            background: "linear-gradient(135deg, #E8201A, #FF6B35)",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.83rem",
                            padding: "9px 20px",
                            borderRadius: "10px",
                            textDecoration: "none",
                            transition: "all 0.3s",
                            boxShadow: "0 4px 14px rgba(232,32,26,0.25)",
                        }}
                    >
                        {t("cta")}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2"
                        style={{ color: "rgba(0,0,0,0.6)" }}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {menuOpen ? (
                                <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
                            ) : (
                                <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            background: "rgba(255,255,255,0.98)",
                            borderTop: "1px solid rgba(0,0,0,0.06)",
                        }}
                        className="md:hidden px-6 py-4 flex flex-col gap-4"
                    >
                        {links.map((l) => (
                            <a
                                key={l.key}
                                href={l.href}
                                style={{ color: "rgba(30,30,30,0.6)", fontSize: "0.95rem", fontWeight: 500, textDecoration: "none" }}
                                onClick={() => setMenuOpen(false)}
                            >
                                {t(l.key)}
                            </a>
                        ))}
                        <Link
                            href={`/${locale}/user/pengaduan/buat`}
                            style={{
                                background: "linear-gradient(135deg, #E8201A, #FF6B35)",
                                color: "white",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                padding: "12px",
                                borderRadius: "10px",
                                textAlign: "center",
                                textDecoration: "none",
                            }}
                        >
                            {t("cta")}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}