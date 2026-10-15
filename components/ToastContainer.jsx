"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import { toastVariant } from "@/lib/animations";

export default function ToastContainer() {
  const { toasts } = useShop();

  return (
    <div className="toast-container pointer-events-none fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2" id="toastContainer">
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
              className="toast pointer-events-auto bg-[#073B2A] text-white border border-[#C9A24A]/40 px-4 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <span className="text-[#C9A24A]">✨</span>
              <span>{toast.message}</span>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
