"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { staggerContainer } from "@/lib/animations";
import ProductCard from "./ProductCard";
import Filters from "./Filters";

export default function ProductGrid() {
  const {
    PRODUCTS,
    activeCategory,
    maxPrice,
    sortBy,
    searchQuery,
    language,
    setActiveCategory,
    setMaxPrice,
    setSearchQuery,
  } = useShop();

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Category / Collection filter
    if (activeCategory === "bestseller") {
      list = list.filter((p) => p.bestseller);
    } else if (activeCategory === "under99") {
      list = list.filter((p) => p.price <= 99);
    } else if (activeCategory === "new") {
      list = list.filter((p) => p.isNew);
    } else if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Price range filter
    list = list.filter((p) => p.price <= maxPrice);

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "discount") {
      list.sort(
        (a, b) =>
          b.originalPrice - b.price - (a.originalPrice - a.price)
      );
    }

    return list;
  }, [PRODUCTS, activeCategory, maxPrice, sortBy, searchQuery]);

  return (
    <section className="section-padding catalog-section overflow-hidden max-w-full" id="catalog">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrap">
            <span className="section-eyebrow">
              {language === "hi" ? "हमारी खास गैलरी" : "OUR CURATED AISLE"}
            </span>
            <h2 className="section-heading">
              {language === "hi"
                ? "किफायती व उपयोगी घरेलू वस्तुएं"
                : "Trending & Essential Products"}
            </h2>
            <p className="section-subheading">
              {language === "hi"
                ? "शुद्ध गुणवत्ता और पारदर्शी भारतीय खुदरा कीमतें — सिर्फ ₹49 से शुरू।"
                : "High quality products with transparent Indian retail pricing starting at just ₹49."}
            </p>
          </div>
        </div>

        {/* Filters Controls */}
        <Filters
          filteredCount={filteredProducts.length}
          totalCount={PRODUCTS.length}
        />

        {/* Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="catalog-empty-state animate-fadeIn">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">
              {language === "hi"
                ? "कोई उत्पाद नहीं मिला"
                : "No matching products found"}
            </h3>
            <p className="empty-state-desc">
              {language === "hi"
                ? "कृपया मूल्य सीमा बढ़ाएं या अन्य श्रेणी चुनें।"
                : "Try expanding your price range slider or clearing the search keyword."}
            </p>
            <button
              className="btn-gold-primary min-h-[44px] px-6 py-2.5 rounded-full font-bold hover:brightness-110 active:scale-95 transition-all"
              onClick={() => {
                setActiveCategory("all");
                setMaxPrice(499);
                setSearchQuery("");
              }}
            >
              {language === "hi" ? "सभी फिल्टर हटाएं" : "Clear All Filters"}
            </button>
          </div>
        ) : (
          <motion.div
            layout
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 px-3 sm:px-4 lg:px-8"
            id="productGridContainer"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id ?? product.productId ?? product._id}
                  product={product}
                  index={idx}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
