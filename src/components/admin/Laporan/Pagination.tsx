"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, totalItems, itemsPerPage, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * itemsPerPage + 1;
  const to = Math.min(page * itemsPerPage, totalItems);

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const baseBtn = "inline-flex items-center justify-center min-w-[36px] h-9 px-[11px] rounded-[9px] text-[0.8rem] cursor-pointer transition-all duration-150 border-[0.5px] font-[inherit]";
  const activeBtn = `${baseBtn} border-transparent font-bold text-white shadow-[0_4px_12px_rgba(255,107,53,0.22)]`;
  const normalBtn = `${baseBtn} bg-white border-[#f0e6dc] font-medium hover:bg-[#FFF5EE] hover:border-[rgba(255,107,53,0.3)] hover:text-[#E8541C]`;
  const disabledBtn = `${baseBtn} bg-white border-[#f0e6dc] text-[#d4b89e] cursor-not-allowed`;

  return (
    <div className="flex items-center justify-between mt-5 gap-4 flex-wrap">
      <p className="text-[0.78rem] text-[#a8856b] m-0">
        Menampilkan <strong className="text-[#1a0e08] font-bold">{from}–{to}</strong> dari{" "}
        <strong className="text-[#1a0e08] font-bold">{totalItems}</strong> laporan
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={page === 1 ? disabledBtn : `${normalBtn} text-[#3d2817]`}
        >
          <ChevronLeft size={14} strokeWidth={2} />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-[6px] text-[#a8856b] text-[0.78rem]">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={
                p === page
                  ? `${activeBtn} bg-gradient-to-br from-[#FF6B35] to-[#E8541C]`
                  : `${normalBtn} text-[#3d2817]`
              }
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className={page === totalPages ? disabledBtn : `${normalBtn} text-[#3d2817]`}
        >
          <ChevronRight size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}