/**
 * =====================================================================
 * MOTION AUDIT REPORT — GRIHAM 99+ LUXURY MOTION SYSTEM
 * =====================================================================
 * AUDIT SUMMARY (Existing vs Enhanced):
 * 1. SplashScreen.jsx:
 *    - Existing: Logo scale/fade, title/tagline stagger, progress bar fill.
 *    - Enhancements: Subtle priceFlip on starting price badge.
 * 2. Header.jsx:
 *    - Existing: Scroll elevation, hamburger whileTap, AnimatePresence popLayout on badges.
 *    - Safe Rule: No nested AnimatePresence. Cart count already has bubble pop.
 * 3. Hero.jsx:
 *    - Existing: Word-by-word headline fade, badge floating loops, staggered trust items.
 *    - Safe Rule: Maintain single-transform per element (no duplicate Tailwind + Motion scale).
 * 4. Filters.jsx vs PriceStrip.jsx:
 *    - CRITICAL: Filters.jsx already uses layoutId="active-pill".
 *    - Safe Rule: PriceStrip.jsx uses unique layoutId="active-price-tier-indicator" to prevent collision.
 * 5. ProductGrid.jsx:
 *    - Enhancements: AnimatePresence mode="popLayout" for fluid category/price transitions.
 * 6. ProductCard.jsx:
 *    - Existing: Outer layout whileHover, Tailwind group-hover on image, heartAnim pop on tap.
 *    - Safe Rule: Preserved single transform source per node.
 * 7. CartDrawer.jsx & WishlistDrawer.jsx:
 *    - Existing: SlideInRight spring (100% -> 0), progress bar fill, item removal layout.
 * 8. QuickViewModal.jsx & CheckoutModal.jsx:
 *    - Existing: Scale/fade modalPop, step 1->3 slide transitions inside AnimatePresence mode="wait".
 * 9. About Page (app/about/page.js):
 *    - Existing: Map and address cards already possess whileInView luxuryEase transitions.
 * 10. WhatsAppButton.jsx:
 *    - Existing: Gentle float loop. Enhanced with subtle pulse ring behind button.
 * 11. ToastContainer.jsx:
 *    - Existing: Spring toastVariant with layout animations.
 * 12. app/globals.css:
 *    - Added: html scroll-behavior: smooth with prefers-reduced-motion fallback.
 * =====================================================================
 */

export const luxuryEase = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: luxuryEase },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const scaleTap = {
  tap: { scale: 0.96, transition: { duration: 0.1 } },
};

export const modalVariant = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: luxuryEase },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const backdropVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const drawerVariant = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", damping: 30, stiffness: 300 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", damping: 30, stiffness: 300 },
  },
};

export const cartItemVariant = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

export const toastVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 450, damping: 25 },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export const heartPopVariant = {
  rest: { scale: 1 },
  pop: {
    scale: [1, 1.25, 1],
    transition: { duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] },
  },
};

export const heartPop = heartPopVariant;

export const confettiPop = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: [0.8, 1.15, 1],
    opacity: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
};

export const priceFlip = {
  initial: { rotateX: -90, opacity: 0 },
  animate: {
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: luxuryEase },
  },
  exit: {
    rotateX: 90,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      repeat: Infinity,
      duration: 2.5,
      ease: "linear",
    },
  },
};
