import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";
import { sanitizeText } from "@/lib/validators";

// POST /api/seed
// Protected route to seed initial products into MongoDB
export async function POST(request) {
  try {
    // Protect seeding endpoint from unauthorized invocation in production
    const adminKey = request.headers.get("x-admin-secret-key");
    const configuredKey = process.env.ADMIN_SECRET_KEY || "griham_admin_secret_99";
    const isDev = process.env.NODE_ENV !== "production";

    if (!isDev && adminKey !== configuredKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Seeding in production requires x-admin-secret-key header.",
        },
        { status: 401 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please configure MONGODB_URI in your .env.local file before running database seed.",
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
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "POST to /api/seed with x-admin-secret-key header to seed database.",
  });
}
