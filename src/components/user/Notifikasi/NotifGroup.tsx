"use client";

import { motion } from "framer-motion";
import NotifItem from "./NotifItem";
import type { Notif, NotifGrup } from "@/lib/mock-notifikasi";
import { GRUP_CONFIG } from "@/lib/mock-notifikasi";

interface Props {
  grup: NotifGrup;
  notifs: Notif[];
  index: number;
  onRead: (id: string) => void;
}

export default function NotifGroup({ grup, notifs, index, onRead }: Props) {
  const cfg = GRUP_CONFIG[grup];
  const unread = notifs.filter((n) => !n.dibaca).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Section label */}
      <div
        style={{
          padding: "18px 4px 8px",
          display: "flex",
          alignItems: "center",
          gap: 7,
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#a8856b",
            margin: 0,
          }}
        >
          {cfg.label}
        </p>
        {unread > 0 && (
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              background: "#FF6B35",
              color: "white",
              padding: "1px 6px",
              borderRadius: 99,
            }}
          >
            {unread}
          </span>
        )}
      </div>

      {/* Items card */}
      <div
        style={{
          background: "white",
          border: "0.5px solid #f0e6dc",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {notifs.map((n, i) => (
          <div
            key={n.id}
            style={{ borderBottom: i < notifs.length - 1 ? "0.5px solid #f5ede3" : "none" }}
          >
            <NotifItem notif={n} onRead={onRead} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}