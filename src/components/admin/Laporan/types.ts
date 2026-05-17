"use client";

// ── Types ──────────────────────────────────────────────────────────────────────

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
}

// ── Configs ────────────────────────────────────────────────────────────────────

export const STATUS_CONFIG: Record<AdminLaporanStatus, { label: string; bg: string; color: string }> = {
  pending:     { label: "Pending",     bg: "#FEF3C7", color: "#92400E" },
  approved:    { label: "Approved",    bg: "#DBEAFE", color: "#1D4ED8" },
  on_progress: { label: "On Progress", bg: "#FFEDD5", color: "#C2410C" },
  completed:   { label: "Completed",   bg: "#D1FAE5", color: "#047857" },
  rejected:    { label: "Rejected",    bg: "#FEE2E2", color: "#B91C1C" },
};

export const PRIORITY_CONFIG: Record<LaporanPriority, { label: string; bg: string; color: string }> = {
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