import React from "react";
import Link from "next/link";
import { ShopProvider } from "@/context/ShopContext";
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

export const metadata = {
  title: "Return & Refund Policy | Griham 99+ Jaipur",
  description:
    "7-day easy returns and replacement policy for home decor and kitchen items from Griham 99+ Jaipur. Fast resolution via WhatsApp support.",
  alternates: {
    canonical: `${siteConfig.url}/return-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReturnPolicyPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#18201C]">
        <Header />

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
          {/* Breadcrumb */}
          <nav className="text-xs text-stone-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#FF6B00]">Home</Link>
            <span>/</span>
            <span className="text-stone-800 font-bold">Return & Refund Policy</span>
          </nav>

          <article className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E7E1D5] shadow-sm space-y-8">
            <header className="border-b border-stone-200 pb-6">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full mb-3">
                7-Day Hassle-Free Returns &bull; Jaipur Support
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#073B2A] tracking-tight">
                Return & Refund Policy — Griham 99+
              </h1>
              <p className="text-xs text-stone-500 mt-2">
                Last Updated: {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })} &bull; Customer First Commitment
              </p>
            </header>

            <section className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-700">
              <p>
                At <strong>Griham 99+ (गृहम 99+)</strong>, customer satisfaction is our top priority. We carefully inspect every home organizer, kitchen item, toran, and diya before packing. However, in the rare event that an item reaches you in a damaged, defective, or incorrect state, we provide an easy, customer-friendly <strong>7-Day Return and Replacement Window</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">1. Return Eligibility Window</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                You may request a replacement or return within <strong>7 calendar days</strong> from the date your parcel was delivered:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-stone-700">
                <li><strong>Damaged in Transit:</strong> Item arrived broken, cracked, or physically damaged.</li>
                <li><strong>Manufacturing Defect:</strong> Lids do not seal, missing components, or defective mechanism.</li>
                <li><strong>Incorrect Item:</strong> The product received differs from what was ordered on your invoice.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">2. Easy 3-Step WhatsApp Return Process</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                We believe in zero-hassle resolutions without tedious paperwork:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-stone-700">
                <li>
                  <strong>Snap a Photo/Video:</strong> Take a clear photo or short video showing the damaged or incorrect item along with the parcel shipping label.
                </li>
                <li>
                  <strong>Message our WhatsApp Support:</strong> Send the photo and your Order ID (e.g. GRHM-99-XXXX) to our official WhatsApp line: <strong>+91 93524 56169</strong>.
                </li>
                <li>
                  <strong>Instant Resolution:</strong> Our Jaipur customer care team will verify the details within 2–4 hours and immediately initiate a free doorstep replacement or direct UPI refund.
                </li>
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">3. Refunds & Mode of Payment</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Once approved, refunds are processed promptly:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-stone-700">
                <li><strong>UPI Orders:</strong> Refund credited directly back to your source Google Pay, PhonePe, or Paytm account within 24 hours.</li>
                <li><strong>COD Orders:</strong> Refund transferred directly to your provided UPI ID or bank account within 24–48 hours after pick-up verification.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">4. Items Ineligible for Return</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Items used extensively after delivery, items returned without original retail tags or boxes, or requests placed after the 7-day period cannot be accepted for refund.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">5. Contact for Returns</h2>
              <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E7E1D5] text-xs sm:text-sm space-y-1 text-stone-800">
                <p><strong>Returns Department:</strong> Griham 99+ Support Desk</p>
                <p><strong>Store Address:</strong> {siteConfig.address.fullAddress}</p>
                <p><strong>WhatsApp Support:</strong> +91 93524 56169 (10 AM &ndash; 9 PM)</p>
                <p><strong>Email:</strong> <a href={`mailto:${siteConfig.supportEmail}`} className="text-[#FF6B00] underline">{siteConfig.supportEmail}</a></p>
              </div>
            </section>
          </article>
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
    </ShopProvider>
  );
}
