"use client";

import { useEffect, useMemo, useState } from "react";
import ConfirmModal from "@/components/superadmin/Users/ConfirmModal";
import UserColumn from "@/components/superadmin/Users/UserColumn";
import UserFormModal from "@/components/superadmin/Users/UserFormModal";
import { ManagedUser, UserRole } from "@/components/superadmin/Users/types";
import { getUsers, createUser, updateUserRole, deleteUser } from "@/lib/users"

export default function ManajemenUserPage() {
  const [users, setUsers] = useState<ManagedUser[]>([])
  const [loading, setLoading] = useState(true)

  function toManagedUser(u: { id: number; name: string; email: string; role: string; created_at: string }): ManagedUser {
    return {
        id: String(u.id),
        nama: u.name,
        email: u.email,
        nomorHp: "-",
        role: u.role as UserRole,
        status: "aktif",
        bergabung: u.created_at,
        laporanCount: 0,
    }
}

useEffect(() => {
    async function fetch() {
        const data = await getUsers()
        const filtered = data.filter(u => u.role !== "superadmin")
        setUsers(filtered.map(toManagedUser))
        setLoading(false)
    }
    fetch()
}, [])
  // Form modal state
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [formInitialRole, setFormInitialRole] = useState<UserRole>("user");
  const [formUser, setFormUser] = useState<ManagedUser | null>(null);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<ManagedUser | null>(null);

  // Role change confirm
  const [roleTarget, setRoleTarget] = useState<ManagedUser | null>(null);

  // Split user vs admin
  const userList = useMemo(
    () => users.filter((u) => u.role === "user"),
    [users],
  );
  const adminList = useMemo(
    () => users.filter((u) => u.role === "admin"),
    [users],
  );

  // === Handlers ===
  const handleAdd = (role: UserRole) => {
    setFormMode("add");
    setFormInitialRole(role);
    setFormUser(null);
    setFormOpen(true);
  };

  const handleEdit = (u: ManagedUser) => {
    setFormMode("edit");
    setFormUser(u);
    setFormInitialRole(u.role);
    setFormOpen(true);
  };

  const handleSubmitForm = async (data: { nama: string; email: string; password?: string; role: UserRole }) => {
    if (formMode === "add") {
        const newUser = await createUser({ name: data.nama, email: data.email, password: data.password! })
        if (data.role !== "user") await updateUserRole(newUser.id, data.role)
        setUsers(prev => [toManagedUser(newUser), ...prev])
    } else if (formUser) {
        if (data.role !== formUser.role) await updateUserRole(Number(formUser.id), data.role)
        setUsers(prev => prev.map(u => u.id === formUser.id ? { ...u, ...data } : u))
    }
    setFormOpen(false)
}

const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    await deleteUser(Number(deleteTarget.id))
    setUsers(prev => prev.filter(u => u.id !== deleteTarget.id))
    setDeleteTarget(null)
}

const handleConfirmRole = async () => {
    if (!roleTarget) return
    const newRole = roleTarget.role === "admin" ? "user" : "admin"
    await updateUserRole(Number(roleTarget.id), newRole)
    setUsers(prev => prev.map(u => u.id === roleTarget.id ? { ...u, role: newRole } : u))
    setRoleTarget(null)
} 

  if (loading) return (
      <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-neutral-400">Memuat data user...</p>
      </div>
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Manajemen User
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Kelola akun user dan admin, atur role, serta status aktif
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch">
        <UserColumn
          title="User"
          subtitle="Pelapor masyarakat"
          variant="user"
          users={userList}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={(u) => setDeleteTarget(u)}
          onChangeRole={(u) => setRoleTarget(u)}
        />
        <UserColumn
          title="Admin"
          subtitle="Pengelola laporan"
          variant="admin"
          users={adminList}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={(u) => setDeleteTarget(u)}
          onChangeRole={(u) => setRoleTarget(u)}
        />
      </div>

      {/* Modals */}
      <UserFormModal
        open={formOpen}
        mode={formMode}
        initialRole={formInitialRole}
        user={formUser}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmitForm}
      />

      <ConfirmModal
        open={!!deleteTarget}
        variant="danger"
        title={`Hapus ${deleteTarget?.role === "admin" ? "admin" : "user"}?`}
        description={`Akun "${deleteTarget?.nama}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, hapus"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />

      <ConfirmModal
        open={!!roleTarget}
        variant={roleTarget?.role === "admin" ? "demote" : "promote"}
        title={
          roleTarget?.role === "admin"
            ? "Turunkan ke User?"
            : "Naikkan ke Admin?"
        }
        description={
          roleTarget?.role === "admin"
            ? `"${roleTarget?.nama}" akan kehilangan akses admin dan kembali menjadi user biasa.`
            : `"${roleTarget?.nama}" akan mendapat akses penuh sebagai admin untuk mengelola laporan.`
        }
        confirmLabel={
          roleTarget?.role === "admin"
            ? "Turunkan ke User"
            : "Naikkan ke Admin"
        }
        onConfirm={handleConfirmRole}
        onClose={() => setRoleTarget(null)}
      />
    </div>
  );
}