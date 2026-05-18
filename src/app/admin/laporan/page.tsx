"use client";

import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import SearchAndFilter, { type FilterState } from "@/components/admin/Laporan/SearchAndFilter";
import StatusTabs, { type TabValue } from "@/components/admin/Laporan/StatusTabs";
import LaporanCard from "@/components/admin/Laporan/LaporanCard";
import DetailModal from "@/components/admin/Laporan/DetailModal";
import RejectModal from "@/components/admin/Laporan/RejectModal";
import Pagination from "@/components/admin/Laporan/Pagination";
import type { AdminLaporan, AdminLaporanStatus } from "@/components/admin/Laporan/types";

const INITIAL_LAPORAN: AdminLaporan[] = [
  {
    id: "AL-001",
    judul: "Jalan berlubang di Jl. Sudirman KM 5",
    deskripsi: "Lubang sedalam 30cm di lajur kiri, tepat setelah lampu merah. Sudah ada 2 kecelakaan motor minggu ini.",
    kategori: "infrastruktur",
    status: "pending",
    priority: "urgent",
    lokasi: "Jakarta Selatan",
    alamat: "Jl. Sudirman KM 5, RT 03 RW 02",
    fotoCount: 6,
    pelapor: { nama: "Rizky Hidayat", inisial: "RH", email: "rizky@mail.com" },
    createdAt: "2 menit lalu",
    upvote: 2400,
    komentarCount: 14,
  },
  {
    id: "AL-002",
    judul: "Sampah menumpuk di pasar Minggu",
    deskripsi: "Tumpukan sampah di sisi timur pasar tidak diangkut 5 hari. Bau menyebar 200m.",
    kategori: "kebersihan",
    status: "approved",
    priority: "high",
    lokasi: "Jakarta Selatan",
    alamat: "Pasar Minggu, Jakarta Selatan",
    fotoCount: 3,
    pelapor: { nama: "Dewi Rahayu", inisial: "DR", email: "dewi@mail.com" },
    createdAt: "1 hari lalu",
    upvote: 1800,
    komentarCount: 9,
  },
  {
    id: "AL-003",
    judul: "Lampu jalan padam Jl. Gatot Subroto",
    deskripsi: "12 titik lampu jalan padam sepanjang ruas Gatot Subroto arah Semanggi.",
    kategori: "fasilitas-umum",
    status: "on_progress",
    priority: "high",
    lokasi: "Jakarta Pusat",
    alamat: "Jl. Gatot Subroto arah Semanggi",
    fotoCount: 5,
    pelapor: { nama: "Hendra K.", inisial: "HK", email: "hendra@mail.com" },
    createdAt: "3 hari lalu",
    upvote: 1200,
    komentarCount: 7,
  },
  {
    id: "AL-004",
    judul: "Trotoar rusak di Jl. Margonda",
    deskripsi: "Trotoar 200m kondisi rusak berat. Pejalan kaki harus turun ke badan jalan.",
    kategori: "infrastruktur",
    status: "completed",
    priority: "medium",
    lokasi: "Depok",
    alamat: "Jl. Margonda Raya, Depok",
    fotoCount: 4,
    pelapor: { nama: "Joko S.", inisial: "JS", email: "joko@mail.com" },
    createdAt: "1 minggu lalu",
    upvote: 980,
    komentarCount: 11,
  },
  {
    id: "AL-005",
    judul: "Laporan duplikat",
    deskripsi: "Laporan ini duplikat dari AL-001.",
    kategori: "infrastruktur",
    status: "rejected",
    priority: "low",
    lokasi: "Jakarta Selatan",
    alamat: "Jl. Sudirman KM 5",
    fotoCount: 1,
    pelapor: { nama: "Anonim", inisial: "AN", email: "anon@mail.com" },
    createdAt: "kemarin",
    upvote: 5,
    komentarCount: 0,
    rejectReason: "Duplikat dengan laporan AL-001 yang sudah ada dan sedang dalam proses penanganan.",
  },
  {
    id: "AL-006",
    judul: "Macet parah simpang Margonda",
    deskripsi: "Setiap pagi macet 1.5 jam. Butuh penataan ulang lampu lalu lintas.",
    kategori: "lalu-lintas",
    status: "pending",
    priority: "high",
    lokasi: "Depok",
    alamat: "Simpang Margonda - Juanda",
    fotoCount: 2,
    pelapor: { nama: "Maya P.", inisial: "MP", email: "maya@mail.com" },
    createdAt: "4 jam lalu",
    upvote: 342,
    komentarCount: 18,
  },
  {
    id: "AL-007",
    judul: "Pohon tumbang halangi jalan",
    deskripsi: "Pohon tumbang setelah hujan deras semalam. Akses jalan tertutup total.",
    kategori: "infrastruktur",
    status: "on_progress",
    priority: "urgent",
    lokasi: "Jakarta Barat",
    alamat: "Jl. Pos Pengumben",
    fotoCount: 3,
    pelapor: { nama: "Tono W.", inisial: "TW", email: "tono@mail.com" },
    createdAt: "6 jam lalu",
    upvote: 456,
    komentarCount: 8,
  },
  {
    id: "AL-008",
    judul: "Selokan mampet di Kemang",
    deskripsi: "Selokan tersumbat sampah membuat banjir setiap kali hujan deras.",
    kategori: "kebersihan",
    status: "approved",
    priority: "medium",
    lokasi: "Jakarta Selatan",
    alamat: "Jl. Kemang Raya",
    fotoCount: 4,
    pelapor: { nama: "Sari L.", inisial: "SL", email: "sari@mail.com" },
    createdAt: "8 jam lalu",
    upvote: 234,
    komentarCount: 5,
  },
  {
    id: "AL-009",
    judul: "Halte busway rusak",
    deskripsi: "Halte di depan Plaza Senayan rusak dan tidak terawat. Atap bocor, bangku patah.",
    kategori: "fasilitas-umum",
    status: "pending",
    priority: "low",
    lokasi: "Jakarta Pusat",
    alamat: "Halte Plaza Senayan",
    fotoCount: 2,
    pelapor: { nama: "Bagas P.", inisial: "BP", email: "bagas@mail.com" },
    createdAt: "1 hari lalu",
    upvote: 89,
    komentarCount: 3,
  },
  {
    id: "AL-010",
    judul: "Rambu lalin tertutup pohon",
    deskripsi: "Rambu stop tertutup ranting pohon yang sudah lebat. Berbahaya untuk pengendara.",
    kategori: "lalu-lintas",
    status: "completed",
    priority: "low",
    lokasi: "Bekasi",
    alamat: "Persimpangan Bekasi Barat",
    fotoCount: 1,
    pelapor: { nama: "Indra K.", inisial: "IK", email: "indra@mail.com" },
    createdAt: "2 hari lalu",
    upvote: 56,
    komentarCount: 2,
  },
  {
    id: "AL-011",
    judul: "Bangku taman patah",
    deskripsi: "Bangku di Taman Suropati patah dan berbahaya. Anak kecil bisa terluka.",
    kategori: "fasilitas-umum",
    status: "approved",
    priority: "low",
    lokasi: "Jakarta Pusat",
    alamat: "Taman Suropati",
    fotoCount: 2,
    pelapor: { nama: "Lia W.", inisial: "LW", email: "lia@mail.com" },
    createdAt: "3 hari lalu",
    upvote: 45,
    komentarCount: 1,
  },
  {
    id: "AL-012",
    judul: "Got mampet di Cilandak",
    deskripsi: "Got sepanjang Jl. Cilandak KKO mampet karena banyak sampah plastik.",
    kategori: "infrastruktur",
    status: "on_progress",
    priority: "medium",
    lokasi: "Jakarta Selatan",
    alamat: "Jl. Cilandak KKO",
    fotoCount: 3,
    pelapor: { nama: "Adi P.", inisial: "AP", email: "adi@mail.com" },
    createdAt: "5 hari lalu",
    upvote: 167,
    komentarCount: 6,
  },
];

