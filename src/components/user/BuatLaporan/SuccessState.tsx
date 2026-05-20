"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";

interface Props {
    onReset: () => void;
}

export default function SuccessState({ onReset }: Props) {
    const router = useRouter();

    return (
        <div style={{ padding: "80px 32px", maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 20px",
                        boxShadow: "0 12px 32px rgba(255,107,53,0.3)",
                    }}
                >
                    <CheckCircle2 size={34} color="white" strokeWidth={2} />
                </div>

                <h2
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "1.6rem",
                        fontWeight: 800,
                        color: "#1a0e08",
                        letterSpacing: "-0.03em",
                        margin: "0 0 10px",
                    }}
                >
                    Laporan terkirim!
                </h2>
                <p style={{ fontSize: "0.88rem", color: "#6b5546", lineHeight: 1.65, margin: "0 0 28px" }}>
                    Laporan kamu sudah kami terima dan sedang dalam proses verifikasi. Pantau statusnya di
                    halaman riwayat laporan.
                </p>

                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                    <button
                        onClick={() => router.push("/user/profil" as any)}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            padding: "11px 22px",
                            borderRadius: 10,
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 6px 16px rgba(255,107,53,0.28)",
                            fontFamily: "inherit",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow = "0 10px 24px rgba(255,107,53,0.38)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 6px 16px rgba(255,107,53,0.28)";
                        }}
                    >
                        Lihat laporan saya <ChevronRight size={14} />
                    </button>

                    <button
                        onClick={onReset}
                        style={{
                            background: "white",
                            border: "0.5px solid #f0e6dc",
                            borderRadius: 10,
                            padding: "11px 18px",
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            color: "#3d2817",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#fafaf8")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                        Buat laporan lain
                    </button>
                </div>
            </motion.div>
        </div>
    );
}