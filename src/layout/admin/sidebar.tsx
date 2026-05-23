"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LayoutDashboard, FileText, Users, LogOut } from "lucide-react";
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
    <Ctx.Provider value={{ expanded, setExpanded }}>{children}</Ctx.Provider>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { expanded, setExpanded } = useAdminSidebar();
  const role = session?.user?.role;

  const MENUS = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Laporan", icon: FileText, path: "/admin/laporan" },
    ...(role === "superadmin"
      ? [{ name: "Manajemen User", icon: Users, path: "/admin/users" }]
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
    path === "/admin" ? pathname === path : pathname?.startsWith(path);

  // class helper untuk text yg collapsible (Tailwind only)
  const textCls = [
    "overflow-hidden whitespace-nowrap shrink-0",
    "transition-[max-width,opacity] duration-300 ease-out",
    expanded
      ? "max-w-[160px] opacity-100 pointer-events-auto delay-[60ms]"
      : "max-w-0 opacity-0 pointer-events-none",
  ].join(" ");

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={[
        "fixed top-0 left-0 h-screen flex flex-col bg-white z-40 overflow-hidden",
        "border-r border-[#f0e6dc]",
        "transition-[width,box-shadow] duration-300 ease-out",
        expanded
  ? "w-[244px] shadow-[0_8px_32px_rgba(255,107,53,0.06)]"
  : "w-[72px] shadow-none"
      ].join(" ")}
    >
      {/* Logo */}
<div className="flex items-center px-5 py-7 mb-2">
  <Link
    href="/admin"
    className="flex items-center gap-2 no-underline overflow-hidden"
  >
    <div className="flex items-center justify-center shrink-0 w-8 h-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        className="text-[#E8541C]"
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

    <div
      className={[
        "flex items-center gap-2 transition-all duration-300 overflow-hidden",
        expanded
          ? "max-w-[220px] opacity-100 ml-1"
          : "max-w-0 opacity-0",
      ].join(" ")}
    >
      <span className="font-extrabold text-[1.15rem] tracking-[-0.02em] text-[#1a0e08] whitespace-nowrap">
        Lapor<span className="text-[#E8541C]">Gas</span>
      </span>

      <span className="text-[0.55rem] font-bold uppercase tracking-[0.08em] px-[7px] py-[2px] rounded-full bg-[#FFF5EE] text-[#E8541C] whitespace-nowrap">
        {role === "superadmin" ? "Super Admin" : "Admin"}
      </span>
    </div>
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
              href={menu.path as never}
              className={[
                "group flex items-center gap-4 rounded-xl px-3 py-3 no-underline",
                "transition-colors duration-200",
                active ? "bg-[#FFF5EE]" : "hover:bg-[#FAF5EF]",
              ].join(" ")}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.2 : 1.8}
                className={[
                  "shrink-0 transition-transform duration-200 group-hover:scale-110",
                  active ? "text-[#E8541C]" : "text-[#3d2817]",
                ].join(" ")}
              />

              <span
                className={[
                  textCls,
                  "text-[0.92rem] tracking-[-0.01em]",
                  active
                    ? "font-bold text-[#E8541C]"
                    : "font-medium text-[#3d2817]",
                ].join(" ")}
              >
                {menu.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-[#f5ede3] p-3 pb-[70px]">
        <div className="flex items-center gap-3 rounded-xl py-1.5 px-2 transition-colors hover:bg-[#FAF5EF] cursor-default">
          <div
            className={[
              "flex items-center justify-center shrink-0 rounded-full text-white font-bold",
              "bg-linear-to-br from-[#FF6B35] to-[#E8541C]",
              "transition-[width,height,font-size] duration-300 ease-out",
              expanded
                ? "w-9 h-9 text-[0.78rem]"
                : "w-8 h-8 text-[0.72rem]",
            ].join(" ")}
          >
            {inisial}
          </div>

          <div
            className={[
              textCls,
              "flex flex-col gap-0.5",
              expanded ? "max-w-[140px]" : "max-w-0",
            ].join(" ")}
          >
            <p className="text-[0.82rem] font-semibold text-[#1a0e08] m-0 overflow-hidden text-ellipsis whitespace-nowrap">
              {nama}
            </p>

            <button
              onClick={async () => {
                await logout();
                window.location.href = "/";
              }}
              className="text-[0.7rem] text-[#a8856b] bg-transparent border-0 cursor-pointer p-0 flex items-center gap-1"
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