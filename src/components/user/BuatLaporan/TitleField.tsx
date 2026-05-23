"use client";

import { FileText } from "lucide-react";
import Field, { inputClassName } from "./Field";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function TitleField({ value, onChange }: Props) {
  return (
    <Field
      label="Judul laporan"
      required
      icon={<FileText size={12} strokeWidth={2} />}
    >
      <input
        type="text"
        placeholder="Minimal 5 karakter. Tulis judul yang singkat dan jelas."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={120}
        className={inputClassName}
      />
      <div className="flex justify-end mt-1">
        <span
          className={cn(
            "text-[0.62rem]",
            value.length > 100 ? "text-[#E8541C]" : "text-[#c9a892]"
          )}
        >
          {value.length}/120
        </span>
      </div>
    </Field>
  );
}
