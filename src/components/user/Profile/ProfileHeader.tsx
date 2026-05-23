"use client";

import { Mail, Calendar, LogOut, Pencil } from "lucide-react";

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
  nama,
  email,
  joinedAt,
  avatarUrl,
  inisial,
  onEdit,
  onLogout,
}: Props) {
  return (
    <div className="mb-6 overflow-hidden rounded-[18px] border border-[#f0e6dc] bg-white">
      {/* Orange banner */}
      <div className="relative h-[110px] bg-[linear-gradient(135deg,#FF6B35_0%,#E8541C_60%,#c94415_100%)]">
        {/* subtle pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.08)_0%,transparent_60%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06)_0%,transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative px-7 pb-6">
        {/* Avatar */}
        <div className="relative -mt-12 mb-[14px] inline-block">
          <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[linear-gradient(135deg,#FF6B35,#E8541C)] shadow-[0_8px_24px_rgba(255,107,53,0.25)]">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={nama}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-sans text-[1.8rem] font-extrabold tracking-[-0.02em] text-white">
                {inisial}
              </span>
            )}
          </div>
        </div>

        {/* Name + meta */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-sans mb-[10px] text-[1.4rem] font-extrabold tracking-[-0.025em] text-[#1a0e08]">
              {nama}
            </h1>

            <div className="flex flex-col gap-[5px]">
              <div className="inline-flex items-center gap-[7px] text-[0.8rem] text-[#6b5546]">
                <Mail
                  size={13}
                  strokeWidth={1.8}
                  className="text-[#a8856b]"
                />
                {email}
              </div>

              <div className="inline-flex items-center gap-[7px] text-[0.78rem] text-[#8a6f5e]">
                <Calendar
                  size={13}
                  strokeWidth={1.8}
                  className="text-[#a8856b]"
                />
                Bergabung {joinedAt}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-[10px]">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-[7px] rounded-[10px] border-none bg-[linear-gradient(135deg,#FF6B35,#E8541C)] px-[18px] py-[9px] text-[0.8rem] font-bold text-white shadow-[0_4px_14px_rgba(255,107,53,0.28)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_20px_rgba(255,107,53,0.38)]"
            >
              <Pencil size={13} strokeWidth={2} />
              Edit Profil
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-[7px] rounded-[10px] border border-[#f0e6dc] bg-white px-[18px] py-[9px] text-[0.8rem] font-semibold text-[#6b5546] transition-all duration-150 hover:border-[#FEE2E2] hover:bg-[#FEF2F2] hover:text-[#B91C1C]"
            >
              <LogOut size={13} strokeWidth={1.8} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}