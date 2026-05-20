"use client";

import { useEffect, useMemo, useState } from "react";

import HeroSection from "@/components/user/Home/HeroSection";
import CategorySection from "@/components/user/Home/CategorySection";

import TrendingSection, {
  type TrendingReport,
} from "@/components/user/Home/Trendingsection";

import NearbySection, {
  type NearbyReport,
} from "@/components/user/Home/NearbySection";

import LaporanSelesaiSection from "@/components/landing/Laporanselesaisection";
import CtaSection from "@/components/user/Home/Ctasection";

import { getReports, type Report } from "@/lib/reports";

function mapStatus(status: string) {
  switch (status) {
    case "approved":
      return "approved";

    case "on_progress":
      return "onProgress";

    case "completed":
      return "completed";

    case "rejected":
      return "rejected";

    default:
      return "pending";
  }
}

export default function UserHomePage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);

        const data = await getReports();

        setReports(data);
      } catch (error) {
        console.error("Failed fetch home reports:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  const trendingReports: TrendingReport[] = useMemo(() => {
    return reports
      .slice(0, 3)
      .map((report) => ({
        id: String(report.id),

        title: report.title,

        category: report.category_name,

        location: report.location || "Lokasi tidak diketahui",

        status: mapStatus(report.status),

        // sementara dummy
        upvotes: Math.floor(Math.random() * 500),
      }));
  }, [reports]);

  const nearbyReports: NearbyReport[] = useMemo(() => {
    return reports
      .slice(0, 3)
      .map((report) => ({
        id: String(report.id),

        title: report.title,

        category: report.category_name,

        location: report.location || "Lokasi tidak diketahui",

        distance: "1 km",

        status: mapStatus(report.status),

        thumbnail: report.image_url || undefined,

        // sementara dummy
        upvotes: Math.floor(Math.random() * 300),

        comments: Math.floor(Math.random() * 50),
      }));
  }, [reports]);

  return (
    <div className="space-y-10 px-4 py-6 md:px-8 md:py-10">
      <HeroSection />

      {loading ? (
        <div className="text-center py-10 text-sm text-neutral-500">
          Loading laporan...
        </div>
      ) : (
        <>
          <NearbySection reports={nearbyReports} />

          <CategorySection />

          <TrendingSection reports={trendingReports} />
        </>
      )}

      <LaporanSelesaiSection />

      <CtaSection />
    </div>
  );
}