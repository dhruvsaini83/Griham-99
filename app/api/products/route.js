import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { PRODUCTS } from "@/data/products";
import { productCreateSchema, sanitizeText } from "@/lib/validators";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

// GET /api/products
// Fetches catalog with rate limiting and automatic initial database seeding
export async function GET(request) {
  try {
    // Rate limit: 60 requests per minute per IP
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`get_products_${clientIp}`, 60, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: true,
        source: "static_fallback",
        count: PRODUCTS.length,
        products: PRODUCTS,
      });
    }

    await connectToDatabase();

    const count = await Product.countDocuments();

    // Auto-seed if database is completely empty
    if (count === 0) {
      const seedItems = PRODUCTS.map((item) => ({
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

      await Product.insertMany(seedItems);
    }

    const products = await Product.find({})
      .sort({ productId: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      source: "mongodb",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error in GET /api/products:", error);
    return NextResponse.json(
      {
        success: true,
        source: "error_fallback",
        count: PRODUCTS.length,
        products: PRODUCTS,
      },
      { status: 200 }
    );
  }
}

// POST /api/products
// Protected Admin route with Zod Validation & Admin Secret Key Authentication
export async function POST(request) {
  try {
    // 1. ADMIN AUTHORIZATION CHECK
    const adminKey = request.headers.get("x-admin-secret-key");
    const configuredKey = process.env.ADMIN_SECRET_KEY || "griham_admin_secret_99";

    if (adminKey !== configuredKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid or missing x-admin-secret-key header.",
        },
        { status: 401 }
      );
    }

    // 2. RATE LIMITING FOR PRODUCT CREATION (15 per min)
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`post_product_${clientIp}`, 15, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { success: false, error: "Too many product creations. Slow down." },
        { status: 429 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: false, error: "MONGODB_URI not configured in .env.local" },
        { status: 500 }
      );
    }

    await connectToDatabase();
    const rawBody = await request.json();

    // 3. ZOD SCHEMA VALIDATION
    const validationResult = productCreateSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate unique slug
    const baseSlug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    // Generate sequential productId
    const lastProduct = await Product.findOne().sort({ productId: -1 });
    const nextId = lastProduct && lastProduct.productId ? lastProduct.productId + 1 : 100;

    const newProduct = await Product.create({
      productId: nextId,
      name: sanitizeText(data.name),
      slug,
      price: data.price,
      originalPrice: data.originalPrice || data.price,
      discount:
        data.originalPrice && data.originalPrice > data.price
          ? Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100)
          : 0,
      category: data.category.toLowerCase().trim(),
      image: data.image,
      images: data.images?.length > 0 ? data.images : [data.image],
      description: sanitizeText(data.description || ""),
      specs: data.specs || {},
      stock: data.stock !== undefined ? data.stock : 50,
      bestseller: Boolean(data.bestseller),
      isBestseller: Boolean(data.bestseller),
      tag: sanitizeText(data.tag || ""),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created securely",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/products:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
