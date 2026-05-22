import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

        console.log("PATH:", pathname)
    console.log("TOKEN:", token)
    console.log("COOKIES:", request.cookies.getAll().map(c => c.name))

    const isAuth = !!token;
    const role = token?.role as string | undefined;

    // ── 1. Belum login → redirect ke login ──────────────
    const protectedPrefixes = ["/user", "/admin", "/superadmin"];
    const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));

    if (isProtected && !isAuth) {
        const loginUrl = new URL("/auth/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ── 2. Role guard — /superadmin ──────────────────────
    if (pathname.startsWith("/superadmin")) {
        if (role !== "superadmin") {
            if (role === "admin") return NextResponse.redirect(new URL("/admin", request.url));
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    // ── 3. Role guard — /admin ───────────────────────────
    if (pathname.startsWith("/admin")) {
        if (role !== "admin" && role !== "superadmin") {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    // ── 4. Manajemen user — superadmin only ──────────────
    if (pathname.startsWith("/admin/users")) {
        if (role !== "superadmin") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    // ── 5. Role guard — /user ────────────────────────────
    if (pathname.startsWith("/user")) {
        if (role === "superadmin") return NextResponse.redirect(new URL("/superadmin", request.url));
        if (role === "admin") return NextResponse.redirect(new URL("/admin", request.url));
    }

    // ── 6. Sudah login buka /auth → redirect dashboard ───
    if (pathname.startsWith("/auth") && isAuth) {
        if (role === "superadmin") return NextResponse.redirect(new URL("/superadmin", request.url));
        if (role === "admin") return NextResponse.redirect(new URL("/admin", request.url));
        return NextResponse.redirect(new URL("/user", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/user/:path*",
        "/admin/:path*",
        "/superadmin/:path*",
        "/auth/:path*",
    ],
};