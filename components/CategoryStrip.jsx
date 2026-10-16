"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";

const CATEGORIES_DATA = [
  {
    id: "home",
    name: "Home Essentials",
    subtitle: "Starts at ₹49 • Lights & Decor",
    image:
      "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "kitchen",
    name: "Kitchen & Dining",
    subtitle: "Starts at ₹79 • Choppers & Steel",
    image:
      "https://images.unsplash.com/photo-1584990347449-39b007c6999b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    subtitle: "Starts at ₹49 • Combs, Soaps, Mist",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "toys",
    name: "Toys & Kids Items",
    subtitle: "Starts at ₹89 • Educational & Games",
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "gifts",
    name: "Gifts & Decor",
    subtitle: "Starts at ₹49 • Diyas, Candles & Idols",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lifestyle",
    name: "Lifestyle Accessories",
    subtitle: "Starts at ₹89 • Mugs, Keys & Stands",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "storage",
    name: "Storage & Organization",
    subtitle: "Starts at ₹89 • Boxes, Baskets & Pouches",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "utility",
    name: "Everyday Utility Products",
    subtitle: "Starts at ₹49 • Mops, Organizers, Tools",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
  },
];

export default function CategoryStrip() {
  const { setActiveCategory, language } = useShop();

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="section-padding overflow-hidden max-w-full"
      id="categories"
      style={{ background: "#FFFFFF" }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrap">
            <span className="section-eyebrow">
              {language === "hi" ? "श्रेणी अनुसार खोजें" : "EXPLORE BY AISLE"}
            </span>
            <h2 className="section-heading">
              {language === "hi"
                ? "8 मुख्य श्रेणियां देखें"
                : "Shop 8 Core Categories"}
            </h2>
            <p className="section-subheading">
              {language === "hi"
                ? "प्रत्येक श्रेणी में भारतीय परिवारों के लिए 99+ किस्में उपलब्ध।"
                : "Every aisle stocked with 99+ varieties for Indian everyday households."}
            </p>
          </div>
          <a
            href="#catalog"
            className="view-all-link"
            onClick={() => setActiveCategory("all")}
          >
            {language === "hi" ? "सभी किस्में देखें &rarr;" : "View All Varieties &rarr;"}
          </a>
        </div>

        <div className="category-grid flex sm:grid overflow-x-auto sm:overflow-visible scrollbar-hide snap-x snap-mandatory sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              className="category-card shrink-0 snap-start w-[190px] sm:w-auto min-h-[44px] cursor-pointer"
              onClick={() => handleCategoryClick(cat.id)}
            >
              <div className="category-card-img-wrap">
                <img
                  src={cat.image}
                  alt={`${cat.name} products at 99 rupees - Griham 99+`}
                  loading="lazy"
                />
              </div>
              <div className="category-card-body p-3">
                <h3 className="category-card-title text-sm sm:text-base font-bold text-[#18201C]">
                  {cat.name}
                </h3>
                <span className="category-card-count text-xs text-stone-500 block mb-1">
                  {cat.subtitle}
                </span>
                <Link
                  href={`/category/${cat.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[11px] font-extrabold text-[#9A7B38] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Hub &rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
