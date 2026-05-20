"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { STATUS_STYLE, fmtUpvote } from "@/lib/report-utils";
import type { Report } from "@/lib/reports";

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
    <path
      d="M11 7.5a1 1 0 01-1 1H4l-2 2V3a1 1 0 011-1h7a1 1 0 011 1v4.5z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

const IconOfficial = () => (
  <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
    <rect
      x="2"
      y="6"
      width="9"
      height="5"
      rx="0.5"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M4 6V4a2.5 2.5 0 015 0v2"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

export default function LaporanCard({ laporan }: { laporan: Report }) {
  const [upvoted, setUpvoted] = useState(false);

  const [count, setCount] = useState(0);

  const s =
    STATUS_STYLE[laporan.status] || STATUS_STYLE.pending;

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
        transition:
          "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
        color: "inherit",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          position: "relative",
          height: 180,
          background: "#e5e5e5",
        }}
      >
        {laporan.image_url ? (
          <Image
            src={laporan.image_url}
            alt={laporan.title}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontSize: 13,
            }}
          >
            Tidak ada gambar
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
          }}
        >
          <span
            style={{
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              padding: "3px 9px",
              borderRadius: 99,
              background: s.bg,
              color: s.color,
            }}
          >
            {laporan.status}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div
        style={{
          padding: "14px 16px 16px",
        }}
      >
        <div
          style={{
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#E8201A",
            marginBottom: 7,
          }}
        >
          {laporan.category_name || "Kategori"} ·{" "}
          {laporan.location || "Lokasi"}
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
          }}
        >
          {laporan.title}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
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
            <IconUpvote filled={upvoted} />

            {fmtUpvote(count)}
          </button>

          <span
            style={{
              fontSize: "0.68rem",
              color: "#ccc",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <IconComment /> 0
          </span>

          <span
            style={{
              fontSize: "0.68rem",
              color: "#1D4ED8",
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginLeft: "auto",
            }}
          >
            <IconOfficial /> 0 respon
          </span>
        </div>
      </div>
    </Link>
  );
}