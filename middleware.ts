import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuth = !!token;
  const role = token?.role as string | undefined;

  // =========================
  // Protected routes
  // =========================

  const protectedPrefixes = ["/user", "/admin"];
  const isProtected = protectedPrefixes.some((p) =>
    pathname.startsWith(p)
  );

  if (isProtected && !isAuth) {
    const loginUrl = new URL("/auth/login", request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // =========================
  // ADMIN & SUPERADMIN ONLY
  // =========================

  if (
    pathname.startsWith("/admin") &&
    role !== "admin" &&
    role !== "superadmin"
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // =========================
  // SUPERADMIN ONLY
  // =========================

  if (
    pathname.startsWith("/admin/users") &&
    role !== "superadmin"
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // =========================
  // USER ONLY
  // =========================

  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // =========================
  // AUTH REDIRECT
  // =========================

  if (pathname.startsWith("/auth") && isAuth) {
    if (role === "admin" || role === "superadmin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.redirect(new URL("/user", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/auth/:path*",
  ],
};