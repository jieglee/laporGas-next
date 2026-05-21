"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
    { label: "Beranda",    href: "beranda" },
    { label: "Cara Kerja", href: "how-it-works" },
    { label: "Kontak",     href: "kontak" },
];

const LaporGasIcon = ({ color = "#E8201A", size = 28 }: { color?: string; size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" style={{ color, flexShrink: 0 }}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="currentColor" fillRule="evenodd" d="M16.84 19.16a16.5 16.5 0 0 0-2.175.949c-.18.11-.36.24-.539.369a2 2 0 0 1-.12-.14a9.4 9.4 0 0 0-1.527-1.217a.34.34 0 1 0-.449.509c.37.469.669.998.998 1.497l.09.14l-.09.08a15 15 0 0 0-1.527 1.815a.38.38 0 0 0 0 .55a.38.38 0 0 0 .54 0c.319-.3.648-.57.997-.839c.35-.27.54-.4.809-.589l.09.11c.399.489.808.948 1.197 1.427a.385.385 0 0 0 .637.017a.39.39 0 0 0 .012-.426c-.26-.569-.52-1.148-.839-1.717l-.11-.16l.24-.169c.659-.519 1.287-1.068 1.996-1.567a.34.34 0 0 0 .15-.459a.34.34 0 0 0-.38-.18m6.697-5.548a.341.341 0 1 0-.31-.609q-1.125.417-2.175.998a7 7 0 0 0-.549.37a.8.8 0 0 0-.12-.14a9 9 0 0 0-1.527-1.238a.34.34 0 0 0-.479 0a.327.327 0 0 0 0 .48c.38.478.679.997.998 1.506l.1.14l-.1.08a14 14 0 0 0-1.457 1.786a.38.38 0 0 0 0 .549a.39.39 0 0 0 .55 0c.318-.3.638-.569.997-.838c.36-.27.539-.4.808-.6l.09.12c.4.49.819.999 1.198 1.428a.39.39 0 0 0 .529.12a.4.4 0 0 0 .13-.53c-.27-.568-.53-1.147-.849-1.716c0 0-.07-.1-.1-.16l.23-.17c.659-.528 1.297-1.077 2.036-1.576m-5.2-1.178a.67.67 0 0 0 .34-.26c.09-.109.22-.418.26-.468s.149-.32.209-.49q.173-.49.29-.997l.139-.22c.1-.366.1-.752 0-1.117c-.12-.64-.42-1.437-.48-1.737c-.179-.659-.308-1.337-.478-1.996c-.11-.449-.23-.888-.36-1.337A49 49 0 0 0 17.26.469a.35.35 0 0 0-.42-.25a.44.44 0 0 0-.2.15a.3.3 0 0 0-.069-.22a.36.36 0 0 0-.529-.06c-.599.43-1.207.849-1.826 1.248c-.858.569-1.766 1.088-2.645 1.627c-.588.359-1.167.748-1.756 1.107q-.973.604-1.876 1.308a.83.83 0 0 0-.31.698L7.09 7.225q-.128.28-.2.579a.69.69 0 0 0 .11.599c.235.232.513.415.819.538a9.4 9.4 0 0 0 1.796.37a.38.38 0 0 0 .51-.31a.39.39 0 0 0-.25-.479c-.3-.12-.689-.309-1.088-.509c-.669-.319-.529-.12-.4-1.377l.45.09c.38.1.758.21 1.138.34c.379.129.998.379 1.546.578a6 6 0 0 1-.469 1.557a14.5 14.5 0 0 1-1.277 2.245c-.509.819-1.098 1.627-1.707 2.445q-.876 1.203-1.876 2.306a14 14 0 0 1-2.994 2.564a.33.33 0 0 0-.29.34a.33.33 0 0 0 .35.33a19 19 0 0 0 2.824-.14A9.3 9.3 0 0 0 8 18.9a10.2 10.2 0 0 0 2.395-1.227a11.5 11.5 0 0 0 1.996-1.797a20.4 20.4 0 0 0 3.692-6.666l1.996.868l.33.12c-1.268 1.447-.13 1.207-1.388.808a.39.39 0 0 0-.529.16a.4.4 0 0 0 .16.519q.466.406.998.718a1 1 0 0 0 .688.03m-2.754-4.27a.38.38 0 0 0-.499.219a.39.39 0 0 0 .23.499A22.6 22.6 0 0 1 12.2 14.06a14.7 14.7 0 0 1-2.615 2.545c-.64.489-1.332.904-2.065 1.237q-.795.36-1.647.55c-.32.079-.639.089-.998.139a15.4 15.4 0 0 0 2.814-2.235a18 18 0 0 0 1.996-2.455q.579-.867 1.068-1.787c.451-.8.832-1.638 1.138-2.505a7 7 0 0 0 .389-1.846a.37.37 0 0 0-.19-.34a.29.29 0 0 0-.1-.239a32 32 0 0 0-1.636-.838a9 9 0 0 0-.998-.43c.509-.299 1.097-.598 1.207-.668c.998-.688 2.086-1.377 3.084-2.116A42 42 0 0 0 16.571.708a.4.4 0 0 0 .1-.18a.3.3 0 0 0 0 .13c.33 1.587.509 3.184.778 4.78c.12.69.28 1.368.44 2.046l.448 1.517zM2.56 5.369c1.996.589 2.994-.46 2.994-1.926a1.996 1.996 0 0 0-1.667-2.096a3.05 3.05 0 0 0-2.395 1.377a1.7 1.7 0 0 0 .09 1.996c.255.307.595.533.978.649m.16-2.166c.303-.33.72-.533 1.167-.569c.42 0 .619.44.659.859c.16 1.387-.899 1.357-1.537 1.127a1.16 1.16 0 0 1-.61-.459c-.189-.359.05-.688.32-.958m1.926 7.734A1.996 1.996 0 0 0 3.01 8.842a3 3 0 0 0-2.455 1.367a1.7 1.7 0 0 0 .1 1.996c.264.298.612.51.997.609c1.986.638 2.974-.41 2.994-1.877m-3.153.719c-.22-.36 0-.689.29-.998c.303-.33.72-.537 1.167-.579c.419 0 .619.44.658.868c.21 1.837-1.736 1.358-2.115.709" clipRule="evenodd" />
    </svg>
);

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    const isScrolled = scrolled;

    return (
        <>
            {/* ── DESKTOP ── */}
            <div
                className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center px-6"
                style={{
                    paddingTop: isScrolled ? 10 : 18,
                    transition: "padding-top 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                }}
            >
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0,
                        width: isScrolled ? "min(88%, 780px)" : "100%",
                        maxWidth: isScrolled ? 780 : 1200,
                        height: 52,
                        borderRadius: isScrolled ? 9999 : 14,
                        paddingLeft: isScrolled ? 20 : 16,
                        paddingRight: isScrolled ? 8 : 8,
                        background: isScrolled
                            ? "rgba(232, 84, 28, 0.94)"
                            : "rgba(255,255,255,0.97)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        border: isScrolled
                            ? "1px solid rgba(255,255,255,0.18)"
                            : "1px solid rgba(0,0,0,0.07)",
                        boxShadow: isScrolled
                            ? "0 8px 32px rgba(232,84,28,0.28), inset 0 1px 0 rgba(255,255,255,0.15)"
                            : "0 4px 24px rgba(0,0,0,0.08)",
                        transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                    }}
                >
                    {/* Brand */}
                    <Link
                        href="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            textDecoration: "none",
                            flexShrink: 0,
                            marginRight: 4,
                        }}
                    >
                        <LaporGasIcon
                            color={isScrolled ? "rgba(255,255,255,0.95)" : "#E8201A"}
                            size={26}
                        />
                        <span style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                            letterSpacing: "-0.02em",
                            color: isScrolled ? "white" : "#111",
                            whiteSpace: "nowrap",
                        }}>
                            Lapor<span style={{ color: isScrolled ? "rgba(255,255,255,0.5)" : "#E8201A" }}>Gas</span>
                        </span>
                    </Link>

                    {/* Divider */}
                    <div style={{
                        width: 1,
                        height: 18,
                        background: isScrolled ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.08)",
                        flexShrink: 0,
                        margin: "0 16px",
                    }} />

                    {/* Nav Links */}
                    <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1 }}>
                        {links.map((l) => (
                            <button
                                key={l.label}
                                onClick={() => scrollTo(l.href)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "0.8rem",
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                    color: isScrolled ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.45)",
                                    transition: "color 0.2s",
                                    padding: 0,
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = isScrolled ? "white" : "#111")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = isScrolled ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.45)")}
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div style={{
                        width: 1,
                        height: 18,
                        background: isScrolled ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.08)",
                        flexShrink: 0,
                        margin: "0 12px 0 16px",
                    }} />

                    {/* Auth Buttons */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                        <Link
                            href="/auth/login"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "7px 14px",
                                borderRadius: 9,
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                textDecoration: "none",
                                color: isScrolled ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.6)",
                                border: isScrolled ? "1px solid rgba(255,255,255,0.28)" : "1px solid rgba(0,0,0,0.1)",
                                background: "transparent",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = isScrolled ? "white" : "#111";
                                e.currentTarget.style.background = isScrolled ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.03)";
                                e.currentTarget.style.borderColor = isScrolled ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = isScrolled ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.6)";
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.borderColor = isScrolled ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.1)";
                            }}
                        >
                            <IconLogin size={12} />
                            Masuk
                        </Link>

                        <Link
                            href="/auth/register"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "8px 16px",
                                borderRadius: 9,
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                whiteSpace: "nowrap",
                                textDecoration: "none",
                                background: isScrolled ? "white" : "linear-gradient(135deg, #E8201A, #FF6B35)",
                                color: isScrolled ? "#E8541C" : "white",
                                boxShadow: isScrolled
                                    ? "0 2px 10px rgba(255,255,255,0.18)"
                                    : "0 3px 12px rgba(232,32,26,0.25)",
                                transition: "transform 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = isScrolled
                                    ? "0 5px 18px rgba(255,255,255,0.28)"
                                    : "0 6px 20px rgba(232,32,26,0.38)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = isScrolled
                                    ? "0 2px 10px rgba(255,255,255,0.18)"
                                    : "0 3px 12px rgba(232,32,26,0.25)";
                            }}
                        >
                            <IconRegister size={12} />
                            Daftar
                        </Link>
                    </div>
                </nav>
            </div>

            {/* ── MOBILE ── */}
            <div
                className="md:hidden fixed top-0 left-0 right-0 z-50"
                style={{
                    background: "rgba(232, 84, 28, 0.97)",
                    backdropFilter: "blur(16px)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 2px 16px rgba(232,84,28,0.3)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 56 }}>
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                        <LaporGasIcon color="rgba(255,255,255,0.95)" size={24} />
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em", color: "white" }}>
                            Lapor<span style={{ color: "rgba(255,255,255,0.5)" }}>Gas</span>
                        </span>
                    </Link>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{ display: "flex", flexDirection: "column", gap: 5, padding: 6, background: "none", border: "none", cursor: "pointer" }}
                        aria-label="Toggle menu"
                    >
                        {[0, 1, 2].map((i) => (
                            <span key={i} style={{
                                display: "block",
                                width: 20,
                                height: 2,
                                borderRadius: 2,
                                background: "rgba(255,255,255,0.85)",
                                transformOrigin: "center",
                                transition: "all 0.3s ease",
                                transform: i === 0 && menuOpen ? "translateY(7px) rotate(45deg)"
                                    : i === 2 && menuOpen ? "translateY(-7px) rotate(-45deg)"
                                    : "none",
                                opacity: i === 1 && menuOpen ? 0 : 1,
                            }} />
                        ))}
                    </button>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateRows: menuOpen ? "1fr" : "0fr",
                    opacity: menuOpen ? 1 : 0,
                    transition: "grid-template-rows 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease",
                    overflow: "hidden",
                }}>
                    <div style={{ minHeight: 0 }}>
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 16px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
                            {links.map((l) => (
                                <button
                                    key={l.label}
                                    onClick={() => scrollTo(l.href)}
                                    style={{ textAlign: "left", fontSize: "0.9rem", fontWeight: 500, color: "rgba(255,255,255,0.75)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                                >
                                    {l.label}
                                </button>
                            ))}

                            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                                <Link href="/auth/login" onClick={() => setMenuOpen(false)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", borderRadius: 12, fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.22)", textDecoration: "none" }}>
                                    <IconLogin size={14} />
                                    Masuk
                                </Link>
                                <Link href="/auth/register" onClick={() => setMenuOpen(false)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", borderRadius: 12, fontSize: "0.85rem", fontWeight: 700, background: "white", color: "#E8541C", textDecoration: "none" }}>
                                    <IconRegister size={14} color="#E8541C" />
                                    Daftar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:hidden" style={{ height: 56 }} />
        </>
    );
}

function IconLogin({ size = 13 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
    );
}

function IconRegister({ size = 13, color = "currentColor" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
    );
}