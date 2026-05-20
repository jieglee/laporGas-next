"use client";

import { Camera, Mail, Calendar, LogOut, Pencil } from "lucide-react";

interface Props {
  nama: string;
  email: string;
  joinedAt: string;
  avatarUrl?: string | null;
  inisial: string;
  onEdit: () => void;
  onLogout: () => void;
}

export default function ProfileHeader({
  nama, email, joinedAt, avatarUrl, inisial, onEdit, onLogout,
}: Props) {
  return (
    <div
      style={{
        background: "white",
        border: "0.5px solid #f0e6dc",
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: 24,
      }}
    >
      {/* Orange banner */}
      <div
        style={{
          height: 110,
          background: "linear-gradient(135deg, #FF6B35 0%, #E8541C 60%, #c94415 100%)",
          position: "relative",
        }}
      >
        {/* subtle pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "0 28px 24px", position: "relative" }}>
        {/* Avatar */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: -48,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              border: "4px solid white",
              overflow: "hidden",
              background: "linear-gradient(135deg, #FF6B35, #E8541C)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(255,107,53,0.25)",
            }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={nama}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "white",
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {inisial}
              </span>
            )}
          </div>
        </div>

        {/* Name + meta */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "#1a0e08",
                letterSpacing: "-0.025em",
                margin: "0 0 10px",
              }}
            >
              {nama}
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: "0.8rem",
                  color: "#6b5546",
                }}
              >
                <Mail size={13} strokeWidth={1.8} style={{ color: "#a8856b" }} />
                {email}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: "0.78rem",
                  color: "#8a6f5e",
                }}
              >
                <Calendar size={13} strokeWidth={1.8} style={{ color: "#a8856b" }} />
                Bergabung {joinedAt}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={onEdit}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 18px",
                background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                color: "white",
                border: "none",
                borderRadius: 10,
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 14px rgba(255,107,53,0.28)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,107,53,0.38)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,107,53,0.28)";
              }}
            >
              <Pencil size={13} strokeWidth={2} />
              Edit Profil
            </button>

            <button
              onClick={onLogout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 18px",
                background: "white",
                color: "#6b5546",
                border: "0.5px solid #f0e6dc",
                borderRadius: 10,
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FEF2F2";
                e.currentTarget.style.color = "#B91C1C";
                e.currentTarget.style.borderColor = "#FEE2E2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#6b5546";
                e.currentTarget.style.borderColor = "#f0e6dc";
              }}
            >
              <LogOut size={13} strokeWidth={1.8} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}