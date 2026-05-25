import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });


    const isAuth = !!token;
    const role = token?.role as string | undefined;

    // ── Redirect helper ───────────────────────────────
    const to = (path: string) => NextResponse.redirect(new URL(path, request.url));

    // ── Dashboard per role ────────────────────────────
    const dashboard: Record<string, string> = {
        user:       "/user",
        admin:      "/admin",
        superadmin: "/admin",
    };

    // ─────────────────────────────────────────────────
    // 1. AUTH ROUTES — kalau sudah login, redirect ke dashboard
    // ─────────────────────────────────────────────────
    if (pathname.startsWith("/auth")) {
        if (isAuth && role) return to(dashboard[role] ?? "/user");
        return NextResponse.next();
    }

    // ─────────────────────────────────────────────────
    // 2. PROTECTED ROUTES — belum login → ke login
    // ─────────────────────────────────────────────────
    if (!isAuth) {
        const loginUrl = new URL("/auth/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ─────────────────────────────────────────────────
    // 3. ROLE GUARD
    // ─────────────────────────────────────────────────

    // /superadmin → superadmin only
    if (pathname.startsWith("/superadmin")) {
        if (role === "superadmin") return NextResponse.next();
        return to(dashboard[role ?? "user"] ?? "/user");
    }

    // /admin/users → superadmin only
    if (pathname.startsWith("/admin/users")) {
        if (role === "superadmin") return NextResponse.next();
        return to("/admin");
    }

    // /admin → admin + superadmin only
    if (pathname.startsWith("/admin")) {
        if (role === "admin" || role === "superadmin") return NextResponse.next();
        return to(dashboard[role ?? "user"] ?? "/user");
    }

    // /user → user only
    if (pathname.startsWith("/user")) {
        if (role === "user") return NextResponse.next();
        return to(dashboard[role ?? "user"] ?? "/user");
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