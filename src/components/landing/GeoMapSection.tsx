"use client";

import { useEffect, useState } from "react";
import { Map as MapIcon, Search, Plus, Minus } from "lucide-react";
import SectionTag from "@/components/landing/SectionTag";
import MapPin from "@/components/landing/MapPin";
import { getReports } from "@/lib/reports";

const CATEGORY_META: Record<string, { dot: string; label: string }> = {
    infrastruktur:  { dot: "#E8541C", label: "Infrastruktur" },
    "fasilitas umum": { dot: "#3B82F6", label: "Fasilitas Umum" },
    kebersihan:     { dot: "#10B981", label: "Kebersihan" },
    "lalu lintas":  { dot: "#F59E0B", label: "Lalu Lintas" },
};

function mapCategoryName(name: string): string {
    switch (name.toLowerCase()) {
        case "infrastruktur": return "infrastruktur";
        case "fasilitas umum":
        case "fasilitas-umum": return "fasilitas umum";
        case "kebersihan": return "kebersihan";
        case "lalu lintas":
        case "lalu-lintas": return "lalu lintas";
        default: return "";
    }
}

const mapPoints = [
    { x: 22, y: 35, label: "Jalan Rusak",    color: "#E8541C" },
    { x: 58, y: 22, label: "Sampah Menumpuk", color: "#F59E0B" },
    { x: 76, y: 38, label: "Lampu Mati",     color: "#3B82F6" },
    { x: 42, y: 62, label: "Banjir Lokal",   color: "#10B981" },
    { x: 18, y: 68, label: "Trotoar Rusak",  color: "#E8541C" },
    { x: 65, y: 60, label: "Drainase Mampet",color: "#10B981" },
    { x: 82, y: 58, label: "Pohon Tumbang",  color: "#F59E0B" },
    { x: 50, y: 80, label: "Vandalisme",     color: "#EF4444" },
];

// 2x2 grid cells — warna pastel sesuai screenshot
const CELLS = [
    { bg: "#D5F0E8" }, // hijau muda kiri atas
    { bg: "#E8F4F8" }, // biru muda kanan atas
    { bg: "#FEF9D7" }, // kuning muda kiri bawah
    { bg: "#E8F4F8" }, // biru muda kanan bawah
];

