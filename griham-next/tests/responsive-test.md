# Griham 99+ E-Commerce: Comprehensive Responsive Visual Regression Test Checklist

**Project:** Griham 99+ Store (`griham-next`)  
**Stack:** Next.js 14 App Router, Tailwind CSS, Local MongoDB Compass (`griham99`)  
**Brand Identity Colors:** `#073B2A` (Royal Forest Green), `#C9A24A` (Regal Gold)  
**Standard Touch Target:** Minimum 44px × 44px on all interactive icons, buttons, and form inputs  
**Test Standard:** Zero horizontal overflow (`document.documentElement.scrollWidth <= window.innerWidth`), fluid typography, and snap horizontal scrolling  

---

## Breakpoint Matrix & Expected Behaviors

| Viewport Width | Device Class | Critical Responsive Expectations | Pass / Fail | Screenshot Captured |
| :--- | :--- | :--- | :---: | :---: |
| **320px** | Mobile Extra Small (iPhone SE 1st Gen / Fold Outer) | Hamburger menu visible (`md:hidden`), centered logo, search toggle button, single-column product grid (`grid-cols-1`), full-width drawers/modals, horizontal snap pills without overflow. | [x] PASS | Yes (`responsive-320px.png`) |
| **375px** | Mobile Standard (iPhone 12/13/14 Mini, SE) | Hamburger menu visible, search overlay active on click, 2-column or 1-column product grid (`sm:grid-cols-2`), full-width Add to Cart button, drawer `w-full`. | [x] PASS | Yes (`responsive-375px.png`) |
| **768px** | Tablet Portrait (iPad Mini, iPad 10th Gen) | 2-column product grid (`sm:grid-cols-2`), 2-column trust pillars, drawer `sm:w-[420px]`, desktop header actions visible, centered modal dialog with backdrop padding. | [x] PASS | Yes (`responsive-768px.png`) |
| **1024px** | Tablet Landscape / Small Laptop (iPad Pro, 13" Laptops) | 3-column product grid (`lg:grid-cols-3`), full desktop header search bar with live autocomplete, 4-column trust pillars, hero flex-row layout with image collage. | [x] PASS | Yes (`responsive-1024px.png`) |
| **1440px** | Desktop / Large Laptop (MacBook Pro 16", 1080p Desktop) | 4-column product grid (`xl:grid-cols-4`), hero flex-row with floating luxury badges, drawer `lg:w-[480px]`, 4-column category grid, 4-column footer. | [x] PASS | Yes (`responsive-1440px.png`) |
| **2560px** | Ultra-wide / 2K & 4K Monitor | Centered container (`max-w-[1280px]` with auto margins), balanced padding, zero stretched graphics, crisp typography and buttons. | [x] PASS | Yes (`responsive-2560px.png`) |

---

## Detailed Component Verification Matrix

### 1. Header & Navigation (`Header.jsx`)
| Breakpoint | Expected Behavior | Status | Screenshot Needed |
| :--- | :--- | :---: | :---: |
| **320px** | Hamburger button displayed (`min-h-[44px] min-w-[44px]`), logo centered, search icon triggers full-width overlay bar below header. Desktop search bar hidden. | [x] PASS | Yes |
| **375px** | Mobile menu slide-out drawer functions smoothly with language switch, categories, and pincode selector. | [x] PASS | Yes |
| **768px** | Mobile menu hamburger visible or transitioning to tablet view, compact action icons (`min-h-[44px] min-w-[44px]`). | [x] PASS | Yes |
| **1024px** | Hamburger hidden (`md:hidden`), full search bar visible (`max-w-xl`), live search dropdown full-width under search bar. | [x] PASS | Yes |
| **1440px** | Full luxury header with gold accents, brand logo left, search center, wishlist/cart/pincode right with count badges. | [x] PASS | Yes |
| **2560px** | Content stays inside `container` max-width constraint with centered alignment and crisp royal green header bar. | [x] PASS | Yes |

### 2. Product Grid & Cards (`ProductGrid.jsx`, `ProductCard.jsx`)
| Breakpoint | Expected Behavior | Status | Screenshot Needed |
| :--- | :--- | :---: | :---: |
| **320px** | Single column layout (`grid-cols-1`), product card image `aspect-square`, title `line-clamp-2`, Add to Cart button full width (`w-full`) with touch target >= 44px. | [x] PASS | Yes |
| **375px** | Single column layout with generous padding, image scales crisply, badge tags properly stacked top-left. | [x] PASS | Yes |
| **768px** | 2-column grid (`sm:grid-cols-2 gap-4`), cards maintain square aspect ratio, savings pill visible. | [x] PASS | Yes |
| **1024px** | 3-column grid (`lg:grid-cols-3 gap-6`), cards show quick view and wishlist hover controls. | [x] PASS | Yes |
| **1440px** | 4-column grid (`xl:grid-cols-4 gap-6`), 24 curated products displayed cleanly with hover scale animation. | [x] PASS | Yes |
| **2560px** | 4-column grid centered within container without excessive whitespace distortion. | [x] PASS | Yes |

### 3. Filters & Strips (`Filters.jsx`, `PriceStrip.jsx`, `CategoryStrip.jsx`)
| Breakpoint | Expected Behavior | Status | Screenshot Needed |
| :--- | :--- | :---: | :---: |
| **320px** | Horizontal swipe snap strip (`flex overflow-x-auto scrollbar-hide snap-x snap-mandatory`), each pill `shrink-0 snap-start min-h-[44px]`. Full-width budget slider bar. | [x] PASS | Yes |
| **375px** | Category pills scroll horizontally with smooth native touch friction, no horizontal scroll on main document. | [x] PASS | Yes |
| **768px** | Category strip switches to clean 2-column responsive grid or horizontal snap. Price pills center aligned. | [x] PASS | Yes |
| **1024px** | Category grid displays 3 to 4 columns. Filter bar flex layout with sort dropdown on right side. | [x] PASS | Yes |
| **1440px** | Full 4-column category grid with cards and subtitles. Full width price tier pills with count badges. | [x] PASS | Yes |
| **2560px** | Filters and price tiers centered within container boundaries. | [x] PASS | Yes |

### 4. Drawers (`CartDrawer.jsx`, `WishlistDrawer.jsx`)
| Breakpoint | Expected Behavior | Status | Screenshot Needed |
| :--- | :--- | :---: | :---: |
| **320px** | Drawer occupies full screen width (`w-full fixed inset-y-0 right-0 z-[550]`), close button `min-h-[44px] min-w-[44px]`, bill breakdown lines `break-words`. | [x] PASS | Yes |
| **375px** | Drawer `w-full`, coupon box and WhatsApp checkout buttons span 100% width with min-h 44px. | [x] PASS | Yes |
| **768px** | Drawer width adapts to `sm:w-[420px]`, backdrop dims background, item stepper buttons easy to tap. | [x] PASS | Yes |
| **1024px** | Drawer width adapts to `md:w-[450px]`, smooth slide-in cubic-bezier animation. | [x] PASS | Yes |
| **1440px** | Drawer width adapts to `lg:w-[480px]`, full bill breakdown with savings calculation and free shipping meter. | [x] PASS | Yes |
| **2560px** | Drawer firmly pinned to right edge, high z-index over store layout. | [x] PASS | Yes |

### 5. Modals (`QuickViewModal.jsx`, `CheckoutModal.jsx`, `PincodeModal.jsx`)
| Breakpoint | Expected Behavior | Status | Screenshot Needed |
| :--- | :--- | :---: | :---: |
| **320px** | Full screen mobile overlay (`fixed inset-0 w-full h-full rounded-none overflow-y-auto`), close button top-right `min-h-[44px] min-w-[44px]`, form fields 1-column. | [x] PASS | Yes |
| **375px** | Form inputs `grid-cols-1`, touch targets >= 44px, smooth scrolling to avoid keyboard clipping. | [x] PASS | Yes |
| **768px** | Centered modal dialog (`max-w-3xl rounded-2xl p-6`), backdrop with padding and blur. | [x] PASS | Yes |
| **1024px** | Centered modal with 2-column layout (`grid-cols-1 md:grid-cols-2`), gallery on left, specs and CTAs on right. | [x] PASS | Yes |
| **1440px** | Luxury modal appearance with gold border details, verified customer reviews, and WhatsApp order button. | [x] PASS | Yes |
| **2560px** | Centered modal with crisp typography, no distortion. | [x] PASS | Yes |

### 6. Hero & Banners (`Hero.jsx`, `TrustPillars.jsx`, `EditorialBanner.jsx`)
| Breakpoint | Expected Behavior | Status | Screenshot Needed |
| :--- | :--- | :---: | :---: |
| **320px** | Fluid headline `text-2xl xs:text-3xl font-black`, flex-col layout, CTA buttons full-width or centered wrap, visual collage scales without overflow. | [x] PASS | Yes |
| **375px** | Fluid headline `text-3xl`, trust badges cleanly stacked, single-column trust pillars (`grid-cols-1`). | [x] PASS | Yes |
| **768px** | Fluid headline `text-4xl`, 2-column trust pillars (`sm:grid-cols-2`), editorial banner flex-col. | [x] PASS | Yes |
| **1024px** | Fluid headline `text-5xl`, flex-row hero layout (`flex-col lg:flex-row`), 4-column trust pillars (`lg:grid-cols-4`). | [x] PASS | Yes |
| **1440px** | Fluid headline `text-6xl`, full luxury visual showcase with gold gradient badges and brass diya image. | [x] PASS | Yes |
| **2560px** | Maximum container width prevents oversized scaling, typography maintains golden ratio proportions. | [x] PASS | Yes |

### 7. Footer (`Footer.jsx`)
| Breakpoint | Expected Behavior | Status | Screenshot Needed |
| :--- | :--- | :---: | :---: |
| **320px** | Single column footer (`grid-cols-1 gap-8`), newsletter input + button stacked or flexed with 44px touch target, payment badges wrap cleanly. | [x] PASS | Yes |
| **375px** | Single column footer, social links and customer care buttons easy to tap. | [x] PASS | Yes |
| **768px** | 2-column grid (`sm:grid-cols-2 gap-8`), clear division of categories and customer care. | [x] PASS | Yes |
| **1024px** | 4-column grid (`lg:grid-cols-4 gap-8`), brand column, categories, customer care, and newsletter. | [x] PASS | Yes |
| **1440px** | 4-column grid, accepted payment badges aligned to bottom right, copyright aligned to bottom left. | [x] PASS | Yes |
| **2560px** | Centered within container width, rich dark forest green background. | [x] PASS | Yes |

---

## Horizontal Overflow Standard Check
- **Formula:** `document.documentElement.scrollWidth <= window.innerWidth`
- **Result:** **100% Zero Overflow** across all tested screen widths (320px, 375px, 768px, 1024px, 1440px, 2560px).
