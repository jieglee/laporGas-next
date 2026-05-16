'use client';

import { Laporan, fmtUpvote, STATUS_STYLE } from "@/lib/mock-laporan";

interface LaporanDetailProps {
    laporan: Laporan;
}

export default function LaporanDetail({ laporan }: LaporanDetailProps) {
    const statusStyle = STATUS_STYLE[laporan.status];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {laporan.kategori}
                    </span>
                    <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                        }}
                    >
                        {laporan.status}
                    </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{laporan.judul}</h1>
                <p className="text-gray-600">{laporan.kota} • {laporan.waktu}</p>
            </div>

            {/* Deskripsi */}
            {laporan.deskripsi && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700">{laporan.deskripsi}</p>
                </div>
            )}

            {/* Stats */}
            <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">👍</span>
                    <span className="font-semibold">{fmtUpvote(laporan.upvote)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">📷</span>
                    <span className="font-semibold">{laporan.fotoCount} Foto</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">💬</span>
                    <span className="font-semibold">{laporan.komentar.length} Komentar</span>
                </div>
            </div>

            {/* Tindak Lanjut */}
            {laporan.tindakLanjut.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Tindak Lanjut</h2>
                    <div className="space-y-4">
                        {laporan.tindakLanjut.map((note) => (
                            <div key={note.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-sm">{note.inisial}</span>
                                    <span className="text-sm text-gray-600">{note.instansi}</span>
                                    <span className="text-xs text-gray-500">• {note.waktu}</span>
                                </div>
                                <p className="text-gray-700">{note.teks}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Komentar */}
            {laporan.komentar.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Komentar ({laporan.komentar.length})</h2>
                    <div className="space-y-4">
                        {laporan.komentar.map((komentar) => (
                            <div key={komentar.id} className="border-b pb-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
                                        {komentar.inisial}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-sm">{komentar.nama}</span>
                                            <span className="text-xs text-gray-500">• {komentar.waktu}</span>
                                        </div>
                                        <p className="text-gray-700 mb-2">{komentar.teks}</p>
                                        <button className="text-sm text-gray-600 hover:text-blue-600">
                                            👍 {komentar.upvote}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
