import api from "./api"

// == TYPES ==

export type UserRole = "user" | "admin" | "superadmin"

export interface User {
    id: number
    name: string
    email: string
    role: UserRole
    created_at: string
}

// == FETCHING FUNCTIONS ==

// --------------------------------------------------------
// GET ALL USERS
// Dipanggil di: halaman manajemen user (superadmin only)
// Butuh: token + role superadmin (auto dari interceptor)
//
// Contoh penggunaan:
//   import { getUsers } from "@/lib/users"
//
//   const users = await getUsers()
// --------------------------------------------------------
export async function getUsers(): Promise<User[]> {
    const response = await api.get("/users")
    return response.data
}

// --------------------------------------------------------
// GET USER BY ID
// Dipanggil di: halaman detail user (superadmin only)
// Butuh: token + role superadmin (auto dari interceptor)
//
// Contoh penggunaan:
//   import { getUserById } from "@/lib/users"
//
//   const user = await getUserById(1)
// --------------------------------------------------------
export async function getUserById(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`)
    return response.data
}

// --------------------------------------------------------
// CREATE USER
// Dipanggil di: form tambah user (superadmin only)
// Butuh: token + role superadmin (auto dari interceptor)
//
// Contoh penggunaan:
//   import { createUser } from "@/lib/users"
//
//   await createUser({ name: "Admin Baru", email: "admin@laporgas.id", password: "admin123" })
// --------------------------------------------------------
export async function createUser(payload: {
    name: string
    email: string
    password: string
}): Promise<User> {
    const response = await api.post("/users", payload)
    return response.data
}

// --------------------------------------------------------
// UPDATE USER ROLE
// Dipanggil di: dropdown/select role di tabel user (superadmin only)
// Butuh: token + role superadmin (auto dari interceptor)
//
// Contoh penggunaan:
//   import { updateUserRole } from "@/lib/users"
//
//   await updateUserRole(1, "admin")
//   await updateUserRole(2, "user")
// --------------------------------------------------------
export async function updateUserRole(id: number, role: UserRole): Promise<User> {
    const response = await api.patch(`/users/${id}/role`, { role })
    return response.data
}

// --------------------------------------------------------
// DELETE USER
// Dipanggil di: tombol hapus user di tabel (superadmin only)
// Butuh: token + role superadmin (auto dari interceptor)
//
// Contoh penggunaan:
//   import { deleteUser } from "@/lib/users"
//
//   await deleteUser(1)
// --------------------------------------------------------
export async function deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`)
}