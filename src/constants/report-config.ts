export const STATUS_CFG = {
  pending: {
    label: "Menunggu",
    badge: "bg-amber-50 text-amber-900",
    dot: "bg-amber-500",
  },
  approved: {
    label: "Disetujui",
    badge: "bg-blue-50 text-blue-800",
    dot: "bg-blue-500",
  },
  on_progress: {
    label: "Diproses",
    badge: "bg-orange-50 text-orange-700",
    dot: "bg-orange-400",
  },
  completed: {
    label: "Selesai",
    badge: "bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-500",
  },
  rejected: {
    label: "Ditolak",
    badge: "bg-rose-50 text-rose-700",
    dot: "bg-rose-400",
  },
} as const;

export const PRIORITY_CFG = {
  low: {
    label: "Rendah",
    text: "text-gray-500",
    soft: "text-gray-500 bg-gray-500/10",
  },
  medium: {
    label: "Sedang",
    text: "text-amber-700",
    soft: "text-amber-700 bg-amber-500/10",
  },
  high: {
    label: "Tinggi",
    text: "text-orange-700",
    soft: "text-orange-700 bg-orange-500/10",
  },
  urgent: {
    label: "Mendesak",
    text: "text-red-600",
    soft: "text-red-600 bg-red-500/10",
  },
} as const;
