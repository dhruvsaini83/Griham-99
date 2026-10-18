import crypto, { timingSafeEqual } from "crypto";

/**
 * Constant-time string comparison to defend against timing attacks
 */
export function timingSafeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }
  const trimmedA = a.trim();
  const trimmedB = b.trim();
  if (trimmedA === "" || trimmedB === "") return false;
  try {
    const bufA = Buffer.from(trimmedA);
    const bufB = Buffer.from(trimmedB);
    return timingSafeEqual(bufA, bufB) && bufA.length === bufB.length;
  } catch {
    return false;
  }
}

/**
 * Validates provided secret key against configured ADMIN_SECRET_KEY
 * Timing-safe comparison with strict validation and no hardcoded backdoor fallbacks
 */
export function isValidAdminSecret(providedKey) {
  if (!providedKey || typeof providedKey !== "string") return false;
  const trimmed = providedKey.trim();
  if (trimmed === "" || trimmed === "true" || trimmed === "false") return false;
  const expected = process.env.ADMIN_SECRET_KEY;
  if (!expected) return false;
  // Use timing-safe comparison
  try {
    return (
      timingSafeEqual(Buffer.from(trimmed), Buffer.from(expected)) &&
      trimmed.length === expected.length
    );
  } catch {
    // Fallback for length mismatch
    return false;
  }
}

/**
 * Validates provided password against configured ADMIN_PASSWORD
 * Timing-safe comparison with strict validation and no hardcoded backdoor fallbacks
 */
export function isValidAdminPassword(providedPassword) {
  if (!providedPassword || typeof providedPassword !== "string") return false;
  const trimmed = providedPassword.trim();
  if (trimmed === "" || trimmed === "true" || trimmed === "false") return false;
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Use timing-safe comparison
  try {
    return (
      timingSafeEqual(Buffer.from(trimmed), Buffer.from(expected)) &&
      trimmed.length === expected.length
    );
  } catch {
    // Fallback for length mismatch
    return false;
  }
}

/**
 * Recursively inspects and sanitizes objects to prevent NoSQL injection
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
    if (key.startsWith("$") || key.includes(".")) {
      throw new Error(`Security Violation: Illegal operator '${key}' detected.`);
    }
    if (value && typeof value === "object") {
      clean[key] = sanitizeNoSql(value);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}