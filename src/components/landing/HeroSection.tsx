"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getReports } from "@/lib/reports";

export default function HeroSection() {
  const [stats, setStats] = useState({ total: 0, rate: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const reports = await getReports();
        const total = reports.length;
        const completed = reports.filter((r) => r.status === "completed").length;
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
        setStats({ total, rate });
      } catch { }
    }
    fetchStats();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FFFCFA] font-sans px-8 md:px-16">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none bg-[length:64px_64px] [background-image:linear-gradient(rgba(255,107,53,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.035)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_75%)]" />

      {/* Glow kiri */}
      <div className="absolute pointer-events-none left-0 top-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,107,53,0.1)_0%,transparent_70%)] -translate-x-1/2" />
      {/* Glow kanan */}
      <div className="absolute pointer-events-none right-0 top-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(232,84,28,0.08)_0%,transparent_70%)] translate-x-1/3" />

      {/* Floating dots */}
      <div className="absolute rounded-full top-[20%] left-[8%] w-2 h-2 bg-[#FF6B35] opacity-40 animate-float-y" />
      <div className="absolute rounded-full top-[35%] left-[42%] w-[5px] h-[5px] bg-[#E8541C] opacity-30 animate-float-xy [animation-duration:11s]" />
      <div className="absolute rounded-full bottom-[28%] left-[15%] w-[6px] h-[6px] bg-[#FF8C42] opacity-35 animate-float-y-rev" />
      <div className="absolute rounded-full top-[25%] right-[8%] w-[5px] h-[5px] border border-[#FF6B35] opacity-40 animate-float-xy-rev" />

      <div className="relative w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">

        {/* ── KIRI ── */}
        <div className="flex flex-col gap-6 animate-fade-slide-up-hero">

          {/* Heading */}
          <h1 className="font-extrabold leading-[1.05] tracking-[-0.04em] text-[#140804] m-0 text-[clamp(2.4rem,5vw,3.8rem)]">
            Suara warga,{" "}
            <span className="bg-gradient-to-br from-[#FF6B35] via-[#E8541C] to-[#C0392B] bg-clip-text text-transparent italic font-extrabold">
              didengar
            </span>
            <br />
            seketika.
          </h1>

          {/* Subtitle */}
          <p className="text-[0.95rem] leading-[1.75] text-[#6b5546] max-w-[440px] m-0">
            Platform integrasi layanan publik untuk menyampaikan aspirasi dan pengaduan secara langsung ke instansi terkait dengan pelacakan{" "}
            <strong className="text-[#140804] font-semibold">real-time.</strong>
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap mt-2">
            <Link
              href="/user/buat-laporan"
              className="inline-flex items-center gap-3 py-[14px] pl-7 pr-5 text-white text-[0.875rem] font-semibold rounded-full no-underline transition-all duration-[250ms] hover:-translate-y-[2px] bg-gradient-to-br from-[#FF6B35] to-[#E8201A] shadow-[0_8px_24px_rgba(255,107,53,0.3)] hover:shadow-[0_12px_32px_rgba(255,107,53,0.45)]"
            >
              Mulai melapor
              <span className="w-7 h-7 rounded-full bg-white/20 inline-flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                  <path d="M1 5h7M5.5 1.5L9 5l-3.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            <Link
              href="#stats"
              className="inline-flex items-center gap-2 text-[0.875rem] text-[#8a6a52] font-medium no-underline pb-[2px] border-b border-[rgba(232,84,28,0.3)] transition-all duration-200 hover:text-[#E8541C] hover:border-[#E8541C]"
            >
              Lihat statistik →
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 mt-1">
            <div className="flex -space-x-2">
              {["#FF6B35", "#E8541C", "#C0392B"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[0.6rem] font-bold"
                  style={{ backgroundColor: color, zIndex: 3 - i }}
                >
                  {["A", "B", "C"][i]}
                </div>
              ))}
            </div>
            <p className="text-[0.78rem] text-[#a8856b] m-0">
              <strong className="text-[#1a0e08] font-semibold">{stats.total.toLocaleString()}+</strong> laporan telah masuk
            </p>
          </div>
        </div>

        {/* ── KANAN ── */}
        <div className="relative flex items-center justify-center">
          {/* Foto floating */}
          <div
            className="relative w-full max-w-[460px] rounded-[24px] overflow-hidden shadow-[0_32px_80px_rgba(232,84,28,0.15),0_8px_24px_rgba(0,0,0,0.08)]"
            style={{ animation: "heroFloat 6s ease-in-out infinite" }}
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,14,8,0.3)] to-transparent z-[1] pointer-events-none" />

            <img
              src="assets/images/indonesia-street.jpg"
              alt="Kota Indonesia"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />

            {/* Label di atas foto */}
            <div className="absolute top-4 left-4 z-[2]">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(232,84,28,0.15)] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[0.65rem] font-semibold text-[#1a0e08]">Live · Depok & sekitar</span>
              </div>
            </div>
          </div>

          {/* Floating stat card kanan bawah */}
          <div
            className="absolute -bottom-4 -right-4 bg-white border border-[#f0e6dc] rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(232,84,28,0.12)] z-10 min-w-[140px]"
            style={{ animation: "heroFloat 6s ease-in-out infinite 1.5s" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#E8201A] flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-[0.65rem] text-[#a8856b] font-medium">Diselesaikan</span>
            </div>
            <p className="text-[1.6rem] font-extrabold text-transparent bg-gradient-to-br from-[#FF6B35] to-[#E8201A] bg-clip-text leading-none m-0">
              {stats.rate}%
            </p>
            <p className="text-[0.65rem] text-[#a8856b] m-0 mt-1">Tingkat penyelesaian</p>
          </div>

          {/* Floating stat card kiri atas */}
          <div
            className="absolute -top-4 -left-4 bg-white border border-[#f0e6dc] rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(232,84,28,0.1)] z-10"
            style={{ animation: "heroFloat 6s ease-in-out infinite 3s" }}
          >
            <p className="text-[0.62rem] text-[#a8856b] font-medium m-0 mb-1">Laporan aktif</p>
            <p className="text-[1.1rem] font-extrabold text-[#1a0e08] leading-none m-0">
              {stats.total}
              <span className="text-[#E8541C]">+</span>
            </p>
          </div>
        </div>

      </div>

      {/* CSS untuk float animation */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  );
}