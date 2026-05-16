"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section style={{ padding: "0 24px 80px", maxWidth: 720, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          border: "0.5px solid #ebebeb",
          borderRadius: 16,
          padding: "44px 44px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 220 }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ccc", marginBottom: 12 }}>
            Mulai Sekarang
          </p>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            Masalahmu penting.
            <br />
            <span style={{ color: "#E8201A" }}>Suaramu didengar.</span>
          </h2>
          <p style={{ fontSize: "0.8rem", color: "#aaa", lineHeight: 1.7, maxWidth: 320 }}>
            Satu laporan bisa mengubah kondisi ribuan orang. Jangan diam — laporkan sekarang.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          <Link
            href="/user/buat-laporan"
            style={{
              background: "#E8201A",
              color: "white",
              fontWeight: 700,
              fontSize: "0.8rem",
              padding: "13px 26px",
              borderRadius: 9,
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Buat Laporan Sekarang
          </Link>
          <span style={{ fontSize: "0.65rem", color: "#ccc" }}>Gratis · Tanpa daftar</span>
        </div>
      </motion.div>
    </section>
  );
}