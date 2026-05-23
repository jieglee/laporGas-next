"use client";

interface Props {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}

export default function Field({ label, required, icon, hint, children }: Props) {
  return (
    <div>
      <label className="flex items-center gap-[7px] text-[0.78rem] font-bold text-[#3d2817] mb-2">
        {icon && (
          <span className="w-[22px] h-[22px] rounded-[6px] bg-[rgba(255,107,53,0.08)] flex items-center justify-center text-[#E8541C] shrink-0">
            {icon}
          </span>
        )}
        {label}
        {required && (
          <span className="text-[#E8541C] text-[0.7rem]">*</span>
        )}
      </label>

      {children}

      {hint && (
        <p className="text-[0.65rem] text-[#a8856b] mt-[6px] mb-0 leading-[1.5]">
          {hint}
        </p>
      )}
    </div>
  );
}
export const inputClassName =
  "w-full bg-white border-[0.5px] border-[#f0e6dc] rounded-[10px] py-[11px] px-[14px] text-[0.85rem] text-[#1a0e08] font-[inherit] outline-none transition-colors duration-150 box-border leading-[1.5] placeholder:text-[#c9a892] focus:border-[rgba(255,107,53,0.4)]";
