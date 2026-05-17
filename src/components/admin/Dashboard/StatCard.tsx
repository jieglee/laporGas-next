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
      style={{
        background: highlight ? "linear-gradient(135deg, #FFF5EE 0%, #FFEDE0 100%)" : "white",
        border: `0.5px solid ${highlight ? "rgba(255,107,53,0.2)" : "#f0e6dc"}`,
        borderRadius: 14,
        padding: "18px 20px",
        transition: "all 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: highlight ? "rgba(255,107,53,0.15)" : "#fafaf8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: highlight ? "#E8541C" : "#8a6f5e",
          }}
        >
          <Icon size={18} strokeWidth={1.8} />
        </div>
        {delta && (
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 99,
              background: delta.positive ? "#ECFDF5" : "#FEF3F3",
              color: delta.positive ? "#059669" : "#DC2626",
            }}
          >
            {delta.positive ? "↑" : "↓"} {delta.value}
          </span>
        )}
      </div>

      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "1.8rem",
          fontWeight: 800,
          color: "#1a0e08",
          letterSpacing: "-0.035em",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      <p style={{ fontSize: "0.75rem", color: highlight ? "#8a4a1c" : "#a8856b", margin: 0, fontWeight: 500 }}>
        {label}
      </p>
    </motion.div>
  );
}