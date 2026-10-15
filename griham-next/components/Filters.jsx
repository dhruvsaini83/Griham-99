"use client";

import React from "react";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";

export default function Filters({ filteredCount, totalCount }) {
  const {
    activeCategory,
    setActiveCategory,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    language,
  } = useShop();

  const handleReset = () => {
    setActiveCategory("all");
    setMaxPrice(499);
    setSortBy("featured");
    setSearchQuery("");
  };

  const isFiltered =
    activeCategory !== "all" ||
    maxPrice < 499 ||
    sortBy !== "featured" ||
    Boolean(searchQuery);

  const TABS = [
    { id: "all", label: language === "hi" ? "सभी उत्पाद" : "All Items", icon: "" },
    { id: "bestseller", label: language === "hi" ? "बेस्टसेलर" : "Bestsellers", icon: "⭐" },
    { id: "under99", label: language === "hi" ? "₹99 के नीचे" : "Under ₹99", icon: "⚡" },
    { id: "kitchen", label: language === "hi" ? "रसोई" : "Kitchen", icon: "🍳" },
    { id: "home", label: language === "hi" ? "घर" : "Home", icon: "🏠" },
    { id: "beauty", label: language === "hi" ? "सौंदर्य" : "Beauty", icon: "🌿" },
    { id: "storage", label: language === "hi" ? "स्टोरेज" : "Storage", icon: "📦" },
    { id: "gifts", label: language === "hi" ? "उपहार" : "Gifts", icon: "🎁" },
  ];

  return (
    <div className="catalog-filter-wrapper mb-6">
      {/* Category & Collection Pills with Framer Motion layoutId sliding gold indicator */}
      <div className="catalog-filter-bar flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="collection-tabs flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2 sm:gap-3 pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 w-full md:w-auto">
          {TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                className={`collection-tab-btn relative shrink-0 snap-start min-h-[44px] px-3.5 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors duration-200 z-0 ${
                  isActive
                    ? "text-[#073B2A] font-extrabold"
                    : "text-stone-700 hover:text-stone-900 bg-[#F4EFE6]/80"
                }`}
                onClick={() => {
                  setActiveCategory(tab.id);
                  if (tab.id === "under99") setMaxPrice(99);
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#C9A24A] rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab.icon && <span>{tab.icon}</span>}
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Sorting Dropdown */}
        <div className="catalog-sort-wrap flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto shrink-0">
          <label htmlFor="catalogSort" className="text-xs sm:text-sm font-semibold text-stone-600 whitespace-nowrap">
            {language === "hi" ? "क्रमबद्ध करें:" : "Sort By:"}
          </label>
          <select
            id="catalogSort"
            className="sort-select min-h-[44px] px-3 py-2 rounded-lg border border-[#E7E1D5] bg-[#F8F3E8] text-sm font-semibold flex-1 sm:flex-initial"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">
              {language === "hi" ? "खास पसंद (Featured)" : "Featured Picks"}
            </option>
            <option value="price-asc">
              {language === "hi"
                ? "मूल्य: कम से ज्यादा (₹49 से)"
                : "Price: Low to High (From ₹49)"}
            </option>
            <option value="price-desc">
              {language === "hi"
                ? "मूल्य: ज्यादा से कम"
                : "Price: High to Low"}
            </option>
            <option value="rating">
              {language === "hi" ? "उच्चतम रेटिंग" : "Highest Rated"}
            </option>
            <option value="discount">
              {language === "hi" ? "सर्वाधिक बचत" : "Biggest Savings"}
            </option>
          </select>
        </div>
      </div>

      {/* Price Slider Bar */}
      <div
        className="price-slider-strip w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl mt-3.5 border border-[#C9A24A]/25 bg-[#C9A24A]/10"
      >
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <span
            className="font-bold text-xs sm:text-sm text-[#073B2A] tracking-wide"
          >
            {language === "hi" ? "अधिकतम मूल्य (बजट):" : "Max Price (Budget):"}
          </span>
          <span
            className="bg-[#073B2A] text-[#E6C875] px-3 py-1 rounded-full font-extrabold text-sm shadow-sm transition-transform duration-200"
          >
            ₹{maxPrice}
          </span>
        </div>

        <div
          className="flex items-center gap-3 w-full sm:flex-1 sm:max-w-md"
        >
          <span className="text-xs text-stone-600 font-bold shrink-0">
            ₹49
          </span>
          <input
            type="range"
            min="49"
            max="499"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 rounded-lg accent-[#C9A24A] cursor-pointer transition-all duration-150"
          />
          <span className="text-xs text-stone-600 font-bold shrink-0">
            ₹499+
          </span>
        </div>

        {searchQuery && (
          <div className="text-xs sm:text-sm text-[#073B2A] truncate">
            Search: <strong>&quot;{searchQuery}&quot;</strong>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      <div className="active-filter-indicator mt-3">
        <span>
          {language === "hi"
            ? `कुल ${filteredCount} उत्पाद प्रदर्शित (कुल ${totalCount} में से)`
            : `Showing ${filteredCount} of ${totalCount} verified products`}
        </span>
        {isFiltered && (
          <button className="clear-filters-btn" onClick={handleReset}>
            {language === "hi" ? "सभी फिल्टर हटाएं ✕" : "Reset All Filters ✕"}
          </button>
        )}
      </div>
    </div>
  );
}
