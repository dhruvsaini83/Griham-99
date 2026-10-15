import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import { PRODUCTS as FALLBACK_PRODUCTS } from "@/data/products";
import { orderCreateSchema, sanitizeText } from "@/lib/validators";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

// POST /api/orders
// Hardened with Rate Limiting, Zod Schema Validation, NoSQL Injection prevention,
// and Server-side Price & Coupon Recalculation (Immunity against Price Tampering).
export async function POST(request) {
  try {
    // 1. RATE LIMITING: Max 10 order attempts per minute per IP
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`order_${clientIp}`, 10, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many order requests. Please wait a moment before trying again.",
          retryAfterMs: rateCheck.resetInMs,
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(rateCheck.resetInMs / 1000).toString(),
          },
        }
      );
    }

    // 2. INPUT VALIDATION & NOSQL INJECTION PREVENTION
    const rawBody = await request.json();
    const validationResult = orderCreateSchema.safeParse(rawBody);

    if (!validationResult.success) {
      const issueMsgs = validationResult.error.issues
        .map((iss) => `${iss.path.join(".")}: ${iss.message}`)
        .join("; ");

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed: " + issueMsgs,
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const {
      userMobile,
      userName,
      userEmail,
      items,
      couponCode,
      shippingAddress,
      paymentMode,
    } = validationResult.data;

    // Connect to database if configured
    const hasDb = Boolean(process.env.MONGODB_URI);
    if (hasDb) {
      await connectToDatabase();
    }

    // 3. SERVER-SIDE PRICE RECALCULATION (ANTI-PRICE TAMPERING)
    // Never trust client prices! Fetch each product from MongoDB / trusted catalogue.
    const verifiedOrderItems = [];
    let serverSubtotal = 0;

    for (const item of items) {
      let dbProduct = null;

      if (hasDb) {
        dbProduct = await Product.findOne({
          $or: [
            { productId: Number(item.productId) || 0 },
            { _id: item.productId.length === 24 ? item.productId : null },
          ],
        });
      }

      // Fallback lookup if DB is not populated or offline
      if (!dbProduct) {
        dbProduct = FALLBACK_PRODUCTS.find(
          (p) => String(p.id) === String(item.productId)
        );
      }

      if (!dbProduct) {
        return NextResponse.json(
          {
            success: false,
            error: `Product ID "${item.productId}" is not available or does not exist.`,
          },
          { status: 400 }
        );
      }

      const verifiedPrice = Number(dbProduct.price);
      const verifiedQty = Math.min(50, Math.max(1, Number(item.qty)));
      serverSubtotal += verifiedPrice * verifiedQty;

      verifiedOrderItems.push({
        productId: dbProduct.productId || dbProduct.id || dbProduct._id.toString(),
        name: sanitizeText(dbProduct.name),
        price: verifiedPrice,
        qty: verifiedQty,
        image: dbProduct.image || "",
      });
    }

    // 4. SERVER-SIDE COUPON VERIFICATION
    let serverDiscount = 0;
    if (couponCode) {
      const cleanCoupon = couponCode.trim().toUpperCase();
      if (cleanCoupon === "GRIHAM99" || cleanCoupon === "GRIHAM10") {
        serverDiscount = Math.round(serverSubtotal * 0.10); // 10% verified discount
      }
    }

    // 5. SERVER-SIDE SHIPPING CHARGE COMPUTATION
    const FREE_SHIPPING_THRESHOLD = 499;
    const serverShippingCharge =
      serverSubtotal >= FREE_SHIPPING_THRESHOLD || serverSubtotal === 0 ? 0 : 49;

    const serverTotalAmount = Math.max(
      0,
      serverSubtotal - serverDiscount + serverShippingCharge
    );

    // 6. GENERATE IMMUTABLE ORDER ID (GRHM-99-XXXX)
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `GRHM-99-${randomSuffix}`;

    // 7. SAVE TO DATABASE
    if (hasDb) {
      // Upsert User record with sanitized inputs
      try {
        await User.findOneAndUpdate(
          { mobile: sanitizeText(userMobile) },
          {
            $set: {
              name: sanitizeText(userName),
              email: sanitizeText(userEmail || ""),
            },
            $addToSet: {
              addresses: {
                house: sanitizeText(shippingAddress.house),
                street: sanitizeText(shippingAddress.street),
                landmark: sanitizeText(shippingAddress.landmark || ""),
                city: sanitizeText(shippingAddress.city),
                state: sanitizeText(shippingAddress.state),
                pincode: sanitizeText(shippingAddress.pincode),
              },
            },
          },
          { upsert: true, new: true }
        );
      } catch (userErr) {
        console.warn("User upsert warning:", userErr.message);
      }

      // Create Order
      const newOrder = await Order.create({
        orderId,
        userMobile: sanitizeText(userMobile),
        items: verifiedOrderItems,
        totalAmount: serverTotalAmount,
        subtotal: serverSubtotal,
        shippingCharge: serverShippingCharge,
        discount: serverDiscount,
        paymentMode,
        status: "Placed",
        shippingAddress: {
          fullName: sanitizeText(userName),
          house: sanitizeText(shippingAddress.house),
          street: sanitizeText(shippingAddress.street),
          landmark: sanitizeText(shippingAddress.landmark || ""),
          city: sanitizeText(shippingAddress.city),
          state: sanitizeText(shippingAddress.state),
          pincode: sanitizeText(shippingAddress.pincode),
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Verified order created successfully",
          orderId,
          order: newOrder,
        },
        { status: 201 }
      );
    }

    // Mock response if DB connection string is missing
    return NextResponse.json(
      {
        success: true,
        source: "mock_success",
        orderId,
        verifiedSubtotal: serverSubtotal,
        verifiedTotal: serverTotalAmount,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/orders:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}

// GET /api/orders
// Hardened with sanitized query parameters
export async function GET(request) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: false, error: "MONGODB_URI not configured." },
        { status: 500 }
      );
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const orderIdParam = searchParams.get("orderId");
    const mobileParam = searchParams.get("mobile");

    const query = {};
    if (orderIdParam) {
      query.orderId = sanitizeText(orderIdParam);
    }
    if (mobileParam) {
      query.userMobile = sanitizeText(mobileParam);
    }

    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(50);

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
