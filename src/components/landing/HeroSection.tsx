"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[100px] pb-[100px] bg-[#FFFCFA] font-sans"
    >
      <div
        className="absolute inset-0 pointer-events-none bg-[length:64px_64px] [background-image:linear-gradient(rgba(255,107,53,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.045)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      {[460, 700].map((size) => (
        <div
          key={size}
          className={[
            "absolute pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2",
            size === 460 ? "w-[460px] h-[460px] border border-[rgba(255,107,53,0.08)]" : "w-[700px] h-[700px] border border-[rgba(255,107,53,0.05)]",
          ].join(" ")}
        />
      ))}

      <div className="absolute pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(255,107,53,0.14)_0%,rgba(255,107,53,0.05)_35%,transparent_70%)]" />

      <div className="absolute pointer-events-none rounded-full blur-[20px] top-[20%] right-[8%] w-[360px] h-[360px] bg-[radial-gradient(circle,rgba(232,84,28,0.12)_0%,transparent_70%)]" />
      <div className="absolute pointer-events-none rounded-full blur-[20px] bottom-[12%] left-[6%] w-[320px] h-[320px] bg-[radial-gradient(circle,rgba(255,140,66,0.10)_0%,transparent_70%)]" />

      <div className="absolute rounded-full pointer-events-none top-[16%] left-[14%] w-[7px] h-[7px] bg-[#FF6B35] opacity-40 shadow-[0_0_12px_rgba(255,107,53,0.5)] animate-float-y" />
      <div className="absolute rounded-full pointer-events-none top-[28%] right-[16%] w-[5px] h-[5px] bg-[#E8541C] opacity-55 shadow-[0_0_8px_rgba(232,84,28,0.4)] animate-float-xy [animation-duration:11s]" />
      <div className="absolute rounded-full pointer-events-none bottom-[24%] left-[20%] w-[6px] h-[6px] bg-[#FF8C42] opacity-45 shadow-[0_0_10px_rgba(255,140,66,0.4)] animate-float-y-rev" />
      <div className="absolute rounded-full pointer-events-none bottom-[30%] right-[22%] w-[9px] h-[9px] border-[1.5px] border-[#FF6B35] bg-transparent opacity-55 animate-float-xy-rev" />
      <div className="absolute rounded-full pointer-events-none top-1/2 left-[8%] w-1 h-1 bg-[#FF6B35] opacity-40 animate-float-y [animation-duration:14s]" />
      <div className="absolute rounded-full pointer-events-none top-[60%] right-[10%] w-[3px] h-[3px] bg-[#E8541C] opacity-50 animate-float-xy [animation-duration:12s]" />

      <div className="relative text-center max-w-[800px] px-6 animate-fade-slide-up-hero">
        <h1 className="font-bold leading-none tracking-[-0.04em] text-[#140804] m-0 text-[clamp(2.8rem,8vw,5.5rem)]">
          Suara warga,
          <br />
          <span className="relative inline-block italic font-medium bg-gradient-to-br from-[#FF6B35] via-[#E8541C] to-[#C0392B] bg-clip-text text-transparent">
            didengar
            <span
              aria-hidden
              className="absolute rounded-full -z-10 blur-[2px] left-[4%] right-[4%] bottom-1 h-2 bg-gradient-to-r from-[rgba(255,107,53,0.15)] to-[rgba(232,84,28,0.1)]"
            />
          </span>{" "}
          seketika.
        </h1>

        <div className="flex items-center justify-center gap-[14px] my-10">
          <span className="h-px w-12 opacity-40 bg-gradient-to-r from-transparent to-[#FF6B35]" />
          <span className="w-[6px] h-[6px] rotate-45 bg-gradient-to-br from-[#FF6B35] to-[#E8541C]" />
          <span className="h-px w-12 opacity-40 bg-gradient-to-l from-transparent to-[#FF6B35]" />
        </div>

        <p className="text-[16px] font-normal leading-[1.75] text-[#6b5546] mx-auto max-w-[560px] m-0">
          Laporkan masalah di sekitarmu, pantau prosesnya, dan lihat hasilnya.{" "}
          <strong className="text-[#140804] font-semibold">Tanpa birokrasi, tanpa drama.</strong>
        </p>

        <div className="inline-flex items-center gap-7 mt-[52px] flex-wrap justify-center">
          <Link
            href="/auth/login"
            className="relative inline-flex items-center gap-[14px] py-4 pl-8 pr-[18px] text-white text-[14px] font-medium rounded-full no-underline transition-all duration-[250ms] hover:-translate-y-[2px] bg-gradient-to-br from-[#FF6B35] to-[#E8541C] shadow-[0_10px_30px_rgba(255,107,53,0.28),0_4px_10px_rgba(232,84,28,0.18),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_14px_36px_rgba(255,107,53,0.36),0_6px_14px_rgba(232,84,28,0.22),inset_0_1px_0_rgba(255,255,255,0.2)]"
          >
            Mulai melapor
            <span className="w-[30px] h-[30px] rounded-full bg-white/20 inline-flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 5h7M5.5 1.5L9 5l-3.5 3.5"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-[6px] text-[14px] text-[#8a6a52] font-medium no-underline pb-1 border-b border-[rgba(255,107,53,0.3)] transition-all duration-200 hover:text-[#E8541C] hover:border-[#E8541C]"
          >
            Cara kerja platform →
          </Link>
        </div>
      </div>
    </section>
  );
}
