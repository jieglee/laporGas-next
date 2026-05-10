"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ nama: "", email: "", password: "", konfirmasi: "" });
    const [showPass, setShowPass] = useState(false);
    const [showKonfirmasi, setShowKonfirmasi] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (form.password !== form.konfirmasi) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nama: form.nama, email: form.email, password: form.password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registrasi gagal");
            router.push("/Login");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    const strength = (() => {
        const p = form.password;
        if (!p) return 0;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();

    const strengthLabel = ["", "Lemah", "Cukup", "Kuat", "Sangat Kuat"][strength];
    const strengthColor = ["", "#E8201A", "#FF6B35", "#F59E0B", "#22C55E"][strength];

    return (
        <div style={{ minHeight: "100vh", display: "flex", fontFamily: "inherit" }}>
            <style>{`
                .rg-input {
                    width: 100%;
                    padding: 12px 16px;
                    border-radius: 12px;
                    border: 1.5px solid rgba(0,0,0,0.09);
                    background: #f9f9f9;
                    color: #111;
                    font-size: 0.875rem;
                    font-family: inherit;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
                    box-sizing: border-box;
                }
                .rg-input::placeholder { color: rgba(0,0,0,0.28); }
                .rg-input:focus {
                    border-color: #E8201A;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(232,32,26,0.08);
                }
                .rg-social {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 11px 0;
                    border-radius: 12px;
                    border: 1.5px solid rgba(0,0,0,0.09);
                    background: #fff;
                    cursor: pointer;
                    font-size: 0.78rem;
                    font-weight: 600;
                    color: rgba(0,0,0,0.55);
                    font-family: inherit;
                    transition: all 0.18s;
                }
                .rg-social:hover { border-color: rgba(0,0,0,0.18); background: #f5f5f5; }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            {/* ── KIRI: branding panel ── */}
            <div
                className="hidden lg:flex"
                style={{
                    width: "45%",
                    background: "linear-gradient(155deg, #E8201A 0%, #c41510 45%, #8B0E0A 100%)",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "48px 52px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Dekorasi */}
                <div style={{
                    position: "absolute", width: 500, height: 500, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.08)",
                    bottom: -180, right: -140, pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", width: 320, height: 320, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.06)",
                    bottom: -60, right: -60, pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", width: 200, height: 200, borderRadius: "50%",
                    background: "rgba(255,107,53,0.18)",
                    top: -60, left: -60,
                    filter: "blur(60px)", pointerEvents: "none",
                }} />

                {/* Logo */}
                <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", position: "relative", zIndex: 1 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
                            <path d="M22 7 L9 13 L9 23 L22 29 Z" fill="white" opacity="0.95" />
                            <rect x="4" y="14" width="5" height="8" rx="2" fill="white" opacity="0.95" />
                            <path d="M24 11 Q29 18 24 25" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                            <path d="M27 7 Q35 18 27 29" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                            <circle cx="6.5" cy="26" r="2.5" fill="#FFD166" />
                        </svg>
                    </div>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "white" }}>
                        LaporGas
                    </span>
                </Link>

                {/* Center content */}
                <div style={{ position: "relative", zIndex: 1 }}>
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                        style={{
                            width: 80, height: 80, borderRadius: 22,
                            background: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            marginBottom: 32,
                        }}
                    >
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <line x1="19" y1="8" x2="19" y2="14" />
                            <line x1="22" y1="11" x2="16" y2="11" />
                        </svg>
                    </motion.div>

                    <h2 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800, fontSize: "2.2rem",
                        color: "white", letterSpacing: "-0.03em",
                        lineHeight: 1.15, margin: "0 0 16px",
                    }}>
                        Bergabung &<br />
                        <span style={{ color: "rgba(255,255,255,0.6)" }}>Mulai Melapor.</span>
                    </h2>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 300, margin: 0 }}>
                        Daftar sekarang dan jadilah bagian dari gerakan warga aktif untuk Indonesia yang lebih baik.
                    </p>

                    {/* Steps */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 36 }}>
                        {[
                            { icon: "📝", text: "Buat akun gratis dalam 1 menit" },
                            { icon: "📣", text: "Lapor masalah di sekitarmu" },
                            { icon: "✅", text: "Pantau progress penyelesaian" },
                        ].map((s) => (
                            <div key={s.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{
                                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                                    background: "rgba(255,255,255,0.12)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "0.95rem",
                                }}>
                                    {s.icon}
                                </div>
                                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)" }}>{s.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", margin: 0, position: "relative", zIndex: 1 }}>
                    Platform Pengaduan Publik Resmi Indonesia
                </p>
            </div>

            {/* ── KANAN: form ── */}
            <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fafafa",
                padding: "40px 24px",
                overflowY: "auto",
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: "100%", maxWidth: 380 }}
                >
                    {/* Mobile logo */}
                    <Link href="/" className="lg:hidden" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 32 }}>
                        <div style={{
                            width: 30, height: 30, borderRadius: 8,
                            background: "linear-gradient(135deg, #E8201A, #FF6B35)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <svg width="15" height="15" viewBox="0 0 36 36" fill="none">
                                <path d="M22 7 L9 13 L9 23 L22 29 Z" fill="white" opacity="0.95" />
                                <rect x="4" y="14" width="5" height="8" rx="2" fill="white" opacity="0.95" />
                                <path d="M24 11 Q29 18 24 25" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                                <circle cx="6.5" cy="26" r="2.5" fill="#FFD166" />
                            </svg>
                        </div>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#111" }}>
                            Lapor<span style={{ color: "#E8201A" }}>Gas</span>
                        </span>
                    </Link>

                    <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                        Buat akun baru
                    </h1>
                    <p style={{ fontSize: "0.83rem", color: "rgba(0,0,0,0.38)", margin: "0 0 28px" }}>
                        Gratis, cepat, dan langsung bisa dipakai
                    </p>

                    {/* Social */}
                    <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
                        <button type="button" className="rg-social">
                            <svg width="17" height="17" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </button>
                        <button type="button" className="rg-social">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                        </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.07)" }} />
                        <span style={{ fontSize: "0.72rem", color: "rgba(0,0,0,0.3)", fontWeight: 500 }}>atau dengan email</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.07)" }} />
                    </div>

                    {error && (
                        <div style={{
                            background: "rgba(232,32,26,0.06)", border: "1px solid rgba(232,32,26,0.15)",
                            borderRadius: 10, padding: "10px 14px", marginBottom: 16,
                            fontSize: "0.8rem", color: "#E8201A",
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {/* Nama */}
                        <div>
                            <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 600, color: "rgba(0,0,0,0.45)", marginBottom: 6 }}>
                                Nama Lengkap
                            </label>
                            <input type="text" className="rg-input" placeholder="Nama kamu"
                                value={form.nama} onChange={(e) => update("nama", e.target.value)}
                                required autoComplete="name" />
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 600, color: "rgba(0,0,0,0.45)", marginBottom: 6 }}>
                                Email
                            </label>
                            <input type="email" className="rg-input" placeholder="nama@email.com"
                                value={form.email} onChange={(e) => update("email", e.target.value)}
                                required autoComplete="email" />
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 600, color: "rgba(0,0,0,0.45)", marginBottom: 6 }}>
                                Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <input type={showPass ? "text" : "password"} className="rg-input"
                                    placeholder="Min. 8 karakter" value={form.password}
                                    onChange={(e) => update("password", e.target.value)}
                                    required autoComplete="new-password"
                                    style={{ paddingRight: 44 }} />
                                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                                    background: "none", border: "none", cursor: "pointer",
                                    color: "rgba(0,0,0,0.28)", padding: 0, display: "flex",
                                }}>
                                    {showPass ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                                            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                                            <line x1="1" y1="1" x2="23" y2="23"/>
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {/* Password strength */}
                            {form.password && (
                                <div style={{ marginTop: 8 }}>
                                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} style={{
                                                flex: 1, height: 3, borderRadius: 99,
                                                background: i <= strength ? strengthColor : "rgba(0,0,0,0.08)",
                                                transition: "background 0.2s",
                                            }} />
                                        ))}
                                    </div>
                                    <span style={{ fontSize: "0.68rem", color: strengthColor, fontWeight: 600 }}>
                                        {strengthLabel}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Konfirmasi password */}
                        <div>
                            <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 600, color: "rgba(0,0,0,0.45)", marginBottom: 6 }}>
                                Konfirmasi Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <input type={showKonfirmasi ? "text" : "password"} className="rg-input"
                                    placeholder="Ulangi password" value={form.konfirmasi}
                                    onChange={(e) => update("konfirmasi", e.target.value)}
                                    required autoComplete="new-password"
                                    style={{
                                        paddingRight: 44,
                                        borderColor: form.konfirmasi
                                            ? form.konfirmasi === form.password ? "rgba(34,197,94,0.5)" : "rgba(232,32,26,0.4)"
                                            : undefined,
                                    }} />
                                <button type="button" onClick={() => setShowKonfirmasi(!showKonfirmasi)} style={{
                                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                                    background: "none", border: "none", cursor: "pointer",
                                    color: "rgba(0,0,0,0.28)", padding: 0, display: "flex",
                                }}>
                                    {showKonfirmasi ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                                            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                                            <line x1="1" y1="1" x2="23" y2="23"/>
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Terms */}
                        <p style={{ fontSize: "0.72rem", color: "rgba(0,0,0,0.38)", margin: "2px 0 0", lineHeight: 1.6 }}>
                            Dengan mendaftar, kamu menyetujui{" "}
                            <Link href="/syarat" style={{ color: "#E8201A", textDecoration: "none", fontWeight: 500 }}>Syarat & Ketentuan</Link>
                            {" "}dan{" "}
                            <Link href="/privasi" style={{ color: "#E8201A", textDecoration: "none", fontWeight: 500 }}>Kebijakan Privasi</Link>
                            {" "}kami.
                        </p>

                        <button type="submit" disabled={loading} style={{
                            marginTop: 4, width: "100%", padding: "13px", borderRadius: 12, border: "none",
                            background: loading ? "rgba(232,32,26,0.5)" : "linear-gradient(135deg, #E8201A, #FF6B35)",
                            color: "white", fontWeight: 700, fontSize: "0.88rem", fontFamily: "inherit",
                            cursor: loading ? "not-allowed" : "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            boxShadow: loading ? "none" : "0 4px 16px rgba(232,32,26,0.25)",
                            transition: "all 0.2s",
                        }}>
                            {loading ? (
                                <>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                        style={{ animation: "spin 0.8s linear infinite" }}>
                                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                                    </svg>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    Buat Akun
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: 22, fontSize: "0.8rem", color: "rgba(0,0,0,0.38)" }}>
                        Sudah punya akun?{" "}
                        <Link href="/Login" style={{ color: "#E8201A", fontWeight: 600, textDecoration: "none" }}>
                            Login sekarang
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}