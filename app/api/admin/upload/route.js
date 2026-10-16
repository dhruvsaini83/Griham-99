import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { isValidAdminSecret } from "@/lib/security";
import { validateUploadFile } from "@/lib/file-security";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

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

    const contentType = request.headers.get("content-type") || "";

    let fileBuffer = null;
    let fileName = "";
    let mimeType = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!file || typeof file === "string") {
        return NextResponse.json(
          { success: false, error: "No file provided in form data." },
          { status: 400 }
        );
      }

      fileName = file.name;
      mimeType = file.type;
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
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
      if (match) {
        mimeType = match[1];
        fileBuffer = Buffer.from(match[2], "base64");
        const ext = mimeType.replace("image/", "").replace("jpeg", "jpg");
        fileName = `upload-${Date.now()}.${ext}`;
      } else {
        fileBuffer = Buffer.from(base64Data, "base64");
        mimeType = "image/jpeg";
        fileName = `upload-${Date.now()}.jpg`;
      }
    }

    // 3. Security Validation (Size <= 5MB, Whitelist JPEG/PNG/WebP, Magic bytes)
    const validation = validateUploadFile({
      filename: fileName,
      mimeType,
      size: fileBuffer.length,
      buffer: fileBuffer,
    });

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // 4. Cloudinary Attempt (if real keys configured)
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const isRealCloudinary =
      cloudName &&
      cloudName !== "demo" &&
      apiKey &&
      apiKey !== "demo" &&
      apiSecret &&
      apiSecret !== "demo";

    if (isRealCloudinary) {
      try {
        const timestamp = Math.round(Date.now() / 1000);
        const signatureStr = `timestamp=${timestamp}${apiSecret}`;
        const signature = crypto.createHash("sha1").update(signatureStr).digest("hex");

        const cFormData = new FormData();
        const blob = new Blob([fileBuffer], { type: mimeType });
        cFormData.append("file", blob, fileName);
        cFormData.append("api_key", apiKey);
        cFormData.append("timestamp", timestamp.toString());
        cFormData.append("signature", signature);
        cFormData.append("folder", "griham99_products");

        const cRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: cFormData,
          }
        );

        if (cRes.ok) {
          const cData = await cRes.json();
          if (cData.secure_url) {
            return NextResponse.json({
              success: true,
              source: "cloudinary",
              url: cData.secure_url,
            });
          }
        }
      } catch (cErr) {
        console.warn("Cloudinary upload failed, falling back to local:", cErr.message);
      }
    }

    // 5. Local Storage Fallback (/public/uploads)
    const ext = path.extname(fileName) || ".jpg";
    const uniqueName = `griham-${Date.now()}-${Math.random().toString(36).slice(2, 7)}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, uniqueName), fileBuffer);

    const publicUrl = `/uploads/${uniqueName}`;

    return NextResponse.json({
      success: true,
      source: "local",
      url: publicUrl,
    });
  } catch (err) {
    console.error("Admin upload error:", err);
    return NextResponse.json(
      { success: false, error: "Upload failed: " + err.message },
      { status: 500 }
    );
  }
}
