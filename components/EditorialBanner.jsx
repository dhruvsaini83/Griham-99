"use client";

import React from "react";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { luxuryEase } from "@/lib/animations";

export default function EditorialBanner() {
  const { setMaxPrice, setActiveCategory, language } = useShop();

  const handleExplore = () => {
    setMaxPrice(99);
    setActiveCategory("under99");
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container" style={{ margin: "40px auto" }}>
      <motion.div
        className="promo-editorial-banner p-6 sm:p-8 lg:p-12 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: luxuryEase }}
      >
        <div className="promo-banner-grid flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
          <div className="flex-1">
            <span className="promo-banner-kicker">GRIHAM ASSURANCE</span>
            <h2 className="promo-banner-heading text-2xl sm:text-3xl lg:text-4xl font-black">
              {language === "hi"
                ? "किफायती दाम।\nअनंत संभावनाएं।"
                : "Little Prices. \nEndless Possibilities."}
            </h2>
            <p className="promo-banner-desc text-sm sm:text-base text-stone-300 leading-relaxed mb-4">
              {language === "hi"
                ? "अपने घर और जीवन शैली के लिए व्यावहारिक दैनिक आवश्यकताएं और रोमांचक नई खोजें पाएं। हर वस्तु की उपयोगिता और गुणवत्ता की पूर्ण जांच की गई है।"
                : "Find practical everyday essentials and exciting new discoveries for your home and lifestyle. Every item is verified for Indian utility, durability and real value."}
            </p>

            <div className="promo-perks-list flex flex-wrap gap-2 sm:gap-3 mb-6">
              <span className="promo-perk text-xs sm:text-sm">🛡️ 100% Quality Checked</span>
              <span className="promo-perk text-xs sm:text-sm">📦 Cash on Delivery Available</span>
              <span className="promo-perk text-xs sm:text-sm">⚡ Fast Dispatch Within 24 Hours</span>
            </div>

            <motion.button
              whileHover={{ brightness: 1.1 }}
              whileTap={{ scale: 0.96 }}
              className="btn-gold-primary min-h-[44px] px-6 py-2.5 rounded-full font-bold flex items-center gap-2"
              onClick={handleExplore}
            >
              <span>
                {language === "hi"
                  ? "₹49 और ₹99 के उत्पाद देखें"
                  : "Explore ₹49 & ₹99 Finds"}
              </span>
              <span>&rarr;</span>
            </motion.button>
          </div>

          <motion.div
            className="promo-banner-visual"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: luxuryEase }}
          >
            <div className="promo-highlight-badge">
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-gold-light)",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                STARTING AT
              </div>
              <div className="promo-big-price">₹49</div>
              <div className="promo-big-label">99+ Everyday Varieties</div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#CCD8D2",
                  marginTop: "10px",
                }}
              >
                Genuine retail pricing for Indian families
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
