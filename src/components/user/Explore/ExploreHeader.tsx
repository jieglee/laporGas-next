"use client";

import { Search, X } from "lucide-react";
import { type ExploreKategori, KATEGORI_TABS } from "./types";
import { cn } from "@/lib/utils";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  kategori: ExploreKategori;
  onKategori: (v: ExploreKategori) => void;
  totalCount: number;
}

export default function ExploreHeader({
  search,
  onSearch,
  kategori,
  onKategori,
  totalCount,
}: Props) {
  return (
    <div className="mb-5">
      <div className="mb-4">
        <h1 className="font-sans text-[1.65rem] font-extrabold text-[#1a0e08] tracking-[-0.03em] m-0 mb-1">
          Explore
        </h1>
        <p className="text-[0.82rem] text-[#a8856b] m-0">{totalCount} laporan dari komunitas</p>
      </div>

      <div className="flex items-center gap-2.5 bg-white border-[0.5px] border-[#f0e6dc] rounded-xl px-4 h-[46px] mb-3.5 transition-colors duration-150 focus-within:border-[rgba(255,107,53,0.4)]">
        <Search size={16} className="text-[#a8856b] shrink-0" />
        <input
          type="text"
          placeholder="Cari laporan, lokasi, atau pelapor..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1 border-none outline-none text-[0.88rem] text-[#1a0e08] bg-transparent font-[inherit]"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="bg-transparent border-none cursor-pointer p-0.5 flex text-[#a8856b]"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
        {KATEGORI_TABS.map((tab) => {
          const active = kategori === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onKategori(tab.value)}
              className={cn(
                "inline-flex items-center gap-1.5 py-2 px-4 rounded-full border-[0.5px] text-[0.78rem] cursor-pointer whitespace-nowrap font-[inherit] transition-all duration-200 shrink-0",
                active
                  ? "border-transparent bg-gradient-to-br from-[#FF6B35] to-[#E8541C] text-white font-bold shadow-[0_4px_12px_rgba(255,107,53,0.25)]"
                  : "border-[#f0e6dc] bg-white text-[#3d2817] font-medium hover:bg-[#fafaf8] hover:border-[rgba(255,107,53,0.2)]"
              )}
            >
              <span className="text-base">{tab.emoji}</span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
