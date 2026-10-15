import { z } from "zod";
import { MAX_ITEM_QUANTITY } from "./config";

/**
 * Sanitizes input text to prevent XSS / HTML injection
 */
export function sanitizeText(input) {
  if (typeof input !== "string") return input;
  return input
    .replace(/[<>]/g, "") // Strip raw tags
    .trim();
}

// 10-digit Indian mobile regex starting with 6, 7, 8, or 9
export const indianMobileRegex = /^[6-9]\d{9}$/;

// 6-digit Indian PIN code regex
export const indianPincodeRegex = /^[1-9][0-9]{5}$/;

/**
 * Zod Schema for Order Creation (POST /api/orders)
 * NOTE: Notice we do NOT trust totalAmount or item price from the client.
 * The client only supplies productId and qty. Price is computed on server.
 */
export const orderCreateSchema = z.object({
  userMobile: z
    .string()
    .trim()
    .regex(
      indianMobileRegex,
      "Please enter a valid 10-digit Indian mobile number starting with 6-9."
    ),
  userName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(100, "Full name cannot exceed 100 characters."),
  userEmail: z
    .string()
    .trim()
    .email("Invalid email address format.")
    .optional()
    .or(z.literal("")),
  items: z
    .array(
      z.object({
        productId: z.union([z.number(), z.string()]),
        qty: z
          .number()
          .int()
          .min(1, "Quantity must be at least 1")
          .max(MAX_ITEM_QUANTITY, `Maximum ${MAX_ITEM_QUANTITY} units allowed per item`),
      })
    )
    .min(1, "Cart must contain at least 1 item."),
  couponCode: z.string().trim().toUpperCase().optional().or(z.literal("")),
  paymentMode: z
    .string()
    .trim()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(["COD", "UPI", "CARD"]))
    .default("COD"),
  shippingAddress: z.object({
    fullName: z.string().trim().min(3).max(100).optional(),
    house: z
      .string()
      .trim()
      .min(3, "Flat/House details must be at least 3 characters.")
      .max(200),
    street: z
      .string()
      .trim()
      .min(3, "Street/Area details must be at least 3 characters.")
      .max(200),
    landmark: z.string().trim().max(150).optional().or(z.literal("")),
    city: z.string().trim().min(2, "City name is required.").max(100),
    state: z.string().trim().min(2, "State name is required.").max(100),
    pincode: z
      .string()
      .trim()
      .regex(indianPincodeRegex, "Please enter a valid 6-digit Indian PIN code."),
  }),
});

/**
 * Zod Schema for Product Creation (POST /api/products)
 */
export const productCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters.")
    .max(250),
  price: z.number().min(0, "Price cannot be negative"),
  originalPrice: z.number().min(0, "Original price cannot be negative").optional(),
  category: z
    .string()
    .trim()
    .min(2, "Category is required.")
    .max(50),
  image: z.string().trim().url("Primary image must be a valid URL"),
  images: z.array(z.string().trim().url()).optional().default([]),
  description: z.string().trim().max(2000).optional().default(""),
  stock: z.number().int().min(0).optional().default(50),
  bestseller: z.boolean().optional().default(false),
  tag: z.string().trim().max(50).optional().default(""),
  specs: z.record(z.string()).optional().default({}),
});

/**
 * Zod Schema for Pincode validation
 */
export const pincodeCheckSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(indianPincodeRegex, "Must be a valid 6-digit Indian PIN code"),
});
