"use client";

import AdminSidebar, { AdminSidebarProvider, useAdminSidebar } from "@/layout/admin/sidebar";
import { cn } from "@/lib/utils";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { expanded } = useAdminSidebar();

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <AdminSidebar />
      <main
        className={cn(
          "min-h-screen transition-[margin-left] duration-300 ease-out",
          expanded ? "ml-[244px]" : "ml-[72px]"
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSidebarProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminSidebarProvider>
  );
}
