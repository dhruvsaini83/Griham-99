"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { luxuryEase } from "@/lib/animations";
import { siteConfig } from "@/lib/config";
import { getOptimizedImageUrl } from "@/lib/cloudinary-helpers";

const STORE_WHATSAPP_NUMBER = siteConfig.whatsappNumber;

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    cart,
    updateCartQuantity,
    setIsCheckoutOpen,
    pincode,
    setPincode,
    showToast,
    language,
  } = useShop();

  const [inputPin, setInputPin] = useState(pincode.slice(0, 6));
  const [pinStatus, setPinStatus] = useState(
    `✓ Delivery in 2-3 business days to ${pincode.slice(0, 6)}. Cash on Delivery Available.`
  );

  const p = quickViewProduct;
  const savings = p ? p.originalPrice - p.price : 0;
  const discountPct = p ? Math.round((savings / p.originalPrice) * 100) : 0;

  const handleCheckPincode = () => {
    const pin = inputPin.trim();
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      setPinStatus("❌ Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    setPincode(pin);
    setPinStatus(
      `✓ Express delivery available in 2-3 days to ${pin}. Cash on Delivery (COD) supported!`
    );
  };

  const handleSingleProductWhatsApp = () => {
    if (!p) return;
    const orderId = "GRH-99-" + Math.floor(10000 + Math.random() * 90000);
    let msg = `*✨ INQUIRY / ORDER — GRIHAM 99+*\n`;
    msg += `*Ref:* ${orderId}\n\n`;
    msg += `I want to order:\n`;
    msg += `*${p.name}*\n`;
    msg += `Price: ₹${p.price} (MRP: ₹${p.originalPrice} - ${discountPct}% OFF)\n`;
    msg += `Category: ${p.category}\n\n`;
    msg += `Delivery Pincode: ${pincode}\n`;
    msg += `Please confirm availability and dispatch details. Dhanyawad! 🙏`;

    const waUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      msg
    )}`;
    window.open(waUrl, "_blank");
  };

  const handleAddToCart = () => {
    if (!p) return;
    const currentItem = cart?.find(
      (item) => String(item.id || item.productId) === String(p.id ?? p.productId ?? p._id)
    );
    if (currentItem && currentItem.quantity >= 10) {
      showToast(
        language === "hi"
          ? "⚠️ अधिकतम सीमा: एक आइटम अधिकतम 10 ही कार्ट में जोड़ सकते हैं!"
          : "⚠️ Maximum limit reached: You can only add up to 10 of this item!"
      );
      return;
    }
    addToCart(p, 1);
  };

  const handleBuyNow = () => {
    if (!p) return;
    const currentItem = cart?.find(
      (item) => String(item.id || item.productId) === String(p.id ?? p.productId ?? p._id)
    );
    if (currentItem && currentItem.quantity >= 10) {
      showToast(
        language === "hi"
          ? "⚠️ अधिकतम सीमा: एक आइटम अधिकतम 10 ही कार्ट में जोड़ सकते हैं!"
          : "⚠️ Maximum limit reached: You can only add up to 10 of this item!"
      );
      setQuickViewProduct(null);
      setIsCheckoutOpen(true);
      return;
    }
    addToCart(p, 1);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="quickview-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="modal-backdrop active fixed inset-0 z-[600] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setQuickViewProduct(null)}
        >
          <motion.div
            key="quickview-dialog"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            className="modal-container w-full h-full sm:h-auto sm:max-h-[90vh] max-w-3xl rounded-none sm:rounded-2xl overflow-y-auto bg-white relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="modal-close-btn absolute top-3 right-3 z-20 min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-700 text-2xl font-bold transition-colors shadow-sm"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close modal"
            >
              &times;
            </motion.button>

            <div className="modal-product-grid grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 lg:p-8">
              {/* Gallery Col */}
              <div className="modal-gallery">
                <div className="modal-main-img-wrap rounded-xl overflow-hidden bg-[#F4EFE6] aspect-square flex items-center justify-center">
                  <img
                    src={getOptimizedImageUrl(p.image, 600)}
                    alt={p.name}
                    id="modalMainImg"
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=600&q=75";
                    }}
                  />
                </div>
              </div>

              {/* Details Col */}
              <div className="modal-details">
                <span className="modal-category-tag">{p.category}</span>
                <h2 className="modal-product-title">{p.name}</h2>

                <div className="product-rating-row">
                  <span className="rating-badge">★ {p.rating}</span>
                  <span className="rating-count">
                    ({p.reviews}{" "}
                    {language === "hi"
                      ? "समीक्षाएं"
                      : "verified customer reviews"})
                  </span>
                </div>

                <div className="modal-price-box">
                  <span className="modal-price-main">₹{p.price}</span>
                  <span className="modal-mrp-cut">₹{p.originalPrice}</span>
                  <span className="modal-save-pill">
                    Save ₹{savings} ({discountPct}% OFF)
                  </span>
                </div>

                <p className="modal-product-desc">{p.description}</p>

                {/* Specs Table */}
                {p.specs && (
                  <table className="modal-specs-table">
                    <tbody>
                      {Object.entries(p.specs).map(([key, val]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Action Buttons */}
                <div className="modal-actions-row flex flex-col sm:flex-row items-center gap-3 mt-4">
                  {(() => {
                    const cartItem = cart?.find(
                      (item) =>
                        String(item.id ?? item.productId ?? item._id) ===
                        String(p.id ?? p.productId ?? p._id)
                    );
                    const cartQty = cartItem ? cartItem.quantity : 0;

                    if (cartQty > 0) {
                      return (
                        <div className="modal-qty-stepper min-h-[44px] w-full flex items-center justify-between border-2 border-[#073B2A] rounded-lg bg-white overflow-hidden shadow-sm">
                          <motion.button
                            whileTap={{ scale: 0.88 }}
                            type="button"
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-lg font-black text-[#073B2A] hover:bg-[#073B2A] hover:text-white transition-colors"
                            onClick={() =>
                              updateCartQuantity(p.id ?? p.productId ?? p._id, -1)
                            }
                            aria-label={
                              cartQty === 1
                                ? "Remove from cart"
                                : "Decrease quantity"
                            }
                            title={
                              cartQty === 1
                                ? "Remove from cart"
                                : "Decrease quantity"
                            }
                          >
                            {cartQty === 1 ? (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            ) : (
                              "−"
                            )}
                          </motion.button>
                          <div className="flex flex-col items-center justify-center px-3">
                            <span className="text-sm font-extrabold text-[#073B2A] select-none">
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
                            className={`min-h-[44px] min-w-[44px] flex items-center justify-center text-lg font-black transition-colors ${
                              cartQty >= 10
                                ? "text-stone-300 bg-stone-50 cursor-not-allowed"
                                : "text-[#073B2A] hover:bg-[#073B2A] hover:text-white"
                            }`}
                            onClick={() => {
                              if (cartQty >= 10) {
                                showToast(
                                  language === "hi"
                                    ? "⚠️ अधिकतम सीमा: एक आइटम अधिकतम 10 ही कार्ट में जोड़ सकते हैं!"
                                    : "⚠️ Maximum limit reached: You can only add up to 10 of this item!"
                                );
                                return;
                              }
                              updateCartQuantity(p.id ?? p.productId ?? p._id, 1);
                            }}
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
                      );
                    }

                    return (
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        className="modal-add-cart-btn min-h-[44px] w-full hover:brightness-110 transition-all"
                        onClick={handleAddToCart}
                      >
                        <span>
                          {language === "hi"
                            ? "कार्ट में जोड़ें 🛒"
                            : "Add to Cart 🛒"}
                        </span>
                      </motion.button>
                    );
                  })()}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="modal-buy-now-btn min-h-[44px] w-full hover:brightness-110 transition-all"
                    onClick={handleBuyNow}
                  >
                    <span>
                      {language === "hi" ? "अभी खरीदें ⚡" : "Buy Now ⚡"}
                    </span>
                  </motion.button>
                </div>

                {/* WhatsApp Single Product Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="whatsapp-order-btn min-h-[44px] w-full mt-2.5 hover:brightness-105 transition-all"
                  onClick={handleSingleProductWhatsApp}
                >
                  <div className="wa-icon-circle w-6 h-6 flex items-center justify-center">
                    <img
                      src="/assets/whatsapp.png"
                      alt="WhatsApp"
                      className="wa-icon-img w-5 h-5 object-contain"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
                      }}
                    />
                  </div>
                  <span>Order on WhatsApp (व्हाट्सएप ऑर्डर)</span>
                </motion.button>

                {/* Pincode Check */}
                <div className="pincode-check-wrap">
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--color-forest)",
                    }}
                  >
                    {language === "hi"
                      ? "अपने पिनकोड पर डिलीवरी जांचें:"
                      : "Check Delivery in your Indian Pincode:"}
                  </div>
                  <div className="pincode-input-row">
                    <input
                      type="text"
                      className="pincode-input-field"
                      value={inputPin}
                      maxLength={6}
                      inputMode="numeric"
                      onChange={(e) => setInputPin(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleCheckPincode();
                        }
                      }}
                    />
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      className="pincode-verify-btn"
                      onClick={handleCheckPincode}
                    >
                      Check
                    </motion.button>
                  </div>
                  <div
                    className="pincode-status-text"
                    style={{
                      color: pinStatus.startsWith("❌")
                        ? "var(--color-offer-red)"
                        : "var(--color-success)",
                      fontWeight: 600,
                    }}
                  >
                    {pinStatus}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
