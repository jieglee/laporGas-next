interface SectionTagProps {
    icon?: string;
    text: string;
}

export default function SectionTag({ icon, text }: SectionTagProps) {
    return (
        <div className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold"
            style={{
                background: "linear-gradient(to right, #FF6B35, #E8201A)",
                border: "1px solid #FF6B35",
                color: "#fff",
            }}
        >
            {icon && <span>{icon}</span>}
            {text}
        </div>
    );
}
