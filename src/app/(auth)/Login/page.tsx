"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AuthPageShell from "../../../components/AuthPageShell";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [focused, setFocused] = useState<"email" | "password" | null>(null);

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
        <AuthPageShell
            heading="Masuk ke akun"
            lead="Akses semua fitur pelaporan dengan akun kamu"
            actionCaption="Belum punya akun?"
            actionLabel="Daftar"
            actionHref="/Register"
            formSide="left"
        >
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6"
            >
                {error && (
                    <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className={`block text-sm font-semibold mb-2 ${focused === "email" ? "text-red-500" : "text-slate-700"}`}>
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="nama@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            required
                            autoComplete="email"
                            className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition duration-150 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 ${focused === "email" ? "border-red-300" : "border-slate-200"}`}
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-semibold mb-2 ${focused === "password" ? "text-red-500" : "text-slate-700"}`}>
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocused("password")}
                                onBlur={() => setFocused(null)}
                                required
                                autoComplete="current-password"
                                className={`w-full rounded-3xl border px-4 py-3 pr-12 text-sm text-slate-900 placeholder:text-slate-400 transition duration-150 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 ${focused === "password" ? "border-red-300" : "border-slate-200"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
                            >
                                {showPass ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full rounded-3xl py-3 text-sm font-semibold text-white transition ${loading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:shadow-lg hover:shadow-red-300/40"}`}
                    >
                        {loading ? "Memproses..." : "Masuk ke Akun"}
                    </button>
                </form>
            </motion.div>
        </AuthPageShell>
    );
}
