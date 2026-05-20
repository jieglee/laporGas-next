"use client"

import { useEffect, useState } from "react"
import {
    getUsers,
    deleteUser,
    updateUserRole,
    type User,
    type UserRole,
} from "@/lib/users"

import {
    Users,
    Shield,
    Trash2,
    Loader2,
} from "lucide-react"

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [updatingId, setUpdatingId] = useState<number | null>(null)

    async function fetchUsers() {
        try {
            setLoading(true)

            const data = await getUsers()

            setUsers(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    async function handleDelete(id: number) {
        const confirmDelete = confirm("Yakin ingin menghapus user ini?")

        if (!confirmDelete) return

        try {
            setDeletingId(id)

            await deleteUser(id)

            setUsers((prev) => prev.filter((u) => u.id !== id))
        } catch (error) {
            console.error(error)
            alert("Gagal menghapus user")
        } finally {
            setDeletingId(null)
        }
    }

    async function handleRoleChange(id: number, role: UserRole) {
        try {
            setUpdatingId(id)

            const updated = await updateUserRole(id, role)

            setUsers((prev) =>
                prev.map((u) =>
                    u.id === id
                        ? {
                            ...u,
                            role: updated.role,
                        }
                        : u
                )
            )
        } catch (error) {
            console.error(error)
            alert("Gagal update role")
        } finally {
            setUpdatingId(null)
        }
    }

    return (
        <div className="min-h-screen bg-[#fffaf5] p-6">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1a0e08]">
                        Manajemen User
                    </h1>

                    <p className="mt-1 text-sm text-[#8b6b55]">
                        Kelola semua user dalam sistem
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm border border-[#f5e8db]">
                    <Users size={18} className="text-[#E8541C]" />

                    <div>
                        <p className="text-xs text-[#8b6b55]">
                            Total User
                        </p>

                        <p className="text-lg font-bold text-[#1a0e08]">
                            {users.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-[#f3e6d9] bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#fff5ee]">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#5b3b28]">
                                    Nama
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#5b3b28]">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#5b3b28]">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-[#5b3b28]">
                                    Dibuat
                                </th>

                                <th className="px-6 py-4 text-right text-sm font-semibold text-[#5b3b28]">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-14 text-center"
                                    >
                                        <div className="flex items-center justify-center gap-2 text-[#8b6b55]">
                                            <Loader2 className="animate-spin" size={18} />

                                            Loading users...
                                        </div>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-14 text-center text-[#8b6b55]"
                                    >
                                        Tidak ada user
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-[#f8efe6] hover:bg-[#fffaf7]"
                                    >
                                        {/* NAME */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF5EE] font-semibold text-[#E8541C]">
                                                    {user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <a
                                                        href={`/admin/users/${user.id}`}
                                                        className="font-medium text-[#1a0e08] hover:text-[#E8541C]"
                                                    >
                                                        {user.name}
                                                    </a>

                                                    <p className="text-xs text-[#8b6b55]">
                                                        ID: {user.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* EMAIL */}
                                        <td className="px-6 py-4 text-sm text-[#5b3b28]">
                                            {user.email}
                                        </td>

                                        {/* ROLE */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Shield
                                                    size={15}
                                                    className="text-[#E8541C]"
                                                />

                                                <select
                                                    value={user.role}
                                                    disabled={updatingId === user.id}
                                                    onChange={(e) =>
                                                        handleRoleChange(
                                                            user.id,
                                                            e.target.value as UserRole
                                                        )
                                                    }
                                                    className="rounded-lg border border-[#ecd9c9] bg-white px-3 py-2 text-sm outline-none focus:border-[#E8541C]"
                                                >
                                                    <option value="user">
                                                        user
                                                    </option>

                                                    <option value="admin">
                                                        admin
                                                    </option>

                                                    <option value="superadmin">
                                                        superadmin
                                                    </option>
                                                </select>
                                            </div>
                                        </td>

                                        {/* CREATED */}
                                        <td className="px-6 py-4 text-sm text-[#8b6b55]">
                                            {new Date(user.created_at).toLocaleDateString(
                                                "id-ID"
                                            )}
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                    disabled={deletingId === user.id}
                                                    className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                                                >
                                                    {deletingId === user.id ? (
                                                        <Loader2
                                                            size={15}
                                                            className="animate-spin"
                                                        />
                                                    ) : (
                                                        <Trash2 size={15} />
                                                    )}

                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}