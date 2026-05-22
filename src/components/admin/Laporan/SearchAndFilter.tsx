"use client";

import { Search, X, Tag, Flag } from "lucide-react";
import { type LaporanPriority, type LaporanKategori, KATEGORI_LABEL } from "./types";

export type SortBy = "newest" | "oldest" | "urgent";

export interface FilterState {
  search: string;
  kategori: LaporanKategori | "all";
  priority: LaporanPriority | "all";
  sortBy: SortBy;
}

interface Props {
  filter: FilterState;
  onChange: (f: FilterState) => void;
}

const KATEGORI_OPTS: { value: LaporanKategori | "all"; label: string }[] = [
  { value: "all", label: "Semua kategori" },
  ...Object.entries(KATEGORI_LABEL).map(([k, v]) => ({ value: k as LaporanKategori, label: v })),
];

const PRIORITY_OPTS: { value: LaporanPriority | "all"; label: string }[] = [
  { value: "all",    label: "Semua prioritas" },
  { value: "urgent", label: "Urgent" },
  { value: "high",   label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low",    label: "Low" },
];

const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23a8856b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

function SelectField({
  icon,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8856b] pointer-events-none flex">
        {icon}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[10px] h-[38px] pl-[34px] pr-9 text-[0.78rem] text-[#3d2817] cursor-pointer outline-none font-[inherit] font-medium appearance-none min-w-[160px]"
        style={{
          backgroundImage: chevronSvg,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export default function SearchAndFilter({ filter, onChange }: Props) {
  const hasActive = filter.search || filter.kategori !== "all" || filter.priority !== "all";

  return (
    <div className="flex flex-col gap-[10px] mb-[18px]">
      {/* Search */}
      <div className="flex items-center gap-[10px] bg-white border-[0.5px] border-[#f0e6dc] rounded-[10px] px-[14px] h-[42px]">
        <Search size={15} className="text-[#a8856b] shrink-0" />
        <input
          type="text"
          placeholder="Cari laporan, pelapor, atau ID..."
          value={filter.search}
          onChange={(e) => onChange({ ...filter, search: e.target.value })}
          className="flex-1 border-0 outline-none text-[0.85rem] text-[#1a0e08] bg-transparent font-[inherit]"
        />
        {filter.search && (
          <button
            onClick={() => onChange({ ...filter, search: "" })}
            className="bg-transparent border-0 cursor-pointer p-[2px] flex text-[#a8856b]"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 flex-wrap">
        <SelectField
          icon={<Tag size={13} strokeWidth={1.8} />}
          value={filter.kategori}
          onChange={(v) => onChange({ ...filter, kategori: v as LaporanKategori | "all" })}
          options={KATEGORI_OPTS}
        />
        <SelectField
          icon={<Flag size={13} strokeWidth={1.8} />}
          value={filter.priority}
          onChange={(v) => onChange({ ...filter, priority: v as LaporanPriority | "all" })}
          options={PRIORITY_OPTS}
        />
        {hasActive && (
          <button
            onClick={() => onChange({ search: "", kategori: "all", priority: "all", sortBy: filter.sortBy })}
            className="text-[0.72rem] font-semibold text-[#E8541C] bg-transparent border-0 cursor-pointer py-2 px-1 inline-flex items-center gap-1"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}