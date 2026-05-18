"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { laporanTrend } from "@/lib/mock-superadmin";

type Range = "7H" | "30H" | "6B" | "1T";

export default function StatisticsChart() {
  const [range, setRange] = useState<Range>("6B");

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">
            Tren Laporan
          </h3>
          <p className="text-xs text-neutral-500">
            Perbandingan laporan masuk vs selesai
          </p>
        </div>

        <div className="flex rounded-lg border border-neutral-200 bg-neutral-50 p-0.5">
          {(["7H", "30H", "6B", "1T"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                range === r
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="h-70 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={laporanTrend}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="masukGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C0392B" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#C0392B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="selesaiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#171717" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#171717" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f5f5f5"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#a3a3a3"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#a3a3a3"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e5e5",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                fontSize: 12,
              }}
              cursor={{ stroke: "#e5e5e5", strokeWidth: 1 }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />
            <Area
              type="monotone"
              dataKey="masuk"
              name="Masuk"
              stroke="#C0392B"
              strokeWidth={2}
              fill="url(#masukGrad)"
            />
            <Area
              type="monotone"
              dataKey="selesai"
              name="Selesai"
              stroke="#171717"
              strokeWidth={2}
              fill="url(#selesaiGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}