"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { luxuryEase } from "@/lib/animations";

const TICKER_MESSAGES = [
  "✨ 99+ Product Varieties across Home, Kitchen & Gifts — Starting at ₹49!",
  "🚚 Free Express Delivery Across India on Orders Above ₹499",
  "🎉 Festive Super Deals: Handcrafted Diya Sets & Fairy Lights Starting @ ₹49",
  "⭐ 100% Quality Checked Utility Products at Authentic Local Indian Prices",
];

export default function Header() {
  const {
    PRODUCTS,
    cartCount,
    cartSubtotal,
    wishlist,
    pincode,
    language,
    activeCategory,
    setActiveCategory,
    setMaxPrice,
    setSearchQuery,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsPincodeOpen,
    openQuickView,
    setLanguage,
  } = useShop();

  // Scroll state for sticky header elevation & glassmorphism
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ticker state
  const [tickerIndex, setTickerIndex] = useState(0);

  // Search state
  const [inputVal, setInputVal] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Lock body scroll when mobile drawer menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isMobileMenuOpen) {
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      if (!document.querySelector(".modal-backdrop.active, .slide-drawer.active")) {
        document.documentElement.classList.remove("modal-open");
        document.body.classList.remove("modal-open");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (!document.querySelector(".modal-backdrop.active, .slide-drawer.active")) {
        document.documentElement.classList.remove("modal-open");
        document.body.classList.remove("modal-open");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };
  }, [isMobileMenuOpen]);

  // Rotating ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Live search filtering
  useEffect(() => {
    const trimmed = inputVal.trim().toLowerCase();
    if (trimmed.length > 0) {
      const filtered = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          (p.description && p.description.toLowerCase().includes(trimmed))
      );
      setSearchResults(filtered);
      setIsDropdownOpen(true);
      setSelectedIndex(-1);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [inputVal, PRODUCTS]);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation for search
  const handleKeyDown = (e) => {
    if (!isDropdownOpen || searchResults.length === 0) {
      if (e.key === "Enter") {
        executeSearch();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        handleSelectProduct(searchResults[selectedIndex]);
      } else {
        executeSearch();
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const executeSearch = () => {
    setSearchQuery(inputVal.trim());
    setIsDropdownOpen(false);
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectProduct = (product) => {
    setIsDropdownOpen(false);
    setInputVal("");
    openQuickView(product);
  };

  const handleQuickTagClick = (tag) => {
    setInputVal(tag);
    setSearchQuery(tag);
    setIsDropdownOpen(false);
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryNav = (cat) => {
    setActiveCategory(cat);
    if (cat === "under99") {
      setMaxPrice(99);
    }
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar overflow-hidden w-full">
        <div className="container announcement-inner">
          <div className="announcement-ticker overflow-hidden">
            <span className="announcement-text truncate">
              {TICKER_MESSAGES[tickerIndex]}
            </span>
          </div>

          <div className="announcement-tools">
            <button
              className="pincode-btn"
              onClick={() => setIsPincodeOpen(true)}
              aria-label="Select delivery pincode"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Deliver to: {pincode.slice(0, 6)}</span>
            </button>

            <div
              className="lang-toggle"
              role="group"
              aria-label="Language Selector"
            >
              <button
                className={`lang-btn ${language === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <button
                className={`lang-btn ${language === "hi" ? "active" : ""}`}
                onClick={() => setLanguage("hi")}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Main Header with luxury elevation & blur */}
      <header
        className={`site-header sticky top-0 z-40 transition-all duration-300 overflow-hidden w-full ${
          isScrolled
            ? "bg-[#073B2A]/95 backdrop-blur-md shadow-xl border-b border-[#C9A24A]/30"
            : "bg-[#073B2A] border-b border-[#C9A24A]/20"
        }`}
      >
        <div className="container header-main flex items-center justify-between gap-1 sm:gap-4 py-2 sm:py-3 px-2 sm:px-4">
          {/* Mobile Hamburger Button (md:hidden, min 44px touch target) */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            className="hamburger-btn mobile-menu-btn md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-white hover:text-[#C9A24A] transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </motion.button>

          {/* Brand Logo Link (Centered on mobile, left on desktop) */}
          <a
            href="#hero"
            className="brand-logo-link flex items-center gap-1.5 sm:gap-3 flex-1 md:flex-initial justify-center md:justify-start min-w-0"
            aria-label="Griham 99+ Home"
          >
            <div className="brand-emblem-wrap flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
              <svg className="brand-emblem-svg w-full h-full" viewBox="0 0 100 100" fill="none">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="url(#goldRimGradHeader)"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="41"
                  stroke="#E6C875"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <path
                  d="M50 16 L22 38 L27 38 L27 76 L73 76 L73 38 L78 38 Z"
                  fill="none"
                  stroke="url(#goldRimGradHeader)"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path d="M50 30 Q50 20 50 18 Q54 24 50 30" fill="#FCE59F" />
                <circle cx="50" cy="46" r="4.5" fill="url(#goldRimGradHeader)" />
                <path
                  d="M43 56 Q50 50 57 56 Q50 63 43 56 Z"
                  fill="url(#goldRimGradHeader)"
                />
                <defs>
                  <linearGradient
                    id="goldRimGradHeader"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#F5DF95" />
                    <stop offset="50%" stopColor="#C9A24A" />
                    <stop offset="100%" stopColor="#8F6B1E" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="brand-text-block min-w-0">
              <span className="brand-title block text-base sm:text-xl font-black tracking-tight text-white truncate">
                GRIHAM <span className="brand-highlight text-[#C9A24A]">99+</span>
              </span>
              <span className="brand-tagline hidden sm:block text-[10px] text-[#C9A24A]/80 tracking-widest uppercase">
                {language === "hi"
                  ? "किफायती भारतीय खुदरा स्टोर"
                  : "Everyday Retail Store"}
              </span>
            </div>
          </a>

          {/* Desktop Search Bar (hidden on mobile, flex on md+) */}
          <div
            className="search-container hidden md:flex flex-1 max-w-xl mx-4 relative"
            ref={searchContainerRef}
          >
            <div className="search-bar-inner w-full flex items-center bg-white/10 border border-[#C9A24A]/30 rounded-full px-3.5 py-1.5 focus-within:border-[#C9A24A] focus-within:bg-white/15 transition-all">
              <svg
                className="search-icon text-[#C9A24A] mr-2 shrink-0"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="search-input w-full bg-transparent text-white placeholder-stone-300 text-sm focus:outline-none"
                placeholder={
                  language === "hi"
                    ? "दीये, बोतलें, अगरबत्ती, कटलरी खोजें..."
                    : "Search 99+ home finds (e.g. Diya, Bottle, Lights)..."
                }
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (searchResults.length > 0) setIsDropdownOpen(true);
                }}
              />
              {inputVal && (
                <button
                  className="search-clear-btn min-h-[36px] min-w-[36px] flex items-center justify-center text-stone-300 hover:text-white"
                  onClick={() => {
                    setInputVal("");
                    setSearchQuery("");
                  }}
                  aria-label="Clear search"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Desktop Live Search Dropdown with AnimatePresence */}
            <AnimatePresence>
              {isDropdownOpen && searchResults.length > 0 && (
                <motion.div
                  key="desktop-search-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: luxuryEase }}
                  className="search-dropdown absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden z-50 text-stone-900"
                >
                  <div className="search-dropdown-header px-4 py-2 bg-stone-50 border-b border-stone-100 flex justify-between text-xs font-semibold text-stone-500">
                    <span>Found {searchResults.length} Products</span>
                    <span>Press ESC to close</span>
                  </div>
                  <div className="search-dropdown-list max-h-80 overflow-y-auto divide-y divide-stone-100">
                    {searchResults.slice(0, 6).map((item, index) => (
                      <div
                        key={item.id}
                        className={`search-dropdown-item flex items-center gap-3 p-3 cursor-pointer hover:bg-stone-50 transition-colors ${
                          index === selectedIndex ? "bg-stone-100" : ""
                        }`}
                        onClick={() => handleSelectProduct(item)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded bg-stone-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-stone-800 truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-stone-500">
                            {item.category}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-[#073B2A]">
                            ₹{item.price}
                          </span>
                          {item.price <= 99 && (
                            <span className="block text-[10px] font-bold text-[#C9A24A]">
                              UNDER ₹99
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Header Action Buttons */}
          <div className="header-actions flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle Button (md:hidden, min 44px) */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              className="action-btn mobile-search-toggle-btn md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-white hover:text-[#C9A24A] transition-colors"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="Toggle Mobile Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </motion.button>

            {/* Wishlist Button (min 44px touch target) */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              className="action-btn wishlist-btn hidden sm:flex items-center justify-center min-h-[44px] min-w-[44px] text-white hover:text-[#C9A24A] relative transition-colors"
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`Wishlist (${wishlist.length} items)`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <AnimatePresence mode="popLayout">
                {wishlist.length > 0 && (
                  <motion.span
                    key={`wish-${wishlist.length}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1.3, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="badge-count absolute top-1 right-1 bg-[#C9A24A] text-[#073B2A] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Cart Button (min 44px touch target) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="action-btn cart-btn flex items-center gap-1.5 min-h-[44px] px-2.5 sm:px-3 bg-[#C9A24A] text-[#073B2A] rounded-full font-bold text-xs sm:text-sm hover:bg-[#dbb357] transition-all shadow"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Cart (${cartCount} items, ₹${cartSubtotal})`}
            >
              <div className="relative flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <AnimatePresence mode="popLayout">
                  {cartCount > 0 && (
                    <motion.span
                      key={`cart-count-${cartCount}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: [1.3, 1], opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="cart-count-bubble absolute -top-2 -right-2 bg-[#073B2A] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#C9A24A]"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="cart-total-text font-black hidden xs:inline sm:inline">
                ₹{cartSubtotal}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Full-Width Search Overlay Bar with AnimatePresence */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              key="mobile-search-overlay"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: luxuryEase }}
              className="mobile-search-overlay w-full bg-[#052b1e] border-t border-[#C9A24A]/20 px-3 py-2.5 md:hidden overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center bg-white/10 rounded-lg px-3 py-2 border border-[#C9A24A]/30">
                  <svg className="text-[#C9A24A] mr-2 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    autoFocus
                    className="w-full bg-transparent text-white placeholder-stone-300 text-sm focus:outline-none"
                    placeholder="Search 99+ products..."
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        executeSearch();
                        setIsMobileSearchOpen(false);
                      }
                    }}
                  />
                </div>
                <button
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white text-sm font-bold px-2"
                  onClick={() => setIsMobileSearchOpen(false)}
                >
                  ✕
                </button>
              </div>

              {/* Mobile Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="mobile-search-results mt-2 bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto divide-y divide-stone-100 text-stone-900">
                  {searchResults.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 flex items-center gap-2.5 active:bg-stone-100 cursor-pointer"
                      onClick={() => {
                        handleSelectProduct(item);
                        setIsMobileSearchOpen(false);
                      }}
                    >
                      <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-stone-800 truncate">{item.name}</div>
                        <div className="text-[10px] text-stone-500">₹{item.price} • {item.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Category Navigation Strip */}
        <nav className="header-category-nav bg-[#052e21] border-t border-[#C9A24A]/10 py-1.5 overflow-x-auto scrollbar-hide">
          <div className="container flex items-center gap-2 sm:gap-4 text-xs font-semibold whitespace-nowrap px-4">
            <button
              className={`cat-nav-link min-h-[36px] px-2.5 py-1 rounded-full transition-colors ${
                activeCategory === "all"
                  ? "bg-[#C9A24A] text-[#073B2A]"
                  : "text-stone-300 hover:text-white"
              }`}
              onClick={() => handleCategoryNav("all")}
            >
              All 99+ Products
            </button>
            <button
              className={`cat-nav-link min-h-[36px] px-2.5 py-1 rounded-full font-bold transition-colors ${
                activeCategory === "under99"
                  ? "bg-[#C9A24A] text-[#073B2A]"
                  : "text-[#E6C875] hover:text-white"
              }`}
              onClick={() => handleCategoryNav("under99")}
            >
              🔥 Under ₹99 Store
            </button>
            <button
              className={`cat-nav-link min-h-[36px] px-2.5 py-1 rounded-full transition-colors ${
                activeCategory === "Kitchen & Dining"
                  ? "bg-[#C9A24A] text-[#073B2A]"
                  : "text-stone-300 hover:text-white"
              }`}
              onClick={() => handleCategoryNav("Kitchen & Dining")}
            >
              Kitchen & Dining
            </button>
            <button
              className={`cat-nav-link min-h-[36px] px-2.5 py-1 rounded-full transition-colors ${
                activeCategory === "Home Decor & Festive"
                  ? "bg-[#C9A24A] text-[#073B2A]"
                  : "text-stone-300 hover:text-white"
              }`}
              onClick={() => handleCategoryNav("Home Decor & Festive")}
            >
              Festive & Decor
            </button>
            <button
              className={`cat-nav-link min-h-[36px] px-2.5 py-1 rounded-full transition-colors ${
                activeCategory === "Pooja & Spiritual"
                  ? "bg-[#C9A24A] text-[#073B2A]"
                  : "text-stone-300 hover:text-white"
              }`}
              onClick={() => handleCategoryNav("Pooja & Spiritual")}
            >
              Pooja Essentials
            </button>
            <button
              className={`cat-nav-link min-h-[36px] px-2.5 py-1 rounded-full transition-colors ${
                activeCategory === "Storage & Utility"
                  ? "bg-[#C9A24A] text-[#073B2A]"
                  : "text-stone-300 hover:text-white"
              }`}
              onClick={() => handleCategoryNav("Storage & Utility")}
            >
              Storage & Organizer
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-Out Drawer Navigation with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-nav-backdrop fixed inset-0 z-[800] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              key="mobile-nav-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="mobile-nav-panel fixed inset-y-0 left-0 z-[810] w-[85vw] max-w-sm bg-[#073B2A] text-white flex flex-col p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#C9A24A]/20">
                <span className="font-black text-lg text-white">GRIHAM 99+</span>
                <button
                  className="close-mobile-nav-btn min-h-[44px] min-w-[44px] flex items-center justify-center text-2xl text-stone-300 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Navigation"
                >
                  &times;
                </button>
              </div>

              <div className="py-4 space-y-3 flex-1 overflow-y-auto">
                <div className="text-xs uppercase tracking-wider text-[#C9A24A] font-bold">Categories</div>
                {[
                  { id: "all", label: "All Products" },
                  { id: "under99", label: "🔥 Under ₹99 Store" },
                  { id: "Kitchen & Dining", label: "Kitchen & Dining" },
                  { id: "Home Decor & Festive", label: "Home Decor & Festive" },
                  { id: "Pooja & Spiritual", label: "Pooja Essentials" },
                  { id: "Storage & Utility", label: "Storage & Utility" },
                ].map((c) => (
                  <button
                    key={c.id}
                    className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-white/10 flex justify-between items-center"
                    onClick={() => {
                      handleCategoryNav(c.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span>{c.label}</span>
                    <span>&rarr;</span>
                  </button>
                ))}

                <div className="pt-4 border-t border-[#C9A24A]/20 space-y-2">
                  <button
                    className="w-full text-left py-2 px-3 text-sm flex items-center gap-2 text-stone-200"
                    onClick={() => {
                      setIsPincodeOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    📍 Deliver to: {pincode.slice(0, 6)}
                  </button>
                  <div className="flex items-center gap-3 px-3 py-2 text-sm text-stone-200">
                    <span>Language:</span>
                    <button
                      className={`px-2 py-0.5 rounded text-xs font-bold ${language === "en" ? "bg-[#C9A24A] text-[#073B2A]" : "bg-white/10"}`}
                      onClick={() => setLanguage("en")}
                    >
                      EN
                    </button>
                    <button
                      className={`px-2 py-0.5 rounded text-xs font-bold ${language === "hi" ? "bg-[#C9A24A] text-[#073B2A]" : "bg-white/10"}`}
                      onClick={() => setLanguage("hi")}
                    >
                      हिंदी
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
