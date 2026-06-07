"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, User, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import { verifyIdentity, resetPasswordByName } from "@/lib/auth-api"

type Step = "identity" | "reset" | "success"

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [step, setStep] = useState<Step>("identity")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Step 1 — verifikasi email + nama
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim() || !name.trim()) return
        setLoading(true)
        setError("")
        try {
            const res = await verifyIdentity(email, name)
            if (res.verified) {
                setStep("reset")
            } else {
                setError(res.message ?? "Email dan nama tidak cocok.")
            }
        } catch {
            setError("Terjadi kesalahan. Coba lagi.")
        } finally {
            setLoading(false)
        }
    }

    // Step 2 — reset password
    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password.length < 6) { setError("Password minimal 6 karakter."); return }
        if (password !== confirm) { setError("Konfirmasi password tidak cocok."); return }
        setLoading(true)
        setError("")
        try {
            const res = await resetPasswordByName(email, name, password)
            if (res.message?.includes("berhasil")) {
                setStep("success")
                setTimeout(() => router.push("/auth/login"), 2000)
            } else {
                setError(res.message ?? "Gagal mengubah password.")
            }
        } catch {
            setError("Terjadi kesalahan. Coba lagi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#FFFCFA] flex items-center justify-center px-4">
            <div className="w-full max-w-[400px]">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-[1.6rem] font-extrabold text-[#1a0e08] tracking-[-0.03em]">
                        Lapor<span className="text-[#E8541C]">Gas</span>
                    </h1>
                </div>

                <div className="bg-white border border-[#f0e6dc] rounded-2xl p-8 shadow-[0_4px_24px_rgba(232,84,28,0.06)]">

                    {/* ── STEP 1: Verifikasi Identitas ── */}
                    {step === "identity" && (
                        <>
                            <div className="mb-6">
                                <Link
                                    href="/auth/login"
                                    className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#a8856b] no-underline hover:text-[#E8541C] transition-colors mb-5"
                                >
                                    <ArrowLeft size={13} strokeWidth={2} /> Kembali ke Login
                                </Link>
                                <h2 className="text-[1.2rem] font-extrabold text-[#1a0e08] tracking-[-0.02em] mb-1">
                                    Lupa kata sandi?
                                </h2>
                                <p className="text-[0.82rem] text-[#a8856b]">
                                    Masukkan email dan nama lengkap yang terdaftar.
                                </p>
                            </div>

                            <form onSubmit={handleVerify} className="flex flex-col gap-4">
                                <div>
                                    <label className="text-[0.72rem] font-bold text-[#3d2817] uppercase tracking-wide mb-1.5 block">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8856b]" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); setError("") }}
                                            placeholder="email@kamu.com"
                                            required
                                            className="w-full h-11 border border-[#f0e6dc] rounded-xl pl-9 pr-4 text-[0.875rem] text-[#1a0e08] bg-white outline-none placeholder:text-[#c9a892] focus:border-[rgba(232,84,28,0.5)] focus:ring-2 focus:ring-[rgba(232,84,28,0.08)] transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[0.72rem] font-bold text-[#3d2817] uppercase tracking-wide mb-1.5 block">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8856b]" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => { setName(e.target.value); setError("") }}
                                            placeholder="Nama sesuai saat daftar"
                                            required
                                            className="w-full h-11 border border-[#f0e6dc] rounded-xl pl-9 pr-4 text-[0.875rem] text-[#1a0e08] bg-white outline-none placeholder:text-[#c9a892] focus:border-[rgba(232,84,28,0.5)] focus:ring-2 focus:ring-[rgba(232,84,28,0.08)] transition-all"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-[0.75rem] text-red-500">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || !email.trim() || !name.trim()}
                                    className="w-full h-11 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#E8541C] text-white font-bold text-[0.875rem] border-0 cursor-pointer transition-all hover:-translate-y-[1px] shadow-[0_4px_14px_rgba(232,84,28,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
                                >
                                    {loading
                                        ? <><Loader2 size={15} className="animate-spin" /> Memverifikasi...</>
                                        : "Verifikasi Identitas"}
                                </button>
                            </form>
                        </>
                    )}

                    {/* ── STEP 2: Input Password Baru ── */}
                    {step === "reset" && (
                        <>
                            <div className="mb-6">
                                <button
                                    onClick={() => { setStep("identity"); setError(""); setPassword(""); setConfirm("") }}
                                    className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#a8856b] hover:text-[#E8541C] transition-colors mb-5 bg-transparent border-0 cursor-pointer p-0"
                                >
                                    <ArrowLeft size={13} strokeWidth={2} /> Kembali
                                </button>
                                <h2 className="text-[1.2rem] font-extrabold text-[#1a0e08] tracking-[-0.02em] mb-1">
                                    Buat password baru
                                </h2>
                                <p className="text-[0.82rem] text-[#a8856b]">
                                    Untuk akun <span className="font-semibold text-[#1a0e08]">{email}</span>
                                </p>
                            </div>

                            <form onSubmit={handleReset} className="flex flex-col gap-4">
                                <div>
                                    <label className="text-[0.72rem] font-bold text-[#3d2817] uppercase tracking-wide mb-1.5 block">
                                        Password Baru
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPw ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); setError("") }}
                                            placeholder="Minimal 6 karakter"
                                            required
                                            className="w-full h-11 border border-[#f0e6dc] rounded-xl px-4 pr-10 text-[0.875rem] text-[#1a0e08] bg-white outline-none placeholder:text-[#c9a892] focus:border-[rgba(232,84,28,0.5)] focus:ring-2 focus:ring-[rgba(232,84,28,0.08)] transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPw(!showPw)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a8856b] hover:text-[#E8541C] transition-colors border-0 bg-transparent cursor-pointer p-0"
                                        >
                                            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[0.72rem] font-bold text-[#3d2817] uppercase tracking-wide mb-1.5 block">
                                        Konfirmasi Password
                                    </label>
                                    <input
                                        type={showPw ? "text" : "password"}
                                        value={confirm}
                                        onChange={(e) => { setConfirm(e.target.value); setError("") }}
                                        placeholder="Ulangi password baru"
                                        required
                                        className="w-full h-11 border border-[#f0e6dc] rounded-xl px-4 text-[0.875rem] text-[#1a0e08] bg-white outline-none placeholder:text-[#c9a892] focus:border-[rgba(232,84,28,0.5)] focus:ring-2 focus:ring-[rgba(232,84,28,0.08)] transition-all"
                                    />
                                </div>

                                {confirm && (
                                    <p className={`text-[0.72rem] font-semibold -mt-2 ${password === confirm ? "text-emerald-500" : "text-red-400"}`}>
                                        {password === confirm ? "✓ Password cocok" : "✗ Password tidak cocok"}
                                    </p>
                                )}

                                {error && <p className="text-[0.75rem] text-red-500">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={loading || !password || !confirm || password !== confirm}
                                    className="w-full h-11 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#E8541C] text-white font-bold text-[0.875rem] border-0 cursor-pointer transition-all hover:-translate-y-[1px] shadow-[0_4px_14px_rgba(232,84,28,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
                                >
                                    {loading
                                        ? <><Loader2 size={15} className="animate-spin" /> Menyimpan...</>
                                        : "Simpan Password Baru"}
                                </button>
                            </form>
                        </>
                    )}

                    {/* ── STEP 3: Sukses ── */}
                    {step === "success" && (
                        <div className="text-center py-2">
                            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={28} className="text-emerald-500" strokeWidth={1.8} />
                            </div>
                            <h2 className="text-[1.1rem] font-extrabold text-[#1a0e08] mb-2">
                                Password berhasil diubah!
                            </h2>
                            <p className="text-[0.82rem] text-[#a8856b]">
                                Mengalihkan ke halaman login...
                            </p>
                        </div>
                    )}
                </div>

                {/* Step indicator */}
                {step !== "success" && (
                    <div className="flex items-center justify-center gap-2 mt-5">
                        {(["identity", "reset"] as Step[]).map((s) => (
                            <div
                                key={s}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    step === s ? "w-6 bg-[#E8541C]" : "w-3 bg-[#f0e6dc]"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}