import { getReports, type Report } from "./reports"

export interface AdminNotif {
    id: string
    report_id: number
    report_title: string
    user_name: string
    edit_count: number
    updated_at: string
    dibaca: boolean
}

const STORAGE_KEY = "admin_notif_read"

function getReadIds(): Set<string> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return new Set(raw ? JSON.parse(raw) : [])
    } catch { return new Set() }
}

function saveReadIds(ids: Set<string>) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids])) } catch {}
}

export async function getAdminNotifs(): Promise<AdminNotif[]> {
    const reports = await getReports()
    const readIds = getReadIds()

    const edited = reports
        .filter((r) => r.edit_count > 0)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

    return edited.map((r) => {
        const id = `edit_${r.id}_${r.edit_count}`
        return {
            id,
            report_id: r.id,
            report_title: r.title,
            user_name: r.user_name,
            edit_count: r.edit_count,
            updated_at: r.updated_at,
            dibaca: readIds.has(id),
        }
    })
}

export function markRead(id: string) {
    const ids = getReadIds()
    ids.add(id)
    saveReadIds(ids)
}

export function markAllRead(ids: string[]) {
    const readIds = getReadIds()
    ids.forEach((id) => readIds.add(id))
    saveReadIds(readIds)
}