"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS as INITIAL_PRODUCTS } from "@/data/products";
import { MAX_ITEM_QUANTITY } from "@/lib/config";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  // Products state (dynamic from /api/products with initial fallback)
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  // User & Shop State
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [pincode, setPincodeState] = useState("110001 (New Delhi)");
  const [language, setLanguageState] = useState("en");

  // Filters & Search
  const [activeCategory, setActiveCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(499);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPincodeOpen, setIsPincodeOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Lock body scroll whenever Cart, QuickView, Wishlist, Checkout, or Pincode modal is open
  useEffect(() => {
    if (typeof document === "undefined") return;

    const anyModalOpen =
      isCartOpen ||
      isWishlistOpen ||
      Boolean(quickViewProduct) ||
      isCheckoutOpen ||
      isPincodeOpen;

    if (anyModalOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [
    isCartOpen,
    isWishlistOpen,
    quickViewProduct,
    isCheckoutOpen,
    isPincodeOpen,
  ]);

  // Fetch dynamic products from MongoDB via /api/products on client mount
  useEffect(() => {
    async function loadProductsFromBackend() {
      try {
        setIsProductsLoading(true);
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data && data.products && Array.isArray(data.products) && data.products.length > 0) {
            const normalized = data.products.map((p) => ({
              ...p,
              id: p.id ?? p.productId ?? p._id,
            }));
            setProductsList(normalized);
          }
        }
      } catch (err) {
        console.warn(
          "Could not fetch from /api/products, using local products fallback:",
          err.message
        );
      } finally {
        setIsProductsLoading(false);
      }
    }

    loadProductsFromBackend();
  }, []);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("griham_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitizedCart = parsed.map((item) => ({
            ...item,
            quantity: Math.min(item.quantity || 1, MAX_ITEM_QUANTITY),
          }));
          setCart(sanitizedCart);
        }
      }

      const savedWishlist = localStorage.getItem("griham_wishlist");
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishlist(parsed);
        }
      }

      const savedPin = localStorage.getItem("griham_pincode");
      if (savedPin) setPincodeState(savedPin);

      const savedLang = localStorage.getItem("griham_lang");
      if (savedLang) setLanguageState(savedLang);
    } catch (e) {
      console.warn("Could not read from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage ONLY after initial load is complete
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("griham_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  }, [cart, isLoaded]);

  // Save wishlist to localStorage ONLY after initial load is complete
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("griham_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Could not save wishlist to localStorage", e);
    }
  }, [wishlist, isLoaded]);

  // Toast helper with duplicate protection
  const showToast = (message, duration = 3500) => {
    setToasts((prev) => {
      // Prevent showing the exact same toast message multiple times concurrently
      if (prev.some((t) => t.message === message)) {
        return prev;
      }
      const id = Date.now() + Math.random();
      const effectiveDuration = message.startsWith("⚠️") ? 4500 : duration;
      setTimeout(() => {
        setToasts((curr) => curr.filter((t) => t.id !== id));
      }, effectiveDuration);
      return [...prev, { id, message }];
    });
  };

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    const pId = product.id || product.productId;
    const existing = cart.find(
      (item) => (item.id || item.productId) === pId
    );

    if (existing && existing.quantity >= MAX_ITEM_QUANTITY) {
      showToast(
        language === "hi"
          ? "⚠️ अधिकतम सीमा: एक आइटम अधिकतम 10 ही कार्ट में जोड़ सकते हैं!"
          : "⚠️ Maximum limit: You can only add up to 10 units of this item!"
      );
      return;
    }

    if (existing && existing.quantity + quantity > MAX_ITEM_QUANTITY) {
      setCart((prev) =>
        prev.map((item) =>
          (item.id || item.productId) === pId
            ? { ...item, quantity: MAX_ITEM_QUANTITY }
            : item
        )
      );
      showToast(
        language === "hi"
          ? "⚠️ अधिकतम सीमा 10 है! कुल मात्रा 10 पर सीमित कर दी गई है।"
          : "⚠️ Limit reached: Capped at maximum 10 units for this item."
      );
      return;
    }

    setCart((prev) => {
      const inPrev = prev.find(
        (item) => (item.id || item.productId) === pId
      );
      if (inPrev) {
        const newQty = Math.min(inPrev.quantity + quantity, MAX_ITEM_QUANTITY);
        return prev.map((item) =>
          (item.id || item.productId) === pId
            ? { ...item, quantity: newQty }
            : item
        );
      }
      const initialQty = Math.min(quantity, MAX_ITEM_QUANTITY);
      return [...prev, { ...product, id: pId, quantity: initialQty }];
    });
    showToast(
      language === "hi"
        ? `"${product.name.slice(0, 24)}..." कार्ट में जोड़ा गया!`
        : `Added "${product.name.slice(0, 28)}..." to cart!`
    );
  };

  const updateCartQuantity = (productId, delta) => {
    const targetItem = cart.find(
      (item) => (item.id || item.productId) === productId
    );

    if (targetItem && delta > 0 && targetItem.quantity >= MAX_ITEM_QUANTITY) {
      showToast(
        language === "hi"
          ? "⚠️ अधिकतम सीमा: एक आइटम अधिकतम 10 ही कार्ट में जोड़ सकते हैं!"
          : "⚠️ Maximum limit reached: You can only add up to 10 units of this item!"
      );
      return;
    }

    setCart((prev) =>
      prev
        .map((item) => {
          const id = item.id || item.productId;
          if (id === productId) {
            const newQty = item.quantity + delta;
            if (newQty > MAX_ITEM_QUANTITY) {
              return { ...item, quantity: MAX_ITEM_QUANTITY };
            }
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev.filter((item) => (item.id || item.productId) !== productId)
    );
    showToast("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId) => {
    const idToToggle = String(productId);
    const product = productsList.find(
      (p) => String(p.id ?? p.productId ?? p._id) === idToToggle
    );
    const prodName = product ? product.name.slice(0, 24) : "Product";

    const exists = wishlist.some((id) => String(id) === idToToggle);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => String(id) !== idToToggle));
      showToast(`Removed "${prodName}" from wishlist`);
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(`Saved "${prodName}" to wishlist ❤️`);
    }
  };

  const isInWishlist = (productId) =>
    wishlist.some((id) => String(id) === String(productId));

  // Pincode & Language setters
  const setPincode = (pin) => {
    setPincodeState(pin);
    try {
      localStorage.setItem("griham_pincode", pin);
    } catch (e) {}
    showToast(`Delivery location set to: ${pin}`);
  };

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("griham_lang", lang);
    } catch (e) {}
    showToast(lang === "hi" ? "हिंदी भाषा चुनी गई" : "Language set to English");
  };

  // Computed totals
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartOriginalTotal = cart.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const cartSavings = Math.max(0, cartOriginalTotal - cartSubtotal);
  const freeShippingThreshold = 499;
  const isFreeShipping =
    cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;
  const shippingFee = cartSubtotal === 0 ? 0 : isFreeShipping ? 0 : 49;
  const grandTotal = cartSubtotal + shippingFee;

  // Modal and Drawer helper actions
  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);
  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);
  const openPincode = () => setIsPincodeOpen(true);
  const closePincode = () => setIsPincodeOpen(false);

  return (
    <ShopContext.Provider
      value={{
        PRODUCTS: productsList,
        isProductsLoading,
        cart,
        wishlist,
        pincode,
        language,
        activeCategory,
        maxPrice,
        sortBy,
        searchQuery,
        isCartOpen,
        isWishlistOpen,
        quickViewProduct,
        isCheckoutOpen,
        isPincodeOpen,
        toasts,
        cartCount,
        cartSubtotal,
        cartOriginalTotal,
        cartSavings,
        freeShippingThreshold,
        isFreeShipping,
        shippingFee,
        grandTotal,
        setActiveCategory,
        setMaxPrice,
        setSortBy,
        setSearchQuery,
        setIsCartOpen,
        setIsWishlistOpen,
        setQuickViewProduct,
        openQuickView,
        closeQuickView,
        openCart,
        closeCart,
        openWishlist,
        closeWishlist,
        openCheckout,
        closeCheckout,
        openPincode,
        closePincode,
        setIsCheckoutOpen,
        setIsPincodeOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setPincode,
        setLanguage,
        showToast,
        maxItemQuantity: MAX_ITEM_QUANTITY,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export { MAX_ITEM_QUANTITY };

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
