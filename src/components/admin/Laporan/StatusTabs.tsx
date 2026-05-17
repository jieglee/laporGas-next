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
        borderBottom: "0.5px solid #f0e6dc",
        marginBottom: 18,
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
              padding: "10px 14px",
              background: "none",
              border: "none",
              borderBottom: `2px solid ${isActive ? "#E8541C" : "transparent"}`,
              marginBottom: "-1px",
              cursor: "pointer",
              fontSize: "0.78rem",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "#1a0e08" : "#8a6f5e",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
            }}
          >
            {t.label}
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                padding: "1px 7px",
                borderRadius: 99,
                background: isActive ? "rgba(255,107,53,0.12)" : "#f5ede3",
                color: isActive ? "#E8541C" : "#a8856b",
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