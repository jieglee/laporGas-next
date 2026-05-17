"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, totalItems, itemsPerPage, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * itemsPerPage + 1;
  const to = Math.min(page * itemsPerPage, totalItems);

  // Build pages array with ellipsis logic
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const btnStyle = (active: boolean, disabled?: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 34,
    height: 34,
    padding: "0 10px",
    borderRadius: 9,
    border: `0.5px solid ${active ? "transparent" : "#f0e6dc"}`,
    background: active ? "linear-gradient(135deg, #FF6B35, #E8541C)" : "white",
    color: active ? "white" : disabled ? "#d4b89e" : "#3d2817",
    fontSize: "0.78rem",
    fontWeight: active ? 700 : 500,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
    boxShadow: active ? "0 4px 12px rgba(255,107,53,0.22)" : "none",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <p style={{ fontSize: "0.75rem", color: "#a8856b", margin: 0 }}>
        Menampilkan <strong style={{ color: "#1a0e08", fontWeight: 700 }}>{from}–{to}</strong> dari{" "}
        <strong style={{ color: "#1a0e08", fontWeight: 700 }}>{totalItems}</strong> laporan
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          style={btnStyle(false, page === 1)}
          onMouseEnter={(e) => {
            if (page !== 1) {
              e.currentTarget.style.background = "#FFF5EE";
              e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
              e.currentTarget.style.color = "#E8541C";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.borderColor = "#f0e6dc";
            e.currentTarget.style.color = page === 1 ? "#d4b89e" : "#3d2817";
          }}
        >
          <ChevronLeft size={14} strokeWidth={2} />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              style={{ padding: "0 6px", color: "#a8856b", fontSize: "0.78rem" }}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              style={btnStyle(p === page)}
              onMouseEnter={(e) => {
                if (p !== page) {
                  e.currentTarget.style.background = "#FFF5EE";
                  e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
                  e.currentTarget.style.color = "#E8541C";
                }
              }}
              onMouseLeave={(e) => {
                if (p !== page) {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#f0e6dc";
                  e.currentTarget.style.color = "#3d2817";
                }
              }}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          style={btnStyle(false, page === totalPages)}
          onMouseEnter={(e) => {
            if (page !== totalPages) {
              e.currentTarget.style.background = "#FFF5EE";
              e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)";
              e.currentTarget.style.color = "#E8541C";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.borderColor = "#f0e6dc";
            e.currentTarget.style.color = page === totalPages ? "#d4b89e" : "#3d2817";
          }}
        >
          <ChevronRight size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}