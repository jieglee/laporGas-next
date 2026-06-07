import { signOut } from "next-auth/react"

const API = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(data: {
    name: string
    email: string
    password: string
}) {
    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message || "Register gagal")
    return json
}

export async function logout() {
    try {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    } catch {}
    await signOut({ callbackUrl: "/" })
}

export async function verifyIdentity(email: string, name: string) {
    const res = await fetch(`${API}/verify-identity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
    })
    return res.json()
}

export async function resetPasswordByName(email: string, name: string, newPassword: string) {
    const res = await fetch(`${API}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, newPassword }),
    })
    return res.json()
}