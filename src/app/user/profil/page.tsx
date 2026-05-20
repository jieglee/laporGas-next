"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FileText, Loader2 } from "lucide-react";
import ProfileHeader from "@/components/user/Profile/ProfileHeader";
import EditProfileModal from "@/components/user/Profile/EditProfileModal";
import UserLaporanCard, { type UserLaporan, type UserLaporanStatus } from "@/components/user/Profile/UserLaporanCard";
import { getReports, type Report } from "@/lib/reports";
import { logout } from "@/lib/auth-api";
// ── Adapter ───────────────────────────────────────────────────────────────────

const KATEGORI_MAP: Record<string, string> = {
  "1": "Infrastruktur",
  "2": "Fasilitas Umum",
  "3": "Kebersihan",
  "4": "Lalu Lintas",
};

function toUserLaporan(r: Report): UserLaporan {
  return {
    id: String(r.id),
    judul: r.title,
    deskripsi: r.description,
    kategori: r.category_name || KATEGORI_MAP[String(r.category_id)] || "Lainnya",
    status: r.status as UserLaporanStatus,
    imageUrl: r.image_url,
    upvote: 0,
    komentarCount: 0,
    createdAt: new Date(r.created_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProfilPage() {
  const { data: session } = useSession();
  const [editOpen, setEditOpen] = useState(false);
  const [laporan, setLaporan] = useState<UserLaporan[]>([]);
  const [loadingLaporan, setLoadingLaporan] = useState(true);

  const nama = session?.user?.name ?? "Pengguna";
  const email = session?.user?.email ?? "-";
  const namaArr = nama.split(" ");
  const inisial = namaArr.slice(0, 2).map((n) => n[0]).join("").toUpperCase();

  // Fetch laporan milik user
  useEffect(() => {
    async function fetch() {
      try {
        setLoadingLaporan(true);
const data = await getReports();

const myReports = data.filter(
  (r) => r.user_id === Number(session?.user?.id)
);

setLaporan(myReports.map(toUserLaporan));
        setLaporan(data.map(toUserLaporan));
      } catch {
        setLaporan([]);
      } finally {
        setLoadingLaporan(false);
      }
    }
    fetch();
  }, []);

  const handleSave = async (data: {
    nama: string;
    email: string;
    password?: string;
    avatar?: File;
  }) => {
    // TODO: hit API update profile
    console.log("Simpan profil:", data);
    await new Promise((r) => setTimeout(r, 1000)); // simulate
  };

  const joinedAt = session?.user
    ? new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })
    : "-";

  return (
    <div style={{ padding: "28px 32px 72px", maxWidth: 1100, margin: "0 auto" }}>

      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProfileHeader
          nama={nama}
          email={email}
          joinedAt={joinedAt}
          avatarUrl={session?.user?.image ?? null}
          inisial={inisial}
          onEdit={() => setEditOpen(true)}
          onLogout={async () => {
  await logout();
  window.location.href = "/";
}}
        />
      </motion.div>

      {/* Laporan section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "rgba(255,107,53,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#E8541C",
              }}
            >
              <FileText size={15} strokeWidth={2} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "#1a0e08",
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Laporan Saya
              </h2>
              <p style={{ fontSize: "0.7rem", color: "#a8856b", margin: 0 }}>
                {loadingLaporan ? "Memuat..." : `${laporan.length} laporan dibuat`}
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loadingLaporan ? (
          <div
            style={{
              background: "white",
              border: "0.5px solid #f0e6dc",
              borderRadius: 14,
              padding: "64px 24px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              color: "#a8856b",
              fontSize: "0.85rem",
            }}
          >
            <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
            Memuat laporan...
          </div>
        ) : laporan.length === 0 ? (
          <div
            style={{
              background: "white",
              border: "0.5px solid #f0e6dc",
              borderRadius: 14,
              padding: "72px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(255,107,53,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
              }}
            >
              <FileText size={24} color="#E8541C" strokeWidth={1.8} />
            </div>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a0e08", marginBottom: 5 }}>
              Belum ada laporan
            </p>
            <p style={{ fontSize: "0.78rem", color: "#a8856b", margin: 0 }}>
              Kamu belum pernah membuat laporan
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            {laporan.map((l, i) => (
              <UserLaporanCard key={l.id} laporan={l} index={i} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Edit Modal */}
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