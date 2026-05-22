import api from "./api"

// ── TYPES ─────────────────────────────────────────────

export type Priority = "low" | "medium" | "high" | "urgent"

export type ReportStatus =
    | "pending"
    | "approved"
    | "rejected"
    | "on_progress"
    | "completed"

export type SortOption = "newest" | "oldest" | "category" | "priority" | "status"

export interface Report {
    id: number
    user_id: number
    user_name: string
    category_id: number
    category_name: string
    title: string
    description: string
    image_url: string | null
    images: string[]    
    status: ReportStatus
    priority: Priority
    location: string | null
    latitude: number | null
    longitude: number | null
    edit_count: number
    approved_by: number | null
    approved_at: string | null
    comment_count: number   // dari JOIN comments
    upvote_count: number    // dari JOIN report_upvotes
    created_at: string
    updated_at: string
}

export interface CreateReportPayload {
    title: string
    description: string
    category_id: number
    location?: string
    priority?: Priority
    latitude?: number
    longitude?: number
    images?: File[]
}

export interface UpdateReportPayload {
    title?: string
    description?: string
    status?: ReportStatus
    priority?: Priority
    latitude?: number
    longitude?: number
}

export interface GetReportsParams {
    category?: number
    status?: ReportStatus
    priority?: Priority
    sort?: SortOption
}

export interface UpvoteStatus {
    upvote_count: number
    upvoted: boolean
}

// ── FETCHING FUNCTIONS ────────────────────────────────

// --------------------------------------------------------
// GET ALL REPORTS
// Dipanggil di: explore, home (nearby, trending)
// Public — tidak butuh token
//
// Contoh:
//   const reports = await getReports()
//   const reports = await getReports({ status: "pending", sort: "newest" })
//   const reports = await getReports({ priority: "urgent", category: 1 })
// --------------------------------------------------------
export async function getReports(params?: GetReportsParams): Promise<Report[]> {
    const response = await api.get("/reports", { params })
    return response.data
}

// --------------------------------------------------------
// GET REPORT BY ID
// Dipanggil di: halaman detail laporan
// Public — tidak butuh token
//
// Contoh:
//   const report = await getReportById(1)
// --------------------------------------------------------
export async function getReportById(id: number): Promise<Report> {
    const response = await api.get(`/reports/${id}`)
    return response.data
}

// --------------------------------------------------------
// CREATE REPORT
// Dipanggil di: form buat laporan (user login)
// Butuh: token (auto dari interceptor)
// Pakai FormData karena ada upload image
//
// Contoh:
//   await createReport({
//     title: "Jalan rusak",
//     description: "Berlubang cukup dalam",
//     category_id: 1,
//     priority: "high",
//     location: "Jl. Raya Sawangan",
//     image: file // opsional
//   })
// --------------------------------------------------------
export async function createReport(payload: CreateReportPayload): Promise<Report> {
    const formData = new FormData()
    formData.append("title", payload.title)
    formData.append("description", payload.description)
    formData.append("category_id", String(payload.category_id))
    if (payload.location) formData.append("location", payload.location)
    if (payload.priority) formData.append("priority", payload.priority)
    if (payload.latitude !== undefined) formData.append("latitude", String(payload.latitude))
    if (payload.longitude !== undefined) formData.append("longitude", String(payload.longitude))
    if (payload.images?.length) {
        payload.images.forEach((img) => formData.append("images", img))
    }

    const response = await api.post("/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
}

// --------------------------------------------------------
// UPDATE REPORT
// Dipanggil di: form edit laporan (owner only, max 1x)
// Butuh: token (auto dari interceptor)
//
// Contoh:
//   await updateReport(1, { title: "Judul baru", priority: "urgent" })
// --------------------------------------------------------
export async function updateReport(id: number, payload: UpdateReportPayload): Promise<Report> {
    const response = await api.put(`/reports/${id}`, payload)
    return response.data
}

// --------------------------------------------------------
// DELETE REPORT
// Dipanggil di: tombol hapus laporan (owner only)
// Butuh: token (auto dari interceptor)
//
// Contoh:
//   await deleteReport(1)
// --------------------------------------------------------
export async function deleteReport(id: number): Promise<void> {
    await api.delete(`/reports/${id}`)
}

// --------------------------------------------------------
// UPDATE REPORT STATUS
// Dipanggil di: panel admin/superadmin
// Butuh: token + role admin atau superadmin
//
// Contoh:
//   await updateReportStatus(1, "approved")
//   await updateReportStatus(1, "on_progress")
//   await updateReportStatus(1, "completed")
//   await updateReportStatus(1, "rejected")
// --------------------------------------------------------
export async function updateReportStatus(id: number, status: ReportStatus): Promise<Report> {
    const response = await api.patch(`/reports/${id}/status`, { status })
    return response.data
}

// --------------------------------------------------------
// GET UPVOTE STATUS
// Dipanggil di: halaman detail laporan (public)
// Return: { upvote_count, upvoted }
//
// Contoh:
//   const { upvote_count, upvoted } = await getUpvoteStatus(1)
// --------------------------------------------------------
export async function getUpvoteStatus(reportId: number): Promise<UpvoteStatus> {
    const response = await api.get(`/reports/${reportId}/upvote`)
    return response.data
}

// --------------------------------------------------------
// TOGGLE UPVOTE
// Dipanggil di: tombol dukung di halaman detail
// Butuh: token (auto dari interceptor)
// Toggle: kalau sudah upvote → unvote, belum → upvote
//
// Contoh:
//   const { upvoted, upvote_count } = await toggleUpvote(1)
// --------------------------------------------------------
export async function toggleUpvote(reportId: number): Promise<UpvoteStatus> {
    const response = await api.post(`/reports/${reportId}/upvote`)
    return response.data
}