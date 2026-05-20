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

export const KATEGORI_TABS: { value: ExploreKategori; label: string; emoji: string }[] = [
  { value: "all",           label: "Semua",         emoji: "🗺️" },
  { value: "infrastruktur", label: "Infrastruktur",  emoji: "🏗️" },
  { value: "fasilitas-umum",label: "Fasilitas Umum", emoji: "🏛️" },
  { value: "kebersihan",    label: "Kebersihan",     emoji: "🧹" },
  { value: "lalu-lintas",   label: "Lalu Lintas",    emoji: "🚦" },
];

export const STATUS_CONFIG: Record<ExploreStatus, { label: string; bg: string; color: string; dot: string }> = {
  pending:     { label: "Menunggu",  bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
  approved:    { label: "Disetujui", bg: "#DBEAFE", color: "#1D4ED8", dot: "#3B82F6" },
  on_progress: { label: "Diproses",  bg: "#FFEDD5", color: "#C2410C", dot: "#FB923C" },
  completed:   { label: "Selesai",   bg: "#D1FAE5", color: "#047857", dot: "#10B981" },
  rejected:    { label: "Ditolak",   bg: "#FEE2E2", color: "#B91C1C", dot: "#EF4444" },
};

export function avatarColor(inisial: string): { bg: string; color: string } {
  const p = [
    { bg: "linear-gradient(135deg,#FF6B35,#E8541C)", color: "white" },
    { bg: "linear-gradient(135deg,#5DCAA5,#0F6E56)", color: "white" },
    { bg: "linear-gradient(135deg,#AFA9EC,#3C3489)", color: "white" },
    { bg: "linear-gradient(135deg,#F0997B,#993C1D)", color: "white" },
    { bg: "linear-gradient(135deg,#85B7EB,#0C447C)", color: "white" },
    { bg: "linear-gradient(135deg,#ED93B1,#72243E)", color: "white" },
  ];
  return p[inisial.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % p.length];
}

// ── Mock data ─────────────────────────────────────────────────────────────────

export const MOCK_POSTS: ExplorePost[] = [
  { id: "1",  judul: "Jalan berlubang di Jl. Sudirman",     deskripsi: "Lubang sedalam 30cm tepat setelah lampu merah. Sudah ada 2 kecelakaan motor minggu ini.",       kategori: "infrastruktur",  status: "pending",     imageUrl: null, pelapor: { nama: "Rizky H.",    inisial: "RH" }, lokasi: "Jakarta Selatan", createdAt: "2 jam lalu",    upvote: 248,  komentarCount: 14 },
  { id: "2",  judul: "Sampah menumpuk pasar Minggu",        deskripsi: "Tidak diangkut 5 hari. Bau menyebar 200m dan warga resah.",                                         kategori: "kebersihan",     status: "on_progress", imageUrl: null, pelapor: { nama: "Dewi R.",     inisial: "DR" }, lokasi: "Jakarta Selatan", createdAt: "5 jam lalu",    upvote: 183,  komentarCount: 9 },
  { id: "3",  judul: "Lampu jalan padam Jl. Gatot Subroto", deskripsi: "12 titik lampu padam sepanjang ruas. Rawan kriminalitas saat malam hari.",                          kategori: "fasilitas-umum", status: "approved",    imageUrl: null, pelapor: { nama: "Hendra K.",   inisial: "HK" }, lokasi: "Jakarta Pusat",   createdAt: "1 hari lalu",   upvote: 97,   komentarCount: 7 },
  { id: "4",  judul: "Macet parah simpang Margonda",        deskripsi: "Setiap pagi macet 1.5 jam. Butuh penataan ulang lampu lalu lintas.",                                  kategori: "lalu-lintas",    status: "pending",     imageUrl: null, pelapor: { nama: "Maya P.",     inisial: "MP" }, lokasi: "Depok",           createdAt: "3 jam lalu",    upvote: 342,  komentarCount: 18 },
  { id: "5",  judul: "Trotoar rusak Jl. Margonda",          deskripsi: "Trotoar 200m rusak berat, pejalan kaki harus turun ke badan jalan.",                                  kategori: "infrastruktur",  status: "completed",   imageUrl: null, pelapor: { nama: "Joko S.",     inisial: "JS" }, lokasi: "Depok",           createdAt: "1 minggu lalu", upvote: 980,  komentarCount: 11 },
  { id: "6",  judul: "Selokan mampet di Kemang",            deskripsi: "Tersumbat sampah, banjir tiap hujan deras.",                                                           kategori: "kebersihan",     status: "approved",    imageUrl: null, pelapor: { nama: "Sari L.",     inisial: "SL" }, lokasi: "Jakarta Selatan", createdAt: "8 jam lalu",    upvote: 234,  komentarCount: 5 },
  { id: "7",  judul: "Pohon tumbang halangi jalan",         deskripsi: "Setelah hujan deras, pohon tumbang menutup total akses jalan.",                                        kategori: "infrastruktur",  status: "on_progress", imageUrl: null, pelapor: { nama: "Tono W.",     inisial: "TW" }, lokasi: "Jakarta Barat",   createdAt: "6 jam lalu",    upvote: 456,  komentarCount: 8 },
  { id: "8",  judul: "Halte busway rusak",                  deskripsi: "Atap bocor, bangku patah. Penumpang tidak terlindungi dari hujan.",                                    kategori: "fasilitas-umum", status: "pending",     imageUrl: null, pelapor: { nama: "Bagas P.",    inisial: "BP" }, lokasi: "Jakarta Pusat",   createdAt: "1 hari lalu",   upvote: 89,   komentarCount: 3 },
  { id: "9",  judul: "Rambu lalin tertutup pohon",          deskripsi: "Rambu stop tidak terlihat karena ranting lebat. Rawan kecelakaan.",                                    kategori: "lalu-lintas",    status: "completed",   imageUrl: null, pelapor: { nama: "Indra K.",    inisial: "IK" }, lokasi: "Bekasi",          createdAt: "2 hari lalu",   upvote: 56,   komentarCount: 2 },
  { id: "10", judul: "Bangku taman patah",                  deskripsi: "Bangku di Taman Suropati patah dan berbahaya bagi pengunjung.",                                        kategori: "fasilitas-umum", status: "approved",    imageUrl: null, pelapor: { nama: "Lia W.",      inisial: "LW" }, lokasi: "Jakarta Pusat",   createdAt: "3 hari lalu",   upvote: 45,   komentarCount: 1 },
  { id: "11", judul: "Sampah plastik di Sungai Ciliwung",   deskripsi: "Tumpukan sampah plastik membuat aliran tersumbat dan airnya hitam.",                                   kategori: "kebersihan",     status: "on_progress", imageUrl: null, pelapor: { nama: "Andi F.",     inisial: "AF" }, lokasi: "Jakarta Timur",   createdAt: "4 jam lalu",    upvote: 612,  komentarCount: 22 },
  { id: "12", judul: "Jembatan retak Jl. Raya Bogor",       deskripsi: "Retak panjang di badan jembatan. Perlu pemeriksaan segera sebelum digunakan kendaraan berat.",         kategori: "infrastruktur",  status: "approved",    imageUrl: null, pelapor: { nama: "Fitri N.",    inisial: "FN" }, lokasi: "Jakarta Timur",   createdAt: "12 jam lalu",   upvote: 728,  komentarCount: 31 },
];