"use client";

import { useState, useMemo, useEffect } from "react";
import { FileText } from "lucide-react";
import SearchAndFilter, { type FilterState } from "@/components/admin/Laporan/SearchAndFilter";
import StatusTabs, { type TabValue } from "@/components/admin/Laporan/StatusTabs";
import LaporanCard from "@/components/admin/Laporan/LaporanCard";
import DetailModal from "@/components/admin/Laporan/DetailModal";
import RejectModal from "@/components/admin/Laporan/RejectModal";
import Pagination from "@/components/admin/Laporan/Pagination";
import type { AdminLaporan, AdminLaporanStatus, LaporanKategori, LaporanPriority } from "@/components/admin/Laporan/types";
import { getReports, updateReportStatus, type Report } from "@/lib/reports";

// ── Adapter: Report (backend) → AdminLaporan (komponen) ───────────
function toAdminLaporan(r: Report): AdminLaporan {
    const namaArr = r.user_name?.split(" ") ?? ["U"]
    const inisial = namaArr.slice(0, 2).map((n: string) => n[0]).join("").toUpperCase()

    // Normalisasi kategori backend → LaporanKategori
    const kategoriMap: Record<string, LaporanKategori> = {
        "1": "infrastruktur",
        "2": "fasilitas-umum",
        "3": "kebersihan",
        "4": "lalu-lintas",
    }

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
        pelapor: {
            nama: r.user_name ?? "Unknown",
            inisial,
            email: "-",
        },
        createdAt: new Date(r.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }),
        upvote: 0,
        komentarCount: 0,
    }
}

const ITEMS_PER_PAGE = 6
const PRIORITY_RANK = { urgent: 4, high: 3, medium: 2, low: 1 }

