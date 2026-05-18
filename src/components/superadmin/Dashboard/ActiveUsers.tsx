"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { activeUsers } from "@/lib/mock-superadmin";

const roleStyle = {
  superadmin: "bg-[#C0392B]/10 text-[#C0392B] border-[#C0392B]/20",
  admin: "bg-neutral-900 text-white border-neutral-900",
  user: "bg-neutral-100 text-neutral-700 border-neutral-200",
};

const roleLabel = {
  superadmin: "Superadmin",
  admin: "Admin",
  user: "User",
};

export default function ActiveUsers() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">
            User Paling Aktif
          </h3>
          <p className="text-xs text-neutral-500">
            Berdasarkan aktivitas hari ini
          </p>
        </div>
        <Link
          href={"/superadmin/users" as never}
          className="group inline-flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-[#C0392B]"
        >
          Kelola
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <ul className="space-y-1">
        {activeUsers.map((u, i) => (
          <li
            key={u.id}
            className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-neutral-50"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-neutral-100 to-neutral-200 text-xs font-medium text-neutral-700">
              {u.nama
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-neutral-900">
                  {u.nama}
                </p>
                <span
                  className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${roleStyle[u.role]}`}
                >
                  {roleLabel[u.role]}
                </span>
              </div>
              <p className="truncate text-xs text-neutral-500">
                {u.laporanCount} laporan · {u.lastActive}
              </p>
            </div>

            <div className="text-xs font-mono text-neutral-400">
              #{String(i + 1).padStart(2, "0")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}