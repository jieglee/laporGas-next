"use client";

interface Notif {
  id: string;
  judul: string;
  deskripsi: string;
  waktu: string;
  dibaca: boolean;
}

interface Props {
  notif: Notif;
  onRead: (id: string) => void;
}

export default function NotifItem({
  notif,
  onRead,
}: Props) {
  return (
    <div
      onClick={() => onRead(notif.id)}
      style={{
        padding: "14px 16px",
        cursor: "pointer",
        background: notif.dibaca
          ? "white"
          : "#FFF8F4",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <p
          style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            margin: 0,
            color: "#1a0e08",
          }}
        >
          {notif.judul}
        </p>

        <span
          style={{
            fontSize: "0.65rem",
            color: "#a8856b",
          }}
        >
          {notif.waktu}
        </span>
      </div>

      <p
        style={{
          fontSize: "0.74rem",
          color: "#8a6f5e",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {notif.deskripsi}
      </p>
    </div>
  );
}