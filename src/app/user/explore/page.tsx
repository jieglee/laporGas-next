"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Map, LayoutGrid } from "lucide-react";
import ExploreHeader from "@/components/user/Explore/ExploreHeader";
import ReportCard from "@/components/common-ui/ReportCard";
import { type ExploreKategori } from "@/components/user/Explore/types";
import { getReports, type Report } from "@/lib/reports";
import dynamic from "next/dynamic";

const ExploreMap = dynamic(() => import("@/components/user/Explore/ExploreMap"), {
    ssr: false,
    loading: () => (
        <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-2xl h-[600px] flex items-center justify-center">
            <p className="text-[0.85rem] text-[#a8856b]">Memuat peta...</p>
        </div>
    ),
});

function mapKategori(name: string | null): Exclude<ExploreKategori, "all"> {
    switch (name?.toLowerCase()) {
        case "infrastruktur":  return "infrastruktur";
        case "fasilitas umum": return "fasilitas-umum";
        case "kebersihan":     return "kebersihan";
        case "lalu lintas":    return "lalu-lintas";
        default:               return "infrastruktur";
    }
}

export default function ExplorePage() {
    const [search, setSearch] = useState("");
    const [kategori, setKategori] = useState<ExploreKategori>("all");
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

    useEffect(() => {
        async function fetchReports() {
            try {
                setLoading(true);
                setShow(false);
                const data = await getReports({ sort: "newest" });
                setReports(data);
            } catch (error) {
                console.error("Failed fetch explore reports:", error);
            } finally {
                setLoading(false);
                requestAnimationFrame(() => setShow(true));
            }
        }
        fetchReports();
    }, []);

    useEffect(() => {
        setShow(false);
        const t = setTimeout(() => setShow(true), 50);
        return () => clearTimeout(t);
    }, [search, kategori]);

    const filtered = useMemo(() => {
        let result = [...reports];
        if (kategori !== "all") {
            result = result.filter((r) => mapKategori(r.category_name) === kategori);
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (r) =>
                    (r.title ?? "").toLowerCase().includes(q) ||
                    (r.description ?? "").toLowerCase().includes(q) ||
                    (r.location ?? "").toLowerCase().includes(q) ||
                    (r.user_name ?? "").toLowerCase().includes(q)
            );
        }
        return result;
    }, [search, kategori, reports]);

    return (
        <div className="px-6 pt-7 pb-[72px] max-w-[1200px] mx-auto">
            <ExploreHeader
                search={search}
                onSearch={setSearch}
                kategori={kategori}
                onKategori={setKategori}
                totalCount={filtered.length}
            />

            {/* View toggle */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-[0.78rem] text-[#a8856b]">
                    {filtered.length} laporan ditemukan
                </p>
                <div className="flex items-center gap-1 bg-[#fafaf8] border border-[#f0e6dc] rounded-xl p-1">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.75rem] font-semibold transition-all cursor-pointer border-0",
                            viewMode === "grid"
                                ? "bg-white text-[#E8541C] shadow-sm"
                                : "text-[#a8856b] bg-transparent"
                        )}
                    >
                        <LayoutGrid size={14} strokeWidth={2} />
                        Grid
                    </button>
                    <button
                        onClick={() => setViewMode("map")}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.75rem] font-semibold transition-all cursor-pointer border-0",
                            viewMode === "map"
                                ? "bg-white text-[#E8541C] shadow-sm"
                                : "text-[#a8856b] bg-transparent"
                        )}
                    >
                        <Map size={14} strokeWidth={2} />
                        Peta
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] py-[80px] px-6 text-center">
                    <p className="text-[#a8856b] text-[0.85rem]">Memuat laporan...</p>
                </div>
            ) : viewMode === "map" ? (
                <ExploreMap reports={filtered} />
            ) : filtered.length === 0 ? (
                <div className={cn(
                    "bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] py-[80px] px-6 text-center transition-opacity duration-200",
                    show ? "opacity-100" : "opacity-0"
                )}>
                    <div className="w-[52px] h-[52px] rounded-full bg-[rgba(255,107,53,0.08)] flex items-center justify-center mx-auto mb-[14px]">
                        <Search size={22} color="#E8541C" strokeWidth={1.8} />
                    </div>
                    <p className="text-[0.9rem] font-semibold text-[#1a0e08] mb-[5px]">Tidak ada laporan ditemukan</p>
                    <p className="text-[0.78rem] text-[#a8856b]">Coba ubah kata kunci atau kategori</p>
                </div>
            ) : (
                <div className={cn(
                    "grid gap-[14px] transition-opacity duration-200 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]",
                    show ? "opacity-100" : "opacity-0"
                )}>
                    {filtered.map((report, i) => (
                        <ReportCard key={report.id} report={report} index={i} variant="status" />
                    ))}
                </div>
            )}
        </div>
    );
}