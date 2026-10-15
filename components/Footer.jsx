"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { luxuryEase } from "@/lib/animations";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const {
    setActiveCategory,
    setMaxPrice,
    setIsCartOpen,
    setIsPincodeOpen,
    showToast,
    language,
  } = useShop();

  const [newsletterInput, setNewsletterInput] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // 'idle' | 'loading' | 'success'
  const [newsletterError, setNewsletterError] = useState("");
  const [subscribedContact, setSubscribedContact] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const trimmed = newsletterInput.trim();
    if (!trimmed) {
      setNewsletterError(
        language === "hi"
          ? "कृपया अपना मोबाइल नंबर या ईमेल आईडी दर्ज करें।"
          : "Please enter your mobile number or email address."
      );
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
    const isMobile = /^[6-9]\d{9}$/.test(trimmed.replace(/\D/g, ""));

    if (!isEmail && !isMobile) {
      setNewsletterError(
        language === "hi"
          ? "कृपया सही 10-अंकों का भारतीय मोबाइल नंबर या मान्य ईमेल दर्ज करें।"
          : "Please enter a valid 10-digit mobile number or email address."
      );
      return;
    }

    setNewsletterError("");
    setNewsletterStatus("loading");

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: trimmed }),
      });
    } catch (err) {
      console.warn("Newsletter network note:", err);
    }

    setSubscribedContact(trimmed);
    setNewsletterStatus("success");
    showToast(
      language === "hi"
        ? "🎉 गृहम 99+ अपडेट्स के लिए धन्यवाद! आप सब्सक्राइब हो गए हैं।"
        : "🎉 Thank you for subscribing to Griham 99+ updates!"
    );
  };

  const handleCategoryNav = (cat) => {
    setActiveCategory(cat);
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handlePriceUnder99 = () => {
    setMaxPrice(99);
    setActiveCategory("under99");
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: luxuryEase }}
      >
        <div className="footer-top-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <div
                className="brand-emblem-wrap"
                style={{ width: "40px", height: "40px" }}
              >
                <svg
                  className="brand-emblem-svg"
                  viewBox="0 0 100 100"
                  fill="none"
                  style={{ width: "30px", height: "30px" }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="#C9A24A"
                    strokeWidth="4"
                  />
                  <path
                    d="M50 16 L22 38 L27 38 L27 76 L73 76 L73 38 L78 38 Z"
                    fill="none"
                    stroke="#C9A24A"
                    strokeWidth="4"
                  />
                  <text
                    x="50"
                    y="66"
                    textAnchor="middle"
                    fontFamily="'Cinzel', serif"
                    fontSize="14"
                    fontWeight="900"
                    fill="#FFFFFF"
                  >
                    99+
                  </text>
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-hindi)",
                    fontSize: "1.3rem",
                    fontWeight: 900,
                    color: "var(--color-gold-light)",
                  }}
                >
                  गृहम 99+
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "#A6B4AD",
                    letterSpacing: "0.12em",
                  }}
                >
                  GRIHAM 99+ RETAIL
                </div>
              </div>
            </div>
            <p className="footer-brand-desc">
              {language === "hi"
                ? "भारतीय परिवारों के लिए दैनिक आवश्यकताएं, रसोई का सामान, उत्सव की सजावट और व्यक्तिगत देखभाल — सिर्फ ₹49 से शुरू होने वाले दामों पर।"
                : "Bringing 99+ varieties of everyday essentials, useful kitchen finds, sacred festive decor and beauty care to Indian homes with prices starting at honest ₹49."}
            </p>
            <div
              style={{
                color: "var(--color-gold-light)",
                fontSize: "0.82rem",
                fontWeight: 700,
              }}
            >
              📞 Support: {siteConfig.supportPhone} ({siteConfig.supportHours})
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="footer-col-title">
              {language === "hi" ? "श्रेणियां" : "Categories"}
            </h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href="#catalog"
                  className="footer-link"
                  onClick={() => handleCategoryNav("kitchen")}
                >
                  Kitchen & Dining
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="footer-link"
                  onClick={() => handleCategoryNav("home")}
                >
                  Home & Living
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="footer-link"
                  onClick={() => handleCategoryNav("beauty")}
                >
                  Beauty & Personal Care
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="footer-link"
                  onClick={() => handleCategoryNav("gifts")}
                >
                  Gifts & Festive Decor
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="footer-link"
                  onClick={() => handleCategoryNav("storage")}
                >
                  Storage & Organization
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="footer-link"
                  onClick={handlePriceUnder99}
                >
                  Finds Under ₹99
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4 className="footer-col-title">
              {language === "hi" ? "ग्राहक सेवा" : "Customer Care"}
            </h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  onClick={() => setIsPincodeOpen(true)}
                  className="footer-link"
                  style={{ textAlign: "left", background: "none", border: "none" }}
                >
                  Check Delivery Pincode
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="footer-link"
                  style={{ textAlign: "left", background: "none", border: "none" }}
                >
                  Track Your Cart
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      "Returns Policy: 7 Days Easy Exchange on damaged/wrong items."
                    )
                  }
                  className="footer-link"
                  style={{ textAlign: "left", background: "none", border: "none" }}
                >
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      "Shipping Policy: Dispatched within 24 hours via reliable Indian couriers."
                    )
                  }
                  className="footer-link"
                  style={{ textAlign: "left", background: "none", border: "none" }}
                >
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      "Privacy Policy: Customer data is secure and never shared."
                    )
                  }
                  className="footer-link"
                  style={{ textAlign: "left", background: "none", border: "none" }}
                >
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="footer-col-title">
              {language === "hi" ? "जुड़े रहें" : "Stay Updated"}
            </h4>
            <p className="footer-newsletter-text">
              {language === "hi"
                ? "नए ₹49 और ₹99 के साप्ताहिक आगमन और त्योहारों की विशेष छूट पाने के लिए सब्सक्राइब करें!"
                : "Subscribe for announcements on new weekly ₹49 & ₹99 arrivals and festival specials!"}
            </p>
            <AnimatePresence mode="wait">
              {newsletterStatus === "success" ? (
                <motion.div
                  key="newsletter-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="newsletter-success-box p-4 rounded-xl bg-[#041F18] border border-[#C9A24A]/40 text-center shadow-lg"
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#168752]/20 border border-[#168752] text-[#168752] flex items-center justify-center text-xl font-black">
                    ✓
                  </div>
                  <h5 className="font-bold text-white text-sm mb-1">
                    {language === "hi"
                      ? "सफलतापूर्वक सब्सक्राइब हुआ!"
                      : "Subscribed Successfully!"}
                  </h5>
                  <p className="text-xs text-stone-300 mb-3">
                    {language === "hi"
                      ? `धन्यवाद! नए ₹49 और ₹99 के साप्ताहिक अपडेट "${subscribedContact}" पर भेजे जाएंगे।`
                      : `Weekly ₹49 & ₹99 arrivals will now be sent to "${subscribedContact}".`}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setNewsletterStatus("idle");
                      setNewsletterInput("");
                      setNewsletterError("");
                    }}
                    className="text-xs text-[#E6C875] hover:underline font-semibold"
                  >
                    + {language === "hi" ? "दूसरा नंबर या ईमेल जोड़ें" : "Subscribe another contact"}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="newsletter-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="footer-newsletter-form flex flex-col gap-2"
                  onSubmit={handleNewsletterSubmit}
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="footer-input min-h-[44px] flex-1 px-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#C9A24A]"
                      placeholder="Enter Mobile or Email"
                      value={newsletterInput}
                      onChange={(e) => {
                        setNewsletterInput(e.target.value);
                        if (newsletterError) setNewsletterError("");
                      }}
                      disabled={newsletterStatus === "loading"}
                      required
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={newsletterStatus === "loading"}
                      className="footer-submit-btn min-h-[44px] px-5 bg-[#C9A24A] text-[#073B2A] font-extrabold rounded-lg hover:bg-[#E6C875] transition-colors flex items-center justify-center gap-1.5 shrink-0"
                    >
                      {newsletterStatus === "loading" ? (
                        <span>Joining...</span>
                      ) : (
                        <span>Join</span>
                      )}
                    </motion.button>
                  </div>

                  {newsletterError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-rose-400 font-semibold flex items-center gap-1 mt-1"
                    >
                      <span>⚠️</span>
                      <span>{newsletterError}</span>
                    </motion.div>
                  )}

                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#788680",
                      marginTop: "6px",
                    }}
                  >
                    🔒 No spam. Only exciting new arrivals & special deals.
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="footer-bottom-strip flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-8 border-t border-white/10 text-xs text-stone-400">
          <div>
            © 2026 गृहम 99+ (Griham 99+ Retail). All Rights Reserved. Indian
            Retail Store.
          </div>

          <div className="payment-icons-strip flex flex-wrap gap-2 justify-center sm:justify-end">
            <span
              style={{
                fontSize: "0.75rem",
                color: "#A6B4AD",
                marginRight: "4px",
              }}
            >
              Accepted:
            </span>
            <span className="payment-badge">UPI (GPay / PhonePe / Paytm)</span>
            <span className="payment-badge">Cash on Delivery (COD)</span>
            <span className="payment-badge">RuPay / Visa / Master</span>
            <span className="payment-badge">Net Banking</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
