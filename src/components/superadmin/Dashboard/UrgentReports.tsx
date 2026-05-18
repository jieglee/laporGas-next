"use client";

import Link from "next/link";
import { AlertTriangle, ArrowUpRight, MapPin } from "lucide-react";
import { urgentLaporan } from "@/lib/mock-superadmin";

const prioritasStyle = {
  kritis: "bg-[#C0392B] text-white",
  tinggi: "bg-amber-500 text-white",
};

const statusStyle = {
  menunggu: "bg-amber-50 text-amber-700 border-amber-200",
  diproses: "bg-blue-50 text-blue-700 border-blue-200",
};

const statusLabel = {
  menunggu: "Menunggu",
  diproses: "Diproses",
};

export default function UrgentReports() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C0392B]/10">
            <AlertTriangle
              className="h-4 w-4 text-[#C0392B]"
              strokeWidth={2}
            />
          </div>
          <div>
            <h3 className="text-base font-semibold text-neutral-900">
              Laporan Urgent
            </h3>
            <p className="text-xs text-neutral-500">
              Butuh perhatian segera
            </p>
          </div>
        </div>

        <Link
          href={"/superadmin/laporan" as never}
          className="group inline-flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-[#C0392B]"
        >
          Lihat semua
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="-mr-2 flex-1 space-y-2.5 overflow-y-auto pr-2">
        {urgentLaporan.map((l) => (
          <Link
            key={l.id}
            href={`/admin/laporan/${l.id}`}
            className="group block rounded-xl border border-neutral-200 p-3.5 transition-all hover:border-[#C0392B]/30 hover:bg-[#C0392B]/2"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${prioritasStyle[l.prioritas]}`}
                >
                  {l.prioritas}
                </span>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${statusStyle[l.status]}`}
                >
                  {statusLabel[l.status]}
                </span>
                <span className="font-mono text-[10px] text-neutral-400">
                  {l.id}
                </span>
              </div>
              <span className="shrink-0 text-[11px] text-neutral-400">
                {l.waktu}
              </span>
            </div>

            <p className="text-sm font-medium text-neutral-900 group-hover:text-[#C0392B]">
              {l.judul}
            </p>

            <div className="mt-2 flex items-center gap-3 text-xs text-neutral-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {l.lokasi}
              </span>
              <span className="h-1 w-1 rounded-full bg-neutral-300" />
              <span>{l.kategori}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}