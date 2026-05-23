"use client";

import Link from "next/link";

const ruangLingkup = [
  { label: "Statistik Penyelesaian", href: "/user/statistik" },
  { label: "Daftar Instansi", href: "/user/instansi" },
  { label: "Kebijakan Privasi Data", href: "#" },
  { label: "Syarat & Ketentuan", href: "#" },
];

const kontak = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    text: "Hotline: 1-400-LAPOR",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    text: "halo@laporgas.go.id",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#FAFAFA] border-t border-black/[0.06]">
      <div className="max-w-[1080px] mx-auto px-8 pt-[52px] pb-10 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-x-12 gap-y-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 no-underline mb-[14px]">
            <span className="font-sans font-extrabold text-[1rem] tracking-[-0.02em] text-[#111]">
              Lapor<span className="text-[#E8201A]">Gas</span>
            </span>
          </Link>
          <p className="text-[0.82rem] text-black/[0.42] leading-[1.8] max-w-[280px] m-0 mb-5">
            Platform pengaduan publik resmi yang dikelola untuk mewujudkan layanan publik yang lebih baik di
            seluruh Indonesia.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-[6px] text-white text-[0.75rem] font-bold px-4 py-[9px] rounded-[9px] no-underline shadow-[0_3px_12px_rgba(232,32,26,0.22)] bg-gradient-to-br from-[#E8201A] to-[#FF6B35]"
          >
            Buat Laporan
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div>
          <p className="text-[0.7rem] font-bold tracking-[0.09em] uppercase text-black/[0.28] m-0 mb-4">
            Ruang Lingkup
          </p>
          <div className="flex flex-col gap-[11px]">
            {ruangLingkup.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-black/[0.48] text-[0.82rem] font-medium no-underline transition-colors duration-200 hover:text-[#E8201A]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[0.7rem] font-bold tracking-[0.09em] uppercase text-black/[0.28] m-0 mb-4">
            Kontak Resmi
          </p>
          <div className="flex flex-col gap-3">
            {kontak.map((k, i) => (
              <div key={i} className="flex items-start gap-[10px]">
                <span className="text-[#E8201A] mt-px shrink-0">{k.icon}</span>
                <span className="text-black/[0.48] text-[0.8rem] leading-[1.55]">{k.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/[0.06]">
        <div className="max-w-[1080px] mx-auto px-8 py-4 flex items-center justify-between flex-wrap gap-2">
          <span className="text-black/25 text-[0.72rem]">© 2025 LaporGas Indonesia.</span>
          <span className="text-black/20 text-[0.7rem] italic">#KamiAdalahIndonesiaMaju</span>
        </div>
      </div>
    </footer>
  );
}
