"use client";

import { useRef, useEffect, useState } from "react";
import { staggerClass } from "@/lib/stagger";
import { cn } from "@/lib/utils";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const num = parseInt(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9.,]/g, "");
    const duration = 1600;
    const step = (ts: number, start: number) => {
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * num).toLocaleString() + suffix);
      if (p < 1) requestAnimationFrame((t) => step(t, start));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [started, value]);

  return <span ref={ref}>{display}</span>;
}

const stats = [
  { value: "12400+", label: "Laporan Masuk" },
  { value: "9800+", label: "Laporan Diselesaikan" },
  { value: "340+", label: "Instansi Terhubung" },
  { value: "78%", label: "Tingkat Penyelesaian" },
];

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [itemsVisible, setItemsVisible] = useState<boolean[]>(Array(stats.length).fill(false));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    stats.forEach((_, i) => {
      setTimeout(() => {
        setItemsVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 100);
    });
  }, [inView]);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="bg-white border-t border-b border-black/[0.06] py-14 px-6"
    >
      <div className="max-w-[960px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={cn(
                "bg-[#FAFAFA] border border-black/[0.06] rounded-2xl py-7 px-5 text-center",
                "transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform]",
                staggerClass(i),
                itemsVisible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              <div className="font-sans font-extrabold tracking-[-0.02em] bg-gradient-to-br from-[#E8201A] to-[#FF6B35] bg-clip-text text-transparent leading-[1.1] text-[clamp(1.6rem,3.5vw,2.4rem)]">
                {inView ? <Counter value={s.value} /> : "0"}
              </div>
              <div className="text-[rgba(30,30,30,0.45)] text-[0.78rem] mt-1.5 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
