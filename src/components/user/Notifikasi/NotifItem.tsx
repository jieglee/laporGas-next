"use client";

import Link from "next/link";
import {
  RefreshCw, Building2, CheckCircle2, XCircle,
  ArrowBigUp, MessageCircle, CornerDownRight, MapPin, Bell,
} from "lucide-react";
import type { Notif, NotifTipe } from "@/lib/mock-notifikasi";

// ── Icon config ────────────────────────────────────────────────────────────────

const ICON_CFG: Record<NotifTipe, { Icon: React.ElementType; bg: string; color: string }> = {
  tindak_lanjut: { Icon: Building2,        bg: "rgba(29,78,216,0.08)",  color: "#1D4ED8" },
  status_update: { Icon: RefreshCw,         bg: "rgba(255,107,53,0.1)",  color: "#E8541C" },
  verifikasi:    { Icon: CheckCircle2,      bg: "rgba(16,185,129,0.1)",  color: "#059669" },
  ditolak:       { Icon: XCircle,           bg: "rgba(220,38,38,0.08)",  color: "#DC2626" },
  upvote:        { Icon: ArrowBigUp,        bg: "rgba(255,107,53,0.1)",  color: "#E8541C" },
  komentar:      { Icon: MessageCircle,     bg: "rgba(255,107,53,0.08)", color: "#E8541C" },
  reply:         { Icon: CornerDownRight,   bg: "rgba(255,107,53,0.08)", color: "#E8541C" },
  nearby:        { Icon: MapPin,            bg: "rgba(245,158,11,0.1)",  color: "#D97706" },
  sistem:        { Icon: Bell,              bg: "rgba(107,85,70,0.08)",  color: "#6b5546" },
};

// ── Avatar (untuk notif sosial yang punya aktor) ───────────────────────────────

function Avatar({ inisial }: { inisial: string }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #FF6B35, #E8541C)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.72rem",
        fontWeight: 700,
        color: "white",
        flexShrink: 0,
      }}
    >
      {inisial}
    </div>
  );
}

function IconWrap({ tipe }: { tipe: NotifTipe }) {
  const { Icon, bg, color } = ICON_CFG[tipe];
  return (
    <div style={{ width: 40, height: 40, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
      <Icon size={17} strokeWidth={1.8} />
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  notif: Notif;
  onRead: (id: string) => void;
}

export default function NotifItem({ notif, onRead }: Props) {
  const hasAvatar = (notif.tipe === "komentar" || notif.tipe === "reply") && notif.aktorInisial;

  const inner = (
    <div
      onClick={() => !notif.dibaca && onRead(notif.id)}
      style={{
        display: "flex",
        gap: 12,
        padding: "14px 16px",
        background: notif.dibaca ? "transparent" : "rgba(255,107,53,0.025)",
        cursor: "pointer",
        transition: "background 0.15s",
        position: "relative",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = notif.dibaca ? "transparent" : "rgba(255,107,53,0.025)")}
    >
      {/* Unread dot */}
      {!notif.dibaca && (
        <div style={{
          position: "absolute", left: 5, top: "50%", transform: "translateY(-50%)",
          width: 5, height: 5, borderRadius: "50%", background: "#FF6B35",
        }} />
      )}

      {/* Icon or avatar */}
      {hasAvatar ? <Avatar inisial={notif.aktorInisial!} /> : <IconWrap tipe={notif.tipe} />}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 2 }}>
          <p style={{
            fontSize: "0.82rem",
            fontWeight: notif.dibaca ? 400 : 600,
            color: "#1a0e08",
            margin: 0,
            lineHeight: 1.4,
          }}>
            {notif.judul}
          </p>
          <span style={{ fontSize: "0.62rem", color: "#c9a892", whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}>
            {notif.waktu}
          </span>
        </div>

        <p style={{
          fontSize: "0.75rem", color: "#8a6f5e", margin: 0, lineHeight: 1.55,
          overflow: "hidden", textOverflow: "ellipsis",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>
          {notif.deskripsi}
        </p>

        {/* Laporan ref tag */}
        {notif.laporanJudul && (
          <div style={{
            marginTop: 6, display: "inline-flex", alignItems: "center", gap: 5,
            background: "#FFF5EE", border: "0.5px solid rgba(255,107,53,0.15)",
            borderRadius: 6, padding: "3px 8px",
          }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FF6B35", flexShrink: 0 }} />
            <span style={{ fontSize: "0.65rem", color: "#E8541C", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 240 }}>
              {notif.laporanJudul}
            </span>
          </div>
        )}

        {/* Status change */}
        {notif.statusLama && notif.statusBaru && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
            <span style={{ fontSize: "0.62rem", fontWeight: 500, color: "#a8856b", background: "#f5ede3", padding: "2px 7px", borderRadius: 99 }}>
              {notif.statusLama}
            </span>
            <span style={{ fontSize: "0.6rem", color: "#c9a892" }}>→</span>
            <span style={{ fontSize: "0.62rem", fontWeight: 500, color: "#059669", background: "#ECFDF5", padding: "2px 7px", borderRadius: 99 }}>
              {notif.statusBaru}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return notif.laporanId
    ? <Link href={`/user/laporan/${notif.laporanId}`} style={{ textDecoration: "none", display: "block" }}>{inner}</Link>
    : inner;
}