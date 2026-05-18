"use client";

import { FileText, Shield, UserCheck, Users } from "lucide-react";
import HeroSection from "@/components/superadmin/Dashboard/HeroSection";
import StatCard from "@/components/superadmin/Dashboard/StatCard";
import StatisticsChart from "@/components/superadmin/Dashboard/StatisticsChart";
import ActiveUsers from "@/components/superadmin/Dashboard/ActiveUsers";
import UrgentReports from "@/components/superadmin/Dashboard/UrgentReports";
import { systemStats } from "@/lib/mock-superadmin";

export default function SuperadminDashboardPage() {
  return (
    <div className="space-y-6">
      <HeroSection />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total User"
          value={systemStats.totalUsers}
          growth={systemStats.growthUsers}
          icon={Users}
          accent="red"
        />
        <StatCard
          label="Total Admin"
          value={systemStats.totalAdmins}
          growth={systemStats.growthAdmins}
          icon={Shield}
          accent="neutral"
        />
        <StatCard
          label="Total Laporan"
          value={systemStats.totalLaporan}
          growth={systemStats.growthLaporan}
          icon={FileText}
          accent="amber"
        />
        <StatCard
          label="User Aktif Hari Ini"
          value={systemStats.activeUsersToday}
          growth={systemStats.growthActive}
          icon={UserCheck}
          accent="emerald"
        />
      </div>

      {/* Main grid: active users + urgent */}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:items-stretch">
        <div className="lg:col-span-2">
          <ActiveUsers />
        </div>
        <div className="min-h-0">
          <UrgentReports />
        </div>
      </div>

      {/* Chart full width */}
      <StatisticsChart />
    </div>
  );
}