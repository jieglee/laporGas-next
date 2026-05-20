"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import {
  getUserById,
  updateUserRole,
  deleteUser,
  type User,
  type UserRole,
} from "@/lib/users"

import {
  ArrowLeft,
  Mail,
  Shield,
  Calendar,
  Trash2,
  Loader2,
  User as UserIcon,
} from "lucide-react"

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()

  const id = Number(params.id)

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function fetchUser() {
    try {
      setLoading(true)

      const data = await getUserById(id)

      setUser(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchUser()
    }
  }, [id])

  async function handleRoleChange(role: UserRole) {
    if (!user) return

    try {
      setUpdating(true)

      const updated = await updateUserRole(user.id, role)

      setUser(updated)
    } catch (error) {
      console.error(error)
      alert("Gagal update role")
    } finally {
      setUpdating(false)
    }
  }

  async function handleDelete() {
    if (!user) return

    const confirmDelete = confirm(
      "Yakin ingin menghapus user ini?"
    )

    if (!confirmDelete) return

    try {
      setDeleting(true)

      await deleteUser(user.id)

      router.push("/admin/users" as any)
    } catch (error) {
      console.error(error)
      alert("Gagal menghapus user")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf5]">
        <div className="flex items-center gap-2 text-[#8b6b55]">
          <Loader2 size={18} className="animate-spin" />

          Loading user...
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf5]">
        <p className="text-[#8b6b55]">
          User tidak ditemukan
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fffaf5] p-6">
      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-[#8b6b55] transition hover:text-[#E8541C]"
      >
        <ArrowLeft size={16} />

        Kembali
      </button>

      {/* CARD */}
      <div className="overflow-hidden rounded-3xl border border-[#f2e6db] bg-white shadow-sm">
        {/* TOP */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#E8541C] px-8 py-10 text-white">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15 text-3xl font-bold backdrop-blur">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {user.name}
              </h1>

              <p className="mt-1 text-sm text-orange-100">
                User ID #{user.id}
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid gap-6 p-8 md:grid-cols-2">
          {/* INFO */}
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-[#1a0e08]">
              Informasi User
            </h2>

            {/* EMAIL */}
            <div className="rounded-2xl border border-[#f5e8db] p-5">
              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-[#E8541C]"
                />

                <div>
                  <p className="text-xs text-[#8b6b55]">
                    Email
                  </p>

                  <p className="font-medium text-[#1a0e08]">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* ROLE */}
            <div className="rounded-2xl border border-[#f5e8db] p-5">
              <div className="flex items-center gap-3">
                <Shield
                  size={18}
                  className="text-[#E8541C]"
                />

                <div className="w-full">
                  <p className="text-xs text-[#8b6b55]">
                    Role
                  </p>

                  <select
                    value={user.role}
                    disabled={updating}
                    onChange={(e) =>
                      handleRoleChange(
                        e.target.value as UserRole
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-[#ecd9c9] px-4 py-3 outline-none focus:border-[#E8541C]"
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
              </div>
            </div>

            {/* CREATED */}
            <div className="rounded-2xl border border-[#f5e8db] p-5">
              <div className="flex items-center gap-3">
                <Calendar
                  size={18}
                  className="text-[#E8541C]"
                />

                <div>
                  <p className="text-xs text-[#8b6b55]">
                    Dibuat Pada
                  </p>

                  <p className="font-medium text-[#1a0e08]">
                    {new Date(
                      user.created_at
                    ).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PROFILE */}
          <div className="rounded-3xl border border-[#f5e8db] bg-[#fffaf7] p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#FFF5EE]">
                <UserIcon
                  size={50}
                  className="text-[#E8541C]"
                />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-[#1a0e08]">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-[#8b6b55]">
                {user.email}
              </p>

              <div className="mt-4 rounded-full bg-[#FFE8DE] px-4 py-2 text-sm font-semibold text-[#E8541C]">
                {user.role}
              </div>

              {/* DELETE */}
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="mt-8 flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <Trash2 size={16} />
                )}

                Hapus User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}