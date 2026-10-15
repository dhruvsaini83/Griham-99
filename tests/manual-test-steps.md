# Chrome DevTools Manual Responsive Testing Guide: Griham 99+ E-Commerce

**Store:** Griham 99+ Store (`griham-next`)  
**Target URL:** `http://localhost:3000`  
**Brand Identity Colors:** `#073B2A` (Royal Forest Green), `#C9A24A` (Regal Gold)  
**Strict Quality Target:** Zero horizontal overflow (`document.documentElement.scrollWidth <= window.innerWidth`) on every breakpoint, with 100% responsive fluid UI and >= 44px touch targets.

---

## Chrome DevTools Setup Instructions

1. **Start Dev Server & Open Storefront:**
   - Ensure local dev server is running on `http://localhost:3000`.
   - Open Google Chrome and navigate to:
     ```text
     http://localhost:3000
     ```

2. **Activate Device Mode:**
   - Press **`F12`** (or `Ctrl + Shift + I` / `Cmd + Option + I` on macOS) to open Chrome DevTools.
   - Press **`Ctrl + Shift + M`** (or `Cmd + Shift + M` on macOS) to toggle the Device Toolbar.
   - In the top device bar, select **"Responsive"** mode.
   - Ensure zoom is set to **100%**.

---

## Breakpoint-by-Breakpoint Manual Testing Protocols

### 📱 TEST STEP 1: 320px — Mobile Extra Small (iPhone SE / Galaxy Fold)
- **Viewport Dimension:** Set width to `320px`, height to `568px`.
- **Step-by-step checks:**
  1. **Header & Hamburger:**
     - Verify desktop search input is completely hidden.
     - Verify hamburger icon is displayed on the left (`min-h-[44px] min-w-[44px]`).
     - Click hamburger icon: Verify mobile navigation drawer slides in from the left covering `85vw` with language toggle, categories, and pincode selector.
     - Click the `✕` close button: Verify drawer closes cleanly.
  2. **Search Overlay:**
     - Click the search icon (`🔍` button) in the header.
     - Verify full-width mobile search overlay drops down from the top (`w-full inset-x-0`).
     - Type `"diya"`: Verify suggestions dropdown appears with product thumbnail, price, and category.
     - Click the `✕` close button: Verify search overlay closes cleanly.
  3. **Zero Horizontal Scroll:**
     - Try scrolling horizontally using trackpad or shift + mouse wheel: **The page must NOT scroll horizontally at all.**
     - Run in DevTools Console:
       ```javascript
       document.documentElement.scrollWidth <= window.innerWidth
       ```
       *Expected output:* `true` (Exactly 320px <= 320px).
  4. **Hero Section:**
     - Verify hero headline scales proportionally (`text-2xl xs:text-3xl font-black`, ~30px).
     - Verify hero visual showcase collage sits below the copy and does not extend beyond 320px.
  5. **Product Grid & Cards:**
     - Scroll down to `#catalog`: Verify products are arranged in **1 single column** (`grid-cols-1`).
     - Verify each product image is a sharp **1:1 square aspect ratio** (`aspect-square`).
     - Verify the "Add to Cart" button spans **100% width** (`w-full min-h-[44px]`).
  6. **Filters & Price Strips:**
     - Check the category aisle pills: Verify you can swipe/scroll horizontally with smooth snap (`overflow-x-auto scrollbar-hide snap-x`).
     - Check price tier pills: Verify smooth horizontal snap swipe with no scrollbar.
  7. **Cart Drawer:**
     - Click the cart icon in the header: Verify Cart Drawer opens covering **100% viewport width** (`w-full fixed inset-y-0 right-0`).
     - Verify bill breakdown lines break words properly without overflowing.
     - Verify close button (`&times;`) has >= 44px tap area. Close the drawer.
  8. **QuickView Modal:**
     - Click the quick view icon (eye) on any card: Verify the modal opens in **full-screen mobile mode** (`fixed inset-0 w-full h-full rounded-none`).
     - Close modal with top-right `✕` button.

---

### 📱 TEST STEP 2: 375px — Mobile Standard (iPhone 12/13/14 Mini, SE 3rd Gen)
- **Viewport Dimension:** Set width to `375px`, height to `667px`.
- **Step-by-step checks:**
  1. **Header:** Centered logo, hamburger on left, search icon and cart button on right.
  2. **Zero Horizontal Scroll:** Verify `document.documentElement.scrollWidth <= 375` returns `true`.
  3. **Hero Layout:** Headline displays with crisp fluid scaling. CTA buttons stack or wrap cleanly with 44px tap targets.
  4. **Product Grid:** Single column (`grid-cols-1`) with comfortable gutters (`gap-3 px-3`).
  5. **Category Strip:** Horizontal snap pills scroll smoothly with native touch physics.
  6. **Checkout Modal:**
     - Add an item to cart -> Open Cart -> Click "Add Delivery Address First".
     - Verify Checkout Modal displays in **full screen** with 1-column input fields (`grid-cols-1`).
     - Verify form inputs have `min-h-[44px]` height. Close modal.

