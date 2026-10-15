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
    <section className="price-strip-section overflow-hidden max-w-full" id="price-strip">
      <div className="container">
        <div className="price-strip-header">
          <h2 className="price-strip-title">
            {language === "hi"
              ? "शानदार खोजें — सिर्फ ₹49 से शुरू"
              : "Great Finds Start at ₹49"}
          </h2>
          <p className="price-strip-subtitle">
            {language === "hi"
              ? "अपने पसंदीदा बजट के अनुसार तुरंत उत्पाद चुनें"
              : "Filter instantly by your preferred budget"}
          </p>
        </div>

        <div className="price-tier-pills flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2 sm:gap-3 pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
          {TIERS.map((tier, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.96 }}
              className={`price-pill-btn shrink-0 snap-start min-h-[44px] transition-colors duration-200 relative ${tier.match ? "active" : ""}`}
              onClick={() => handlePriceClick(tier.limit, tier.cat)}
            >
              {tier.match && (
                <motion.div
                  layoutId="active-price-tier-indicator"
                  className="active-pill-indicator absolute inset-0 bg-[#073B2A] rounded-full -z-10 shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tier.label}</span>
              <span className="pill-tag relative z-10">{tier.tag}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
