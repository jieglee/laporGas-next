"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";

interface Props {
  onReset: () => void;
}

export default function SuccessState({ onReset }: Props) {
  const router = useRouter();

  return (
    <div className="py-[80px] px-8 max-w-[520px] mx-auto text-center">
      <div className="opacity-0 animate-pop-in">
        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E8541C] flex items-center justify-center mx-auto mb-5 shadow-[0_12px_32px_rgba(255,107,53,0.3)]">
          <CheckCircle2 size={34} className="text-white" strokeWidth={2} />
        </div>

        <h2 className="font-sans text-[1.6rem] font-extrabold text-[#1a0e08] tracking-[-0.03em] m-0 mb-[10px]">
          Laporan terkirim!
        </h2>
        <p className="text-[0.88rem] text-[#6b5546] leading-[1.65] m-0 mb-7">
          Laporan kamu sudah kami terima dan sedang dalam proses verifikasi. Pantau statusnya di halaman
          riwayat laporan.
        </p>

        <div className="flex gap-[10px] justify-center">
          <button
            onClick={() => router.push("/user/profil" as never)}
            className="inline-flex items-center gap-[6px] text-white font-bold text-[0.82rem] px-[22px] py-[11px] rounded-[10px] border-0 cursor-pointer font-[inherit] bg-gradient-to-br from-[#FF6B35] to-[#E8541C] shadow-[0_6px_16px_rgba(255,107,53,0.28)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(255,107,53,0.38)]"
          >
            Lihat laporan saya <ChevronRight size={14} />
          </button>

          <button
            onClick={onReset}
            className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[10px] px-[18px] py-[11px] text-[0.82rem] font-semibold text-[#3d2817] cursor-pointer font-[inherit] transition-colors duration-150 hover:bg-[#fafaf8]"
          >
            Buat laporan lain
          </button>
        </div>
      </div>
    </div>
  );
}
