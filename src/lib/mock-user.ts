export interface UserProfile {
  id: string;
  nama: string;
  email: string;
  bio: string;
  lokasi: string;
  avatarUrl?: string;
  bergabungSejak: string;
  stats: {
    laporan: number;
    diselesaikan: number;
    dukungan: number;
  };
}

export interface UserLaporan {
  id: string;
  judul: string;
  kategori: string;
  status: "Menunggu" | "Diproses" | "Selesai" | "Ditolak";
  fotoCount: number;
  upvote: number;
  komentar: number;
  waktu: string;
}

export const MOCK_USER: UserProfile = {
  id: "u1",
  nama: "Anindita Amantaruna",
  email: "amantaruna@laporgas.id",
  bio: "Warga aktif yang peduli sama lingkungan sekitar. Suka motret jalanan yang butuh diperbaiki 📸",
  lokasi: "Depok, Jawa Barat",
  bergabungSejak: "Maret 2024",
  stats: {
    laporan: 12,
    diselesaikan: 8,
    dukungan: 1247,
  },
};

export const MOCK_USER_LAPORAN: UserLaporan[] = [
  { id: "ul1",  judul: "Jalan berlubang di Jl. Margonda KM 5",   kategori: "Infrastruktur",  status: "Diproses", fotoCount: 4, upvote: 234, komentar: 12, waktu: "2h" },
  { id: "ul2",  judul: "Sampah menumpuk di TPS Kukusan",          kategori: "Kebersihan",     status: "Selesai",  fotoCount: 3, upvote: 156, komentar: 8,  waktu: "1m" },
  { id: "ul3",  judul: "Lampu jalan padam di RT 04",              kategori: "Fasilitas Umum", status: "Menunggu", fotoCount: 2, upvote: 87,  komentar: 3,  waktu: "5h" },
  { id: "ul4",  judul: "Trotoar rusak parah di Jl. Kartini",      kategori: "Infrastruktur",  status: "Diproses", fotoCount: 5, upvote: 312, komentar: 24, waktu: "3h" },
  { id: "ul5",  judul: "Pohon tumbang menghalangi jalan",          kategori: "Infrastruktur",  status: "Selesai",  fotoCount: 6, upvote: 198, komentar: 15, waktu: "2m" },
  { id: "ul6",  judul: "Got mampet bikin banjir tiap hujan",      kategori: "Infrastruktur",  status: "Menunggu", fotoCount: 4, upvote: 145, komentar: 9,  waktu: "1m" },
  { id: "ul7",  judul: "Macet parah di simpang Margonda",          kategori: "Lalu Lintas",    status: "Diproses", fotoCount: 2, upvote: 423, komentar: 32, waktu: "4h" },
  { id: "ul8",  judul: "Halte bus rusak dan tidak terawat",        kategori: "Fasilitas Umum", status: "Selesai",  fotoCount: 3, upvote: 67,  komentar: 4,  waktu: "3m" },
  { id: "ul9",  judul: "Pembakaran sampah di area perumahan",      kategori: "Kebersihan",     status: "Selesai",  fotoCount: 2, upvote: 89,  komentar: 11, waktu: "2m" },
  { id: "ul10", judul: "Rambu lalu lintas tertutup pohon",         kategori: "Lalu Lintas",    status: "Menunggu", fotoCount: 1, upvote: 34,  komentar: 2,  waktu: "1h" },
  { id: "ul11", judul: "Saluran air mampet di gang sempit",        kategori: "Infrastruktur",  status: "Ditolak",  fotoCount: 3, upvote: 12,  komentar: 1,  waktu: "1m" },
  { id: "ul12", judul: "Pos ronda rusak butuh perbaikan",          kategori: "Fasilitas Umum", status: "Diproses", fotoCount: 4, upvote: 78,  komentar: 6,  waktu: "2h" },
];

export const STATUS_BADGE: Record<UserLaporan["status"], { bg: string; color: string }> = {
  Menunggu: { bg: "#F5F5F5", color: "#888"    },
  Diproses: { bg: "#FEE2E2", color: "#C0392B" },
  Selesai:  { bg: "#ECFDF5", color: "#059669" },
  Ditolak:  { bg: "#FFF3F3", color: "#E8541C" },
};