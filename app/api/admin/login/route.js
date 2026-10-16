import { NextResponse } from "next/server";
import { isValidAdminPassword, isValidAdminSecret, sanitizeNoSql } from "@/lib/security";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

// POST /api/admin/login
// Secure Admin Login with Rate Limiting (5 attempts/min), timing-safe credential verification,
// and hardened HttpOnly, Secure, SameSite=Strict session cookie.
export async function POST(request) {
  try {
    // 1. Strict Rate Limiting: Max 5 login attempts per minute per IP to block brute-force attacks
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`admin_login_${clientIp}`, 5, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many login attempts. Please wait 1 minute before trying again.",
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

    const rawBody = await request.json().catch(() => ({}));
    const body = sanitizeNoSql(rawBody);

    const password = typeof body.password === "string" ? body.password : "";
    const secretKey = typeof body.secretKey === "string" ? body.secretKey : "";

    // 2. Timing-safe verification against ADMIN_PASSWORD or ADMIN_SECRET_KEY
    const isPasswordValid = isValidAdminPassword(password);
    const isSecretValid = isValidAdminSecret(secretKey);

    if (!isPasswordValid && !isSecretValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin password or secret key.",
        },
        { status: 401 }
      );
    }

    const configuredSecret = process.env.ADMIN_SECRET_KEY || "griham_admin_secret_99";
    const isProd = process.env.NODE_ENV === "production";

    const response = NextResponse.json(
      {
        success: true,
        message: "Admin authentication successful.",
      },
      { status: 200 }
    );

    // 3. Set hardened session cookie (1 day lifespan)
    const cookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/",
      maxAge: 86400, // 1 day in seconds
    };

    response.cookies.set("admin_auth", configuredSecret, cookieOptions);
    response.cookies.set("admin_session_token", configuredSecret, cookieOptions);

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
