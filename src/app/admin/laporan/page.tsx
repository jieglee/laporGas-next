"use client";

import { useState, useMemo, useEffect } from "react";
import { FileText } from "lucide-react";
import SearchAndFilter, { type FilterState } from "@/components/admin/Laporan/SearchAndFilter";
import StatusTabs, { type TabValue } from "@/components/admin/Laporan/StatusTabs";
import LaporanCard from "@/components/admin/Laporan/LaporanCard";
import RejectModal from "@/components/admin/Laporan/RejectModal";
import Pagination from "@/components/admin/Laporan/Pagination";
import type { AdminLaporan, AdminLaporanStatus, LaporanKategori, LaporanPriority } from "@/components/admin/Laporan/types";
import { getReports, updateReportStatus, type Report } from "@/lib/reports";

function toAdminLaporan(r: Report): AdminLaporan {
    const namaArr = r.user_name?.split(" ") ?? ["U"];
    const inisial = namaArr.slice(0, 2).map((n: string) => n[0]).join("").toUpperCase();
    const kategoriMap: Record<string, LaporanKategori> = {
        "1": "infrastruktur", "2": "fasilitas-umum", "3": "kebersihan", "4": "lalu-lintas",
    };
    return {
        id: String(r.id),
        judul: r.title,
        deskripsi: r.description,
        kategori: (kategoriMap[String(r.category_id)] ?? "infrastruktur") as LaporanKategori,
        status: r.status as AdminLaporanStatus,
        priority: r.priority as LaporanPriority,
        lokasi: r.location ?? "-",
        alamat: r.location ?? "-",
        fotoCount: r.image_url ? 1 : 0,
        pelapor: { nama: r.user_name ?? "Unknown", inisial, email: "-" },
        createdAt: new Date(r.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        upvote: 0,
        komentarCount: 0,
        koordinat: r.latitude && r.longitude ? { lat: r.latitude, lng: r.longitude } : null,
    };
}

const ITEMS_PER_PAGE = 12;
const PRIORITY_RANK = { urgent: 4, high: 3, medium: 2, low: 1 };

export default function AdminLaporanPage() {
    const [laporan, setLaporan] = useState<AdminLaporan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tab, setTab] = useState<TabValue>("all");
    const [filter, setFilter] = useState<FilterState>({ search: "", kategori: "all", priority: "all", sortBy: "newest" });
    const [page, setPage] = useState(1);
    const [rejectFor, setRejectFor] = useState<AdminLaporan | null>(null);

    useEffect(() => {
        async function fetchLaporan() {
            try {
                setLoading(true);
                const data = await getReports({ sort: "newest" });
                setLaporan(data.map(toAdminLaporan));
            } catch {
                setError("Gagal memuat data laporan");
            } finally {
                setLoading(false);
            }
        }
        fetchLaporan();
    }, []);

    const filtered = useMemo(() => {
        let result = [...laporan];
        if (tab !== "all") result = result.filter((l) => l.status === tab);
        if (filter.search) {
            const q = filter.search.toLowerCase();
            result = result.filter((l) =>
                l.judul.toLowerCase().includes(q) ||
                l.deskripsi.toLowerCase().includes(q) ||
                l.pelapor.nama.toLowerCase().includes(q) ||
                l.id.toLowerCase().includes(q)
            );
        }
        if (filter.kategori !== "all") result = result.filter((l) => l.kategori === filter.kategori);
        if (filter.priority !== "all") result = result.filter((l) => l.priority === filter.priority);
        if (filter.sortBy === "oldest") result = result.reverse();
        if (filter.sortBy === "urgent") result.sort((a, b) => PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority]);
        return result;
    }, [laporan, tab, filter]);

    const counts: Record<TabValue, number> = useMemo(() => {
        let base = laporan;
        if (filter.search) {
            const q = filter.search.toLowerCase();
            base = base.filter((l) =>
                l.judul.toLowerCase().includes(q) ||
                l.deskripsi.toLowerCase().includes(q) ||
                l.pelapor.nama.toLowerCase().includes(q) ||
                l.id.toLowerCase().includes(q)
            );
        }
        if (filter.kategori !== "all") base = base.filter((l) => l.kategori === filter.kategori);
        if (filter.priority !== "all") base = base.filter((l) => l.priority === filter.priority);
        return {
            all: base.length,
            pending: base.filter((l) => l.status === "pending").length,
            approved: base.filter((l) => l.status === "approved").length,
            on_progress: base.filter((l) => l.status === "on_progress").length,
            completed: base.filter((l) => l.status === "completed").length,
            rejected: base.filter((l) => l.status === "rejected").length,
        };
    }, [laporan, filter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const safePage = Math.min(page, totalPages);
    const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

    const handleAction = async (id: string, action: { type: "approve" | "rejectAsk" | "update"; status?: AdminLaporanStatus }) => {
        if (action.type === "rejectAsk") {
            const target = laporan.find((l) => l.id === id);
            if (target) setRejectFor(target);
            return;
        }
        try {
            if (action.type === "approve") {
                await updateReportStatus(Number(id), "approved");
                setLaporan((prev) => prev.map((l) => (l.id === id ? { ...l, status: "approved" } : l)));
            }
            if (action.type === "update" && action.status) {
                await updateReportStatus(Number(id), action.status);
                setLaporan((prev) => prev.map((l) => (l.id === id ? { ...l, status: action.status! } : l)));
            }
        } catch (err) {
            console.error("Gagal update status:", err);
        }
    };

    const handleConfirmReject = async (alasan: string) => {
        if (!rejectFor) return;
        try {
            await updateReportStatus(Number(rejectFor.id), "rejected");
            setLaporan((prev) => prev.map((l) => l.id === rejectFor.id ? { ...l, status: "rejected", rejectReason: alasan } : l));
            setRejectFor(null);
        } catch (err) {
            console.error("Gagal reject laporan:", err);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[300px]">
            <p className="text-[0.85rem] text-[#a8856b]">Memuat laporan...</p>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-[300px]">
            <p className="text-[0.85rem] text-[#C0392B]">{error}</p>
        </div>
    );

    return (
        <div className="px-8 pt-8 pb-16 max-w-[1280px] mx-auto">

            {/* Header */}
            <div className="mb-[22px] flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-[14px]">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFF5EE] to-[#FFEDE0] border-[0.5px] border-[rgba(255,107,53,0.18)] flex items-center justify-center text-[#E8541C] shrink-0">
                        <FileText size={19} strokeWidth={1.8} />
                    </div>
                    <div>
                        <h1 className="text-[1.65rem] font-extrabold text-[#1a0e08] tracking-[-0.03em] m-0 mb-1"
                            style={{ fontFamily: "'Syne', sans-serif" }}>
                            Manajemen Laporan
                        </h1>
                        <p className="text-[0.82rem] text-[#a8856b] m-0">
                            Kelola, verifikasi, dan tindak lanjuti laporan yang masuk
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-[10px] bg-white border-[0.5px] border-[#f0e6dc] rounded-[10px] px-4 py-[10px]">
                    <span className="text-[0.75rem] text-[#a8856b]">Total:</span>
                    <span className="text-[1.05rem] font-extrabold text-[#1a0e08] tracking-[-0.02em] leading-none"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        {filtered.length}
                    </span>
                    <span className="text-[0.7rem] text-[#a8856b]">laporan</span>
                </div>
            </div>

            <SearchAndFilter filter={filter} onChange={(f) => { setFilter(f); setPage(1); }} />
            <StatusTabs active={tab} onChange={(v) => { setTab(v); setPage(1); }} counts={counts} />

            {/* Grid */}
            {paginated.length === 0 ? (
                <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] py-[72px] px-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[rgba(255,107,53,0.08)] flex items-center justify-center mx-auto mb-4">
                        <FileText size={24} color="#E8541C" strokeWidth={1.8} />
                    </div>
                    <p className="text-[0.9rem] font-semibold text-[#1a0e08] mb-1">Tidak ada laporan ditemukan</p>
                    <p className="text-[0.78rem] text-[#a8856b]">Coba ubah filter atau kata kunci pencarian</p>
                </div>
            ) : (
                <div className="grid gap-[14px]" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
                    {paginated.map((l, i) => (
                        <LaporanCard key={l.id} laporan={l} index={i} onAction={handleAction} />
                    ))}
                </div>
            )}

            <div className="mt-5">
                <Pagination
                    page={safePage}
                    totalPages={totalPages}
                    totalItems={filtered.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setPage}
                />
            </div>

            <RejectModal laporan={rejectFor} onClose={() => setRejectFor(null)} onConfirm={handleConfirmReject} />
        </div>
    );
}