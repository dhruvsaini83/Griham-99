import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { sanitizeText } from "@/lib/validators";

// GET /api/pincode/[code]
// Validates 6-digit Indian PIN codes with rate limiting
export async function GET(request, { params }) {
  try {
    // Rate limit: 30 pincode lookups per minute per IP
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`pin_${clientIp}`, 30, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { success: false, error: "Too many pincode requests. Please slow down." },
        { status: 429 }
      );
    }

    const cleanPin = sanitizeText(params.code || "");

    if (!cleanPin || cleanPin.length !== 6 || !/^[1-9][0-9]{5}$/.test(cleanPin)) {
      return NextResponse.json(
        {
          success: false,
          deliverable: false,
          error: "Invalid Indian PIN code format. Must be 6 digits starting with 1-9.",
        },
        { status: 400 }
      );
    }

    // Rules: Deliverable if starts with 1, 2, 3, or 30 (Shiprocket / courier hub serviceable)
    const isDeliverable =
      cleanPin.startsWith("1") ||
      cleanPin.startsWith("2") ||
      cleanPin.startsWith("3") ||
      cleanPin.startsWith("30");

    if (isDeliverable) {
      return NextResponse.json({
        success: true,
        pincode: cleanPin,
        deliverable: true,
        estimatedDays: "2-3 Business Days",
        codAvailable: true,
        courierPartner: "Delhivery / BlueDart (Shiprocket Ready)",
        message:
          "✓ Delivery in 2-3 business days. Cash on Delivery (COD) available.",
      });
    }

    return NextResponse.json({
      success: true,
      pincode: cleanPin,
      deliverable: false,
      message:
        "Delivery is currently not available to this pincode. Please contact us on WhatsApp for special courier.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
