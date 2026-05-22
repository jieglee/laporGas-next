"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Report } from "@/lib/reports";
import ReportCard from "@/components/common-ui/ReportCard";

interface NearbySectionProps {
    reports: Report[];
}

export default function NearbySection({ reports }: NearbySectionProps) {
    return (
        <section className="space-y-4">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-neutral-900 md:text-xl">
                        Di sekitar kamu
                    </h2>
                    <p className="text-sm text-neutral-500">Laporan terbaru dari lokasi terdekat</p>
                </div>
                <Link href="/user/explore" className="group inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700">
                    Lihat semua
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
            </header>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reports.map((report, i) => (
                    <ReportCard key={report.id} report={report} index={i} variant="nearby" distance="< 1 km" />
                ))}
            </div>
        </section>
    );
}