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
  title: "Privacy Policy | Griham 99+ Jaipur",
  description:
    "Privacy Policy of Griham 99+ Jaipur. Learn how we handle your order information, delivery addresses, and WhatsApp communications safely and securely.",
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#18201C]">
        <Header />

        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
          {/* Breadcrumb */}
          <nav className="text-xs text-stone-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#FF6B00]">Home</Link>
            <span>/</span>
            <span className="text-stone-800 font-bold">Privacy Policy</span>
          </nav>

          <article className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E7E1D5] shadow-sm space-y-8">
            <header className="border-b border-stone-200 pb-6">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-[#073B2A] border border-emerald-200 text-xs font-bold rounded-full mb-3">
                Legal & Compliance &bull; India
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#073B2A] tracking-tight">
                Privacy Policy — Griham 99+
              </h1>
              <p className="text-xs text-stone-500 mt-2">
                Last Updated: {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })} &bull; Applicable Jurisdiction: Jaipur, Rajasthan, India
              </p>
            </header>

            <section className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-700">
              <p>
                Welcome to <strong>Griham 99+ (गृहम 99+)</strong>, having its retail presence and administrative store located at{" "}
                <em>{siteConfig.address.fullAddress}</em>. We deeply value your privacy and trust. This Privacy Policy outlines our transparent policies regarding the collection, use, protection, and disclosure of personal data when you interact with our website (<strong>{siteConfig.url}</strong>), place orders for home decor, pooja essentials, and kitchen finds, or communicate via our WhatsApp dispatch hotline.
              </p>
              <p>
                By visiting our store website or placing an order, you agree to the collection and use of information in accordance with this policy and Indian Information Technology (IT) Act, 2000, along with the Digital Personal Data Protection (DPDP) Act.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">1. Information We Collect</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                We only collect essential details strictly necessary to process your purchase and deliver orders safely to your doorstep:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-stone-700">
                <li><strong>Contact Information:</strong> Full name, 10-digit mobile phone number, and email address.</li>
                <li><strong>Delivery Details:</strong> Flat / House number, street name, landmark, city, state, and 6-digit postal PIN code (e.g., 302012, 302015, and other Jaipur locations).</li>
                <li><strong>Order & Cart Data:</strong> Selected items, order total, quantities, coupon codes applied (e.g., GRIHAM99), and delivery preferences.</li>
                <li><strong>Technical Diagnostics:</strong> IP address, browser type, device information, and anonymous session cookies to provide cart persistence and prevent unauthorized access.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">2. How We Use Your Information</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Your data is exclusively utilized for legitimate retail purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-stone-700">
                <li>Processing, packing, and dispatching your requested products.</li>
                <li>Real-time order confirmation, tracking updates, and delivery status via official WhatsApp or SMS.</li>
                <li>Validating delivery pincodes for Cash on Delivery (COD) and free shipping thresholds.</li>
                <li>Providing responsive customer support for queries, returns, or replacements.</li>
                <li>Preventing fraudulent transactions and ensuring store security.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">3. Data Sharing & Non-Disclosure</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                <strong>We strictly NEVER sell, rent, or trade your personal information to any third parties or marketing agencies.</strong> Your delivery information is shared only with verified local courier and delivery agents directly assigned to complete your doorstep delivery in Jaipur and India.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">4. WhatsApp Communication Consent</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                When you initiate an order through our WhatsApp order button or enter your mobile number at checkout, you consent to receive direct transactional order messages, delivery notifications, and customer support queries via WhatsApp. You can opt out at any time by messaging &ldquo;STOP&rdquo; on our support line.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">5. Data Security & Storage</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                We implement strict security practices including TLS/HTTPS encryption across all web traffic, timing-safe authorization tokens, and enterprise-grade MongoDB Atlas cloud storage to protect your data from unauthorized access, alteration, or disclosure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#073B2A]">6. Grievance Redressal & Contact Info</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                In compliance with the Information Technology Act 2000 and consumer protection rules, for any questions, privacy concerns, or requests to delete your personal information, please contact our Grievance Officer:
              </p>
              <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E7E1D5] text-xs sm:text-sm space-y-1.5 text-stone-800">
                <p><strong>Store Name:</strong> Griham 99+ (गृहम 99+ Store)</p>
                <p><strong>Grievance Officer:</strong> Customer Care Lead</p>
                <p><strong>Address:</strong> {siteConfig.address.fullAddress}</p>
                <p><strong>Phone / WhatsApp:</strong> {siteConfig.supportPhone} ({siteConfig.supportHours})</p>
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