export default function AdminLaporanPage() {
    const [laporan, setLaporan] = useState<AdminLaporan[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [tab, setTab] = useState<TabValue>("all")
    const [filter, setFilter] = useState<FilterState>({
        search: "",
        kategori: "all",
        priority: "all",
        sortBy: "newest",
    })
    const [page, setPage] = useState(1)
    const [detailFor, setDetailFor] = useState<AdminLaporan | null>(null)
    const [rejectFor, setRejectFor] = useState<AdminLaporan | null>(null)

    // ── Fetch dari backend ─────────────────────────────────────────
    useEffect(() => {
        async function fetchLaporan() {
            try {
                setLoading(true)
                const data = await getReports({ sort: "newest" })
                setLaporan(data.map(toAdminLaporan))
            } catch {
                setError("Gagal memuat data laporan")
            } finally {
                setLoading(false)
            }
        }
        fetchLaporan()
    }, [])

    // ── Filter & sort (client-side) ────────────────────────────────
    const filtered = useMemo(() => {
        let result = [...laporan]

        if (tab !== "all") result = result.filter((l) => l.status === tab)

        if (filter.search) {
            const q = filter.search.toLowerCase()
            result = result.filter(
                (l) =>
                    l.judul.toLowerCase().includes(q) ||
                    l.deskripsi.toLowerCase().includes(q) ||
                    l.pelapor.nama.toLowerCase().includes(q) ||
                    l.id.toLowerCase().includes(q)
            )
        }

        if (filter.kategori !== "all") result = result.filter((l) => l.kategori === filter.kategori)
        if (filter.priority !== "all") result = result.filter((l) => l.priority === filter.priority)

        if (filter.sortBy === "oldest") result = result.reverse()
        if (filter.sortBy === "urgent") {
            result.sort((a, b) => PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority])
        }

        return result
    }, [laporan, tab, filter])

    const counts: Record<TabValue, number> = useMemo(() => {
        let base = laporan
        if (filter.search) {
            const q = filter.search.toLowerCase()
            base = base.filter(
                (l) =>
                    l.judul.toLowerCase().includes(q) ||
                    l.deskripsi.toLowerCase().includes(q) ||
                    l.pelapor.nama.toLowerCase().includes(q) ||
                    l.id.toLowerCase().includes(q)
            )
        }
        if (filter.kategori !== "all") base = base.filter((l) => l.kategori === filter.kategori)
        if (filter.priority !== "all") base = base.filter((l) => l.priority === filter.priority)

        return {
            all: base.length,
            pending: base.filter((l) => l.status === "pending").length,
            approved: base.filter((l) => l.status === "approved").length,
            on_progress: base.filter((l) => l.status === "on_progress").length,
            completed: base.filter((l) => l.status === "completed").length,
            rejected: base.filter((l) => l.status === "rejected").length,
        }
    }, [laporan, filter])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(page, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE
    )

    // ── Handlers ──────────────────────────────────────────────────
    const handleAction = async (
        id: string,
        action: { type: "approve" | "rejectAsk" | "update"; status?: AdminLaporanStatus }
    ) => {
        if (action.type === "rejectAsk") {
            const target = laporan.find((l) => l.id === id)
            if (target) setRejectFor(target)
            return
        }

        try {
            if (action.type === "approve") {
                await updateReportStatus(Number(id), "approved")
                setLaporan((prev) =>
                    prev.map((l) => (l.id === id ? { ...l, status: "approved" } : l))
                )
            }
            if (action.type === "update" && action.status) {
                await updateReportStatus(Number(id), action.status)
                setLaporan((prev) =>
                    prev.map((l) => (l.id === id ? { ...l, status: action.status! } : l))
                )
            }
        } catch (err) {
            console.error("Gagal update status:", err)
        }
    }

    const handleConfirmReject = async (alasan: string) => {
        if (!rejectFor) return
        try {
            await updateReportStatus(Number(rejectFor.id), "rejected")
            setLaporan((prev) =>
                prev.map((l) =>
                    l.id === rejectFor.id
                        ? { ...l, status: "rejected", rejectReason: alasan }
                        : l
                )
            )
            setRejectFor(null)
        } catch (err) {
            console.error("Gagal reject laporan:", err)
        }
    }

    const handleTabChange = (v: TabValue) => { setTab(v); setPage(1) }
    const handleFilterChange = (f: FilterState) => { setFilter(f); setPage(1) }

    // ── Render states ──────────────────────────────────────────────
    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
            <p style={{ fontSize: "0.85rem", color: "#a8856b" }}>Memuat laporan...</p>
        </div>
    )

    if (error) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
            <p style={{ fontSize: "0.85rem", color: "#C0392B" }}>{error}</p>
        </div>
    )

    return (
        <div style={{ padding: "32px 32px 64px", maxWidth: 1180, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: 22, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #FFF5EE 0%, #FFEDE0 100%)", border: "0.5px solid rgba(255,107,53,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#E8541C", flexShrink: 0 }}>
                        <FileText size={19} strokeWidth={1.8} />
                    </div>
                    <div>
                        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.65rem", fontWeight: 800, color: "#1a0e08", letterSpacing: "-0.03em", margin: 0, marginBottom: 4 }}>
                            Manajemen Laporan
                        </h1>
                        <p style={{ fontSize: "0.82rem", color: "#a8856b", margin: 0 }}>
                            Kelola, verifikasi, dan tindak lanjuti laporan yang masuk
                        </p>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "white", border: "0.5px solid #f0e6dc", borderRadius: 10, padding: "10px 16px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#a8856b" }}>Total:</span>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#1a0e08", letterSpacing: "-0.02em", lineHeight: 1 }}>
                        {filtered.length}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "#a8856b" }}>laporan</span>
                </div>
            </div>

            <SearchAndFilter filter={filter} onChange={handleFilterChange} />
            <StatusTabs active={tab} onChange={handleTabChange} counts={counts} />

            {paginated.length === 0 ? (
                <div style={{ background: "white", border: "0.5px solid #f0e6dc", borderRadius: 14, padding: "72px 24px", textAlign: "center" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,107,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                        <FileText size={24} color="#E8541C" strokeWidth={1.8} />
                    </div>
                    <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a0e08", marginBottom: 4 }}>
                        Tidak ada laporan ditemukan
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "#a8856b" }}>
                        Coba ubah filter atau kata kunci pencarian
                    </p>
                </div>
            ) : (
                <div>
                    {paginated.map((l, i) => (
                        <LaporanCard
                            key={l.id}
                            laporan={l}
                            index={i}
                            onClick={setDetailFor}
                            onAction={handleAction}
                        />
                    ))}
                </div>
            )}

            <Pagination
                page={safePage}
                totalPages={totalPages}
                totalItems={filtered.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setPage}
            />

            <DetailModal
                laporan={detailFor}
                onClose={() => setDetailFor(null)}
                onAction={handleAction}
            />
            <RejectModal
                laporan={rejectFor}
                onClose={() => setRejectFor(null)}
                onConfirm={handleConfirmReject}
            />
        </div>
    )
}