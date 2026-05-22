export const STATUS_CFG = {
  pending: {
    label: "Menunggu",
    bg: "#FFFBEB",
    color: "#92400E",
    dot: "#F59E0B",
  },
  approved: {
    label: "Disetujui",
    bg: "#EFF6FF",
    color: "#1D4ED8",
    dot: "#3B82F6",
  },
  on_progress: {
    label: "Diproses",
    bg: "#FFF7ED",
    color: "#C2410C",
    dot: "#FB923C",
  },
  completed: {
    label: "Selesai",
    bg: "#F0FDF4",
    color: "#047857",
    dot: "#10B981",
  },
  rejected: {
    label: "Ditolak",
    bg: "#FFF1F2",
    color: "#BE123C",
    dot: "#FB7185",
  },
} as const;

export const PRIORITY_CFG = {
  low: {
    label: "Rendah",
    color: "#6B7280",
  },
  medium: {
    label: "Sedang",
    color: "#D97706",
  },
  high: {
    label: "Tinggi",
    color: "#EA580C",
  },
  urgent: {
    label: "Mendesak",
    color: "#DC2626",
  },
} as const;