"use client";

import { useRef, useEffect, useState } from "react";
import { staggerClass } from "@/lib/stagger";
import { cn } from "@/lib/utils";
import { getReports } from "@/lib/reports";

function Counter({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState("0");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        const num = parseInt(value.replace(/[^0-9]/g, ""));
        const suffix = value.replace(/[0-9.,]/g, "");
        const duration = 1800;
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

export default function StatsBar() {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    const [itemsVisible, setItemsVisible] = useState<boolean[]>([false, false, false, false]);
    const [stats, setStats] = useState([
        { value: "0", label: "Laporan Masuk" },
        { value: "0", label: "Diselesaikan" },
        { value: "0", label: "Sedang Diproses" },
        { value: "0%", label: "Tingkat Penyelesaian" },
    ]);

    useEffect(() => {
        async function fetchStats() {
            try {
                const reports = await getReports();
                const total = reports.length;
                const completed = reports.filter((r) => r.status === "completed").length;
                const onProgress = reports.filter((r) => r.status === "on_progress" || r.status === "approved").length;
                const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
                setStats([
                    { value: `${total}`, label: "Laporan Masuk" },
                    { value: `${completed}`, label: "Diselesaikan" },
                    { value: `${onProgress}`, label: "Sedang Diproses" },
                    { value: `${rate}%`, label: "Tingkat Penyelesaian" },
                ]);
            } catch {}
        }
        fetchStats();
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
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
            }, i * 120);
        });
    }, [inView]);

    return (
        <section
            id="stats"
            ref={sectionRef}
            className="py-14 px-6 bg-white border-t border-b border-[#f0e6dc]"
        >
            <div className="max-w-[960px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex flex-col items-center justify-center py-8 px-6 text-center",
                                "transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                i < 3 ? "border-r border-[#f0e6dc]" : "",
                                staggerClass(i),
                                itemsVisible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}
                        >
                            <div className="font-extrabold tracking-[-0.03em] leading-none text-[clamp(2rem,4vw,2.8rem)] bg-gradient-to-br from-[#FF6B35] to-[#E8201A] bg-clip-text text-transparent mb-2">
                                {inView ? <Counter value={s.value} /> : "0"}
                            </div>
                            <div className="text-[0.8rem] text-[#a8856b] font-medium">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}