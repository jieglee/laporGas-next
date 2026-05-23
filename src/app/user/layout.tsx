"use client";

import UserSidebar, { SidebarProvider, useSidebar } from "@/layout/user/sidebar";
import { cn } from "@/lib/utils";

function UserLayoutInner({ children }: { children: React.ReactNode }) {
  const { expanded } = useSidebar();

  return (
    <div className="min-h-screen bg-white">
      <UserSidebar />
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

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <UserLayoutInner>{children}</UserLayoutInner>
    </SidebarProvider>
  );
}
