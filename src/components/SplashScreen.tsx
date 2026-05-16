"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
    isVisible: boolean;
    onExitComplete?: () => void;
}

export default function SplashScreen({ isVisible, onExitComplete }: SplashScreenProps) {
    return (
        <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
            {isVisible && (
                <motion.div
                    key="splash"
                    className="fixed inset-0 z-9999 flex items-center justify-center"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                        y: "-100%",
                        borderBottomLeftRadius: "60%",
                        borderBottomRightRadius: "60%",
                        transition: {
                            duration: 1.4,
                            ease: [0.45, 0, 0.55, 1],
                        },
                    }}
                    style={{
                        overflow: "hidden",
                        background: "linear-gradient(135deg, #E8201A 0%, #c41510 50%, #8B0E0A 100%)",
                    }}
                >
                    {/* Background glow pulse */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ opacity: [0.3, 0.55, 0.3] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            background: "radial-gradient(circle at center, rgba(255,107,53,0.45), transparent 65%)",
                        }}
                    />

                    {/* Dekoratif rings */}
                    <motion.div
                        className="absolute pointer-events-none"
                        animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            width: 500, height: 500, borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.2)",
                        }}
                    />
                    <motion.div
                        className="absolute pointer-events-none"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        style={{
                            width: 700, height: 700, borderRadius: "50%",
                            border: "1px solid rgba(255,255,255,0.12)",
                        }}
                    />

                    {/* Logo + Text */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: "flex", alignItems: "center", gap: 18, position: "relative" }}
                    >
                        {/* Icon */}
                        <motion.div
                            animate={{ scale: [1, 1.07, 1] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                width: 72, height: 72, borderRadius: 20,
                                background: "rgba(255,255,255,0.15)",
                                backdropFilter: "blur(10px)",
                                border: "1.5px solid rgba(255,255,255,0.25)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            }}
                        >
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <path d="M22 7 L9 13 L9 23 L22 29 Z" fill="white" opacity="0.95" />
                                <rect x="4" y="14" width="5" height="8" rx="2" fill="white" opacity="0.95" />
                                <path d="M24 11 Q29 18 24 25" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                                <path d="M27 7 Q35 18 27 29" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
                                <circle cx="6.5" cy="26" r="2.5" fill="#FFD166" />
                            </svg>
                        </motion.div>

                        {/* Brand name */}
                        <motion.h1
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: "2.6rem",
                                letterSpacing: "-0.03em",
                                color: "white",
                                margin: 0,
                                textShadow: "0 4px 24px rgba(0,0,0,0.15)",
                            }}
                        >
                            Lapor<span style={{ color: "rgba(255,255,255,0.55)" }}>Gas</span>
                        </motion.h1>
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            bottom: "10%",
                            fontSize: "0.75rem",
                            color: "rgba(255,255,255,0.35)",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            fontWeight: 500,
                        }}
                    >
                        Platform Pengaduan Publik Resmi
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}