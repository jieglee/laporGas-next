"use client";

import { useRef, useState } from "react";
import { Upload, X, Plus, Image as ImageIcon } from "lucide-react";
import Field from "./Field";

interface Props {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
}

export default function ImageUpload({ files, onChange, maxFiles = 5 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const arr = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
    onChange([...files, ...arr].slice(0, maxFiles));
  };

  const remove = (i: number) => onChange(files.filter((_, idx) => idx !== i));

  const remaining = maxFiles - files.length;

  return (
    <Field
      label="Foto bukti"
      icon={<ImageIcon size={12} strokeWidth={2} />}
      hint="Opsional, maks 5 foto. Foto pertama akan dijadikan cover laporan."
    >
      {remaining > 0 && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
          style={{
            border: `1.5px dashed ${dragging ? "#E8541C" : "#f0e6dc"}`,
            borderRadius: 12,
            padding: "28px 20px",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "rgba(255,107,53,0.04)" : "#fafaf8",
            transition: "all 0.2s",
            marginBottom: files.length ? 12 : 0,
          }}
          onMouseEnter={(e) => {
            if (!dragging) {
              e.currentTarget.style.borderColor = "rgba(255,107,53,0.4)";
              e.currentTarget.style.background = "rgba(255,107,53,0.03)";
            }
          }}
          onMouseLeave={(e) => {
            if (!dragging) {
              e.currentTarget.style.borderColor = "#f0e6dc";
              e.currentTarget.style.background = "#fafaf8";
            }
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255,107,53,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px",
              color: "#E8541C",
            }}
          >
            <Upload size={20} strokeWidth={1.8} />
          </div>
          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a0e08", margin: "0 0 4px" }}>
            Klik atau seret foto ke sini
          </p>
          <p style={{ fontSize: "0.7rem", color: "#a8856b", margin: 0 }}>
            JPG, PNG, WEBP — maks {maxFiles} foto
            {files.length > 0 && ` (${remaining} slot tersisa)`}
          </p>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => addFiles(e.target.files)} />

      {files.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 10 }}>
          {files.map((file, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                aspectRatio: "1/1",
                borderRadius: 10,
                overflow: "hidden",
                border: "0.5px solid #f0e6dc",
              }}
            >
              <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {i === 0 && (
                <div style={{ position: "absolute", top: 6, left: 6, fontSize: "0.55rem", fontWeight: 700, background: "rgba(255,107,53,0.9)", color: "white", padding: "2px 7px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Cover
                </div>
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                style={{ position: "absolute", top: 5, right: 5, width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,0.65)", border: "none", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(220,38,38,0.85)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.65)")}
              >
                <X size={11} strokeWidth={2.5} />
              </button>
            </div>
          ))}

          {remaining > 0 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              style={{ aspectRatio: "1/1", borderRadius: 10, border: "1.5px dashed #f0e6dc", background: "#fafaf8", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, color: "#a8856b", transition: "all 0.15s", padding: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,107,53,0.4)"; e.currentTarget.style.color = "#E8541C"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#f0e6dc"; e.currentTarget.style.color = "#a8856b"; }}
            >
              <Plus size={18} strokeWidth={1.8} />
              <span style={{ fontSize: "0.6rem", fontWeight: 600 }}>Tambah</span>
            </button>
          )}
        </div>
      )}
    </Field>
  );
}