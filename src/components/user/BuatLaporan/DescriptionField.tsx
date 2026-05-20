"use client";

import { FileText } from "lucide-react";
import Field, { inputStyle, focusOrange, blurOrange } from "./Field";

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
      hint="Minimal 20 karakter. Jelaskan masalah secara detail agar admin bisa menindaklanjuti."
    >
      <textarea
        placeholder="Jelaskan kondisi masalah, sejak kapan terjadi, dampaknya terhadap warga, dll."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        maxLength={1000}
        style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
        onFocus={focusOrange}
        onBlur={blurOrange}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
        <span style={{ fontSize: "0.62rem", color: value.length > 900 ? "#E8541C" : "#c9a892" }}>
          {value.length}/1000
        </span>
      </div>
    </Field>
  );
}