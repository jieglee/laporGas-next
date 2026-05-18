"use client";

import { useState, useMemo } from "react";
import { History, Pencil } from "lucide-react";
import RiwayatFilters, { type RiwayatFilterState } from "@/components/admin/Riwayat/RiwayatFilters";
import RiwayatItem, { type RiwayatEdit } from "@/components/admin/Riwayat/RiwayatItem";

// ── Data sementara — nanti ganti ke real fetch ────────────────────────────────

const RIWAYAT_DATA: RiwayatEdit[] = [
  {
    id: "re1",
    laporanId: "AL-001",
    laporanJudul: "Jalan berlubang di Jl. Sudirman KM 5",
    pelapor: { nama: "Rizky Hidayat", inisial: "RH" },
    timestamp: "10 menit lalu",
    tanggalLengkap: "17 Mei 2026, 22:50 WIB",
    fieldChanges: [
      {
        field: "Deskripsi",
        before: "Lubang sedalam ±30cm di lajur kiri.",
        after: "Lubang sedalam ±30cm di lajur kiri. Sudah ada 2 kecelakaan motor minggu ini.",
      },
      {
        field: "Foto",
        before: "4 foto",
        after: "6 foto (tambah 2 foto baru)",
      },
    ],
  },
  {
    id: "re2",
    laporanId: "AL-003",
    laporanJudul: "Lampu jalan padam Jl. Gatot Subroto",
    pelapor: { nama: "Hendra K.", inisial: "HK" },
    timestamp: "1 jam lalu",
    tanggalLengkap: "17 Mei 2026, 22:00 WIB",
    fieldChanges: [
      {
        field: "Judul",
        before: "Lampu jalan mati di Gatsu",
        after: "Lampu jalan padam Jl. Gatot Subroto",
      },
    ],
  },
  {
    id: "re3",
    laporanId: "AL-006",
    laporanJudul: "Macet parah simpang Margonda",
    pelapor: { nama: "Maya P.", inisial: "MP" },
    timestamp: "3 jam lalu",
    tanggalLengkap: "17 Mei 2026, 20:00 WIB",
    fieldChanges: [
      {
        field: "Lokasi",
        before: "Margonda, Depok",
        after: "Simpang Margonda - Juanda, Depok",
      },
      {
        field: "Deskripsi",
        before: "Macet parah tiap pagi.",
        after: "Setiap pagi macet 1.5 jam. Butuh penataan ulang lampu lalu lintas.",
      },
    ],
  },
  {
    id: "re4",
    laporanId: "AL-002",
    laporanJudul: "Sampah menumpuk di pasar Minggu",
    pelapor: { nama: "Dewi Rahayu", inisial: "DR" },
    timestamp: "kemarin 16:30",
    tanggalLengkap: "16 Mei 2026, 16:30 WIB",
    fieldChanges: [
      {
        field: "Foto",
        before: "1 foto",
        after: "3 foto (tambah 2 foto baru)",
      },
    ],
  },
  {
    id: "re5",
    laporanId: "AL-008",
    laporanJudul: "Selokan mampet di Kemang",
    pelapor: { nama: "Sari L.", inisial: "SL" },
    timestamp: "kemarin 09:15",
    tanggalLengkap: "16 Mei 2026, 09:15 WIB",
    fieldChanges: [
      {
        field: "Judul",
        before: "Got mampet Kemang",
        after: "Selokan mampet di Kemang",
      },
      {
        field: "Kategori",
        before: "Infrastruktur",
        after: "Kebersihan",
      },
    ],
  },
  {
    id: "re6",
    laporanId: "AL-007",
    laporanJudul: "Pohon tumbang halangi jalan",
    pelapor: { nama: "Tono W.", inisial: "TW" },
    timestamp: "2 hari lalu",
    tanggalLengkap: "15 Mei 2026, 14:20 WIB",
    fieldChanges: [
      {
        field: "Deskripsi",
        before: "Pohon tumbang.",
        after: "Pohon tumbang setelah hujan deras. Akses jalan tertutup total.",
      },
    ],
  },
  {
    id: "re7",
    laporanId: "AL-011",
    laporanJudul: "Bangku taman patah",
    pelapor: { nama: "Lia W.", inisial: "LW" },
    timestamp: "4 hari lalu",
    tanggalLengkap: "13 Mei 2026, 11:00 WIB",
    fieldChanges: [
      {
        field: "Lokasi",
        before: "Jakarta Pusat",
        after: "Taman Suropati, Jakarta Pusat",
      },
    ],
  },
  {
    id: "re8",
    laporanId: "AL-012",
    laporanJudul: "Got mampet di Cilandak",
    pelapor: { nama: "Adi P.", inisial: "AP" },
    timestamp: "1 minggu lalu",
    tanggalLengkap: "10 Mei 2026, 08:45 WIB",
    fieldChanges: [
      {
        field: "Judul",
        before: "Got Cilandak",
        after: "Got mampet di Cilandak",
      },
      {
        field: "Deskripsi",
        before: "Got mampet.",
        after: "Got sepanjang Jl. Cilandak KKO mampet.",
      },
      {
        field: "Foto",
        before: "0 foto",
        after: "3 foto",
      },
    ],
  },
];

const WAKTU_LIMIT: Record<RiwayatFilterState["waktu"], number> = {
  all:   Infinity,
  today: 3,
  week:  7,
  month: Infinity,
};

export default function RiwayatPage() {
  const [filter, setFilter] = useState<RiwayatFilterState>({
    search: "",
    waktu: "all",
  });

  const filtered = useMemo(() => {
    let result = [...RIWAYAT_DATA];

    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.laporanId.toLowerCase().includes(q) ||
          r.laporanJudul.toLowerCase().includes(q) ||
          r.pelapor.nama.toLowerCase().includes(q)
      );
    }

    if (filter.waktu !== "all") {
      result = result.slice(0, WAKTU_LIMIT[filter.waktu]);
    }

    return result;
  }, [filter]);

  return (
    <div style={{ padding: "32px 32px 64px", maxWidth: 760, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-start", gap: 14 }}>
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
          <Pencil size={19} strokeWidth={1.8} />
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
            Riwayat Edit Laporan
          </h1>
          <p style={{ fontSize: "0.82rem", color: "#a8856b", margin: 0 }}>
            Catatan kapan laporan diedit oleh pelapor
          </p>
        </div>
      </div>

      {/* Filters */}
      <RiwayatFilters filter={filter} onChange={setFilter} />

      {/* List */}
      {filtered.length === 0 ? (
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
            <History size={24} color="#E8541C" strokeWidth={1.8} />
          </div>
          <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#1a0e08", marginBottom: 4 }}>
            Tidak ada riwayat edit
          </p>
          <p style={{ fontSize: "0.78rem", color: "#a8856b" }}>
            Belum ada laporan yang diedit pada periode ini
          </p>
        </div>
      ) : (
        <div>
          {filtered.map((r, i) => (
            <RiwayatItem key={r.id} riwayat={r} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}