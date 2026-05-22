import { signOut } from "next-auth/react"

export async function registerUser(data: {
    name: string
    email: string
    password: string
}) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    )

    const json = await res.json()

    if (!res.ok) throw new Error(json.message || "Register gagal")

    return json
}

export async function logout() {
    try {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    } catch {}

    // signOut dari NextAuth — ini yang hapus session cookie
    await signOut({ callbackUrl: "/" })
}