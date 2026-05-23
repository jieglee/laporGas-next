"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth-api";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

interface Props {
  defaultMode?: "login" | "register";
}

export default function AuthPageShell({ defaultMode = "login" }: Props) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const isReg = mode === "register";
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const switchTo = (m: "login" | "register") => {
    if (m === mode) return;
    setMode(m);
    setStatus(null);
  };

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      if (isReg) {
        if (registerPassword !== registerConfirm) {
          throw new Error("Konfirmasi kata sandi tidak cocok.");
        }
        const res = await registerUser({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        });

        setStatus({ type: "success", message: "Registrasi berhasil. Silakan login." });
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterConfirm("");
        setTimeout(() => switchTo("login"), 700);
      } else {
const res = await signIn("credentials", {
  email: loginEmail,
  password: loginPassword,
  redirect: false,
});

if (res?.error) {
  throw new Error("Email atau password salah.");
}

if (!res?.ok) {
  throw new Error("Login gagal.");
}

const sessionRes = await fetch("/api/auth/session");
const session = await sessionRes.json();

setStatus({
  type: "success",
  message: "Login berhasil.",
});

setLoginEmail("");
setLoginPassword("");

const role = session?.user?.role;

if (role === "admin" || role === "superadmin") {
  router.replace("/admin");
} else {
  router.replace("/user");
}

setStatus({ type: "success", message: "Login berhasil." });

setLoginEmail("");
setLoginPassword("");

if (res?.ok) {
   const sessionRes = await fetch("/api/auth/session");
   const session = await sessionRes.json();

   const role = session?.user?.role;

   if (role === "admin" || role === "superadmin") {
      router.replace("/admin");
   } else {
      router.replace("/user");
   }
}
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus({ type: "error", message: message || "Gagal mengirim data." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div
        className="relative w-full max-w-3xl h-[500px] overflow-hidden rounded-[1.125rem] border border-slate-200 bg-white shadow-lg"
      >
        <div
          className={cn(
            "absolute bottom-0 top-0 w-1/2 overflow-hidden transition-all duration-[560ms] ease-[cubic-bezier(.77,0,.18,1)]",
            isReg ? "left-1/2" : "left-0"
          )}
        >
          <div
            className={cn(
              "flex h-full w-[200%] transition-transform duration-[560ms] ease-[cubic-bezier(.77,0,.18,1)]",
              isReg ? "-translate-x-1/2" : "translate-x-0"
            )}
          >
            <div className="flex h-full w-1/2 shrink-0 items-center justify-start p-8">
              <div className="w-full max-w-65 space-y-4">
                <Tabs mode={mode} switchTo={switchTo} />
                <div className="space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-[.2em] text-red-600">Login</p>
                  <h2 className="text-sm font-semibold text-slate-900">Selamat datang kembali</h2>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Gunakan email dan kata sandi yang sudah terdaftar.
                  </p>
                </div>
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <Field
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="email@domain.com"
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
                  />
                  <Field
                    label="Kata Sandi"
                    type="password"
                    name="password"
                    placeholder="•••••••••"
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                  />
                  <div className="flex items-center justify-between gap-4 text-[10px] text-slate-500">
                    <label className="inline-flex cursor-pointer items-center gap-1.5">
                      <input type="checkbox" className="h-3 w-3 accent-red-600" />
                      Ingat saya
                    </label>
                    <span className="cursor-pointer font-medium text-red-600 hover:text-red-700">
                      Lupa kata sandi?
                    </span>
                  </div>
                  {status && (
                    <div className={`rounded-lg border px-3 py-2 text-[10px] ${status.type === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                      {status.message}
                    </div>
                  )}
                  <SubmitBtn label="Masuk" loading={loading && !isReg} />
                  <Note title="Aman dan mudah" body="Laporan tersimpan aman dalam sistem kami." />
                </form>
              </div>
            </div>

            {/* SLOT REGISTER */}
            <div className="flex h-full w-1/2 shrink-0 items-center justify-end p-8">
              <div className="w-full max-w-65 space-y-4">
                <Tabs mode={mode} switchTo={switchTo} />
                <div className="space-y-2 text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[.2em] text-red-600">Register</p>
                  <h2 className="text-sm font-semibold text-slate-900">Buat akun baru</h2>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Daftar untuk mengirim dan mengikuti laporan lebih mudah.
                  </p>
                </div>
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <Field
                    label="Nama Lengkap"
                    type="text"
                    name="name"
                    placeholder="Nama lengkap"
                    value={registerName}
                    onChange={(event) => setRegisterName(event.target.value)}
                  />
                  <Field
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="email@domain.com"
                    value={registerEmail}
                    onChange={(event) => setRegisterEmail(event.target.value)}
                  />
                  <Field
                    label="Kata Sandi"
                    type="password"
                    name="password"
                    placeholder="•••••••••"
                    value={registerPassword}
                    onChange={(event) => setRegisterPassword(event.target.value)}
                  />
                  <Field
                    label="Konfirmasi Kata Sandi"
                    type="password"
                    name="confirmPassword"
                    placeholder="Ulangi kata sandi"
                    value={registerConfirm}
                    onChange={(event) => setRegisterConfirm(event.target.value)}
                  />
                  {status && (
                    <div className={`rounded-lg border px-3 py-2 text-[10px] ${status.type === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                      {status.message}
                    </div>
                  )}
                  <SubmitBtn label="Daftar Sekarang" loading={loading && isReg} />
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* RED SLIDING PANEL */}
        <div
          className={cn(
            "absolute bottom-0 top-0 z-20 flex w-1/2 flex-col justify-between overflow-hidden bg-red-700 p-10 text-white transition-all duration-[560ms] ease-[cubic-bezier(.77,0,.18,1)]",
            isReg ? "left-0" : "left-1/2"
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_28px,rgba(255,255,255,0.03)_28px,rgba(255,255,255,0.03)_56px)]" />
          <div className="relative z-10">
            <p className="mb-6 text-[9px] font-bold uppercase tracking-[.22em] text-red-200/40">
              Lapor.id
            </p>
            <h2 className="mb-2 text-lg font-medium leading-snug">
              {isReg ? "Sudah punya akun?" : "Belum punya akun?"}
            </h2>
            <p className="max-w-45 text-[11px] leading-7 text-red-100/60">
              {isReg
                ? "Masuk dan lanjutkan memantau laporan yang kamu kirim."
                : "Daftar sekarang dan mulai kirim laporan dengan mudah dan aman."}
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-2">
            <p className="text-[10px] text-red-200/40">
              {isReg ? "Sudah terdaftar?" : "Belum terdaftar?"}
            </p>
            <button
              onClick={() => switchTo(isReg ? "login" : "register")}
              className="w-fit rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-[11px] font-medium text-white transition hover:bg-white/20"
            >
              {isReg ? "Masuk ?" : "Daftar ?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tabs({ mode, switchTo }: { mode: "login" | "register"; switchTo: (m: "login" | "register") => void }) {
  return (
    <div className="mb-4 flex gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1">
      {(["login", "register"] as const).map((m) => (
        <button
          key={m}
          onClick={() => switchTo(m)}
          className={`flex-1 rounded-md py-1.5 text-center text-[11px] font-medium transition ${
            mode === m ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {m === "login" ? "Masuk" : "Daftar"}
        </button>
      ))}
    </div>
  );
}

function Field({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-medium text-slate-500">{label}</label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-900 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
      />
    </div>
  );
}

function SubmitBtn({ label, loading }: { label: string; loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full rounded-lg py-2 text-[11px] font-semibold text-white transition active:scale-[.99] ${loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
    >
      {loading ? "Memproses..." : label}
    </button>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
      <p className="text-[10px] font-medium text-slate-800">{title}</p>
      <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500">{body}</p>
    </div>
  );
}