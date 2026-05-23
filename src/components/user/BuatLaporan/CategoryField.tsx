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
      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((cat) => {
          const active = value === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={[
                "flex items-center gap-[10px] px-[14px] py-[11px]",
                "border-[0.5px] rounded-[10px] cursor-pointer transition-all duration-150",
                "font-[inherit] text-left",
                active
                  ? "bg-[rgba(255,107,53,0.06)] border-[rgba(255,107,53,0.35)]"
                  : "bg-white border-[#f0e6dc] hover:bg-[#fafaf8] hover:border-[rgba(255,107,53,0.2)]",
              ].join(" ")}
            >
              <span className="text-[1.1rem] leading-none">{cat.icon}</span>
              <span
                className={[
                  "text-[0.82rem]",
                  active ? "font-bold text-[#E8541C]" : "font-medium text-[#3d2817]",
                ].join(" ")}
              >
                {cat.label}
              </span>
              {active && (
                <div className="ml-auto w-4 h-4 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E8541C] flex items-center justify-center shrink-0">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path
                      d="M1 3l2 2 4-4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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