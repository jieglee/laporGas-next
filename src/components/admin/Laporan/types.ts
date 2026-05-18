export type AdminLaporanStatus =
  | "pending"
  | "approved"
  | "on_progress"
  | "completed"
  | "rejected";

export type LaporanPriority = "low" | "medium" | "high" | "urgent";

export type LaporanKategori =
  | "infrastruktur"
  | "fasilitas-umum"
  | "kebersihan"
  | "lalu-lintas";

export interface AdminLaporan {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: LaporanKategori;
  status: AdminLaporanStatus;
  priority: LaporanPriority;
  lokasi: string;
  alamat: string;
  fotoCount: number;
  pelapor: { nama: string; inisial: string; email: string };
  createdAt: string;
  upvote: number;
  komentarCount: number;
  rejectReason?: string;
}

export const STATUS_CONFIG: Record<
  AdminLaporanStatus,
  { label: string; bg: string; color: string; dot: string }
> = {
  pending:     { label: "Pending",     bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
  approved:    { label: "Approved",    bg: "#DBEAFE", color: "#1D4ED8", dot: "#3B82F6" },
  on_progress: { label: "On Progress", bg: "#FFEDD5", color: "#C2410C", dot: "#FB923C" },
  completed:   { label: "Completed",   bg: "#D1FAE5", color: "#047857", dot: "#10B981" },
  rejected:    { label: "Rejected",    bg: "#FEE2E2", color: "#B91C1C", dot: "#EF4444" },
};

export const PRIORITY_CONFIG: Record<
  LaporanPriority,
  { label: string; bg: string; color: string }
> = {
  low:    { label: "Low",    bg: "#F3F4F6", color: "#6B7280" },
  medium: { label: "Medium", bg: "#FEF3C7", color: "#92400E" },
  high:   { label: "High",   bg: "#FFEDD5", color: "#C2410C" },
  urgent: { label: "Urgent", bg: "#FEE2E2", color: "#B91C1C" },
};

export const KATEGORI_LABEL: Record<LaporanKategori, string> = {
  "infrastruktur":  "Infrastruktur",
  "fasilitas-umum": "Fasilitas Umum",
  "kebersihan":     "Kebersihan",
  "lalu-lintas":    "Lalu Lintas",
};

// Hash inisial → palette warna konsisten per user
export function avatarColor(inisial: string): { bg: string; color: string } {
  const palettes = [
    { bg: "linear-gradient(135deg, #FF6B35, #E8541C)", color: "white" },
    { bg: "linear-gradient(135deg, #5DCAA5, #0F6E56)", color: "white" },
    { bg: "linear-gradient(135deg, #AFA9EC, #3C3489)", color: "white" },
    { bg: "linear-gradient(135deg, #F0997B, #993C1D)", color: "white" },
    { bg: "linear-gradient(135deg, #85B7EB, #0C447C)", color: "white" },
    { bg: "linear-gradient(135deg, #ED93B1, #72243E)", color: "white" },
  ];
  const hash = inisial.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return palettes[hash % palettes.length];
}