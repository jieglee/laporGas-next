"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";

import TitleField from "@/components/user/BuatLaporan/TitleField";
import DescriptionField from "@/components/user/BuatLaporan/DescriptionField";
import CategoryField from "@/components/user/BuatLaporan/CategoryField";
import PriorityField from "@/components/user/BuatLaporan/PriorityField";
import ImageUpload from "@/components/user/BuatLaporan/ImageUpload";
import SubmitButton, { isFormValid } from "@/components/user/BuatLaporan/SubmitButton";
import SuccessState from "@/components/user/BuatLaporan/SuccessState";
import type { FormState } from "@/components/user/BuatLaporan/types";

// Leaflet requires window
const LocationPicker = dynamic(
  () => import("@/components/user/BuatLaporan/LocationPicker"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: 320,
          background: "#fafaf8",
          borderRadius: 14,
          border: "0.5px solid #f0e6dc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#a8856b",
          fontSize: "0.82rem",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
        Memuat peta...
      </div>
    ),
  }
);

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  category_id: "",
  location: "",
  priority: "",
  latitude: "",
  longitude: "",
  images: [],
};

export default function BuatLaporanPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!isFormValid(form) || submitting) return;
    setSubmitting(true);
    // TODO: ganti dengan real fetch ke backend
    await new Promise((r) => setTimeout(r, 1600));
    setSubmitting(false);
    setSubmitted(true);
  };

  // Progress 0–100 berdasar 5 required fields
  const progress = (
    (form.title.trim().length >= 5 ? 20 : 0) +
    (form.description.trim().length >= 20 ? 20 : 0) +
    (form.category_id ? 20 : 0) +
    (form.latitude ? 20 : 0) +
    (form.priority ? 20 : 0)
  );

  if (submitted) {
    return <SuccessState onReset={() => { setForm(EMPTY_FORM); setSubmitted(false); }} />;
  }

  return (
    <div style={{ padding: "24px 32px 80px", maxWidth: 740, margin: "0 auto" }}>
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        style={{ marginBottom: 20 }}
      >
        <Link
          href="/user"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#8a6f5e",
            textDecoration: "none",
            padding: "6px 10px 6px 6px",
            borderRadius: 8,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#fafaf8"; e.currentTarget.style.color = "#E8541C"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8a6f5e"; }}
        >
          <ArrowLeft size={14} strokeWidth={2} /> Kembali
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 28 }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: "linear-gradient(135deg, #FFF5EE, #FFEDE0)",
              border: "0.5px solid rgba(255,107,53,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#E8541C",
              flexShrink: 0,
            }}
          >
            <FileText size={20} strokeWidth={1.8} />
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1.65rem",
                fontWeight: 800,
                color: "#1a0e08",
                letterSpacing: "-0.03em",
                margin: 0,
                marginBottom: 4,
              }}
            >
              Buat Laporan
            </h1>
            <p style={{ fontSize: "0.82rem", color: "#a8856b", margin: 0 }}>
              Laporkan masalah di sekitar kamu dengan lengkap dan jelas
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "white",
          border: "0.5px solid #f0e6dc",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Progress bar */}
        <div style={{ height: 3, background: "#f5ede3" }}>
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #FF6B35, #E8541C)",
              width: `${progress}%`,
              transition: "width 0.4s ease",
              borderRadius: 3,
            }}
          />
        </div>

        {/* Fields */}
        <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: 24 }}>
          <TitleField value={form.title} onChange={(v) => set("title", v)} />
          <DescriptionField value={form.description} onChange={(v) => set("description", v)} />
          <CategoryField value={form.category_id} onChange={(v) => set("category_id", v)} />
          <PriorityField value={form.priority} onChange={(v) => set("priority", v)} />

          <div style={{ borderTop: "0.5px solid #f5ede3" }} />

          <LocationPicker
            lat={form.latitude}
            lng={form.longitude}
            address={form.location}
            onChange={(lat, lng, addr) =>
              setForm((prev) => ({ ...prev, latitude: lat, longitude: lng, location: addr }))
            }
          />

          <div style={{ borderTop: "0.5px solid #f5ede3" }} />

          <ImageUpload files={form.images} onChange={(files) => set("images", files)} maxFiles={5} />

          <SubmitButton form={form} submitting={submitting} onSubmit={handleSubmit} />
        </div>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}