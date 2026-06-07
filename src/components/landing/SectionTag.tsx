interface SectionTagProps {
    icon?: string;
    text: string;
}

export default function SectionTag({ icon, text }: SectionTagProps) {
    return (
        <div className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold"
            style={{
                background: "#CCFBF1",
                border: "1px solid #5EEAD4",
                color: "#0F766E",
            }}
        >
            {icon && <span>{icon}</span>}
            {text}
        </div>
    );
}
