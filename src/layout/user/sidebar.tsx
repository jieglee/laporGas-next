"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
    Home,
    Compass,
    Bell,
    PlusSquare,
    User,
    Settings,
    LogOut,
    Menu,
} from "lucide-react";

// ── Context to sync sidebar width with main content ────────────────────────────

interface SidebarCtx {
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
}

const Ctx = createContext<SidebarCtx>({ collapsed: false, setCollapsed: () => { } });

export const useSidebar = () => useContext(Ctx);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    return <Ctx.Provider value={{ collapsed, setCollapsed }}>{children}</Ctx.Provider>;
}

// ── Menu ───────────────────────────────────────────────────────────────────────

const MENUS = [
    { name: "Beranda", icon: Home, path: "/user" },
    { name: "Explore", icon: Compass, path: "/user/explore" },
    { name: "Notifikasi", icon: Bell, path: "/user/notifikasi" },
    { name: "Buat Laporan", icon: PlusSquare, path: "/user/buat-laporan" },
    { name: "Profil", icon: User, path: "/user/profil" },
];

// ── Sidebar ────────────────────────────────────────────────────────────────────

export default function UserSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { collapsed, setCollapsed } = useSidebar();

    const nama = session?.user?.name ?? "Pengguna";
    const inisial = nama
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    const isActive = (path: string) =>
        path === "/user" ? pathname === path : pathname?.startsWith(path);

    return (
        <aside
            className="fixed top-0 left-0 h-screen flex flex-col bg-white border-r z-40 transition-all duration-300 ease-out"
            style={{
                width: collapsed ? 72 : 244,
                borderColor: "#f0e6dc",
            }}
        >
            {/* Logo */}
            <div className={`flex items-center ${collapsed ? "justify-center" : "px-6"} py-7 mb-2`}>
                <Link href="/user" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
                    <div
                        className="flex items-center justify-center rounded-lg flex-shrink-0"
                        style={{
                            width: 32,
                            height: 32,
                            background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                        }}
                    >
                        <span style={{ color: "white", fontWeight: 800, fontSize: "0.95rem", fontFamily: "'Syne', sans-serif" }}>
                            L
                        </span>
                    </div>
                    {!collapsed && (
                        <span
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: "1.15rem",
                                letterSpacing: "-0.02em",
                                color: "#1a0e08",
                            }}
                        >
                            Lapor<span style={{ color: "#E8541C" }}>Gas</span>
                        </span>
                    )}
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
                            title={collapsed ? menu.name : ""}
                            className={`group flex items-center gap-4 rounded-xl transition-all duration-200
                                ${collapsed ? "justify-center p-3" : "px-3 py-3"}
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
                            {!collapsed && (
                                <span
                                    style={{
                                        fontSize: "0.92rem",
                                        fontWeight: active ? 700 : 500,
                                        color: active ? "#E8541C" : "#3d2817",
                                        letterSpacing: "-0.01em",
                                    }}
                                >
                                    {menu.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom: Settings + Collapse */}
            <div className="px-3 pb-3 space-y-1 border-t pt-3" style={{ borderColor: "#f5ede3" }}>
                <Link
                    href="/user/pengaturan"
                    title={collapsed ? "Pengaturan" : ""}
                    className={`group flex items-center gap-4 rounded-xl transition-all duration-200
                        ${collapsed ? "justify-center p-3" : "px-3 py-3"}
                        ${isActive("/user/pengaturan") ? "bg-[#FFF5EE]" : "hover:bg-[#FAF5EF]"}`}
                    style={{ textDecoration: "none" }}
                >
                    <Settings
                        size={22}
                        strokeWidth={1.8}
                        style={{
                            color: isActive("/user/pengaturan") ? "#E8541C" : "#3d2817",
                            flexShrink: 0,
                        }}
                        className="transition-transform group-hover:rotate-45"
                    />
                    {!collapsed && (
                        <span
                            style={{
                                fontSize: "0.92rem",
                                fontWeight: isActive("/user/pengaturan") ? 700 : 500,
                                color: isActive("/user/pengaturan") ? "#E8541C" : "#3d2817",
                            }}
                        >
                            Pengaturan
                        </span>
                    )}
                </Link>

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    title={collapsed ? "Perluas" : "Ciutkan"}
                    className={`w-full group flex items-center gap-4 rounded-xl transition-all duration-200 hover:bg-[#FAF5EF]
                        ${collapsed ? "justify-center p-3" : "px-3 py-3"}`}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                    <Menu size={22} strokeWidth={1.8} style={{ color: "#3d2817", flexShrink: 0 }} />
                    {!collapsed && (
                        <span style={{ fontSize: "0.92rem", fontWeight: 500, color: "#3d2817" }}>
                            Ciutkan
                        </span>
                    )}
                </button>
            </div>

            {/* User card */}
            <div className="border-t p-3" style={{ borderColor: "#f5ede3" }}>
                {collapsed ? (
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        title={`${nama} · Keluar`}
                        className="w-full flex justify-center p-1.5 rounded-xl hover:bg-[#FAF5EF] transition-colors"
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                        <div
                            className="flex items-center justify-center"
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                                color: "white",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                            }}
                        >
                            {inisial}
                        </div>
                    </button>
                ) : (
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div
                            className="flex items-center justify-center flex-shrink-0"
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #FF6B35, #E8541C)",
                                color: "white",
                                fontSize: "0.78rem",
                                fontWeight: 700,
                            }}
                        >
                            {inisial}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p
                                style={{
                                    fontSize: "0.82rem",
                                    fontWeight: 600,
                                    color: "#1a0e08",
                                    margin: 0,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
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
                )}
            </div>
        </aside>
    );
}