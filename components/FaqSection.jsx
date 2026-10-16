"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { FAQS } from "@/data/faqs";

export default function FaqSection() {
  const { language } = useShop();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F4EFE6]/60 border-t border-[#E7E1D5]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#C9A24A]/20 text-[#073B2A] border border-[#C9A24A]/30 mb-3">
            {language === "hi" ? "अक्सर पूछे जाने वाले सवाल" : "Got Questions? We Got Answers"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#073B2A] tracking-tight">
            {language === "hi"
              ? "अक्सर पूछे जाने वाले प्रश्न (FAQ)"
              : "Frequently Asked Questions — Griham 99+"}
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            {language === "hi"
              ? "जयपुर में ₹99 स्टोर, फ्री डिलीवरी और प्रोडक्ट्स से जुड़े आपके सभी सवालों के जवाब।"
              : "Everything you need to know about our ₹99 price promise, fast Jaipur delivery, and ordering."}
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const question = language === "hi" ? faq.qHi : faq.qEn;
            const answer = language === "hi" ? faq.aHi : faq.aEn;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E7E1D5] overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-[#18201C] hover:text-[#073B2A] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold leading-snug flex items-center gap-2.5">
                    <span className="text-[#C9A24A] font-extrabold text-sm sm:text-base">Q{idx + 1}.</span>
                    {question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-stone-200 text-sm font-black transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#073B2A] text-white border-[#073B2A]" : "bg-stone-50 text-stone-600"
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 sm:px-5 pt-1 text-stone-600 text-sm sm:text-base leading-relaxed border-t border-stone-100 bg-[#FAF7F2]/40">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
