"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import NotifGroup from "@/components/user/Notifikasi/NotifGroup";
import { MOCK_NOTIF, type Notif, type NotifGrup } from "@/lib/mock-notifikasi";

const GROUPS: NotifGrup[] = ["laporan", "sosial", "sistem"];

export default function NotifikasiPage() {
  const [notifs, setNotifs] = useState<Notif[]>(MOCK_NOTIF);

  const unreadTotal = notifs.filter((n) => !n.dibaca).length;

  const handleRead = (id: string) =>
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, dibaca: true } : n)));

  const handleMarkAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, dibaca: true })));

  const byGrup = (grup: NotifGrup) => notifs.filter((n) => n.grup === grup);

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf8" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px 48px" }}>

        {/* Header */}
        <div
          style={{
            padding: "28px 4px 4px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            background: "#fafaf8",
            zIndex: 10,
            paddingBottom: 16,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#1a0e08",
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                Notifikasi
              </h1>
              {unreadTotal > 0 && (
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    background: "#FF6B35",
                    color: "white",
                    padding: "2px 9px",
                    borderRadius: 99,
                  }}
                >
                  {unreadTotal} baru
                </span>
              )}
            </div>
            <p style={{ fontSize: "0.75rem", color: "#a8856b", margin: 0 }}>
              Update terbaru seputar laporan & aktivitasmu
            </p>
          </div>

          {unreadTotal > 0 && (
            <button
              onClick={handleMarkAllRead}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#E8541C",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Tandai semua dibaca
            </button>
          )}
        </div>

        {/* Groups */}
        {notifs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(255,107,53,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
              }}
            >
              <Bell size={22} color="#E8541C" strokeWidth={1.8} />
            </div>
            <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a0e08", marginBottom: 4 }}>
              Tidak ada notifikasi
            </p>
            <p style={{ fontSize: "0.75rem", color: "#a8856b" }}>Kamu sudah up to date!</p>
          </div>
        ) : (
          GROUPS.map((grup, i) => {
            const items = byGrup(grup);
            if (items.length === 0) return null;
            return (
              <NotifGroup
                key={grup}
                grup={grup}
                notifs={items}
                index={i}
                onRead={handleRead}
              />
            );
          })
        )}
      </div>
    </div>
  );
}