export type StatusLaporan = "menunggu" | "diproses" | "selesai" | "ditolak";
export type KategoriLaporan = "infrastruktur" | "fasilitas-umum" | "kebersihan" | "lalu-lintas";

export interface Komentar {
  id: string;
  nama: string;
  inisial: string;
  waktu: string;
  teks: string;
  upvote: number;
}

export interface TindakLanjut {
  id: string;
  instansi: string;
  inisial: string;
  waktu: string;
  teks: string;
}

export interface LaporanItem {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: KategoriLaporan;
  lokasi: string;
  waktu: string;
  status: StatusLaporan;
  upvote: number;
  fotoCount: number;
  pelapor: { nama: string; inisial: string };
  komentar: Komentar[];
  tindakLanjut: TindakLanjut[];
}

export const STATUS_CONFIG: Record<StatusLaporan, { label: string; bg: string; color: string }> = {
  menunggu:  { label: "Menunggu",  bg: "#F5F5F5",  color: "#888" },
  diproses:  { label: "Diproses",  bg: "#FEE2E2",  color: "#C0392B" },
  selesai:   { label: "Selesai",   bg: "#ECFDF5",  color: "#059669" },
  ditolak:   { label: "Ditolak",   bg: "#FFF3F3",  color: "#E8541C" },
};

export const KATEGORI_CONFIG: Record<KategoriLaporan, string> = {
  "infrastruktur":  "Infrastruktur",
  "fasilitas-umum": "Fasilitas Umum",
  "kebersihan":     "Kebersihan",
  "lalu-lintas":    "Lalu Lintas",
};

export const MOCK_FEED: LaporanItem[] = [
  {
    id: "1",
    judul: "Jalan berlubang di Jl. Sudirman KM 5 sudah 3 bulan tidak diperbaiki",
    deskripsi: "Lubang sedalam ±30cm berada di lajur kiri, tepat setelah lampu merah. Sudah ada 2 kecelakaan motor minggu ini akibat kondisi ini. Warga sekitar sudah beberapa kali melapor ke kelurahan tapi tidak ada tindakan.",
    kategori: "infrastruktur",
    lokasi: "Jakarta Selatan",
    waktu: "2 hari lalu",
    status: "diproses",
    upvote: 2400,
    fotoCount: 6,
    pelapor: { nama: "Rizky Hidayat", inisial: "RH" },
    komentar: [
      { id: "k1", nama: "Anita S.", inisial: "AS", waktu: "1j", teks: "Tiap hari lewat sini, sudah ada yang jatuh kemarin malam karena tidak kelihatan.", upvote: 8 },
      { id: "k2", nama: "Budi W.", inisial: "BW", waktu: "3j", teks: "Saya warga sini, ini memang sudah sangat parah. Mohon segera diperbaiki.", upvote: 5 },
      { id: "k3", nama: "Citra M.", inisial: "CM", waktu: "5j", teks: "Udah lapor ke 1500-134 tapi belum ada respons.", upvote: 3 },
    ],
    tindakLanjut: [
      { id: "t1", instansi: "Dinas PU Jakarta Selatan", inisial: "DP", waktu: "kemarin", teks: "Laporan telah kami terima dan survei lapangan dijadwalkan pada 18 Mei 2025." },
      { id: "t2", instansi: "Kelurahan Setempat", inisial: "KW", waktu: "2j lalu", teks: "Sudah berkoordinasi dengan Dinas PU dan memasang tanda peringatan sementara." },
    ],
  },
  {
    id: "2",
    judul: "Sampah menumpuk di pasar Minggu tidak diangkut selama 5 hari",
    deskripsi: "Tumpukan sampah di sisi timur pasar sudah sangat mengkhawatirkan. Bau tidak sedap menyebar hingga radius 200 meter. Pedagang dan warga sekitar sangat terganggu.",
    kategori: "kebersihan",
    lokasi: "Jakarta Selatan",
    waktu: "1 hari lalu",
    status: "menunggu",
    upvote: 1800,
    fotoCount: 3,
    pelapor: { nama: "Dewi Rahayu", inisial: "DR" },
    komentar: [
      { id: "k1", nama: "Farhan A.", inisial: "FA", waktu: "2j", teks: "Ini sudah berulang kali terjadi. Perlu ada jadwal tetap pengangkutan sampah.", upvote: 12 },
      { id: "k2", nama: "Gita P.", inisial: "GP", waktu: "4j", teks: "Anak-anak sekolah lewat sini setiap pagi, sangat tidak layak.", upvote: 7 },
    ],
    tindakLanjut: [
      { id: "t1", instansi: "Dinas Kebersihan DKI", inisial: "DK", waktu: "6j lalu", teks: "Sudah kami catat dan akan dijadwalkan pengangkutan ekstra minggu ini." },
    ],
  },
  {
    id: "3",
    judul: "Lampu jalan padam di sepanjang Jl. Gatot Subroto hampir 2 minggu",
    deskripsi: "Sebanyak 12 titik lampu jalan padam di sepanjang Jl. Gatot Subroto arah Semanggi. Kondisi sangat gelap saat malam hari, warga resah dengan keamanan.",
    kategori: "fasilitas-umum",
    lokasi: "Jakarta Pusat",
    waktu: "3 hari lalu",
    status: "selesai",
    upvote: 1200,
    fotoCount: 5,
    pelapor: { nama: "Hendra K.", inisial: "HK" },
    komentar: [
      { id: "k1", nama: "Indah T.", inisial: "IT", waktu: "1j", teks: "Alhamdulillah sudah diperbaiki! Terima kasih semua yang sudah ikut dukung laporan ini.", upvote: 15 },
    ],
    tindakLanjut: [
      { id: "t1", instansi: "PLN Jakarta Pusat", inisial: "PL", waktu: "2j lalu", teks: "Perbaikan telah selesai dilakukan pada 14 Mei 2025. Terima kasih atas laporannya." },
      { id: "t2", instansi: "Dinas PU DKI Jakarta", inisial: "DP", waktu: "1j lalu", teks: "Seluruh titik lampu di ruas tersebut sudah kembali berfungsi normal." },
    ],
  },
  {
    id: "4",
    judul: "Trotoar di Jl. Margonda rusak parah, pejalan kaki terpaksa ke badan jalan",
    deskripsi: "Trotoar sepanjang 200 meter dalam kondisi rusak berat. Banyak lubang dan paving block yang terangkat. Pejalan kaki terpaksa berjalan di badan jalan yang berbahaya.",
    kategori: "infrastruktur",
    lokasi: "Depok",
    waktu: "4 hari lalu",
    status: "diproses",
    upvote: 980,
    fotoCount: 4,
    pelapor: { nama: "Joko S.", inisial: "JS" },
    komentar: [
      { id: "k1", nama: "Kartika L.", inisial: "KL", waktu: "3j", teks: "Ibu-ibu dengan stroller dan lansia sangat kesulitan lewat sini.", upvote: 9 },
      { id: "k2", nama: "Lukman H.", inisial: "LH", waktu: "6j", teks: "Sudah lama begini tapi tidak ada yang memperbaiki.", upvote: 4 },
    ],
    tindakLanjut: [],
  },
];