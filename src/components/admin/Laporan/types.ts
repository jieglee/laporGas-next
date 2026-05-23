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
  koordinat: { lat: number; lng: number };
  fotoCount: number;
  image?: string | null;
  pelapor: { nama: string; inisial: string; email: string };
  createdAt: string;
  upvote: number;
  komentarCount: number;
  rejectReason?: string;
}

export const STATUS_CONFIG: Record<
  AdminLaporanStatus,
  { label: string; badge: string; dot: string }
> = {
  pending: { label: "Pending", badge: "bg-amber-100 text-amber-900", dot: "bg-amber-500" },
  approved: { label: "Approved", badge: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
  on_progress: { label: "On Progress", badge: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
  completed: { label: "Completed", badge: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  rejected: { label: "Rejected", badge: "bg-red-100 text-red-800", dot: "bg-red-500" },
};

export const PRIORITY_CONFIG: Record<
  LaporanPriority,
  { label: string; badge: string }
> = {
  low: { label: "Low", badge: "bg-gray-100 text-gray-600" },
  medium: { label: "Medium", badge: "bg-amber-100 text-amber-900" },
  high: { label: "High", badge: "bg-orange-100 text-orange-700" },
  urgent: { label: "Urgent", badge: "bg-red-100 text-red-800" },
};

export const KATEGORI_LABEL: Record<LaporanKategori, string> = {
  infrastruktur: "Infrastruktur",
  "fasilitas-umum": "Fasilitas Umum",
  kebersihan: "Kebersihan",
  "lalu-lintas": "Lalu Lintas",
};

export function avatarColor(inisial: string): string {
  const palettes = [
    "bg-gradient-to-br from-[#FF6B35] to-[#E8541C] text-white",
    "bg-gradient-to-br from-[#5DCAA5] to-[#0F6E56] text-white",
    "bg-gradient-to-br from-[#AFA9EC] to-[#3C3489] text-white",
    "bg-gradient-to-br from-[#F0997B] to-[#993C1D] text-white",
    "bg-gradient-to-br from-[#85B7EB] to-[#0C447C] text-white",
    "bg-gradient-to-br from-[#ED93B1] to-[#72243E] text-white",
  ];
  const hash = inisial.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return palettes[hash % palettes.length];
}
