"use client";

import AdminSidebar, { AdminSidebarProvider, useAdminSidebar } from "@/layout/admin/sidebar";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const { expanded } = useAdminSidebar();

    return (
        <div style={{ minHeight: "100vh", background: "#fafaf8" }}>
            <AdminSidebar />
            <main
                style={{
                    marginLeft: expanded ? 244 : 72,
                    minHeight: "100vh",
                    transition: "margin-left 300ms ease-out",
                }}
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