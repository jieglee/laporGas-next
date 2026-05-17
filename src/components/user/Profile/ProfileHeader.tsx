"use client";

import Link from "next/link";
import { MapPin, Calendar, Settings } from "lucide-react";
import type { UserProfile } from "@/lib/mock-user";

interface Props {
  user: UserProfile;
  onEditClick: () => void;
}

export default function ProfileHeader({ user, onEditClick }: Props) {
  const inisial = user.nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <section style={{ padding: "32px 0 24px" }}>
      {/* Avatar + stats horizontal */}
      <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 20 }}>
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6B35, #E8541C)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "white",
            fontFamily: "'Syne', sans-serif",
            flexShrink: 0,
            boxShadow: "0 4px 16px rgba(255,107,53,0.18)",
          }}
        >
          {inisial}
        </div>

        <div style={{ flex: 1, display: "flex", gap: 32, flexWrap: "wrap" }}>
          {[
            { label: "laporan",      value: user.stats.laporan },
            { label: "diselesaikan", value: user.stats.diselesaikan },
            { label: "dukungan",     value: user.stats.dukungan.toLocaleString("id-ID") },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#1a0e08", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#a8856b", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Name */}
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#1a0e08", letterSpacing: "-0.025em", margin: 0, marginBottom: 10 }}>
        {user.nama}
      </h1>

      {/* Bio */}
      <p style={{ fontSize: "0.85rem", color: "#3d2817", lineHeight: 1.65, margin: "0 0 14px", maxWidth: 480 }}>
        {user.bio}
      </p>

      {/* Meta */}
      <div style={{ display: "flex", gap: 18, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: "#8a6f5e" }}>
          <MapPin size={13} strokeWidth={1.8} />
          {user.lokasi}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.75rem", color: "#8a6f5e" }}>
          <Calendar size={13} strokeWidth={1.8} />
          Bergabung sejak {user.bergabungSejak}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onEditClick}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "white",
            border: "0.5px solid #f0e6dc",
            borderRadius: 10,
            padding: "9px 18px",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#1a0e08",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
            e.currentTarget.style.background = "#FFF5EE";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#f0e6dc";
            e.currentTarget.style.background = "white";
          }}
        >
          Edit Profil
        </button>
      </div>
    </section>
  );
}