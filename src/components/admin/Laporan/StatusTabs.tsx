"use client";

import type { AdminLaporanStatus } from "./types";
import { cn } from "@/lib/utils";

export type TabValue = AdminLaporanStatus | "all";

interface Props {
  active: TabValue;
  onChange: (v: TabValue) => void;
  counts: Record<TabValue, number>;
}

const TABS: { value: TabValue; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "on_progress", label: "Progress" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
];

export default function StatusTabs({ active, onChange, counts }: Props) {
  return (
    <div className="flex gap-1 bg-white border-[0.5px] border-[#f0e6dc] rounded-xl p-1 mb-4 overflow-x-auto scrollbar-none">
      {TABS.map((t) => {
        const isActive = active === t.value;
        const count = counts[t.value] ?? 0;
        return (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={cn(
              "inline-flex items-center gap-[7px] py-2 px-3.5 border-none rounded-lg cursor-pointer text-[0.78rem] transition-all duration-200 whitespace-nowrap font-[inherit]",
              isActive
                ? "bg-gradient-to-br from-[#FF6B35] to-[#E8541C] font-bold text-white shadow-[0_4px_12px_rgba(255,107,53,0.25)]"
                : "bg-transparent font-medium text-[#6b5546] hover:bg-[#fafaf8]"
            )}
          >
            {t.label}
            <span
              className={cn(
                "text-[0.62rem] font-bold py-px px-[7px] rounded-full min-w-[18px] text-center",
                isActive ? "bg-white/25 text-white" : "bg-[#f5ede3] text-[#a8856b]"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
