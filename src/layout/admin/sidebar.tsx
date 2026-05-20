"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
} from "lucide-react";
import { logout } from "@/lib/auth-api";

interface SidebarCtx {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
}

const Ctx = createContext<SidebarCtx>({
  expanded: false,
  setExpanded: () => {},
});

export const useAdminSidebar = () => useContext(Ctx);

export function AdminSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Ctx.Provider value={{ expanded, setExpanded }}>
      {children}
    </Ctx.Provider>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const { expanded, setExpanded } = useAdminSidebar();

  const role = session?.user?.role;

  const MENUS = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },

    {
      name: "Laporan",
      icon: FileText,
      path: "/admin/laporan",
    },

    ...(role === "superadmin"
      ? [
          {
            name: "Manajemen User",
            icon: Users,
            path: "/admin/users",
          },
        ]
      : []),
  ];

  const nama = session?.user?.name ?? "Admin";

  const inisial = nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const isActive = (path: string) =>
    path === "/admin"
      ? pathname === path
      : pathname?.startsWith(path);

  const textStyle = (
    styles: React.CSSProperties = {}
  ): React.CSSProperties => ({
    maxWidth: expanded ? 160 : 0,
    opacity: expanded ? 1 : 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    transition:
      "max-width 300ms ease-out, opacity 200ms ease",
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
        boxShadow: expanded
          ? "0 8px 32px rgba(255,107,53,0.06)"
          : "none",
        transition:
          "width 300ms ease-out, box-shadow 300ms ease-out",
      }}
    >
      {/* Logo */}
      <div className="flex items-center px-5 py-7 mb-2">
        <Link
          href="/admin"
          className="flex items-center gap-2"
          style={{ textDecoration: "none" }}
        >
          <div
            className="flex items-center justify-center rounded-lg shrink-0"
            style={{ width: 32, height: 32 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              style={{ color: "#E8541C" }}
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.84 19.16..."
                clipRule="evenodd"
              />
            </svg>
          </div>

          <span
            style={textStyle({
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.15rem",
              letterSpacing: "-0.02em",
              color: "#1a0e08",
              maxWidth: expanded ? 200 : 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            })}
          >
            Lapor
            <span style={{ color: "#E8541C" }}>
              Gas
            </span>

            <span
              style={{
                fontSize: "0.55rem",
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 99,
                background: "#FFF5EE",
                color: "#E8541C",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {role === "superadmin"
                ? "Super Admin"
                : "Admin"}
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
              href={menu.path as any}
              className={`group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-200
                ${
                  active
                    ? "bg-[#FFF5EE]"
                    : "hover:bg-[#FAF5EF]"
                }`}
              style={{ textDecoration: "none" }}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.2 : 1.8}
                style={{
                  color: active
                    ? "#E8541C"
                    : "#3d2817",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
                className="group-hover:scale-110"
              />

              <span
                style={textStyle({
                  fontSize: "0.92rem",
                  fontWeight: active ? 700 : 500,
                  color: active
                    ? "#E8541C"
                    : "#3d2817",
                  letterSpacing: "-0.01em",
                })}
              >
                {menu.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div
        className="border-t p-3"
        style={{
          borderColor: "#f5ede3",
          paddingBottom: 70,
        }}
      >
        <div
          className="flex items-center gap-3 rounded-xl hover:bg-[#FAF5EF] transition-colors"
          style={{
            padding: "6px 8px",
            cursor: "default",
          }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: expanded ? 36 : 32,
              height: expanded ? 36 : 32,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #FF6B35, #E8541C)",
              color: "white",
              fontSize: expanded
                ? "0.78rem"
                : "0.72rem",
              fontWeight: 700,
            }}
          >
            {inisial}
          </div>

          <div
            style={textStyle({
              maxWidth: expanded ? 140 : 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            })}
          >
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
              onClick={async () => {
                await logout();
                window.location.href = "/";
              }}
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
              }}
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