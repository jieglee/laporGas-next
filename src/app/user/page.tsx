"use client";

import { useEffect, useMemo, useState } from "react";
import HeroSection from "@/components/user/Home/HeroSection";
import CategorySection from "@/components/user/Home/CategorySection";
import TrendingSection from "@/components/user/Home/Trendingsection";
import NearbySection from "@/components/user/Home/NearbySection";
import LaporanSelesaiSection from "@/components/landing/Laporanselesaisection";
import CtaSection from "@/components/user/Home/Ctasection";
import { getReports, type Report } from "@/lib/reports";

export default function UserHomePage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReports() {
            try {
                setLoading(true);
                const data = await getReports({ sort: "newest" });
                setReports(data);
            } catch (error) {
                console.error("Failed fetch home reports:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchReports();
    }, []);

    const nearbyReports = useMemo(() => reports.slice(0, 3), [reports]);

    const trendingReports = useMemo(() =>
        [...reports]
            .sort((a, b) => (b.comment_count ?? 0) - (a.comment_count ?? 0))
            .slice(0, 5),
        [reports]
    );

    return (
        <div className="space-y-10 px-4 py-6 md:px-8 md:py-10">
            <HeroSection />

            {loading ? (
                <div className="text-center py-10 text-sm text-neutral-500">
                    Memuat laporan...
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