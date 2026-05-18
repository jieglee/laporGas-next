// Mock data untuk dashboard superadmin

export const systemStats = {
  totalUsers: 12847,
  totalAdmins: 24,
  totalLaporan: 3421,
  activeUsersToday: 1284,
  pendingLaporan: 47,
  resolvedLaporan: 2891,
  growthUsers: 12.4, // %
  growthLaporan: 8.7,
  growthAdmins: 4.2,
  growthActive: -2.1,
};

export const laporanTrend = [
  { month: "Jan", masuk: 240, selesai: 198 },
  { month: "Feb", masuk: 312, selesai: 267 },
  { month: "Mar", masuk: 289, selesai: 245 },
  { month: "Apr", masuk: 378, selesai: 321 },
  { month: "Mei", masuk: 421, selesai: 389 },
  { month: "Jun", masuk: 467, selesai: 412 },
  { month: "Jul", masuk: 523, selesai: 478 },
];

export type ActiveUser = {
  id: string;
  nama: string;
  email: string;
  role: "user" | "admin" | "superadmin";
  laporanCount: number;
  avatarUrl?: string;
  lastActive: string;
};

export const activeUsers: ActiveUser[] = [
  {
    id: "u1",
    nama: "Rangga Setiawan",
    email: "rangga.s@gmail.com",
    role: "user",
    laporanCount: 47,
    lastActive: "2 menit lalu",
  },
  {
    id: "u2",
    nama: "Dwi Anggraeni",
    email: "dwi.anggraeni@gmail.com",
    role: "admin",
    laporanCount: 312,
    lastActive: "5 menit lalu",
  },
  {
    id: "u3",
    nama: "Fajar Nugroho",
    email: "fajar.n@gmail.com",
    role: "user",
    laporanCount: 38,
    lastActive: "12 menit lalu",
  },
  {
    id: "u4",
    nama: "Sinta Maharani",
    email: "sinta.m@gmail.com",
    role: "user",
    laporanCount: 29,
    lastActive: "18 menit lalu",
  },
  {
    id: "u5",
    nama: "Bagas Pratama",
    email: "bagas.pratama@gmail.com",
    role: "admin",
    laporanCount: 287,
    lastActive: "23 menit lalu",
  },
];

export type UrgentLaporan = {
  id: string;
  judul: string;
  kategori: string;
  lokasi: string;
  waktu: string;
  status: "menunggu" | "diproses";
  prioritas: "tinggi" | "kritis";
};

export const urgentLaporan: UrgentLaporan[] = [
  {
    id: "L-1024",
    judul: "Kebocoran pipa air besar di Jl. Margonda Raya",
    kategori: "Infrastruktur",
    lokasi: "Depok, Beji",
    waktu: "8 menit lalu",
    status: "menunggu",
    prioritas: "kritis",
  },
  {
    id: "L-1023",
    judul: "Pohon tumbang menutup akses jalan",
    kategori: "Lingkungan",
    lokasi: "Depok, Cinere",
    waktu: "25 menit lalu",
    status: "menunggu",
    prioritas: "tinggi",
  },
  {
    id: "L-1022",
    judul: "Lampu jalan padat lalu lintas mati total",
    kategori: "Infrastruktur",
    lokasi: "Depok, Sukmajaya",
    waktu: "1 jam lalu",
    status: "diproses",
    prioritas: "tinggi",
  },
  {
    id: "L-1021",
    judul: "Genangan air dalam akibat saluran tersumbat",
    kategori: "Lingkungan",
    lokasi: "Depok, Pancoran Mas",
    waktu: "2 jam lalu",
    status: "diproses",
    prioritas: "tinggi",
  },
];