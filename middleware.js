import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;


  // Redirect unauthenticated users to login
  if (!token) {
    if (url.pathname !== "/login" && url.pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  const userRole = token.role; // Extract role from token

  // Redirect authenticated users away from login/register pages
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL(userRole === "admin" ? "/admin/dashboard" : "/dashboard", req.url));
  }

  // Redirect unauthenticated users to login if accessing protected routes
  if (!token && ["/dashboard", "/profile", "/settings", "/admin"].some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // User restrictions: Can only access /dashboard
  if (userRole === "user") {
    if (url.pathname === "/admin" || url.pathname === "/login" || url.pathname === "/register") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Admin restrictions: Can only access /admin
  if (userRole === "admin") {
    if (url.pathname === "/dashboard" || url.pathname === "/login" || url.pathname === "/register") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next).*)",
    "/dashboard/:path*", // Protect dashboard and its sub-paths
    "/profile/:path*", // Protect profile and its sub-paths
    "/settings/:path*", // Protect settings and its sub-paths
    "/admin/:path*",
    "/login", // Intercept login
    "/register", // Intercept register
  ],
};
