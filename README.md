# 🛍️ गृहम 99+ | Griham 99+ — E-Commerce Storefront & Admin Suite

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas_Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Testing-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge)](#)

> **"Shop More. Save More."** — A royal, modern, and accessible Indian retail e-commerce experience showcasing 99+ everyday home & kitchen utility, organizers, decor, and personal care essentials starting at just **₹49**. Based in Tonk Phatak, Jaipur.

---

## 🌟 Storefront Highlights & Features

### 🛍️ Dynamic Product Catalog & High-Performance Data Layer
- **Rich Catalog**: Kitchenware, Home & Living, Beauty & Herbal Care, Storage & Organizers, Lifestyle, and Festive Gifts.
- **Hybrid Data Resilience**: Seamless fetching from MongoDB Atlas via `/api/products` with automatic offline fallback to local catalogue if the database connection lags or is unavailable.
- **Deduplicated Queries**: App Router `fetchProduct` queries are memoized using React's request-level `cache(...)`, eliminating duplicate database queries between `generateMetadata` and page components.
- **Compound Database Indexes**: High-performance indexes on `{ category: 1, price: 1 }` and `{ bestseller: 1, createdAt: -1 }` for rapid filtering and sorting.
- **Smart Filtering & Sorting**: Instant category pill filter, price range slider (₹49 to ₹499+), and sorting by Featured, Price Low-to-High, Price High-to-Low, and Top Customer Ratings.
- **Promotional Badges**: Visual highlights for *Under ₹99*, *Bestsellers*, and *Discounts*.

### 📸 Amazon / Flipkart Style Multi-Photo Gallery (`/products/[id]`)
- **Centered Thumbnail Picker**: Clean, responsive horizontal thumbnail strip centered below the main image.
- **Next / Previous Navigation Arrows**: Integrated circular arrows for one-click gallery browsing on desktop and mobile.
- **Active Counter Badge**: Dynamic index indicator (`1/4`, `2/4`, etc.).
- **LCP Speed Optimization**: Main hero photo is prioritized with `fetchPriority="high"` and `loading="eager"`, while thumbnails are lazy-loaded with lightweight 120px bounding.

### 🛒 Interactive Cart & Wishlist Drawers (Click-to-Detail Navigation)
- **Clickable Cart & Wishlist Items**: Clicking any product thumbnail or title immediately slides the drawer closed and navigates to the dedicated product detail page (`/products/[id]`).
- **Isolated Stepper Controls**: Quantity increment/decrement buttons and the remove button operate independently outside the navigation links.
- **Slide-In Cart Drawer**: Smooth animated drawer with quantity steppers, item removal, instant subtotal calculation, and coupon discount code support (`GRIHAM99`).
- **Free Shipping Progress Tracker**: Real-time progress bar computing the remaining amount needed to qualify for Free Express Shipping across India (Orders ₹499+).
- **LocalStorage State Sync**: Cart and Wishlist states are automatically synchronized with browser `localStorage`.

### ⚡ Automatic Cloudinary Media Optimization
- **Dynamic Image Sizing**: Injects automatic format selection (`f_auto`), quality auto-compression (`q_auto:eco`), and dimension caps (`w_400`, `w_800`, `w_120`) via `lib/cloudinary-helpers.js`.
- **Zero Vercel Disk Writes**: File upload API streams base64 buffers directly into Cloudinary without touching the serverless filesystem (`no fs.writeFileSync`), avoiding `EROFS` errors.
- **Next.js Image Formats**: Configured with modern `image/avif` and `image/webp` delivery with 30-day edge cache TTL (`next.config.mjs`).

### 🔐 Full Admin Dashboard & Inventory Management (`/admin`)
- **Protected Admin Panel**: Authenticated routes for managing catalog items (`/admin/products`, `/admin/products/add`, `/admin/products/edit/[id]`).
- **Multi-Image Cloudinary Uploader**: Drag-and-drop or select up to 8 images per product with automatic Cloudinary storage.
- **Timing-Safe Authentication**: Constant-time comparison on admin secret keys and HttpOnly cookies to protect against side-channel timing attacks.

### 🔍 Live Auto-Suggest Search
- Interactive instant search with debounced suggestions, product badges, and zero-state handling.
- Full keyboard navigation support (Arrow Up / Down / Enter / Escape).

### 👁️ Interactive Product Quick-View Modal
- Inspection dialog with high-resolution imagery, full product specifications table, savings badge, quantity stepper, and live pincode delivery estimator.

### 📦 3-Step Checkout Flow & Order Processing
1. **Shipping & Delivery Address**: Validation for customer name, 10-digit Indian mobile number, 6-digit postal pincode, and street address.
2. **Payment Selection**: Supports Cash on Delivery (COD), UPI / QR Pay, and Card/NetBanking modes.
3. **Order Confirmation & WhatsApp Integration**: Saves validated orders to MongoDB collection `orders` with anti-tamper server-calculated prices, and generates a formatted WhatsApp dispatch message.

### 📍 Pincode Serviceability Checker
- Interactive delivery check tool allowing customers to verify postal pincode delivery speed and COD availability.

### 🌐 Bilingual Interface Switcher
- Header toggle for instant language switching between **English** and **Hindi (हिंदी)**.

### 🏛️ Physical Store Hub & Local SEO Integration (`/about`)
- **Jaipur Retail Storefront**: Dedicated about & visit store page for Griham 99+ at *Gali No. 15, Sachivalaya Colony, Adarsh Bazar, Barkat Nagar, Tonk Phatak, Jaipur - 302015*.
- **Interactive Google Maps Embed**: Embedded live map with strict CSP configuration, store directions link, and direct phone/WhatsApp actions.
- **Local Business JSON-LD Schema**: Full `schema.org/Store` structured data including exact GeoCoordinates (`26.8788685, 75.7926009`), opening hours (`10:00 AM - 9:00 PM Mon-Sun`), accepted payment modes, phone number, and official logo link.

### ✨ Luxury Visual Identity & Golden Glow Logo
- **Official Brand Mark**: Vector SVG logo (`/assets/logo.svg`) cleanly integrated across Desktop & Mobile Navbars, Footer, Splash Screen, and Store Cards.
- **Royal Golden Shadow Tint**: Soft, elegant drop-shadow aura (`rgba(201,162,74,0.5)`) providing natural blending against deep emerald surfaces.
- **Harmonious Palette**: Deep Forest Green (`#073B2A`), Metallic Gold accents (`#C9A24A`), Warm Cream (`#FAF7F2`), and Soft Ivory (`#F8F3E8`).
- **Smooth Animations**: Powered by Framer Motion, custom scrollbar styling, and background modal scroll-locking.

---

## 🛡️ Enterprise Security & Validation Architecture

- **Server-Side Anti-Price-Tampering**: Item prices are strictly recalculated and verified against server-side database records in `/api/orders` to prevent client-side payment manipulation.
- **NoSQL Injection Resilience**: Strict schema validation with **Zod** and MongoDB query sanitization (`sanitizeNoSql`) on all incoming payloads.
- **Sliding-Window Rate Limiting**: In-memory rate limiting across checkout, search, and newsletter endpoints to safeguard against abuse and automated spam.
- **Timing-Safe Auth**: Admin routes compare secret keys using constant-time string comparison to prevent timing side-channel attacks.
- **HTTP Security Headers**: Strict configuration including `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security`, and custom `Content-Security-Policy`.

---

## 📂 Project Structure

```plaintext
Griham-99/
├── app/
│   ├── about/
│   │   ├── layout.js              # About page Local SEO metadata & OpenGraph tags
│   │   └── page.js                # About Us & Jaipur Store Locator page with Google Map
│   ├── admin/
│   │   ├── login/page.js          # Admin login portal
│   │   ├── products/
│   │   │   ├── add/page.js        # Add product form with Cloudinary multi-upload
│   │   │   ├── edit/[id]/page.js  # Edit product form with Cloudinary sync
│   │   │   └── page.js            # Admin inventory & product management table
│   │   └── page.js                # Admin dashboard overview
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/route.js     # Admin timing-safe session login
│   │   │   ├── logout/route.js    # Admin session termination
│   │   │   ├── products/route.js  # Admin product CRUD endpoint
│   │   │   ├── stats/route.js     # Admin dashboard metrics
│   │   │   └── upload/route.js    # Cloudinary stream uploader (read-only filesystem safe)
│   │   ├── newsletter/route.js    # Newsletter subscription API
│   │   ├── orders/route.js        # Order creation, validation & tamper protection
│   │   ├── pincode/[code]/route.js# Pincode serviceability lookup
│   │   ├── products/route.js      # Dynamic catalog & conditional auto-seeding
│   │   └── seed/route.js          # Database seed utility
│   ├── category/[slug]/page.js    # Dedicated category landing pages
│   ├── products/[id]/page.js      # Product detail page (React cache deduplicated)
│   ├── globals.css                # Tailwind design system & luxury aesthetic styles
│   ├── layout.js                  # App metadata, OpenGraph, favicon & root layout
│   ├── not-found.js               # Branded luxury 404 page
│   └── page.js                    # Main storefront client composition
├── components/
│   ├── CartDrawer.jsx             # Slide-in cart with clickable items & coupon support
│   ├── CategoryStrip.jsx          # Category filter navigation pills
│   ├── CheckoutModal.jsx          # 3-step checkout with COD & UPI options
│   ├── EditorialBanner.jsx        # Festive promotional banner
│   ├── Filters.jsx                # Price range & category filters
│   ├── Footer.jsx                 # Storefooter with newsletter & links
│   ├── Header.jsx                 # Ticker, sticky navigation, search & logo
│   ├── Hero.jsx                   # Hero section with primary CTAs & badges
│   ├── PincodeModal.jsx           # Postal delivery check modal
│   ├── PriceStrip.jsx             # Quick price tier selector (Under ₹49, ₹99, etc.)
│   ├── ProductCard.jsx            # Product card with auto Cloudinary w_400 optimization
│   ├── ProductDetailClient.jsx    # Multi-image gallery with centered thumbs & arrows
│   ├── ProductGrid.jsx            # Responsive catalog grid with sorting
│   ├── QuickViewModal.jsx         # Product modal with specifications
│   ├── SplashScreen.jsx           # Luxury initial page load screen with logo
│   ├── ToastContainer.jsx         # Floating feedback toast notifications
│   ├── TrustPillars.jsx           # Trust badges (Value from ₹49, WhatsApp support)
│   ├── WhatsAppButton.jsx         # Floating WhatsApp order assist action
│   └── WishlistDrawer.jsx         # Slide-in wishlist drawer with clickable items
├── context/
│   └── ShopContext.jsx            # Global state (Cart, Wishlist, Language, Modals)
├── data/
│   ├── faqs.js                    # Bilingual FAQs data
│   └── products.js                # Initial catalogue data & offline fallback
├── lib/
│   ├── animations.js              # Framer Motion transitions & easing curves
│   ├── cloudinary.js              # Cloudinary SDK client configuration
│   ├── cloudinary-helpers.js      # Dynamic image URL optimizer (f_auto, q_auto, width)
│   ├── config.js                  # Central siteConfig (Address, coordinates, phone, WhatsApp)
│   ├── mongodb.js                 # Cached MongoDB Mongoose connection handler with DNS fallback
│   ├── rate-limiter.js            # Sliding-window rate limiter
│   ├── security.js                # Timing-safe comparisons & NoSQL sanitizers
│   └── validators.js              # Zod validation schemas
├── models/
│   ├── Order.js                   # Mongoose Order schema
│   ├── Product.js                 # Mongoose Product schema (with compound indexes)
│   ├── Subscriber.js              # Mongoose Newsletter Subscriber schema
│   └── User.js                    # Mongoose User schema
├── public/
│   ├── assets/
│   │   ├── logo.svg               # Official brand logo
│   │   ├── IMG-20261006-WA0023.jpg# Physical store exterior photo
│   │   └── whatsapp.png           # WhatsApp branding badge
│   ├── icon.svg                   # Browser tab icon
│   └── logo.svg                   # Root logo asset
├── middleware.js                  # Next.js global edge security middleware
├── tests/
│   ├── e2e-runner.js              # Automated Playwright & security test suite
│   ├── modal-scroll-lock.spec.js  # Playwright modal scroll lock tests
│   ├── responsive.spec.js         # Playwright multi-viewport responsive tests
│   └── splash-screen.spec.js      # Playwright splash screen tests
├── .env.example                   # Environment configuration template
├── next.config.mjs                # Next.js production, image optimization & security headers
├── package.json                   # Project scripts and dependencies
└── tailwind.config.js             # Tailwind CSS tokens & color palette
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.17+` or `v20+` (Tested on `v22.x` / `v24.x`)
- **npm** or **pnpm**
- **MongoDB**: MongoDB Atlas connection string (or local MongoDB).
- **Cloudinary Account**: Cloud name, API key, and API secret for production image uploads.

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

Configure `.env.local`:
```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/griham99?retryWrites=true&w=majority

# Admin Authorization Secret Key
ADMIN_SECRET_KEY=your_secure_admin_secret_key

# Cloudinary Image Upload (Required for Admin product photo uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Auto-Seeding (Optional: set to true to seed initial catalog if database is empty)
AUTO_SEED=false
```

> **Store Configuration & WhatsApp Number:** Public store settings, support phone number, and WhatsApp numbers are cleanly managed in `lib/config.js` (`siteConfig.whatsappNumber`).

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Seeding the Database (Optional)
To populate your MongoDB database with the initial products:
```bash
curl -X POST http://localhost:3000/api/seed
```
Or set `AUTO_SEED=true` in `.env.local`.

### 6. Building for Production
```bash
npm run build
npm start
```

### 7. Running Automated Tests
Run Playwright end-to-end tests:
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
