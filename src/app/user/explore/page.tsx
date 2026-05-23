"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import ExploreHeader from "@/components/user/Explore/ExploreHeader";
import ReportCard from "@/components/common-ui/ReportCard";
import { type ExploreKategori } from "@/components/user/Explore/types";
import { getReports, type Report } from "@/lib/reports";

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

    // Re-trigger fade on filter change
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

            {loading ? (
                <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] py-[80px] px-6 text-center">
                    <p className="text-[#a8856b] text-[0.85rem]">Memuat laporan...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div
                    className={cn(
                        "bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] py-[80px] px-6 text-center transition-opacity duration-200",
                        show ? "opacity-100" : "opacity-0"
                    )}
                >
                    <div className="w-[52px] h-[52px] rounded-full bg-[rgba(255,107,53,0.08)] flex items-center justify-center mx-auto mb-[14px]">
                        <Search size={22} color="#E8541C" strokeWidth={1.8} />
                    </div>
                    <p className="text-[0.9rem] font-semibold text-[#1a0e08] mb-[5px]">Tidak ada laporan ditemukan</p>
                    <p className="text-[0.78rem] text-[#a8856b]">Coba ubah kata kunci atau kategori</p>
                </div>
            ) : (
                <div
                    className={cn(
                        "grid gap-[14px] transition-opacity duration-200 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]",
                        show ? "opacity-100" : "opacity-0"
                    )}
                >
                    {filtered.map((report, i) => (
                        <ReportCard key={report.id} report={report} index={i} variant="status" />
                    ))}
                </div>
            )}
        </div>
    );
}