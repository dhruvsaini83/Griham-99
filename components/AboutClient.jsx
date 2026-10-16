"use client";

import React, { useState } from "react";
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
import { luxuryEase } from "@/lib/animations";
import { siteConfig } from "@/lib/config";

// Local Business & Store JSON-LD Schema for Google Local SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://griham99.com/about#store",
  "name": "Griham 99 Store",
  "alternateName": "गृहम 99",
  "description":
    "Griham 99 Store - Apka Apna Ghar Ka Store at Gali No. 15, Sachivalaya Colony, Adarsh Bazar, Barkat Nagar, Tonk Phatak, Jaipur (302015). Jaipur based family store providing 99+ everyday essentials, kitchen utility, and festive decor starting at ₹49 for Indian households.",
  "image": [
    "https://griham99.com/assets/logo.svg",
    "/assets/logo.svg",
    "/assets/IMG-20261006-WA0023.jpg",
    "https://griham99.com/assets/IMG-20261006-WA0023.jpg"
  ],
  "logo": "https://griham99.com/assets/logo.svg",
  "url": "https://griham99.com/about",
  "telephone": siteConfig.supportPhone,
  "email": siteConfig.supportEmail,
  "priceRange": "₹49 - ₹999",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Google Pay, PhonePe, Paytm, Net Banking",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": siteConfig.address.line1 + ", " + siteConfig.address.landmark,
    "addressLocality": siteConfig.address.city,
    "addressRegion": siteConfig.address.state,
    "postalCode": siteConfig.address.pincode,
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": siteConfig.geo.latitude,
    "longitude": siteConfig.geo.longitude
  },
  "openingHours": "Mo-Su 10:00-21:00",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "21:00"
    }
  ],
  "hasMap": siteConfig.googleMapsSearchUrl,
  "sameAs": [
    `https://wa.me/${siteConfig.whatsappNumber}`
  ]
};

