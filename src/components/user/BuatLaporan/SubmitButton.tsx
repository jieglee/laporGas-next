"use client";

import { ChevronRight, Loader2 } from "lucide-react";
import type { FormState } from "./types";

interface Props {
  form: FormState;
  submitting: boolean;
  onSubmit: () => void;
}

function Chip({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: "0.62rem",
        fontWeight: 600,
        color: "#E8541C",
        background: "#FFF5EE",
        border: "0.5px solid rgba(255,107,53,0.2)",
        padding: "3px 9px",
        borderRadius: 99,
      }}
    >
      {label}
    </span>
  );
}

export function isFormValid(form: FormState): boolean {
  return (
    form.title.trim().length >= 5 &&
    form.description.trim().length >= 20 &&
    Boolean(form.category_id) &&
    Boolean(form.latitude) &&
    Boolean(form.longitude) &&
    Boolean(form.priority)
  );
}

export default function SubmitButton({ form, submitting, onSubmit }: Props) {
  const valid = isFormValid(form);

  return (
    <div style={{ paddingTop: 4 }}>
      {!valid && (
        <div style={{ marginBottom: 14 }}>
        </div>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={!valid || submitting}
        style={{
          width: "100%",
          padding: "14px 20px",
          background: valid ? "linear-gradient(135deg, #FF6B35, #E8541C)" : "#f0e6dc",
          color: valid ? "white" : "#c9a892",
          fontSize: "0.88rem",
          fontWeight: 700,
          border: "none",
          borderRadius: 11,
          cursor: valid ? "pointer" : "not-allowed",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: valid ? "0 6px 18px rgba(255,107,53,0.28)" : "none",
          transition: "all 0.25s",
        }}
        onMouseEnter={(e) => {
          if (valid) {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 10px 26px rgba(255,107,53,0.38)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = valid ? "0 6px 18px rgba(255,107,53,0.28)" : "none";
        }}
      >
        {submitting ? (
          <>
            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            Mengirim laporan...
          </>
        ) : (
          <>Kirim Laporan <ChevronRight size={16} /></>
        )}
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}