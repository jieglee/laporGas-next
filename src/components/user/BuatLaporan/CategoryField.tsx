"use client";

import { Tag } from "lucide-react";
import Field from "./Field";
import { CATEGORIES } from "./types";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const KATEGORI_CFG: Record<string, {
  active: string;
  inactive: string;
  dot: string;
  activeDot: string;
  desc: string;
}> = {
  "1": {
    desc: "Jalan, jembatan, gedung",
    dot: "bg-blue-200",
    activeDot: "bg-blue-500",
    active: "bg-blue-50 border-blue-200 shadow-[0_0_0_3px_rgba(59,130,246,0.08)]",
    inactive: "hover:border-blue-100 hover:bg-blue-50/40",
  },
  "2": {
    desc: "Taman, fasilitas publik",
    dot: "bg-violet-200",
    activeDot: "bg-violet-500",
    active: "bg-violet-50 border-violet-200 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]",
    inactive: "hover:border-violet-100 hover:bg-violet-50/40",
  },
  "3": {
    desc: "Sampah, sanitasi",
    dot: "bg-emerald-200",
    activeDot: "bg-emerald-500",
    active: "bg-emerald-50 border-emerald-200 shadow-[0_0_0_3px_rgba(16,185,129,0.08)]",
    inactive: "hover:border-emerald-100 hover:bg-emerald-50/40",
  },
  "4": {
    desc: "Kemacetan, rambu",
    dot: "bg-amber-200",
    activeDot: "bg-amber-500",
    active: "bg-amber-50 border-amber-200 shadow-[0_0_0_3px_rgba(217,119,6,0.08)]",
    inactive: "hover:border-amber-100 hover:bg-amber-50/40",
  },
};

const LABEL_COLOR: Record<string, string> = {
  "1": "text-blue-700",
  "2": "text-violet-700",
  "3": "text-emerald-700",
  "4": "text-amber-700",
};

export default function CategoryField({ value, onChange }: Props) {
  return (
    <Field label="Kategori" required icon={<Tag size={12} strokeWidth={2} />}>
      <div className="grid grid-cols-2 gap-[10px]">
        {CATEGORIES.map((cat) => {
          const active = value === cat.id;
          const cfg = KATEGORI_CFG[cat.id];

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={[
                "relative flex flex-col gap-[6px] px-4 py-[14px] rounded-[12px] border-[1.5px] cursor-pointer transition-all duration-200 font-[inherit] text-left",
                active
                  ? `${cfg.active} border-opacity-100`
                  : `bg-white border-[#f0e6dc] ${cfg.inactive}`,
              ].join(" ")}
            >
              {/* Dot indicator */}
              <div className="flex items-center justify-between w-full">
                <div className={[
                  "w-2 h-2 rounded-full transition-all duration-200",
                  active ? cfg.activeDot : cfg.dot,
                ].join(" ")} />
                {active && (
                  <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E8541C] flex items-center justify-center shrink-0">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Label */}
              <span className={[
                "text-[0.82rem] font-bold leading-none transition-colors duration-200",
                active ? LABEL_COLOR[cat.id] : "text-[#1a0e08]",
              ].join(" ")}>
                {cat.label}
              </span>

              {/* Desc */}
              <span className={[
                "text-[0.68rem] leading-[1.4] transition-colors duration-200",
                active ? "opacity-70 " + LABEL_COLOR[cat.id] : "text-[#a8856b]",
              ].join(" ")}>
                {cfg.desc}
              </span>
            </button>
          );
        })}
      </div>
    </Field>
  );
}