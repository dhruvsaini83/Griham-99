"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";

const STORE_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_STORE_WHATSAPP_NUMBER || "919876543210";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    cartSubtotal,
    cartOriginalTotal,
    freeShippingThreshold,
    isFreeShipping,
    shippingFee,
    updateCartQuantity,
    removeFromCart,
    setIsCheckoutOpen,
    setActiveCategory,
    showToast,
    language,
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

  // Additional discount if coupon applied
  const couponDiscount = couponApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const totalSavings = Math.max(0, cartOriginalTotal - cartSubtotal) + couponDiscount;
  const finalPayable = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

  // Free shipping progress calculations
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === "GRIHAM99" || code === "GRIHAM10") {
      setCouponApplied(true);
      setCouponMessage("🎉 Coupon applied: 10% instant discount!");
      showToast("Coupon applied successfully!");
    } else {
      setCouponApplied(false);
      setCouponMessage("❌ Invalid code. Try using GRIHAM99");
    }
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!");
      return;
    }

    const orderId = "GRH-99-" + Math.floor(10000 + Math.random() * 90000);
    const dateStr = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    let msg = `*✨ NEW ORDER — GRIHAM 99+ (गृहम 99+)*\n`;
    msg += `*Order ID:* ${orderId}\n`;
    msg += `*Date:* ${dateStr}\n\n`;
    msg += `*ITEMS ORDERED:*\n`;

    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (Qty: ${item.quantity}) — ₹${
        item.price * item.quantity
      }\n`;
    });

    msg += `\n*ORDER SUMMARY:*\n`;
    msg += `• Total Items: ${cartCount}\n`;
    msg += `• Subtotal: ₹${cartSubtotal}\n`;
    if (couponApplied) {
      msg += `• Coupon (GRIHAM99): -₹${couponDiscount}\n`;
    }
    msg += `• Total Savings: ₹${totalSavings}\n`;
    msg += `• Delivery: ${shippingFee === 0 ? "FREE" : `₹${shippingFee}`}\n`;
    msg += `*• TOTAL PAYABLE: ₹${finalPayable}*\n\n`;
    msg += `Please confirm my order and share payment link / COD dispatch details. Dhanyawad! 🙏`;

    const waUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      msg
    )}`;
    window.open(waUrl, "_blank");
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Animated Overlay */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="drawer-backdrop active fixed inset-0 z-[540] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Animated Slide Drawer */}
          <motion.aside
            key="cart-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="slide-drawer active fixed inset-y-0 right-0 z-[550] w-full sm:w-[420px] md:w-[450px] lg:w-[480px] max-w-full bg-white shadow-2xl flex flex-col"
            aria-label="Shopping Cart"
          >
            {/* Header */}
            <div className="drawer-header px-4 sm:px-6 py-4 flex items-center justify-between bg-[#073B2A] text-white">
              <div className="drawer-title flex items-center gap-2.5 font-extrabold text-base sm:text-lg">
                <span>{language === "hi" ? "आपकी टोकरी" : "Shopping Cart"}</span>
                <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full">
                  {cartCount} Items
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="drawer-close-btn min-h-[44px] min-w-[44px] flex items-center justify-center text-2xl text-white hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Cart"
              >
                &times;
              </motion.button>
            </div>

            {/* Free Delivery Progress Meter with animated width */}
            <div className="free-shipping-meter px-4 sm:px-6 py-3 bg-[#F8F3E8] border-b border-[#E7E1D5]">
              <div className="free-shipping-text flex justify-between text-xs sm:text-sm font-bold text-[#073B2A] mb-1.5">
                <span>
                  {isFreeShipping && cartSubtotal > 0
                    ? "🎉 You unlocked FREE Delivery across India!"
                    : `Add ₹${neededForFreeShipping} more for FREE Delivery! 🚚`}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="progress-bar-wrap w-full h-1.5 bg-[#E5DFD4] rounded-full overflow-hidden">
                <motion.div
                  className="progress-bar-fill h-full bg-[#168752]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Items Scroll Area */}
            <div className="drawer-body flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "50px 20px",
                    color: "var(--color-text-muted)",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🛍️</div>
                  <h4
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--color-forest)",
                      fontWeight: 700,
                    }}
                  >
                    {language === "hi" ? "आपकी कार्ट खाली है" : "Your Cart is Empty"}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      marginTop: "6px",
                      marginBottom: "20px",
                    }}
                  >
                    {language === "hi"
                      ? "₹49 से शुरू होने वाली 99+ उपयोगी वस्तुएं देखें!"
                      : "Explore 99+ everyday essentials starting at just ₹49!"}
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="btn-gold-primary min-h-[44px] px-6 py-2.5 rounded-full font-bold shadow-md hover:brightness-110 transition-all"
                    onClick={() => {
                      setIsCartOpen(false);
                      setActiveCategory("all");
                    }}
                  >
                    {language === "hi" ? "उत्पाद देखें &rarr;" : "Explore Finds &rarr;"}
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cart.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="cart-item flex gap-3.5 py-3 border-b border-[#E7E1D5]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-thumb w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover bg-[#F4EFE6] shrink-0"
                      />
                      <div className="cart-item-details flex-1 min-w-0">
                        <div className="cart-item-name font-bold text-sm sm:text-base text-[#18201C] line-clamp-1 break-words">
                          {item.name}
                        </div>
                        <div className="cart-item-price-unit text-xs sm:text-sm text-[#073B2A] font-bold mt-0.5">
                          ₹{item.price}{" "}
                          <span
                            style={{
                              fontSize: "0.75rem",
                              textDecoration: "line-through",
                              color: "var(--color-text-light)",
                            }}
                          >
                            ₹{item.originalPrice}
                          </span>
                        </div>
                        <div className="cart-item-controls flex items-center justify-between mt-2">
                          <div className="qty-stepper flex items-center border border-[#E7E1D5] rounded-full overflow-hidden bg-white shadow-sm">
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              className="qty-stepper-btn min-h-[36px] min-w-[36px] flex items-center justify-center font-bold text-base hover:bg-[#F8F3E8] transition-colors"
                              onClick={() => updateCartQuantity(item.id, -1)}
                            >
                              -
                            </motion.button>
                            <span className="qty-stepper-value px-2 text-xs sm:text-sm font-bold">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              className="qty-stepper-btn min-h-[36px] min-w-[36px] flex items-center justify-center font-bold text-base hover:bg-[#F8F3E8] transition-colors"
                              onClick={() => updateCartQuantity(item.id, 1)}
                            >
                              +
                            </motion.button>
                          </div>
                          <button
                            className="cart-item-remove-btn min-h-[36px] text-xs text-stone-500 hover:text-[#C83214] underline px-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="drawer-footer px-4 sm:px-6 py-4 bg-[#FAF7F2] border-t border-[#E7E1D5]">
                {/* Coupon Box */}
                <div className="coupon-box flex gap-2">
                  <input
                    type="text"
                    className="coupon-input min-h-[44px] flex-1 px-3 border border-[#E7E1D5] rounded-lg text-sm uppercase bg-white focus:outline-none focus:border-[#073B2A]"
                    placeholder="Coupon Code (GRIHAM99)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="coupon-apply-btn min-h-[44px] px-4 rounded-lg bg-[#073B2A] text-white font-bold text-sm hover:brightness-110 transition-all"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </motion.button>
                </div>
                <div
                  className="coupon-hint text-xs font-semibold mt-1"
                  style={{
                    color: couponApplied
                      ? "var(--color-success)"
                      : "var(--color-text-muted)",
                  }}
                >
                  {couponMessage || (
                    <>
                      Use code <b>GRIHAM99</b> for 10% instant discount!
                    </>
                  )}
                </div>

                <div className="mt-3.5 space-y-1.5">
                  <div className="drawer-summary-line break-words text-sm sm:text-base flex justify-between">
                    <span>Subtotal (MRP)</span>
                    <span>₹{cartOriginalTotal}</span>
                  </div>
                  <div
                    className="drawer-summary-line break-words text-sm sm:text-base flex justify-between"
                    style={{ color: "var(--color-success)" }}
                  >
                    <span>Savings & Discounts</span>
                    <span>-₹{totalSavings}</span>
                  </div>
                  <div className="drawer-summary-line break-words text-sm sm:text-base flex justify-between">
                    <span>Estimated Delivery</span>
                    <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                  </div>
                  <div className="drawer-summary-line total-line break-words text-base sm:text-lg font-extrabold flex justify-between border-t border-[#E7E1D5] pt-2 mt-2">
                    <span>Total Payable</span>
                    <span>₹{finalPayable}</span>
                  </div>
                </div>

                {/* Direct WhatsApp Order Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="whatsapp-order-btn min-h-[48px] w-full flex items-center justify-center gap-2.5 rounded-full font-bold text-sm sm:text-base shadow-md mt-3.5 hover:brightness-105 transition-all"
                  onClick={handleWhatsAppOrder}
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

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="checkout-proceed-btn min-h-[48px] w-full flex items-center justify-center gap-2 rounded-full font-bold text-sm sm:text-base mt-2 shadow-md hover:brightness-110 transition-all"
                  onClick={handleProceedToCheckout}
                  style={{
                    background: "var(--color-forest)",
                    color: "#FFFFFF",
                  }}
                >
                  <span>Add Delivery Address First &rarr;</span>
                </motion.button>

                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                    textAlign: "center",
                    marginTop: "8px",
                  }}
                >
                  💬 ऑर्डर की पूरी जानकारी और कन्फर्मेशन व्हाट्सएप पर सीधे भेजी जाएगी।
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
