import api from "./api"

export interface Comment {
    id: number
    report_id: number
    user_id: number
    name: string
    role: string
    comment: string
    type: "public" | "official"
    parent_id: number | null
    created_at: string
    replies: Comment[]
}

export async function getComments(reportId: number): Promise<Comment[]> {
    const response = await api.get(`/comments/${reportId}`)
    return response.data
}

export async function createComment(payload: {
    report_id: number
    comment: string
    parent_id?: number | null
}): Promise<Comment> {
    const response = await api.post("/comments", payload)
    return response.data
}

export async function deleteComment(id: number): Promise<void> {
    await api.delete(`/comments/${id}`)
}