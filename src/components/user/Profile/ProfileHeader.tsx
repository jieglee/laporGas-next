"use client";

import { Mail, Calendar, LogOut, Pencil, MapPin } from "lucide-react";

interface Props {
  nama: string;
  email: string;
  joinedAt: string;
  avatarUrl?: string | null;
  inisial: string;
  onEdit: () => void;
  onLogout: () => void;
}

export default function ProfileHeader({
  nama, email, joinedAt, avatarUrl, inisial, onEdit, onLogout,
}: Props) {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl bg-white border border-[#f0e6dc] shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      {/* Banner */}
      <div className="relative h-[130px] overflow-hidden"
           style={{ background: "linear-gradient(135deg, #FF6B35 0%, #E8541C 50%, #c43c0f 100%)" }}>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute right-16 -top-4 w-24 h-24 rounded-full bg-white/5" />
        <div className="absolute -left-4 bottom-0 w-32 h-32 rounded-full bg-black/5" />
        {/* Grid pattern */}
        <div className="absolute inset-0"
             style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>

      <div className="px-7 pb-7">
        {/* Avatar + actions row */}
        <div className="flex items-end justify-between -mt-11 mb-5">
          {/* Avatar */}
          <div className="relative">
            <div className="w-[88px] h-[88px] rounded-full border-4 border-white shadow-[0_8px_24px_rgba(232,84,28,0.2)] overflow-hidden flex items-center justify-center"
                 style={{ background: "linear-gradient(135deg, #FF6B35, #E8541C)" }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={nama} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[1.9rem] font-extrabold text-white tracking-[-0.02em]">{inisial}</span>
              )}
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mb-1">
            <button onClick={onEdit}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[0.78rem] font-bold text-white border-0 cursor-pointer transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0"
                    style={{ background: "linear-gradient(135deg, #FF6B35, #E8541C)", boxShadow: "0 4px 14px rgba(232,84,28,0.3)" }}>
              <Pencil size={12} strokeWidth={2.5} />
              Edit Profil
            </button>
            <button onClick={onLogout}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[0.78rem] font-semibold text-[#6b5546] bg-white border border-[#f0e6dc] cursor-pointer transition-all duration-150 hover:bg-red-50 hover:border-red-100 hover:text-red-600">
              <LogOut size={12} strokeWidth={2} />
              Keluar
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <h1 className="text-[1.45rem] font-extrabold text-[#1a0e08] tracking-[-0.03em] m-0 mb-[2px]"
              style={{ fontFamily: "'Syne', sans-serif" }}>
            {nama}
          </h1>
          <p className="text-[0.75rem] text-[#a8856b] m-0 font-medium">Warga Pelapor Aktif</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#f0e6dc] via-[#f5ede3] to-transparent mb-4" />

        {/* Meta info */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#FFF5EE] flex items-center justify-center shrink-0">
              <Mail size={11} className="text-[#E8541C]" strokeWidth={2} />
            </div>
            <span className="text-[0.78rem] text-[#6b5546]">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#FFF5EE] flex items-center justify-center shrink-0">
              <Calendar size={11} className="text-[#E8541C]" strokeWidth={2} />
            </div>
            <span className="text-[0.78rem] text-[#6b5546]">Bergabung {joinedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}