---

### 💻 TEST STEP 3: 768px — Tablet Portrait (iPad Mini / iPad 10th Gen)
- **Viewport Dimension:** Set width to `768px`, height to `1024px`.
- **Step-by-step checks:**
  1. **Header Transition:**
     - Hamburger icon is hidden (`md:hidden`).
     - Central desktop search bar appears (`hidden md:flex flex-1 max-w-xl`).
     - Live search suggestions appear as a centered dropdown directly below the search input.
  2. **Zero Horizontal Scroll:** Verify `document.documentElement.scrollWidth <= 768` returns `true`.
  3. **Hero Layout:** Hero headline scales up to `text-4xl` (~48px). Trust badges cleanly aligned.
  4. **Product Grid:** Grid automatically transitions to **2 columns** (`sm:grid-cols-2 gap-4`).
  5. **Category Strip:** Transitions to 2-column grid or clean horizontal wrap.
  6. **Trust Pillars:** Displays in **2 columns** (`sm:grid-cols-2`).
  7. **Drawers:** Cart and Wishlist drawers open with comfortable width (`sm:w-[420px]`) and blurred backdrop.
  8. **Modals:** QuickView and Checkout Modals transition from full-screen mobile to **centered luxury dialog boxes** (`max-w-3xl rounded-2xl`).

---

### 💻 TEST STEP 4: 1024px — Tablet Landscape / Small Laptop (13" MacBook, iPad Pro)
- **Viewport Dimension:** Set width to `1024px`, height to `768px`.
- **Step-by-step checks:**
  1. **Header:** Full brand emblem, text, search bar, language toggle, pincode picker, wishlist, and cart buttons visible.
  2. **Zero Horizontal Scroll:** Verify `document.documentElement.scrollWidth <= 1024` returns `true`.
  3. **Hero Layout:** Transitions to **two-column flex layout** (`flex-col lg:flex-row gap-8 lg:gap-12`) with copy on the left and floating visual showcase collage on the right.
  4. **Product Grid:** Displays in **3 columns** (`lg:grid-cols-3 gap-6`).
  5. **Trust Pillars:** Displays in **4 columns** (`lg:grid-cols-4`).
  6. **Checkout Form:** Form inputs transition to **2 columns** (`md:grid-cols-2 gap-4`).

---

### 🖥️ TEST STEP 5: 1440px — Standard Desktop / Large Laptop (15"/16" Laptops, 1080p Monitor)
- **Viewport Dimension:** Set width to `1440px`, height to `900px`.
- **Step-by-step checks:**
  1. **Header:** Full luxury appearance with `#073B2A` background, gold borders, and glowing badges.
  2. **Zero Horizontal Scroll:** Verify `document.documentElement.scrollWidth <= 1440` returns `true`.
  3. **Hero Layout:** Headline displays at `text-6xl` (~60px) with gold gradient accent text.
  4. **Product Grid:** Displays in **4 columns** (`xl:grid-cols-4 gap-6`).
  5. **Category Grid:** Displays in **4 columns** (`grid-cols-4 gap-5`).
  6. **Footer:** Displays all 4 columns: Brand, Categories, Customer Care, and Newsletter.
  7. **Drawer Width:** Opens with luxurious `lg:w-[480px]` width.

---

### 🖥️ TEST STEP 6: 2560px — Ultra-wide / 2K & 4K Monitor
- **Viewport Dimension:** Set width to `2560px`, height to `1440px`.
- **Step-by-step checks:**
  1. **Container Centering:** Verify `.container` maintains `max-width: 1280px` centered with auto margins (`mx-auto`). Content does NOT stretch awkwardly.
  2. **Zero Horizontal Scroll:** Verify `document.documentElement.scrollWidth <= 2560` returns `true`.
  3. **Visual Integrity:** No blurred images, clean borders, crisp typography across all sections.

---

## Quick DevTools Console QA Snippet

Paste this snippet directly into your Chrome DevTools Console at any breakpoint to instantly verify:

```javascript
(() => {
  const scrollW = document.documentElement.scrollWidth;
  const innerW = window.innerWidth;
  const passed = scrollW <= innerW;
  console.log(`%c[RESPONSIVE AUDIT] Viewport: ${innerW}px | ScrollWidth: ${scrollW}px | Overflow: ${passed ? 'NONE (PASS)' : 'OVERFLOW DETECTED (FAIL)'}`, 
    `color: ${passed ? '#168752' : '#C83214'}; font-weight: bold; font-size: 14px;`);
})();
```
