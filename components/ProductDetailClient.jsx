"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
import ProductCard from "@/components/ProductCard";
import { siteConfig } from "@/lib/config";
import { getOptimizedImageUrl } from "@/lib/cloudinary-helpers";

function ProductDetailContent({ product, relatedProducts = [] }) {
  const { addToCart, isInWishlist, toggleWishlist, language, showToast } = useShop();
  const [added, setAdded] = useState(false);

  // 1. DATA: Combine product.image and product.images, remove duplicates
  const allImages = Array.from(
    new Set([product.image, ...(product.images || [])].filter(Boolean))
  );
  if (allImages.length === 0) {
    allImages.push(
      "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=600&q=80"
    );
  }

  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active index when product id changes
  useEffect(() => {
    setActiveIndex(0);
  }, [product.id, product.productId, product._id]);

  const currentImage = allImages[activeIndex] || allImages[0];

  const prodId = product.id ?? product.productId ?? product._id;
  const inWishlist = isInWishlist(prodId);
  const savings = (product.originalPrice || 99) - product.price;
  const discountPct = Math.round((savings / (product.originalPrice || 99)) * 100);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappText = `Hello Griham 99+, I want to order "${product.name}" at ₹${product.price} (Product ID: ${prodId}). Please confirm delivery to Jaipur!`;
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#18201C]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumbs Navigation with Internal Linking */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-stone-500 font-medium">
            <li>
              <Link href="/" className="hover:text-[#073B2A] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/category/${product.category.toLowerCase()}`}
                className="capitalize hover:text-[#073B2A] transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-stone-800 font-bold truncate max-w-xs sm:max-w-md">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-5 sm:p-8 border border-[#E7E1D5] shadow-sm mb-12">
          {/* LEFT: Amazon / Flipkart Style Image Gallery (lg:col-span-6) WITHOUT Zoom */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm flex items-center justify-center">
              <img
                src={getOptimizedImageUrl(allImages[activeIndex] || currentImage, 800)}
                alt={`${product.name} at 99 rupees - Griham 99+`}
                width={800}
                height={800}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=800&q=75";
                }}
              />

              {/* Discount / Price / Bestseller Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                <span className="bg-[#073B2A] text-[#FCE59F] text-xs font-black px-2.5 py-1 rounded shadow">
                  ₹{product.price} FLAT
                </span>
                {discountPct > 0 && (
                  <span className="bg-[#C83214] text-white text-[11px] font-extrabold px-2 py-0.5 rounded shadow">
                    {discountPct}% OFF
                  </span>
                )}
                {product.bestseller && (
                  <span className="bg-[#FF6B00] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                    ★ BESTSELLER
                  </span>
                )}
              </div>

              {/* Image Counter Badge on Top-Right */}
              {allImages.length > 1 && (
                <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full font-bold pointer-events-none z-10">
                  {activeIndex + 1}/{allImages.length}
                </span>
              )}

              {/* Next / Prev Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === 0 ? allImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] w-11 h-11 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center text-gray-800 text-xl font-bold transition-all z-10"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => (prev + 1) % allImages.length)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] w-11 h-11 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center text-gray-800 text-xl font-bold transition-all z-10"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Row (Desktop & Mobile) - Centered */}
            {allImages.length > 1 && (
              <div className="flex gap-2.5 mt-3 justify-center overflow-x-auto scrollbar-none pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-all duration-200 bg-white ${
                      activeIndex === idx
                        ? "border-[#FF6B00] shadow-sm"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={getOptimizedImageUrl(img, 120)}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=120&q=75";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details & Actions (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>
                {product.bestseller && (
                  <span className="text-xs font-extrabold text-[#9A7B38] bg-[#FCE59F]/50 px-2.5 py-0.5 rounded-full">
                    ★ JAIPUR BESTSELLER
                  </span>
                )}
              </div>

              {/* Exact H1 for this page */}
              <h1 className="text-2xl sm:text-3xl font-black text-[#18201C] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Location Tag */}
              <div className="flex items-center gap-3 text-sm mb-4">
                <span className="flex items-center gap-1 font-extrabold text-[#073B2A] bg-[#073B2A]/10 px-2 py-0.5 rounded-md">
                  ★ {product.rating || 4.8}
                </span>
                <span className="text-stone-500 text-xs">
                  ({product.reviews || 120} Jaipur verified customer reviews)
                </span>
                <span className="text-emerald-700 text-xs font-bold ml-auto flex items-center gap-1">
                  ✓ In Stock (Tonk Phatak Store)
                </span>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E1D5] mb-6 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#073B2A]">
                  ₹{product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-stone-400 line-through text-lg font-medium">
                    MRP ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-emerald-700 font-extrabold text-xs sm:text-sm bg-emerald-100/70 px-2.5 py-1 rounded-full ml-auto">
                  Save ₹{savings} ({discountPct}% OFF)
                </span>
              </div>

              {/* Description */}
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Jaipur Delivery Highlights */}
              <div className="space-y-2 mb-6 p-4 rounded-xl bg-amber-50/60 border border-amber-200/50 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <span>⚡ Express Delivery in Jaipur:</span>
                  <span className="font-medium text-stone-700">Same-Day / Next-Day across all Jaipur pincodes.</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <span>🚚 Free Delivery:</span>
                  <span className="font-medium text-stone-700">On all Jaipur orders above ₹499.</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <span>💵 Payment:</span>
                  <span className="font-medium text-stone-700">Cash on Delivery (COD) & UPI accepted.</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-100">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 min-h-[48px] px-6 py-3 rounded-full font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all bg-[#073B2A] text-white hover:bg-[#0B4E38]"
              >
                <span>{added ? "Added to Cart ✓" : "Add to Cart"}</span>
              </motion.button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[48px] px-6 py-3 rounded-full font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all bg-[#25D366] text-white hover:brightness-105"
              >
                <span>💬 Order on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => toggleWishlist(prodId)}
                className={`min-h-[48px] min-w-[48px] rounded-full border flex items-center justify-center transition-all ${
                  inWishlist
                    ? "bg-[#FEEBE8] text-[#C83214] border-[#FEEBE8]"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
                title={inWishlist ? "In Wishlist" : "Add to Wishlist"}
              >
                ♥
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Table (Proper H2) */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E1D5] mb-12 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-[#073B2A] mb-4">
              Key Specifications & Quality Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {Object.entries(product.specs).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#E7E1D5]/60"
                >
                  <span className="text-stone-500 font-medium">{key}</span>
                  <span className="font-bold text-[#18201C] text-right">{val}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products Section (Proper H2) */}
        {relatedProducts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#073B2A]">
                  You May Also Like Under ₹99
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  More top-rated household finds in Jaipur
                </p>
              </div>
              <Link
                href={`/category/${product.category.toLowerCase()}`}
                className="text-xs sm:text-sm font-extrabold text-[#9A7B38] hover:underline"
              >
                View All {product.category} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((p, idx) => (
                <ProductCard key={p.id ?? p.productId} product={p} index={idx} />
              ))}
            </div>
          </section>
        )}
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

export default function ProductDetailClient({ product, relatedProducts }) {
  return (
    <ShopProvider>
      <ProductDetailContent product={product} relatedProducts={relatedProducts} />
    </ShopProvider>
  );
}
