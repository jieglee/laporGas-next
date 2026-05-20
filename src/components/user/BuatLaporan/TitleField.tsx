"use client";

import { FileText } from "lucide-react";
import Field, { inputStyle, focusOrange, blurOrange } from "./Field";

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
        style={inputStyle}
        onFocus={focusOrange}
        onBlur={blurOrange}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
        <span style={{ fontSize: "0.62rem", color: value.length > 100 ? "#E8541C" : "#c9a892" }}>
          {value.length}/120
        </span>
      </div>
    </Field>
  );
}