import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";
import { sanitizeText } from "@/lib/validators";
import { isValidAdminSecret } from "@/lib/security";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

// POST /api/seed
// Hardened with strict timing-safe admin authorization and 10 req/min rate limiting
export async function POST(request) {
  try {
    // 1. RATE LIMITING: 10 requests per minute per IP
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`seed_${clientIp}`, 10, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many seeding requests. Rate limit is 10 requests per minute.",
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

    // 2. TIMING-SAFE ADMIN AUTHORIZATION CHECK (MANDATORY IN ALL ENVIRONMENTS)
    const adminKey = request.headers.get("x-admin-secret-key");
    const sessionToken = request.cookies.get("admin_session_token")?.value;

    const isAuthorized = isValidAdminSecret(adminKey) || isValidAdminSecret(sessionToken);

    if (!isAuthorized) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Valid x-admin-secret-key header or admin session is required.",
        },
        { status: 401 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          success: false,
          error: "Database configuration missing. Please verify server environment variables.",
        },
        { status: 500 }
      );
    }

    await connectToDatabase();

    // Remove existing products to avoid duplicate key errors on clean seed
    await Product.deleteMany({});

    const formattedProducts = PRODUCTS.map((item) => ({
      productId: item.id,
      name: sanitizeText(item.name),
      slug:
        item.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") +
        "-" +
        item.id,
      price: item.price,
      originalPrice: item.originalPrice,
      discount: Math.round(
        ((item.originalPrice - item.price) / item.originalPrice) * 100
      ),
      category: item.category.toLowerCase().trim(),
      image: item.image,
      images: [item.image],
      rating: item.rating,
      reviews: item.reviews,
      stock: 50,
      isBestseller: Boolean(item.bestseller),
      bestseller: Boolean(item.bestseller),
      isNew: Boolean(item.isNew),
      tag: item.tag || "",
      description: item.description || "",
      specs: item.specs || {},
    }));

    const seeded = await Product.insertMany(formattedProducts);

    return NextResponse.json(
      {
        success: true,
        message: `Successfully seeded ${seeded.length} products to MongoDB!`,
        count: seeded.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in /api/seed:", error);
    return NextResponse.json(
      { success: false, error: "Database seeding failed: " + error.message },
      { status: 500 }
    );
  }
}

// Block GET from seeding or leaking instructions: Return 405 Method Not Allowed
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Method Not Allowed. Database seeding requires authenticated POST request.",
    },
    {
      status: 405,
      headers: {
        Allow: "POST",
      },
    }
  );
}
