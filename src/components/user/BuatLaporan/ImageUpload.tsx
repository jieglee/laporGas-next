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
          className={[
            "border-[1.5px] border-dashed rounded-xl py-7 px-5 text-center cursor-pointer transition-all duration-200",
            files.length ? "mb-3" : "mb-0",
            dragging
              ? "border-[#E8541C] bg-[rgba(255,107,53,0.04)]"
              : "border-[#f0e6dc] bg-[#fafaf8] hover:border-[rgba(255,107,53,0.4)] hover:bg-[rgba(255,107,53,0.03)]",
          ].join(" ")}
        >
          <div className="w-11 h-11 rounded-full bg-[rgba(255,107,53,0.08)] flex items-center justify-center mx-auto mb-[10px] text-[#E8541C]">
            <Upload size={20} strokeWidth={1.8} />
          </div>
          <p className="text-[0.82rem] font-semibold text-[#1a0e08] m-0 mb-1">
            Klik atau seret foto ke sini
          </p>
          <p className="text-[0.7rem] text-[#a8856b] m-0">
            JPG, PNG, WEBP — maks {maxFiles} foto
            {files.length > 0 && ` (${remaining} slot tersisa)`}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />

      {files.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-[10px]">
          {files.map((file, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-[10px] overflow-hidden border-[0.5px] border-[#f0e6dc]"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <div className="absolute top-1.5 left-1.5 text-[0.55rem] font-bold bg-[rgba(255,107,53,0.9)] text-white py-0.5 px-[7px] rounded-full uppercase tracking-[0.04em]">
                  Cover
                </div>
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-[5px] right-[5px] w-[22px] h-[22px] rounded-full bg-[rgba(0,0,0,0.65)] border-none cursor-pointer text-white flex items-center justify-center transition-colors duration-150 hover:bg-[rgba(220,38,38,0.85)]"
              >
                <X size={11} strokeWidth={2.5} />
              </button>
            </div>
          ))}

          {remaining > 0 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-[10px] border-[1.5px] border-dashed border-[#f0e6dc] bg-[#fafaf8] cursor-pointer flex flex-col items-center justify-center gap-1 text-[#a8856b] transition-all duration-150 p-0 hover:border-[rgba(255,107,53,0.4)] hover:text-[#E8541C]"
            >
              <Plus size={18} strokeWidth={1.8} />
              <span className="text-[0.6rem] font-semibold">Tambah</span>
            </button>
          )}
        </div>
      )}
    </Field>
  );
}