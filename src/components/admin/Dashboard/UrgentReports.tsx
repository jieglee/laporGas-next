"use client";

import Link from "next/link";
import { ArrowRight, MapPin, AlertTriangle } from "lucide-react";
import { STATUS_CONFIG, KATEGORI_LABEL } from "@/components/admin/Laporan/types";
import { cn } from "@/lib/utils";

export type AdminLaporanStatus = "pending" | "approved" | "on_progress" | "completed" | "rejected";
export type LaporanPriority = "low" | "medium" | "high" | "urgent";
export type LaporanKategori = "infrastruktur" | "fasilitas-umum" | "kebersihan" | "lalu-lintas";

export interface AdminLaporan {
  id: string;
  judul: string;
  kategori: LaporanKategori;
  status: AdminLaporanStatus;
  priority: LaporanPriority;
  lokasi: string;
  pelapor: { nama: string; inisial: string };
  createdAt: string;
}

interface Props {
  laporan: AdminLaporan[];
  limit?: number;
}

export default function UrgentReports({ laporan, limit = 5 }: Props) {
  const items = laporan.slice(0, limit);

  return (
    <section className="mb-8 animate-fade-slide-up opacity-0 [animation-delay:200ms]">
      <div className="flex items-end justify-between mb-[14px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-8 h-8 rounded-[9px] bg-red-50 flex items-center justify-center text-red-600">
            <AlertTriangle size={16} strokeWidth={2} />
          </div>
          <div>
            <h2 className="font-sans text-[1.15rem] font-extrabold text-[#1a0e08] tracking-[-0.025em] m-0 mb-[2px]">
              Laporan Urgent
            </h2>
            <p className="text-[0.72rem] text-[#a8856b] m-0">{items.length} laporan butuh penanganan cepat</p>
          </div>
        </div>
        <Link
          href="/admin/laporan?priority=urgent"
          className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-[#E8541C] no-underline transition-opacity duration-200 hover:opacity-70"
        >
          Lihat semua <ArrowRight size={13} />
        </Link>
      </div>

      <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] overflow-hidden">
        {items.length === 0 ? (
          <div className="py-12 px-5 text-center">
            <p className="text-[0.85rem] font-semibold text-[#1a0e08] mb-1">🎉 Tidak ada laporan urgent</p>
            <p className="text-[0.75rem] text-[#a8856b]">Semua sudah ditangani</p>
          </div>
        ) : (
          items.map((l, i) => {
            const s = STATUS_CONFIG[l.status];
            return (
              <Link
                key={l.id}
                href={`/admin/laporan/${l.id}`}
                className={cn(
                  "flex gap-[14px] px-5 py-4 no-underline relative transition-colors duration-150 hover:bg-[#fafaf8]",
                  i < items.length - 1 && "border-b-[0.5px] border-[#f5ede3]"
                )}
              >
                <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-[2px] bg-gradient-to-b from-red-600 to-red-800" />

                <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E8541C] flex items-center justify-center text-[0.7rem] font-bold text-white shrink-0">
                  {l.pelapor.inisial}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-[6px] mb-1 flex-wrap">
                    <span className="text-[0.78rem] font-semibold text-[#1a0e08]">{l.pelapor.nama}</span>
                    <span className="text-[0.62rem] text-[#c9a892]">·</span>
                    <span className="text-[0.65rem] font-semibold text-[#E8541C] uppercase tracking-[0.05em]">
                      {KATEGORI_LABEL[l.kategori]}
                    </span>
                    <span className="text-[0.62rem] text-[#c9a892]">· {l.createdAt}</span>
                  </div>

                  <p className="text-[0.85rem] font-medium text-[#1a0e08] m-0 leading-[1.45] mb-2 line-clamp-1">
                    {l.judul}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "text-[0.58rem] font-bold tracking-[0.05em] uppercase px-2 py-[2px] rounded-full",
                        s.badge
                      )}
                    >
                      {s.label}
                    </span>
                    <span className="text-[0.58rem] font-bold tracking-[0.05em] uppercase px-2 py-[2px] rounded-full bg-red-100 text-red-800">
                      Urgent
                    </span>
                    <span className="text-[0.65rem] text-[#a8856b] flex items-center gap-[3px]">
                      <MapPin size={10} /> {l.lokasi}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
