"use client";

import SuperadminSidebar, {
    SuperadminSidebarProvider,
    useSuperadminSidebar,
} from "@/layout/superadmin/sidebar";

function SuperadminLayoutInner({ children }: { children: React.ReactNode }) {
    const { expanded } = useSuperadminSidebar();

    return (
        <div style={{ minHeight: "100vh", background: "#fff" }}>
            <SuperadminSidebar />
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

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SuperadminSidebarProvider>
            <SuperadminLayoutInner>{children}</SuperadminLayoutInner>
        </SuperadminSidebarProvider>
    );
}
