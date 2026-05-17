"use client";

import { motion } from "framer-motion";
import { TrendingUp, PieChart as PieIcon } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ChartData {
  perHari: { label: string; value: number }[];           // line chart data
  perStatus: { label: string; value: number; color: string }[]; // donut chart data
}

// ── Line Chart (SVG manual, smooth curve) ──────────────────────────────────────

function LineChart({ data }: { data: { label: string; value: number }[] }) {
  const w = 100;
  const h = 36;
  const padX = 2;
  const max = Math.max(...data.map((d) => d.value), 1);
  const step = (w - padX * 2) / (data.length - 1);

  const points = data.map((d, i) => ({
    x: padX + i * step,
    y: h - (d.value / max) * (h - 6) - 3,
  }));

  // Build smooth path with bezier curves
  const path = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  // Area fill path (close back to bottom)
  const areaPath = `${path} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <div style={{ width: "100%" }}>
      <svg
        viewBox={`0 0 ${w} ${h + 14}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height: 200, display: "block" }}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          d={areaPath}
          fill="url(#lineGrad)"
        />

        {/* Line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          d={path}
          fill="none"
          stroke="#E8541C"
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ strokeWidth: 2 }}
        />

        {/* Dots on each point */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            cx={p.x}
            cy={p.y}
            r={1}
            fill="white"
            stroke="#E8541C"
            vectorEffect="non-scaling-stroke"
            style={{ strokeWidth: 2 }}
          />
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={padX + i * step}
            y={h + 11}
            fontSize="3"
            fill="#a8856b"
            textAnchor="middle"
            style={{ fontFamily: "inherit" }}
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ── Donut Chart ────────────────────────────────────────────────────────────────

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f5ede3"
            strokeWidth={strokeWidth}
          />

          {/* Segments */}
          {data.map((d, i) => {
            const percent = d.value / total;
            const length = circumference * percent;
            const offset = cumulativeOffset;
            cumulativeOffset += length;

            return (
              <motion.circle
                key={i}
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray: `${length} ${circumference}` }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={strokeWidth}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#1a0e08",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {total}
          </div>
          <div style={{ fontSize: "0.62rem", color: "#a8856b", fontWeight: 500, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Total
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 }}>
        {data.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: 2.5,
                background: d.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "0.78rem", color: "#3d2817", flex: 1 }}>{d.label}</span>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1a0e08" }}>{d.value}</span>
            <span style={{ fontSize: "0.65rem", color: "#a8856b", minWidth: 36, textAlign: "right" }}>
              {Math.round((d.value / total) * 100)}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

interface Props {
  data: ChartData;
}

export default function StatisticsChart({ data }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.15rem",
              fontWeight: 800,
              color: "#1a0e08",
              letterSpacing: "-0.025em",
              margin: 0,
              marginBottom: 2,
            }}
          >
            Statistik Laporan
          </h2>
          <p style={{ fontSize: "0.72rem", color: "#a8856b", margin: 0 }}>
            Tren laporan dan distribusi status saat ini
          </p>
        </div>
      </div>

      {/* 2-column charts */}
      <div className="charts-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
        {/* Line chart card */}
        <div
          style={{
            background: "white",
            border: "0.5px solid #f0e6dc",
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "rgba(255,107,53,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#E8541C",
              }}
            >
              <TrendingUp size={13} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a0e08", margin: 0 }}>
                Laporan masuk
              </h3>
              <p style={{ fontSize: "0.65rem", color: "#a8856b", margin: 0 }}>
                7 hari terakhir
              </p>
            </div>
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 99,
                background: "#ECFDF5",
                color: "#059669",
              }}
            >
              ↑ 12%
            </span>
          </div>
          <LineChart data={data.perHari} />
        </div>

        {/* Donut chart card */}
        <div
          style={{
            background: "white",
            border: "0.5px solid #f0e6dc",
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "rgba(255,107,53,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#E8541C",
              }}
            >
              <PieIcon size={13} strokeWidth={2} />
            </div>
            <div>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a0e08", margin: 0 }}>
                Distribusi status
              </h3>
              <p style={{ fontSize: "0.65rem", color: "#a8856b", margin: 0 }}>
                Semua laporan
              </p>
            </div>
          </div>
          <DonutChart data={data.perStatus} />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .charts-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.section>
  );
}