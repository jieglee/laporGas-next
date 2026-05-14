import { apiFetch } from "./api"

export async function registerUser(data: {
    name: string
    email: string
    password: string
}) {
    const response = await apiFetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return response.data
}