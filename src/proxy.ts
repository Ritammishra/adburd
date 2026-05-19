import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname.startsWith("/admin/login");

  // Allow login page
  if (isLoginPage) {
    if (token) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", req.url)
      );
    }

    return NextResponse.next();
  }

  // Protect admin routes
  if (isAdminRoute && !token) {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};