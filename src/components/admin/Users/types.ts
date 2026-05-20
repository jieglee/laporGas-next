export type UserRole = "user" | "admin" | "superadmin";

export type ManagedUser = {
  id: string;
  nama: string;
  email: string;
  nomorHp: string;
  role: UserRole;
  status: "aktif" | "nonaktif";
  bergabung: string; // ISO date
  laporanCount: number;
  avatarUrl?: string;
};