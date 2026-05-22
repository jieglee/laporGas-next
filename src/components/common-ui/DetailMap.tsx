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

            L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
                { subdomains: "abcd", maxZoom: 20 }
            ).addTo(map);

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
        <div className="relative bg-white border-[0.5px] border-[#f0e6dc] rounded-[14px] overflow-hidden mb-4">
            <div ref={mapRef} className="w-full" style={{ height: 380 }} />

            {/* Address overlay */}
            <div className="absolute top-[14px] left-[14px] bg-[rgba(255,255,255,0.96)] backdrop-blur-sm border-[0.5px] border-[#f0e6dc] rounded-[10px] px-[14px] py-[10px] max-w-[320px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-[400]">
                <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[rgba(255,107,53,0.1)] flex items-center justify-center text-[#E8541C] shrink-0">
                        <MapPin size={14} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[0.6rem] font-bold text-[#a8856b] uppercase tracking-[0.08em] m-0 mb-[2px]">
                            Lokasi laporan
                        </p>
                        <p className="text-[0.8rem] font-semibold text-[#1a0e08] m-0 leading-[1.4]">
                            {alamat || "Koordinat tercatat"}
                        </p>
                        <p className="text-[0.62rem] text-[#a8856b] mt-[3px] mb-0 font-mono">
                            {lat.toFixed(6)}, {lng.toFixed(6)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Open in Maps */}
            <button
                onClick={openGoogleMaps}
                className="absolute top-[14px] right-[14px] inline-flex items-center gap-[6px] bg-white border-[0.5px] border-[#f0e6dc] rounded-[10px] px-[14px] py-2 text-[0.75rem] font-semibold text-[#3d2817] cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-150 z-[400] hover:bg-[#FFF5EE] hover:text-[#E8541C]"
            >
                <Navigation size={12} strokeWidth={1.8} />
                Buka di Google Maps
            </button>
        </div>
    );
}