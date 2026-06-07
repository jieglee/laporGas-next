interface MapPinProps {
    x: number;
    y: number;
    label: string;
    color: string;
}

export default function MapPin({ x, y, label, color }: MapPinProps) {
    return (
        <>
            <style jsx>{`
        .pin-wrap {
          transition: transform 0.2s ease;
        }
        .pin-wrap:hover {
          transform: translate(-50%, -100%) scale(1.1);
        }
        .pin-wrap:hover .label-tip {
          opacity: 1;
          transform: translateY(-6px);
        }
        @keyframes pulse-ring {
          0%   { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
        .pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
      `}</style>

            <div
                className="pin-wrap absolute"
                style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -100%)",
                }}
            >
                {/* Pulse ring */}
                <div
                    className="pulse-ring absolute h-3 w-3 rounded-full"
                    style={{
                        background: color,
                        top: "50%",
                        left: "50%",
                        opacity: 0.6,
                    }}
                />

                {/* Pin dot */}
                <div
                    className="relative h-3 w-3 rounded-full"
                    style={{
                        background: color,
                        border: "2px solid #FCFBF8",
                        boxShadow: `0 2px 6px ${color}66`,
                    }}
                />

                {/* Tooltip label */}
                <div
                    className="label-tip absolute left-1/2 top-full whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold"
                    style={{
                        background: "#111827",
                        color: "#fff",
                        transform: "translate(-50%, 0)",
                        marginTop: "8px",
                        opacity: 0,
                        transition: "all 0.2s ease",
                        pointerEvents: "none",
                    }}
                >
                    {label}
                </div>
            </div>
        </>
    );
}
