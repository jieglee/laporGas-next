"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import { createReport } from "@/lib/reports";

import TitleField from "@/components/user/BuatLaporan/TitleField";
import DescriptionField from "@/components/user/BuatLaporan/DescriptionField";
import CategoryField from "@/components/user/BuatLaporan/CategoryField";
import PriorityField from "@/components/user/BuatLaporan/PriorityField";
import ImageUpload from "@/components/user/BuatLaporan/ImageUpload";
import SubmitButton, { isFormValid } from "@/components/user/BuatLaporan/SubmitButton";
import SuccessState from "@/components/user/BuatLaporan/SuccessState";
import type { FormState } from "@/components/user/BuatLaporan/types";

const LocationPicker = dynamic(
  () => import("@/components/user/BuatLaporan/LocationPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] bg-[#fafaf8] rounded-[14px] border-[0.5px] border-[#f0e6dc] flex items-center justify-center text-[#a8856b] text-[0.82rem] gap-2 mb-3">
        <Loader2 size={16} className="animate-spin" />
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
    try {
      setSubmitting(true);
      await createReport({
        title: form.title,
        description: form.description,
        category_id: Number(form.category_id),
        priority: form.priority as any,
        location: form.location,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        images: form.images,
      });
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (error) {
      console.error(error);
      alert("Gagal membuat laporan");
    } finally {
      setSubmitting(false);
    }
  };

  const progress =
    (form.title.trim().length >= 5 ? 20 : 0) +
    (form.description.trim().length >= 20 ? 20 : 0) +
    (form.category_id ? 20 : 0) +
    (form.latitude ? 20 : 0) +
    (form.priority ? 20 : 0);

  if (submitted) {
    return <SuccessState onReset={() => { setForm(EMPTY_FORM); setSubmitted(false); }} />;
  }

  return (
    <div className="px-8 pt-6 pb-20 max-w-[740px] mx-auto">
      {/* Back */}
      <div className="mb-5 animate-fade-slide-up opacity-0 [animation-delay:0ms]">
        <Link
          href="/user"
          className="inline-flex items-center gap-[7px] text-[0.75rem] font-semibold text-[#8a6f5e] no-underline px-[6px] py-[6px] pr-[10px] rounded-lg transition-all duration-150 hover:bg-[#fafaf8] hover:text-[#E8541C]"
        >
          <ArrowLeft size={14} strokeWidth={2} /> Kembali
        </Link>
      </div>

      {/* Header */}
      <div className="mb-7 animate-fade-slide-up opacity-0 [animation-delay:60ms]">
        <div className="flex items-start gap-[14px]">
          <div className="w-[46px] h-[46px] rounded-[13px] bg-gradient-to-br from-[#FFF5EE] to-[#FFEDE0] border-[0.5px] border-[rgba(255,107,53,0.18)] flex items-center justify-center text-[#E8541C] shrink-0">
            <FileText size={20} strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="font-sans text-[1.65rem] font-extrabold text-[#1a0e08] tracking-[-0.03em] m-0 mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}>
              Buat Laporan
            </h1>
            <p className="text-[0.82rem] text-[#a8856b] m-0">
              Laporkan masalah di sekitar kamu dengan lengkap dan jelas
            </p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white border-[0.5px] border-[#f0e6dc] rounded-2xl overflow-hidden animate-fade-slide-up opacity-0 [animation-delay:120ms]">
        {/* Progress bar */}
        <div className="h-[3px] bg-[#f5ede3]">
          <div
            className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E8541C] rounded-[3px] transition-[width] duration-400 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Fields */}
        <div className="p-7 flex flex-col gap-6">
          <TitleField value={form.title} onChange={(v) => set("title", v)} />
          <DescriptionField value={form.description} onChange={(v) => set("description", v)} />
          <CategoryField value={form.category_id} onChange={(v) => set("category_id", v)} />
          <PriorityField value={form.priority} onChange={(v) => set("priority", v)} />

          <div className="border-t-[0.5px] border-[#f5ede3]" />

          <LocationPicker
            lat={form.latitude}
            lng={form.longitude}
            address={form.location}
            onChange={(lat, lng, addr) =>
              setForm((prev) => ({ ...prev, latitude: lat, longitude: lng, location: addr }))
            }
          />

          <div className="border-t-[0.5px] border-[#f5ede3]" />

          <ImageUpload files={form.images} onChange={(files) => set("images", files)} maxFiles={5} />

          <SubmitButton form={form} submitting={submitting} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}