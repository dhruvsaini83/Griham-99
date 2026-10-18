"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { luxuryEase } from "@/lib/animations";
import { getOptimizedImageUrl } from "@/lib/cloudinary-helpers";

const ProductCard = React.forwardRef(function ProductCard({ product, index = 0 }, ref) {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    cart,
    updateCartQuantity,
    openQuickView,
    showToast,
    language,
  } = useShop();

  const [addedAnimation, setAddedAnimation] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const prodId = product.id ?? product.productId ?? product._id;
  const inWishlist = isInWishlist(prodId);
  const savings = product.originalPrice - product.price;
  const discountPct = Math.round((savings / product.originalPrice) * 100);

  // Check if item is already in cart
  const cartItem = cart?.find(
    (item) => String(item.id ?? item.productId ?? item._id) === String(prodId)
  );
  const cartQty = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (cartQty >= 10) {
      showToast(
        language === "hi"
          ? "⚠️ अधिकतम सीमा: एक आइटम अधिकतम 10 ही कार्ट में जोड़ सकते हैं!"
          : "⚠️ Maximum limit reached: You can only add up to 10 of this item!"
      );
      return;
    }
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    setHeartAnim(true);
    toggleWishlist(prodId);
    setTimeout(() => setHeartAnim(false), 400);
  };

  const handleDecreaseQty = (e) => {
    e.stopPropagation();
    updateCartQuantity(prodId, -1);
  };

  const handleIncreaseQty = (e) => {
    e.stopPropagation();
    if (cartQty >= 10) {
      showToast(
        language === "hi"
          ? "⚠️ अधिकतम सीमा: एक आइटम अधिकतम 10 ही कार्ट में जोड़ सकते हैं!"
          : "⚠️ Maximum limit reached: You can only add up to 10 of this item!"
      );
      return;
    }
    updateCartQuantity(prodId, 1);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.04, 0.3),
        ease: luxuryEase,
      }}
      whileHover={{ y: -4 }}
      className="product-card flex flex-col h-full bg-white rounded-xl border border-[#E7E1D5] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 relative group"
      data-id={prodId}
    >
      <div className="product-card-thumb-wrap aspect-square w-full relative overflow-hidden bg-[#F4EFE6]">
        <img
          src={getOptimizedImageUrl(product.image, 400)}
          alt={`${product.name} at ${product.price || 99} rupees - Griham 99+`}
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          className="product-card-img w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=400&q=75";
          }}
        />

        <div className="product-badge-group absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.price <= 99 && (
            <span className="badge-price-starter text-[10px] font-extrabold px-2 py-0.5 rounded shadow">UNDER ₹99</span>
          )}
          {discountPct >= 35 && (
            <span className="badge-discount text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
              {discountPct}% OFF
            </span>
          )}
          {product.bestseller && (
            <span className="badge-tag-custom text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
              BESTSELLER
            </span>
          )}
        </div>

        <div className="card-action-btns absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <motion.button
            whileTap={{ scale: 0.85 }}
            animate={heartAnim ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] }}
            className={`card-icon-btn min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center transition-all ${
              inWishlist ? "in-wishlist text-[#C83214] bg-[#FEEBE8]" : "bg-white/90 text-stone-700 hover:bg-white"
            } shadow-md`}
            onClick={handleToggleWishlist}
            aria-label="Add to wishlist"
            title="Add to Wishlist"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={inWishlist ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="card-icon-btn min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center bg-white/90 text-stone-700 hover:bg-white shadow-md transition-all"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            aria-label="Quick View"
            title="Quick View"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </motion.button>
        </div>
      </div>

      <div className="product-card-body p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          <span className="product-category-micro text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            {product.category}
          </span>
          <h3
            className="product-title line-clamp-2 text-sm sm:text-base font-bold text-[#18201C] hover:text-[#073B2A] transition-colors leading-snug mb-2"
            title={product.name}
          >
            <Link
              href={`/products/${product.slug || product.productId || prodId}`}
              className="hover:underline"
            >
              {product.name}
            </Link>
          </h3>

          <div className="product-rating-row flex items-center gap-1.5 mb-2.5 text-xs">
            <span className="rating-badge bg-[#073B2A] text-white px-1.5 py-0.5 rounded text-[11px] font-bold">
              ★ {product.rating}
            </span>
            <span className="rating-count text-stone-400 text-xs">({product.reviews})</span>
          </div>
        </div>

        <div>
          <div className="product-price-row flex items-baseline gap-2 mb-3 mt-1">
            <span className="product-price text-lg sm:text-xl font-extrabold text-[#073B2A]">
              ₹{product.price}
            </span>
            <span className="product-mrp text-xs sm:text-sm text-stone-400 line-through">
              ₹{product.originalPrice}
            </span>
            <span className="product-savings-pct text-xs font-bold text-[#168752]">
              Save ₹{savings}
            </span>
          </div>

          {/* Conditional: If in cart, show quantity increase / decrease stepper; else show Add to Cart */}
          {cartQty > 0 ? (
            <div
              className="product-card-qty-stepper w-full sm:w-auto min-h-[44px] flex items-center justify-between border-2 border-[#073B2A] rounded-lg bg-white overflow-hidden shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileTap={{ scale: 0.88 }}
                type="button"
                className="qty-btn-minus min-h-[44px] min-w-[44px] flex items-center justify-center text-lg font-black text-[#073B2A] hover:bg-[#073B2A] hover:text-white transition-colors"
                onClick={handleDecreaseQty}
                aria-label={cartQty === 1 ? "Remove from cart" : "Decrease quantity"}
                title={cartQty === 1 ? "Remove from cart" : "Decrease quantity"}
              >
                {cartQty === 1 ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                ) : (
                  "−"
                )}
              </motion.button>
              <div className="flex flex-col items-center justify-center px-2">
                <span className="qty-value text-sm font-extrabold text-[#073B2A] select-none tracking-tight">
                  {cartQty} {language === "hi" ? "कार्ट में" : "in Cart"}
                </span>
                {cartQty >= 10 && (
                  <span className="text-[10px] font-bold text-amber-600 leading-none">
                    {language === "hi" ? "अधिकतम 10" : "Max 10"}
                  </span>
                )}
              </div>
              <motion.button
                whileTap={cartQty < 10 ? { scale: 0.88 } : {}}
                type="button"
                className={`qty-btn-plus min-h-[44px] min-w-[44px] flex items-center justify-center text-lg font-black transition-colors ${
                  cartQty >= 10
                    ? "text-stone-300 bg-stone-50 cursor-not-allowed"
                    : "text-[#073B2A] hover:bg-[#073B2A] hover:text-white"
                }`}
                onClick={handleIncreaseQty}
                aria-label="Increase quantity"
                title={
                  cartQty >= 10
                    ? language === "hi"
                      ? "अधिकतम सीमा: 10 आइटम"
                      : "Maximum limit: 10 units"
                    : "Increase quantity"
                }
              >
                +
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`add-to-cart-btn w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                addedAnimation ? "btn-added-pulse" : ""
              }`}
              onClick={handleAddToCart}
              style={
                addedAnimation
                  ? { backgroundColor: "#168752", color: "#FFFFFF" }
                  : {}
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>
                {addedAnimation
                  ? language === "hi"
                    ? "जोड़ दिया गया ✓"
                    : "Added to Cart ✓"
                  : language === "hi"
                  ? "कार्ट में डालें"
                  : "Add to Cart"}
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
