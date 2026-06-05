"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { getReports } from "@/lib/reports";
import { getComments } from "@/lib/comments";

function getReadIds(userId: string): Set<string> {
    try {
        const raw = localStorage.getItem(`notif_read_${userId}`);
        return new Set(raw ? JSON.parse(raw) : []);
    } catch { return new Set(); }
}

const STATUS_NOTIF = ["approved", "on_progress", "completed", "rejected"];

export function useUnreadNotif() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [unread, setUnread] = useState(0);
    const userId = session?.user?.id ?? "";

    // Kalau lagi di halaman notifikasi, badge langsung hilang
    const isOnNotifPage = pathname === "/user/notifikasi";

    useEffect(() => {
        if (!userId) return;

        async function count() {
            try {
                const readIds = getReadIds(userId);
                const allReports = await getReports();
                const myReports = allReports.filter((r) => String(r.user_id) === userId);

                let total = 0;

                for (const report of myReports) {
                    if (STATUS_NOTIF.includes(report.status)) {
                        const id = `status_${report.id}_${report.status}`;
                        if (!readIds.has(id)) total++;
                    }

                    try {
                        const comments = await getComments(report.id);
                        const others = comments.filter((c) => String(c.user_id) !== userId);
                        if (others.length > 0) {
                            const latest = others[others.length - 1];
                            const id = `comment_${report.id}_${latest.id}`;
                            if (!readIds.has(id)) total++;
                        }
                    } catch {}
                }

                const sistemId = "sistem_welcome";
                if (!readIds.has(sistemId)) total++;

                setUnread(total);
            } catch {}
        }

        count();
    }, [userId]);

    // Sembunyiin badge saat di halaman notifikasi
    return isOnNotifPage ? 0 : unread;
}