"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Search, MapPin, Loader2, X } from "lucide-react";
import Field from "./Field";

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface Props {
  lat: string;
  lng: string;
  address: string;
  onChange: (lat: string, lng: string, address: string) => void;
}

const DEFAULT = { lat: -6.2088, lng: 106.8456 };

export default function LocationPicker({ lat, lng, address, onChange }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const markerRef = useRef<unknown>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState(address || "");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
        center: [lat ? parseFloat(lat) : DEFAULT.lat, lng ? parseFloat(lng) : DEFAULT.lng],
        zoom: lat ? 15 : 11,
        zoomControl: false, attributionControl: false,
        dragging: false, scrollWheelZoom: false, doubleClickZoom: false,
        touchZoom: false, keyboard: false,
      });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd", maxZoom: 20,
      }).addTo(map);
      if (lat && lng) {
        markerRef.current = L.circleMarker([parseFloat(lat), parseFloat(lng)], {
          radius: 10, color: "white", weight: 3, fillColor: "#E8541C", fillOpacity: 1,
        }).addTo(map);
      }
      mapInstanceRef.current = map;
    })();
    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flyTo = useCallback(async (la: number, lo: number) => {
    if (!mapInstanceRef.current) return;
    const L = (await import("leaflet")).default;
    const map = mapInstanceRef.current as { setView: (c: [number, number], z: number) => void; addLayer: (l: unknown) => void };
    map.setView([la, lo], 15);
    if (markerRef.current) {
      (markerRef.current as { setLatLng: (c: [number, number]) => void }).setLatLng([la, lo]);
    } else {
      const m = L.circleMarker([la, lo], { radius: 10, color: "white", weight: 3, fillColor: "#E8541C", fillOpacity: 1 });
      map.addLayer(m);
      markerRef.current = m;
    }
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 3) { setResults([]); setShowDropdown(false); return; }
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&countrycodes=id`,
        { headers: { Accept: "application/json", "Accept-Language": "id" } }
      );
      const data: NominatimResult[] = await res.json();
      setResults(data);
      setShowDropdown(data.length > 0);
    } catch {
      setResults([]); setShowDropdown(false);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleInput = (val: string) => {
    setQuery(val);
    if (!val.trim()) { onChange("", "", ""); setResults([]); setShowDropdown(false); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 500);
  };

  const pick = (r: NominatimResult) => {
    const short = r.display_name.split(",").slice(0, 3).join(", ");
    setQuery(short);
    setResults([]);
    setShowDropdown(false);
    onChange(r.lat, r.lon, r.display_name);
    flyTo(parseFloat(r.lat), parseFloat(r.lon));
  };

  const clear = () => {
    setQuery(""); setResults([]); setShowDropdown(false); onChange("", "", "");
    if (mapInstanceRef.current)
      (mapInstanceRef.current as { setView: (c: [number, number], z: number) => void }).setView([DEFAULT.lat, DEFAULT.lng], 11);
  };

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <Field label="Lokasi kejadian" required hint="Ketik nama jalan, gedung, atau kawasan.">
      <div className="flex flex-col gap-[10px]">

        {/* Search */}
        <div ref={dropdownRef} className="relative z-[9999]">
          <div
            className={[
              "flex items-center gap-[10px] bg-white border-[0.5px] px-[14px] h-11 transition-all duration-150",
              showDropdown
                ? "border-[rgba(255,107,53,0.5)] rounded-t-[10px]"
                : "border-[#f0e6dc] rounded-[10px]",
            ].join(" ")}
          >
            {searching
              ? <Loader2 size={15} className="text-[#E8541C] shrink-0 animate-spin" />
              : <Search size={15} className="text-[#a8856b] shrink-0" />
            }
            <input
              type="text"
              placeholder="Cari lokasi... (contoh: Jl. Sudirman, Jakarta)"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onFocus={() => { if (results.length > 0) setShowDropdown(true); }}
              className="flex-1 border-none outline-none text-[0.85rem] text-[#1a0e08] bg-transparent font-[inherit]"
            />
            {query && (
              <button
                type="button"
                onClick={clear}
                className="bg-transparent border-none cursor-pointer p-0.5 flex text-[#a8856b]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border-[0.5px] border-[rgba(255,107,53,0.35)] [border-top:0.5px_solid_#f5ede3] rounded-b-[10px] z-[9999] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.14)]">
              {results.map((r, i) => {
                const parts = r.display_name.split(",");
                return (
                  <button
                    key={r.place_id}
                    type="button"
                    onClick={() => pick(r)}
                    className={[
                      "w-full flex items-start gap-[10px] py-[11px] px-[14px] bg-white border-none cursor-pointer text-left transition-colors duration-100 font-[inherit] hover:bg-[#FFF5EE]",
                      i > 0 ? "[border-top:0.5px_solid_#f5ede3]" : "",
                    ].join(" ")}
                  >
                    <MapPin size={14} strokeWidth={2} className="text-[#E8541C] shrink-0 mt-[3px]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.82rem] font-semibold text-[#1a0e08] m-0 mb-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
                        {parts.slice(0, 2).join(",").trim()}
                      </p>
                      {parts.length > 2 && (
                        <p className="text-[0.7rem] text-[#a8856b] m-0 overflow-hidden text-ellipsis whitespace-nowrap">
                          {parts.slice(2, 5).join(",").trim()}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Map */}
        <div className="relative rounded-xl overflow-hidden border-[0.5px] border-[#f0e6dc] h-[200px]">
          <div ref={mapRef} className="w-full h-full" />

          {/* Overlay sebelum ada lokasi */}
          {!lat && (
            <div className="absolute inset-0 z-[400] pointer-events-none bg-[rgba(255,255,255,0.55)] backdrop-blur-[1px] flex flex-col items-center justify-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[rgba(255,107,53,0.1)] flex items-center justify-center">
                <MapPin size={17} color="#E8541C" strokeWidth={1.8} />
              </div>
              <p className="text-[0.7rem] text-[#6b5546] font-medium m-0">
                Cari lokasi untuk menampilkan di peta
              </p>
            </div>
          )}

          {/* Address badge */}
          {lat && address && (
            <div className="absolute bottom-2 left-2 right-2 z-[400] bg-[rgba(255,255,255,0.96)] backdrop-blur-[6px] border-[0.5px] border-[#f0e6dc] rounded-lg py-[7px] px-[10px] flex items-start gap-[7px] shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
              <MapPin size={12} color="#E8541C" strokeWidth={2} className="shrink-0 mt-0.5" />
              <p className="text-[0.68rem] text-[#3d2817] m-0 leading-[1.5] overflow-hidden text-ellipsis line-clamp-2">
                {address}
              </p>
            </div>
          )}
        </div>
      </div>
    </Field>
  );
}