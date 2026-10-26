"use client";

import React from "react";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";

export default function PriceStrip() {
  const { maxPrice, setMaxPrice, setActiveCategory, language } = useShop();

  const handlePriceClick = (limit, cat = "all") => {
    setMaxPrice(limit);
    setActiveCategory(cat);
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const TIERS = [
    { limit: 499, cat: "all", label: language === "hi" ? "सभी उत्पाद" : "All Products", tag: "24+ Items", match: maxPrice >= 499 },
    { limit: 99, cat: "under99", label: language === "hi" ? "₹99 के नीचे" : "Finds Under ₹99", tag: "From ₹49", match: maxPrice === 99 },
    { limit: 199, cat: "all", label: "₹99 to ₹199", tag: "Most Popular", match: maxPrice === 199 },
    { limit: 299, cat: "all", label: "₹199 to ₹299", tag: "Value Packs", match: maxPrice === 299 },
    { limit: 499, cat: "all", label: "Above ₹299", tag: "Premium Picks", match: maxPrice === 499 && maxPrice !== 99 && maxPrice !== 199 && maxPrice !== 299 },
  ];

  return (
    <section className="bg-gradient-to-b from-[#073B2A]/5 via-white to-white py-6 border-b border-[#E7E1D5]" id="price-strip">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#073B2A] tracking-tight">
              {language === "hi"
                ? "बजट के अनुसार खोजें — शुरुआत सिर्फ ₹49 से"
                : "Shop by Budget — Starting at Just ₹49"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {language === "hi"
                ? "पारदर्शी मूल्य निर्धारण, कोई छिपे हुए शुल्क नहीं"
                : "Direct manufacturer pricing with no hidden charges"}
            </p>
          </div>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2.5 sm:gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {TIERS.map((tier, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.97 }}
              onClick={() => handlePriceClick(tier.limit, tier.cat)}
              className={`shrink-0 snap-start min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all ${
                tier.match
                  ? "bg-[#073B2A] text-white border-[#073B2A] shadow-md"
                  : "bg-white text-stone-700 border-stone-200 hover:border-[#C9A24A] hover:bg-stone-50"
              }`}
            >
              <span>{tier.label}</span>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  tier.match
                    ? "bg-[#C9A24A] text-[#073B2A]"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {tier.tag}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
