"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login gagal");
            router.push("/user/dashboard");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: "#fff",
                overflow: "hidden",
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@800&display=swap');
        .input-field {
          width: 100%;
          padding: 13px 16px;
          border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.10);
          font-size: 0.88rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #111;
          background: rgba(255,255,255,0.8);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field::placeholder { color: rgba(0,0,0,0.28); }
        .input-field:focus {
          border-color: #E8201A;
          box-shadow: 0 0 0 3px rgba(232,32,26,0.08);
        }
        .submit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #E8201A, #FF6B35);
          color: white;
          font-weight: 700;
          font-size: 0.92rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 6px 20px rgba(232,32,26,0.28);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(232,32,26,0.36);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

            {/* ── LEFT: wave panel ── */}
            <div
                className="hidden lg:flex"
                style={{
                    width: "45%",
                    position: "relative",
                    flexShrink: 0,
                    background: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <svg
                    viewBox="0 0 520 900"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "auto" }}
                    preserveAspectRatio="xMaxYMid slice"
                >
                    <defs>
                        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FF6B35" />
                            <stop offset="50%" stopColor="#E8201A" />
                            <stop offset="100%" stopColor="#C41A15" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M520,0 L220,0 C320,150 420,200 300,450 C180,700 320,750 220,900 L520,900 Z"
                        fill="url(#waveGrad)"
                    />
                </svg>

                <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 48px" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: 20,
                            background: "rgba(255,255,255,0.2)",
                            backdropFilter: "blur(12px)",
                            border: "1.5px solid rgba(255,255,255,0.35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 24px",
                        }}
                    >
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7zm-1 14v-1h2v1h-2zm3-2.54V15h-4v-1.54C8.21 12.6 7 10.9 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.9-1.21 3.6-3 4.46z" />
                        </svg>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                    >
                        <div
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: "2rem",
                                color: "white",
                                letterSpacing: "-0.03em",
                                marginBottom: 10,
                                textShadow: "0 2px 12px rgba(0,0,0,0.15)",
                            }}
                        >
                            LaporGas
                        </div>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", lineHeight: 1.6, maxWidth: 220, margin: "0 auto" }}>
                            Platform pengaduan masyarakat yang transparan dan terukur
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.6 }}
                        style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center" }}
                    >
                        {[
                            { num: "12rb+", label: "Laporan" },
                            { num: "78%", label: "Selesai" },
                        ].map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    background: "rgba(255,255,255,0.15)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid rgba(255,255,255,0.25)",
                                    borderRadius: 12,
                                    padding: "12px 20px",
                                    textAlign: "center",
                                }}
                            >
                                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "white" }}>
                                    {s.num}
                                </div>
                                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ── RIGHT: form ── */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 24px",
                    background: "linear-gradient(160deg, #fff 0%, #FFF5F3 60%, #FFE8E5 100%)",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: 500,
                        height: 500,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(232,32,26,0.07) 0%, transparent 70%)",
                        top: -100,
                        right: -100,
                        pointerEvents: "none",
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}
                >
                    {/* Mobile brand */}
                    <div className="flex lg:hidden items-center gap-2 mb-8">
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 9,
                                background: "linear-gradient(135deg, #E8201A, #FF6B35)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7zm-1 14v-1h2v1h-2zm3-2.54V15h-4v-1.54C8.21 12.6 7 10.9 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.9-1.21 3.6-3 4.46z" />
                            </svg>
                        </div>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#111" }}>
                            Lapor<span style={{ color: "#E8201A" }}>Gas</span>
                        </span>
                    </div>

                    {/* Heading */}
                    <div style={{ marginBottom: 32 }}>
                        <h1
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: "2.1rem",
                                letterSpacing: "-0.03em",
                                color: "#111",
                                marginBottom: 6,
                            }}
                        >
                            Masuk
                        </h1>
                        <p style={{ color: "rgba(0,0,0,0.42)", fontSize: "0.875rem" }}>
                            Selamat datang kembali — masukkan akun Anda
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: "rgba(232,32,26,0.07)",
                                border: "1px solid rgba(232,32,26,0.2)",
                                borderRadius: 10,
                                padding: "10px 14px",
                                marginBottom: 20,
                                fontSize: "0.82rem",
                                color: "#C41A15",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <div>
                            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#111", marginBottom: 7 }}>
                                Email
                            </label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111" }}>Password</label>
                                <Link
                                    href="/lupa-password"
                                    style={{ fontSize: "0.75rem", color: "#E8201A", textDecoration: "none", fontWeight: 500 }}
                                >
                                    Lupa password?
                                </Link>
                            </div>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="input-field"
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    style={{ paddingRight: 44 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    style={{
                                        position: "absolute",
                                        right: 14,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "rgba(0,0,0,0.3)",
                                        padding: 0,
                                        display: "flex",
                                    }}
                                >
                                    {showPass ? (
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading} style={{ marginTop: 4 }}>
                            {loading ? (
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                        style={{ animation: "spin 0.8s linear infinite" }}>
                                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                                    </svg>
                                    Memproses...
                                </span>
                            ) : "Masuk"}
                        </button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: 22, fontSize: "0.82rem", color: "rgba(0,0,0,0.42)" }}>
                        Belum punya akun?{" "}
                        <Link href="/daftar" style={{ color: "#E8201A", fontWeight: 600, textDecoration: "none" }}>
                            Daftar Sekarang
                        </Link>
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
                        <span style={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>atau masuk dengan</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
                    </div>

                    <div style={{ display: "flex", gap: 12 }}>
                        {[
                            {
                                label: "Google",
                                icon: (
                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                ),
                            },
                            {
                                label: "Facebook",
                                icon: (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                ),
                            },
                        ].map((s) => (
                            <button
                                key={s.label}
                                type="button"
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 8,
                                    padding: "11px",
                                    borderRadius: 12,
                                    border: "1.5px solid rgba(0,0,0,0.08)",
                                    background: "white",
                                    cursor: "pointer",
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    color: "#333",
                                    transition: "all 0.2s",
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.16)";
                                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                {s.icon}
                                {s.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}