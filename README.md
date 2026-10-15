# गृहम 99+ | Griham 99+

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](#)
[![Responsive](https://img.shields.io/badge/Mobile-Responsive-orange?style=for-the-badge)](#)

> **"Shop More. Save More."** — A royal, modern, and accessible Indian retail e-commerce experience showcasing 99+ varieties of everyday essentials, home & kitchen utility, decor, and personal care finds starting at just **₹49**.

---

## 🌟 Highlights & Features

### 🛍️ Dynamic Product Catalog
- **24+ Curated Products**: Spanning Kitchenware, Home & Living, Beauty & Herbal Care, Storage & Organizers, Lifestyle, and Festive Gifts.
- **Instant Filtering & Sorting**: Filter products by category pills, price range slider (₹49 to ₹199+), and search queries.
- **Smart Sorting**: Sort seamlessly by Popularity, Price (Low to High / High to Low), and Customer Rating.
- **Product Badges**: Visual highlights for *Bestsellers*, *New Arrivals*, and *Hot Deals* starting at ₹49.

### 🔍 Live Auto-Suggest Search
- Interactive instant-search bar with debounced suggestions.
- Keyboard-accessible drop-down displaying matching product titles, price tags, and quick-access categories.

### 🛒 Slide-In Cart & Wishlist Drawers
- **Slide-In Cart Drawer**: Smooth slide-over drawer with item quantity increments/decrements, item removal, and subtotal calculation.
- **Free Shipping Progress Tracker**: Dynamic progress bar calculating remaining amount needed to qualify for Free Shipping.
- **Slide-In Wishlist Drawer**: Save favourite items with one-click transfer to shopping cart.
- **Persistent State**: Cart and Wishlist states are automatically synchronized with `localStorage`.

### 👁️ Interactive Product Quick-View Modal
- Detailed product inspection dialog with high-resolution imagery, full product specifications table, savings badge, and quantity selector.

### 📦 3-Step Checkout Flow
- Seamless multi-step checkout dialog:
  1. **Shipping & Delivery Address**: Form validation for name, mobile number, pincode, city, and street address.
  2. **Payment Selection**: Options for Cash on Delivery (COD), UPI / QR Pay, and Cards/NetBanking.
  3. **Order Confirmation**: Order summary invoice with order reference number and simulated delivery timeline.

### 💬 WhatsApp Order Integration
- Floating WhatsApp contact button.
- Direct checkout via WhatsApp with automatically formatted order summaries, item names, and delivery address.

### 📍 Pincode Availability Checker
- Interactive delivery check tool allowing customers to verify shipping availability and estimated delivery speed.

### 🌐 Bilingual Interface Switcher
- Header toggle for instant language preview switching between **English** and **Hindi (हिंदी)**.

### 🎨 Royal Indian Aesthetic Design
- **Harmonious Color Palette**: Deep Forest Green (`#073B2A`), Metallic Gold accents (`#C9A24A`), Warm Cream (`#FAF7F2`), and Soft Ivory (`#F8F3E8`).
- **Typography**: Google Fonts integration using *Cinzel*, *Playfair Display*, *Plus Jakarta Sans*, and *Noto Sans Devanagari*.
- **Micro-interactions**: Subtle hover elevations, smooth drawer transitions, skeleton loading cues, and toast notifications.

---

## 📂 Project Structure

```plaintext
Griham-99/
├── assets/
│   └── whatsapp.png      # Floating WhatsApp chat icon
├── index.html            # Core application (semantic markup, styling & JS logic)
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

No build tools or external package managers are required! The application is built using lightweight, zero-dependency modern web standards.

### Option 1: Open Directly in Browser
Simply double-click `index.html` or drag and drop it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Run via VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click on `index.html` and select **"Open with Live Server"**.
3. The store will open at `http://127.0.0.1:5500/index.html`.

### Option 3: Local HTTP Server (Python / Node)
Using Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

Using Node (`npx serve`):
```bash
npx serve .
```

---

## 🛠️ Built With

- **HTML5**: Semantic elements, accessible form controls, and Open Graph metadata.
- **Vanilla CSS3**: CSS Custom Properties (Variables), Flexbox, CSS Grid, and keyframe animations.
- **Vanilla JavaScript (ES6+)**: Modular event-driven architecture, DOM manipulation, and `localStorage` API.
- **Google Fonts**: Cinzel, Playfair Display, Plus Jakarta Sans, and Noto Sans Devanagari.
- **Unsplash API / Photography**: High-definition curated lifestyle & product imagery.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use for personal and educational purposes.
