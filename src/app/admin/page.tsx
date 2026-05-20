"use client";

import { FileText, Clock, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import HeroSection from "@/components/admin/Dashboard/HeroSection";
import StatCard from "@/components/admin/Dashboard/StatCard";
import UrgentReports, { type AdminLaporan } from "@/components/admin/Dashboard/UrgentReports";
import StatisticsChart, { type ChartData } from "@/components/admin/Dashboard/StatisticsChart";
import { useSession } from "next-auth/react";

// ── Data sementara — nanti ganti ke real fetch ────────────────────────────────

const LAPORAN: AdminLaporan[] = [
  { id: "AL-001", judul: "Jalan berlubang di Jl. Sudirman KM 5",  kategori: "infrastruktur",  status: "pending",     priority: "urgent", lokasi: "Jakarta Selatan", pelapor: { nama: "Rizky Hidayat", inisial: "RH" }, createdAt: "2 menit lalu" },
  { id: "AL-002", judul: "Sampah menumpuk di pasar Minggu",        kategori: "kebersihan",     status: "approved",    priority: "high",   lokasi: "Jakarta Selatan", pelapor: { nama: "Dewi Rahayu",   inisial: "DR" }, createdAt: "1 hari lalu" },
  { id: "AL-003", judul: "Lampu jalan padam Jl. Gatot Subroto",    kategori: "fasilitas-umum", status: "on_progress", priority: "high",   lokasi: "Jakarta Pusat",   pelapor: { nama: "Hendra K.",     inisial: "HK" }, createdAt: "3 hari lalu" },
  { id: "AL-004", judul: "Trotoar rusak di Jl. Margonda",          kategori: "infrastruktur",  status: "completed",   priority: "medium", lokasi: "Depok",           pelapor: { nama: "Joko S.",       inisial: "JS" }, createdAt: "1 minggu lalu" },
  { id: "AL-005", judul: "Macet parah simpang Margonda",           kategori: "lalu-lintas",    status: "pending",     priority: "high",   lokasi: "Depok",           pelapor: { nama: "Maya P.",       inisial: "MP" }, createdAt: "4 jam lalu" },
  { id: "AL-006", judul: "Pohon tumbang halangi jalan",            kategori: "infrastruktur",  status: "on_progress", priority: "urgent", lokasi: "Jakarta Barat",   pelapor: { nama: "Tono W.",       inisial: "TW" }, createdAt: "6 jam lalu" },
];

const CHART_DATA: ChartData = {
  perHari: [
    { label: "Sen", value: 12 },
    { label: "Sel", value: 18 },
    { label: "Rab", value: 15 },
    { label: "Kam", value: 22 },
    { label: "Jum", value: 28 },
    { label: "Sab", value: 19 },
    { label: "Min", value: 24 },
  ],
  perStatus: [
    { label: "Pending",     value: 8,  color: "#FBBF24" },
    { label: "Approved",    value: 12, color: "#3B82F6" },
    { label: "On Progress", value: 15, color: "#FB923C" },
    { label: "Completed",   value: 24, color: "#10B981" },
    { label: "Rejected",    value: 3,  color: "#EF4444" },
  ],
};

const PRIORITY_RANK = { urgent: 4, high: 3, medium: 2, low: 1 };

export default function AdminDashboardPage() {
  const stats = {
    total:      LAPORAN.length,
    pending:    LAPORAN.filter((l) => l.status === "pending").length,
    onProgress: LAPORAN.filter((l) => l.status === "on_progress").length,
    completed:  LAPORAN.filter((l) => l.status === "completed").length,
    urgent:     LAPORAN.filter(
      (l) => l.priority === "urgent" && l.status !== "completed" && l.status !== "rejected"
    ).length,
  };

  // Urgent yang belum kelar — diurutin priority
  const urgent = LAPORAN
    .filter((l) => l.priority === "urgent" && l.status !== "completed" && l.status !== "rejected")
    .sort((a, b) => PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority]);

    const { data: session, status } = useSession();

   if (status === "loading") {
      return null;
   }

  return (
    <div style={{ padding: "32px 32px 64px", maxWidth: 1280, margin: "0 auto" }}>
       {session?.user?.role === "superadmin" ? (
            <h1>Superadmin Dashboard</h1>
         ) : (
            <h1>Admin Dashboard</h1>
         )}

      {/* 1. HERO SECTION */}
      <HeroSection pendingCount={stats.pending} urgentCount={stats.urgent} />

      {/* 2. STATS CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
          marginBottom: 32,
        }}
      >
        <StatCard
          index={0}
          label="Total laporan"
          value={stats.total}
          icon={FileText}
          delta={{ value: "12% minggu ini", positive: true }}
        />
        <StatCard
          index={1}
          label="Pending review"
          value={stats.pending}
          icon={Clock}
          highlight={stats.pending > 0}
        />
        <StatCard
          index={2}
          label="Sedang diproses"
          value={stats.onProgress}
          icon={TrendingUp}
        />
        <StatCard
          index={3}
          label="Selesai"
          value={stats.completed}
          icon={CheckCircle2}
          delta={{ value: "67% rate", positive: true }}
        />
        <StatCard
          index={4}
          label="Prioritas urgent"
          value={stats.urgent}
          icon={AlertTriangle}
          highlight={stats.urgent > 0}
        />
      </div>

      {/* 3. URGENT REPORTS */}
      <UrgentReports laporan={urgent} limit={5} />

      {/* 4. STATISTICS CHART */}
      <StatisticsChart data={CHART_DATA} />
    </div>
  );
}