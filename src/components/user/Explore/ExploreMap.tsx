"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Report } from "@/lib/reports";
import { STATUS_CFG } from "@/constants/report-config";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function createCustomIcon(color: string) {
    return L.divIcon({
        className: "",
        html: `<div style="width:32px;height:32px;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2);"></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -36],
    });
}

const STATUS_COLORS: Record<string, string> = {
    pending: "#F59E0B",
    approved: "#3B82F6",
    on_progress: "#8B5CF6",
    completed: "#10B981",
    rejected: "#EF4444",
};

function fmtDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric", month: "short", year: "numeric",
    });
}

function MapBounds({ reports }: { reports: Report[] }) {
    const map = useMap();
    useEffect(() => {
        const valid = reports.filter((r) => r.latitude && r.longitude);
        if (valid.length === 0) return;
        if (valid.length === 1) {
            map.setView([valid[0].latitude!, valid[0].longitude!], 14);
            return;
        }
        const bounds = L.latLngBounds(valid.map((r) => [r.latitude!, r.longitude!]));
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
    }, [reports]);
    return null;
}



interface Props { reports: Report[]; }

export default function ExploreMap({ reports }: Props) {
    const validReports = reports.filter((r) => r.latitude && r.longitude);
    const center: [number, number] = validReports.length > 0
        ? [validReports[0].latitude!, validReports[0].longitude!]
        : [-6.4, 106.8];
        const mapRef = useRef<L.Map | null>(null);

    return (
        <div className="relative rounded-2xl overflow-hidden border border-[#f0e6dc] shadow-sm">
            {/* Legend */}
            <div className="absolute top-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl border border-[#f0e6dc] px-3 py-2 shadow-sm">
                <p className="text-[0.6rem] font-bold uppercase tracking-wider text-[#a8856b] mb-2">Status</p>
                <div className="flex flex-col gap-1.5">
                    {Object.entries(STATUS_COLORS).map(([status, color]) => {
                        const cfg = STATUS_CFG[status as keyof typeof STATUS_CFG];
                        return (
                            <div key={status} className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                                <span className="text-[0.68rem] text-[#6b5546]">{cfg?.label ?? status}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Count */}
            <div className="absolute top-3 right-3 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl border border-[#f0e6dc] px-3 py-2 shadow-sm">
                <p className="text-[0.72rem] font-semibold text-[#1a0e08]">
                    {validReports.length} <span className="text-[#a8856b] font-normal">laporan di peta</span>
                </p>
                {reports.length !== validReports.length && (
                    <p className="text-[0.65rem] text-[#a8856b]">
                        {reports.length - validReports.length} tanpa lokasi
                    </p>
                )}
            </div>

            <MapContainer
                center={center}
                zoom={11}
                style={{ height: "600px", width: "100%" }}
                zoomControl={false}
                ref={mapRef}
                whenReady={() => {
                    // pastiin map ready sebelum interaksi
                }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
                <MapBounds reports={validReports} />

                {validReports.map((report) => {
                    const color = STATUS_COLORS[report.status] ?? "#a8856b";
                    const icon = createCustomIcon(color);

                    return (
                        <Marker
                            key={report.id}
                            position={[report.latitude!, report.longitude!]}
                            icon={icon}
                        >
                            <Popup maxWidth={280}>
                                <div style={{ fontFamily: "inherit", padding: "4px", minWidth: 220 }}>
                                    {/* Badges */}
                                    <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                                        <span style={{
                                            display: "inline-flex", alignItems: "center", gap: 4,
                                            fontSize: 10, fontWeight: 700,
                                            backgroundColor: color + "20", color,
                                            borderRadius: 99, padding: "3px 8px",
                                        }}>
                                            <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: color, display: "inline-block" }} />
                                            {STATUS_CFG[report.status as keyof typeof STATUS_CFG]?.label ?? report.status}
                                        </span>
                                        {report.category_name && (
                                            <span style={{ fontSize: 10, color: "#6b5546", fontWeight: 600 }}>
                                                · {report.category_name}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <p style={{ fontSize: 13, fontWeight: 700, color: "#1a0e08", margin: "0 0 6px", lineHeight: 1.4 }}>
                                        {report.title}
                                    </p>

                                    {/* Image */}
                                    {report.image_url && (
                                        <img
                                            src={report.image_url}
                                            alt=""
                                            style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 8, display: "block" }}
                                        />
                                    )}

                                    {/* Location */}
                                    {report.location && (
                                        <div style={{ fontSize: 11, color: "#a8856b", margin: "0 0 6px", display: "flex", alignItems: "flex-start", gap: 4 }}>
                                            📍 {report.location}
                                        </div>
                                    )}

                                    {/* Meta */}
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        fontSize: 11, color: "#a8856b",
                                        borderTop: "0.5px solid #f0e6dc",
                                        paddingTop: 8, marginTop: 4,
                                    }}>
                                        <span>👤 {report.user_name ?? "Anonim"}</span>
                                        <span>📅 {fmtDate(report.created_at)}</span>
                                        <span>↑ {report.upvote_count ?? 0}</span>
                                    </div>

                                    {/* CTA */}
                                    <a
                                        href={`/user/laporan/${report.id}`}
                                        style={{
                                            display: "block", marginTop: 10,
                                            backgroundColor: "#E8541C", color: "#fff",
                                            textAlign: "center", borderRadius: 8,
                                            padding: "7px 12px", fontSize: 12,
                                            fontWeight: 700, textDecoration: "none",
                                        }}
                                    >
                                        Lihat Detail →
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}