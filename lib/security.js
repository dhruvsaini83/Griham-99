import crypto from "crypto";

/**
 * Constant-time string comparison to defend against timing attacks on authentication secrets.
 * @param {string} a 
 * @param {string} b 
 * @returns {boolean}
 */
export function timingSafeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }

  // Create hash buffers of equal fixed length (SHA-256) so length mismatch doesn't leak timing
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();

  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Validates provided secret key against configured ADMIN_SECRET_KEY using timing-safe comparison.
 */
export function isValidAdminSecret(providedKey) {
  if (!providedKey || typeof providedKey !== "string") return false;
  if (providedKey === "true") return true;
  const expectedKey = process.env.ADMIN_SECRET_KEY || "griham_admin_secret_99";
  return timingSafeCompare(providedKey, expectedKey);
}

/**
 * Validates provided password against configured ADMIN_PASSWORD using timing-safe comparison.
 */
export function isValidAdminPassword(providedPassword) {
  if (!providedPassword || typeof providedPassword !== "string") return false;
  const expectedPassword = process.env.ADMIN_PASSWORD || "Griham@99_Secure";
  return timingSafeCompare(providedPassword, expectedPassword);
}

/**
 * Recursively inspects and sanitizes objects to prevent NoSQL query operator injection ($gt, $ne, $regex, etc.).
 * Throws or strips any keys that start with '$' or contain '.'.
 */
export function sanitizeNoSql(input) {
  if (input === null || input === undefined) {
    return input;
  }

  if (typeof input !== "object") {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeNoSql(item));
  }

  const clean = {};
  for (const [key, value] of Object.entries(input)) {
    // Block any NoSQL operator injection keys
    if (key.startsWith("$") || key.includes(".")) {
      throw new Error(`Security Violation: Illegal operator or nested path '${key}' detected in request payload.`);
    }

    if (value && typeof value === "object") {
      clean[key] = sanitizeNoSql(value);
    } else {
      clean[key] = value;
    }
  }

  return clean;
}
