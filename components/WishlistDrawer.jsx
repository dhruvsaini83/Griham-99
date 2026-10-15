"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";

export default function WishlistDrawer() {
  const {
    PRODUCTS,
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    addToCart,
    toggleWishlist,
    setActiveCategory,
    language,
  } = useShop();

  const wishlistProducts = PRODUCTS.filter((p) =>
    wishlist.some(
      (id) =>
        String(id) === String(p.id) ||
        String(id) === String(p.productId) ||
        String(id) === String(p._id)
    )
  );

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product.id ?? product.productId ?? product._id);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div
            key="wishlist-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="drawer-backdrop active fixed inset-0 z-[540] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsWishlistOpen(false)}
          />

          <motion.aside
            key="wishlist-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="slide-drawer active fixed inset-y-0 right-0 z-[550] w-full sm:w-[420px] md:w-[450px] lg:w-[480px] max-w-full bg-white shadow-2xl flex flex-col"
            aria-label="Wishlist"
          >
            <div className="drawer-header px-4 sm:px-6 py-4 flex items-center justify-between bg-[#073B2A] text-white">
              <div className="drawer-title flex items-center gap-2.5 font-extrabold text-base sm:text-lg">
                <span>{language === "hi" ? "मेरी पसंद" : "My Wishlist"}</span>
                <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full">
                  {wishlist.length} Items
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="drawer-close-btn min-h-[44px] min-w-[44px] flex items-center justify-center text-2xl text-white hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setIsWishlistOpen(false)}
                aria-label="Close Wishlist"
              >
                &times;
              </motion.button>
            </div>

            <div className="drawer-body flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
              {wishlistProducts.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "50px 20px",
                    color: "var(--color-text-muted)",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "12px" }}>❤️</div>
                  <h4
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--color-forest)",
                      fontWeight: 700,
                    }}
                  >
                    {language === "hi"
                      ? "आपकी विशलिस्ट खाली है"
                      : "Your Wishlist is Empty"}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      marginTop: "6px",
                      marginBottom: "20px",
                    }}
                  >
                    {language === "hi"
                      ? "अपनी पसंद के घरेलू सामान यहां सहेजें!"
                      : "Save your favorite kitchen and home finds here!"}
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="btn-gold-primary min-h-[44px] px-6 py-2.5 rounded-full font-bold shadow-md hover:brightness-110 transition-all"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setActiveCategory("all");
                    }}
                  >
                    {language === "hi" ? "उत्पाद देखें &rarr;" : "Explore Finds &rarr;"}
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {wishlistProducts.map((p) => (
                    <motion.div
                      layout
                      key={p.id ?? p.productId ?? p._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="cart-item flex gap-3.5 py-3 border-b border-[#E7E1D5]"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="cart-item-thumb w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover bg-[#F4EFE6] shrink-0"
                      />
                      <div className="cart-item-details flex-1 min-w-0">
                        <div className="cart-item-name font-bold text-sm sm:text-base text-[#18201C] line-clamp-1 break-words">
                          {p.name}
                        </div>
                        <div className="cart-item-price-unit text-xs sm:text-sm text-[#073B2A] font-bold mt-0.5">
                          ₹{p.price}{" "}
                          <span
                            style={{
                              fontSize: "0.75rem",
                              textDecoration: "line-through",
                              color: "var(--color-text-light)",
                            }}
                          >
                            ₹{p.originalPrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="btn-gold-primary min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-bold hover:brightness-110 transition-all"
                            onClick={() => handleMoveToCart(p)}
                          >
                            {language === "hi" ? "कार्ट में ले जाएं" : "Move to Cart"}
                          </motion.button>
                          <button
                            className="cart-item-remove-btn min-h-[40px] text-xs text-stone-500 hover:text-[#C83214] underline px-2"
                            onClick={() => toggleWishlist(p.id ?? p.productId ?? p._id)}
                          >
                            {language === "hi" ? "हटाएं" : "Remove"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
