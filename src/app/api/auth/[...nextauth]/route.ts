import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { apiFetch }from "@/lib/api"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",

            credentials: {
                email: {},
                password: {}
            },

            async authorize(credentials) {
                const data = await apiFetch("/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })

                if (!data.token) {
                    throw new Error(data.message)
                }

                const payload = JSON.parse(
                    atob(data.token.split(".")[1])
                )

                return {
                    id: payload.id,
                    name: payload.name,
                    role: payload.role,
                    accessToken: data.token
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