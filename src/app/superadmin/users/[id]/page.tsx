"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Mail,
    Phone,
    Shield,
    User,
    Calendar,
    FileText,
    Trash2,
    ArrowUpRight,
    ArrowDownLeft,
} from "lucide-react";
import { getUserById, deleteUser, updateUserRole } from "@/lib/users";
import { ManagedUser, UserRole } from "@/components/superadmin/Users/types";
import ConfirmModal from "@/components/superadmin/Users/ConfirmModal";
import UserFormModal from "@/components/superadmin/Users/UserFormModal";

// Adapter: User (backend) → ManagedUser (komponen)
function toManagedUser(u: {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}): ManagedUser {
    return {
        id: String(u.id),
        nama: u.name,
        email: u.email,
        nomorHp: "-",
        role: u.role as UserRole,
        status: "aktif",
        bergabung: u.created_at,
        laporanCount: 0,
    };
}

export default function UserDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [user, setUser] = useState<ManagedUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Edit modal
    const [editOpen, setEditOpen] = useState(false);

    // Delete confirm
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Role change confirm
    const [roleOpen, setRoleOpen] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const data = await getUserById(Number(id));
                setUser(toManagedUser(data));
            } catch {
                setError("User tidak ditemukan");
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [id]);

    const handleConfirmDelete = async () => {
        if (!user) return;
        try {
            await deleteUser(Number(user.id));
            router.push("/superadmin/users" as any);
        } catch (err) {
            console.error("Gagal hapus user:", err);
        }
    };

    const handleConfirmRole = async () => {
        if (!user) return;
        const newRole = user.role === "admin" ? "user" : "admin";
        try {
            await updateUserRole(Number(user.id), newRole);
            setUser((prev) => prev ? { ...prev, role: newRole } : prev);
            setRoleOpen(false);
        } catch (err) {
            console.error("Gagal update role:", err);
        }
    };

    const handleSubmitEdit = async (
        data: Omit<ManagedUser, "id" | "bergabung" | "laporanCount"> & { password?: string }
    ) => {
        if (!user) return;
        try {
            // Backend saat ini hanya support update role
            if (data.role !== user.role) {
                await updateUserRole(Number(user.id), data.role);
            }
            setUser((prev) => prev ? { ...prev, ...data } : prev);
            setEditOpen(false);
        } catch (err) {
            console.error("Gagal update user:", err);
        }
    };

    // ── Render states ──────────────────────────────────────────────
    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-sm text-neutral-400">Memuat data user...</p>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex h-64 flex-col items-center justify-center gap-3">
                <p className="text-sm text-red-500">{error ?? "Terjadi kesalahan"}</p>
                <button
                    onClick={() => router.back()}
                    className="text-xs text-neutral-500 hover:text-neutral-700 underline"
                >
                    Kembali
                </button>
            </div>
        );
    }

    const isAdmin = user.role === "admin";
    const initials = user.nama
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="space-y-6">
            {/* Back button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Manajemen User
            </button>

            {/* Profile card */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                    {/* Avatar + info */}
                    <div className="flex items-center gap-4">
                        <div
                            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                                isAdmin
                                    ? "bg-neutral-900 text-white"
                                    : "bg-neutral-100 text-neutral-700"
                            }`}
                        >
                            {initials}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-semibold text-neutral-900">
                                    {user.nama}
                                </h1>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                                        isAdmin
                                            ? "bg-neutral-900 text-white"
                                            : "bg-neutral-100 text-neutral-600"
                                    }`}
                                >
                                    {user.role}
                                </span>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                                        user.status === "aktif"
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-neutral-100 text-neutral-500"
                                    }`}
                                >
                                    {user.status === "aktif" ? "● Aktif" : "○ Nonaktif"}
                                </span>
                            </div>
                            <p className="mt-0.5 text-sm text-neutral-500">{user.email}</p>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            onClick={() => setRoleOpen(true)}
                            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
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
                        <button
                            onClick={() => setEditOpen(true)}
                            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                        >
                            <Shield className="h-3.5 w-3.5" />
                            Edit
                        </button>
                        <button
                            onClick={() => setDeleteOpen(true)}
                            className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-[#C0392B] hover:bg-[#C0392B]/5 transition-colors"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                            Hapus
                        </button>
                    </div>
                </div>
            </div>

            {/* Detail info grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <InfoCard
                    icon={Mail}
                    label="Email"
                    value={user.email}
                />
                <InfoCard
                    icon={Phone}
                    label="Nomor HP"
                    value={user.nomorHp === "-" ? "Belum diisi" : user.nomorHp}
                    muted={user.nomorHp === "-"}
                />
                <InfoCard
                    icon={Calendar}
                    label="Bergabung"
                    value={new Date(user.bergabung).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                />
                <InfoCard
                    icon={FileText}
                    label="Total Laporan"
                    value={`${user.laporanCount} laporan`}
                />
            </div>

            {/* Modals */}
            <UserFormModal
                open={editOpen}
                mode="edit"
                initialRole={user.role}
                user={user}
                onClose={() => setEditOpen(false)}
                onSubmit={handleSubmitEdit}
            />

            <ConfirmModal
                open={deleteOpen}
                variant="danger"
                title={`Hapus ${isAdmin ? "admin" : "user"}?`}
                description={`Akun "${user.nama}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`}
                confirmLabel="Ya, hapus"
                onConfirm={handleConfirmDelete}
                onClose={() => setDeleteOpen(false)}
            />

            <ConfirmModal
                open={roleOpen}
                variant={isAdmin ? "demote" : "promote"}
                title={isAdmin ? "Turunkan ke User?" : "Naikkan ke Admin?"}
                description={
                    isAdmin
                        ? `"${user.nama}" akan kehilangan akses admin dan kembali menjadi user biasa.`
                        : `"${user.nama}" akan mendapat akses penuh sebagai admin untuk mengelola laporan.`
                }
                confirmLabel={isAdmin ? "Turunkan ke User" : "Naikkan ke Admin"}
                onConfirm={handleConfirmRole}
                onClose={() => setRoleOpen(false)}
            />
        </div>
    );
}

function InfoCard({
    icon: Icon,
    label,
    value,
    muted = false,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    muted?: boolean;
}) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-neutral-400" />
                <p className="text-xs font-medium text-neutral-400">{label}</p>
            </div>
            <p className={`text-sm font-medium ${muted ? "text-neutral-400" : "text-neutral-900"}`}>
                {value}
            </p>
        </div>
    );
}