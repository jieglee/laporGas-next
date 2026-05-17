"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
    LayoutDashboard, FileText, History, User, LogOut,
} from "lucide-react";

interface SidebarCtx {
    expanded: boolean;
    setExpanded: (v: boolean) => void;
}

const Ctx = createContext<SidebarCtx>({ expanded: false, setExpanded: () => {} });
export const useAdminSidebar = () => useContext(Ctx);

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(false);
    return <Ctx.Provider value={{ expanded, setExpanded }}>{children}</Ctx.Provider>;
}

const MENUS = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Laporan",   icon: FileText,        path: "/admin/laporan" },
    { name: "Riwayat",   icon: History,         path: "/admin/riwayat" },
    { name: "Profil",    icon: User,            path: "/admin/profil" },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { expanded, setExpanded } = useAdminSidebar();

    const nama = session?.user?.name ?? "Admin";
    const inisial = nama.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

    const isActive = (path: string) =>
        path === "/admin" ? pathname === path : pathname?.startsWith(path);

    // Teks selalu di-render, tapi fade + collapse width biar layout gak loncat
    const textStyle = (styles: React.CSSProperties = {}): React.CSSProperties => ({
        maxWidth: expanded ? 160 : 0,
        opacity: expanded ? 1 : 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
        transition: "max-width 300ms ease-out, opacity 200ms ease",
        transitionDelay: expanded ? "60ms" : "0ms",
        pointerEvents: expanded ? "auto" : "none",
        flexShrink: 0,
        ...styles,
    });

    return (
        <aside
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            className="fixed top-0 left-0 h-screen flex flex-col bg-white border-r z-40 overflow-hidden"
            style={{
                width: expanded ? 244 : 72,
                borderColor: "#f0e6dc",
                boxShadow: expanded ? "0 8px 32px rgba(255,107,53,0.06)" : "none",
                transition: "width 300ms ease-out, box-shadow 300ms ease-out",
            }}
        >
            {/* Logo */}
            <div className="flex items-center px-5 py-7 mb-2">
                <Link href="/admin" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
                    <div
                        className="flex items-center justify-center rounded-lg shrink-0"
                        style={{ width: 32, height: 32 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style={{ color: "#E8541C" }}>
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" fillRule="evenodd" d="M16.84 19.16a16.5 16.5 0 0 0-2.175.949c-.18.11-.36.24-.539.369a2 2 0 0 1-.12-.14a9.4 9.4 0 0 0-1.527-1.217a.34.34 0 1 0-.449.509c.37.469.669.998.998 1.497l.09.14l-.09.08a15 15 0 0 0-1.527 1.815a.38.38 0 0 0 0 .55a.38.38 0 0 0 .54 0c.319-.3.648-.57.997-.839c.35-.27.54-.4.809-.589l.09.11c.399.489.808.948 1.197 1.427a.385.385 0 0 0 .637.017a.39.39 0 0 0 .012-.426c-.26-.569-.52-1.148-.839-1.717l-.11-.16l.24-.169c.659-.519 1.287-1.068 1.996-1.567a.34.34 0 0 0 .15-.459a.34.34 0 0 0-.38-.18m6.697-5.548a.341.341 0 1 0-.31-.609q-1.125.417-2.175.998a7 7 0 0 0-.549.37a.8.8 0 0 0-.12-.14a9 9 0 0 0-1.527-1.238a.34.34 0 0 0-.479 0a.327.327 0 0 0 0 .48c.38.478.679.997.998 1.506l.1.14l-.1.08a14 14 0 0 0-1.457 1.786a.38.38 0 0 0 0 .549a.39.39 0 0 0 .55 0c.318-.3.638-.569.997-.838c.36-.27.539-.4.808-.6l.09.12c.4.49.819.999 1.198 1.428a.39.39 0 0 0 .529.12a.4.4 0 0 0 .13-.53c-.27-.568-.53-1.147-.849-1.716c0 0-.07-.1-.1-.16l.23-.17c.659-.528 1.297-1.077 2.036-1.576m-5.2-1.178a.67.67 0 0 0 .34-.26c.09-.109.22-.418.26-.468s.149-.32.209-.49q.173-.49.29-.997l.139-.22c.1-.366.1-.752 0-1.117c-.12-.64-.42-1.437-.48-1.737c-.179-.659-.308-1.337-.478-1.996c-.11-.449-.23-.888-.36-1.337A49 49 0 0 0 17.26.469a.35.35 0 0 0-.42-.25a.44.44 0 0 0-.2.15a.3.3 0 0 0-.069-.22a.36.36 0 0 0-.529-.06c-.599.43-1.207.849-1.826 1.248c-.858.569-1.766 1.088-2.645 1.627c-.588.359-1.167.748-1.756 1.107q-.973.604-1.876 1.308a.83.83 0 0 0-.31.698L7.09 7.225q-.128.28-.2.579a.69.69 0 0 0 .11.599c.235.232.513.415.819.538a9.4 9.4 0 0 0 1.796.37a.38.38 0 0 0 .51-.31a.39.39 0 0 0-.25-.479c-.3-.12-.689-.309-1.088-.509c-.669-.319-.529-.12-.4-1.377l.45.09c.38.1.758.21 1.138.34c.379.129.998.379 1.546.578a6 6 0 0 1-.469 1.557a14.5 14.5 0 0 1-1.277 2.245c-.509.819-1.098 1.627-1.707 2.445q-.876 1.203-1.876 2.306a14 14 0 0 1-2.994 2.564a.33.33 0 0 0-.29.34a.33.33 0 0 0 .35.33a19 19 0 0 0 2.824-.14A9.3 9.3 0 0 0 8 18.9a10.2 10.2 0 0 0 2.395-1.227a11.5 11.5 0 0 0 1.996-1.797a20.4 20.4 0 0 0 3.692-6.666l1.996.868l.33.12c-1.268 1.447-.13 1.207-1.388.808a.39.39 0 0 0-.529.16a.4.4 0 0 0 .16.519q.466.406.998.718a1 1 0 0 0 .688.03m-2.754-4.27a.38.38 0 0 0-.499.219a.39.39 0 0 0 .23.499A22.6 22.6 0 0 1 12.2 14.06a14.7 14.7 0 0 1-2.615 2.545c-.64.489-1.332.904-2.065 1.237q-.795.36-1.647.55c-.32.079-.639.089-.998.139a15.4 15.4 0 0 0 2.814-2.235a18 18 0 0 0 1.996-2.455q.579-.867 1.068-1.787c.451-.8.832-1.638 1.138-2.505a7 7 0 0 0 .389-1.846a.37.37 0 0 0-.19-.34a.29.29 0 0 0-.1-.239a32 32 0 0 0-1.636-.838a9 9 0 0 0-.998-.43c.509-.299 1.097-.598 1.207-.668c.998-.688 2.086-1.377 3.084-2.116A42 42 0 0 0 16.571.708a.4.4 0 0 0 .1-.18a.3.3 0 0 0 0 .13c.33 1.587.509 3.184.778 4.78c.12.69.28 1.368.44 2.046l.448 1.517zM2.56 5.369c1.996.589 2.994-.46 2.994-1.926a1.996 1.996 0 0 0-1.667-2.096a3.05 3.05 0 0 0-2.395 1.377a1.7 1.7 0 0 0 .09 1.996c.255.307.595.533.978.649m.16-2.166c.303-.33.72-.533 1.167-.569c.42 0 .619.44.659.859c.16 1.387-.899 1.357-1.537 1.127a1.16 1.16 0 0 1-.61-.459c-.189-.359.05-.688.32-.958m1.926 7.734A1.996 1.996 0 0 0 3.01 8.842a3 3 0 0 0-2.455 1.367a1.7 1.7 0 0 0 .1 1.996c.264.298.612.51.997.609c1.986.638 2.974-.41 2.994-1.877m-3.153.719c-.22-.36 0-.689.29-.998c.303-.33.72-.537 1.167-.579c.419 0 .619.44.658.868c.21 1.837-1.736 1.358-2.115.709" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span style={textStyle({
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: "1.15rem",
                        letterSpacing: "-0.02em",
                        color: "#1a0e08",
                        maxWidth: expanded ? 200 : 0,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                    })}>
                        Lapor<span style={{ color: "#E8541C" }}>Gas</span>
                        <span style={{
                            fontSize: "0.55rem",
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: 99,
                            background: "#FFF5EE",
                            color: "#E8541C",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                        }}>
                            Admin
                        </span>
                    </span>
                </Link>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-3 space-y-1">
                {MENUS.map((menu) => {
                    const active = isActive(menu.path);
                    const Icon = menu.icon;
                    return (
                        <Link
                            key={menu.path}
                            href={menu.path}
                            className={`group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-200
                                ${active ? "bg-[#FFF5EE]" : "hover:bg-[#FAF5EF]"}`}
                            style={{ textDecoration: "none" }}
                        >
                            <Icon
                                size={22}
                                strokeWidth={active ? 2.2 : 1.8}
                                style={{
                                    color: active ? "#E8541C" : "#3d2817",
                                    transition: "transform 0.2s",
                                    flexShrink: 0,
                                }}
                                className="group-hover:scale-110"
                            />
                            <span style={textStyle({
                                fontSize: "0.92rem",
                                fontWeight: active ? 700 : 500,
                                color: active ? "#E8541C" : "#3d2817",
                                letterSpacing: "-0.01em",
                            })}>
                                {menu.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* User card */}
            <div className="border-t p-3" style={{ borderColor: "#f5ede3", paddingBottom: 70 }}>
                <div
                    className="flex items-center gap-3 rounded-xl hover:bg-[#FAF5EF] transition-colors"
                    style={{ padding: "6px 8px", cursor: "default" }}
                >
                    <div
                        className="flex items-center justify-center shrink-0"
                        style={{
                            width: expanded ? 36 : 32,
                            height: expanded ? 36 : 32,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                            color: "white",
                            fontSize: expanded ? "0.78rem" : "0.72rem",
                            fontWeight: 700,
                            transition: "width 300ms ease-out, height 300ms ease-out, font-size 300ms ease-out",
                        }}
                    >
                        {inisial}
                    </div>

                    <div style={textStyle({ maxWidth: expanded ? 140 : 0, display: "flex", flexDirection: "column", gap: 2 })}>
                        <p style={{
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            color: "#1a0e08",
                            margin: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}>
                            {nama}
                        </p>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            style={{
                                fontSize: "0.7rem",
                                color: "#a8856b",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#E8541C")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#a8856b")}
                        >
                            <LogOut size={11} />
                            Keluar
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}