const ITEMS_PER_PAGE = 6;
const PRIORITY_RANK = { urgent: 4, high: 3, medium: 2, low: 1 };

export default function AdminLaporanPage() {
  const [laporan, setLaporan] = useState<AdminLaporan[]>(INITIAL_LAPORAN);
  const [tab, setTab] = useState<TabValue>("all");
  const [filter, setFilter] = useState<FilterState>({
    search: "",
    kategori: "all",
    priority: "all",
    sortBy: "newest",
  });
  const [page, setPage] = useState(1);

  const [detailFor, setDetailFor] = useState<AdminLaporan | null>(null);
  const [rejectFor, setRejectFor] = useState<AdminLaporan | null>(null);

  const filtered = useMemo(() => {
    let result = [...laporan];

    if (tab !== "all") result = result.filter((l) => l.status === tab);

    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (l) =>
          l.judul.toLowerCase().includes(q) ||
          l.deskripsi.toLowerCase().includes(q) ||
          l.pelapor.nama.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q)
      );
    }

    if (filter.kategori !== "all") result = result.filter((l) => l.kategori === filter.kategori);
    if (filter.priority !== "all") result = result.filter((l) => l.priority === filter.priority);

    if (filter.sortBy === "oldest") result = result.reverse();
    if (filter.sortBy === "urgent") {
      result.sort((a, b) => PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority]);
    }

    return result;
  }, [laporan, tab, filter]);

  const counts: Record<TabValue, number> = useMemo(() => {
    let base = laporan;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      base = base.filter(
        (l) =>
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
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handleAction = (
    id: string,
    action: { type: "approve" | "rejectAsk" | "update"; status?: AdminLaporanStatus }
  ) => {
    if (action.type === "rejectAsk") {
      const target = laporan.find((l) => l.id === id);
      if (target) setRejectFor(target);
      return;
    }

    setLaporan((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        if (action.type === "approve") return { ...l, status: "approved" };
        if (action.type === "update" && action.status) return { ...l, status: action.status };
        return l;
      })
    );
  };

  const handleConfirmReject = (alasan: string) => {
    if (!rejectFor) return;
    setLaporan((prev) =>
      prev.map((l) =>
        l.id === rejectFor.id ? { ...l, status: "rejected", rejectReason: alasan } : l
      )
    );
  };

  const handleTabChange = (v: TabValue) => {
    setTab(v);
    setPage(1);
  };
  const handleFilterChange = (f: FilterState) => {
    setFilter(f);
    setPage(1);
  };

  return (
    <div style={{ padding: "32px 32px 64px", maxWidth: 1180, margin: "0 auto" }}>
      <div
        style={{
          marginBottom: 22,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #FFF5EE 0%, #FFEDE0 100%)",
              border: "0.5px solid rgba(255,107,53,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#E8541C",
              flexShrink: 0,
            }}
          >
            <FileText size={19} strokeWidth={1.8} />
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1.65rem",
                fontWeight: 800,
                color: "#1a0e08",
                letterSpacing: "-0.03em",
                margin: 0,
                marginBottom: 4,
              }}
            >
              Manajemen Laporan
            </h1>
            <p style={{ fontSize: "0.82rem", color: "#a8856b", margin: 0 }}>
              Kelola, verifikasi, dan tindak lanjuti laporan yang masuk
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "white",
            border: "0.5px solid #f0e6dc",
            borderRadius: 10,
            padding: "10px 16px",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "#a8856b" }}>Total:</span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "#1a0e08",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {filtered.length}
          </span>
          <span style={{ fontSize: "0.7rem", color: "#a8856b" }}>laporan</span>
        </div>
      </div>

      <SearchAndFilter filter={filter} onChange={handleFilterChange} />
      <StatusTabs active={tab} onChange={handleTabChange} counts={counts} />

      {paginated.length === 0 ? (
        <div
          style={{
            background: "white",
            border: "0.5px solid #f0e6dc",
            borderRadius: 14,
            padding: "72px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(255,107,53,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
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
  );
}