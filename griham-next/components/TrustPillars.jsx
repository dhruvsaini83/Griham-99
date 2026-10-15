"use client";

import React from "react";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { luxuryEase } from "@/lib/animations";

export default function TrustPillars() {
  const { language } = useShop();

  const PILLARS = [
    {
      icon: "🏷️",
      title: language === "hi" ? "₹49 से वास्तविक मूल्य" : "True Value From ₹49",
      desc: language === "hi" ? "सामग्री की मजबूती या फिनिश से समझौता किए बिना किफायती दैनिक वस्तुएं।" : "Affordable everyday essentials without compromising on material durability or finish.",
    },
    {
      icon: "📦",
      title: language === "hi" ? "एक छत के नीचे 99+ किस्में" : "99+ Varieties Under 1 Roof",
      desc: language === "hi" ? "रसोई के डिब्बों से लेकर त्योहारों के दीयों तक, घर की हर जरूरत का सामान।" : "From kitchen dabbas to festive diyas, find what your home needs every day.",
    },
    {
      icon: "🚚",
      title: language === "hi" ? "अखिल भारतीय सुरक्षित डिलीवरी" : "All-India Safe Shipping",
      desc: language === "hi" ? "सुरक्षित, स्वच्छ बबल पैकेजिंग और प्रमुख पिनकोडों पर कैश ऑन डिलीवरी उपलब्ध।" : "Safe, hygienic bubble packaging with Cash on Delivery available across major pincodes.",
    },
    {
      icon: "💬",
      title: language === "hi" ? "सरल व्हाट्सएप सहायता" : "Friendly WhatsApp Support",
      desc: language === "hi" ? "उत्पाद संबंधी प्रश्नों, थोक आर्डरों और डिलीवरी की स्थिति के लिए सीधी बातचीत।" : "Direct assistance on product queries, bulk orders, and order tracking via WhatsApp.",
    },
  ];

  return (
    <section className="trust-pillars-section py-8 sm:py-12 bg-white" id="trust-pillars">
      <div className="container">
        <div className="trust-pillars-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PILLARS.map((p, idx) => (
            <motion.div
              key={idx}
              className="pillar-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: luxuryEase,
              }}
            >
              <div className="pillar-icon-box">{p.icon}</div>
              <div className="pillar-content">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
