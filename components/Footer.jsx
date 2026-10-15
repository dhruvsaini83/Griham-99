"use client";

import React, { useState } from "react";
import Link from "next/link";
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
            <Link
              href="/"
              onClick={() => {
                setActiveCategory("all");
                setMaxPrice(499);
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
                cursor: "pointer",
              }}
              aria-label="Griham 99+ Home"
            >
              <div
                className="brand-logo-wrap flex items-center justify-center shrink-0"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              >
                <img
                  src="/assets/logo.svg"
                  alt="Griham 99+ Logo"
                  className="brand-logo-gold-glow"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
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
            </Link>
            <p className="footer-brand-desc">
              {language === "hi"
                ? "भारतीय परिवारों के लिए दैनिक आवश्यकताएं, रसोई का सामान, उत्सव की सजावट और व्यक्तिगत देखभाल — सिर्फ ₹49 से शुरू होने वाले दामों पर।"
                : "Bringing 99+ varieties of everyday essentials, useful kitchen finds, sacred festive decor and beauty care to Indian homes with prices starting at honest ₹49."}
            </p>
            <div className="flex flex-col gap-1.5 mt-3 text-xs sm:text-sm">
              <a
                href={`tel:${siteConfig.supportPhoneTel || "+919352456169"}`}
                className="flex items-center gap-2 text-[#E6C875] hover:text-white transition-colors font-bold min-h-[36px]"
                aria-label={`Call Support ${siteConfig.supportPhone}`}
              >
                <span>📞</span>
                <span>
                  {siteConfig.supportPhone}{" "}
                  <span className="text-[11px] font-normal text-stone-400">
                    ({siteConfig.supportHours})
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.supportEmail || "support@griham99.com"}`}
                className="flex items-center gap-2 text-[#E6C875] hover:text-white transition-colors font-bold min-h-[36px]"
                aria-label={`Email Support ${siteConfig.supportEmail || "support@griham99.com"}`}
              >
                <span>✉️</span>
                <span>{siteConfig.supportEmail || "support@griham99.com"}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Griham 99+, I need support regarding an order / product."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:underline font-bold min-h-[36px]"
                aria-label="Chat on WhatsApp"
              >
                <span>💬</span>
                <span>WhatsApp: +91 93524 56169</span>
              </a>
            </div>

            {/* Jaipur Physical Store Address Card */}
            <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-[#C9A24A]/30 text-xs text-stone-200">
              <div className="text-[11px] uppercase tracking-wider text-[#FCE59F] font-bold mb-1 flex items-center gap-1.5">
                <span>📍</span>
                <span>{language === "hi" ? "जयपुर रिटेल स्टोर" : "Jaipur Retail Store"}</span>
              </div>
              <p className="text-stone-300 leading-relaxed text-[11px] sm:text-xs">
                {siteConfig.address.fullAddress}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2 sm:gap-3">
                <a
                  href={siteConfig.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#E6C875] hover:text-white underline min-h-[30px]"
                  aria-label="View Griham 99 Store on Google Maps"
                >
                  <span>🗺️</span>
                  <span>{language === "hi" ? "गूगल मैप्स पर देखें" : "View on Google Maps"}</span>
                </a>
                <a
                  href={siteConfig.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-white/90 hover:text-[#FCE59F] underline min-h-[30px]"
                  aria-label="Get Directions to Griham 99 Store"
                >
                  <span>🧭</span>
                  <span>{language === "hi" ? "रास्ता देखें" : "Directions"} &rarr;</span>
                </a>
                <Link
                  href="/about#store-location"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-300 hover:text-white min-h-[30px]"
                >
                  <span>⏰</span>
                  <span>{siteConfig.storeHours}</span>
                </Link>
              </div>
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
                  Home Essentials & Lights
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
                  Gifts & Festive Diyas
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="footer-link"
                  onClick={() => handleCategoryNav("storage")}
                >
                  Storage & Jars
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="footer-link"
                  onClick={() => handleCategoryNav("toys")}
                >
                  Toys & Kids Items
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  className="footer-link"
                  onClick={handlePriceUnder99}
                >
                  🔥 Finds Under ₹99 Store
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
                <Link
                  href="/about"
                  className="footer-link text-[#E6C875] font-semibold flex items-center gap-1.5"
                >
                  <span>📖</span>
                  <span>{language === "hi" ? "हमारे बारे में (About Us)" : "About Us & Story"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about#store-location"
                  className="footer-link text-[#E6C875] font-semibold flex items-center gap-1.5"
                >
                  <span>📍</span>
                  <span>{language === "hi" ? "जयपुर स्टोर लोकेशन & मैप" : "Jaipur Store & Live Map"}</span>
                </Link>
              </li>
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
            © {new Date().getFullYear()} गृहम 99+ (Griham 99+ Retail). All Rights Reserved. Indian
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
