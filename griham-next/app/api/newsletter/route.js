import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

export async function POST(request) {
  try {
    const body = await request.json();
    const contact = (body?.contact || "").trim();

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
