"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="px-4 pb-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(135deg, #1a0e08 0%, #2d1a0e 100%)",
          borderRadius: 20,
          padding: "52px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.18) 0%, transparent 70%)", top: -100, right: 80, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,84,28,0.12) 0%, transparent 70%)", bottom: -80, left: 40, pointerEvents: "none" }} />

        {/* Left */}
        <div style={{ flex: 1, minWidth: 240, position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,107,53,0.12)", border: "0.5px solid rgba(255,107,53,0.2)", padding: "5px 12px", borderRadius: 99, marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF6B35" }} />
            <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF6B35" }}>
              Mulai Sekarang
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            Masalahmu penting.
            <br />
            <span style={{ background: "linear-gradient(90deg, #FF6B35, #E8541C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Suaramu didengar.
            </span>
          </h2>

          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 340 }}>
            Satu laporan bisa mengubah kondisi ribuan orang di sekitarmu.
          </p>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, position: "relative", zIndex: 1 }}>
          <Link
            href="/user/buat-laporan"
            style={{
              background: "linear-gradient(135deg, #FF6B35, #E8541C)",
              color: "white",
              fontWeight: 700,
              fontSize: "0.85rem",
              padding: "14px 28px",
              borderRadius: 999,
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 24px rgba(255,107,53,0.35)",
              transition: "all 0.25s",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,107,53,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,107,53,0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Buat Laporan Sekarang
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5h7M5.5 1.5L9 5l-3.5 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
            Gratis · Tanpa perlu daftar
          </span>
        </div>
      </motion.div>
    </section>
  );
}