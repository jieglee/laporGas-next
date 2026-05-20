"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Camera, Eye, EyeOff, Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  initial: {
    nama: string;
    email: string;
    avatarUrl?: string | null;
    inisial: string;
  };
  onSave: (data: { nama: string; email: string; password?: string; avatar?: File }) => Promise<void>;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#fafaf8",
  border: "0.5px solid #f0e6dc",
  borderRadius: 10,
  padding: "11px 14px",
  fontSize: "0.85rem",
  color: "#1a0e08",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
};

export default function EditProfileModal({ open, onClose, initial, onSave }: Props) {
  const [nama, setNama] = useState(initial.nama);
  const [email, setEmail] = useState(initial.email);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initial.avatarUrl ?? null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Reset saat modal dibuka
  useEffect(() => {
    if (open) {
      setNama(initial.nama);
      setEmail(initial.email);
      setPassword("");
      setAvatarFile(null);
      setAvatarPreview(initial.avatarUrl ?? null);
    }
  }, [open, initial.nama, initial.email, initial.avatarUrl]);

  // ESC close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const pickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatarFile(f);
    setAvatarPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    if (!nama.trim() || !email.trim()) return;
    setSaving(true);
    try {
      await onSave({
        nama: nama.trim(),
        email: email.trim(),
        ...(password ? { password } : {}),
        ...(avatarFile ? { avatar: avatarFile } : {}),
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const focus = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.target.style.borderColor = "rgba(255,107,53,0.4)");
  const blur = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.target.style.borderColor = "#f0e6dc");

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
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(26,14,8,0.55)",
            backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
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
              width: "min(480px, 95vw)",
              background: "white",
              borderRadius: 18,
              overflow: "hidden",
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
              }}
            >
              <div>
                <h2 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "1.05rem", fontWeight: 800,
                  color: "#1a0e08", letterSpacing: "-0.02em", margin: 0,
                }}>
                  Edit Profil
                </h2>
                <p style={{ fontSize: "0.72rem", color: "#a8856b", margin: "3px 0 0" }}>
                  Perbarui informasi akun kamu
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#a8856b", padding: 4, display: "flex", borderRadius: 8,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1a0e08")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a8856b")}
              >
                <X size={19} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Avatar picker */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <div
                    style={{
                      width: 80, height: 80, borderRadius: "50%",
                      background: avatarPreview ? "transparent" : "linear-gradient(135deg, #FF6B35, #E8541C)",
                      border: "3px solid #f0e6dc",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      overflow: "hidden",
                      boxShadow: "0 4px 16px rgba(255,107,53,0.18)",
                    }}
                  >
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", fontFamily: "'Syne', sans-serif" }}>
                        {initial.inisial}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    style={{
                      position: "absolute", bottom: 0, right: 0,
                      width: 26, height: 26, borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                      border: "2px solid white",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", transition: "transform 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <Camera size={12} color="white" strokeWidth={2.2} />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={pickAvatar} />
                </div>
              </div>

              {/* Nama */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#3d2817", marginBottom: 7 }}>
                  Nama lengkap
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama lengkap"
                  style={inputStyle}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#3d2817", marginBottom: 7 }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  style={inputStyle}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#3d2817", marginBottom: 7 }}>
                  Password baru
                  <span style={{ fontWeight: 400, color: "#a8856b", marginLeft: 6 }}>(kosongkan jika tidak diubah)</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ ...inputStyle, paddingRight: 42 }}
                    onFocus={focus}
                    onBlur={blur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((p) => !p)}
                    style={{
                      position: "absolute", right: 12, top: "50%",
                      transform: "translateY(-50%)",
                      background: "none", border: "none",
                      cursor: "pointer", color: "#a8856b",
                      display: "flex", padding: 2,
                    }}
                  >
                    {showPw ? <EyeOff size={15} strokeWidth={1.8} /> : <Eye size={15} strokeWidth={1.8} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "14px 22px",
                borderTop: "0.5px solid #f5ede3",
                background: "#fafaf8",
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={onClose}
                style={{
                  background: "white", border: "0.5px solid #f0e6dc",
                  borderRadius: 10, padding: "10px 18px",
                  fontSize: "0.8rem", fontWeight: 600, color: "#3d2817",
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fafaf8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !nama.trim() || !email.trim()}
                style={{
                  background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                  color: "white", fontWeight: 700, fontSize: "0.8rem",
                  padding: "10px 22px", borderRadius: 10, border: "none",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  display: "inline-flex", alignItems: "center", gap: 7,
                  boxShadow: "0 4px 12px rgba(255,107,53,0.22)",
                  opacity: saving ? 0.8 : 1,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!saving) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,107,53,0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(255,107,53,0.22)";
                }}
              >
                {saving && <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />}
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AnimatePresence>
  );
}