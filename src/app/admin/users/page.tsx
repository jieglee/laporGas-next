"use client"

import { useEffect, useState, useMemo } from "react"
import { getUsers, deleteUser, updateUserRole, createUser, updateUserById, type User, type UserRole } from "@/lib/users"
import { Users, Shield, Trash2, Loader2, Plus, Search, X, Eye, EyeOff, Pencil, Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
import * as AlertDialog from "@radix-ui/react-alert-dialog";



function ConfirmDelete({ open, onConfirm, onCancel, loading, message }: {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
    message: string;
}) {
    return (
        <AlertDialog.Root open={open} onOpenChange={(v) => !v && onCancel()}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <AlertDialog.Content className="fixed left-1/2 top-1/2 z-[201] w-full max-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                    <div className="px-6 pt-6 pb-4">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                            <Trash2 size={18} className="text-red-500" />
                        </div>
                        <AlertDialog.Title className="text-[0.95rem] font-bold text-[#1a0e08] mb-1">
                            Konfirmasi Hapus
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-[0.82rem] text-[#a8856b] leading-[1.6]">
                            {message}
                        </AlertDialog.Description>
                    </div>
                    <div className="flex gap-2 px-6 pb-5">
                        <AlertDialog.Cancel asChild>
                            <button className="flex-1 rounded-xl border border-[#f0e6dc] bg-white py-2.5 text-[0.82rem] font-semibold text-[#3d2817] transition hover:bg-[#fafaf8] cursor-pointer">
                                Batal
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button onClick={onConfirm} disabled={loading}
                                    className="flex-1 rounded-xl bg-red-500 py-2.5 text-[0.82rem] font-bold text-white transition hover:bg-red-600 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
                                {loading && <Loader2 size={13} className="animate-spin" />}
                                Hapus
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

// ── Add User Modal ─────────────────────────────────────
function AddUserModal({ open, onClose, onAdded, defaultRole }: {
    open: boolean; onClose: () => void; onAdded: (user: User) => void; defaultRole: UserRole;
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<UserRole>(defaultRole);
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setName(""); setEmail(""); setPassword("");
            setRole(defaultRole); setError(null);
            requestAnimationFrame(() => setVisible(true));
        } else setVisible(false);
    }, [open, defaultRole]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const handleSubmit = async () => {
        if (!name.trim() || !email.trim() || password.length < 6) return;
        try {
            setLoading(true); setError(null);
            const user = await createUser({ name: name.trim(), email: email.trim(), password });
            if (role !== "user") await updateUserRole(user.id, role);
            onAdded({ ...user, role });
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message ?? "Gagal menambah user");
        } finally { setLoading(false); }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 backdrop-blur-sm transition-all duration-200"
             style={{ background: visible ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)" }} onClick={onClose}>
            <div className="w-full max-w-[440px] overflow-hidden rounded-[20px] bg-white shadow-2xl transition-all duration-[250ms]"
                 style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                 onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-[#f5ede3] px-6 py-5">
                    <div>
                        <h2 className="text-[1.05rem] font-extrabold text-[#1a0e08] tracking-[-0.02em] m-0">
                            Tambah {defaultRole === "admin" ? "Admin" : "User"}
                        </h2>
                        <p className="mt-1 text-[0.72rem] text-[#a8856b] m-0">Buat akun baru di sistem</p>
                    </div>
                    <button onClick={onClose} className="text-[#a8856b] hover:text-[#1a0e08] transition-colors p-1 rounded-lg bg-transparent border-0 cursor-pointer">
                        <X size={19} />
                    </button>
                </div>
                <div className="flex flex-col gap-4 px-6 py-5">
                    <div>
                        <label className="mb-[6px] block text-[0.72rem] font-bold text-[#3d2817]">Nama lengkap</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap"
                               className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35]" />
                    </div>
                    <div>
                        <label className="mb-[6px] block text-[0.72rem] font-bold text-[#3d2817]">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@domain.com"
                               className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35]" />
                    </div>
                    <div>
                        <label className="mb-[6px] block text-[0.72rem] font-bold text-[#3d2817]">Password</label>
                        <div className="relative">
                            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 karakter"
                                   className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 pr-11 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35]" />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a8856b] bg-transparent border-0 cursor-pointer">
                                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                        {password.length > 0 && password.length < 6 && (
                            <p className="text-[0.65rem] text-red-400 mt-1">Minimal 6 karakter</p>
                        )}
                    </div>
                    <div>
                        <label className="mb-[6px] block text-[0.72rem] font-bold text-[#3d2817]">Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}
                                className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35] cursor-pointer">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Superadmin</option>
                        </select>
                    </div>
                    {error && <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-[0.78rem] text-red-700">{error}</div>}
                </div>
                <div className="flex justify-end gap-3 border-t border-[#f5ede3] bg-[#fafaf8] px-6 py-4">
                    <button onClick={onClose} className="rounded-xl border border-[#f0e6dc] bg-white px-5 py-2.5 text-sm font-semibold text-[#3d2817] transition hover:bg-[#fafaf8] cursor-pointer">
                        Batal
                    </button>
                    <button onClick={handleSubmit} disabled={loading || !name.trim() || !email.trim() || password.length < 6}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E8541C] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                        {loading && <Loader2 size={14} className="animate-spin" />}
                        {loading ? "Menyimpan..." : "Tambah"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Edit User Modal ────────────────────────────────────
function EditUserModal({ user, onClose, onSaved }: {
    user: User | null; onClose: () => void; onSaved: (updated: User) => void;
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<UserRole>("user");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name); setEmail(user.email);
            setRole(user.role); setPassword(""); setError(null);
            requestAnimationFrame(() => setVisible(true));
        } else setVisible(false);
    }, [user]);

    useEffect(() => {
        document.body.style.overflow = user ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [user]);

    const handleSubmit = async () => {
        if (!user || !name.trim() || !email.trim()) return;
        try {
            setLoading(true); setError(null);

            const payload: { name?: string; email?: string; password?: string } = {};
            if (name.trim() !== user.name) payload.name = name.trim();
            if (email.trim() !== user.email) payload.email = email.trim();
            if (password.length >= 6) payload.password = password;

            let updated = { ...user };

            if (Object.keys(payload).length > 0) {
                const res = await updateUserById(user.id, payload);
                updated = { ...updated, ...res };
            }

            if (role !== user.role) {
                const res = await updateUserRole(user.id, role);
                updated = { ...updated, role: res.role };
            }

            onSaved(updated);
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message ?? "Gagal menyimpan");
        } finally { setLoading(false); }
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 backdrop-blur-sm transition-all duration-200"
             style={{ background: visible ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)" }} onClick={onClose}>
            <div className="w-full max-w-[440px] overflow-hidden rounded-[20px] bg-white shadow-2xl transition-all duration-[250ms]"
                 style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                 onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-[#f5ede3] px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#FFF5EE] flex items-center justify-center">
                            <Pencil size={16} className="text-[#E8541C]" />
                        </div>
                        <div>
                            <h2 className="text-[1.05rem] font-extrabold text-[#1a0e08] tracking-[-0.02em] m-0">Edit User</h2>
                            <p className="mt-1 text-[0.72rem] text-[#a8856b] m-0">ID #{user.id} · {user.role}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-[#a8856b] hover:text-[#1a0e08] transition-colors p-1 rounded-lg bg-transparent border-0 cursor-pointer">
                        <X size={19} />
                    </button>
                </div>
                <div className="flex flex-col gap-4 px-6 py-5">
                    <div>
                        <label className="mb-[6px] block text-[0.72rem] font-bold text-[#3d2817]">Nama lengkap</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                               className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35]" />
                    </div>
                    <div>
                        <label className="mb-[6px] block text-[0.72rem] font-bold text-[#3d2817]">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                               className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35]" />
                    </div>
                    <div>
                        <label className="mb-[6px] block text-[0.72rem] font-bold text-[#3d2817]">Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}
                                className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35] cursor-pointer">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Superadmin</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-[6px] block text-[0.72rem] font-bold text-[#3d2817]">
                            Password baru
                            <span className="ml-1 font-normal text-[#a8856b]">(kosongkan jika tidak diubah)</span>
                        </label>
                        <div className="relative">
                            <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                                   className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 pr-11 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35]" />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a8856b] bg-transparent border-0 cursor-pointer">
                                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                        {password.length > 0 && password.length < 6 && (
                            <p className="text-[0.65rem] text-red-400 mt-1">Minimal 6 karakter</p>
                        )}
                    </div>
                    {error && <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-[0.78rem] text-red-700">{error}</div>}
                </div>
                <div className="flex justify-end gap-3 border-t border-[#f5ede3] bg-[#fafaf8] px-6 py-4">
                    <button onClick={onClose} className="rounded-xl border border-[#f0e6dc] bg-white px-5 py-2.5 text-sm font-semibold text-[#3d2817] transition hover:bg-[#fafaf8] cursor-pointer">
                        Batal
                    </button>
                    <button onClick={handleSubmit} disabled={loading || !name.trim() || !email.trim()}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E8541C] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                        {loading && <Loader2 size={14} className="animate-spin" />}
                        {loading ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── User Row ───────────────────────────────────────────
function UserRow({ user, onDelete, onEdit, deletingId }: {
    user: User; onDelete: (id: number) => void; onEdit: (user: User) => void; deletingId: number | null;
}) {
    const inisial = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    const roleColor = {
        user:       "from-slate-400 to-slate-500",
        admin:      "from-orange-400 to-orange-500",
        superadmin: "from-red-400 to-red-600",
    }[user.role];

    return (
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#fafaf8] transition-colors group">
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-[0.72rem] shrink-0 bg-gradient-to-br", roleColor)}>
                {inisial}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    <p className="text-[0.82rem] font-semibold text-[#1a0e08] m-0 truncate">{user.name}</p>
                    {user.role === "superadmin" && <Crown size={10} className="text-red-400 shrink-0" />}
                </div>
                <p className="text-[0.68rem] text-[#a8856b] m-0 truncate">{user.email}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
                <span className={cn(
                    "text-[0.6rem] font-bold uppercase tracking-[0.06em] px-2 py-[3px] rounded-full border",
                    user.role === "superadmin" ? "bg-red-50 text-red-600 border-red-200" :
                    user.role === "admin" ? "bg-orange-50 text-orange-500 border-orange-200" :
                    "bg-slate-50 text-slate-500 border-slate-200"
                )}>
                    {user.role}
                </span>
                <button onClick={() => onEdit(user)}
                        className="w-7 h-7 rounded-lg bg-transparent border-0 flex items-center justify-center text-[#d4b89e] hover:text-[#E8541C] hover:bg-[#FFF5EE] transition-all cursor-pointer opacity-0 group-hover:opacity-100">
                    <Pencil size={12} />
                </button>
                <button onClick={() => onDelete(user.id)} disabled={deletingId === user.id}
                        className="w-7 h-7 rounded-lg bg-transparent border-0 flex items-center justify-center text-[#d4b89e] hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer disabled:opacity-50 opacity-0 group-hover:opacity-100">
                    {deletingId === user.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                </button>
            </div>
        </div>
    );
}

// ── Main Page ──────────────────────────────────────────
export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [addModal, setAddModal] = useState<UserRole | null>(null);
    const [editUser, setEditUser] = useState<User | null>(null);

    async function fetchUsers() {
        try { setLoading(true); setUsers(await getUsers()); }
        catch (err) { console.error(err); }
        finally { setLoading(false); }
    }

    useEffect(() => { fetchUsers(); }, []);

    async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus user ini?")) return;
    try {
        setDeletingId(id);
        await deleteUser(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast.success("User berhasil dihapus");
    } catch {
        toast.error("Gagal menghapus user");
    } finally {
        setDeletingId(null);
    }
}

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return users;
        return users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }, [users, search]);

    const regularUsers = filtered.filter((u) => u.role === "user");
    const adminUsers = filtered.filter((u) => u.role === "admin" || u.role === "superadmin");
    const totalUsers = users.filter((u) => u.role === "user").length;
    const totalAdmins = users.filter((u) => u.role === "admin" || u.role === "superadmin").length;

    return (
        <div className="px-8 pt-8 pb-16 max-w-[1280px] mx-auto">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-[1.65rem] font-extrabold text-[#1a0e08] tracking-[-0.03em] m-0 mb-1"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        Manajemen User
                    </h1>
                    <p className="text-[0.82rem] text-[#a8856b] m-0">Kelola semua user dan admin dalam sistem</p>
                </div>
                <div className="flex items-center gap-3">
                    {[
                        { icon: Users, label: "User", value: totalUsers },
                        { icon: Shield, label: "Admin", value: totalAdmins },
                    ].map((s) => (
                        <div key={s.label} className="flex items-center gap-2 bg-white border-[0.5px] border-[#f0e6dc] rounded-[12px] px-4 py-3">
                            <s.icon size={15} className="text-[#E8541C]" />
                            <div>
                                <p className="text-[0.6rem] text-[#a8856b] m-0 uppercase tracking-[0.06em]">{s.label}</p>
                                <p className="text-[1rem] font-bold text-[#1a0e08] m-0 leading-none">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 bg-white border-[0.5px] border-[#f0e6dc] rounded-[10px] px-4 h-[42px] mb-6">
                <Search size={15} className="text-[#a8856b] shrink-0" />
                <input type="text" placeholder="Cari nama atau email..." value={search} onChange={(e) => setSearch(e.target.value)}
                       className="flex-1 border-0 outline-none text-[0.85rem] text-[#1a0e08] bg-transparent" />
                {search && (
                    <button onClick={() => setSearch("")} className="text-[#a8856b] bg-transparent border-0 cursor-pointer p-0">
                        <X size={14} />
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-[300px]">
                    <div className="flex items-center gap-2 text-[#a8856b]">
                        <Loader2 size={18} className="animate-spin" />
                        <p className="text-[0.85rem]">Memuat data...</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* USER COLUMN */}
                    <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[16px] overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f5ede3]">
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-[#E8541C]" />
                                <h2 className="text-[0.9rem] font-bold text-[#1a0e08] m-0">User</h2>
                                <span className="text-[0.65rem] font-bold bg-[#FFF5EE] text-[#E8541C] border border-[#f0e6dc] px-2 py-[2px] rounded-full">
                                    {regularUsers.length}
                                </span>
                            </div>
                            <button onClick={() => setAddModal("user")}
                                    className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-[#E8541C] bg-[#FFF5EE] border border-[rgba(255,107,53,0.2)] rounded-lg px-3 py-[6px] cursor-pointer hover:bg-[#FFE8DC] transition-colors">
                                <Plus size={12} /> Tambah
                            </button>
                        </div>
                        <div className="p-2 max-h-[500px] overflow-y-auto">
                            {regularUsers.length === 0 ? (
                                <div className="py-10 text-center text-[#a8856b] text-[0.82rem]">
                                    {search ? "Tidak ada hasil" : "Belum ada user"}
                                </div>
                            ) : regularUsers.map((u) => (
                                <UserRow key={u.id} user={u} onDelete={handleDelete} onEdit={setEditUser} deletingId={deletingId} />
                            ))}
                        </div>
                    </div>

                    {/* ADMIN COLUMN */}
                    <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[16px] overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f5ede3]">
                            <div className="flex items-center gap-2">
                                <Shield size={16} className="text-[#E8541C]" />
                                <h2 className="text-[0.9rem] font-bold text-[#1a0e08] m-0">Admin</h2>
                                <span className="text-[0.65rem] font-bold bg-[#FFF5EE] text-[#E8541C] border border-[#f0e6dc] px-2 py-[2px] rounded-full">
                                    {adminUsers.length}
                                </span>
                            </div>
                            <button onClick={() => setAddModal("admin")}
                                    className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-[#E8541C] bg-[#FFF5EE] border border-[rgba(255,107,53,0.2)] rounded-lg px-3 py-[6px] cursor-pointer hover:bg-[#FFE8DC] transition-colors">
                                <Plus size={12} /> Tambah
                            </button>
                        </div>
                        <div className="p-2 max-h-[500px] overflow-y-auto">
                            {adminUsers.length === 0 ? (
                                <div className="py-10 text-center text-[#a8856b] text-[0.82rem]">
                                    {search ? "Tidak ada hasil" : "Belum ada admin"}
                                </div>
                            ) : adminUsers.map((u) => (
                                <UserRow key={u.id} user={u} onDelete={handleDelete} onEdit={setEditUser} deletingId={deletingId} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <AddUserModal open={!!addModal} onClose={() => setAddModal(null)}
                          onAdded={(user) => setUsers((prev) => [...prev, user])} defaultRole={addModal ?? "user"} />

            <EditUserModal user={editUser} onClose={() => setEditUser(null)}
                           onSaved={(updated) => setUsers((prev) => prev.map((u) => u.id === updated.id ? updated : u))} />
        </div>
    );
}