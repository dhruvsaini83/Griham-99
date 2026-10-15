import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // 1. GLOBAL SECURITY HEADERS
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // 2. PROTECT ADMIN ROUTES (/admin/* and /api/admin/*)
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    // Allow access to login page
    if (pathname === "/admin/login") {
      return response;
    }

    const adminToken = request.cookies.get("admin_session_token")?.value;
    const adminKeyHeader = request.headers.get("x-admin-secret-key");
    const configuredSecret = process.env.ADMIN_SECRET_KEY || "griham_admin_secret_99";

    const isAuthorized =
      adminToken === configuredSecret || adminKeyHeader === configuredSecret;

    if (!isAuthorized) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { success: false, error: "Unauthorized: Admin access required." },
          { status: 401 }
        );
      }

      // Redirect browser to login page with callback URL
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.svg, logo.svg (favicon and logo files)
     * - assets/ (public assets like logos)
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|logo.svg|whatsapp.png|assets).*)",
  ],
};
