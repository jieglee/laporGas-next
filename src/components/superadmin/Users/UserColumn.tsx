"use client";

import { Plus, Shield, Users as UsersIcon } from "lucide-react";
import { useMemo, useState } from "react";
import SearchAndFilter from "./SearchAndFilter";
import UserCard from "./UserCard";
import { ManagedUser, UserRole } from "./types";

type Props = {
  title: string;
  subtitle: string;
  variant: "user" | "admin"; // styling
  users: ManagedUser[];
  onAdd: (role: UserRole) => void;
  onEdit: (u: ManagedUser) => void;
  onDelete: (u: ManagedUser) => void;
  onChangeRole: (u: ManagedUser) => void;
};

export default function UserColumn({
  title,
  subtitle,
  variant,
  users,
  onAdd,
  onEdit,
  onDelete,
  onChangeRole,
}: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"semua" | "aktif" | "nonaktif">("semua");

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchQuery =
        u.nama.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());
      const matchStatus = status === "semua" || u.status === status;
      return matchQuery && matchStatus;
    });
  }, [users, query, status]);

  const Icon = variant === "admin" ? Shield : UsersIcon;
  const targetRole: UserRole = variant === "admin" ? "admin" : "user";

  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              variant === "admin"
                ? "bg-neutral-900 text-white"
                : "bg-[#C0392B]/10 text-[#C0392B]"
            }`}
          >
            <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-neutral-900">
              {title}
            </h3>
            <p className="text-xs text-neutral-500">{subtitle}</p>
          </div>
        </div>

        <button
          onClick={() => onAdd(targetRole)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            variant === "admin"
              ? "bg-neutral-900 text-white hover:bg-neutral-800"
              : "bg-[#C0392B] text-white hover:bg-[#a93023]"
          }`}
        >
          <Plus className="h-3.5 w-3.5" />
          Tambah
        </button>
      </div>

      {/* Count */}
      <div className="mb-3 flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tracking-tight text-neutral-900">
          {filtered.length}
        </span>
        <span className="text-xs text-neutral-500">
          dari {users.length} total
        </span>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <SearchAndFilter
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
          placeholder={`Cari ${variant === "admin" ? "admin" : "user"}...`}
        />
      </div>

      {/* List */}
      <div className="-mr-2 flex-1 space-y-2 overflow-y-auto pr-2">
        {filtered.length === 0 ? (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-50">
              <Icon className="h-5 w-5 text-neutral-300" />
            </div>
            <p className="text-sm text-neutral-500">Tidak ada hasil</p>
            <p className="text-xs text-neutral-400">
              Coba ubah kata kunci atau filter
            </p>
          </div>
        ) : (
          filtered.map((u) => (
            <UserCard
              key={u.id}
              user={u}
              onEdit={onEdit}
              onDelete={onDelete}
              onChangeRole={onChangeRole}
            />
          ))
        )}
      </div>
    </div>
  );
}