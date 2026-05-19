import api from "./api"

// == TYPES ==

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
    status: ReportStatus
    priority: Priority
    location: string | null
    latitude: number | null
    longitude: number | null
    edit_count: number
    approved_by: number | null
    approved_at: string | null
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
    image?: File
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

// == FETCHING FUNCTIONS ==

// --------------------------------------------------------
// GET ALL REPORTS
// Dipanggil di: halaman list laporan (user & admin)
//
// Contoh penggunaan:
//   import { getReports } from "@/lib/reports"
//
//   // Tanpa filter
//   const reports = await getReports()
//
//   // Dengan filter
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
//
// Contoh penggunaan:
//   import { getReportById } from "@/lib/reports"
//
//   const report = await getReportById(1)
// --------------------------------------------------------
export async function getReportById(id: number): Promise<Report> {
    const response = await api.get(`/reports/${id}`)
    return response.data
}

// --------------------------------------------------------
// CREATE REPORT
// Dipanggil di: form buat laporan baru (user login)
// Butuh: token (auto dari interceptor)
// Note: pakai FormData karena ada upload image
//
// Contoh penggunaan:
//   import { createReport } from "@/lib/reports"
//
//   await createReport({
//     title: "Jalan rusak",
//     description: "Berlubang cukup dalam",
//     category_id: 1,
//     priority: "high",
//     location: "Jl. Raya Sawangan",
//     image: fileInputRef.current.files[0] // opsional
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
    if (payload.image) formData.append("image", payload.image)

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
// Contoh penggunaan:
//   import { updateReport } from "@/lib/reports"
//
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
// Contoh penggunaan:
//   import { deleteReport } from "@/lib/reports"
//
//   await deleteReport(1)
// --------------------------------------------------------
export async function deleteReport(id: number): Promise<void> {
    await api.delete(`/reports/${id}`)
}

// --------------------------------------------------------
// UPDATE REPORT STATUS
// Dipanggil di: panel admin/superadmin untuk update status laporan
// Butuh: token + role admin atau superadmin (auto dari interceptor)
//
// Contoh penggunaan:
//   import { updateReportStatus } from "@/lib/reports"
//
//   await updateReportStatus(1, "approved")
//   await updateReportStatus(1, "on_progress")
//   await updateReportStatus(1, "completed")
//   await updateReportStatus(1, "rejected")
// --------------------------------------------------------
export async function updateReportStatus(id: number, status: ReportStatus): Promise<Report> {
    const response = await api.patch(`/reports/${id}/status`, { status })
    return response.data
}