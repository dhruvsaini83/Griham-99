import { NextResponse } from "next/server";

// In-memory sliding window rate limiter for edge/middleware protection
const rateLimitMap = new Map();

function checkMiddlewareRateLimit(key, limit = 10, windowMs = 60 * 1000) {
  const now = Date.now();
  const record = rateLimitMap.get(key) || { count: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    rateLimitMap.set(key, record);
    return { success: true, remaining: limit - 1, resetInMs: windowMs };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, resetInMs: Math.max(0, record.resetTime - now) };
  }

  record.count += 1;
  rateLimitMap.set(key, record);
  return { success: true, remaining: limit - record.count, resetInMs: Math.max(0, record.resetTime - now) };
}

/**
 * Constant-time string equality comparison to prevent timing attacks across all runtime environments
 */
function timingSafeEqualStr(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  let mismatch = a.length === b.length ? 0 : 1;
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    const charA = i < a.length ? a.charCodeAt(i) : 0;
    const charB = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= charA ^ charB;
  }
  return mismatch === 0;
}

function getIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // 1. GLOBAL HARDENED SECURITY HEADERS
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // 2. SAME-ORIGIN CORS RESTRICTION ON /api/*
  if (pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin) {
      try {
        const originUrl = new URL(origin);
        // If request origin does not match application host, reject cross-origin access
        if (originUrl.host !== host) {
          return NextResponse.json(
            { success: false, error: "Cross-Origin requests strictly forbidden on API routes." },
            { status: 403 }
          );
        }
      } catch (e) {
        return NextResponse.json(
          { success: false, error: "Malformed Origin header." },
          { status: 400 }
        );
      }
    }
  }

  // 3. RATE LIMITING FOR SENSITIVE ENDPOINTS (/api/seed and /api/admin/*: 10 req/min per IP)
  if (pathname === "/api/seed" || pathname.startsWith("/api/admin")) {
    const clientIp = getIp(request);
    const rateCheck = checkMiddlewareRateLimit(`mw_rate_${clientIp}`, 10, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Maximum 10 requests per minute allowed.",
          retryAfterMs: rateCheck.resetInMs,
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(rateCheck.resetInMs / 1000).toString(),
          },
        }
      );
    }
  }

  // 4. PROTECT ADMIN ROUTES (/admin/* and /api/admin/*)
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    // Whitelist login and logout routes
    if (
      pathname === "/admin/login" ||
      pathname === "/api/admin/login" ||
      pathname === "/api/admin/logout"
    ) {
      return response;
    }

    const adminAuthCookie = request.cookies.get("admin_auth")?.value;
    const adminSessionToken = request.cookies.get("admin_session_token")?.value;
    const adminKeyHeader = request.headers.get("x-admin-secret-key");
    const configuredSecret = process.env.ADMIN_SECRET_KEY || "griham_admin_secret_99";

    // Timing-safe authorization check
    const isAuthorized =
      timingSafeEqualStr(adminAuthCookie, configuredSecret) ||
      timingSafeEqualStr(adminSessionToken, configuredSecret) ||
      timingSafeEqualStr(adminKeyHeader, configuredSecret);

    if (!isAuthorized) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { success: false, error: "Unauthorized: Admin authorization required." },
          { status: 401 }
        );
      }

      // Redirect browser to login page with referral tracking
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|logo.svg|whatsapp.png|assets).*)",
  ],
};
