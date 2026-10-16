"use client";

import React from "react";
import { ShopProvider } from "@/context/ShopContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PriceStrip from "@/components/PriceStrip";
import CategoryStrip from "@/components/CategoryStrip";
import ProductGrid from "@/components/ProductGrid";
import EditorialBanner from "@/components/EditorialBanner";
import TrustPillars from "@/components/TrustPillars";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import CheckoutModal from "@/components/CheckoutModal";
import PincodeModal from "@/components/PincodeModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import ToastContainer from "@/components/ToastContainer";
import SplashScreen from "@/components/SplashScreen";

export default function HomeClient() {
  return (
    <ShopProvider>
      {/* Luxury Initial Page Load Splash Screen */}
      <SplashScreen minDuration={1800} />

      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#18201C]">
        {/* Header (Announcement Bar, Sticky Nav, Live Search) */}
        <Header />

        {/* Main Storefront Flow */}
        <main className="flex-1">
          <Hero />
          <PriceStrip />
          <CategoryStrip />
          <ProductGrid />
          <EditorialBanner />
          <TrustPillars />
          <FaqSection />
        </main>

        {/* Store Footer */}
        <Footer />

        {/* Slide-In Drawers */}
        <CartDrawer />
        <WishlistDrawer />

        {/* Interactive Modals */}
        <QuickViewModal />
        <CheckoutModal />
        <PincodeModal />

        {/* Floating WhatsApp Action Button */}
        <WhatsAppButton />

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </ShopProvider>
  );
}
