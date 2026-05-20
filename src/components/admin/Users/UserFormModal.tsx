"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ManagedUser, UserRole } from "./types";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialRole: UserRole;
  user?: ManagedUser | null;
  onClose: () => void;
  onSubmit: (data: Omit<ManagedUser, "id" | "bergabung" | "laporanCount">) => void;
};

export default function UserFormModal({
  open,
  mode,
  initialRole,
  user,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    nomorHp: "",
    role: initialRole,
    status: "aktif" as "aktif" | "nonaktif",
  });

  useEffect(() => {
    if (mode === "edit" && user) {
      setForm({
        nama: user.nama,
        email: user.email,
        nomorHp: user.nomorHp,
        role: user.role,
        status: user.status,
      });
    } else {
      setForm({
        nama: "",
        email: "",
        nomorHp: "",
        role: initialRole,
        status: "aktif",
      });
    }
  }, [mode, user, initialRole, open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.nama || !form.email) return;
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">
              {mode === "add" ? "Tambah " : "Edit "}
              {form.role === "admin" ? "Admin" : "User"}
            </h2>
            <p className="text-xs text-neutral-500">
              {mode === "add"
                ? "Buat akun baru untuk sistem"
                : "Perbarui informasi akun"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 px-5 py-4">
          <Field label="Nama lengkap">
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              placeholder="Nama lengkap..."
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#C0392B]/30 focus:outline-none focus:ring-2 focus:ring-[#C0392B]/10"
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@domain.com"
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#C0392B]/30 focus:outline-none focus:ring-2 focus:ring-[#C0392B]/10"
            />
          </Field>

          <Field label="Nomor HP">
            <input
              type="tel"
              value={form.nomorHp}
              onChange={(e) => setForm({ ...form, nomorHp: e.target.value })}
              placeholder="08xxxxxxxxxx"
              className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#C0392B]/30 focus:outline-none focus:ring-2 focus:ring-[#C0392B]/10"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Role">
              <select
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value as UserRole })
                }
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-[#C0392B]/30 focus:outline-none focus:ring-2 focus:ring-[#C0392B]/10"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </Field>

            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as "aktif" | "nonaktif",
                  })
                }
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-[#C0392B]/30 focus:outline-none focus:ring-2 focus:ring-[#C0392B]/10"
              >
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-neutral-100 px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={!form.nama || !form.email}
            className="rounded-lg bg-[#C0392B] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#a93023] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {mode === "add" ? "Tambah" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-neutral-700">
        {label}
      </label>
      {children}
    </div>
  );
}