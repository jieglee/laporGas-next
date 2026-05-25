"use client";

import { Search, X, Map, Building2, Landmark, Trash2, TrafficCone } from "lucide-react";
import { type ExploreKategori, KATEGORI_TABS } from "./types";
import { cn } from "@/lib/utils";

const KATEGORI_ICONS: Record<ExploreKategori, React.ReactNode> = {
  all:            <Map size={13} strokeWidth={2} />,
  infrastruktur:  <Building2 size={13} strokeWidth={2} />,
  "fasilitas-umum": <Landmark size={13} strokeWidth={2} />,
  kebersihan:     <Trash2 size={13} strokeWidth={2} />,
  "lalu-lintas":  <TrafficCone size={13} strokeWidth={2} />,
};

interface Props {
  search: string;
  onSearch: (v: string) => void;
  kategori: ExploreKategori;
  onKategori: (v: ExploreKategori) => void;
  totalCount: number;
}

export default function ExploreHeader({ search, onSearch, kategori, onKategori, totalCount }: Props) {
  return (
    <div className="mb-6">
      {/* Title */}
      <div className="mb-5">
        <h1 className="font-sans text-[1.65rem] font-extrabold text-[#1a0e08] tracking-[-0.03em] m-0 mb-[3px]">
          Explore
        </h1>
        <p className="text-[0.82rem] text-[#a8856b] m-0">
          <span className="font-semibold text-[#E8541C]">{totalCount}</span> laporan dari komunitas
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a8856b]">
          <Search size={15} strokeWidth={2} />
        </div>
        <input
          type="text"
          placeholder="Cari laporan, lokasi, atau pelapor..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full h-[46px] bg-white border-[0.5px] border-[#f0e6dc] rounded-xl pl-[42px] pr-[42px] text-[0.88rem] text-[#1a0e08] outline-none transition-all duration-200 focus:border-[rgba(255,107,53,0.5)] focus:shadow-[0_0_0_3px_rgba(255,107,53,0.06)] placeholder:text-[#c9a892] font-[inherit]"
        />
        {search && (
          <button onClick={() => onSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#f0e6dc] flex items-center justify-center text-[#a8856b] hover:bg-[#E8541C] hover:text-white transition-all duration-150 border-0 cursor-pointer">
            <X size={12} />
          </button>
        )}
      </div>

      {/* Kategori tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        {KATEGORI_TABS.map((tab) => {
          const active = kategori === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onKategori(tab.value)}
              className={cn(
                "inline-flex items-center gap-[6px] py-[7px] px-4 rounded-full text-[0.78rem] cursor-pointer whitespace-nowrap font-[inherit] transition-all duration-200 shrink-0 border-[1.5px]",
                active
                  ? "border-transparent bg-gradient-to-br from-[#FF6B35] to-[#E8541C] text-white font-bold shadow-[0_4px_14px_rgba(232,84,28,0.28)]"
                  : "border-[#f0e6dc] bg-white text-[#6b5546] font-medium hover:border-[rgba(255,107,53,0.3)] hover:text-[#E8541C] hover:bg-[#FFF5EE]"
              )}
            >
              <span className={cn("transition-colors", active ? "text-white" : "text-[#a8856b]")}>
                {KATEGORI_ICONS[tab.value]}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}