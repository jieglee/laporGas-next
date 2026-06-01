"use client";

import AdminSidebar, {
  AdminSidebarProvider,
  useAdminSidebar,
} from "@/layout/admin/sidebar";
import { cn } from "@/lib/utils";

function AdminLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { expanded } = useAdminSidebar();

  return (
    <div className="min-h-screen bg-[#fafaf8] overflow-x-hidden">
      <AdminSidebar />

      <main
        className={cn(
          "min-h-screen w-full overflow-x-hidden transition-[margin-left] duration-300 ease-out",
          expanded ? "ml-[244px]" : "ml-[72px]"
        )}
      >
        <div className="w-full max-w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSidebarProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminSidebarProvider>
  );
}
