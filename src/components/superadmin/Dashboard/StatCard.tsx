"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

type Props = {
  label: string;
  value: string | number;
  growth?: number; // dalam %
  icon: LucideIcon;
  accent?: "red" | "neutral" | "amber" | "emerald";
};

const accentMap = {
  red: "bg-[#C0392B]/10 text-[#C0392B]",
  neutral: "bg-neutral-100 text-neutral-700",
  amber: "bg-amber-50 text-amber-700",
  emerald: "bg-emerald-50 text-emerald-700",
};

export default function StatCard({
  label,
  value,
  growth,
  icon: Icon,
  accent = "neutral",
}: Props) {
  const isPositive = (growth ?? 0) >= 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all hover:border-neutral-300 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentMap[accent]}`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        {typeof growth === "number" && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              isPositive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {isPositive ? "+" : ""}
            {growth}%
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="text-2xl font-semibold tracking-tight text-neutral-900">
          {typeof value === "number" ? value.toLocaleString("id-ID") : value}
        </div>
        <div className="mt-0.5 text-sm text-neutral-500">{label}</div>
      </div>

      {/* hover line bawah */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#C0392B] transition-all duration-500 group-hover:w-full" />
    </div>
  );
}