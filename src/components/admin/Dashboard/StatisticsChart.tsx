"use client";

import { motion } from "framer-motion";
import { TrendingUp, PieChart as PieIcon } from "lucide-react";

export interface ChartData {
  perHari: { label: string; value: number }[];
  perStatus: { label: string; value: number; color: string }[];
}

function LineChart({ data }: { data: { label: string; value: number }[] }) {
  const w = 100, h = 36, padX = 2;
  const max = Math.max(...data.map((d) => d.value), 1);
  const step = (w - padX * 2) / (data.length - 1);
  const points = data.map((d, i) => ({ x: padX + i * step, y: h - (d.value / max) * (h - 6) - 3 }));

  const path = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  const areaPath = `${path} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h + 14}`} preserveAspectRatio="none" className="w-full block" style={{ height: 200 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} d={areaPath} fill="url(#lineGrad)" />
        <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          d={path} fill="none" stroke="#E8541C" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2 }} />
        {points.map((p, i) => (
          <motion.circle key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            cx={p.x} cy={p.y} r={1} fill="white" stroke="#E8541C" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2 }} />
        ))}
        {data.map((d, i) => (
          <text key={i} x={padX + i * step} y={h + 11} fontSize="3" fill="#a8856b" textAnchor="middle" style={{ fontFamily: "inherit" }}>
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const size = 160, strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  return (
    <div className="flex items-center gap-5 flex-wrap">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f5ede3" strokeWidth={strokeWidth} />
          {data.map((d, i) => {
            const length = circumference * (d.value / total);
            const offset = cumulativeOffset;
            cumulativeOffset += length;
            return (
              <motion.circle key={i} initial={{ strokeDasharray: `0 ${circumference}` }} animate={{ strokeDasharray: `${length} ${circumference}` }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={d.color}
                strokeWidth={strokeWidth} strokeDashoffset={-offset} strokeLinecap="butt" />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[1.6rem] font-extrabold text-[#1a0e08] tracking-[-0.03em] leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
            {total}
          </div>
          <div className="text-[0.62rem] text-[#a8856b] font-medium mt-1 uppercase tracking-[0.08em]">Total</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {data.map((d, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
            className="flex items-center gap-[10px]">
            <div className="w-[9px] h-[9px] rounded-[2.5px] shrink-0" style={{ background: d.color }} />
            <span className="text-[0.78rem] text-[#3d2817] flex-1">{d.label}</span>
            <span className="text-[0.78rem] font-bold text-[#1a0e08]">{d.value}</span>
            <span className="text-[0.65rem] text-[#a8856b] min-w-[36px] text-right">
              {Math.round((d.value / total) * 100)}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function StatisticsChart({ data }: { data: ChartData }) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      <div className="flex items-end justify-between mb-[14px]">
        <div>
          <h2 className="text-[1.15rem] font-extrabold text-[#1a0e08] tracking-[-0.025em] m-0 mb-[2px]" style={{ fontFamily: "'Syne', sans-serif" }}>
            Statistik Laporan
          </h2>
          <p className="text-[0.72rem] text-[#a8856b] m-0">Tren laporan dan distribusi status saat ini</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        {/* Line chart */}
        <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] px-[22px] py-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-[26px] h-[26px] rounded-[7px] bg-[rgba(255,107,53,0.08)] flex items-center justify-center text-[#E8541C]">
              <TrendingUp size={13} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h3 className="text-[0.85rem] font-bold text-[#1a0e08] m-0">Laporan masuk</h3>
              <p className="text-[0.65rem] text-[#a8856b] m-0">7 hari terakhir</p>
            </div>
            <span className="text-[0.62rem] font-bold px-2 py-[3px] rounded-full bg-[#ECFDF5] text-[#059669]">↑ 12%</span>
          </div>
          <LineChart data={data.perHari} />
        </div>

        {/* Donut chart */}
        <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] px-[22px] py-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-[26px] h-[26px] rounded-[7px] bg-[rgba(255,107,53,0.08)] flex items-center justify-center text-[#E8541C]">
              <PieIcon size={13} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-[0.85rem] font-bold text-[#1a0e08] m-0">Distribusi status</h3>
              <p className="text-[0.65rem] text-[#a8856b] m-0">Semua laporan</p>
            </div>
          </div>
          <DonutChart data={data.perStatus} />
        </div>
      </div>
    </motion.section>
  );
}