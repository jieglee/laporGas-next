import { MessageCircle, ThumbsUp } from "lucide-react";
import { cn } from "../../lib/utils";

type Kategori = "infrastruktur" | "keamanan" | "kebersihan" | "sosial" | "lainnya";

interface LaporanSelesaiCardProps {
    judul: string;
    deskripsi: string;
    kategori: Kategori;
    pelapor: string;
    komentar: number;
    dukungan: number;
    lokasi?: string;
}

const kategoriConfig: Record<
    Kategori,
    { label: string; className: string; icon: string }
> = {
    infrastruktur: {
        label: "Infrastruktur",
        className: "bg-blue-50 text-blue-800",
        icon: "🏗️",
    },
    keamanan: {
        label: "Keamanan",
        className: "bg-red-50 text-red-800",
        icon: "🚨",
    },
    kebersihan: {
        label: "Kebersihan",
        className: "bg-green-50 text-green-800",
        icon: "🌿",
    },
    sosial: {
        label: "Sosial",
        className: "bg-amber-50 text-amber-800",
        icon: "🤝",
    },
    lainnya: {
        label: "Lainnya",
        className: "bg-gray-100 text-gray-700",
        icon: "📋",
    },
};

function getInisial(nama: string): string {
    return nama
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
}

export function LaporanSelesaiCard({
    judul,
    deskripsi,
    kategori,
    pelapor,
    komentar,
    dukungan,
    lokasi,
}: LaporanSelesaiCardProps) {
    const config = kategoriConfig[kategori];

    return (
        <div className="group flex flex-col gap-3 rounded-xl border border-border/40 bg-white p-5 transition-colors hover:border-border/70">
            <div className="flex items-start justify-between gap-2">
                <span
                    className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                        config.className
                    )}
                >
                    <span aria-hidden="true">{config.icon}</span>
                    {config.label}
                </span>

                <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    <span className="text-[11px] font-medium text-green-700">Selesai</span>
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <h3 className="text-[13px] font-medium leading-snug text-foreground line-clamp-2">
                    {judul}
                </h3>
                <p className="text-[12px] leading-relaxed text-muted-foreground line-clamp-3">
                    {deskripsi}
                </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                    {getInisial(pelapor)}
                </div>
                <span className="text-[11px] text-muted-foreground">{pelapor}</span>

                {lokasi && (
                    <>
                        <span className="h-3 w-px bg-border" />
                        <span className="text-[11px] text-muted-foreground">{lokasi}</span>
                    </>
                )}

                <div className="ml-auto flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MessageCircle className="h-3 w-3" />
                        {komentar}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <ThumbsUp className="h-3 w-3" />
                        {dukungan}
                    </span>
                </div>
            </div>
        </div>
    );
}