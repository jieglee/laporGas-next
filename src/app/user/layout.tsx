"use client";

import UserSidebar, { SidebarProvider, useSidebar } from "@/layout/user/sidebar";

function UserLayoutInner({ children }: { children: React.ReactNode }) {
    const { expanded } = useSidebar();

    return (
        <div className="min-h-screen bg-white">
            <UserSidebar />
            <main
                className="min-h-screen transition-[margin-left] duration-300 ease-out"
                style={{ marginLeft: expanded ? 244 : 72 }}
            >
                {children}
            </main>
        </div>
    );
}

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <UserLayoutInner>{children}</UserLayoutInner>
        </SidebarProvider>
    );
}