"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import LaporanDetail from "@/components/user/LaporanDetail/LaporanDetail";

export default function LaporanDetailPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    return (
        <div>
            <div className="max-w-4xl mx-auto px-4 pt-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali
                </button>
            </div>
            <LaporanDetail reportId={Number(id)} />
        </div>
    )
}
