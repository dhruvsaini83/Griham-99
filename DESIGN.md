---
name: Griham 99+ Design System
description: "Royal Indian retail aesthetic balancing deep forest green, warm gold accents, and warm ivory paper surfaces for everyday utility and festive decor."
colors:
  forest: "#073B2A"
  forest-deep: "#041F18"
  forest-light: "#0B4D37"
  gold: "#C9A24A"
  gold-light: "#E6C875"
  gold-dark: "#9B7829"
  ivory: "#F8F3E8"
  cream: "#FAF7F2"
  surface: "#FFFFFF"
  text-main: "#18201C"
  text-muted: "#58635E"
  text-light: "#8B9691"
  border-soft: "#E7E1D5"
  border-subtle: "#F0EAE1"
  offer-red: "#C83214"
  offer-bg: "#FEEBE8"
  success: "#168752"
  success-bg: "#EAF7EE"
typography:
  display:
    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "18px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.forest-deep}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
---

## Overview

Griham 99+ blends the warmth of traditional Jaipur retail with the speed, clarity, and precision of modern e-commerce. The visual atmosphere is calm, trustworthy, and distinctly Indian: natural forest greens evoking Ayurvedic purity and domestic security, balanced by festive golden warmth and clean ivory paper-like surfaces.

## Colors

- **Primary**: Deep Forest Green (`#073B2A`) and Royal Deep Forest (`#041F18`). Used for high-trust anchors: sticky headers, primary CTAs, trust badges, and accents.
- **Accent**: Warm Indian Gold (`#C9A24A`) with subtle highlights (`#E6C875`) and deep amber undertones (`#9B7829`). Used for ratings, promotional tags, CTA highlights, and brand badges.
- **Surfaces & Neutrals**: Warm Cream (`#FAF7F2`) page background, Crisp Pure White (`#FFFFFF`) card surfaces, and Soft Ivory (`#F8F3E8`) secondary containers.
- **Typography Colors**: Deep Charcoal (`#18201C`) for primary text (never pitch black), Warm Olive Slate (`#58635E`) for secondary copy (maintaining >= 4.5:1 contrast), and Sandstone Border (`#E7E1D5`).
- **Semantic Colors**: Festive Offer Crimson (`#C83214`) on light blush (`#FEEBE8`) for discount callouts; Ayurvedic Emerald (`#168752`) on mint (`#EAF7EE`) for in-stock and savings notifications.

## Typography

- **Headings & Display**: *Playfair Display* (or *Cinzel* for regal store markers). Delivers warmth, editorial balance, and artisanal gravitas without overwhelming readability.
- **Body & Controls**: *Plus Jakarta Sans*. Modern, geometric yet approachable humanist grotesque, exceptionally crisp on mobile screens at small sizes (12px–15px).
- **Hindi Localization**: *Noto Sans Devanagari*. High legibility across native Hindi descriptions and bilingual signage.
- **Scale Rules**: Headings maintain balanced line-heights (1.15 to 1.25). Eyebrows are kept minimal, natural, and never stacked with multiple redundant badges. Gradient text is strictly prohibited in favor of solid high-contrast lettering.

## Layout

- **Container Width**: Max content container is 1280px (`max-w-7xl`), centered with fluid padding (16px on mobile, 24px on tablet, 32px on desktop).
- **Section Spacing**: Generous vertical rhythm (`py-12` to `py-16` on mobile, `py-20` on desktop). More breathing room above section titles than below them.
- **Grid Layout**: Responsive product grid uses `grid-cols-2` on mobile (<640px) for maximum mobile utility, `grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4` on desktop.
- **Horizontal Strips**: Category and price filter strips support fluid touch scrolling with hidden scrollbars and snap alignment.

## Elevation & Depth

- **Shadow Vocabulary**: Soft, natural multi-stop shadows with warm ambient occlusion:
  - Subtly elevated: `0 1px 3px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.02)`
  - Card hover: `0 10px 30px -10px rgba(7, 59, 42, 0.12)`
  - Elevated drawers & modals: `0 20px 50px rgba(4, 31, 24, 0.25)`
- **No Harsh Outlines**: Avoid brutalist block shadows (`4px 4px 0`) or thick colored side tabs (`border-left: 3px`). Borders use soft 1px warm borders (`#E7E1D5`).

## Shapes

- **Corner Radii**:
  - Cards, modals, containers: `12px` to `16px` (`rounded-xl` to `rounded-2xl`).
  - Interactive pill buttons, category chips: `9999px` (`rounded-full`).
  - Small badges & tags: `6px` (`rounded-md`).
- **Touch Targets**: All interactive elements (buttons, quantity steppers, category pills, icon buttons) meet or exceed 44x44px touch boundaries.

## Components

- **Product Cards**: Clear image presentation with genuine 1:1 aspect ratio, clean badge grouping (max 2 badges: Discount & Bestseller, positioned without obscuring the product), bold price display with strikethrough original price, and accessible Add to Cart controls.
- **Header & Navigation**: Sticky header with brand logo, quick search, bilingual switch, pincode selector, and prominent cart indicator with refined badge count.
- **Drawers & Modals**: Smooth slide-in Cart & Wishlist with dark forest overlay backdrop blur, accessible close buttons, scroll-locking, and clear pricing summaries.
- **Hero**: Curated cultural imagery directly relevant to Indian domestic utility and home decor; prominent value proposition without redundant stacking.

## Do's and Don'ts

### Do:
- Use solid colors for all typography. Ensure contrast ratio meets WCAG 2.1 AA (>= 4.5:1).
- Show real, high-quality images of actual Indian kitchen, home decor, pooja, and storage items.
- Provide smooth exponential deceleration (`cubic-bezier(0.16, 1, 0.3, 1)`) for drawers, modals, and toasts.
- Support both English and Hindi seamlessly with authentic phrasing.
- Test responsive viewports across 375px, 768px, 1024px, and 1440px.

### Don't:
- Never use gradient text (`bg-clip-text`).
- Never use thick decorative side tabs (`border-left: 3px solid ...`).
- Never use bounce or elastic easing (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`).
- Never render raw HTML entities like `&rarr;` inside JSX string literals.
- Never use mismatched stock imagery (like VR headsets for an Indian handicraft & kitchen utility store).
- Never crowd 3 or 4 badges on top of a product card image.
