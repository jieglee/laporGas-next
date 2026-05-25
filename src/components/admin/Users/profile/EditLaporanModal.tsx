"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Lock, AlertTriangle } from "lucide-react";
import { updateReport, type Report, type Priority } from "@/lib/reports";

interface Props {
    open: boolean;
    onClose: () => void;
    report: Report | null;
    onSaved: (updated: Report) => void;
}

const PRIORITY_OPTS: { value: Priority; label: string; color: string }[] = [
    { value: "low",    label: "Low",    color: "text-blue-600 border-blue-200 bg-blue-50" },
    { value: "medium", label: "Medium", color: "text-yellow-600 border-yellow-200 bg-yellow-50" },
    { value: "high",   label: "High",   color: "text-orange-600 border-orange-200 bg-orange-50" },
    { value: "urgent", label: "Urgent", color: "text-red-600 border-red-200 bg-red-50" },
];

export default function EditLaporanModal({ open, onClose, report, onSaved }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open && report) {
            setTitle(report.title ?? "");
            setDescription(report.description ?? "");
            setPriority(report.priority ?? "medium");
            setError(null);
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
        }
    }, [open, report]);

    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const handleSubmit = async () => {
        if (!report || !title.trim() || !description.trim()) return;
        try {
            setSaving(true);
            setError(null);
            const updated = await updateReport(report.id, {
                title: title.trim(),
                description: description.trim(),
                priority,
            });
            onSaved(updated);
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.message ?? err?.message ?? "Gagal menyimpan perubahan");
        } finally {
            setSaving(false);
        }
    };

    if (!open || !report) return null;

    const alreadyEdited = report.edit_count >= 1;
    const canSubmit = !saving && title.trim().length >= 5 && description.trim().length >= 10;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-5 backdrop-blur-sm transition-all duration-200"
            style={{ background: visible ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)" }}
            onClick={onClose}
        >
            <div
                className="w-full max-w-[540px] overflow-hidden rounded-[20px] bg-white shadow-2xl transition-all duration-[250ms]"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
                    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-[#f5ede3] px-6 py-5">
                    <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-[11px] flex items-center justify-center shrink-0 ${alreadyEdited ? "bg-gray-100 text-gray-400" : "bg-[rgba(255,107,53,0.08)] text-[#E8541C]"}`}>
                            {alreadyEdited ? <Lock size={18} strokeWidth={2} /> : <AlertTriangle size={18} strokeWidth={2} />}
                        </div>
                        <div>
                            <h2 className="text-[1.05rem] font-extrabold text-[#1a0e08] tracking-[-0.02em] m-0"
                                style={{ fontFamily: "'Syne', sans-serif" }}>
                                Edit Laporan
                            </h2>
                            <p className="mt-[3px] text-[0.72rem] m-0" style={{ color: alreadyEdited ? "#9CA3AF" : "#a8856b" }}>
                                {alreadyEdited
                                    ? "Laporan ini sudah pernah diedit"
                                    : "Hanya bisa diedit 1 kali — pastikan sudah benar"}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="text-[#a8856b] hover:text-[#1a0e08] transition-colors p-1 rounded-lg bg-transparent border-0 cursor-pointer shrink-0">
                        <X size={19} />
                    </button>
                </div>

                {/* Body */}
                {alreadyEdited ? (
                    <div className="px-6 py-10 text-center">
                        <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Lock size={28} className="text-gray-300" strokeWidth={1.5} />
                        </div>
                        <p className="text-[0.95rem] font-semibold text-[#1a0e08] mb-2">Tidak bisa diedit lagi</p>
                        <p className="text-[0.78rem] text-[#a8856b] max-w-[280px] mx-auto leading-[1.6]">
                            Setiap laporan hanya bisa diedit satu kali untuk menjaga integritas data.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 px-6 py-5">
                        {/* Title */}
                        <div>
                            <div className="flex justify-between mb-[6px]">
                                <label className="text-[0.72rem] font-bold text-[#3d2817]">Judul laporan</label>
                                <span className={`text-[0.62rem] ${title.length > 100 ? "text-[#E8541C]" : "text-[#c9a892]"}`}>
                                    {title.length}/120
                                </span>
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={120}
                                placeholder="Tulis judul yang singkat dan jelas"
                                className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35]"
                            />
                            {title.trim().length > 0 && title.trim().length < 5 && (
                                <p className="text-[0.65rem] text-red-400 mt-1">Minimal 5 karakter</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-[6px] block text-[0.72rem] font-bold text-[#3d2817]">Deskripsi</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                placeholder="Jelaskan masalah secara detail"
                                className="w-full rounded-[10px] border border-[#f0e6dc] bg-[#fafaf8] px-4 py-3 text-[0.85rem] text-[#1a0e08] outline-none transition focus:border-[#FF6B35] resize-none leading-[1.6]"
                            />
                            {description.trim().length > 0 && description.trim().length < 10 && (
                                <p className="text-[0.65rem] text-red-400 mt-1">Minimal 10 karakter</p>
                            )}
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="mb-[6px] block text-[0.72rem] font-bold text-[#3d2817]">Prioritas</label>
                            <div className="flex gap-2 flex-wrap">
                                {PRIORITY_OPTS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setPriority(opt.value)}
                                        className={`px-4 py-[7px] rounded-full text-[0.75rem] font-semibold border-[1.5px] transition-all duration-150 cursor-pointer ${
                                            priority === opt.value
                                                ? opt.color
                                                : "bg-white text-[#9CA3AF] border-[#f0e6dc] hover:border-[#d0c4ba]"
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-[0.78rem] text-red-700 flex items-start gap-2">
                                <span className="shrink-0 mt-[1px]">⚠️</span>
                                {error}
                            </div>
                        )}

                        <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-[0.75rem] text-amber-700 leading-[1.6]">
                            ⚠️ Perubahan ini <strong>tidak bisa diulang</strong>. Setelah disimpan, laporan tidak bisa diedit lagi.
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-[#f5ede3] bg-[#fafaf8] px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-[#f0e6dc] bg-white px-5 py-2.5 text-sm font-semibold text-[#3d2817] transition hover:bg-[#fafaf8] cursor-pointer"
                    >
                        {alreadyEdited ? "Tutup" : "Batal"}
                    </button>
                    {!alreadyEdited && (
                        <button
                            onClick={handleSubmit}
                            disabled={!canSubmit}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E8541C] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-[1px] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                            {saving && <Loader2 size={14} className="animate-spin" />}
                            {saving ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}