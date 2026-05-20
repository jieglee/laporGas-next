"use client";

import { Flag } from "lucide-react";
import Field from "./Field";
import { PRIORITIES } from "./types";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function PriorityField({ value, onChange }: Props) {
  return (
    <Field
      label="Prioritas"
      required
      icon={<Flag size={12} strokeWidth={2} />}
      hint="Pilih prioritas sesuai tingkat urgensi masalah."
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {PRIORITIES.map((pr) => {
          const active = value === pr.value;
          return (
            <button
              key={pr.value}
              type="button"
              onClick={() => onChange(pr.value)}
              style={{
                padding: "11px 8px",
                background: active ? `${pr.color}12` : "white",
                border: `0.5px solid ${active ? pr.color + "55" : "#f0e6dc"}`,
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.15s",
                fontFamily: "inherit",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "#fafaf8";
                  e.currentTarget.style.borderColor = pr.color + "44";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#f0e6dc";
                }
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: pr.color,
                  margin: "0 auto 6px",
                }}
              />
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: active ? 700 : 600,
                  color: active ? pr.color : "#3d2817",
                  marginBottom: 2,
                }}
              >
                {pr.label}
              </div>
              <div style={{ fontSize: "0.58rem", color: "#a8856b", lineHeight: 1.3 }}>
                {pr.desc}
              </div>
            </button>
          );
        })}
      </div>
    </Field>
  );
}