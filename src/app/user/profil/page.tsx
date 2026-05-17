"use client";

import { useState } from "react";
import { Grid3x3 } from "lucide-react";
import ProfileHeader from "@/components/user/Profile/ProfileHeader";
import LaporanGrid from "@/components/user/Profile/LaporanGrid";
import EditProfileModal from "@/components/user/Profile/EditProfileModal";
import { MOCK_USER, MOCK_USER_LAPORAN, type UserProfile } from "@/lib/mock-user";

export default function ProfilPage() {
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [editOpen, setEditOpen] = useState(false);

  const handleSave = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
    // TODO: hook ke API
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf8" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 64px" }}>

        <ProfileHeader user={user} onEditClick={() => setEditOpen(true)} />

        {/* Tab indicator */}
        <div
          style={{
            borderTop: "0.5px solid #f0e6dc",
            display: "flex",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "14px 16px",
              borderTop: "1.5px solid #1a0e08",
              marginTop: "-0.5px",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#1a0e08",
            }}
          >
            <Grid3x3 size={13} strokeWidth={2} />
            Laporan
          </div>
        </div>

        <LaporanGrid laporan={MOCK_USER_LAPORAN} />
      </div>

      <EditProfileModal
        user={user}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}