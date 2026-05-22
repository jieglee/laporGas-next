"use client";

import AdminSidebar, {
    AdminSidebarProvider,
    useAdminSidebar,
} from "@/layout/admin/sidebar";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const { expanded } = useAdminSidebar();

    return (
        <div className="min-h-screen bg-[#fafaf8]">
            <AdminSidebar />
            <main
                className="min-h-screen transition-[margin-left] duration-300 ease-out"
                style={{ marginLeft: expanded ? 244 : 72 }}
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