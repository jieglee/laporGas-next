"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Search, MapPin, Loader2, X } from "lucide-react";
import Field from "./Field";

interface Props {
  lat: string;
  lng: string;
  address: string;
  onChange: (lat: string, lng: string, address: string) => void;
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

const DEFAULT_LAT = -6.2088;
const DEFAULT_LNG = 106.8456;

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

  // ── Init map ──────────────────────────────────────────────────────────────

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

      const initLat = lat ? parseFloat(lat) : DEFAULT_LAT;
      const initLng = lng ? parseFloat(lng) : DEFAULT_LNG;

      const map = L.map(mapRef.current, {
        center: [initLat, initLng],
        zoom: lat ? 15 : 11,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
      });

      // CartoDB Voyager — clean, no API key
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 20 }
      ).addTo(map);

      if (lat && lng) {
        markerRef.current = L.circleMarker([initLat, initLng], {
          radius: 10,
          color: "white",
          weight: 3,
          fillColor: "#E8541C",
          fillOpacity: 1,
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

  // ── Fly to location ───────────────────────────────────────────────────────

  const flyTo = useCallback(async (la: number, lo: number) => {
    if (!mapInstanceRef.current) return;
    const L = (await import("leaflet")).default;

    const map = mapInstanceRef.current as {
      setView: (c: [number, number], z: number) => void;
      addLayer: (l: unknown) => void;
    };

    map.setView([la, lo], 15);

    if (markerRef.current) {
      (markerRef.current as { setLatLng: (c: [number, number]) => void }).setLatLng([la, lo]);
    } else {
      const marker = L.circleMarker([la, lo], {
        radius: 10,
        color: "white",
        weight: 3,
        fillColor: "#E8541C",
        fillOpacity: 1,
      });
      map.addLayer(marker);
      markerRef.current = marker;
    }
  }, []);

  // ── Search ────────────────────────────────────────────────────────────────

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
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
      setResults([]);
      setShowDropdown(false);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleInput = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      onChange("", "", "");
      setResults([]);
      setShowDropdown(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 500);
  };

  const pickResult = (r: NominatimResult) => {
    const short = r.display_name.split(",").slice(0, 3).join(", ");
    setQuery(short);
    setResults([]);
    setShowDropdown(false);
    onChange(r.lat, r.lon, r.display_name);
    flyTo(parseFloat(r.lat), parseFloat(r.lon));
  };

  const clearAll = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    onChange("", "", "");
    if (mapInstanceRef.current) {
      (mapInstanceRef.current as { setView: (c: [number, number], z: number) => void })
        .setView([DEFAULT_LAT, DEFAULT_LNG], 11);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Field
      label="Lokasi kejadian"
      required
      hint="Ketik nama jalan, gedung, atau kawasan untuk mencari lokasi."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

        {/* Search input */}
        <div ref={dropdownRef} style={{ position: "relative", zIndex: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "white",
              border: `0.5px solid ${showDropdown ? "rgba(255,107,53,0.5)" : "#f0e6dc"}`,
              borderRadius: showDropdown ? "10px 10px 0 0" : 10,
              padding: "0 14px",
              height: 44,
              transition: "all 0.15s",
            }}
          >
            {searching ? (
              <Loader2 size={15} style={{ color: "#E8541C", flexShrink: 0, animation: "spin 0.8s linear infinite" }} />
            ) : (
              <Search size={15} style={{ color: "#a8856b", flexShrink: 0 }} />
            )}
            <input
              type="text"
              placeholder="Cari lokasi... (contoh: Jl. Sudirman, Jakarta)"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onFocus={() => { if (results.length > 0) setShowDropdown(true); }}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "0.85rem",
                color: "#1a0e08",
                background: "transparent",
                fontFamily: "inherit",
              }}
            />
            {query && (
              <button
                type="button"
                onClick={clearAll}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 2,
                  display: "flex",
                  color: "#a8856b",
                  flexShrink: 0,
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && results.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "white",
                border: "0.5px solid rgba(255,107,53,0.35)",
                borderTop: "0.5px solid #f5ede3",
                borderRadius: "0 0 10px 10px",
                zIndex: 500,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              {results.map((r, i) => {
                const parts = r.display_name.split(",");
                const main = parts.slice(0, 2).join(",").trim();
                const sub = parts.slice(2, 5).join(",").trim();

                return (
                  <button
                    key={r.place_id}
                    type="button"
                    onClick={() => pickResult(r)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      padding: "11px 14px",
                      background: "white",
                      border: "none",
                      borderTop: i > 0 ? "0.5px solid #f5ede3" : "none",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.1s",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FFF5EE")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  >
                    <MapPin size={14} strokeWidth={2} style={{ color: "#E8541C", flexShrink: 0, marginTop: 3 }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a0e08", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {main}
                      </p>
                      {sub && (
                        <p style={{ fontSize: "0.7rem", color: "#a8856b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {sub}
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
        <div
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            border: "0.5px solid #f0e6dc",
            height: 200,
          }}
        >
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

          {/* Overlay sebelum lokasi dipilih */}
          {!lat && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(1px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                zIndex: 400,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(255,107,53,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin size={18} color="#E8541C" strokeWidth={1.8} />
              </div>
              <p style={{ fontSize: "0.72rem", color: "#6b5546", fontWeight: 500, margin: 0 }}>
                Cari lokasi untuk menampilkan titik di peta
              </p>
            </div>
          )}

          {/* Address badge */}
          {lat && address && (
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 8,
                right: 8,
                zIndex: 400,
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(6px)",
                border: "0.5px solid #f0e6dc",
                borderRadius: 8,
                padding: "7px 10px",
                display: "flex",
                alignItems: "flex-start",
                gap: 7,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <MapPin size={12} color="#E8541C" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "#3d2817",
                  margin: 0,
                  lineHeight: 1.5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {address}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </Field>
  );
}