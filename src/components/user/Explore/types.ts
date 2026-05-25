export type ExploreStatus = "pending" | "approved" | "on_progress" | "completed" | "rejected";

export type ExploreKategori =
  | "all"
  | "infrastruktur"
  | "fasilitas-umum"
  | "kebersihan"
  | "lalu-lintas";

export interface ExplorePost {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: Exclude<ExploreKategori, "all">;
  status: ExploreStatus;
  imageUrl?: string | null;
  pelapor: { nama: string; inisial: string };
  lokasi: string;
  createdAt: string;
  upvote: number;
  komentarCount: number;
}

export interface ExploreComment {
  id: string;
  nama: string;
  inisial: string;
  teks: string;
  waktu: string;
}

export const KATEGORI_TABS: { value: ExploreKategori; label: string }[] = [
  { value: "all",            label: "Semua" },
  { value: "infrastruktur",  label: "Infrastruktur" },
  { value: "fasilitas-umum", label: "Fasilitas Umum" },
  { value: "kebersihan",     label: "Kebersihan" },
  { value: "lalu-lintas",    label: "Lalu Lintas" },
];

export function avatarColor(inisial: string): string {
  const palettes = [
    "bg-gradient-to-br from-[#FF6B35] to-[#E8541C] text-white",
    "bg-gradient-to-br from-[#5DCAA5] to-[#0F6E56] text-white",
    "bg-gradient-to-br from-[#AFA9EC] to-[#3C3489] text-white",
    "bg-gradient-to-br from-[#F0997B] to-[#993C1D] text-white",
    "bg-gradient-to-br from-[#85B7EB] to-[#0C447C] text-white",
    "bg-gradient-to-br from-[#ED93B1] to-[#72243E] text-white",
  ];
  return palettes[inisial.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % palettes.length];
}