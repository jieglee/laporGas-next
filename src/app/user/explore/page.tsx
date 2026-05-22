"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

    useEffect(() => {
        async function fetchReports() {
            try {
                setLoading(true);
                const data = await getReports({ sort: "newest" });
                setReports(data);
            } catch (error) {
                console.error("Failed fetch explore reports:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchReports();
    }, []);

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
        <div style={{ padding: "28px 24px 72px", maxWidth: 1200, margin: "0 auto" }}>
            <ExploreHeader
                search={search}
                onSearch={setSearch}
                kategori={kategori}
                onKategori={setKategori}
                totalCount={filtered.length}
            />

            {loading ? (
                <div style={{ background: "white", border: "0.5px solid #f0e6dc", borderRadius: 14, padding: "80px 24px", textAlign: "center" }}>
                    <p style={{ color: "#a8856b", fontSize: "0.85rem" }}>Memuat laporan...</p>
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    {filtered.length === 0 ? (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ background: "white", border: "0.5px solid #f0e6dc", borderRadius: 14, padding: "80px 24px", textAlign: "center" }}>
                            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,107,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                                <Search size={22} color="#E8541C" strokeWidth={1.8} />
                            </div>
                            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a0e08", marginBottom: 5 }}>Tidak ada laporan ditemukan</p>
                            <p style={{ fontSize: "0.78rem", color: "#a8856b" }}>Coba ubah kata kunci atau kategori</p>
                        </motion.div>
                    ) : (
                        <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
                            {filtered.map((report, i) => (
                                <ReportCard key={report.id} report={report} index={i} variant="status" />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}