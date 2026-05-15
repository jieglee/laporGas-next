import axios from "axios"
import { getSession } from "next-auth/react"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use(async (config) => {
    const session = await getSession()

    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`
    }

    return config  // tetap lanjut meskipun ga ada session
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || "Something went wrong"
        return Promise.reject(new Error(message))
    }
)

export default api