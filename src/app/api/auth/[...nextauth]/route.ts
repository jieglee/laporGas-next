import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },

async authorize(credentials) {
    try {
        if (!credentials?.email || !credentials?.password) {
            throw new Error("Email dan password wajib diisi")
        }

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            }
        )

        const json = await res.json()

        console.log("STATUS:", res.status)
        console.log("JSON:", json)

        // kalau login gagal
        if (!res.ok) {
            throw new Error(json.message || "Email atau password salah")
        }

        // pastikan token ada
        if (!json?.data?.token) {
            throw new Error("Token tidak ditemukan")
        }

        const token = json.data.token

        const payload = JSON.parse(
            atob(token.split(".")[1])
        )

        return {
            id: String(payload.id),
            name: payload.name,
            role: payload.role,
            accessToken: token,
        }

    } catch (error) {
        console.error("NEXTAUTH ERROR:", error)
        return null
    }
}
        })
    ],

    session: {
        strategy: "jwt"
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.accessToken = user.accessToken
            }
            return token
        },

        async session({ session, token }) {
            session.user.id = token.id as string
            session.user.role = token.role as string
            session.accessToken = token.accessToken as string
            return session
        }
    },

    pages: {
        signIn: "/auth/login"
    },

    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }