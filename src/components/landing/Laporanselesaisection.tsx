import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LaporanSelesaiCard } from "../../components/landing/Laporanselesaicard";

const DATA_LAPORAN_SELESAI = [
    {
        id: "1",
        judul: "Pohon tumbang menutup akses jalan tembus SMPN 4",
        deskripsi:
            "Terganggunya masyarakat karena ada pohon tumbang menutup jalan tembus ke SMPN 4 (muka Bapperida) dan juga tidak kelihatan saat malam hari...",
        kategori: "infrastruktur" as const,
        pelapor: "Kecamatan Parsel",
        komentar: 5,
        dukungan: 1,
        lokasi: "Kec. Parsel",
    },
    {
        id: "2",
        judul: "Pembakaran sampah harian di area perumahan",
        deskripsi:
            "Tetangga hampir setiap hari membakar sampah, sudah ditegur dan lapor ke RT namun tidak ada hasil, mohon ditindaklanjuti...",
        kategori: "kebersihan" as const,
        pelapor: "Putria",
        komentar: 0,
        dukungan: 0,
    },
    {
        id: "3",
        judul: "Angin kencang merusak atap rumah warga",
        deskripsi:
            "Dampak angin kencang di Jl. Sukahaji RT.02 RW.02 Kel. Melong Kec. Cimahi Selatan menyebabkan kerusakan pada beberapa rumah...",
        kategori: "keamanan" as const,
        pelapor: "Andra Relawan Melong",
        komentar: 0,
        dukungan: 0,
        lokasi: "Cimahi Selatan",
    },
];

export function LaporanSelesaiSection() {
    return (
        <section className="w-full py-16">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <p className="mb-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                            Transparan & terbuka
                        </p>
                        <h2 className="text-xl font-medium text-foreground">
                            Laporan yang telah ditangani
                        </h2>
                    </div>

                    <Link
                        href="/laporan"
                        className="flex items-center gap-1.5 rounded-lg border border-border/50 px-4 py-2 text-[13px] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                    >
                        Lihat semua
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {DATA_LAPORAN_SELESAI.map((laporan) => (
                        <LaporanSelesaiCard key={laporan.id} {...laporan} />
                    ))}
                </div>
            </div>
        </section>
    );
}