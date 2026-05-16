"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, ThumbsUp, MessageCircle, FileText } from "lucide-react";
import type { LaporanStatus } from "@/types/laporan";


export interface NearbyReport {
    id: string;
    title: string;
    category: string;
    location: string;
    distance: string; // e.g. "250m"
    status: LaporanStatus;
    thumbnail?: string;
    upvotes: number;
    comments: number;
}

interface NearbySectionProps {
    reports: NearbyReport[];
}

export default function NearbySection({ reports }: NearbySectionProps) {
    return (
        <section className="space-y-4">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-neutral-900 md:text-xl">
                        Di sekitar kamu
                    </h2>
                    <p className="text-sm text-neutral-500">
                        Laporan terbaru dari lokasi terdekat
                    </p>
                </div>
                <Link
                    href="/user/explore"
                    className="group inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                    Lihat semua
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
            </header>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reports.map((report) => (
                    <NearbyCard key={report.id} report={report} />
                ))}
            </div>
        </section>
    );
}

function NearbyCard({ report }: { report: NearbyReport }) {
    return (
        <Link
            href={`/user/laporan/${report.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-300 hover:shadow-sm"
        >
            <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100">
                {report.thumbnail ? (
                    <Image
                        src={report.thumbnail}
                        alt={report.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-neutral-300">
                        <FileText className="h-10 w-10" />
                    </div>
                )}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-700 backdrop-blur">
                    <MapPin className="h-3 w-3 text-orange-500" />
                    {report.distance}
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="text-xs font-medium uppercase tracking-wide text-orange-600">
                    {report.category}
                </span>
                <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900">
                    {report.title}
                </h3>
                <p className="line-clamp-1 text-xs text-neutral-500">
                    {report.location}
                </p>
                <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-neutral-500">
                    <span className="inline-flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {report.upvotes}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {report.comments}
                    </span>
                </div>
            </div>
        </Link>
    );
}