"use client";

import { useEffect, useState } from "react";
import { FileText, Clock, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import HeroSection from "@/components/admin/Dashboard/HeroSection";
import StatCard from "@/components/admin/Dashboard/StatCard";
import UrgentReports from "@/components/admin/Dashboard/UrgentReports";
import StatisticsChart, { type ChartData } from "@/components/admin/Dashboard/StatisticsChart";
import { useSession } from "next-auth/react";
import { getReports, type Report } from "@/lib/reports";

const PRIORITY_RANK = { urgent: 4, high: 3, medium: 2, low: 1 };

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        console.error("Gagal fetch laporan:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (status === "loading" || loading) return null;

  const stats = {
    total:      reports.length,
    pending:    reports.filter((r) => r.status === "pending").length,
    onProgress: reports.filter((r) => r.status === "on_progress").length,
    completed:  reports.filter((r) => r.status === "completed").length,
    urgent:     reports.filter((r) => r.priority === "urgent" && r.status !== "completed" && r.status !== "rejected").length,
  };

  const urgentReports = reports
    .filter((r) => r.priority === "urgent" && r.status !== "completed" && r.status !== "rejected")
    .sort((a, b) => PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority]);

  // Chart data dari real reports
  const statusCount = (s: string) => reports.filter((r) => r.status === s).length;

  const chartData: ChartData = {
    perHari: [
      { label: "Sen", value: 0 },
      { label: "Sel", value: 0 },
      { label: "Rab", value: 0 },
      { label: "Kam", value: 0 },
      { label: "Jum", value: 0 },
      { label: "Sab", value: 0 },
      { label: "Min", value: 0 },
    ].map((d, i) => ({
      ...d,
      value: reports.filter((r) => new Date(r.created_at).getDay() === (i + 1) % 7).length,
    })),
    perStatus: [
      { label: "Pending",     value: statusCount("pending"),     color: "#FBBF24" },
      { label: "Approved",    value: statusCount("approved"),    color: "#3B82F6" },
      { label: "On Progress", value: statusCount("on_progress"), color: "#FB923C" },
      { label: "Completed",   value: statusCount("completed"),   color: "#10B981" },
      { label: "Rejected",    value: statusCount("rejected"),    color: "#EF4444" },
    ],
  };

  return (
    <div className="px-8 pt-8 pb-16 max-w-[1280px] mx-auto">
      <HeroSection pendingCount={stats.pending} urgentCount={stats.urgent} />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[14px] mb-8">
        <StatCard index={0} label="Total laporan"    value={stats.total}      icon={FileText}      delta={{ value: "real data", positive: true }} />
        <StatCard index={1} label="Pending review"   value={stats.pending}    icon={Clock}         highlight={stats.pending > 0} />
        <StatCard index={2} label="Sedang diproses"  value={stats.onProgress} icon={TrendingUp} />
        <StatCard index={3} label="Selesai"          value={stats.completed}  icon={CheckCircle2} />
        <StatCard index={4} label="Prioritas urgent" value={stats.urgent}     icon={AlertTriangle} highlight={stats.urgent > 0} />
      </div>

      <UrgentReports reports={urgentReports} limit={5} />
      <StatisticsChart data={chartData} />
    </div>
  );
}