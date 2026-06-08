"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { label: "Cara Kerja", href: "how-it-works" },
  { label: "Peta", href: "peta" },
  { label: "Kontak", href: "kontak" },

];

const LaporGasIcon = ({ scrolled = false, size = 28 }: { scrolled?: boolean; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={cn("shrink-0", scrolled ? "text-white/95" : "text-[#E8201A]")}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.84 19.16a16.5 16.5 0 0 0-2.175.949c-.18.11-.36.24-.539.369a2 2 0 0 1-.12-.14a9.4 9.4 0 0 0-1.527-1.217a.34.34 0 1 0-.449.509c.37.469.669.998.998 1.497l.09.14l-.09.08a15 15 0 0 0-1.527 1.815a.38.38 0 0 0 0 .55a.38.38 0 0 0 .54 0c.319-.3.648-.57.997-.839c.35-.27.54-.4.809-.589l.09.11c.399.489.808.948 1.197 1.427a.385.385 0 0 0 .637.017a.39.39 0 0 0 .012-.426c-.26-.569-.52-1.148-.839-1.717l-.11-.16l.24-.169c.659-.519 1.287-1.068 1.996-1.567a.34.34 0 0 0 .15-.459a.34.34 0 0 0-.38-.18m6.697-5.548a.341.341 0 1 0-.31-.609q-1.125.417-2.175.998a7 7 0 0 0-.549.37a.8.8 0 0 0-.12-.14a9 9 0 0 0-1.527-1.238a.34.34 0 0 0-.479 0a.327.327 0 0 0 0 .48c.38.478.679.997.998 1.506l.1.14l-.1.08a14 14 0 0 0-1.457 1.786a.38.38 0 0 0 0 .549a.39.39 0 0 0 .55 0c.318-.3.638-.569.997-.838c.36-.27.539-.4.808-.6l.09.12c.4.49.819.999 1.198 1.428a.39.39 0 0 0 .529.12a.4.4 0 0 0 .13-.53c-.27-.568-.53-1.147-.849-1.716c0 0-.07-.1-.1-.16l.23-.17c.659-.528 1.297-1.077 2.036-1.576m-5.2-1.178a.67.67 0 0 0 .34-.26c.09-.109.22-.418.26-.468s.149-.32.209-.49q.173-.49.29-.997l.139-.22c.1-.366.1-.752 0-1.117c-.12-.64-.42-1.437-.48-1.737c-.179-.659-.308-1.337-.478-1.996c-.11-.449-.23-.888-.36-1.337A49 49 0 0 0 17.26.469a.35.35 0 0 0-.42-.25a.44.44 0 0 0-.2.15a.3.3 0 0 0-.069-.22a.36.36 0 0 0-.529-.06c-.599.43-1.207.849-1.826 1.248c-.858.569-1.766 1.088-2.645 1.627c-.588.359-1.167.748-1.756 1.107q-.973.604-1.876 1.308a.83.83 0 0 0-.31.698L7.09 7.225q-.128.28-.2.579a.69.69 0 0 0 .11.599c.235.232.513.415.819.538a9.4 9.4 0 0 0 1.796.37a.38.38 0 0 0 .51-.31a.39.39 0 0 0-.25-.479c-.3-.12-.689-.309-1.088-.509c-.669-.319-.529-.12-.4-1.377l.45.09c.38.1.758.21 1.138.34c.379.129.998.379 1.546.578a6 6 0 0 1-.469 1.557a14.5 14.5 0 0 1-1.277 2.245c-.509.819-1.098 1.627-1.707 2.445q-.876 1.203-1.876 2.306a14 14 0 0 1-2.994 2.564a.33.33 0 0 0-.29.34a.33.33 0 0 0 .35.33a19 19 0 0 0 2.824-.14A9.3 9.3 0 0 0 8 18.9a10.2 10.2 0 0 0 2.395-1.227a11.5 11.5 0 0 0 1.996-1.797a20.4 20.4 0 0 0 3.692-6.666l1.996.868l.33.12c-1.268 1.447-.13 1.207-1.388.808a.39.39 0 0 0-.529.16a.4.4 0 0 0 .16.519q.466.406.998.718a1 1 0 0 0 .688.03m-2.754-4.27a.38.38 0 0 0-.499.219a.39.39 0 0 0 .23.499A22.6 22.6 0 0 1 12.2 14.06a14.7 14.7 0 0 1-2.615 2.545c-.64.489-1.332.904-2.065 1.237q-.795.36-1.647.55c-.32.079-.639.089-.998.139a15.4 15.4 0 0 0 2.814-2.235a18 18 0 0 0 1.996-2.455q.579-.867 1.068-1.787c.451-.8.832-1.638 1.138-2.505a7 7 0 0 0 .389-1.846a.37.37 0 0 0-.19-.34a.29.29 0 0 0-.1-.239a32 32 0 0 0-1.636-.838a9 9 0 0 0-.998-.43c.509-.299 1.097-.598 1.207-.668c.998-.688 2.086-1.377 3.084-2.116A42 42 0 0 0 16.571.708a.4.4 0 0 0 .1-.18a.3.3 0 0 0 0 .13c.33 1.587.509 3.184.778 4.78c.12.69.28 1.368.44 2.046l.448 1.517zM2.56 5.369c1.996.589 2.994-.46 2.994-1.926a1.996 1.996 0 0 0-1.667-2.096a3.05 3.05 0 0 0-2.395 1.377a1.7 1.7 0 0 0 .09 1.996c.255.307.595.533.978.649m.16-2.166c.303-.33.72-.533 1.167-.569c.42 0 .619.44.659.859c.16 1.387-.899 1.357-1.537 1.127a1.16 1.16 0 0 1-.61-.459c-.189-.359.05-.688.32-.958m1.926 7.734A1.996 1.996 0 0 0 3.01 8.842a3 3 0 0 0-2.455 1.367a1.7 1.7 0 0 0 .1 1.996c.264.298.612.51.997.609c1.986.638 2.974-.41 2.994-1.877m-3.153.719c-.22-.36 0-.689.29-.998c.303-.33.72-.537 1.167-.579c.419 0 .619.44.658.868c.21 1.837-1.736 1.358-2.115.709"
      clipRule="evenodd"
    />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center px-6 transition-[padding-top] duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          scrolled ? "pt-2.5" : "pt-[18px]"
        )}
      >
        <nav
          className={cn(
            "flex items-center h-[52px] transition-all duration-400 backdrop-blur-[20px] saturate-180",
            scrolled
              ? "w-[min(88%,780px)] max-w-[780px] rounded-full pl-5 pr-2 bg-[rgba(232,84,28,0.94)] border border-white/20 shadow-[0_8px_32px_rgba(232,84,28,0.28),inset_0_1px_0_rgba(255,255,255,0.15)]"
              : "w-full max-w-[1200px] rounded-[14px] pl-4 pr-2 bg-white/97 border border-black/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          )}
        >
          <Link href="/" className="flex items-center gap-2 no-underline shrink-0 mr-1">
            <LaporGasIcon scrolled={scrolled} size={26} />
            <span
              className={cn(
                "font-sans font-extrabold text-[0.95rem] tracking-[-0.02em] whitespace-nowrap",
                scrolled ? "text-white" : "text-[#111]"
              )}
            >
              Lapor<span className={scrolled ? "text-white/50" : "text-[#E8201A]"}>Gas</span>
            </span>
          </Link>

          <div className={cn("w-px h-[18px] shrink-0 mx-4", scrolled ? "bg-white/25" : "bg-black/[0.08]")} />

          <div className="flex items-center gap-6 flex-1">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className={cn(
                  "bg-transparent border-0 cursor-pointer text-[0.8rem] font-medium whitespace-nowrap transition-colors duration-200 p-0",
                  scrolled
                    ? "text-white/82 hover:text-white"
                    : "text-black/45 hover:text-[#111]"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className={cn("w-px h-[18px] shrink-0 mr-3 ml-4", scrolled ? "bg-white/25" : "bg-black/[0.08]")} />

          <div className="flex items-center gap-[6px] shrink-0">
            <Link
              href="/auth/login"
              className={cn(
                "flex items-center gap-[6px] px-[14px] py-[7px] rounded-[9px] text-[0.75rem] font-semibold whitespace-nowrap no-underline transition-all duration-200",
                scrolled
                  ? "text-white/90 border border-white/30 hover:text-white hover:bg-white/10 hover:border-white/50"
                  : "text-black/60 border border-black/10 hover:text-[#111] hover:bg-black/[0.03] hover:border-black/20"
              )}
            >
              <IconLogin size={12} />
              Masuk
            </Link>

            <Link
              href="/auth/register"
              className={cn(
                "flex items-center gap-[6px] px-4 py-2 rounded-[9px] text-[0.75rem] font-bold whitespace-nowrap no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-px",
                scrolled
                  ? "bg-white text-[#E8541C] shadow-[0_2px_10px_rgba(255,255,255,0.18)] hover:shadow-[0_5px_18px_rgba(255,255,255,0.28)]"
                  : "bg-gradient-to-br from-[#E8201A] to-[#FF6B35] text-white shadow-[0_3px_12px_rgba(232,32,26,0.25)] hover:shadow-[0_6px_20px_rgba(232,32,26,0.38)]"
              )}
            >
              <IconRegister size={12} />
              Daftar
            </Link>
          </div>
        </nav>
      </div>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[rgba(232,84,28,0.97)] backdrop-blur-[16px] border-b border-white/10 shadow-[0_2px_16px_rgba(232,84,28,0.3)]">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <LaporGasIcon scrolled size={24} />
            <span className="font-sans font-extrabold text-[0.95rem] tracking-[-0.02em] text-white">
              Lapor<span className="text-white/50">Gas</span>
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] p-[6px] bg-transparent border-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "block w-5 h-0.5 rounded-sm bg-white/85 transition-all duration-300 origin-center",
                  i === 0 && menuOpen && "translate-y-[7px] rotate-45",
                  i === 2 && menuOpen && "-translate-y-[7px] -rotate-45",
                  i === 1 && menuOpen && "opacity-0"
                )}
              />
            ))}
          </button>
        </div>

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0">
            <div className="border-t border-white/10 px-4 pt-3 pb-4 flex flex-col gap-3">
              {links.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="text-left text-[0.9rem] font-medium text-white/75 bg-transparent border-0 cursor-pointer p-0"
                >
                  {l.label}
                </button>
              ))}
              <div className="flex gap-2 mt-1">
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-[6px] py-[10px] rounded-xl text-[0.85rem] font-semibold text-white/85 border border-white/20 no-underline"
                >
                  <IconLogin size={14} />
                  Masuk
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-[6px] py-[10px] rounded-xl text-[0.85rem] font-bold bg-white text-[#E8541C] no-underline"
                >
                  <IconRegister size={14} color="#E8541C" />
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden h-14" />
    </>
  );
}

function IconLogin({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

function IconRegister({ size = 13, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}
