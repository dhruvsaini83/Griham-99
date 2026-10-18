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
  title: "Terms and Conditions | Griham 99+ Jaipur",
  description:
    "Terms and Conditions governing purchase, pricing in INR, Cash on Delivery, and delivery of home decor and kitchen items from Griham 99+ Jaipur.",
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#18201C]">
        <Header />

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
          {/* Breadcrumb */}
          <nav className="text-xs text-stone-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#FF6B00]">Home</Link>
            <span>/</span>
            <span className="text-stone-800 font-bold">Terms & Conditions</span>
          </nav>

          <article className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E7E1D5] shadow-sm space-y-8">
            <header className="border-b border-stone-200 pb-6">
              <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full mb-3">
                Legal Agreement &bull; Indian Consumer Protection
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#073B2A] tracking-tight">
                Terms and Conditions — Griham 99+
              </h1>
              <p className="text-xs text-stone-500 mt-2">
                Effective Date: {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })} &bull; Governing Law: Courts of Jaipur, Rajasthan, India
              </p>
            </header>

            <section className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-700">
              <p>
                These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (the &ldquo;Customer&rdquo; or &ldquo;User&rdquo;) and <strong>Griham 99+ (गृहम 99+)</strong>, operating from <em>{siteConfig.address.fullAddress}</em>, regarding your access to and use of our online storefront (<strong>{siteConfig.url}</strong>) and our WhatsApp order booking services.
              </p>
              <p>
                By placing an order, browsing our catalog, or interacting with our services, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Indian e-commerce consumer laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">1. Honest Pricing & Product Information</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                All prices displayed across Griham 99+ are stated in Indian Rupees (₹ / INR) and inclusive of all applicable taxes. We are committed to absolute price honesty:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-stone-700">
                <li>Featured items in our value collections start at ₹49 and ₹99 with transparent discounts and honest MRP values.</li>
                <li>There are no hidden convenience fees or unannounced checkout surcharges.</li>
                <li>Product photographs represent real handcrafted items, home organizers, and decor; slight handcrafted color or dimensional variations may naturally occur in clay diyas and fabric torans.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">2. Order Placement & Confirmation</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Orders can be placed directly on our web portal or via our direct WhatsApp order dispatch channel. An order is deemed accepted once our team verifies stock availability and shares a confirmed Order ID (e.g., GRHM-99-XXXX) with dispatch estimates. Griham 99+ reserves the right to decline or cancel orders due to stock unavailability or incorrect delivery addresses.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">3. Payment Terms & Cash on Delivery (COD)</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                We accept multiple secure payment methods to make shopping seamless:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-stone-700">
                <li><strong>UPI:</strong> Instant payment via Google Pay, PhonePe, Paytm, BHIM, or any UPI application.</li>
                <li><strong>Cash on Delivery (COD):</strong> Available across Jaipur and serviceable Indian PIN codes. Customers choosing COD agree to pay the exact invoice amount upon doorstep arrival of their parcel.</li>
                <li><strong>Debit & Credit Cards:</strong> Secure processing via RuPay, Visa, and MasterCard through verified payment gateways.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">4. Shipping & Delivery</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Delivery timelines and fees are clearly displayed prior to checkout:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-stone-700">
                <li><strong>Free Delivery:</strong> Orders exceeding ₹499 qualify for 100% Free Shipping in Jaipur and serviceable regions.</li>
                <li><strong>Standard Delivery:</strong> Orders below ₹499 incur a flat fee of ₹49.</li>
                <li><strong>Turnaround:</strong> Jaipur local deliveries typically reach doorsteps within 24–48 hours. Regional deliveries take 2–4 business days.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">5. Promotional Coupons</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Promotional discount codes (such as <strong>GRIHAM99</strong>) are subject to specific campaign rules, cannot be exchanged for cash, and apply once per eligible checkout session.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">6. Governing Law & Dispute Resolution</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                These terms shall be governed by and interpreted in accordance with the laws of India. Any legal dispute, claim, or proceeding arising under or in connection with Griham 99+ shall be subject exclusively to the jurisdiction of the competent courts in <strong>Jaipur, Rajasthan, India</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">7. Contact & Support</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                For questions regarding these Terms, contact our Jaipur store team:
              </p>
              <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E7E1D5] text-xs sm:text-sm space-y-1 text-stone-800">
                <p><strong>Store Address:</strong> {siteConfig.address.fullAddress}</p>
                <p><strong>Customer Helpline:</strong> {siteConfig.supportPhone}</p>
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
