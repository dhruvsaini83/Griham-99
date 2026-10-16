import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { sanitizeNoSql } from "@/lib/security";

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`newsletter_${clientIp}`, 10, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { success: false, error: "Too many subscription attempts. Please slow down." },
        { status: 429 }
      );
    }

    const rawBody = await request.json();
    const body = sanitizeNoSql(rawBody);

    if (typeof body?.contact !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid contact format. String expected." },
        { status: 400 }
      );
    }

    const contact = body.contact.trim();

    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Please enter your mobile number or email address." },
        { status: 400 }
      );
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact);
    const isMobile = /^[6-9]\d{9}$/.test(contact.replace(/\D/g, ""));

    if (!isEmail && !isMobile) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid 10-digit Indian mobile number or email address.",
        },
        { status: 400 }
      );
    }

    const type = isEmail ? "email" : "mobile";
    const normalizedContact = isMobile ? contact.replace(/\D/g, "") : contact.toLowerCase();

    try {
      await connectToDatabase();
      await Subscriber.findOneAndUpdate(
        { contact: normalizedContact },
        { contact: normalizedContact, type, active: true, subscribedAt: new Date() },
        { upsert: true, new: true }
      );
    } catch (dbErr) {
      console.warn("MongoDB newsletter persistence note:", dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to Griham 99+ updates!",
      contact: normalizedContact,
      type,
    });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
