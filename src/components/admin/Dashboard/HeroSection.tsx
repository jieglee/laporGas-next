"use client";

import { useSession } from "next-auth/react";

interface Props {
  pendingCount: number;
  urgentCount: number;
}

export default function HeroSection({ pendingCount, urgentCount }: Props) {
  const { data: session } = useSession();
  const nama = session?.user?.name?.split(" ")[0] ?? "Admin";

  const hour = new Date().getHours();
  const greeting =
    hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : hour < 18 ? "Selamat sore" : "Selamat malam";

  return (
    <section className="mb-10 relative animate-fade-slide-up opacity-0 [animation-duration:0.5s]">
      <div className="inline-flex items-center gap-[7px] bg-[rgba(255,107,53,0.08)] border-[0.5px] border-[rgba(255,107,53,0.15)] px-3 py-[5px] rounded-full mb-[18px]">
        <span className="w-[5px] h-[5px] rounded-full bg-[#FF6B35]" />
        <span className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#E8541C]">
          {greeting}, {nama}
        </span>
      </div>

      <h1 className="font-sans font-extrabold text-[#1a0e08] tracking-[-0.035em] leading-[1.1] m-0 mb-[14px] max-w-[720px] text-[clamp(1.6rem,3.2vw,2.4rem)]">
        Ada{" "}
        <span className="italic bg-gradient-to-r from-[#FF6B35] to-[#E8541C] bg-clip-text text-transparent">
          {pendingCount} laporan
        </span>{" "}
        menunggu review hari ini.
      </h1>

      <p className="text-[0.92rem] text-[#6b5546] leading-[1.65] m-0 max-w-[560px]">
        {urgentCount > 0 ? (
          <>
            <span className="font-semibold text-[#E8541C]">{urgentCount} di antaranya prioritas urgent</span>
            {" — "}butuh penanganan segera.
          </>
        ) : (
          <>Semua urgent sudah ditangani. Lanjut review yang lain ya.</>
        )}
      </p>
    </section>
  );
}
