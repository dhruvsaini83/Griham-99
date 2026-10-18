import { NextResponse } from "next/server";
import { isValidAdminSecret } from "@/lib/security";
import { validateUploadFile } from "@/lib/file-security";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    // 1. Admin Authentication Check
    const adminKey = request.headers.get("x-admin-secret-key");
    const cookieAuth = request.cookies.get("admin_auth")?.value;
    const isAuthorized = isValidAdminSecret(adminKey) || isValidAdminSecret(cookieAuth);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required." },
        { status: 401 }
      );
    }

    // 2. Rate limit: 30 uploads per minute per IP
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`upload_${clientIp}`, 30, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { success: false, error: "Too many uploads. Please wait a minute." },
        { status: 429 }
      );
    }

    // 3. Verify Cloudinary Configuration (Vercel is read-only; no local fs fallback)
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (
      !cloudName ||
      !apiKey ||
      !apiSecret ||
      cloudName === "demo" ||
      apiKey === "demo" ||
      apiSecret === "demo"
    ) {
      return NextResponse.json(
        { success: false, error: "Cloudinary not configured" },
        { status: 500 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    const uploadedUrls = [];

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

      if (!files || files.length === 0) {
        return NextResponse.json(
          { success: false, error: "No file provided in form data." },
          { status: 400 }
        );
      }

      for (const file of files) {
        if (!file || typeof file === "string") continue;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Security validation (Size <= 5MB, Whitelist JPEG/PNG/WebP, Magic bytes)
        const validation = validateUploadFile({
          filename: file.name || "upload.jpg",
          mimeType: file.type || "image/jpeg",
          size: buffer.length,
          buffer: buffer,
        });

        if (!validation.valid) {
          return NextResponse.json(
            { success: false, error: validation.error },
            { status: 400 }
          );
        }

        const base64 = `data:${file.type || "image/jpeg"};base64,${buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(base64, {
          folder: "griham-99/products",
          resource_type: "auto",
        });

        if (result && result.secure_url) {
          uploadedUrls.push(result.secure_url);
        }
      }
    } else {
      // JSON base64 upload
      const json = await request.json().catch(() => ({}));
      const base64Data = json.image || json.file;

      if (!base64Data || typeof base64Data !== "string") {
        return NextResponse.json(
          { success: false, error: "Missing image base64 data." },
          { status: 400 }
        );
      }

      const match = base64Data.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      let mimeType = "image/jpeg";
      let buffer;
      if (match) {
        mimeType = match[1];
        buffer = Buffer.from(match[2], "base64");
      } else {
        buffer = Buffer.from(base64Data, "base64");
      }

      const ext = mimeType.replace("image/", "").replace("jpeg", "jpg");
      const validation = validateUploadFile({
        filename: `upload-${Date.now()}.${ext}`,
        mimeType,
        size: buffer.length,
        buffer,
      });

      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 400 }
        );
      }

      const base64 = `data:${mimeType};base64,${buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64, {
        folder: "griham-99/products",
        resource_type: "auto",
      });

      if (result && result.secure_url) {
        uploadedUrls.push(result.secure_url);
      }
    }

    if (uploadedUrls.length === 0) {
      return NextResponse.json(
        { success: false, error: "Upload failed: No images could be processed." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      source: "cloudinary",
      url: uploadedUrls[0],
      urls: uploadedUrls,
    });
  } catch (err) {
    console.error("Admin upload error:", err);
    return NextResponse.json(
      { success: false, error: "Upload failed: " + err.message },
      { status: 500 }
    );
  }
}
