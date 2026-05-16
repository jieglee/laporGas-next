import { notFound } from "next/navigation";
import LaporanDetail from "@/components/user/LaporanDetail/LaporanDetail";
import { getLaporanById } from "@/lib/mock-laporan";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function LaporanDetailPage({ params }: PageProps) {
    const { id } = await params;
    const laporan = getLaporanById(Number(id));

    if (!laporan) {
        notFound();
    }

    return (
        <main style={{ background: "#fff", minHeight: "100vh" }}>
            <LaporanDetail laporan={laporan} />
        </main>
    );
}