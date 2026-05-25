"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth-api";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
  defaultMode?: "login" | "register";
}

const LaporGasIcon = ({ size = 28, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path fill="currentColor" fillRule="evenodd" d="M16.84 19.16a16.5 16.5 0 0 0-2.175.949c-.18.11-.36.24-.539.369a2 2 0 0 1-.12-.14a9.4 9.4 0 0 0-1.527-1.217a.34.34 0 1 0-.449.509c.37.469.669.998.998 1.497l.09.14l-.09.08a15 15 0 0 0-1.527 1.815a.38.38 0 0 0 0 .55a.38.38 0 0 0 .54 0c.319-.3.648-.57.997-.839c.35-.27.54-.4.809-.589l.09.11c.399.489.808.948 1.197 1.427a.385.385 0 0 0 .637.017a.39.39 0 0 0 .012-.426c-.26-.569-.52-1.148-.839-1.717l-.11-.16l.24-.169c.659-.519 1.287-1.068 1.996-1.567a.34.34 0 0 0 .15-.459a.34.34 0 0 0-.38-.18m6.697-5.548a.341.341 0 1 0-.31-.609q-1.125.417-2.175.998a7 7 0 0 0-.549.37a.8.8 0 0 0-.12-.14a9 9 0 0 0-1.527-1.238a.34.34 0 0 0-.479 0a.327.327 0 0 0 0 .48c.38.478.679.997.998 1.506l.1.14l-.1.08a14 14 0 0 0-1.457 1.786a.38.38 0 0 0 0 .549a.39.39 0 0 0 .55 0c.318-.3.638-.569.997-.838c.36-.27.539-.4.808-.6l.09.12c.4.49.819.999 1.198 1.428a.39.39 0 0 0 .529.12a.4.4 0 0 0 .13-.53c-.27-.568-.53-1.147-.849-1.716c0 0-.07-.1-.1-.16l.23-.17c.659-.528 1.297-1.077 2.036-1.576m-5.2-1.178a.67.67 0 0 0 .34-.26c.09-.109.22-.418.26-.468s.149-.32.209-.49q.173-.49.29-.997l.139-.22c.1-.366.1-.752 0-1.117c-.12-.64-.42-1.437-.48-1.737c-.179-.659-.308-1.337-.478-1.996c-.11-.449-.23-.888-.36-1.337A49 49 0 0 0 17.26.469a.35.35 0 0 0-.42-.25a.44.44 0 0 0-.2.15a.3.3 0 0 0-.069-.22a.36.36 0 0 0-.529-.06c-.599.43-1.207.849-1.826 1.248c-.858.569-1.766 1.088-2.645 1.627c-.588.359-1.167.748-1.756 1.107q-.973.604-1.876 1.308a.83.83 0 0 0-.31.698L7.09 7.225q-.128.28-.2.579a.69.69 0 0 0 .11.599c.235.232.513.415.819.538a9.4 9.4 0 0 0 1.796.37a.38.38 0 0 0 .51-.31a.39.39 0 0 0-.25-.479c-.3-.12-.689-.309-1.088-.509c-.669-.319-.529-.12-.4-1.377l.45.09c.38.1.758.21 1.138.34c.379.129.998.379 1.546.578a6 6 0 0 1-.469 1.557a14.5 14.5 0 0 1-1.277 2.245c-.509.819-1.098 1.627-1.707 2.445q-.876 1.203-1.876 2.306a14 14 0 0 1-2.994 2.564a.33.33 0 0 0-.29.34a.33.33 0 0 0 .35.33a19 19 0 0 0 2.824-.14A9.3 9.3 0 0 0 8 18.9a10.2 10.2 0 0 0 2.395-1.227a11.5 11.5 0 0 0 1.996-1.797a20.4 20.4 0 0 0 3.692-6.666l1.996.868l.33.12c-1.268 1.447-.13 1.207-1.388.808a.39.39 0 0 0-.529.16a.4.4 0 0 0 .16.519q.466.406.998.718a1 1 0 0 0 .688.03m-2.754-4.27a.38.38 0 0 0-.499.219a.39.39 0 0 0 .23.499A22.6 22.6 0 0 1 12.2 14.06a14.7 14.7 0 0 1-2.615 2.545c-.64.489-1.332.904-2.065 1.237q-.795.36-1.647.55c-.32.079-.639.089-.998.139a15.4 15.4 0 0 0 2.814-2.235a18 18 0 0 0 1.996-2.455q.579-.867 1.068-1.787c.451-.8.832-1.638 1.138-2.505a7 7 0 0 0 .389-1.846a.37.37 0 0 0-.19-.34a.29.29 0 0 0-.1-.239a32 32 0 0 0-1.636-.838a9 9 0 0 0-.998-.43c.509-.299 1.097-.598 1.207-.668c.998-.688 2.086-1.377 3.084-2.116A42 42 0 0 0 16.571.708a.4.4 0 0 0 .1-.18a.3.3 0 0 0 0 .13c.33 1.587.509 3.184.778 4.78c.12.69.28 1.368.44 2.046l.448 1.517zM2.56 5.369c1.996.589 2.994-.46 2.994-1.926a1.996 1.996 0 0 0-1.667-2.096a3.05 3.05 0 0 0-2.395 1.377a1.7 1.7 0 0 0 .09 1.996c.255.307.595.533.978.649m.16-2.166c.303-.33.72-.533 1.167-.569c.42 0 .619.44.659.859c.16 1.387-.899 1.357-1.537 1.127a1.16 1.16 0 0 1-.61-.459c-.189-.359.05-.688.32-.958m1.926 7.734A1.996 1.996 0 0 0 3.01 8.842a3 3 0 0 0-2.455 1.367a1.7 1.7 0 0 0 .1 1.996c.264.298.612.51.997.609c1.986.638 2.974-.41 2.994-1.877m-3.153.719c-.22-.36 0-.689.29-.998c.303-.33.72-.537 1.167-.579c.419 0 .619.44.658.868c.21 1.837-1.736 1.358-2.115.709" clipRule="evenodd" />
  </svg>
);

export default function AuthPageShell({ defaultMode = "login" }: Props) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const isReg = mode === "register";
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const switchTo = (m: "login" | "register") => {
    if (m === mode) return;
    setMode(m);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (isReg) {
        if (registerPassword !== registerConfirm) {
          toast.error("Konfirmasi kata sandi tidak cocok.");
          return;
        }
        await registerUser({ name: registerName, email: registerEmail, password: registerPassword });
        toast.success("Registrasi berhasil! Silakan login.");
        setRegisterName(""); setRegisterEmail(""); setRegisterPassword(""); setRegisterConfirm("");
        setTimeout(() => switchTo("login"), 700);
      } else {
        const res = await signIn("credentials", { email: loginEmail, password: loginPassword, redirect: false });
        if (!res?.ok || res?.error) { toast.error("Email atau password salah."); return; }
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        const role = session?.user?.role;
        toast.success("Login berhasil!");
        setLoginEmail(""); setLoginPassword("");
        if (role === "admin" || role === "superadmin") router.replace("/admin");
        else router.replace("/user");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mengirim data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFCFA] p-4">
      <div
        className="relative w-full max-w-3xl h-[500px] overflow-hidden rounded-[1.125rem] border border-[#f0e6dc] bg-white shadow-lg"
      >
        {/* Form wrapper */}
        <div
          className="absolute bottom-0 top-0 w-1/2 overflow-hidden transition-all duration-[560ms] ease-[cubic-bezier(.77,0,.18,1)]"
          style={{ left: isReg ? "50%" : "0%" }}
        >
          <div
            className="flex h-full w-[200%] transition-transform duration-[560ms] ease-[cubic-bezier(.77,0,.18,1)]"
            style={{ transform: isReg ? "translateX(-50%)" : "translateX(0)" }}
          >
            {/* SLOT LOGIN */}
            <div className="flex h-full w-1/2 shrink-0 items-center justify-start p-8 translate-x-6">
              <div className="w-full max-w-65 space-y-4">
                <Tabs mode={mode} switchTo={switchTo} />
                <div className="space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#E8541C]">Login</p>
                  <h2 className="text-sm font-semibold text-[#1a0e08]">Selamat datang kembali</h2>
                  <p className="text-[11px] leading-relaxed text-[#a8856b]">
                    Gunakan email dan kata sandi yang sudah terdaftar.
                  </p>
                </div>
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <Field label="Email" type="email" name="email" placeholder="email@domain.com"
                         value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                  <Field label="Kata Sandi" type="password" name="password" placeholder="••••••••"
                         value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                  <div className="flex items-center justify-between gap-4 text-[10px] text-[#a8856b]">
                    <label className="inline-flex cursor-pointer items-center gap-1.5">
                      <input type="checkbox" className="h-3 w-3 accent-[#E8541C]" />
                      Ingat saya
                    </label>
                    <span className="cursor-pointer font-medium text-[#E8541C] hover:opacity-70">Lupa kata sandi?</span>
                  </div>
                  <SubmitBtn label="Masuk" loading={loading && !isReg} />
                  <Note title="Aman dan mudah" body="Laporan tersimpan aman dalam sistem kami." />
                </form>
              </div>
            </div>

            {/* SLOT REGISTER */}
            <div className="flex h-full w-1/2 shrink-0 items-center justify-end p-8 -translate-x-6">
              <div className="w-full max-w-65 space-y-4">
                <Tabs mode={mode} switchTo={switchTo} />
                <div className="space-y-2 text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#E8541C]">Register</p>
                  <h2 className="text-sm font-semibold text-[#1a0e08]">Buat akun baru</h2>
                  <p className="text-[11px] leading-relaxed text-[#a8856b]">
                    Daftar untuk mengirim dan mengikuti laporan lebih mudah.
                  </p>
                </div>
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <Field label="Nama Lengkap" type="text" name="name" placeholder="Nama lengkap"
                         value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
                  <Field label="Email" type="email" name="email" placeholder="email@domain.com"
                         value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                  <Field label="Kata Sandi" type="password" name="password" placeholder="••••••••"
                         value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                  <Field label="Konfirmasi Kata Sandi" type="password" name="confirmPassword" placeholder="Ulangi kata sandi"
                         value={registerConfirm} onChange={(e) => setRegisterConfirm(e.target.value)} />
                  <SubmitBtn label="Daftar Sekarang" loading={loading && isReg} />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDING PANEL */}
        <div
          className="absolute bottom-0 top-0 z-20 flex w-1/2 flex-col justify-between overflow-hidden p-10 text-white transition-all duration-[560ms] ease-[cubic-bezier(.77,0,.18,1)]"
          style={{
            left: isReg ? "0%" : "50%",
            background: "linear-gradient(135deg, #FF6B35 0%, #E8541C 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0"
               style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 28px,rgba(255,255,255,.03) 28px,rgba(255,255,255,.03) 56px)" }} />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <LaporGasIcon size={26} className="text-white" />
            <span className="font-extrabold text-[1rem] tracking-[-0.02em]"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
              Lapor<span className="text-white/50">Gas</span>
            </span>
          </div>

          <div className="relative z-10">
            <h2 className="mb-2 text-lg font-medium leading-snug">
              {isReg ? "Sudah punya akun?" : "Belum punya akun?"}
            </h2>
            <p className="max-w-45 text-[11px] leading-7 text-white/60">
              {isReg
                ? "Masuk dan lanjutkan memantau laporan yang kamu kirim."
                : "Daftar sekarang dan mulai kirim laporan dengan mudah dan aman."}
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <p className="text-[10px] text-white/40">
              {isReg ? "Sudah terdaftar?" : "Belum terdaftar?"}
            </p>
            <button onClick={() => switchTo(isReg ? "login" : "register")}
                    className="w-fit rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-[11px] font-medium text-white transition hover:bg-white/20">
              {isReg ? "Masuk →" : "Daftar →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tabs({ mode, switchTo }: { mode: "login" | "register"; switchTo: (m: "login" | "register") => void }) {
  return (
    <div className="mb-4 flex gap-1 rounded-lg border border-[#f0e6dc] bg-[#fafaf8] p-1">
      {(["login", "register"] as const).map((m) => (
        <button key={m} onClick={() => switchTo(m)}
                className={`flex-1 rounded-md py-1.5 text-center text-[11px] font-medium transition ${
                  mode === m ? "bg-white text-[#E8541C] shadow-sm" : "text-[#a8856b] hover:text-[#1a0e08]"
                }`}>
          {m === "login" ? "Masuk" : "Daftar"}
        </button>
      ))}
    </div>
  );
}

function Field({ label, type, name, placeholder, value, onChange }: {
  label: string; type: string; name: string; placeholder: string;
  value?: string; onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-medium text-[#a8856b]">{label}</label>
      <input type={type} name={name} required placeholder={placeholder} value={value} onChange={onChange}
             className="w-full rounded-lg border border-[#f0e6dc] bg-[#fafaf8] px-3 py-1.5 text-[11px] text-[#1a0e08] outline-none transition focus:border-[#E8541C] focus:ring-2 focus:ring-[rgba(232,84,28,0.1)]" />
    </div>
  );
}

function SubmitBtn({ label, loading }: { label: string; loading?: boolean }) {
  return (
    <button type="submit" disabled={loading}
            className="w-full rounded-lg py-2 text-[11px] font-semibold text-white transition active:scale-[.99] disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #FF6B35, #E8541C)" }}>
      {loading ? "Memproses..." : label}
    </button>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-[#f0e6dc] bg-[#fafaf8] px-3 py-2">
      <p className="text-[10px] font-medium text-[#1a0e08]">{title}</p>
      <p className="mt-0.5 text-[10px] leading-relaxed text-[#a8856b]">{body}</p>
    </div>
  );
}