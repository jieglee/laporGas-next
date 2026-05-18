"use client";

import { Shield } from "lucide-react";

export default function HeroSection() {
  const now = new Date();
  const hari = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-linear-to-br from-[#1a0606] via-[#3a0d0d] to-[#C0392B] p-6 md:p-8">
      {/* dekorasi grid halus */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm">
            <Shield className="h-6 w-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Super Admin Console
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Selamat datang kembali
            </h1>
            <p className="mt-1 text-sm text-white/70">{hari}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:justify-end">
          <Pill label="Sistem" value="Stabil" tone="green" />
          <Pill label="Uptime" value="99.97%" tone="white" />
          <Pill label="Versi" value="v1.4.2" tone="white" />
        </div>
      </div>
    </div>
  );
}

function Pill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "green" | "white";
}) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm">
      <div className="text-[10px] uppercase tracking-wider text-white/60">
        {label}
      </div>
      <div className="flex items-center gap-1.5 text-sm font-medium text-white">
        {tone === "green" && (
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        )}
        {value}
      </div>
    </div>
  );
}