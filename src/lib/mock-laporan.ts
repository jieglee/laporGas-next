// Mock data untuk laporan trending
// Nanti tinggal ganti dengan fetch dari API

export interface OfficialNote {
  id: number;
  instansi: string;
  inisial: string;
  waktu: string;
  teks: string;
}

export interface Komentar {
  id: number;
  nama: string;
  inisial: string;
  waktu: string;
  teks: string;
  upvote: number;
}

export interface Laporan {
  id: number;
  kategori: string;
  kota: string;
  judul: string;
  deskripsi?: string;
  waktu: string;
  status: "Diproses" | "Menunggu" | "Selesai";
  upvote: number;
  fotoCount: number;
  komentar: Komentar[];
  tindakLanjut: OfficialNote[];
}

export const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Diproses: { bg: "#FEE2E2", color: "#C0392B" },
  Menunggu: { bg: "#F5F5F5", color: "#888" },
  Selesai:  { bg: "#ECFDF5", color: "#059669" },
};

export function fmtUpvote(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

export const LAPORAN_TRENDING: Laporan[] = [
  {
    id: 1,
    kategori: "Infrastruktur",
    kota: "Jakarta Selatan",
    judul: "Jalan berlubang di Jl. Sudirman KM 5 sudah 3 bulan tidak diperbaiki",
    deskripsi:
      "Lubang sedalam ±30cm berada di lajur kiri, tepat setelah lampu merah. Sudah ada 2 kecelakaan motor minggu ini akibat kondisi ini.",
    waktu: "2 hari lalu",
    status: "Diproses",
    upvote: 2400,
    fotoCount: 6,
    komentar: [
      { id: 1, nama: "Rizky H.", inisial: "RH", waktu: "1j", teks: "Udah lapor ke Dinas PU tapi belum ada respons sama sekali.", upvote: 12 },
      { id: 2, nama: "Anita S.", inisial: "AS", waktu: "3j", teks: "Tiap hari lewat sini, sudah ada yang jatuh kemarin malam.", upvote: 8 },
      { id: 3, nama: "Budi W.", inisial: "BW", waktu: "5j", teks: "Saya warga sini, ini memang sudah sangat parah.", upvote: 5 },
    ],
    tindakLanjut: [
      { id: 1, instansi: "Dinas PU Jakarta Selatan", inisial: "DP", waktu: "kemarin", teks: "Laporan telah kami terima. Survei lapangan dijadwalkan pada 18 Mei 2025." },
      { id: 2, instansi: "Kelurahan Setempat", inisial: "KW", waktu: "2j lalu", teks: "Sudah berkoordinasi dengan Dinas PU dan memasang tanda peringatan sementara di lokasi." },
    ],
  },
  {
    id: 2,
    kategori: "Kebersihan",
    kota: "Jakarta Selatan",
    judul: "Tumpukan sampah di pasar Minggu menimbulkan bau tidak sedap sejak seminggu lalu",
    deskripsi:
      "Sampah menumpuk di pinggir pasar dan tidak diangkut selama hampir seminggu. Warga sekitar sudah mulai mengeluh karena bau yang tidak sedap.",
    waktu: "1 hari lalu",
    status: "Menunggu",
    upvote: 1800,
    fotoCount: 3,
    komentar: [
      { id: 1, nama: "Dewi R.", inisial: "DR", waktu: "2j", teks: "Sudah tidak tertahankan baunya, anak-anak sekolah lewat sini.", upvote: 6 },
    ],
    tindakLanjut: [
      { id: 1, instansi: "Dinas Kebersihan DKI", inisial: "DK", waktu: "6j lalu", teks: "Sudah kami catat dan akan dijadwalkan pengangkutan ekstra minggu ini." },
    ],
  },
  {
    id: 3,
    kategori: "Fasilitas Umum",
    kota: "Jakarta Pusat",
    judul: "Lampu jalan padam di sepanjang Jl. Gatot Subroto, warga resah keamanan malam",
    deskripsi:
      "Lampu jalan padam sepanjang sekitar 500 meter. Warga merasa tidak aman terutama saat pulang kerja di malam hari.",
    waktu: "3 hari lalu",
    status: "Selesai",
    upvote: 1200,
    fotoCount: 5,
    komentar: [
      { id: 1, nama: "Hendra K.", inisial: "HK", waktu: "1j", teks: "Alhamdulillah sudah diperbaiki, terima kasih LaporGas!", upvote: 15 },
    ],
    tindakLanjut: [
      { id: 1, instansi: "PLN Jakarta Pusat", inisial: "PL", waktu: "2j lalu", teks: "Perbaikan telah selesai dilakukan pada 14 Mei 2025. Terima kasih atas laporannya." },
      { id: 2, instansi: "Dinas PU DKI Jakarta", inisial: "DP", waktu: "1j lalu", teks: "Seluruh titik lampu di ruas tersebut sudah kembali berfungsi normal." },
    ],
  },
];

export function getLaporanById(id: number): Laporan | undefined {
  return LAPORAN_TRENDING.find((l) => l.id === id);
}