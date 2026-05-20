"use client";

import { AlertTriangle, ArrowDownLeft, ArrowUpRight, X } from "lucide-react";

type Variant = "danger" | "promote" | "demote";

type Props = {
  open: boolean;
  variant: Variant;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
};

const variantConfig = {
  danger: {
    icon: AlertTriangle,
    iconBg: "bg-[#C0392B]/10",
    iconColor: "text-[#C0392B]",
    confirmBg: "bg-[#C0392B] hover:bg-[#a93023]",
  },
  promote: {
    icon: ArrowUpRight,
    iconBg: "bg-neutral-900/10",
    iconColor: "text-neutral-900",
    confirmBg: "bg-neutral-900 hover:bg-neutral-800",
  },
  demote: {
    icon: ArrowDownLeft,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    confirmBg: "bg-amber-600 hover:bg-amber-700",
  },
};

export default function ConfirmModal({
  open,
  variant,
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null;

  const cfg = variantConfig[variant];
  const Icon = cfg.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-5 pb-4 pt-6">
          <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${cfg.iconBg}`}
          >
            <Icon className={`h-6 w-6 ${cfg.iconColor}`} strokeWidth={2} />
          </div>

          <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-neutral-100 px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium text-white ${cfg.confirmBg}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}