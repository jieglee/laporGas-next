export type NotifTipe =
  | "status_update"
  | "tindak_lanjut"
  | "verifikasi"
  | "ditolak"
  | "upvote"
  | "komentar"
  | "reply"
  | "nearby"
  | "sistem";

export type NotifGrup = "laporan" | "sosial" | "sistem";

export interface Notif {
  id: string;
  tipe: NotifTipe;
  grup: NotifGrup;
  dibaca: boolean;
  waktu: string;
  judul: string;
  deskripsi: string;
  laporanId?: string;
  laporanJudul?: string;
  aktorInisial?: string;
  statusBaru?: string;
  statusLama?: string;
}

export const MOCK_NOTIF: Notif[] = [
  {
    id: "n1",
    tipe: "tindak_lanjut",
    grup: "laporan",
    dibaca: false,
    waktu: "2 menit lalu",
    judul: "Tindak lanjut resmi diterima",
    deskripsi: "Dinas PU Jakarta Selatan merespons laporan kamu dengan jadwal survei lapangan",
    laporanId: "1",
    laporanJudul: "Jalan berlubang di Jl. Sudirman KM 5",
  },
  {
    id: "n2",
    tipe: "status_update",
    grup: "laporan",
    dibaca: false,
    waktu: "1 jam lalu",
    judul: "Status laporan diperbarui",
    deskripsi: "Laporan kamu telah diproses oleh admin",
    laporanId: "1",
    laporanJudul: "Jalan berlubang di Jl. Sudirman KM 5",
    statusLama: "Menunggu",
    statusBaru: "Diproses",
  },
  {
    id: "n3",
    tipe: "verifikasi",
    grup: "laporan",
    dibaca: false,
    waktu: "3 jam lalu",
    judul: "Laporan berhasil diverifikasi",
    deskripsi: "Admin telah memverifikasi laporan dan diteruskan ke instansi terkait",
    laporanId: "2",
    laporanJudul: "Sampah menumpuk di pasar Minggu",
  },
  {
    id: "n4",
    tipe: "ditolak",
    grup: "laporan",
    dibaca: true,
    waktu: "kemarin",
    judul: "Laporan ditolak",
    deskripsi: "Laporan ditolak karena duplikat dengan laporan #1023 yang sudah ada",
    laporanId: "3",
    laporanJudul: "Lampu jalan padam Jl. Gatot Subroto",
  },
  {
    id: "n5",
    tipe: "upvote",
    grup: "sosial",
    dibaca: false,
    waktu: "5 menit lalu",
    judul: "24 orang mendukung laporan kamu",
    deskripsi: "Laporan kamu semakin ramai didukung warga sekitar",
    laporanId: "1",
    laporanJudul: "Jalan berlubang di Jl. Sudirman KM 5",
  },
  {
    id: "n6",
    tipe: "komentar",
    grup: "sosial",
    dibaca: false,
    waktu: "20 menit lalu",
    judul: "Anita S. mengomentari laporan kamu",
    deskripsi: "\"Tiap hari lewat sini, sudah ada yang jatuh kemarin malam karena tidak kelihatan.\"",
    laporanId: "1",
    laporanJudul: "Jalan berlubang di Jl. Sudirman KM 5",
    aktorInisial: "AS",
  },
  {
    id: "n7",
    tipe: "reply",
    grup: "sosial",
    dibaca: true,
    waktu: "2 jam lalu",
    judul: "Budi W. membalas komentar kamu",
    deskripsi: "\"Setuju banget, ini sudah sangat membahayakan warga sekitar\"",
    laporanId: "1",
    aktorInisial: "BW",
  },
  {
    id: "n8",
    tipe: "nearby",
    grup: "sistem",
    dibaca: true,
    waktu: "30 menit lalu",
    judul: "3 laporan baru di sekitarmu",
    deskripsi: "Ada laporan baru dalam radius 1km yang mungkin relevan",
  },
  {
    id: "n9",
    tipe: "sistem",
    grup: "sistem",
    dibaca: true,
    waktu: "2 hari lalu",
    judul: "Fitur Explore kini tersedia",
    deskripsi: "LaporGas kini hadir dengan fitur Explore — temukan dan dukung laporan dari seluruh kota",
  },
];

export const NOTIF_ICON_CONFIG: Record<NotifTipe, { bg: string; color: string; icon: string }> = {
  status_update: { bg: "rgba(245, 158, 11, 0.1)", color: "#F59E0B", icon: "refresh" },
  tindak_lanjut: { bg: "rgba(14, 165, 233, 0.1)", color: "#0EA5E9", icon: "building" },
  verifikasi: { bg: "rgba(16, 185, 129, 0.1)", color: "#10B981", icon: "check" },
  ditolak: { bg: "rgba(239, 68, 68, 0.1)", color: "#EF4444", icon: "x" },
  upvote: { bg: "rgba(249, 115, 22, 0.1)", color: "#F97316", icon: "upvote" },
  komentar: { bg: "rgba(139, 92, 246, 0.1)", color: "#A78BFA", icon: "comment" },
  reply: { bg: "rgba(139, 92, 246, 0.1)", color: "#A78BFA", icon: "reply" },
  nearby: { bg: "rgba(168, 85, 247, 0.1)", color: "#A855F7", icon: "map" },
  sistem: { bg: "rgba(107, 114, 128, 0.1)", color: "#6B7280", icon: "bell" },
};

export const GRUP_CONFIG: Record<NotifGrup, { label: string; desc: string; icon: string }> = {
  laporan: { label: "Laporan",          desc: "Update status, verifikasi & tindak lanjut", icon: "ti-file-description" },
  sosial:  { label: "Aktivitas Sosial", desc: "Upvote, komentar & balasan",                icon: "ti-users" },
  sistem:  { label: "Sistem",           desc: "Info platform & laporan di sekitarmu",      icon: "ti-bell" },
};