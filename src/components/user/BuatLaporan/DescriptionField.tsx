"use client";

import { FileText } from "lucide-react";
import Field from "./Field";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function DescriptionField({ value, onChange }: Props) {
  return (
    <Field
      label="Deskripsi"
      required
      icon={<FileText size={12} strokeWidth={2} />}
    >
      <textarea
        placeholder="Minimal 20 karakter. Jelaskan masalah secara detail agar admin bisa menindaklanjuti."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        maxLength={1000}
        className="w-full border border-[#f0e6dc] rounded-[10px] px-3 py-[10px] text-[0.85rem] text-[#3d2817] bg-white outline-none font-[inherit] placeholder:text-[#c9a892] transition-colors duration-150 resize-y min-h-[110px] focus:border-[rgba(255,107,53,0.5)] focus:ring-2 focus:ring-[rgba(255,107,53,0.12)]"
      />
      <div className="flex justify-end mt-1">
        <span
          className={[
            "text-[0.62rem]",
            value.length > 900 ? "text-[#E8541C]" : "text-[#c9a892]",
          ].join(" ")}
        >
          {value.length}/1000
        </span>
      </div>
    </Field>
  );
}