import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const isAuth = !!token
    const role = token?.role as string | undefined

    // ── Redirect kalau belum login ──────────────────────────
    const protectedPrefixes = ["/user", "/admin", "/superadmin"]
    const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p))

    if (isProtected && !isAuth) {
        const loginUrl = new URL("/auth/login", request.url)
        loginUrl.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(loginUrl)
    }

    // ── Role guard ──────────────────────────────────────────
    if (pathname.startsWith("/admin") && role !== "admin" && role !== "superadmin") {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    if (pathname.startsWith("/superadmin") && role !== "superadmin") {
        // Admin yang nyasar ke superadmin → redirect ke admin dashboard
        if (role === "admin") {
            return NextResponse.redirect(new URL("/admin", request.url))
        }
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    if (pathname.startsWith("/user") && role !== "user") {
        // Admin/superadmin yang buka /user → redirect ke dashboard mereka
        if (role === "admin") return NextResponse.redirect(new URL("/admin", request.url))
        if (role === "superadmin") return NextResponse.redirect(new URL("/superadmin", request.url))
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // ── Redirect kalau sudah login buka /auth ───────────────
    if (pathname.startsWith("/auth") && isAuth) {
        if (role === "superadmin") return NextResponse.redirect(new URL("/superadmin", request.url))
        if (role === "admin") return NextResponse.redirect(new URL("/admin", request.url))
        return NextResponse.redirect(new URL("/user", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/user/:path*",
        "/admin/:path*",
        "/superadmin/:path*",
        "/auth/:path*",
    ],
}
