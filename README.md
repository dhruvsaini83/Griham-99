# 🛍️ गृहम 99+ | Griham 99+ — E-Commerce Storefront

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Testing-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge)](#)

> **"Shop More. Save More."** — A royal, modern, and accessible Indian retail e-commerce experience showcasing 99+ varieties of everyday essentials, home & kitchen utility, decor, and personal care finds starting at just **₹49**.

---

## 🌟 Storefront Highlights & Features

### 🛍️ Dynamic Product Catalog & MongoDB Integration
- **24+ Curated Products**: Kitchenware, Home & Living, Beauty & Herbal Care, Storage & Organizers, Lifestyle, and Festive Gifts.
- **Hybrid Data Resilience**: Seamless dynamic fetching from `/api/products` (MongoDB Mongoose models) with automatic instant fallback to local catalogue if database is unavailable.
- **Smart Filtering & Sorting**: Instant category pill filter, price range slider (₹49 to ₹499+), and instant sort by Featured, Price Low-to-High, Price High-to-Low, and Top Customer Ratings.
- **Promotional Badges**: Visual highlights for *Under ₹99*, *Bestsellers*, and *Discounts*.

### 🔍 Live Auto-Suggest Search
- Interactive instant search with debounced suggestions and zero-state handling.
- Full keyboard navigation support (Arrow Up / Down / Enter / Escape).

### 🛒 Slide-In Cart & Wishlist Drawers
- **Slide-In Cart Drawer**: Smooth animated drawer with quantity steppers (+/-), item removal, subtotal calculation, and coupon code support (`GRIHAM99`).
- **Free Shipping Progress Tracker**: Real-time progress bar computing remaining amount to qualify for Free Express Shipping (Orders ₹499+).
- **Wishlist Drawer**: Save favourite items with one-click transfer to shopping cart.
- **Persistence**: Cart and Wishlist state automatically synchronized with browser `localStorage`.

### 👁️ Interactive Product Quick-View Modal
- Inspection dialog with high-resolution imagery, full product specifications table, savings badge, quantity stepper, and live pincode delivery estimator.

### 📦 3-Step Checkout Flow & Order Processing
1. **Shipping & Delivery Address**: Full validation for customer name, 10-digit Indian mobile number, 6-digit pincode, and street address.
2. **Payment Selection**: Supports Cash on Delivery (COD), UPI / QR Pay, and Card/NetBanking modes.
3. **Order Confirmation & WhatsApp Integration**: Saves validated orders to MongoDB collection `orders` with anti-tamper server-calculated prices, and generates a formatted WhatsApp dispatch message.

### 📍 Pincode Serviceability Checker
- Interactive delivery check tool allowing customers to verify postal pincode delivery speed and COD availability.

### 🌐 Bilingual Interface Switcher
- Header toggle for instant language preview switching between **English** and **Hindi (हिंदी)**.

### 🎨 Royal Indian Aesthetic Design
- **Harmonious Color Palette**: Deep Forest Green (`#073B2A`), Metallic Gold accents (`#C9A24A`), Warm Cream (`#FAF7F2`), and Soft Ivory (`#F8F3E8`).
- **Smooth Animations**: Powered by Framer Motion, custom scrollbar styling, and background modal scroll-locking.
- **Splash Screen**: Branded initial page load animation with wave loader.

---

## 🛡️ Enterprise Security & Validation Architecture

- **Server-Side Anti-Price-Tampering**: Item prices are strictly recalculated and verified against server-side database records in `/api/orders` to prevent client-side payment manipulation.
- **NoSQL Injection Resilience**: Strict schema validation with **Zod** on all incoming payloads.
- **Sliding-Window Rate Limiting**: In-memory rate limiting across checkout, search, and newsletter endpoints to safeguard against abuse and automated spam.
- **Route Authorization**: Middleware-level bearer key protection for administrative routes (`/admin/*` and `/api/admin/*`).
- **HTTP Security Headers**: Strict configuration including `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.

---

## 📂 Project Structure

```plaintext
Griham-99/
├── app/
│   ├── api/
│   │   ├── newsletter/route.js    # Newsletter subscription API
│   │   ├── orders/route.js        # Order creation, validation & tamper protection
│   │   ├── pincode/[code]/route.js# Pincode serviceability lookup
│   │   ├── products/route.js      # Dynamic catalog & admin product management
│   │   └── seed/route.js          # Database seed utility
│   ├── fonts/                     # Self-hosted typography assets
│   ├── globals.css                # Tailwind design system & luxury aesthetic styles
│   ├── layout.js                  # App metadata, OpenGraph & root layout
│   └── page.js                    # Main storefront client composition
├── components/
│   ├── CartDrawer.jsx             # Slide-in cart with coupon & free shipping progress
│   ├── CategoryStrip.jsx          # Category filter navigation pills
│   ├── CheckoutModal.jsx          # 3-step checkout with COD & UPI options
│   ├── EditorialBanner.jsx        # Festive promotional banner
│   ├── Filters.jsx                # Price range & category filters
│   ├── Footer.jsx                 # Storefooter with newsletter & links
│   ├── Header.jsx                 # Ticker, sticky navigation & live search
│   ├── Hero.jsx                   # Hero section with primary CTAs
│   ├── PincodeModal.jsx           # Postal delivery check modal
│   ├── PriceStrip.jsx             # Quick price tier selector (Under ₹49, ₹99, etc.)
│   ├── ProductCard.jsx            # Product card with badges, wishlist & cart steppers
│   ├── ProductGrid.jsx            # Responsive catalog grid with sorting
│   ├── QuickViewModal.jsx         # Product modal with specifications
│   ├── SplashScreen.jsx           # Luxury initial page load screen
│   ├── ToastContainer.jsx         # Floating feedback toast notifications
│   ├── TrustPillars.jsx           # Trust badges (Free delivery, verified quality)
│   ├── WhatsAppButton.jsx         # Floating WhatsApp order assist action
│   └── WishlistDrawer.jsx         # Slide-in wishlist drawer
├── context/
│   └── ShopContext.jsx            # Global state (Cart, Wishlist, Language, Modals)
├── data/
│   └── products.js                # Initial catalogue data & offline fallback
├── lib/
│   ├── animations.js              # Framer Motion transitions & easing curves
│   ├── mongodb.js                 # Cached MongoDB Mongoose connection handler
│   ├── rate-limiter.js            # Sliding-window rate limiter
│   └── validators.js              # Zod validation schemas
├── models/
│   ├── Order.js                   # Mongoose Order schema
│   ├── Product.js                 # Mongoose Product schema
│   ├── Subscriber.js              # Mongoose Newsletter Subscriber schema
│   └── User.js                    # Mongoose User schema
├── middleware.js                  # Next.js global edge security middleware
├── tests/
│   ├── e2e-runner.js              # 24-test automated Playwright & security suite
│   ├── modal-scroll-lock.spec.js  # Playwright modal scroll lock tests
│   ├── responsive.spec.js         # Playwright multi-viewport responsive tests
│   └── splash-screen.spec.js      # Playwright splash screen tests
├── .env.example                   # Environment configuration template
├── next.config.mjs                # Next.js production & security headers configuration
├── package.json                   # Project scripts and dependencies
└── tailwind.config.js             # Tailwind CSS tokens & color palette
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.17+` or `v20+` (Tested on `v24.x`)
- **npm** or **pnpm**
- **MongoDB**: Local MongoDB instance (Compass) or MongoDB Atlas cluster (Optional: falls back to static catalog if DB is not running).

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/dhruvsaini83/Griham-99.git
cd Griham-99
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local` and configure your settings:
```bash
cp .env.example .env.local
```
Update `.env.local` as required (Private backend credentials only):
```env
# MongoDB Connection String (Compass local or Atlas)
MONGODB_URI=mongodb://127.0.0.1:27017/griham99

# Admin Authorization Secret Key
ADMIN_SECRET_KEY=griham_admin_secret_99
```

> **Store Configuration & WhatsApp Number:** Public store settings, support phone, and WhatsApp numbers are cleanly managed in `lib/config.js` (`siteConfig.whatsappNumber`).

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Seeding the Database (Optional)
To populate your MongoDB database with the 24 initial products:
```bash
curl -X POST http://localhost:3000/api/seed
```

### 6. Building for Production
```bash
npm run build
npm start
```

### 7. Running Automated Tests
Run Playwright tests:
```bash
npx playwright test
```
Or run the standalone automated end-to-end and security audit suite:
```bash
node tests/e2e-runner.js
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE) — free to use for personal, commercial, and educational purposes.
