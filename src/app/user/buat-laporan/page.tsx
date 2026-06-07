"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import { createReport } from "@/lib/reports";
import toast from "react-hot-toast";

import TitleField from "@/components/user/BuatLaporan/TitleField";
import DescriptionField from "@/components/user/BuatLaporan/DescriptionField";
import CategoryField from "@/components/user/BuatLaporan/CategoryField";
import PriorityField from "@/components/user/BuatLaporan/PriorityField";
import ImageUpload from "@/components/user/BuatLaporan/ImageUpload";
import SubmitButton, { isFormValid } from "@/components/user/BuatLaporan/SubmitButton";
import SuccessState from "@/components/user/BuatLaporan/SuccessState";
import AIBadge from "@/components/user/BuatLaporan/AIBadge";
import type { FormState } from "@/components/user/BuatLaporan/types";
import { useAICategorizer } from "@/hooks/useAICategorizer";

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
    const [aiApplied, setAiApplied] = useState(false);

    const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    // ── AI Auto-categorize ──
    const { loading: aiLoading, lastResult, error: aiError } = useAICategorizer({
        title: form.title,
        description: form.description,
        onResult: (result) => {
            setForm((prev) => ({
                ...prev,
                // Hanya apply kalau user belum pilih manual
                category_id: prev.category_id === "" ? (result.category_id || prev.category_id) : prev.category_id,
                priority: prev.priority === "" ? (result.priority || prev.priority) : prev.priority,
            }));
            setAiApplied(true);
        },
    });

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
            setAiApplied(false);
        } catch (error) {
            console.error(error);
            toast.error("Gagal membuat laporan");
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
        return <SuccessState onReset={() => { setForm(EMPTY_FORM); setSubmitted(false); setAiApplied(false); }} />;
    }

    return (
        <div className="px-8 pt-6 pb-20 max-w-[900px] mx-auto">

            {/* Back */}
            <div className="mb-5">
                <Link
                    href="/user"
                    className="inline-flex items-center gap-[7px] text-[0.75rem] font-semibold text-[#8a6f5e] no-underline px-[6px] py-[6px] pr-[10px] rounded-lg transition-all duration-150 hover:bg-[#fafaf8] hover:text-[#E8541C]"
                >
                    <ArrowLeft size={14} strokeWidth={2} /> Kembali
                </Link>
            </div>

            {/* Header */}
            <div className="mb-7">
                <div className="flex items-start gap-[14px]">
                    <div className="w-[46px] h-[46px] rounded-[13px] bg-gradient-to-br from-[#FFF5EE] to-[#FFEDE0] border-[0.5px] border-[rgba(255,107,53,0.18)] flex items-center justify-center text-[#E8541C] shrink-0">
                        <FileText size={20} strokeWidth={1.8} />
                    </div>
                    <div>
                        <h1 className="font-sans text-[1.75rem] font-extrabold text-[#111827] tracking-[-0.03em] m-0 mb-1">
                            Buat Laporan
                        </h1>
                        <p className="text-[0.82rem] text-[#a8856b] m-0">
                            Laporkan masalah di sekitar kamu dengan lengkap dan jelas
                        </p>
                    </div>
                </div>
            </div>

            {/* ── MAIN GRID ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

                {/* ── KIRI ── */}
                <div className="flex flex-col gap-5">

                    {/* Card: Info laporan */}
                    <div className="bg-[#FFFCFA] border border-[#e8d5c4] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(232,84,28,0.06)] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(232,84,28,0.14)] hover:border-[#d4b8a8]">
                        <div className="h-[3px] bg-[#f5ede3]">
                            <div
                                className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E8541C] rounded-[3px] transition-[width] duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            <div>
                                <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#c9a892] mb-4">Informasi Laporan</p>
                                <div className="flex flex-col gap-6">
                                    <TitleField value={form.title} onChange={(v) => {
                                        set("title", v);
                                        setAiApplied(false);
                                    }} />
                                    <DescriptionField value={form.description} onChange={(v) => {
                                        set("description", v);
                                        setAiApplied(false);
                                    }} />

                                    {/* ── AI Badge ── */}
                                    <AIBadge
                                        loading={aiLoading}
                                        confidence={lastResult?.confidence ?? null}
                                        error={aiError}
                                        applied={aiApplied}
                                    />
                                </div>
                            </div>
                            <div className="h-px bg-[#f0e6dc]" />
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#c9a892]">Klasifikasi</p>
                                    {aiApplied && !aiLoading && lastResult && (
                                        <span className="text-[0.62rem] text-[#E8541C] font-semibold bg-[#FFF5EE] px-2 py-0.5 rounded-full border border-[rgba(232,84,28,0.15)]">
                                            ✦ Diisi oleh AI
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-6">
                                    <CategoryField
                                        value={form.category_id}
                                        onChange={(v) => set("category_id", v)}
                                    />
                                    <PriorityField
                                        value={form.priority}
                                        onChange={(v) => set("priority", v)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card: Lokasi */}
                    <div className="bg-[#FAFCFF] border border-[#dde8f5] rounded-2xl p-6 shadow-[0_2px_12px_rgba(59,130,246,0.06)] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(59,130,246,0.14)] hover:border-[#b8d0eb]">
                        <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#93b4d4] mb-4">Lokasi Kejadian</p>
                        <LocationPicker
                            lat={form.latitude}
                            lng={form.longitude}
                            address={form.location}
                            onChange={(lat, lng, addr) =>
                                setForm((prev) => ({ ...prev, latitude: lat, longitude: lng, location: addr }))
                            }
                        />
                    </div>

                    {/* Card: Foto */}
                    <div className="bg-[#FAFAF8] border border-[#e8d5c4] rounded-2xl p-6 shadow-[0_2px_12px_rgba(232,84,28,0.04)] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(232,84,28,0.12)] hover:border-[#d4b8a8]">
                        <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#c9a892] mb-4">Foto Bukti</p>
                        <ImageUpload files={form.images} onChange={(files) => set("images", files)} maxFiles={5} />
                    </div>
                </div>

                {/* ── KANAN ── */}
                <div className="flex flex-col gap-4">

                    {/* Summary card */}
                    <div className="bg-white border-[1.5px] border-[#e8d5c4] rounded-2xl p-5 shadow-[0_4px_20px_rgba(232,84,28,0.08)] transition-all duration-200 hover:shadow-[0_8px_32px_rgba(232,84,28,0.16)] hover:border-[#d4b8a8]">
                        <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#c9a892] mb-4">Kelengkapan Form</p>

                        <div className="flex flex-col gap-3 mb-5">
                            {[
                                { label: "Judul laporan", done: form.title.trim().length >= 5 },
                                { label: "Deskripsi", done: form.description.trim().length >= 20 },
                                { label: "Kategori", done: !!form.category_id },
                                { label: "Prioritas", done: !!form.priority },
                                { label: "Lokasi", done: !!form.latitude },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-2.5">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                                        item.done ? "bg-emerald-500" : "bg-[#f0e6dc]"
                                    }`}>
                                        {item.done && (
                                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                                                <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className={`text-[0.78rem] transition-colors duration-200 ${
                                        item.done ? "text-[#1a0e08] font-medium" : "text-[#a8856b]"
                                    }`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="h-1.5 bg-[#f5ede3] rounded-full mb-2">
                            <div
                                className="h-full bg-gradient-to-r from-[#FF6B35] to-[#E8541C] rounded-full transition-[width] duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-[0.7rem] text-[#a8856b] mb-5">{progress}% lengkap</p>

                        <SubmitButton form={form} submitting={submitting} onSubmit={handleSubmit} />
                    </div>

                    {/* AI Status card — muncul saat AI aktif */}
                    {(aiLoading || (aiApplied && lastResult)) && (
                        <div className="bg-[#FFF5EE] border border-[rgba(232,84,28,0.2)] rounded-2xl p-4">
                            <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#E8541C] mb-3">
                                ✦ AI Suggestion
                            </p>
                            {aiLoading ? (
                                <div className="flex items-center gap-2 text-[0.78rem] text-[#a8856b]">
                                    <Loader2 size={13} className="animate-spin text-[#E8541C]" />
                                    Menganalisis laporan...
                                </div>
                            ) : lastResult && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-[0.75rem]">
                                        <span className="text-[#a8856b]">Kategori</span>
                                        <span className="font-semibold text-[#1a0e08]">
                                            {["Infrastruktur","Fasilitas Umum","Kebersihan","Lalu Lintas"][Number(lastResult.category_id) - 1] ?? "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-[0.75rem]">
                                        <span className="text-[#a8856b]">Prioritas</span>
                                        <span className="font-semibold text-[#1a0e08] capitalize">{lastResult.priority}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[0.75rem]">
                                        <span className="text-[#a8856b]">Keyakinan AI</span>
                                        <span className={`font-bold ${lastResult.confidence >= 0.7 ? "text-emerald-600" : "text-amber-600"}`}>
                                            {Math.round(lastResult.confidence * 100)}%
                                        </span>
                                    </div>
                                    <p className="text-[0.65rem] text-[#c9a892] mt-1">
                                        Kamu bisa mengubah kategori dan prioritas secara manual.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tips card */}
                    <div className="bg-[#FFF5EE] border border-[rgba(255,107,53,0.2)] rounded-2xl p-5 shadow-[0_2px_12px_rgba(232,84,28,0.06)] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(232,84,28,0.14)] hover:border-[rgba(255,107,53,0.4)]">
                        <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#E8541C] mb-3">Tips Laporan Efektif</p>
                        <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                            {[
                                "Tulis judul yang singkat dan jelas",
                                "Sertakan foto sebagai bukti kuat",
                                "Tandai lokasi kejadian di peta",
                                "Jelaskan kronologi dengan detail",
                            ].map((tip) => (
                                <li key={tip} className="flex items-start gap-2 text-[0.75rem] text-[#6b5546]">
                                    <span className="text-[#E8541C] mt-0.5 shrink-0">•</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}