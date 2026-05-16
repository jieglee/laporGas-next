"use client";

import UserSidebar, { SidebarProvider, useSidebar } from "@/layout/user/sidebar";

function UserLayoutInner({ children }: { children: React.ReactNode }) {
    const { expanded } = useSidebar();

    return (
        <div style={{ minHeight: "100vh", background: "#fff" }}>
            <UserSidebar />
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

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <UserLayoutInner>{children}</UserLayoutInner>
        </SidebarProvider>
    );
}