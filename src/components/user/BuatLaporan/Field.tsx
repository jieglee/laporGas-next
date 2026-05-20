"use client";

interface Props {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}

export default function Field({ label, required, icon, hint, children }: Props) {
  return (
    <div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          fontSize: "0.78rem",
          fontWeight: 700,
          color: "#3d2817",
          marginBottom: 8,
        }}
      >
        {icon && (
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "rgba(255,107,53,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#E8541C",
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
        )}
        {label}
        {required && <span style={{ color: "#E8541C", fontSize: "0.7rem" }}>*</span>}
      </label>

      {children}

      {hint && (
        <p style={{ fontSize: "0.65rem", color: "#a8856b", margin: "6px 0 0", lineHeight: 1.5 }}>
          {hint}
        </p>
      )}
    </div>
  );
}

export const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "white",
  border: "0.5px solid #f0e6dc",
  borderRadius: 10,
  padding: "11px 14px",
  fontSize: "0.85rem",
  color: "#1a0e08",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
  lineHeight: 1.5,
};

export function focusOrange(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = "rgba(255,107,53,0.4)";
}

export function blurOrange(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = "#f0e6dc";
}