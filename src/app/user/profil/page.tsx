"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FileText, Loader2 } from "lucide-react";
import ProfileHeader from "@/components/user/Profile/ProfileHeader";
import EditProfileModal from "@/components/user/Profile/EditProfileModal";
import ReportCard from "@/components/common-ui/ReportCard";
import { getReports, type Report } from "@/lib/reports";
import { updateProfile } from "@/lib/users";
import { logout } from "@/lib/auth-api";
import EditLaporanModal from "@/components/admin/Users/profile/EditLaporanModal";

export default function ProfilPage() {
    const { data: session, update: updateSession } = useSession();
    const [editOpen, setEditOpen] = useState(false);
    const [reports, setReports] = useState<Report[]>([]);
    const [loadingLaporan, setLoadingLaporan] = useState(true);

    const nama = session?.user?.name ?? "Pengguna";
    const email = session?.user?.email ?? "-";
    const inisial = (nama ?? "U").split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

    const [editLaporan, setEditLaporan] = useState<Report | null>(null);

    const handleLaporanSaved = (updated: Report) => {
    setReports((prev) => prev.map((r) =>
        r.id === updated.id
            ? { ...r, title: updated.title, description: updated.description, priority: updated.priority, edit_count: updated.edit_count }
            : r
    ));
};

    useEffect(() => {
        async function fetchReports() {
            try {
                if (!session?.user?.id) return;
                setLoadingLaporan(true);
                const data = await getReports();
                const myReports = data.filter(
                    (r) => Number(r.user_id) === Number(session.user.id)
                );
                setReports(myReports);
            } catch (error) {
                console.error(error);
                setReports([]);
            } finally {
                setLoadingLaporan(false);
            }
        }
        fetchReports();
    }, [session?.user?.id]);

    const handleSave = async (data: {
        nama: string;
        email: string;
        password?: string;
        avatar?: File;
    }) => {
        const updatedUser = await updateProfile({
            name: data.nama,
            email: data.email,
            ...(data.password ? { password: data.password } : {}),
        });
        await updateSession({
            user: { ...session?.user, name: updatedUser.name, email: updatedUser.email },
        });
    };

    const joinedAt = session?.user
        ? new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })
        : "-";

    return (
        <div className="px-8 pt-7 pb-[72px] max-w-[1100px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <ProfileHeader
                    nama={nama}
                    email={email}
                    joinedAt={joinedAt}
                    avatarUrl={session?.user?.image ?? null}
                    inisial={inisial}
                    onEdit={() => setEditOpen(true)}
                    onLogout={async () => { await logout(); }}
                />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex items-center gap-[10px] mb-4">
                    <div className="w-8 h-8 rounded-[9px] bg-[rgba(255,107,53,0.08)] flex items-center justify-center text-[#E8541C]">
                        <FileText size={15} strokeWidth={2} />
                    </div>
                    <div>
                        <h2 className="font-sans text-[1.1rem] font-extrabold text-[#1a0e08] tracking-[-0.02em] m-0">
                            Laporan Saya
                        </h2>
                        <p className="text-[0.7rem] text-[#a8856b] m-0">
                            {loadingLaporan ? "Memuat..." : `${reports.length} laporan dibuat`}
                        </p>
                    </div>
                </div>

                {loadingLaporan ? (
                    <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] py-16 px-6 text-center flex items-center justify-center gap-[10px] text-[#a8856b] text-[0.85rem]">
                        <Loader2 size={18} className="animate-spin" />
                        Memuat laporan...
                    </div>
                ) : reports.length === 0 ? (
                    <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] py-[72px] px-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-[rgba(255,107,53,0.08)] flex items-center justify-center mx-auto mb-[14px]">
                            <FileText size={24} color="#E8541C" strokeWidth={1.8} />
                        </div>
                        <p className="text-[0.9rem] font-semibold text-[#1a0e08] mb-[5px]">Belum ada laporan</p>
                        <p className="text-[0.78rem] text-[#a8856b] m-0">Kamu belum pernah membuat laporan</p>
                    </div>
                ) : (
                    <div className="grid gap-[14px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
                        {reports.map((r, i) => (
                            <div key={r.id} className="relative group">
                                <ReportCard report={r} index={i} />
                                {r.edit_count < 1 && r.status === "pending" && (
                                    <button
                                        onClick={() => setEditLaporan(r)}
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-[#f0e6dc] rounded-lg px-3 py-1.5 text-[0.7rem] font-semibold text-[#E8541C] hover:bg-[#FFF5EE] cursor-pointer z-10"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>

            <EditProfileModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                initial={{ nama, email, avatarUrl: session?.user?.image ?? null, inisial }}
                onSave={handleSave}
            />

            <EditLaporanModal
                open={!!editLaporan}
                onClose={() => setEditLaporan(null)}
                report={editLaporan!}
                onSaved={handleLaporanSaved}
            />

        </div>
    );
}