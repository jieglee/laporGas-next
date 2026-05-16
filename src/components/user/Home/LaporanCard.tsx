"use client";

import { useState } from "react";
import Link from "next/link";
import { STATUS_STYLE, fmtUpvote, type Laporan } from "@/lib/mock-laporan";

const IconUpvote = ({ filled }: { filled?: boolean }) => (
    <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
        <path
            d="M6.5 2L11 7H8.5v4h-4V7H2L6.5 2z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill={filled ? "currentColor" : "none"}
        />
    </svg>
);

const IconComment = () => (
    <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
        <path d="M11 7.5a1 1 0 01-1 1H4l-2 2V3a1 1 0 011-1h7a1 1 0 011 1v4.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
);

const IconOfficial = () => (
    <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
        <rect x="2" y="6" width="9" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M4 6V4a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
);

const IconPhoto = () => (
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="18" height="14" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <circle cx="8" cy="10" r="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <path d="M2 15l5-4 4 3 3-2 6 5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

export default function LaporanCard({ laporan }: { laporan: Laporan }) {
    const [upvoted, setUpvoted] = useState(false);
    const [count, setCount] = useState(laporan.upvote);
    const s = STATUS_STYLE[laporan.status];

    const handleUpvote = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setUpvoted((p) => !p);
        setCount((p) => (upvoted ? p - 1 : p + 1));
    };

    return (
        <Link
            href={`/user/laporan/${laporan.id}`}
            style={{
                textDecoration: "none",
                display: "block",
                background: "white",
                border: "0.5px solid #ebebeb",
                borderRadius: 12,
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                color: "inherit",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.05)";
                e.currentTarget.style.borderColor = "#ddd";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#ebebeb";
            }}
        >
            {/* Foto */}
            <div style={{ position: "relative", height: 110, background: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconPhoto />
                <div style={{ position: "absolute", top: 8, left: 8 }}>
                    <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 99, background: s.bg, color: s.color }}>
                        {laporan.status}
                    </span>
                </div>
                <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: 9, fontWeight: 600, background: "rgba(0,0,0,0.42)", color: "white", padding: "2px 8px", borderRadius: 99 }}>
                    {laporan.fotoCount} foto
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: "14px 16px 16px" }}>
                <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#E8201A", marginBottom: 7 }}>
                    {laporan.kategori} · {laporan.kota}
                </div>
                <p
                    style={{
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        color: "#222",
                        lineHeight: 1.55,
                        marginBottom: 14,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "calc(0.78rem * 1.55 * 3)",
                    }}
                >
                    {laporan.judul}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                        onClick={handleUpvote}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            color: upvoted ? "#E8201A" : "#bbb",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                        }}
                    >
                        <IconUpvote filled={upvoted} /> {fmtUpvote(count)}
                    </button>
                    <span style={{ fontSize: "0.68rem", color: "#ccc", display: "flex", alignItems: "center", gap: 4 }}>
                        <IconComment /> {laporan.komentar.length}
                    </span>
                    <span style={{ fontSize: "0.68rem", color: "#1D4ED8", display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
                        <IconOfficial /> {laporan.tindakLanjut.length} respon
                    </span>
                </div>
            </div>
        </Link>
    );
}