function AboutPageContent() {
  const { language, showToast } = useShop();
  const [mapError, setMapError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(siteConfig.address.fullAddress);
      setCopied(true);
      showToast(
        language === "hi"
          ? "✅ स्टोर का पता कॉपी हो गया है!"
          : "✅ Store address copied to clipboard!"
      );
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#18201C] overflow-x-hidden">
      {/* Schema Markup for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Main Global Header */}
      <Header />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-[#052E21] border-b border-[#C9A24A]/20 py-2.5 px-4 text-xs">
          <div className="container max-w-7xl mx-auto flex items-center gap-2 text-stone-300">
            <Link href="/" className="hover:text-[#FCE59F] transition-colors">
              {language === "hi" ? "होम" : "Home"}
            </Link>
            <span className="text-[#C9A24A]">&rsaquo;</span>
            <span className="text-[#FCE59F] font-semibold">
              {language === "hi" ? "हमारे बारे में और स्टोर लोकेशन" : "About Us & Store Locator"}
            </span>
          </div>
        </div>

        {/* ===================== HERO SECTION ===================== */}
        <section className="relative bg-[#073B2A] text-white py-14 md:py-20 px-4 overflow-hidden border-b border-[#C9A24A]/30">
          {/* Subtle Background Radial Aura */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#C9A24A] blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#168752] blur-3xl" />
          </div>

          <div className="container max-w-7xl mx-auto relative z-10 text-center">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A24A]/40 text-[#FCE59F] text-xs font-bold uppercase tracking-wider mb-5 shadow-sm"
            >
              <span>🏛️</span>
              <span>
                {language === "hi"
                  ? "जयपुर राजस्थान का अपना स्टोर • शुद्ध स्वदेशी भाव"
                  : "Jaipur, Rajasthan • Everyday Retail Experience"}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto"
            >
              <span className="text-[#FCE59F] block mb-2 font-serif">
                गृहम 99+ Store Jaipur
              </span>
              <span className="bg-gradient-to-r from-white via-[#FCE59F] to-white bg-clip-text text-transparent">
                Apka Apna Ghar Ka 99 Store
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: luxuryEase }}
              className="mt-4 text-base sm:text-lg md:text-xl text-stone-200 max-w-2xl mx-auto font-normal leading-relaxed"
            >
              {language === "hi"
                ? "बरकत नगर (टोंक फाटक), जयपुर में स्थित आपका अपना पारिवारिक खुदरा स्टोर, जहां घर-गृहस्थी, रसोई, पूजा एवं उपहार की 99+ वैरायटी मिलती है केवल ₹49 से शुरू होने वाले दाम पर।"
                : "A Jaipur-born family retail destination in Barkat Nagar, Tonk Phatak, bringing 99+ varieties of everyday essentials, durable kitchenware, and festive decor to Indian households starting at honest ₹49."}
            </motion.p>

            {/* Quick Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: luxuryEase }}
              className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold"
            >
              <span className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-[#C9A24A]/30 flex items-center gap-2 text-white">
                <span className="text-[#C9A24A]">🪙</span> Starts @ ₹49 Honest Pricing
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-[#C9A24A]/30 flex items-center gap-2 text-white">
                <span className="text-[#C9A24A]">✨</span> 99+ Product Varieties
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-[#C9A24A]/30 flex items-center gap-2 text-white">
                <span className="text-[#C9A24A]">📍</span> Barkat Nagar, Tonk Phatak
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-[#C9A24A]/30 flex items-center gap-2 text-white">
                <span className="text-[#C9A24A]">📌</span> Plus Code: VQHV+G3R
              </span>
              <span className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-[#C9A24A]/30 flex items-center gap-2 text-white">
                <span className="text-[#C9A24A]">⏰</span> Open All 7 Days (10 AM - 9 PM)
              </span>
            </motion.div>
          </div>
        </section>

        {/* ===================== SECTION 1: OUR STORY ===================== */}
        <section className="py-14 md:py-20 px-4 bg-[#FAF7F2]">
          <div className="container max-w-7xl mx-auto">
            {/* Section Tag */}
            <div className="text-center mb-10">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#C9A24A] bg-[#073B2A]/10 px-3 py-1 rounded-full border border-[#C9A24A]/30 inline-block mb-2">
                {language === "hi" ? "हमारी कहानी" : "Our Heritage & Story"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#073B2A] tracking-tight">
                {language === "hi"
                  ? "गुलाबी नगर जयपुर से हर भारतीय घर तक"
                  : "From the Heart of Jaipur to Every Indian Home"}
              </h2>
              <div className="w-16 h-1 bg-[#C9A24A] mx-auto mt-3 rounded-full" />
            </div>

            {/* 2 Columns: Image Left, Story Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Image of shop / products */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: luxuryEase }}
                className="lg:col-span-5 relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C9A24A]/40 bg-[#073B2A]">
                  <img
                    src="/assets/IMG-20261006-WA0023.jpg"
                    alt="Griham 99 Store - Real Shop Storefront Jaipur"
                    className="w-full h-[360px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#073B2A] via-transparent to-black/20 pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 bg-[#073B2A]/90 backdrop-blur-md border border-[#C9A24A] text-[#FCE59F] text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                    <span>📍</span>
                    <span>Barkat Nagar, Tonk Phatak, Jaipur</span>
                  </div>

                  {/* Bottom Image Caption Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#C9A24A]/30 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-black text-sm text-[#073B2A]">
                          गृहम 99 Store (Barkat Nagar)
                        </h4>
                        <p className="text-xs text-stone-600">
                          Handpicked Home & Kitchen Essentials
                        </p>
                      </div>
                      <span className="text-xs font-black px-2.5 py-1 rounded bg-[#C9A24A] text-[#073B2A]">
                        Starts ₹49
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Frame Element */}
                <div className="hidden sm:block absolute -bottom-3 -right-3 w-full h-full border-2 border-[#C9A24A]/30 rounded-2xl -z-10 pointer-events-none" />
              </motion.div>

              {/* Right Column: Story in Hindi + English */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: luxuryEase }}
                className="lg:col-span-7 flex flex-col gap-6"
              >
                {/* Hindi Story Card */}
                <div className="p-6 rounded-2xl bg-white border border-[#C9A24A]/30 shadow-md">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-full bg-[#073B2A] text-[#C9A24A] flex items-center justify-center text-xs font-black">
                      हिं
                    </span>
                    <h3 className="font-serif font-black text-lg sm:text-xl text-[#073B2A]">
                      हमारी शुरुआत — आपका अपना घर का स्टोर
                    </h3>
                  </div>
                  <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                    <strong>गृहम 99+</strong> की शुरुआत जयपुर (राजस्थान) से एक सीधे और सच्चे संकल्प के साथ हुई — हर भारतीय परिवार को दैनिक गृहस्थी, रसोई के उपयोगी बर्तन, पूजा के सुंदर दीये और घरेलू सजावट का सामान उच्चतम गुणवत्ता के साथ सबसे किफायती दामों पर उपलब्ध कराना।
                  </p>
                  <p className="text-stone-700 leading-relaxed text-sm sm:text-base mt-2.5">
                    हमने देखा कि बाज़ार में साधारण ज़रूरत की चीज़ों पर भी गैर-ज़रूरी मुनाफा और चमक-दमक के नाम पर 2 से 3 गुना अधिक दाम वसूले जाते हैं। इसलिए हमने स्थानीय निर्माताओं और दस्तकारों से सीधे जुड़कर बिचौलियों को हटाया और <strong>99+ वैरायटी के उपयोगी सामान को सीधे ₹49 से ₹99+</strong> के पारदर्शी दामों पर उपलब्ध कराया।
                  </p>
                </div>

                {/* English Story Card */}
                <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-md">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-full bg-[#073B2A] text-[#C9A24A] flex items-center justify-center text-xs font-black">
                      EN
                    </span>
                    <h3 className="font-black text-lg sm:text-xl text-[#073B2A]">
                      A Jaipur-Based Family Mission
                    </h3>
                  </div>
                  <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                    Rooted in the royal, warm heritage of Jaipur, Rajasthan, <strong>Griham 99+</strong> was born out of a desire to redefine everyday retail. We believe premium everyday utility should never be a luxury. From solid stainless steel strainers and airtight kitchen jars to handcrafted brass diyas and herbal wellness products, our curation focuses on what truly matters: durability, utility, and honest pricing.
                  </p>
                  <p className="text-stone-700 leading-relaxed text-sm sm:text-base mt-2.5">
                    Today, our walk-in retail store in Barkat Nagar (Tonk Phatak) welcomes families every single day, while our online store delivers the same trusted savings straight to doorsteps across India.
                  </p>
                </div>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#073B2A]/5 rounded-xl border border-[#C9A24A]/20 text-center">
                    <div className="text-xl mb-1">🪙</div>
                    <div className="text-xs font-black text-[#073B2A]">Starts @ ₹49</div>
                    <div className="text-[10px] text-stone-500">Honest Pricing</div>
                  </div>
                  <div className="p-3 bg-[#073B2A]/5 rounded-xl border border-[#C9A24A]/20 text-center">
                    <div className="text-xl mb-1">🛡️</div>
                    <div className="text-xs font-black text-[#073B2A]">100% Quality</div>
                    <div className="text-[10px] text-stone-500">Physical Verified</div>
                  </div>
                  <div className="p-3 bg-[#073B2A]/5 rounded-xl border border-[#C9A24A]/20 text-center">
                    <div className="text-xl mb-1">🪔</div>
                    <div className="text-xs font-black text-[#073B2A]">99+ Varieties</div>
                    <div className="text-[10px] text-stone-500">Everyday Range</div>
                  </div>
                  <div className="p-3 bg-[#073B2A]/5 rounded-xl border border-[#C9A24A]/20 text-center">
                    <div className="text-xl mb-1">🤝</div>
                    <div className="text-xs font-black text-[#073B2A]">Jaipur Family</div>
                    <div className="text-[10px] text-stone-500">Local Heritage</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================== SECTION 2: VISIT OUR STORE (MOST IMPORTANT) ===================== */}
        <section
          id="store-location"
          className="py-14 md:py-20 px-4 bg-gradient-to-b from-[#073B2A] to-[#041F18] text-white border-y border-[#C9A24A]/30 relative"
        >
          <div className="container max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#073B2A] bg-[#C9A24A] px-3.5 py-1 rounded-full inline-block mb-3 shadow">
                📍 {language === "hi" ? "स्टोर पर पधारें" : "Store Experience"}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Visit Our Store •{" "}
                <span className="text-[#FCE59F] font-serif">पधारो म्हारे स्टोर</span>
              </h2>
              <p className="mt-3 text-stone-300 max-w-2xl mx-auto text-sm sm:text-base">
                {language === "hi"
                  ? "गली नं. 15, सचिवालय कॉलोनी, आदर्श बाज़ार, बरकत नगर (टोंक फाटक), जयपुर स्थित हमारे रिटेल स्टोर पर आएं। 99+ वैरायटी को अपनी आंखों से देखें और परखें।"
                  : "Step inside our physical storefront at Gali No. 15, Sachivalaya Colony, Adarsh Bazar, Barkat Nagar, Tonk Phatak, Jaipur (302015). Touch and feel 99+ curated products."}
              </p>
              <div className="w-20 h-1 bg-[#C9A24A] mx-auto mt-4 rounded-full" />
            </div>

            {/* Responsive Layout: Stacked (flex-col) on mobile, Side by Side (lg:flex-row / grid) on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* LEFT: Address Card (lg:col-span-5) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: luxuryEase }}
                className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-[#C9A24A]/40 shadow-2xl relative overflow-hidden"
              >
                {/* Gold Crest Accent in Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24A]/10 rounded-bl-full pointer-events-none" />

                <div>
                  {/* Store Name & Subtitle */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 flex items-center justify-center shrink-0">
                      <img
                        src="/assets/logo.svg"
                        alt={siteConfig.storeName}
                        className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(201,162,74,0.55)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                        {siteConfig.storeName}
                      </h3>
                      <p className="text-xs text-[#FCE59F] tracking-wide uppercase font-semibold">
                        {siteConfig.storeHeadline} • {siteConfig.address.city}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 my-6 text-sm text-stone-200">
                    {/* Full Address */}
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-black/20 border border-[#C9A24A]/20">
                      <span className="text-xl text-[#C9A24A] shrink-0 mt-0.5">
                        📍
                      </span>
                      <div className="flex-1">
                        <strong className="block text-white text-xs uppercase tracking-wider text-[#FCE59F] mb-1">
                          {language === "hi" ? "स्टोर का पूरा पता" : "Store Address"}
                        </strong>
                        <p className="text-stone-200 leading-relaxed font-medium">
                          {siteConfig.address.fullAddress}
                        </p>
                        <p className="text-[11px] text-[#E6C875] mt-1 flex items-center gap-1">
                          <span>📌 Plus Code:</span>
                          <strong>{siteConfig.address.plusCode}</strong>
                          <span className="mx-1">•</span>
                          <span>Landmark: {siteConfig.address.landmark}</span>
                        </p>
                      </div>
                    </div>

                    {/* Store Timings */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/20 border border-[#C9A24A]/20">
                      <span className="text-xl text-[#C9A24A] shrink-0">
                        ⏰
                      </span>
                      <div>
                        <strong className="block text-white text-xs uppercase tracking-wider text-[#FCE59F] mb-0.5">
                          {language === "hi" ? "खुलने का समय" : "Store Hours"}
                        </strong>
                        <span className="text-white font-bold">
                          {siteConfig.storeHours}
                        </span>
                        <span className="block text-[11px] text-emerald-400 font-semibold">
                          ✓ Open All 7 Days (Mon - Sun)
                        </span>
                      </div>
                    </div>

                    {/* Contact Phone & WhatsApp */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/20 border border-[#C9A24A]/20">
                      <span className="text-xl text-[#C9A24A] shrink-0">
                        📞
                      </span>
                      <div>
                        <strong className="block text-white text-xs uppercase tracking-wider text-[#FCE59F] mb-0.5">
                          {language === "hi" ? "संपर्क सूत्र" : "Direct Phone / Support"}
                        </strong>
                        <a
                          href={`tel:${siteConfig.supportPhoneTel}`}
                          className="text-white hover:text-[#FCE59F] font-bold text-base transition-colors"
                        >
                          {siteConfig.supportPhone}
                        </a>
                        <span className="block text-[11px] text-stone-400">
                          {siteConfig.supportEmail}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Store Amenities Checkmarks */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-300 mb-6 py-2 border-y border-white/10">
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Free Parking
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Air Conditioned
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> UPI / QR Pay
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Instant Billing
                    </span>
                  </div>
                </div>

                {/* 3 High-Impact Action Buttons (Touch Target min-h-[48px]) */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {/* Button 1: Get Directions */}
                  <a
                    href={siteConfig.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-4 py-3 rounded-xl bg-[#C9A24A] hover:bg-[#dbb357] text-[#073B2A] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95 flex-1"
                    aria-label="Get Directions to Griham 99+ on Google Maps"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                    </svg>
                    <span>{language === "hi" ? "रास्ता देखें (Directions)" : "Get Directions"}</span>
                  </a>

                  {/* Button 2: Call Now */}
                  <a
                    href={`tel:${siteConfig.supportPhoneTel}`}
                    className="min-h-[48px] px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/20 transition-all active:scale-95 flex-1"
                    aria-label="Call Griham 99+ Store"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>{language === "hi" ? "कॉल करें" : "Call Now"}</span>
                  </a>

                  {/* Button 3: WhatsApp Us */}
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                      "Namaste Griham 99+, I would like to visit your Barkat Nagar Tonk Phatak Jaipur store or inquire about product availability."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow transition-all active:scale-95 flex-1"
                    aria-label="Chat with Griham 99+ on WhatsApp"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Copy Address Shortcut */}
                <div className="mt-3 text-center">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="text-xs text-[#E6C875] hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>📋</span>
                    <span>
                      {copied
                        ? (language === "hi" ? "पता कॉपी हो गया!" : "Address Copied!")
                        : (language === "hi" ? "क्लिक करके पता कॉपी करें" : "Click to copy address")}
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* RIGHT: Live Map - Google Maps Embed Iframe (lg:col-span-7) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: luxuryEase }}
                className="lg:col-span-7 flex flex-col"
              >
                {/* Map Card Wrapper */}
                <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C9A24A]/40 bg-[#073B2A] flex flex-col justify-between">
                  {!mapError ? (
                    <iframe
                      src={siteConfig.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="Griham 99 Store (गृहम 99) - Jaipur Google Maps Location"
                      className="w-full h-full rounded-2xl"
                      onError={() => setMapError(true)}
                    />
                  ) : (
                    /* Fallback Card if map fails */
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#073B2A] text-white">
                      <img
                        src="/assets/IMG-20261006-WA0023.jpg"
                        alt="Griham 99 Store Jaipur Location"
                        className="absolute inset-0 w-full h-full object-cover opacity-25"
                      />
                      <div className="relative z-10 max-w-md p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-[#C9A24A]/50">
                        <div className="text-3xl mb-2">🗺️</div>
                        <h4 className="text-lg font-black text-[#FCE59F] mb-1">
                          Griham 99 Store, Barkat Nagar
                        </h4>
                        <p className="text-xs text-stone-300 mb-4">
                          {siteConfig.address.fullAddress}
                        </p>
                        <a
                          href={siteConfig.googleMapsDirectionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#C9A24A] text-[#073B2A] font-extrabold text-sm inline-flex items-center gap-2 shadow"
                        >
                          <span>📍 Open in Google Maps App &rarr;</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Overlay Badge at Bottom of Map */}
                  <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-[#073B2A]/90 backdrop-blur-md border border-[#C9A24A]/40 text-white px-3.5 py-2 rounded-xl text-xs flex items-center justify-between sm:justify-start gap-2 shadow-lg pointer-events-auto">
                    <span className="flex items-center gap-1.5 font-bold text-[#FCE59F]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Store Pin: Barkat Nagar, Tonk Phatak (302015)
                    </span>
                    <a
                      href={siteConfig.googleMapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#C9A24A] hover:underline font-extrabold ml-2"
                    >
                      Enlarge Map &rarr;
                    </a>
                  </div>
                </div>

                {/* Sub-card below map */}
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <span className="text-base text-[#C9A24A]">💡</span>
                    <span>
                      {language === "hi"
                        ? "ऑटो/कैब से आ रहे हैं? 'आदर्श बाज़ार, बरकत नगर / टोंक फाटक' मुख्य लैंडमार्क है (Plus Code: VQHV+G3R)।"
                        : "Coming by Cab/Auto? 'Adarsh Bazar, Barkat Nagar / Tonk Phatak' is our primary landmark (Plus Code: VQHV+G3R)."}
                    </span>
                  </div>
                  <a
                    href={siteConfig.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E6C875] hover:text-white font-bold underline shrink-0"
                  >
                    Navigate on Phone &rarr;
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================== SECTION 3: FAQ / STORE AMENITIES ===================== */}
        <section className="py-14 px-4 bg-[#FAF7F2]">
          <div className="container max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-black text-[#073B2A]">
                {language === "hi"
                  ? "अक्सर पूछे जाने वाले सवाल (स्टोर विज़िट)"
                  : "Frequently Asked Questions About Visiting"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Everything you need to know before visiting Griham 99+ Jaipur
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#C9A24A]/20 shadow-sm">
                <h4 className="font-bold text-sm text-[#073B2A] mb-1">
                  💳 Which payment methods are accepted at the store?
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We accept Cash, all UPI apps (Google Pay, PhonePe, Paytm, BHIM), RuPay, Visa, MasterCard, and NetBanking.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#C9A24A]/20 shadow-sm">
                <h4 className="font-bold text-sm text-[#073B2A] mb-1">
                  🚗 Is parking available at the Vaishali Nagar location?
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Yes, ample roadside and dedicated parking space is available right outside the store for two-wheelers and four-wheelers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#C9A24A]/20 shadow-sm">
                <h4 className="font-bold text-sm text-[#073B2A] mb-1">
                  📦 Can I order online and pick up at the store?
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Absolutely! Simply message us on WhatsApp with your selected items, and our team will keep your package packed and ready for quick pickup.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#C9A24A]/20 shadow-sm">
                <h4 className="font-bold text-sm text-[#073B2A] mb-1">
                  ✨ {language === "hi" ? "क्या सभी 99+ उत्पाद दुकान में उपलब्ध हैं?" : "Are all 99+ products in stock at the store?"}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {language === "hi"
                    ? "हाँ, हमारे बरकत नगर रिटेल स्टोर पर सभी दैनिक उपयोगी वस्तुएं, रसोई का सामान और उपहार सीधे देखकर खरीदने के लिए उपलब्ध हैं।"
                    : "Yes, our Barkat Nagar retail store stocks everyday essentials, kitchen utility, and gifts on display so you can touch, inspect quality, and buy directly."}
                </p>
              </div>
            </div>

            {/* Back to Home CTA */}
            <div className="text-center mt-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-[#073B2A] hover:bg-[#052e21] text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <span>&larr;</span>
                <span>{language === "hi" ? "ऑनलाइन 99+ कैटलॉग देखें" : "Explore Online 99+ Catalog"}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Store Footer */}
      <Footer />

      {/* Slide-In Drawers & Modals (Accessible everywhere on the site) */}
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

export default function AboutPage() {
  return (
    <ShopProvider>
      <AboutPageContent />
    </ShopProvider>
  );
}
