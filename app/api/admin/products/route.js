import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { isValidAdminSecret, sanitizeNoSql } from "@/lib/security";
import { productCreateSchema, sanitizeText } from "@/lib/validators";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

// GET /api/admin/products
// List all products with optional search query
export async function GET(request) {
  try {
    const adminKey = request.headers.get("x-admin-secret-key");
    const sessionToken = request.cookies.get("admin_session_token")?.value;
    const isAuthorized = isValidAdminSecret(adminKey) || isValidAdminSecret(sessionToken);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required." },
        { status: 401 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: false, error: "MongoDB connection string not configured." },
        { status: 500 }
      );
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const search = (searchParams.get("search") || "").trim();
    const category = (searchParams.get("category") || "").trim();

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: sanitizeText(search), $options: "i" } },
        { category: { $regex: sanitizeText(search), $options: "i" } },
      ];
      if (!isNaN(Number(search))) {
        filter.$or.push({ productId: Number(search) });
      }
    }

    if (category && category !== "all") {
      filter.category = category.toLowerCase().trim();
    }

    const products = await Product.find(filter)
      .sort({ productId: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("GET /api/admin/products error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/products
// Create a new product
export async function POST(request) {
  try {
    const adminKey = request.headers.get("x-admin-secret-key");
    const sessionToken = request.cookies.get("admin_session_token")?.value;
    const isAuthorized = isValidAdminSecret(adminKey) || isValidAdminSecret(sessionToken);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required." },
        { status: 401 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: false, error: "MongoDB URI not configured." },
        { status: 500 }
      );
    }

    await connectToDatabase();

    const contentType = request.headers.get("content-type") || "";
    let rawBody = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      let files = formData.getAll("images");
      if (!files || files.length === 0) {
        files = formData.getAll("file");
      }
      if (!files || files.length === 0) {
        const single = formData.get("file") || formData.get("image");
        if (single && typeof single !== "string") {
          files = [single];
        }
      }

      const uploadedUrls = [];
      const validFiles = (files || []).filter((f) => f && typeof f !== "string" && f.size > 0);

      if (validFiles.length > 0) {
        if (
          !process.env.CLOUDINARY_CLOUD_NAME ||
          !process.env.CLOUDINARY_API_KEY ||
          !process.env.CLOUDINARY_API_SECRET ||
          process.env.CLOUDINARY_CLOUD_NAME === "demo" ||
          process.env.CLOUDINARY_API_KEY === "demo" ||
          process.env.CLOUDINARY_API_SECRET === "demo"
        ) {
          return NextResponse.json(
            { success: false, error: "Cloudinary not configured" },
            { status: 500 }
          );
        }

        for (const file of validFiles) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64 = `data:${file.type || "image/jpeg"};base64,${buffer.toString("base64")}`;
          const result = await cloudinary.uploader.upload(base64, {
            folder: "griham-99/products",
            resource_type: "auto",
          });
          if (result && result.secure_url) {
            uploadedUrls.push(result.secure_url);
          }
        }
      }

      formData.forEach((value, key) => {
        if (key !== "file" && key !== "images") {
          if (key === "price" || key === "originalPrice" || key === "stock") {
            rawBody[key] = value !== "" ? Number(value) : undefined;
          } else if (key === "bestseller") {
            rawBody[key] = value === "true" || value === true;
          } else {
            rawBody[key] = value;
          }
        }
      });

      if (uploadedUrls.length > 0) {
        rawBody.image = uploadedUrls[0];
        rawBody.images = uploadedUrls;
      }
    } else {
      rawBody = await request.json().catch(() => ({}));
    }

    const sanitizedBody = sanitizeNoSql(rawBody);

    const validationResult = productCreateSchema.safeParse(sanitizedBody);
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

    // Sequential next ID
    const lastProduct = await Product.findOne().sort({ productId: -1 });
    const nextId = lastProduct && lastProduct.productId ? lastProduct.productId + 1 : 100;

    const baseSlug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const slug = `${baseSlug}-${nextId}`;

    const newProduct = await Product.create({
      productId: nextId,
      name: sanitizeText(data.name),
      slug,
      price: data.price || 99,
      originalPrice: data.originalPrice || data.price || 99,
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
      tag: sanitizeText(data.tag || (data.price <= 99 ? "STARTS @ ₹99" : "")),
      rating: 4.8,
      reviews: 1,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully in MongoDB!",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/products error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
