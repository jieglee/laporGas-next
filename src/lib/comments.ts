import api from "./api"

// == TYPES ==

export interface Comment {
    id: number
    report_id: number
    user_id: number
    name: string
    role: string
    comment: string
    type: "public" | "official"
    created_at: string
}

// == FETCHING FUNCTIONS ==

// --------------------------------------------------------
// GET COMMENTS BY REPORT
// Dipanggil di: section komentar di halaman detail laporan
// Tidak butuh token (public)
//
// Contoh penggunaan:
//   import { getComments } from "@/lib/comments"
//
//   const comments = await getComments(reportId)
// --------------------------------------------------------
export async function getComments(reportId: number): Promise<Comment[]> {
    const response = await api.get(`/comments/${reportId}`)
    return response.data
}

// --------------------------------------------------------
// CREATE COMMENT
// Dipanggil di: form komentar di halaman detail laporan (user login)
// Butuh: token (auto dari interceptor)
//
// Contoh penggunaan:
//   import { createComment } from "@/lib/comments"
//
//   await createComment({ report_id: 1, comment: "Segera ditindaklanjuti!" })
// --------------------------------------------------------
export async function createComment(payload: {
    report_id: number
    comment: string
}): Promise<Comment> {
    const response = await api.post("/comments", payload)
    return response.data
}

// --------------------------------------------------------
// DELETE COMMENT
// Dipanggil di: tombol hapus komentar (owner comment only)
// Butuh: token (auto dari interceptor)
//
// Contoh penggunaan:
//   import { deleteComment } from "@/lib/comments"
//
//   await deleteComment(commentId)
// --------------------------------------------------------
export async function deleteComment(id: number): Promise<void> {
    await api.delete(`/comments/${id}`)
}
