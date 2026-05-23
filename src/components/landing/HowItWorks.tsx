"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const StepIcons = [
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>,
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 14 20 9 15 4" />
    <path d="M4 20v-7a4 4 0 014-4h12" />
  </svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <path d="M9 10h6" />
    <path d="M9 14h4" />
  </svg>,
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>,
];

const steps = [
  { title: "Tulis Laporan", desc: "Laporkan keluhan atau aspirasi Anda dengan jelas dan lengkap" },
  { title: "Proses Verifikasi", desc: "Dalam 3 hari, laporan Anda diverifikasi dan diteruskan kepada instansi berwenang" },
  { title: "Proses Tindak Lanjut", desc: "Dalam 5 hari, instansi akan menindaklanjuti dan membalas laporan Anda" },
  { title: "Beri Tanggapan", desc: "Anda dapat menanggapi kembali balasan yang diberikan instansi dalam waktu 10 hari" },
  { title: "Selesai", desc: "Laporan Anda akan terus ditindaklanjuti hingga terselesaikan" },
];

const STEP_DELAYS = ["[transition-delay:150ms]", "[transition-delay:270ms]", "[transition-delay:390ms]", "[transition-delay:510ms]", "[transition-delay:630ms]"];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="bg-white py-[80px] px-6 pb-[72px]">
      <div className="max-w-[1080px] mx-auto">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-[600ms]",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          <h2 className="font-sans font-extrabold text-[#111] tracking-[-0.03em] mb-3 text-[clamp(1.8rem,4vw,2.75rem)]">
            Cara Kerja LaporGas
          </h2>
          <p className="text-black/45 text-[1rem] max-w-[420px] mx-auto m-0">
            Pengaduan Anda diproses secara transparan dan terukur
          </p>
        </div>

        <div ref={ref} className="relative">
          <div className="hidden md:block absolute top-9 left-[10%] right-[10%] h-[1.5px] bg-black/[0.08] z-0" />

          <div
            className={cn(
              "hidden md:block absolute top-9 left-[10%] right-[10%] h-[1.5px] z-[1] origin-left transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-300 bg-gradient-to-r from-[#E8201A] via-[#FF6B35] to-[#FFB800]",
              inView ? "scale-x-100" : "scale-x-0"
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-3 relative z-[2]">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "text-center px-2 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  STEP_DELAYS[i],
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                <div
                  className={cn(
                    "w-[72px] h-[72px] rounded-full mx-auto mb-5 flex items-center justify-center transition-all duration-300",
                    i === 0
                      ? "bg-gradient-to-br from-[#E8201A] to-[#FF4D4D] text-white shadow-[0_8px_24px_rgba(232,32,26,0.25)]"
                      : "bg-[#F3F3F3] border-[1.5px] border-black/[0.08] text-[#555]"
                  )}
                >
                  {StepIcons[i]}
                </div>
                <div className="font-bold text-[0.9rem] text-[#111] mb-[10px] leading-[1.3]">{step.title}</div>
                <div className="text-[0.78rem] text-black/45 leading-[1.65]">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "text-center mt-[52px] transition-all duration-500 [transition-delay:1000ms]",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        />
      </div>
    </section>
  );
}
