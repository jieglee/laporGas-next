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

export default function ProfilPage() {
    const { data: session, update: updateSession } = useSession();
    const [editOpen, setEditOpen] = useState(false);
    const [reports, setReports] = useState<Report[]>([]);
    const [loadingLaporan, setLoadingLaporan] = useState(true);

    const nama = session?.user?.name ?? "Pengguna";
    const email = session?.user?.email ?? "-";
    const inisial = (nama ?? "U").split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

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

    // update session biar langsung refresh
    await updateSession({
        user: {
            ...session?.user,
            name: updatedUser.name,
            email: updatedUser.email,
        },
    });
};

    const joinedAt = session?.user
        ? new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })
        : "-";

    return (
        <div style={{ padding: "28px 32px 72px", maxWidth: 1100, margin: "0 auto" }}>
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
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(255,107,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#E8541C" }}>
                        <FileText size={15} strokeWidth={2} />
                    </div>
                    <div>
                        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 800, color: "#1a0e08", letterSpacing: "-0.02em", margin: 0 }}>
                            Laporan Saya
                        </h2>
                        <p style={{ fontSize: "0.7rem", color: "#a8856b", margin: 0 }}>
                            {loadingLaporan ? "Memuat..." : `${reports.length} laporan dibuat`}
                        </p>
                    </div>
                </div>

                {loadingLaporan ? (
                    <div style={{ background: "white", border: "0.5px solid #f0e6dc", borderRadius: 14, padding: "64px 24px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "#a8856b", fontSize: "0.85rem" }}>
                        <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                        Memuat laporan...
                    </div>
                ) : reports.length === 0 ? (
                    <div style={{ background: "white", border: "0.5px solid #f0e6dc", borderRadius: 14, padding: "72px 24px", textAlign: "center" }}>
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,107,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                            <FileText size={24} color="#E8541C" strokeWidth={1.8} />
                        </div>
                        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a0e08", marginBottom: 5 }}>Belum ada laporan</p>
                        <p style={{ fontSize: "0.78rem", color: "#a8856b", margin: 0 }}>Kamu belum pernah membuat laporan</p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                        {reports.map((r, i) => (
                            <ReportCard key={r.id} report={r} index={i} />
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

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}