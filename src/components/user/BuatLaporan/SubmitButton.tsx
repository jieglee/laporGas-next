"use client";

import { ChevronRight, Loader2 } from "lucide-react";
import type { FormState } from "./types";

interface Props {
  form: FormState;
  submitting: boolean;
  onSubmit: () => void;
}

function Chip({ label }: { label: string }) {
  return (
    <span className="text-[0.62rem] font-semibold text-[#E8541C] bg-[#FFF5EE] border-[0.5px] border-[rgba(255,107,53,0.2)] py-[3px] px-[9px] rounded-full">
      {label}
    </span>
  );
}

export function isFormValid(form: FormState): boolean {
  return (
    form.title.trim().length >= 5 &&
    form.description.trim().length >= 20 &&
    Boolean(form.category_id) &&
    Boolean(form.latitude) &&
    Boolean(form.longitude) &&
    Boolean(form.priority)
  );
}

export default function SubmitButton({ form, submitting, onSubmit }: Props) {
  const valid = isFormValid(form);

  return (
    <div className="pt-1">
      {!valid && <div className="mb-[14px]" />}

      <button
        type="button"
        onClick={onSubmit}
        disabled={!valid || submitting}
        className={[
          "w-full py-[14px] px-5 text-[0.88rem] font-bold border-none rounded-[11px] font-[inherit]",
          "flex items-center justify-center gap-2 transition-all duration-[250ms]",
          valid
            ? [
                "bg-gradient-to-br from-[#FF6B35] to-[#E8541C] text-white cursor-pointer",
                "shadow-[0_6px_18px_rgba(255,107,53,0.28)]",
                "hover:-translate-y-px hover:shadow-[0_10px_26px_rgba(255,107,53,0.38)]",
              ].join(" ")
            : "bg-[#f0e6dc] text-[#c9a892] cursor-not-allowed shadow-none",
        ].join(" ")}
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Mengirim laporan...
          </>
        ) : (
          <>Kirim Laporan <ChevronRight size={16} /></>
        )}
      </button>
    </div>
  );
}