export default function GeoMapSection() {
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getReports()
            .then((reports) => {
                const acc: Record<string, number> = {};
                for (const r of reports) {
                    const key = mapCategoryName(r.category_name);
                    if (key) acc[key] = (acc[key] ?? 0) + 1;
                }
                setCounts(acc);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const categories = Object.entries(CATEGORY_META).map(([key, meta]) => ({
        ...meta,
        count: counts[key] ?? 0,
    }));

    return (
        <section id="peta" style={{ padding: "90px 5%" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 80 }}>

                    {/* ── Kiri ── */}
                    <div style={{ width: 360, flexShrink: 0 }}>
                        <div style={{ marginBottom: 16 }}>
                            <SectionTag text="Geo Complaint Map" />
                        </div>

                        <h2 style={{
                            fontSize: 40,
                            fontWeight: 900,
                            lineHeight: 1.1,
                            letterSpacing: "-0.03em",
                            color: "#111827",
                            margin: "0 0 16px",
                        }}>
                            Setiap Masalah
                            <br />
                            <span style={{ background: "linear-gradient(to right, #FF6B35, #E8201A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Punya Koordinatnya</span>
                        </h2>

                        <p style={{
                            fontSize: 15,
                            color: "#6B7280",
                            lineHeight: 1.75,
                            margin: "0 0 32px",
                        }}>
                            Laporan dipetakan secara akurat dengan GPS. Admin dapat
                            melihat clustering masalah dan memprioritaskan
                            penanganan berdasarkan lokasi.
                        </p>

                        {/* Kategori list — simple, tanpa border card */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {loading
                                ? Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#e5e7eb", flexShrink: 0 }} />
                                        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#e5e7eb", background: "#e5e7eb", borderRadius: 4 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <span style={{ fontSize: 13, color: "#e5e7eb", background: "#e5e7eb", borderRadius: 4 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    </div>
                                ))
                                : categories.map((c) => (
                                    <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{
                                            width: 10, height: 10,
                                            borderRadius: "50%",
                                            backgroundColor: c.dot,
                                            flexShrink: 0,
                                        }} />
                                        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#111827" }}>
                                            {c.label}
                                        </span>
                                        <span style={{ fontSize: 13, color: "#9CA3AF" }}>
                                            {c.count.toLocaleString("id-ID")} laporan
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* ── Map card ── */}
                    <div style={{
                        flex: 1,
                        minWidth: 0,
                        borderRadius: 20,
                        overflow: "hidden",
                        border: "1px solid #E8E4D9",
                        background: "#FCFBF8",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                    }}>
                        {/* Browser chrome */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "10px 16px",
                            borderBottom: "1px solid #E8E4D9",
                            background: "#F8F6F0",
                        }}>
                            <div style={{ display: "flex", gap: 6 }}>
                                {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                                    <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
                                ))}
                            </div>
                            <div style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                background: "#F1EDE2",
                                borderRadius: 8,
                                padding: "4px 12px",
                                fontSize: 12,
                                color: "#9CA3AF",
                            }}>
                                <Search size={12} />
                                Cari lokasi...
                            </div>
                            <MapIcon size={16} color="#10B981" />
                        </div>

                        {/* Map canvas */}
                        <div style={{ position: "relative", height: 360, overflow: "hidden", background: "#F8F6F0" }}>

                            {/* 2x2 grid */}
                            <div style={{
                                position: "absolute", inset: 0,
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gridTemplateRows: "1fr 1fr",
                                gap: 2,
                                padding: 2,
                            }}>
                                {CELLS.map((cell, i) => (
                                    <div key={i} style={{ backgroundColor: cell.bg, borderRadius: 4, position: "relative", overflow: "hidden" }} />
                                ))}
                            </div>

                            {/* Roads */}
                            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                                {/* Horizontal road */}
                                <line x1="0" y1="181" x2="100%" y2="181" stroke="#E8E4D9" strokeWidth="7" />
                                {/* Vertical road */}
                                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#E8E4D9" strokeWidth="6" />
                                {/* Diagonal road */}
                                <line x1="35%" y1="0" x2="65%" y2="100%" stroke="#E8E4D9" strokeWidth="4" />
                            </svg>

                            {/* Pins */}
                            {mapPoints.map((pt, i) => (
                                <MapPin key={i} x={pt.x} y={pt.y} label={pt.label} color={pt.color} />
                            ))}

                            {/* Heatmap blobs */}
                            <div style={{
                                position: "absolute",
                                width: 110, height: 110,
                                borderRadius: "50%",
                                background: "rgba(232,84,28,0.15)",
                                filter: "blur(20px)",
                                left: "18%", top: "25%",
                                transform: "translate(-50%, -50%)",
                                pointerEvents: "none",
                            }} />
                            <div style={{
                                position: "absolute",
                                width: 90, height: 90,
                                borderRadius: "50%",
                                background: "rgba(16,185,129,0.15)",
                                filter: "blur(16px)",
                                left: "68%", top: "62%",
                                transform: "translate(-50%, -50%)",
                                pointerEvents: "none",
                            }} />

                            {/* Zoom controls */}
                            <div style={{
                                position: "absolute",
                                top: 12, right: 12,
                                borderRadius: 10,
                                overflow: "hidden",
                                border: "1px solid #E8E4D9",
                                background: "#FCFBF8",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                            }}>
                                <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #E8E4D9", color: "#10B981", cursor: "pointer" }}>
                                    <Plus size={14} />
                                </div>
                                <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "#10B981", cursor: "pointer" }}>
                                    <Minus size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}