"use client";

import React from "react";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { luxuryEase } from "@/lib/animations";

export default function Hero() {
  const { language } = useShop();

  const headlineWords1 = ["Discover", "More."];
  const headlineWords2 = ["Spend", "Smarter."];

  return (
    <section className="hero-section py-8 sm:py-12 lg:py-16 overflow-hidden" id="hero">
      <div className="hero-pattern-overlay"></div>
      <div className="container hero-grid flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        <div className="hero-content flex-1 text-center lg:text-left">
          {/* Offer Badge with Fade In */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="hero-offer-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4"
          >
            <span className="icon-sparkle">✨</span>
            <span className="text-xs sm:text-sm font-bold tracking-wider">
              {language === "hi"
                ? "99+ किस्में • केवल ₹49 से शुरू"
                : "99+ VARIETIES • STARTING AT JUST ₹49"}
            </span>
          </motion.div>

          {/* Staggered Word Fade-Up Headline */}
          <h1 className="hero-headline text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-black mb-3">
            <span className="inline-block">
              {headlineWords1.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: luxuryEase,
                  }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </span>{" "}
            <br />
            <span className="gold-text inline-block">
              {headlineWords2.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.25 + i * 0.1,
                    ease: luxuryEase,
                  }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: luxuryEase }}
            className="hero-subhead-hindi text-base sm:text-lg lg:text-xl font-bold text-[#E2CE9C] mb-4"
          >
            गृहम 99+ — 99+ तरह की वेरायटी, कीमतें सिर्फ ₹49 से शुरू!
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: luxuryEase }}
            className="hero-description text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed"
          >
            {language === "hi"
              ? "रोजमर्रा की आवश्यक वस्तुएं, रसोई का उपयोगी सामान, पूजा-त्योहार के उपहार, स्टोरेज बॉक्स और व्यक्तिगत देखभाल — भारतीय परिवारों के लिए प्रामाणिक व किफायती दरों पर।"
              : "Explore 99+ varieties of everyday essentials, useful kitchen finds, sacred gifts, home organizers and beauty care — hand-curated for Indian homes at honest, accessible prices."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: luxuryEase }}
            className="hero-cta-group flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <a
              href="#catalog"
              className="btn-gold-primary min-h-[48px] px-6 sm:px-8 py-3 rounded-full font-extrabold text-sm sm:text-base shadow-lg flex items-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>{language === "hi" ? "अभी खरीदारी करें" : "Shop Now"}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a
              href="#categories"
              className="btn-outline-gold min-h-[48px] px-5 sm:px-7 py-3 rounded-full font-bold text-sm sm:text-base border border-[#C9A24A]/60 flex items-center hover:bg-white/5 active:scale-[0.98] transition-all"
            >
              <span>
                {language === "hi"
                  ? "8 श्रेणियां देखें"
                  : "Explore 8 Categories"}
              </span>
            </a>
          </motion.div>

          {/* Staggered Trust Badges */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.75 },
              },
            }}
            className="hero-trust-strip flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-4 border-t border-white/10"
          >
            {[
              "Starting at ₹49",
              "Cash on Delivery",
              "Hygienic Packaging",
              "Verified Store Quality",
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                className="trust-item flex items-center gap-2 text-xs sm:text-sm text-stone-300"
              >
                <i className="text-[#C9A24A] font-bold">✓</i> <span>{badge}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Hero Visual Showcase Collage with Subtle Parallax & Hover Scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
          whileHover={{ scale: 1.02 }}
          className="hero-visual-card w-full lg:w-[480px] shrink-0 mt-6 lg:mt-0 transition-transform duration-500 ease-out"
        >
          {/* Floating Top Badge with Gentle Float */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="hero-floating-badge hero-badge-right"
          >
            <span style={{ fontSize: "1.3rem" }}>🪔</span>
            <div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "var(--color-gold-light)",
                  fontWeight: 700,
                }}
              >
                DAILY ESSENTIALS
              </div>
              <div style={{ fontSize: "0.88rem", fontWeight: 800 }}>
                Starts @ ₹49
              </div>
            </div>
          </motion.div>

          <div className="hero-collage-grid">
            <div className="hero-collage-item featured overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=800&q=80"
                alt="Festive Brass Diya and Home Decor"
                loading="eager"
                className="hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="hero-collage-item overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80"
                alt="Stainless Steel Kitchen Organizer"
                loading="lazy"
                className="hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="hero-collage-item overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=500&q=80"
                alt="Ayurvedic Soap & Personal Care"
                loading="lazy"
                className="hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Floating Bottom Badge */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            className="hero-floating-badge hero-badge-left"
          >
            <span style={{ fontSize: "1.3rem" }}>⚡</span>
            <div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "var(--color-gold-light)",
                  fontWeight: 700,
                }}
              >
                PROMISE
              </div>
              <div style={{ fontSize: "0.88rem", fontWeight: 800 }}>
                99+ Varieties Available
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
