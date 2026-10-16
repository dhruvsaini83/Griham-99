/**
 * File Upload Security Hardening
 * Whitelist: JPEG, PNG, WEBP only
 * Maximum file size: 5MB
 * Explicit blocklist against all executables and active scripts
 */

export const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

export const FORBIDDEN_EXTENSIONS = new Set([
  ".exe", ".bat", ".cmd", ".sh", ".bash", ".bin",
  ".js", ".mjs", ".cjs", ".ts", ".jsx", ".tsx",
  ".php", ".phtml", ".py", ".rb", ".pl", ".cgi",
  ".asp", ".aspx", ".jsp", ".jspx",
  ".svg", ".html", ".htm", ".xhtml", ".xml", // block SVG/HTML to prevent stored XSS
  ".jar", ".war", ".msi", ".dll", ".so", ".dylib",
  ".vbs", ".ps1", ".psm1",
]);

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Validates file buffer and metadata against security constraints
 * @param {Object} params
 * @param {string} params.filename - Original file name
 * @param {string} params.mimeType - Declared MIME type
 * @param {number} params.size - File size in bytes
 * @param {Buffer} [params.buffer] - Raw file buffer for magic bytes inspection
 */
export function validateUploadFile({ filename, mimeType, size, buffer }) {
  if (!filename || typeof filename !== "string") {
    return { valid: false, error: "Invalid filename." };
  }

  // 1. File Size Verification (Max 5MB)
  if (!size || size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the maximum allowed limit of 5MB (${(size / (1024 * 1024)).toFixed(2)}MB uploaded).`,
    };
  }

  // 2. Extension Verification
  const cleanFilename = filename.toLowerCase().trim();
  const lastDotIndex = cleanFilename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return { valid: false, error: "File must have an image extension (.jpg, .png, .webp)." };
  }

  const ext = cleanFilename.slice(lastDotIndex);

  // Check forbidden executable / script extensions
  if (FORBIDDEN_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `Security Violation: Executable or active script upload (${ext}) is strictly prohibited.`,
    };
  }

  // Whitelist check
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return {
      valid: false,
      error: `Unsupported file extension (${ext}). Only .jpg, .jpeg, .png, and .webp images are allowed.`,
    };
  }

  // 3. MIME Type Whitelist
  const normalizedMime = (mimeType || "").toLowerCase().trim();
  if (!ALLOWED_MIME_TYPES.has(normalizedMime)) {
    return {
      valid: false,
      error: `Invalid file MIME type (${normalizedMime}). Only JPEG, PNG, and WebP images are permitted.`,
    };
  }

  // 4. Magic Bytes Inspection (if buffer provided)
  if (buffer && buffer.length >= 4) {
    const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
    const isWebp =
      buffer.length >= 12 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP";

    if (!isJpeg && !isPng && !isWebp) {
      return {
        valid: false,
        error: "Corrupted or spoofed image detected: File magic header does not match declared image type.",
      };
    }
  }

  return { valid: true };
}
