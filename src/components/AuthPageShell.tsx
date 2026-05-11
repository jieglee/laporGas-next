"use client";

import Link from "next/link";
import { ReactNode } from "react";

type AuthPageShellProps = {
  heading: string;
  lead: string;
  actionCaption: string;
  actionLabel: string;
  actionHref: string;
  formSide?: "left" | "right";
  children: ReactNode;
};

export default function AuthPageShell({
  heading,
  lead,
  actionCaption,
  actionLabel,
  actionHref,
  formSide = "left",
  children,
}: AuthPageShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 shadow-xl shadow-slate-200/70">
        <div className={`grid min-h-[520px] md:grid-cols-[1.35fr_1fr] ${formSide === "right" ? "md:grid-cols-[1fr_1.35fr]" : ""}`}>
          <section className="flex flex-col justify-center gap-6 bg-slate-50 px-8 py-10 md:px-12">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">LaporGas</p>
              <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">{heading}</h1>
              <p className="mt-4 text-sm leading-6 text-slate-600">{lead}</p>
            </div>
            <div className="text-sm text-slate-600">
              <span className="font-medium">{actionCaption}</span>{" "}
              <Link href={actionHref} className="font-semibold text-red-600 hover:text-red-700">
                {actionLabel}
              </Link>
            </div>
          </section>

          <section className="flex items-center justify-center px-8 py-10 md:px-10">
            <div className="w-full max-w-md">{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
