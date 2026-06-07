import { Map as MapIcon, Search, Plus, Minus } from "lucide-react";
import SectionTag from "@/components/landing/SectionTag";
import MapPin from "@/components/landing/MapPin";

const mapPoints = [
    { x: 22, y: 35, label: "Jalan Rusak",      color: "#E8541C" },
    { x: 45, y: 20, label: "Sampah Menumpuk",   color: "#F59E0B" },
    { x: 68, y: 55, label: "Lampu Mati",        color: "#E8541C" },
    { x: 30, y: 65, label: "Banjir Lokal",      color: "#10B981" },
    { x: 75, y: 30, label: "Pohon Tumbang",     color: "#3B82F6" },
    { x: 55, y: 75, label: "Drainase Mampet",   color: "#10B981" },
    { x: 15, y: 55, label: "Trotoar Rusak",     color: "#E8541C" },
    { x: 85, y: 65, label: "Vandalisme",        color: "#EF4444" },
];

const categories = [
    { dot: "#E8541C", label: "Infrastruktur", count: "847 laporan" },
    { dot: "#10B981", label: "Lingkungan",    count: "624 laporan" },
    { dot: "#F59E0B", label: "Kebersihan",    count: "538 laporan" },
    { dot: "#EF4444", label: "Keamanan",      count: "312 laporan" },
];

export default function GeoMapSection() {
    return (
        <section id="peta" className="px-[5%] py-24" style={{ background: "#F8F6F0" }}>
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* ── Kiri ── */}
                    <div className="w-full md:w-[360px] shrink-0">
                        <div className="mb-4 inline-flex items-center gap-1.5">
                            <SectionTag text="Geo Complaint Map" />
                        </div>

                        <h2 className="mb-4 text-[36px] font-extrabold leading-tight tracking-tight text-[#1a0e08] md:text-[40px]">
                            Setiap Masalah
                            <br />
                            <span className="bg-gradient-to-r from-[#FF6B35] to-[#E8201A] bg-clip-text text-transparent">
                                Punya Koordinatnya
                            </span>
                        </h2>

                        <p className="mb-7 text-base leading-relaxed text-[#6b5546]">
                            Laporan dipetakan secara akurat dengan GPS. Admin dapat melihat
                            clustering masalah dan memprioritaskan penanganan berdasarkan
                            lokasi.
                        </p>

                        <div className="flex flex-col gap-2.5">
                            {categories.map((c) => (
                                <div
                                    key={c.label}
                                    className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 bg-[#FFFCFA] border border-[#f0e6dc]"
                                >
                                    <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.dot }} />
                                    <span className="flex-1 text-sm font-semibold text-[#1a0e08]">{c.label}</span>
                                    <span className="text-[13px] text-[#a8856b]">{c.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Map card ── */}
                    <div
                        className="w-full flex-1 overflow-hidden rounded-2xl"
                        style={{
                            border: "1px solid #f0e6dc",
                            background: "#FFFCFA",
                            boxShadow: "0 8px 32px rgba(232,84,28,0.08)",
                        }}
                    >
                        {/* Browser chrome */}
                        <div
                            className="flex items-center gap-3 px-4 py-3"
                            style={{ borderBottom: "1px solid #f0e6dc", background: "#FAFAF8" }}
                        >
                            <div className="flex gap-1.5">
                                {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                                    <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                                ))}
                            </div>
                            <div
                                className="flex flex-1 items-center gap-1.5 rounded-lg px-3 py-1 text-xs text-[#a8856b]"
                                style={{ background: "#f5ede3" }}
                            >
                                <Search size={12} /> Cari lokasi...
                            </div>
                            <MapIcon size={16} className="text-[#E8541C]" />
                        </div>

                        {/* Map canvas */}
                        <div
                            className="relative h-[360px] overflow-hidden"
                            style={{ background: "linear-gradient(135deg, #FFF8F5 0%, #FFFCFA 50%, #FFF5EE 100%)" }}
                        >
                            <svg className="absolute inset-0 h-full w-full">
                                <defs>
                                    <pattern id="grid-geo" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0e6dc" strokeOpacity="0.8" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid-geo)" />
                                {/* Roads */}
                                <line x1="0" y1="180" x2="100%" y2="180" stroke="#f0e6dc" strokeWidth="8" />
                                <line x1="200" y1="0" x2="200" y2="100%" stroke="#f0e6dc" strokeWidth="6" />
                                <line x1="400" y1="0" x2="350" y2="100%" stroke="#f0e6dc" strokeWidth="4" />
                                {/* Blocks */}
                                <rect x="20"  y="20"  width="80"  height="60" rx="4" fill="#FFF5EE" fillOpacity="0.9" />
                                <rect x="120" y="20"  width="60"  height="50" rx="4" fill="#FFF5EE" fillOpacity="0.9" />
                                <rect x="250" y="30"  width="80"  height="70" rx="4" fill="#FFF5EE" fillOpacity="0.9" />
                                <rect x="20"  y="210" width="70"  height="80" rx="4" fill="#FEF3C7" fillOpacity="0.6" />
                                <rect x="250" y="220" width="100" height="60" rx="4" fill="#FFF5EE" fillOpacity="0.9" />
                                <rect x="420" y="50"  width="60"  height="80" rx="4" fill="#FEF3C7" fillOpacity="0.6" />
                                <rect x="420" y="200" width="70"  height="60" rx="4" fill="#FFF5EE" fillOpacity="0.9" />
                            </svg>

                            {/* Pins */}
                            {mapPoints.map((pt, i) => (
                                <MapPin key={i} x={pt.x} y={pt.y} label={pt.label} color={pt.color} />
                            ))}

                            {/* Heatmap */}
                            <div
                                className="pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{ left: "20%", top: "30%", background: "rgba(232,84,28,0.14)", filter: "blur(8px)" }}
                            />
                            <div
                                className="pointer-events-none absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{ left: "65%", top: "55%", background: "rgba(245,158,11,0.14)", filter: "blur(8px)" }}
                            />

                            {/* Zoom controls */}
                            <div
                                className="absolute top-3 right-3 overflow-hidden rounded-[10px]"
                                style={{ border: "1px solid #f0e6dc", background: "#fff", boxShadow: "0 2px 8px rgba(232,84,28,0.08)" }}
                            >
                                <div className="flex h-8 w-8 cursor-pointer items-center justify-center border-b border-[#f0e6dc] text-[#E8541C]">
                                    <Plus size={14} />
                                </div>
                                <div className="flex h-8 w-8 cursor-pointer items-center justify-center text-[#E8541C]">
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