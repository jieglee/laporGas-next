"use client";

import { Flag } from "lucide-react";
import Field from "./Field";
import { PRIORITIES } from "./types";
import { cn } from "@/lib/utils";

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
      <div className="grid grid-cols-4 gap-2">
        {PRIORITIES.map((pr) => {
          const active = value === pr.value;
          return (
            <button
              key={pr.value}
              type="button"
              onClick={() => onChange(pr.value)}
              className={cn(
                "py-[11px] px-2 border-[0.5px] rounded-[10px] cursor-pointer transition-all duration-150 font-[inherit] text-center",
                active
                  ? cn("border-transparent", pr.active)
                  : cn("bg-white border-[#f0e6dc] hover:bg-[#fafaf8]", pr.hover)
              )}
            >
              <div className={cn("w-2 h-2 rounded-full mx-auto mb-1.5", pr.dot)} />
              <div
                className={cn(
                  "text-[0.72rem] mb-0.5",
                  active ? "font-bold" : "font-semibold text-[#3d2817]"
                )}
              >
                {pr.label}
              </div>
              <div className="text-[0.58rem] text-[#a8856b] leading-[1.3]">{pr.desc}</div>
            </button>
          );
        })}
      </div>
    </Field>
  );
}
