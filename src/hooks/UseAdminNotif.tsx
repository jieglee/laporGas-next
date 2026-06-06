"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getAdminNotifs } from "@/lib/admin-notif"

export function useAdminNotif() {
    const [unread, setUnread] = useState(0)
    const pathname = usePathname()

    useEffect(() => {
        async function count() {
            try {
                const notifs = await getAdminNotifs()
                const unreadCount = notifs.filter((n) => !n.dibaca).length
                // Kalau lagi di halaman notifikasi, return 0
                if (pathname === "/admin/notifikasi") {
                    setUnread(0)
                } else {
                    setUnread(unreadCount)
                }
            } catch {}
        }
        count()
    }, [pathname]) 

    return unread
}