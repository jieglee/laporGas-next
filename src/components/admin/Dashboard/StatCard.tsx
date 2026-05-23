"use client";

import type { LucideIcon } from "lucide-react";
import { staggerClass } from "@/lib/stagger";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
  delta?: { value: string; positive?: boolean };
  highlight?: boolean;
  index?: number;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  highlight,
  index = 0,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-[14px] px-5 py-[18px] border-[0.5px] transition-all duration-200 hover:-translate-y-[2px]",
        "animate-fade-slide-up opacity-0",
        staggerClass(index),
        highlight
          ? "border-[rgba(255,107,53,0.2)] bg-gradient-to-br from-[#FFF5EE] to-[#FFEDE0]"
          : "border-[#f0e6dc] bg-white"
      )}
    >
      <div className="flex items-center justify-between mb-[14px]">
        <div
          className={cn(
            "w-9 h-9 rounded-[10px] flex items-center justify-center",
            highlight ? "bg-[rgba(255,107,53,0.15)] text-[#E8541C]" : "bg-[#fafaf8] text-[#8a6f5e]"
          )}
        >
          <Icon size={18} strokeWidth={1.8} />
        </div>
        {delta && (
          <span
            className={cn(
              "text-[0.65rem] font-bold px-2 py-[3px] rounded-full",
              delta.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            )}
          >
            {delta.positive ? "↑" : "↓"} {delta.value}
          </span>
        )}
      </div>

      <div className="font-sans text-[1.8rem] font-extrabold text-[#1a0e08] tracking-[-0.035em] leading-none mb-[6px]">
        {value}
      </div>
      <p className={cn("text-[0.75rem] font-medium m-0", highlight ? "text-[#8a4a1c]" : "text-[#a8856b]")}>
        {label}
      </p>
    </div>
  );
}
