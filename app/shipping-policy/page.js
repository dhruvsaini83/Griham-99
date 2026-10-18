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
  title: "Shipping & Delivery Policy | Griham 99+ Jaipur",
  description:
    "Fast and transparent delivery policy by Griham 99+. Free delivery in Jaipur on orders above ₹499. Cash on Delivery (COD) available across Jaipur.",
  alternates: {
    canonical: `${siteConfig.url}/shipping-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShippingPolicyPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#18201C]">
        <Header />

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
          {/* Breadcrumb */}
          <nav className="text-xs text-stone-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#FF6B00]">Home</Link>
            <span>/</span>
            <span className="text-stone-800 font-bold">Shipping Policy</span>
          </nav>

          <article className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E7E1D5] shadow-sm space-y-8">
            <header className="border-b border-stone-200 pb-6">
              <span className="inline-block px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold rounded-full mb-3">
                Speedy Doorstep Delivery &bull; Jaipur & India
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#073B2A] tracking-tight">
                Shipping & Delivery Policy — Griham 99+
              </h1>
              <p className="text-xs text-stone-500 mt-2">
                Last Updated: {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })} &bull; Fast Local Dispatch
              </p>
            </header>

            <section className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-700">
              <p>
                At <strong>Griham 99+ (गृहम 99+)</strong>, we are committed to delivering your household essentials, handcrafted decor, and daily organizers quickly, safely, and economically. All orders are packed with care directly from our Jaipur physical store and dispatched through verified courier partners.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">1. Free Delivery & Shipping Rates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-sm font-bold text-emerald-900">Orders ₹499 and Above</div>
                  <div className="text-2xl font-black text-[#073B2A] mt-1">FREE DELIVERY 🎉</div>
                  <p className="text-xs text-emerald-800 mt-1">
                    Applicable on all orders in Jaipur and serviceable Indian PIN codes.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="text-sm font-bold text-amber-900">Orders Under ₹499</div>
                  <div className="text-2xl font-black text-amber-950 mt-1">Flat ₹49 Only</div>
                  <p className="text-xs text-amber-800 mt-1">
                    Standard flat shipping fee to cover careful packaging and local courier transit.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">2. Delivery Timelines</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-stone-700">
                <li>
                  <strong>Jaipur Local Deliveries (302012, 302015, Tonk Phatak, Barkat Nagar, Malviya Nagar, Mansarovar, etc.):</strong>{" "}
                  Usually delivered within <strong>24 to 48 hours</strong>.
                </li>
                <li>
                  <strong>Rajasthan & Neighboring States:</strong> Usually delivered within <strong>2 to 4 business days</strong>.
                </li>
                <li>
                  <strong>Rest of India:</strong> Dispatched via reliable express couriers within 3 to 6 business days.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">3. Cash on Delivery (COD) Rules</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Cash on Delivery (COD) is supported for verified pincodes. For high-value orders, our support team may contact you via WhatsApp or phone call prior to dispatch to confirm availability and avoid failed delivery attempts.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">4. Real-Time Tracking & WhatsApp Updates</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                As soon as your parcel is packed, you will receive a dispatch notification on your registered WhatsApp number with courier tracking details or local delivery associate contact details.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">5. Shipping Queries & Support</h2>
              <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E7E1D5] text-xs sm:text-sm space-y-1 text-stone-800">
                <p><strong>Fulfillment Center:</strong> {siteConfig.address.fullAddress}</p>
                <p><strong>Helpline:</strong> {siteConfig.supportPhone}</p>
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
