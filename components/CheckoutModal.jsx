"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { luxuryEase } from "@/lib/animations";
import { siteConfig } from "@/lib/config";

const STORE_WHATSAPP_NUMBER = siteConfig.whatsappNumber;

export default function CheckoutModal() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartOriginalTotal,
    shippingFee,
    grandTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    showToast,
    language,
    pincode,
  } = useShop();

  const [step, setStep] = useState(1);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address1: "",
    address2: "",
    city: "New Delhi",
    state: "Delhi",
    pincode: pincode.slice(0, 6) || "110001",
    landmark: "",
    paymentMethod: "upi",
  });

  // Validation Errors
  const [errors, setErrors] = useState({});

  // Placed Order Info
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName =
        "Please enter your full name (at least 3 characters).";
    }
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile.trim())) {
      newErrors.mobile =
        "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.";
    }
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address1.trim() || formData.address1.trim().length < 3) {
      newErrors.address1 =
        "Please enter flat / house / building details (min 3 chars).";
    }
    if (!formData.address2.trim() || formData.address2.trim().length < 3) {
      newErrors.address2 =
        "Please enter street address / colony / area (min 3 chars).";
    }
    if (!formData.city.trim()) {
      newErrors.city = "Please enter your city name.";
    }
    if (!formData.state.trim()) {
      newErrors.state = "Please select your state.";
    }
    if (!/^[1-9][0-9]{5}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Please enter a valid 6-digit Indian PIN code.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Next = () => {
    if (validateStep1()) setStep(2);
  };

  const handleStep2Next = () => {
    if (validateStep2()) setStep(3);
  };

  const handlePlaceOrder = async () => {
    // Generate order ID in GRHM-99-XXXX format
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    let orderId = `GRHM-99-${randomSuffix}`;

    const dateStr = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const paymentLabel =
      formData.paymentMethod === "upi"
        ? "UPI / QR Pay"
        : formData.paymentMethod === "cod"
        ? "Cash on Delivery (COD)"
        : "Card / Net Banking";

    // Asynchronously save order to MongoDB backend
    try {
      const orderPayload = {
        userMobile: formData.mobile,
        userName: formData.fullName,
        userEmail: formData.email,
        items: cart.map((item) => ({
          productId: item.id || item.productId,
          name: item.name,
          price: item.price,
          qty: item.quantity,
          image: item.image,
        })),
        totalAmount: grandTotal,
        subtotal: cartSubtotal,
        shippingCharge: shippingFee,
        discount: 0,
        shippingAddress: {
          fullName: formData.fullName,
          house: formData.address1,
          street: formData.address2,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMode: formData.paymentMethod,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.orderId) {
          orderId = data.orderId;
        }
      }
    } catch (err) {
      console.warn("Could not save to /api/orders, continuing order flow:", err);
    }

    let msg = `*✨ NEW VERIFIED ORDER — GRIHAM 99+ (गृहम 99+)*\n`;
    msg += `*Order ID:* ${orderId}\n`;
    msg += `*Date:* ${dateStr}\n\n`;

    msg += `*CUSTOMER DETAILS:*\n`;
    msg += `• Name: ${formData.fullName}\n`;
    msg += `• Mobile: +91 ${formData.mobile}\n`;
    if (formData.email) msg += `• Email: ${formData.email}\n`;
    msg += `• Address: ${formData.address1}, ${formData.address2}\n`;
    msg += `• Landmark: ${formData.landmark || "N/A"}\n`;
    msg += `• City/State: ${formData.city}, ${formData.state} - ${formData.pincode}\n`;
    msg += `• Payment Mode: ${paymentLabel}\n\n`;

    msg += `*ITEMS ORDERED:*\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (Qty: ${item.quantity}) — ₹${
        item.price * item.quantity
      }\n`;
    });

    msg += `\n*TOTAL AMOUNT PAYABLE: ₹${grandTotal}*\n`;
    msg += `(Includes ₹${shippingFee} shipping fee)\n\n`;
    msg += `Please confirm my order dispatch. Dhanyawad! 🙏`;

    const waUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      msg
    )}`;

    // Set order placed state
    setPlacedOrder({
      orderId,
      deliveryDays: "2-4 Business Days",
      paymentLabel,
      totalAmount: grandTotal,
      waUrl,
    });

    setStep(4);
    clearCart();
    showToast("Order saved to database & ready for WhatsApp confirmation!");
    window.open(waUrl, "_blank");
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setPlacedOrder(null);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          key="checkout-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="modal-backdrop active fixed inset-0 z-[600] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            key="checkout-dialog"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            className="checkout-modal-dialog w-full h-full sm:h-auto sm:max-h-[90vh] max-w-3xl rounded-none sm:rounded-2xl overflow-y-auto bg-white p-4 sm:p-6 lg:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="modal-close-corner-btn absolute top-3 right-3 z-20 min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-700 text-2xl font-bold transition-colors shadow-sm"
              onClick={handleClose}
              aria-label="Close"
            >
              &times;
            </motion.button>

        {/* Checkout Header */}
        <div style={{ marginBottom: "20px" }}>
          <h3
            style={{
              fontFamily: "var(--font-royal)",
              fontSize: "1.4rem",
              color: "var(--color-forest)",
            }}
          >
            {language === "hi"
              ? "सुरक्षित भारतीय चेकआउट"
              : "Secure Indian Checkout"}
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
            {language === "hi"
              ? "सुरक्षित पैकेजिंग के साथ आपके घर तक त्वरित डिलीवरी।"
              : "Delivering directly to your home with safe packaging."}
          </p>
        </div>

        {/* Stepper Bar (if not on success screen) */}
        {step < 4 && (
          <div className="checkout-steps-bar flex items-center justify-between mb-6">
            <div
              className={`checkout-step-pill flex items-center gap-2 text-xs sm:text-sm font-bold ${step >= 1 ? "active text-[#073B2A]" : "text-stone-400"}`}
            >
              <span className="step-circle w-7 h-7 rounded-full flex items-center justify-center border font-bold">1</span>
              <span>Contact</span>
            </div>
            <div
              style={{
                flex: 1,
                height: "2px",
                background: "var(--color-border-soft)",
                margin: "0 8px",
              }}
            ></div>
            <div
              className={`checkout-step-pill flex items-center gap-2 text-xs sm:text-sm font-bold ${step >= 2 ? "active text-[#073B2A]" : "text-stone-400"}`}
            >
              <span className="step-circle w-7 h-7 rounded-full flex items-center justify-center border font-bold">2</span>
              <span>Address</span>
            </div>
            <div
              style={{
                flex: 1,
                height: "2px",
                background: "var(--color-border-soft)",
                margin: "0 8px",
              }}
            ></div>
            <div
              className={`checkout-step-pill flex items-center gap-2 text-xs sm:text-sm font-bold ${step >= 3 ? "active text-[#073B2A]" : "text-stone-400"}`}
            >
              <span className="step-circle w-7 h-7 rounded-full flex items-center justify-center border font-bold">3</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Animated Steps Container */}
        <AnimatePresence mode="wait">
          {/* Step 1: Customer Contact */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: luxuryEase }}
            >
            <div className="form-group-grid grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="form-group-full form-field-wrapper col-span-1 md:col-span-2">
                <label className="form-label" htmlFor="chkFullName">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="chkFullName"
                  className="form-control min-h-[44px]"
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
                {errors.fullName && (
                  <div className="form-error-msg" style={{ display: "flex" }}>
                    <span>⚠️</span>
                    <span className="err-text">{errors.fullName}</span>
                  </div>
                )}
              </div>

              <div className="form-field-wrapper col-span-1">
                <label className="form-label" htmlFor="chkMobile">
                  Mobile Number (+91) *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="chkMobile"
                  className="form-control min-h-[44px]"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  inputMode="numeric"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
                {errors.mobile && (
                  <div className="form-error-msg" style={{ display: "flex" }}>
                    <span>⚠️</span>
                    <span className="err-text">{errors.mobile}</span>
                  </div>
                )}
              </div>

              <div className="form-field-wrapper col-span-1">
                <label className="form-label" htmlFor="chkEmail">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  id="chkEmail"
                  className="form-control min-h-[44px]"
                  placeholder="For order receipt"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <div className="form-error-msg" style={{ display: "flex" }}>
                    <span>⚠️</span>
                    <span className="err-text">{errors.email}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              className="btn-gold-primary min-h-[44px] w-full mt-3 font-bold flex items-center justify-center"
              onClick={handleStep1Next}
            >
              <span>Continue to Delivery Address &rarr;</span>
            </button>
            </motion.div>
          )}

          {/* Step 2: Shipping Address */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: luxuryEase }}
            >
            <div className="form-group-grid grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="form-group-full form-field-wrapper col-span-1 md:col-span-2">
                <label className="form-label" htmlFor="chkAddress1">
                  Flat / House No. / Building Name *
                </label>
                <input
                  type="text"
                  name="address1"
                  id="chkAddress1"
                  className="form-control min-h-[44px]"
                  placeholder="e.g. Flat 302, Sai Residency"
                  value={formData.address1}
                  onChange={handleInputChange}
                  required
                />
                {errors.address1 && (
                  <div className="form-error-msg" style={{ display: "flex" }}>
                    <span>⚠️</span>
                    <span className="err-text">{errors.address1}</span>
                  </div>
                )}
              </div>

              <div className="form-group-full form-field-wrapper col-span-1 md:col-span-2">
                <label className="form-label" htmlFor="chkAddress2">
                  Street Address / Colony / Area *
                </label>
                <input
                  type="text"
                  name="address2"
                  id="chkAddress2"
                  className="form-control min-h-[44px]"
                  placeholder="e.g. Near Market, Sector 14"
                  value={formData.address2}
                  onChange={handleInputChange}
                  required
                />
                {errors.address2 && (
                  <div className="form-error-msg" style={{ display: "flex" }}>
                    <span>⚠️</span>
                    <span className="err-text">{errors.address2}</span>
                  </div>
                )}
              </div>

              <div className="form-field-wrapper col-span-1">
                <label className="form-label" htmlFor="chkCity">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  id="chkCity"
                  className="form-control min-h-[44px]"
                  placeholder="e.g. New Delhi"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                {errors.city && (
                  <div className="form-error-msg" style={{ display: "flex" }}>
                    <span>⚠️</span>
                    <span className="err-text">{errors.city}</span>
                  </div>
                )}
              </div>

              <div className="form-field-wrapper col-span-1">
                <label className="form-label" htmlFor="chkState">
                  State *
                </label>
                <select
                  name="state"
                  id="chkState"
                  className="form-control min-h-[44px]"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select State --</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Punjab">Punjab</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Other">Other State</option>
                </select>
                {errors.state && (
                  <div className="form-error-msg" style={{ display: "flex" }}>
                    <span>⚠️</span>
                    <span className="err-text">{errors.state}</span>
                  </div>
                )}
              </div>

              <div className="form-field-wrapper col-span-1">
                <label className="form-label" htmlFor="chkPincode">
                  6-Digit PIN Code *
                </label>
                <input
                  type="text"
                  name="pincode"
                  id="chkPincode"
                  className="form-control min-h-[44px]"
                  placeholder="e.g. 110001"
                  maxLength={6}
                  inputMode="numeric"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
                {errors.pincode && (
                  <div className="form-error-msg" style={{ display: "flex" }}>
                    <span>⚠️</span>
                    <span className="err-text">{errors.pincode}</span>
                  </div>
                )}
              </div>

              <div className="form-field-wrapper col-span-1">
                <label className="form-label" htmlFor="chkLandmark">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="landmark"
                  id="chkLandmark"
                  className="form-control min-h-[44px]"
                  placeholder="Near temple / school"
                  value={formData.landmark}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex gap-2.5 mt-4">
              <button
                type="button"
                className="btn-outline-gold min-h-[44px] px-4 font-bold"
                style={{ color: "var(--color-forest)" }}
                onClick={() => setStep(1)}
              >
                &larr; Back
              </button>
              <button
                type="button"
                className="btn-gold-primary min-h-[44px] flex-1 font-bold flex items-center justify-center"
                onClick={handleStep2Next}
              >
                <span>Continue to Payment &rarr;</span>
              </button>
            </div>
            </motion.div>
          )}

          {/* Step 3: Payment Options & Place Order */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: luxuryEase }}
            >
            <div style={{ marginBottom: "16px" }}>
              <div
                className={`payment-option-card ${
                  formData.paymentMethod === "upi" ? "selected" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, paymentMethod: "upi" }))
                }
              >
                <input
                  type="radio"
                  name="payMethod"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={() => {}}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    UPI (Instant & Zero Extra Fee)
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Google Pay, PhonePe, Paytm, BHIM or any UPI QR
                  </div>
                </div>
              </div>

              <div
                className={`payment-option-card ${
                  formData.paymentMethod === "cod" ? "selected" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, paymentMethod: "cod" }))
                }
              >
                <input
                  type="radio"
                  name="payMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={() => {}}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    Cash on Delivery (COD)
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Pay in cash or UPI when your parcel arrives at your doorstep
                  </div>
                </div>
              </div>

              <div
                className={`payment-option-card ${
                  formData.paymentMethod === "card" ? "selected" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, paymentMethod: "card" }))
                }
              >
                <input
                  type="radio"
                  name="payMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={() => {}}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    Credit / Debit Card / Net Banking
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    All major Indian banks & RuPay cards supported
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Recap */}
            <div className="order-summary-box-demo">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                  marginBottom: "6px",
                }}
              >
                <span>Order Total:</span>
                <span
                  style={{
                    color: "var(--color-forest)",
                    fontSize: "1.1rem",
                  }}
                >
                  ₹{grandTotal}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                }}
              >
                🛡️ Secure order confirmation. Real-time confirmation directly via WhatsApp.
              </div>
            </div>

            <div className="flex gap-2.5 mt-4">
              <button
                className="btn-outline-gold min-h-[44px] px-4 font-bold"
                style={{ color: "var(--color-forest)" }}
                onClick={() => setStep(2)}
              >
                &larr; Back
              </button>
              <button
                className="whatsapp-order-btn min-h-[48px] flex-1 flex items-center justify-center gap-2"
                onClick={handlePlaceOrder}
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
                <span>Confirm Order on WhatsApp</span>
              </button>
            </div>
            </motion.div>
          )}

          {/* Step 4: Order Confirmation Success Screen */}
          {step === 4 && placedOrder && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: luxuryEase }}
              className="order-success-screen"
            >
              <div className="order-success-icon">✓</div>
              <h3
                style={{
                  fontFamily: "var(--font-royal)",
                  fontSize: "1.5rem",
                  color: "var(--color-forest)",
                  marginBottom: "8px",
                }}
              >
                Order Details Sent to WhatsApp!
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "14px",
                }}
              >
                ऑर्डर की पूरी जानकारी और बिल व्हाट्सएप पर भेज दिया गया है। आगे की बातचीत और डिलीवरी कन्फर्मेशन हमारे स्टोर से सीधे व्हाट्सएप चैट पर होगी।
              </p>

              <div
                style={{
                  background: "var(--color-ivory)",
                  border: "1px solid var(--color-border-soft)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                  textAlign: "left",
                  maxWidth: "440px",
                  margin: "0 auto 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Order ID:
                  </span>
                  <span style={{ fontWeight: 800, fontSize: "0.85rem" }}>
                    {placedOrder.orderId}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Estimated Delivery:
                  </span>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                    {placedOrder.deliveryDays}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Payment Method:
                  </span>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                    {placedOrder.paymentLabel}
                  </span>
                </div>
                <div style={{ display: "flex", justifySelf: "space-between" }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Total Amount:
                  </span>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      color: "var(--color-forest)",
                    }}
                  >
                    ₹{placedOrder.totalAmount}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  maxWidth: "440px",
                  margin: "0 auto",
                }}
              >
                <a
                  href={placedOrder.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-order-btn"
                  style={{ textDecoration: "none" }}
                >
                  <div className="wa-icon-circle">
                    <img
                      src="/assets/whatsapp.png"
                      alt="WhatsApp"
                      className="wa-icon-img"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
                      }}
                    />
                  </div>
                  <span>Open WhatsApp Chat (व्हाट्सएप खोलें)</span>
                </a>
                <button
                  className="btn-outline-gold"
                  style={{ color: "var(--color-forest)" }}
                  onClick={handleClose}
                >
                  <span>Continue Shopping &rarr;</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
