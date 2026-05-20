"use client";

import { Tag } from "lucide-react";
import Field from "./Field";
import { CATEGORIES } from "./types";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function CategoryField({ value, onChange }: Props) {
  return (
    <Field
      label="Kategori"
      required
      icon={<Tag size={12} strokeWidth={2} />}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
        {CATEGORIES.map((cat) => {
          const active = value === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 14px",
                background: active ? "rgba(255,107,53,0.06)" : "white",
                border: `0.5px solid ${active ? "rgba(255,107,53,0.35)" : "#f0e6dc"}`,
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.15s",
                fontFamily: "inherit",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "#fafaf8";
                  e.currentTarget.style.borderColor = "rgba(255,107,53,0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#f0e6dc";
                }
              }}
            >
              <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{cat.icon}</span>
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#E8541C" : "#3d2817",
                }}
              >
                {cat.label}
              </span>
              {active && (
                <div
                  style={{
                    marginLeft: "auto",
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Field>
  );
}