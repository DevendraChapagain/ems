import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  if (!token && (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/employee") ||
    pathname.startsWith("/manager") ||
    pathname.startsWith("/hr")
  )) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname === "/"
  )) {
    const decoded = jwtDecode<{ role: string }>(token);

    if (decoded.role === "admin") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    if (decoded.role === "manager") return NextResponse.redirect(new URL("/manager/dashboard", request.url));
    if (decoded.role === "hr") return NextResponse.redirect(new URL("/hr/dashboard", request.url));
    return NextResponse.redirect(new URL("/employee/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/employee/:path*", "/manager/:path*", "/hr/:path*", "/auth/login", "/auth/register"],
};