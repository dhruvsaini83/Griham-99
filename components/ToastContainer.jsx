"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { toastVariant } from "@/lib/animations";

export default function ToastContainer() {
  const { toasts } = useShop();

  return (
    <div
      className="toast-container pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ zIndex: 99999 }}
      id="toastContainer"
    >
      <AnimatePresence>
        {toasts &&
          toasts.map((toast) => (
            <motion.div
              key={toast.id}
              variants={toastVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className={`toast pointer-events-auto px-4 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                toast.message.startsWith("⚠️")
                  ? "bg-[#251505] text-[#FEE9B5] border border-[#D4A034] shadow-amber-950/50"
                  : "bg-[#073B2A] text-white border border-[#C9A24A]/40"
              }`}
            >
              {toast.message.startsWith("⚠️") ? (
                <span className="text-amber-400 text-sm flex-shrink-0">⚠️</span>
              ) : (
                <span className="text-[#C9A24A] flex-shrink-0">✨</span>
              )}
              <span>{toast.message.replace(/^⚠️\s*/, "")}</span>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
