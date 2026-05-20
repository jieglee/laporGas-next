import api from "./api"

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
    await api.post("/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}