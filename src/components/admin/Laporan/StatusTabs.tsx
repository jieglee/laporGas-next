"use client";

import type { AdminLaporanStatus } from "./types";

export type TabValue = AdminLaporanStatus | "all";

interface Props {
  active: TabValue;
  onChange: (v: TabValue) => void;
  counts: Record<TabValue, number>;
}

const TABS: { value: TabValue; label: string }[] = [
  { value: "all",         label: "Semua" },
  { value: "pending",     label: "Pending" },
  { value: "approved",    label: "Approved" },
  { value: "on_progress", label: "Progress" },
  { value: "completed",   label: "Completed" },
  { value: "rejected",    label: "Rejected" },
];

export default function StatusTabs({ active, onChange, counts }: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        background: "white",
        border: "0.5px solid #f0e6dc",
        borderRadius: 12,
        padding: 4,
        marginBottom: 16,
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      {TABS.map((t) => {
        const isActive = active === t.value;
        const count = counts[t.value] ?? 0;
        return (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 14px",
              background: isActive ? "linear-gradient(135deg, #FF6B35, #E8541C)" : "transparent",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: "0.78rem",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "white" : "#6b5546",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
              boxShadow: isActive ? "0 4px 12px rgba(255,107,53,0.25)" : "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = "#fafaf8";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = "transparent";
            }}
          >
            {t.label}
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                padding: "1px 7px",
                borderRadius: 99,
                background: isActive ? "rgba(255,255,255,0.25)" : "#f5ede3",
                color: isActive ? "white" : "#a8856b",
                minWidth: 18,
                textAlign: "center",
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}