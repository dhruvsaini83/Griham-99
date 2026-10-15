import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "404 — Page Not Found | Griham 99+",
  description:
    "The page you are looking for does not exist. Explore 99+ varieties of everyday essentials and home finds starting at ₹49 at Griham 99+.",
};

export default function NotFound() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#18201C] overflow-x-hidden">
      {/* Top Header */}
      <header className="bg-[#073B2A] border-b border-[#C9A24A]/30 py-4 px-4 sm:px-8 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            aria-label="Griham 99+ Home"
          >
            <div className="w-10 h-10 rounded-full border-2 border-[#C9A24A] flex items-center justify-center bg-[#041F18] shadow">
              <span className="font-serif font-black text-sm text-[#C9A24A]">99+</span>
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-black tracking-tight text-white">
                GRIHAM <span className="text-[#C9A24A]">99+</span>
              </span>
              <span className="block text-[10px] text-[#C9A24A]/80 tracking-widest uppercase">
                {siteConfig.hindiTagline}
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="min-h-[44px] px-4 py-2 rounded-full bg-[#C9A24A] text-[#073B2A] font-bold text-xs sm:text-sm hover:bg-[#E6C875] transition-colors flex items-center gap-1.5 shadow"
          >
            <span>&larr; Back to Store</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Big Golden 404 Emblem */}
          <div className="inline-flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#073B2A] border-4 border-[#C9A24A] shadow-2xl mb-6 relative">
            <span className="font-serif font-black text-3xl sm:text-4xl text-[#E6C875] tracking-wider">
              404
            </span>
            <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-[#C9A24A] text-[#073B2A] font-black text-[10px] uppercase tracking-wider shadow">
              LOST AISLE
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#073B2A] mb-2 tracking-tight">
            पृष्ठ नहीं मिला • Page Not Found
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto mb-6 leading-relaxed">
            जिस वस्तु या पृष्ठ को आप खोज रहे हैं वह स्थानांतरित कर दिया गया है या उपलब्ध नहीं है। लेकिन परेशान न हों, हमारी <strong>99+ उपयोगी किस्में केवल ₹49</strong> से आपका इंतज़ार कर रही हैं!
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <Link
              href="/"
              className="min-h-[48px] px-6 sm:px-8 py-3 rounded-full bg-[#073B2A] text-white font-extrabold text-sm sm:text-base hover:bg-[#052b1e] active:scale-95 transition-all shadow-lg flex items-center gap-2 border border-[#C9A24A]/40"
            >
              <span>🏠 Return to Storefront</span>
            </Link>

            <Link
              href="/#catalog"
              className="min-h-[48px] px-6 sm:px-8 py-3 rounded-full bg-[#C9A24A] text-[#073B2A] font-extrabold text-sm sm:text-base hover:bg-[#E6C875] active:scale-95 transition-all shadow-md flex items-center gap-2"
            >
              <span>⚡ Explore Under ₹99 Finds</span>
            </Link>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Griham 99+, I need help finding a product!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-5 sm:px-7 py-3 rounded-full bg-[#168752] text-white font-bold text-sm sm:text-base hover:bg-[#126b41] active:scale-95 transition-all shadow-md flex items-center gap-2"
            >
              <span>💬 WhatsApp Support</span>
            </a>
          </div>

          {/* Quick Category Suggestions */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E7E1D5] shadow-sm text-left">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#C9A24A] mb-4 text-center">
              POPULAR STORE AISLES • मुख्य श्रेणियां
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: "Kitchen & Dining", icon: "🍳", href: "/#catalog" },
                { title: "Home Essentials", icon: "🏠", href: "/#catalog" },
                { title: "Festive & Diyas", icon: "🪔", href: "/#catalog" },
                { title: "Organizers & Jars", icon: "📦", href: "/#catalog" },
              ].map((c, i) => (
                <Link
                  key={i}
                  href={c.href}
                  className="p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F4EFE6] border border-[#E7E1D5] transition-all text-center group flex flex-col items-center justify-center gap-1.5"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {c.icon}
                  </span>
                  <span className="text-xs font-bold text-stone-800">
                    {c.title}
                  </span>
                </Link>
              ))}
            </div>

            {/* Direct Contact info */}
            <div className="mt-6 pt-5 border-t border-[#E7E1D5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <span>📞 Support:</span>
                <a
                  href={`tel:${siteConfig.supportPhoneTel || "+919352456169"}`}
                  className="font-bold text-[#073B2A] hover:underline"
                >
                  {siteConfig.supportPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>✉️ Email:</span>
                <a
                  href={`mailto:${siteConfig.supportEmail || "support@griham99.com"}`}
                  className="font-bold text-[#073B2A] hover:underline"
                >
                  {siteConfig.supportEmail || "support@griham99.com"}
                </a>
              </div>
              <div className="text-stone-500">
                Hours: {siteConfig.supportHours}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#041F18] text-white py-6 px-4 text-center text-xs text-stone-400 border-t border-[#C9A24A]/20">
        <p>
          © {currentYear} {siteConfig.hindiName} ({siteConfig.name} Retail). All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
