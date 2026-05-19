"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ManagedUser } from "./types";

type Props = {
  user: ManagedUser;
  onEdit: (u: ManagedUser) => void;
  onDelete: (u: ManagedUser) => void;
  onChangeRole: (u: ManagedUser) => void;
};

export default function UserCard({
  user,
  onEdit,
  onDelete,
  onChangeRole,
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user.nama
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  const isAdmin = user.role === "admin";

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 transition-all hover:border-neutral-300">
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          isAdmin
            ? "bg-neutral-900 text-white"
            : "bg-linear-to-br from-neutral-100 to-neutral-200 text-neutral-700"
        }`}
      >
        {initials}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-medium text-neutral-900">
            {user.nama}
          </p>
          <span
            className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
              user.status === "aktif"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-neutral-100 text-neutral-500"
            }`}
          >
            {user.status === "aktif" ? "●" : "○"} {user.status}
          </span>
        </div>
        <p className="truncate text-xs text-neutral-500">{user.email}</p>
        <p className="mt-0.5 text-[11px] text-neutral-400">
          {user.laporanCount} laporan ·{" "}
          {new Date(user.bergabung).toLocaleDateString("id-ID", {
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Actions menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpenMenu((v) => !v)}
          className="rounded-lg p-1.5 text-neutral-400 opacity-0 transition-all hover:bg-neutral-100 hover:text-neutral-700 group-hover:opacity-100 data-[open=true]:opacity-100"
          data-open={openMenu}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {openMenu && (
          <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
            <button
              onClick={() => {
                onEdit(user);
                setOpenMenu(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-50"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </button>
            <button
              onClick={() => {
                onChangeRole(user);
                setOpenMenu(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-50"
            >
              {isAdmin ? (
                <>
                  <ArrowDownLeft className="h-3.5 w-3.5" />
                  Turunkan ke User
                </>
              ) : (
                <>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Naikkan ke Admin
                </>
              )}
            </button>
            <div className="h-px bg-neutral-100" />
            <button
              onClick={() => {
                onDelete(user);
                setOpenMenu(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#C0392B] hover:bg-[#C0392B]/5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}