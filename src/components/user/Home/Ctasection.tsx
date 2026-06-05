"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CTASection() {
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
      { rootMargin: "-50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-4 pb-16 md:px-8">
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[20px] flex justify-between items-center gap-8 flex-wrap px-12 py-[52px]",
          "bg-[#FFF5EE] border border-[rgba(232,84,28,0.15)]",
          "transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        )}
      >
        {/* Decorative circles — light version */}
        <div className="absolute pointer-events-none rounded-full w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(255,107,53,0.08)_0%,transparent_70%)] -top-[80px] right-10" />
        <div className="absolute pointer-events-none rounded-full w-[180px] h-[180px] bg-[radial-gradient(circle,rgba(232,84,28,0.06)_0%,transparent_70%)] -bottom-16 left-8" />

        <div className="flex-1 min-w-[240px] relative z-[1]">
          <div className="inline-flex items-center gap-[7px] bg-[rgba(232,84,28,0.08)] border-[0.5px] border-[rgba(232,84,28,0.2)] px-3 py-[5px] rounded-full mb-5">
            <span className="w-[5px] h-[5px] rounded-full bg-[#E8541C]" />
            <span className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#E8541C]">
              Mulai Sekarang
            </span>
          </div>

          <h2 className="font-sans font-extrabold text-[#1a0e08] tracking-[-0.035em] leading-[1.1] mb-[14px] text-[clamp(1.5rem,3vw,2rem)]">
            Masalahmu penting.
            <br />
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#E8541C] bg-clip-text text-transparent">
              Suaramu didengar.
            </span>
          </h2>

          <p className="text-[0.85rem] text-[#a8856b] leading-[1.7] max-w-[340px]">
            Satu laporan bisa mengubah kondisi ribuan orang di sekitarmu.
          </p>
        </div>

        <div className="flex flex-col items-end gap-[10px] relative z-[1]">
          <Link
            href={{ pathname: "/user/buat-laporan" }}
            className="inline-flex items-center gap-[10px] text-white font-bold text-[0.85rem] px-7 py-[14px] rounded-full no-underline whitespace-nowrap tracking-[0.01em] transition-all duration-[250ms] hover:-translate-y-[2px] bg-gradient-to-br from-[#FF6B35] to-[#E8541C] shadow-[0_8px_24px_rgba(255,107,53,0.25)] hover:shadow-[0_12px_32px_rgba(255,107,53,0.4)]"
          >
            Buat Laporan Sekarang
            <span className="w-[22px] h-[22px] rounded-full bg-white/20 inline-flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 5h7M5.5 1.5L9 5l-3.5 3.5"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
          <p className="text-[0.72rem] text-[#c9a892]">
            Gratis · Mudah · Berdampak
          </p>
        </div>
      </div>
    </section>
  );
}