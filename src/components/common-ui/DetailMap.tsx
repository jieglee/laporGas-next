"use client";

import { useEffect, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";

interface Props {
    lat: number;
    lng: number;
    judul: string;
    alamat: string;
}

export default function DetailMap({ lat, lng, judul, alamat }: Props) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<unknown>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;
        let cancelled = false;

        (async () => {
            const L = (await import("leaflet")).default;

            if (!document.querySelector('link[href*="leaflet.css"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(link);
            }

            if (cancelled || !mapRef.current) return;

            const map = L.map(mapRef.current, {
                center: [lat, lng],
                zoom: 16,
                zoomControl: true,
                attributionControl: false,
            });

            // CartoDB Voyager — clean, no API key
            L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
                { subdomains: "abcd", maxZoom: 20 }
            ).addTo(map);

            // Dot marker
            L.circleMarker([lat, lng], {
                radius: 10,
                color: "white",
                weight: 3,
                fillColor: "#E8541C",
                fillOpacity: 1,
            }).addTo(map);

            mapInstanceRef.current = map;
        })();

        return () => {
            cancelled = true;
            if (mapInstanceRef.current) {
                (mapInstanceRef.current as { remove: () => void }).remove();
                mapInstanceRef.current = null;
            }
        };
    }, [lat, lng]);

    const openGoogleMaps = () => {
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    };

    return (
        <div style={{
            position: "relative", background: "white",
            border: "0.5px solid #f0e6dc", borderRadius: 14,
            overflow: "hidden", marginBottom: 16,
        }}>
            <div ref={mapRef} style={{ width: "100%", height: 380 }} />

            {/* Address overlay */}
            <div style={{
                position: "absolute", top: 14, left: 14,
                background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)",
                border: "0.5px solid #f0e6dc", borderRadius: 10,
                padding: "10px 14px", maxWidth: 320,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 400,
            }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: "rgba(255,107,53,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#E8541C", flexShrink: 0,
                    }}>
                        <MapPin size={14} strokeWidth={2} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#a8856b", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 2px" }}>
                            Lokasi laporan
                        </p>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1a0e08", margin: 0, lineHeight: 1.4 }}>
                            {alamat || "Koordinat tercatat"}
                        </p>
                        <p style={{ fontSize: "0.62rem", color: "#a8856b", margin: "3px 0 0", fontFamily: "ui-monospace, monospace" }}>
                            {lat.toFixed(6)}, {lng.toFixed(6)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Open in Maps */}
            <button
                onClick={openGoogleMaps}
                style={{
                    position: "absolute", top: 14, right: 14,
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "white", border: "0.5px solid #f0e6dc",
                    borderRadius: 10, padding: "8px 14px",
                    fontSize: "0.75rem", fontWeight: 600, color: "#3d2817",
                    cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    transition: "all 0.15s", zIndex: 400,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF5EE"; e.currentTarget.style.color = "#E8541C"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#3d2817"; }}
            >
                <Navigation size={12} strokeWidth={1.8} />
                Buka di Google Maps
            </button>
        </div>
    );
}