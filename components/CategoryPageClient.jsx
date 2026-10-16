"use client";

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
import ProductCard from "@/components/ProductCard";

function CategoryContent({ categoryKey, title, descriptionText, products = [] }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#18201C]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 font-medium">
            <li>
              <Link href="/" className="hover:text-[#073B2A] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <span className="text-stone-400">Categories</span>
            </li>
            <li>/</li>
            <li className="text-stone-800 font-bold capitalize">{title}</li>
          </ol>
        </nav>

        {/* Category Header Hero */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E1D5] shadow-sm mb-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#C9A24A]/20 text-[#073B2A] border border-[#C9A24A]/30 mb-3">
              ₹99 VALUE CATALOG • JAIPUR STORE
            </span>
            {/* Single H1 for Category Page */}
            <h1 className="text-2xl sm:text-4xl font-black text-[#073B2A] mb-4">
              {title} Under ₹99 in Jaipur
            </h1>
            {/* 100+ Words Unique Rich SEO Description */}
            <div className="text-stone-600 text-sm sm:text-base leading-relaxed space-y-3">
              <p>{descriptionText}</p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm font-bold text-stone-700">
                <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  ✓ Free Delivery on ₹499+ in Jaipur
                </span>
                <span className="flex items-center gap-1.5 text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  ✓ Cash on Delivery (COD) Available
                </span>
                <span className="flex items-center gap-1.5 text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  ✓ Same-Day / Next-Day Dispatch
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Products Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#073B2A]">
              Showing {products.length} Products Under ₹99
            </h2>
            <Link
              href="/"
              className="text-xs sm:text-sm font-extrabold text-[#9A7B38] hover:underline"
            >
              &larr; Back to Full Catalog
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {products.map((product, idx) => (
                <ProductCard
                  key={product.id ?? product.productId ?? product._id}
                  product={product}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E7E1D5]">
              <p className="text-lg font-bold text-stone-700 mb-4">
                More products are arriving this week in this category!
              </p>
              <Link
                href="/"
                className="btn-gold-primary px-6 py-2.5 rounded-full font-bold inline-block"
              >
                Explore Other Categories
              </Link>
            </div>
          )}
        </section>
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

export default function CategoryPageClient(props) {
  return (
    <ShopProvider>
      <CategoryContent {...props} />
    </ShopProvider>
  );
}
