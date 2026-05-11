"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AuthPageShell from "../../../components/AuthPageShell";

export default function RegisterPage () {
    const router = useRouter();
    const [form, setForm] = useState({ nama: "", email: "", password: "", konfirmasi: "" });
    const [showPass, setShowPass] = useState(false);
    const [showKonfirmasi, setShowKonfirmasi] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [focused, setFocused] = useState<"nama" | "email" | "password" | "konfirmasi" | null>(null);

    const update = (key: string, val: string) => setForm((prev) => ({ ...prev, [key]: val }));

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

    return (
        <AuthPageShell
            heading="Daftar akun baru"
            lead="Buat akun untuk mulai melapor dan pantau progres dengan lebih mudah"
            actionCaption="Sudah punya akun?"
            actionLabel="Masuk"
            actionHref="/Login"
            formSide="right"
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
                        <label className={`block text-sm font-semibold mb-2 ${focused === "nama" ? "text-red-500" : "text-slate-700"}`}>
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            placeholder="Nama kamu"
                            value={form.nama}
                            onChange={(e) => update("nama", e.target.value)}
                            onFocus={() => setFocused("nama")}
                            onBlur={() => setFocused(null)}
                            required
                            autoComplete="name"
                            className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition duration-150 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 ${focused === "nama" ? "border-red-300" : "border-slate-200"}`}
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-semibold mb-2 ${focused === "email" ? "text-red-500" : "text-slate-700"}`}>
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="nama@email.com"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
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
                                placeholder="Minimal 8 karakter"
                                value={form.password}
                                onChange={(e) => update("password", e.target.value)}
                                onFocus={() => setFocused("password")}
                                onBlur={() => setFocused(null)}
                                required
                                autoComplete="new-password"
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

                    <div>
                        <label className={`block text-sm font-semibold mb-2 ${focused === "konfirmasi" ? "text-red-500" : "text-slate-700"}`}>
                            Konfirmasi Password
                        </label>
                        <div className="relative">
                            <input
                                type={showKonfirmasi ? "text" : "password"}
                                placeholder="Ulangi password"
                                value={form.konfirmasi}
                                onChange={(e) => update("konfirmasi", e.target.value)}
                                onFocus={() => setFocused("konfirmasi")}
                                onBlur={() => setFocused(null)}
                                required
                                autoComplete="new-password"
                                className={`w-full rounded-3xl border px-4 py-3 pr-12 text-sm text-slate-900 placeholder:text-slate-400 transition duration-150 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 ${focused === "konfirmasi" ? "border-red-300" : "border-slate-200"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowKonfirmasi(!showKonfirmasi)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                aria-label={showKonfirmasi ? "Sembunyikan password" : "Tampilkan password"}
                            >
                                {showKonfirmasi ? (
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
                        className={`w-full rounded-3xl py-3 text-sm font-semibold text-white transition ${loading ? "bg-red-300 cursor-not-allowed" : "bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg hover:shadow-red-300/40"}`}
                    >
                        {loading ? "Memproses..." : "Buat Akun"}
                    </button>
                </form>
            </motion.div>
        </AuthPageShell>
    );
}
