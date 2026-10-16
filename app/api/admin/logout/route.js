import { NextResponse } from "next/server";

// POST & GET /api/admin/logout
// Clears admin authentication session cookies
export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session terminated successfully.",
  });

  const clearOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  };

  response.cookies.set("admin_auth", "", clearOptions);
  response.cookies.set("admin_session_token", "", clearOptions);

  return response;
}

export async function GET() {
  return POST();
}
