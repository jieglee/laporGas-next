"use client";

import { TrendingUp, PieChart as PieIcon } from "lucide-react";
import { staggerClass } from "@/lib/stagger";
import { cn } from "@/lib/utils";

export interface ChartData {
  perHari: { label: string; value: number }[];
  perStatus: { label: string; value: number; color: string }[];
}

function LineChart({ data }: { data: { label: string; value: number }[] }) {
  const w = 100,
    h = 36,
    padX = 2;
  const max = Math.max(...data.map((d) => d.value), 1);
  const step = (w - padX * 2) / (data.length - 1);
  const points = data.map((d, i) => ({
    x: padX + i * step,
    y: h - (d.value / max) * (h - 6) - 3,
  }));

  const path = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  const areaPath = `${path} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h + 14}`} preserveAspectRatio="none" className="w-full block h-[200px]">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path className="chart-area-path" d={areaPath} fill="url(#lineGrad)" />
        <path
          className="chart-line-path stroke-2"
          d={path}
          fill="none"
          stroke="#E8541C"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={1}
            fill="white"
            stroke="#E8541C"
            vectorEffect="non-scaling-stroke"
            className={cn("stroke-2 opacity-0 animate-[chart-fade-in_0.3s_ease_forwards]", staggerClass(i + 20))}
          />
        ))}

        {data.map((d, i) => (
          <text
            key={i}
            x={padX + i * step}
            y={h + 11}
            fontSize="3"
            fill="#a8856b"
            textAnchor="middle"
            className="font-[inherit]"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const size = 160,
    strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  return (
    <div className="flex items-center gap-5 flex-wrap">
      <div className="relative shrink-0 w-40 h-40">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f5ede3" strokeWidth={strokeWidth} />
          {data.map((d, i) => {
            const length = circumference * (d.value / total);
            const offset = cumulativeOffset;
            cumulativeOffset += length;
            return (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={strokeWidth}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                strokeDasharray={`${length} ${circumference}`}
                className={cn("chart-donut-segment", staggerClass(i + 8))}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-sans text-[1.6rem] font-extrabold text-[#1a0e08] tracking-[-0.03em] leading-none">
            {total}
          </div>
          <div className="text-[0.62rem] text-[#a8856b] font-medium mt-1 uppercase tracking-[0.08em]">Total</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {data.map((d, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-[10px] opacity-0 animate-fade-slide-left",
              staggerClass(i + 12)
            )}
          >
            <div className={cn("w-[9px] h-[9px] rounded-[2.5px] shrink-0", `bg-[${d.color}]`)} />
            <span className="text-[0.78rem] text-[#3d2817] flex-1">{d.label}</span>
            <span className="text-[0.78rem] font-bold text-[#1a0e08]">{d.value}</span>
            <span className="text-[0.65rem] text-[#a8856b] min-w-[36px] text-right">
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatisticsChart({ data }: { data: ChartData }) {
  return (
    <section className="animate-fade-slide-up opacity-0 [animation-delay:320ms]">
      <div className="flex items-end justify-between mb-[14px]">
        <div>
          <h2 className="font-sans text-[1.15rem] font-extrabold text-[#1a0e08] tracking-[-0.025em] m-0 mb-[2px]">
            Statistik Laporan
          </h2>
          <p className="text-[0.72rem] text-[#a8856b] m-0">Tren laporan dan distribusi status saat ini</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] px-[22px] py-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-[26px] h-[26px] rounded-[7px] bg-[rgba(255,107,53,0.08)] flex items-center justify-center text-[#E8541C]">
              <TrendingUp size={13} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h3 className="text-[0.85rem] font-bold text-[#1a0e08] m-0">Laporan masuk</h3>
              <p className="text-[0.65rem] text-[#a8856b] m-0">7 hari terakhir</p>
            </div>
            <span className="text-[0.62rem] font-bold px-2 py-[3px] rounded-full bg-emerald-50 text-emerald-600">
              ↑ 12%
            </span>
          </div>
          <LineChart data={data.perHari} />
        </div>

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
    </section>
  );
}
