"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShopProvider, useShop } from "@/context/ShopContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import CheckoutModal from "@/components/CheckoutModal";
import PincodeModal from "@/components/PincodeModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import ToastContainer from "@/components/ToastContainer";
import { siteConfig } from "@/lib/config";

function ContactContent() {
  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast("Please enter your name and phone number");
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast("Thank you! Your message has been sent to our Jaipur team.");
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hi Griham 99+ Jaipur! My name is ${formData.name || "Customer"}. I have a query: ${formData.message || "I would like to enquire about your products & store."}`;
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#18201C]">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
        {/* Breadcrumb */}
        <nav className="text-xs text-stone-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#FF6B00]">Home</Link>
          <span>/</span>
          <span className="text-stone-800 font-bold">Contact Us</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-3 py-1 bg-orange-100 text-[#FF6B00] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Jaipur Store & Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#073B2A] tracking-tight">
            Get in Touch with Griham 99+
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Visit our physical store in Barkat Nagar, Tonk Phatak, or message us directly on WhatsApp for swift answers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Col 1: Store Address & Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E1D5] shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#073B2A] mb-1">
                Griham 99 Store (गृहम 99)
              </h2>
              <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Apka Apna Ghar Ka Store &bull; Jaipur, Rajasthan
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <div className="font-bold text-stone-900">Physical Store Address</div>
                  <div className="text-stone-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {siteConfig.address.fullAddress}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1">
                    Serving Jaipur Pincodes: 302012, 302015, Tonk Phatak, Barkat Nagar, and surrounding Jaipur localities.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">⏰</span>
                <div>
                  <div className="font-bold text-stone-900">Store Timings</div>
                  <div className="text-stone-600 text-xs sm:text-sm mt-0.5">
                    {siteConfig.storeHours}
                  </div>
                  <div className="text-[11px] text-[#073B2A] font-semibold mt-0.5">
                    {siteConfig.storeHoursHindi}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <div className="font-bold text-stone-900">Phone Helpline</div>
                  <a
                    href={`tel:${siteConfig.supportPhoneTel}`}
                    className="text-stone-600 hover:text-[#FF6B00] text-xs sm:text-sm font-semibold underline block mt-0.5"
                  >
                    {siteConfig.supportPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">✉️</span>
                <div>
                  <div className="font-bold text-stone-900">Email Support</div>
                  <a
                    href={`mailto:${siteConfig.supportEmail}`}
                    className="text-stone-600 hover:text-[#FF6B00] text-xs sm:text-sm font-semibold underline block mt-0.5"
                  >
                    {siteConfig.supportEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
              <a
                href={siteConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-primary flex-1 min-h-[44px] flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-center"
              >
                <span>🗺️ Get Directions on Map</span>
              </a>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="whatsapp-order-btn flex-1 min-h-[44px] flex items-center justify-center gap-2 text-xs sm:text-sm font-bold"
              >
                <span>💬 Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Col 2: Send Message Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E1D5] shadow-sm">
            <h2 className="text-xl font-bold text-[#073B2A] mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Have questions about product availability or bulk Jaipur orders? Leave your message below.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-bold text-emerald-900 text-base">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-800">
                  Dhanyawad! Our Jaipur store team will get back to you on your mobile number within 2 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", phone: "", email: "", message: "" });
                  }}
                  className="text-xs font-bold text-[#073B2A] underline hover:text-[#C9A24A]"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control min-h-[44px] text-sm"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    10-Digit Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[6-9][0-9]{9}"
                    className="form-control min-h-[44px] text-sm"
                    placeholder="e.g. 98290XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    className="form-control min-h-[44px] text-sm"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Message / Product Query <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="form-control text-sm"
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gold-primary min-h-[48px] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <span>Submit Message →</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <PincodeModal />
      <WhatsAppButton />
      <ToastContainer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <ShopProvider>
      <ContactContent />
    </ShopProvider>
  );
}
