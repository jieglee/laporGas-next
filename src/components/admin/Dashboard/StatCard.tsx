"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
  delta?: { value: string; positive?: boolean };
  highlight?: boolean;
  index?: number;
}

export default function StatCard({ label, value, icon: Icon, delta, highlight, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className={`rounded-[14px] px-5 py-[18px] transition-all duration-200 border-[0.5px] ${
        highlight
          ? "border-[rgba(255,107,53,0.2)]"
          : "border-[#f0e6dc] bg-white"
      }`}
      style={{
        background: highlight
          ? "linear-gradient(135deg, #FFF5EE 0%, #FFEDE0 100%)"
          : undefined,
      }}
    >
      <div className="flex items-center justify-between mb-[14px]">
        <div
          className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${
            highlight
              ? "bg-[rgba(255,107,53,0.15)] text-[#E8541C]"
              : "bg-[#fafaf8] text-[#8a6f5e]"
          }`}
        >
          <Icon size={18} strokeWidth={1.8} />
        </div>
        {delta && (
          <span
            className={`text-[0.65rem] font-bold px-2 py-[3px] rounded-full ${
              delta.positive
                ? "bg-[#ECFDF5] text-[#059669]"
                : "bg-[#FEF3F3] text-[#DC2626]"
            }`}
          >
            {delta.positive ? "↑" : "↓"} {delta.value}
          </span>
        )}
      </div>

      <div
        className="text-[1.8rem] font-extrabold text-[#1a0e08] tracking-[-0.035em] leading-none mb-[6px]"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {value}
      </div>
      <p className={`text-[0.75rem] font-medium m-0 ${highlight ? "text-[#8a4a1c]" : "text-[#a8856b]"}`}>
        {label}
      </p>
    </motion.div>
  );
}