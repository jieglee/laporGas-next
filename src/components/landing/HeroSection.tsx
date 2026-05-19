"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HeroSection() {
  return (
    <section
      className={`${poppins.className} relative min-h-screen flex items-center justify-center overflow-hidden`}
      style={{ background: "#FFFCFA", paddingTop: 100, paddingBottom: 100 }}
    >
      {/* Grid pattern dengan mask radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,107,53,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* Concentric rings (spotlight) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 460,
          height: 460,
          borderRadius: "50%",
          border: "1px solid rgba(255,107,53,0.08)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: "1px solid rgba(255,107,53,0.05)",
        }}
      />

      {/* Glow center besar */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,107,53,0.14) 0%, rgba(255,107,53,0.05) 35%, transparent 70%)",
        }}
      />

      {/* Glow side kanan atas */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          right: "8%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,84,28,0.12) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Glow side kiri bawah */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "12%",
          left: "6%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,140,66,0.10) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "16%",
          left: "14%",
          width: 7,
          height: 7,
          background: "#FF6B35",
          opacity: 0.4,
          boxShadow: "0 0 12px rgba(255,107,53,0.5)",
        }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "28%",
          right: "16%",
          width: 5,
          height: 5,
          background: "#E8541C",
          opacity: 0.55,
          boxShadow: "0 0 8px rgba(232,84,28,0.4)",
        }}
        animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: "24%",
          left: "20%",
          width: 6,
          height: 6,
          background: "#FF8C42",
          opacity: 0.45,
          boxShadow: "0 0 10px rgba(255,140,66,0.4)",
        }}
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: "30%",
          right: "22%",
          width: 9,
          height: 9,
          border: "1.5px solid #FF6B35",
          background: "transparent",
          opacity: 0.55,
        }}
        animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "50%",
          left: "8%",
          width: 4,
          height: 4,
          background: "#FF6B35",
          opacity: 0.4,
        }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "60%",
          right: "10%",
          width: 3,
          height: 3,
          background: "#E8541C",
          opacity: 0.5,
        }}
        animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div
        className="relative text-center"
        style={{ maxWidth: 800, padding: "0 24px" }}
      >
        {/* Eyebrow badge */}
        <motion.div
          {...fadeUp(0.1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "6px 16px 6px 8px",
            background:
              "linear-gradient(90deg, rgba(255,107,53,0.08), rgba(192,57,43,0.04))",
            border: "1px solid rgba(255,107,53,0.18)",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#C0392B",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6B35, #E8541C)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "white",
              }}
            />
          </span>
          Platform aduan publik
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#140804",
            margin: 0,
          }}
        >
          Suara warga,
          <br />
          <span
            style={{
              position: "relative",
              display: "inline-block",
              background:
                "linear-gradient(95deg, #FF6B35 0%, #E8541C 50%, #C0392B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            didengar
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: "4%",
                right: "4%",
                bottom: 4,
                height: 8,
                background:
                  "linear-gradient(90deg, rgba(255,107,53,0.15), rgba(232,84,28,0.1))",
                borderRadius: 999,
                zIndex: -1,
                filter: "blur(2px)",
              }}
            />
          </span>{" "}
          seketika.
        </motion.h1>

        {/* Divider diamond */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            margin: "40px 0 28px",
          }}
        >
          <span
            style={{
              width: 48,
              height: 1,
              background: "linear-gradient(90deg, transparent, #FF6B35)",
              opacity: 0.4,
            }}
          />
          <span
            style={{
              width: 6,
              height: 6,
              background: "linear-gradient(135deg, #FF6B35, #E8541C)",
              transform: "rotate(45deg)",
            }}
          />
          <span
            style={{
              width: 48,
              height: 1,
              background: "linear-gradient(90deg, #FF6B35, transparent)",
              opacity: 0.4,
            }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.4)}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.75,
            color: "#6b5546",
            margin: "0 auto",
            maxWidth: 560,
          }}
        >
          Laporkan masalah di sekitarmu, pantau prosesnya, dan lihat hasilnya.{" "}
          <strong style={{ color: "#140804", fontWeight: 600 }}>
            Tanpa birokrasi, tanpa drama.
          </strong>
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.5)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 28,
            marginTop: 52,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/auth/login"
            style={{
              fontFamily: "'Poppins', sans-serif",
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 18px 16px 32px",
              background: "linear-gradient(135deg, #FF6B35, #E8541C)",
              color: "white",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 999,
              textDecoration: "none",
              boxShadow:
                "0 10px 30px rgba(255,107,53,0.28), 0 4px 10px rgba(232,84,28,0.18), inset 0 1px 0 rgba(255,255,255,0.2)",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 14px 36px rgba(255,107,53,0.36), 0 6px 14px rgba(232,84,28,0.22), inset 0 1px 0 rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(255,107,53,0.28), 0 4px 10px rgba(232,84,28,0.18), inset 0 1px 0 rgba(255,255,255,0.2)";
            }}
          >
            Mulai melapor
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 5h7M5.5 1.5L9 5l-3.5 3.5"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>

          <a
            href="#how-it-works"
            style={{
              fontFamily: "'Poppins', sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              color: "#8a6a52",
              fontWeight: 500,
              textDecoration: "none",
              paddingBottom: 4,
              borderBottom: "1px solid rgba(255,107,53,0.3)",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#E8541C";
              e.currentTarget.style.borderBottomColor = "#E8541C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#8a6a52";
              e.currentTarget.style.borderBottomColor = "rgba(255,107,53,0.3)";
            }}
          >
            Cara kerja platform →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(0.7)}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "'Poppins', sans-serif",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#C0392B",
          opacity: 0.55,
        }}
      >
        <span
          style={{
            width: 28,
            height: 1,
            background: "#C0392B",
            opacity: 0.4,
          }}
        />
        <motion.span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#C0392B",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span>Scroll untuk lihat</span>
        <motion.span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#C0392B",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          style={{
            width: 28,
            height: 1,
            background: "#C0392B",
            opacity: 0.4,
          }}
        />
      </motion.div>
    </section>
  );
}