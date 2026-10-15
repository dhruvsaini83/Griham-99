"use client";

import React from "react";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { siteConfig } from "@/lib/config";

const STORE_WHATSAPP_NUMBER = siteConfig.whatsappNumber;

export default function WhatsAppButton() {
  const { cart, cartCount, grandTotal } = useShop();

  const handleWhatsAppClick = (e) => {
    e.preventDefault();

    let msg = "";
    if (cart.length > 0) {
      const orderId = "GRH-99-" + Math.floor(10000 + Math.random() * 90000);
      msg = `*✨ GRIHAM 99+ (गृहम 99+) — Order Inquiry*\n`;
      msg += `*Ref:* ${orderId}\n\n`;
      msg += `*Items in my cart (${cartCount}):*\n`;
      cart.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.name} (Qty: ${item.quantity}) — ₹${
          item.price * item.quantity
        }\n`;
      });
      msg += `\n*Cart Total: ₹${grandTotal}*\n\n`;
      msg += `Please confirm my order details and dispatch timeline. Dhanyawad! 🙏`;
    } else {
      msg = `Namaste Griham 99+, I am inquiring about your everyday products starting at ₹49. Please assist me!`;
    }

    const waUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      msg
    )}`;
    window.open(waUrl, "_blank");
  };

  return (
    <motion.a
      href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
      onClick={handleWhatsAppClick}
      className="whatsapp-floating-btn"
      aria-label="Chat with Griham 99+ on WhatsApp"
      title="Chat with Griham 99+ on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
    >
      {/* Subtle luxury pulse ring behind button */}
      <motion.span
        className="whatsapp-pulse-ring"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          backgroundColor: "rgba(37, 211, 102, 0.35)",
          zIndex: -1,
          pointerEvents: "none",
        }}
        animate={{ scale: [1, 1.35, 1.45], opacity: [0.7, 0.2, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />
      <img
        src="/assets/whatsapp.png"
        alt="WhatsApp"
        className="wa-floating-img"
        onError={(e) => {
          e.currentTarget.src =
            "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
        }}
      />
      {cartCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-4px",
            right: "-4px",
            background: "#C83214",
            color: "#FFF",
            fontSize: "0.72rem",
            fontWeight: "800",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          {cartCount}
        </span>
      )}
    </motion.a>
  );
}
