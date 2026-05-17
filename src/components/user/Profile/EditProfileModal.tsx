"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Camera, MapPin } from "lucide-react";
import type { UserProfile } from "@/lib/mock-user";

interface Props {
    user: UserProfile;
    open: boolean;
    onClose: () => void;
    onSave: (data: Partial<UserProfile>) => void;
}

export default function EditProfileModal({ user, open, onClose, onSave }: Props) {
    const [form, setForm] = useState({
        nama: user.nama,
        email: user.email,
        bio: user.bio,
        lokasi: user.lokasi,
    });
    const [saving, setSaving] = useState(false);

    // Reset form ketika modal dibuka ulang
    useEffect(() => {
        if (open) {
            setForm({
                nama: user.nama,
                email: user.email,
                bio: user.bio,
                lokasi: user.lokasi,
            });
        }
    }, [open, user]);

    // ESC to close
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const inisial = form.nama
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    const handleSave = async () => {
        setSaving(true);
        await new Promise((r) => setTimeout(r, 600));
        onSave(form);
        setSaving(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 100,
                        background: "rgba(26,14,8,0.55)",
                        backdropFilter: "blur(4px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 20,
                    }}
                >
                    <motion.div
                        key="modal"
                        initial={{ scale: 0.96, opacity: 0, y: 12 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.96, opacity: 0, y: 12 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "min(520px, 95vw)",
                            maxHeight: "90vh",
                            background: "white",
                            borderRadius: 16,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                padding: "18px 22px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottom: "0.5px solid #f5ede3",
                                flexShrink: 0,
                            }}
                        >
                            <h2
                                style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontSize: "1.1rem",
                                    fontWeight: 800,
                                    color: "#1a0e08",
                                    letterSpacing: "-0.02em",
                                    margin: 0,
                                }}
                            >
                                Edit Profil
                            </h2>
                            <button
                                onClick={onClose}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "#a8856b",
                                    padding: 4,
                                    borderRadius: 8,
                                    display: "flex",
                                    transition: "color 0.15s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#1a0e08")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#a8856b")}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body — scrollable */}
                        <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>

                            {/* Avatar */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 16,
                                    padding: "16px",
                                    background: "#fafaf8",
                                    border: "0.5px solid #f0e6dc",
                                    borderRadius: 12,
                                    marginBottom: 20,
                                }}
                            >
                                <div style={{ position: "relative", flexShrink: 0 }}>
                                    <div
                                        style={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.3rem",
                                            fontWeight: 800,
                                            color: "white",
                                            fontFamily: "'Syne', sans-serif",
                                            boxShadow: "0 4px 12px rgba(255,107,53,0.18)",
                                        }}
                                    >
                                        {inisial}
                                    </div>
                                    <button
                                        style={{
                                            position: "absolute",
                                            bottom: -2,
                                            right: -2,
                                            width: 26,
                                            height: 26,
                                            borderRadius: "50%",
                                            background: "white",
                                            border: "0.5px solid #f0e6dc",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                                            transition: "all 0.15s",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = "rgba(255,107,53,0.4)";
                                            e.currentTarget.style.transform = "scale(1.08)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = "#f0e6dc";
                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                    >
                                        <Camera size={12} color="#E8541C" strokeWidth={2} />
                                    </button>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a0e08", margin: "0 0 2px" }}>
                                        Foto profil
                                    </p>
                                    <p style={{ fontSize: "0.7rem", color: "#a8856b", margin: "0 0 6px", lineHeight: 1.5 }}>
                                        JPG atau PNG, maks 2MB
                                    </p>
                                    <button
                                        style={{
                                            fontSize: "0.7rem",
                                            fontWeight: 600,
                                            color: "#E8541C",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: 0,
                                        }}
                                    >
                                        Ubah foto
                                    </button>
                                </div>
                            </div>

                            {/* Fields */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <FormField
                                    label="Nama lengkap"
                                    value={form.nama}
                                    onChange={(v) => setForm({ ...form, nama: v })}
                                    placeholder="Nama lengkapmu"
                                />
                                <FormField
                                    label="Email"
                                    value={form.email}
                                    onChange={(v) => setForm({ ...form, email: v })}
                                    placeholder="email@contoh.com"
                                    type="email"
                                />
                                <FormField
                                    label="Bio"
                                    value={form.bio}
                                    onChange={(v) => setForm({ ...form, bio: v })}
                                    placeholder="Ceritakan sedikit tentang dirimu"
                                    textarea
                                    maxLength={150}
                                />
                                <FormField
                                    label="Lokasi"
                                    value={form.lokasi}
                                    onChange={(v) => setForm({ ...form, lokasi: v })}
                                    placeholder="Kota, Provinsi"
                                    icon={<MapPin size={14} strokeWidth={1.8} />}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div
                            style={{
                                padding: "14px 22px",
                                borderTop: "0.5px solid #f5ede3",
                                display: "flex",
                                gap: 10,
                                justifyContent: "flex-end",
                                flexShrink: 0,
                                background: "#fafaf8",
                            }}
                        >
                            <button
                                onClick={onClose}
                                disabled={saving}
                                style={{
                                    background: "white",
                                    border: "0.5px solid #f0e6dc",
                                    borderRadius: 10,
                                    padding: "9px 18px",
                                    fontSize: "0.78rem",
                                    fontWeight: 600,
                                    color: "#3d2817",
                                    cursor: saving ? "not-allowed" : "pointer",
                                    transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => { if (!saving) e.currentTarget.style.background = "#fafaf8"; }}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                style={{
                                    background: saving ? "#f5ede3" : "linear-gradient(135deg, #FF6B35, #E8541C)",
                                    color: saving ? "#a8856b" : "white",
                                    fontWeight: 700,
                                    fontSize: "0.78rem",
                                    padding: "9px 22px",
                                    borderRadius: 10,
                                    border: "none",
                                    cursor: saving ? "not-allowed" : "pointer",
                                    boxShadow: saving ? "none" : "0 4px 12px rgba(255,107,53,0.22)",
                                    transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    if (!saving) {
                                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,107,53,0.35)";
                                        e.currentTarget.style.transform = "translateY(-1px)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!saving) {
                                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,107,53,0.22)";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }
                                }}
                            >
                                {saving ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ── FormField ──────────────────────────────────────────────────────────────────

interface FieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    type?: string;
    textarea?: boolean;
    maxLength?: number;
    icon?: React.ReactNode;
}

function FormField({ label, value, onChange, placeholder, type, textarea, maxLength, icon }: FieldProps) {
    const [focused, setFocused] = useState(false);

    const baseStyle: React.CSSProperties = {
        width: "100%",
        background: "transparent",
        border: "none",
        outline: "none",
        fontSize: "0.82rem",
        color: "#1a0e08",
        fontFamily: "inherit",
        padding: 0,
        resize: textarea ? "none" : undefined,
        lineHeight: textarea ? 1.6 : undefined,
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "#6b5546", letterSpacing: "0.02em" }}>
                    {label}
                </label>
                {maxLength && (
                    <span style={{ fontSize: "0.65rem", color: value.length > maxLength * 0.9 ? "#E8541C" : "#c9a892" }}>
                        {value.length}/{maxLength}
                    </span>
                )}
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: textarea ? "flex-start" : "center",
                    gap: 8,
                    background: "white",
                    border: `0.5px solid ${focused ? "rgba(255,107,53,0.4)" : "#f0e6dc"}`,
                    borderRadius: 10,
                    padding: "10px 14px",
                    transition: "all 0.2s",
                    boxShadow: focused ? "0 0 0 3px rgba(255,107,53,0.08)" : "none",
                }}
            >
                {icon && <span style={{ color: "#a8856b", display: "flex", flexShrink: 0 }}>{icon}</span>}

                {textarea ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={placeholder}
                        rows={3}
                        maxLength={maxLength}
                        style={baseStyle}
                    />
                ) : (
                    <input
                        type={type ?? "text"}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={placeholder}
                        style={baseStyle}
                    />
                )}
            </div>
        </div>
    );
}