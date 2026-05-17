"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

interface Props {
  pendingCount: number;
  urgentCount: number;
}

export default function HeroSection({ pendingCount, urgentCount }: Props) {
  const { data: session } = useSession();
  const nama = session?.user?.name?.split(" ")[0] ?? "Admin";

  const hour = new Date().getHours();
  const greeting =
    hour < 11 ? "Selamat pagi" :
    hour < 15 ? "Selamat siang" :
    hour < 18 ? "Selamat sore" : "Selamat malam";

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: 40, position: "relative" }}
    >
      {/* Greeting label */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          background: "rgba(255,107,53,0.08)",
          border: "0.5px solid rgba(255,107,53,0.15)",
          padding: "5px 12px",
          borderRadius: 99,
          marginBottom: 18,
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF6B35" }} />
        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8541C" }}>
          {greeting}, {nama}
        </span>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
          fontWeight: 800,
          color: "#1a0e08",
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
          margin: 0,
          marginBottom: 14,
          maxWidth: 720,
        }}
      >
        Ada{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #FF6B35, #E8541C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontStyle: "italic",
          }}
        >
          {pendingCount} laporan
        </span>{" "}
        menunggu review hari ini.
      </h1>

      {/* Subtext */}
      <p
        style={{
          fontSize: "0.92rem",
          color: "#6b5546",
          lineHeight: 1.65,
          margin: 0,
          maxWidth: 560,
        }}
      >
        {urgentCount > 0 ? (
          <>
            <span style={{ fontWeight: 600, color: "#E8541C" }}>{urgentCount} di antaranya prioritas urgent</span>
            {" — "}butuh penanganan segera.
          </>
        ) : (
          <>Semua urgent sudah ditangani. Lanjut review yang lain ya.</>
        )}
      </p>
    </motion.section>
  );
}