import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { isValidAdminSecret, sanitizeNoSql } from "@/lib/security";
import { sanitizeText } from "@/lib/validators";
import cloudinary from "@/lib/cloudinary";

function buildIdQuery(idParam) {
  if (!isNaN(Number(idParam))) {
    return { productId: Number(idParam) };
  }
  if (idParam.length === 24) {
    return { _id: idParam };
  }
  return { slug: idParam };
}

// GET /api/admin/products/[id]
export async function GET(request, { params }) {
  try {
    const adminKey = request.headers.get("x-admin-secret-key");
    const cookieAuth = request.cookies.get("admin_auth")?.value;
    const isAuthorized = isValidAdminSecret(adminKey) || isValidAdminSecret(cookieAuth);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required." },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const query = buildIdQuery(params.id);
    const product = await Product.findOne(query).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products/[id]
export async function PUT(request, { params }) {
  try {
    const adminKey = request.headers.get("x-admin-secret-key");
    const cookieAuth = request.cookies.get("admin_auth")?.value;
    const isAuthorized = isValidAdminSecret(adminKey) || isValidAdminSecret(cookieAuth);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required." },
        { status: 401 }
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

    const data = sanitizeNoSql(rawBody);

    const query = buildIdQuery(params.id);
    const existing = await Product.findOne(query);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Product not found for update." },
        { status: 404 }
      );
    }

    const price = data.price !== undefined ? Number(data.price) : existing.price;
    const originalPrice =
      data.originalPrice !== undefined
        ? Number(data.originalPrice)
        : existing.originalPrice || price;

    const discount =
      originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    const updateFields = {
      name: data.name ? sanitizeText(data.name) : existing.name,
      price,
      originalPrice,
      discount,
      category: data.category ? data.category.toLowerCase().trim() : existing.category,
      stock: data.stock !== undefined ? Number(data.stock) : existing.stock,
      description: data.description !== undefined ? sanitizeText(data.description) : existing.description,
      image: data.image || existing.image,
      images: data.images && data.images.length > 0 ? data.images : existing.images,
      bestseller: data.bestseller !== undefined ? Boolean(data.bestseller) : existing.bestseller,
      isBestseller: data.bestseller !== undefined ? Boolean(data.bestseller) : existing.isBestseller,
      tag: data.tag !== undefined ? sanitizeText(data.tag) : existing.tag,
      specs: data.specs !== undefined ? data.specs : existing.specs,
    };

    const updated = await Product.findOneAndUpdate(query, updateFields, { new: true }).lean();

    return NextResponse.json({
      success: true,
      message: "Product updated successfully!",
      product: updated,
    });
  } catch (error) {
    console.error("PUT /api/admin/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/[id]
export async function DELETE(request, { params }) {
  try {
    const adminKey = request.headers.get("x-admin-secret-key");
    const cookieAuth = request.cookies.get("admin_auth")?.value;
    const isAuthorized = isValidAdminSecret(adminKey) || isValidAdminSecret(cookieAuth);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required." },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const query = buildIdQuery(params.id);
    const deleted = await Product.findOneAndDelete(query).lean();

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Product not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Product "${deleted.name}" (ID: ${deleted.productId}) deleted successfully.`,
    });
  } catch (error) {
    console.error("DELETE /api/admin/products/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
